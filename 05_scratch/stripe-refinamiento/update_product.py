import json,subprocess
from pathlib import Path
from datetime import datetime,timezone
R=Path.cwd(); M=R/'04_outputs/modulos/stripe'; S=R/'05_scratch/stripe-refinamiento'
ACCOUNT='acct_1UFzBqRrJS0VSqzs'; PROD='prod_epi10_nutriwell_demo_v1'
COPY='Conoce tu biología y cuida tus hábitos. Incluye test genético, cuestionario, informe personalizado, plan de acción y sesión profesional.'
def api(method,path,params=None):
 args=['npx','--yes','@stripe/cli@1.50.11',method,path,'--stripe-context',ACCOUNT]
 if method=='post':args+=['--confirm','--idempotency','epi10-product-copy-cover-v1']
 for k,v in (params or {}).items():args+=['-d',f'{k}={v}']
 r=subprocess.run(args,capture_output=True,text=True,timeout=45)
 try:d=json.loads(r.stdout)
 except json.JSONDecodeError:raise SystemExit('Stripe CLI: respuesta no JSON')
 if r.returncode or 'error' in d:raise SystemExit(json.dumps({k:d.get('error',{}).get(k) for k in ['type','code','param']}))
 return d
account=api('get','/v1/account');assert account['id']==ACCOUNT
before=api('get','/v1/products/'+PROD);assert before['livemode'] is False
(S/'product_before.json').write_text(json.dumps(before,ensure_ascii=False,indent=2)+'\n')
cover=json.loads((S/'cover_verified.json').read_text());assert cover['livemode'] is False
updated=api('post','/v1/products/'+PROD,{'description':COPY,'images[0]':cover['image_url']})
product=api('get','/v1/products/'+PROD)
brand_after=api('get','/v1/account')['settings']['branding']
price=api('get','/v1/prices/'+product['default_price'])
checks={
 'product_test_mode':product['livemode'] is False,
 'copy_applied':product['description']==COPY,
 'cover_applied':product['images']==[cover['image_url']],
 'header_branding_preserved':brand_after==account['settings']['branding'],
 'header_logo':brand_after['logo']=='file_1UG02ERrJS0VSqzs5X1MupI8',
 'price_100_eur':price['livemode'] is False and price['unit_amount']==10000 and price['currency']=='eur' and price['type']=='one_time',
 'public_cover':cover['http_status']==200 and cover['mime_type']=='image/jpeg',
}
assert all(checks.values()),checks
stamp=datetime.now(timezone.utc).isoformat()
out={'verified_at':stamp,'account_id':ACCOUNT,'product':product,'cover':cover,'branding':brand_after,'checks':checks,'payment_tested':False}
(M/'evidencias/2026-09-15_checkout_refinamiento_api.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
p=M/'config/catalogo_demo.json';c=json.loads(p.read_text());c.update(product_description=COPY,product_image_url=cover['image_url'],product_image_file_id=cover['file_id'],product_image_local='../assets/nutriwell-portada-brochure.jpg',product_content_verified_at=stamp);p.write_text(json.dumps(c,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'result':'PASS','checks':checks,'description':COPY,'image_file_id':cover['file_id']}))
