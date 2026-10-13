#!/usr/bin/env python3
"""Montaje del spot (SKI2-277): voz en off con Piper, una pieza por escena (tramos acelerados + faldón)
y unión con fundidos. Uso: python3 scripts/montar.py [carpeta-base]   (lee escenas.json, clips/, rotulos/, voz/)."""
import json, os, subprocess, sys

BASE = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), '..')
BASE = os.path.abspath(BASE)
ESC = json.load(open(os.path.join(BASE, 'escenas.json')))
PIEZAS = os.path.join(BASE, 'piezas'); os.makedirs(PIEZAS, exist_ok=True)
PIPER = os.environ.get('PIPER', os.path.join(BASE, 'venv', 'bin', 'piper'))
VOZ_MODELO = os.environ.get('VOZ_MODELO', os.path.join(BASE, 'voz', 'es_ES-sharvard-medium.onnx'))
VOZ_HABLANTE = os.environ.get('VOZ_HABLANTE', '1')  # sharvard: 0 = M, 1 = F
SALIDA = os.environ.get('SALIDA', os.path.join(BASE, 'epi10_recorrido.mp4'))
CRF = os.environ.get('CRF', '28')
FUNDIDO = 0.45
# Solo para la locución: cómo debe sonar cada marca con la voz española de Piper.
PRONUNCIA = {'EPI10': 'Épi diez', 'Stripe': 'Estráip', 'back office': 'bak ófis', 'NutriWell': 'Nutriuél', 'Odoo': 'Odú'}
FPS = 30
CON_VOZ = os.path.exists(PIPER) and os.path.exists(VOZ_MODELO)


def ff(*args):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *args], check=True)


def duracion(f):
    r = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f],
                       capture_output=True, text=True, check=True)
    return float(r.stdout.strip())


def pronunciar(t):
    for k, v in PRONUNCIA.items():
        t = t.replace(k, v)
    return t


def voz(e):
    wav = os.path.join(PIEZAS, f"voz_{e['id']}.wav")
    if CON_VOZ:
        subprocess.run([PIPER, '-m', VOZ_MODELO, '-s', VOZ_HABLANTE, '--length-scale', '0.95', '-f', wav],
                       input=pronunciar(e['voz']).encode(), check=True, capture_output=True)
        return wav, duracion(wav)
    return None, 0.0


def pieza(i, e):
    wav, dvoz = voz(e)
    rot = os.path.join(BASE, 'rotulos', e['id'] + '.png')
    out = os.path.join(PIEZAS, f"{i:02d}_{e['id']}.mp4")
    if e.get('tipo') == 'tarjeta':
        d = max(e['dur'], dvoz + 0.9)
        ff('-loop', '1', '-t', f'{d:.3f}', '-i', rot, '-vf', f'fps={FPS},scale=1280:720,format=yuv420p',
           '-c:v', 'libx264', '-crf', '16', '-preset', 'fast', out)
        return out, d, wav
    entradas, filtros, etiquetas, dvid = [], [], [], 0.0
    for n, (clip, a, b, vel) in enumerate(e['tramos']):
        # Una entrada por tramo, recortada al leer: reutilizar un mismo clip largo en varios trim lo carga entero en memoria.
        entradas += ['-ss', f'{a}', '-to', f'{b}', '-i', os.path.join(BASE, 'clips', clip + '.webm')]
        filtros.append(f'[{n}:v]setpts=(PTS-STARTPTS)/{vel},fps={FPS},scale=1280:720,setsar=1[t{n}]')
        etiquetas.append(f'[t{n}]')
        dvid += (b - a) / vel
    d = max(dvid, dvoz + 0.9)
    extra = d - dvid
    filtros.append(''.join(etiquetas) + f'concat=n={len(etiquetas)}:v=1:a=0[v0]')
    filtros.append(f'[v0]tpad=stop_mode=clone:stop_duration={extra + 0.05:.3f},trim=duration={d:.3f}[v1]')
    r = len(etiquetas)
    filtros.append(f'[{r}:v]format=rgba,fade=in:st=0.25:d=0.4:alpha=1,fade=out:st={d - 0.55:.3f}:d=0.4:alpha=1[r]')
    filtros.append('[v1][r]overlay=0:0:shortest=1,format=yuv420p[v]')
    ff(*entradas, '-loop', '1', '-t', f'{d:.3f}', '-i', rot, '-filter_complex', ';'.join(filtros), '-map', '[v]',
       '-r', str(FPS), '-c:v', 'libx264', '-crf', '16', '-preset', 'fast', out)
    return out, d, wav


piezas = [pieza(i, e) for i, e in enumerate(ESC)]
for (f, d, w), e in zip(piezas, ESC):
    print(f"{e['id']:10s} {d:6.2f}s")

# Unión con fundidos (xfade) y voz colocada al principio de cada escena.
entradas, filtros = [], []
for f, _, _ in piezas:
    entradas += ['-i', f]
inicio, prev, t = [0.0], '[0:v]', piezas[0][1]
for i in range(1, len(piezas)):
    off = t - FUNDIDO
    inicio.append(off)
    filtros.append(f'{prev}[{i}:v]xfade=transition=fade:duration={FUNDIDO}:offset={off:.3f}[x{i}]')
    prev = f'[x{i}]'
    t = off + piezas[i][1]
total = t
filtros.append(f'{prev}fade=in:st=0:d=0.5,fade=out:st={total - 0.7:.3f}:d=0.7,format=yuv420p[v]')
n = len(piezas)
voces = [(k, w) for k, (_, _, w) in enumerate(piezas) if w]
for j, (k, w) in enumerate(voces):
    entradas += ['-i', w]
    ms = int((inicio[k] + (0.15 if k == 0 else FUNDIDO + 0.1)) * 1000)
    filtros.append(f'[{n + j}:a]aresample=44100,adelay={ms}|{ms},apad[a{j}]')
if voces:
    filtros.append(''.join(f'[a{j}]' for j in range(len(voces))) + f'amix=inputs={len(voces)}:normalize=0,'
                   f'atrim=duration={total:.3f},loudnorm=I=-16:TP=-1.5:LRA=11[a]')
else:
    entradas += ['-f', 'lavfi', '-t', f'{total:.3f}', '-i', 'anullsrc=r=44100:cl=stereo']
    filtros.append(f'[{n}:a]anull[a]')
ff(*entradas, '-filter_complex', ';'.join(filtros), '-map', '[v]', '-map', '[a]',
   '-c:v', 'libx264', '-preset', 'slow', '-crf', CRF, '-profile:v', 'high', '-pix_fmt', 'yuv420p',
   '-c:a', 'aac', '-b:a', '96k', '-ac', '2', '-movflags', '+faststart', SALIDA)
print(f'{SALIDA}: {duracion(SALIDA):.1f} s, {os.path.getsize(SALIDA) / 1e6:.2f} MB, voz={"sí" if CON_VOZ else "no"}')
json.dump([{'id': e['id'], 'inicio': round(s, 2), 'dur': round(p[1], 2)} for e, s, p in zip(ESC, inicio, piezas)],
          open(os.path.join(PIEZAS, 'tiempos.json'), 'w'), indent=1)
