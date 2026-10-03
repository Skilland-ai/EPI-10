import json,re,subprocess
from pathlib import Path
from urllib.parse import unquote
R=Path.cwd();M=R/'04_outputs/modulos/stripe'
files=[M/'README.md',M/'assets/README.md',*list((M/'docs').glob('*.md')),M/'evidencias/README.md',R/'README.md',R/'01_harness/STACK.md',R/'02_context/01_estado_actual.md',R/'03_specs/now/011_now.md',R/'03_specs/decisions.md',R/'04_outputs/planificacion/linear/README.md',R/'04_outputs/planificacion/linear/tareas.md']
broken=[];total=0
for p in files:
 for t in re.findall(r'\]\(([^)]+)\)',p.read_text()):
  if t.startswith(('http:','https:','#','mailto:')):continue
  t=unquote(t.split('#')[0].strip('<>'));total+=1
  if not (p.parent/t).exists():broken.append(str(p.relative_to(R))+': '+t)
tracked=subprocess.check_output(['git','ls-files'],cwd=M/'app',text=True).splitlines()
scan=files+[M/'app'/x for x in tracked if Path(x).suffix in {'.tsx','.ts','.css','.json','.md','.txt'}]+list((M/'config').glob('*.json'))+list((M/'evidencias').glob('*.json'))
secret=[str(p.relative_to(R)) for p in scan if re.search(r'(?:sk|rk)_(?:live|test)_[A-Za-z0-9]{12,}|whsec_[A-Za-z0-9]{12,}|oak_(?:live|test)_[A-Za-z0-9]{12,}',p.read_text())]
def luminance(h):
 c=[int(h[i:i+2],16)/255 for i in (0,2,4)];c=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in c];return sum(v*w for v,w in zip(c,[.2126,.7152,.0722]))
def contrast(a,b):
 x,y=sorted([luminance(a),luminance(b)]);return round((y+.05)/(x+.05),2)
colors={f'{a}/{b}':contrast(a,b) for a,b in [('082b43','f8f5ef'),('526575','f8f5ef'),('ffffff','044799'),('bfd0db','082f49'),('8ae1e5','082f49')]}
d=json.loads((M/'evidencias/2026-09-15_pantalla_publica_legibilidad.json').read_text());ssr=json.loads((R/'05_scratch/stripe-legibilidad/qa-publico.json').read_text())
checks={'links_valid':not broken,'no_secret_patterns':not secret,'deployment_succeeded':d['status']=='succeeded','public_access':d['access']=='public','public_html_checks_pass':all(ssr[k] for k in ('public_access_verified','new_cta_copy','checkout_link_present','og_present')),'text_color_pairs_pass':all(x>=4.5 for x in colors.values()),'app_source_clean':not subprocess.check_output(['git','status','--porcelain'],cwd=M/'app',text=True).strip()}
result={'result':'PASS' if all(checks.values()) else 'FAIL','checks':checks,'markdown_files':len(files),'local_links':total,'broken_links':broken,'secret_files':secret,'contrast_ratios':colors,'browser_dom_qa_performed':True,'browser_screenshot_available':False,'payment_executed':False};(R/'05_scratch/stripe-legibilidad/qa-documentacion.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(json.dumps(result,ensure_ascii=False));assert all(checks.values())
