import ast,json,re
from pathlib import Path
from urllib.parse import unquote
R=Path.cwd(); M=R/'04_outputs/modulos/stripe'
c=json.loads((M/'config/checkout_demo.json').read_text())
e=json.loads((M/'evidencias/2026-09-15_checkout_api.json').read_text())
b=json.loads((M/'evidencias/2026-09-15_checkout_navegador.json').read_text())
checks={
 'api_17_checks':len(e['checks'])==17 and all(e['checks'].values()),
 'sandbox_account':c['account_id']=='acct_1UFzBqRrJS0VSqzs' and c['livemode'] is False,
 'fixed_quantity_requested':e['request_params']['line_items[0][adjustable_quantity][enabled]']=='false' and e['line_items']['data'][0]['quantity']==1,
 'no_quantity_control_rendered':b['no_quantity_control'] is True,
 'browser_verified':c['browser_verified'] is True,
 'no_payment':c['payment_tested'] is False and b['payment_submitted'] is False,
 'browser_claims':all(b[x] is True for x in ['amount_eur','card','email','logo_loaded','demo_notice','product','test_banner','pay_button_blue','no_phone','no_shipping']),
 'matching_url':c['url']==b['url'],
 'evidence_limits':b['screenshot_available'] is False,
 'configuration_applied':json.loads((M/'config/catalogo_demo.json').read_text())['checkout_settings_applied'] is True,
}
ast.parse((M/'scripts/prepare_checkout.py').read_text()); checks['script_syntax']=True
files=list(M.rglob('*.md'))+[R/x for x in ['README.md','01_harness/STACK.md','02_context/01_estado_actual.md','03_specs/now/011_now.md','03_specs/decisions.md','04_outputs/planificacion/linear/README.md','04_outputs/planificacion/linear/tareas.md']]
broken=[]; total=0
for p in files:
 for target in re.findall(r'\]\(([^)]+)\)',p.read_text()):
  if target.startswith(('http:','https:','#','mailto:')):continue
  target=unquote(target.split('#')[0].strip('<>'))
  if not target:continue
  total+=1
  if not (p.parent/target).exists():broken.append(str(p.relative_to(R))+': '+target)
checks['local_links']=not broken
secret_files=[]
for p in list(M.rglob('*'))+list((R/'05_scratch/stripe-checkout').glob('*.json')):
 if p.is_file() and p.suffix in {'.py','.md','.json'}:
  if re.search(r'(?:sk|rk|pk)_(?:live|test)_[A-Za-z0-9]{12,}|whsec_[A-Za-z0-9]{12,}|oak_(?:live|test)_[A-Za-z0-9]{12,}',p.read_text()):secret_files.append(str(p.relative_to(R)))
checks['no_credentials']=not secret_files
out={'result':'PASS' if all(checks.values()) else 'FAIL','checks':checks,'markdown_files':len(files),'local_links':total,'broken_links':broken,'secret_files':secret_files}
(R/'05_scratch/stripe-checkout/qa-checkout.json').write_text(json.dumps(out,indent=2,ensure_ascii=False)+'\n')
print(json.dumps(out,ensure_ascii=False));assert all(checks.values())
