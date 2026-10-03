import json,os,subprocess,sys,termios
from pathlib import Path
SITE=Path('/home/reboot/Escritorio/EPI-10/04_outputs/modulos/stripe/app')
# Disable PTY echo before accepting the short-lived credential over stdin.
attrs=termios.tcgetattr(sys.stdin.fileno());attrs[3]&=~termios.ECHO;termios.tcsetattr(sys.stdin.fileno(),termios.TCSANOW,attrs)
print('READY_FOR_EPHEMERAL_CREDENTIAL',flush=True)
credential=json.loads(sys.stdin.readline())
assert credential['auth_mode']=='http_extra_header'
remote=credential['remote_url'];assert remote.startswith('https://git.chatgpt-team.site/') and 'appgprj_6aa98db08ca48191a89d4b06f92167bd.git' in remote
branch=credential['branch'];assert branch=='main'
token=credential['token'];assert token and '\n' not in token
assert (SITE/'.git').is_dir()
def run(args,env=None):
 result=subprocess.run(args,cwd=SITE,env=env,capture_output=True,text=True,timeout=90)
 if result.returncode:
  print((result.stderr or result.stdout).replace(token,'[REDACTED]'));raise SystemExit(result.returncode)
 return result.stdout.strip()
run(['git','add','.'])
run(['git','diff','--cached','--check'])
files=run(['git','ls-files']).splitlines();assert not any(x.startswith('.env') or x.endswith('.pem') for x in files)
run(['git','-c','user.name=Codex','-c','user.email=codex@local.invalid','commit','-m','Build EPI10 NutriWell payment demo entry screen'])
run(['git','remote','add','origin',remote])
env=os.environ.copy();env.update(GIT_CONFIG_COUNT='1',GIT_CONFIG_KEY_0='http.extraHeader',GIT_CONFIG_VALUE_0='Authorization: Bearer '+token,GIT_TERMINAL_PROMPT='0')
run(['git','push','-u','origin',branch],env)
sha=run(['git','rev-parse','--verify','HEAD'])
assert len(sha)==40 and not run(['git','status','--porcelain'])
result={'commit_sha':sha,'source_pushed':True,'branch':branch,'remote_url':remote}
Path('/home/reboot/Escritorio/EPI-10/05_scratch/stripe-pantalla/source-pushed.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({'commit_sha':sha,'source_pushed':True}),flush=True)
