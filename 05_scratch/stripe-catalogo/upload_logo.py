"""Upload the approved public logo using the existing CLI authorization in memory."""
import hashlib,json,urllib.request,urllib.error
from pathlib import Path
import keyring
ACCOUNT='acct_1UFzBqRrJS0VSqzs'
# Read only the two entries of the already-authorized Stripe CLI session.
context_raw=keyring.get_password('StripeCLI','oauth_active_context')
assert context_raw,'Active Stripe CLI context unavailable'
context=json.loads(context_raw)
assert context.get('account_id')==ACCOUNT and context.get('livemode') is False,'Sandbox context mismatch'
token=keyring.get_password('StripeCLI','uat')
assert token and token.startswith('oak_'),'Stripe CLI OAuth authorization unavailable'
def request(url,body=None,content_type=None,idempotency=None):
 assert url.startswith(('https://api.stripe.com/','https://files.stripe.com/'))
 headers={'Authorization':'Bearer '+token,'Stripe-Context':ACCOUNT,'Stripe-Livemode':'false'}
 if content_type:headers['Content-Type']=content_type
 if idempotency:headers['Idempotency-Key']=idempotency
 req=urllib.request.Request(url,data=body,headers=headers)
 try:
  with urllib.request.urlopen(req,timeout=30) as r:return json.load(r)
 except urllib.error.HTTPError as e:
  try:err=json.load(e).get('error',{})
  except Exception:err={}
  print(json.dumps({'http_status':e.code,'error_type':err.get('type'),'param':err.get('param')}))
  raise SystemExit(1)
assert request('https://api.stripe.com/v1/account')['id']==ACCOUNT
p=Path('05_scratch/stripe-catalogo')
logo=Path('02_context/EPI10-branding/Nuevos-logos-de-EPI10/Logos_EPI10-01.png')
raw=logo.read_bytes();assert raw[:8]==b'\x89PNG\r\n\x1a\n'
# All file metadata checked before upload, so retries do not create extra copies.
files=request('https://api.stripe.com/v1/files?limit=100');assert not files['has_more']
matching=[x for x in files['data'] if x['filename']==logo.name and x['purpose']=='business_logo'];assert len(matching)<=1
if matching:
 file=matching[0]
else:
 boundary='EPI10StripeLogoBoundary20260915'
 parts=[]
 for k,v in [('purpose','business_logo'),('file_link_data[create]','true')]:
  parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="{k}"\r\n\r\n{v}\r\n'.encode())
 parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="file"; filename="{logo.name}"\r\nContent-Type: image/png\r\n\r\n'.encode()+raw+b'\r\n')
 parts.append(f'--{boundary}--\r\n'.encode())
 file=request('https://files.stripe.com/v1/files',b''.join(parts),'multipart/form-data; boundary='+boundary,'epi10-logo-blue-multipart-v1')
assert file['purpose']=='business_logo'
links=file['links']['data'];assert len(links)==1
link=links[0];assert link['livemode'] is False and link['expired'] is False
# This URL intentionally serves only the public logo, without authentication.
assert link['url'].startswith('https://files.stripe.com/links/')
with urllib.request.urlopen(link['url'],timeout=30) as r:
 image_bytes=r.read();http_status=r.status;mime_type=r.headers.get_content_type()
assert http_status==200 and mime_type=='image/png'
(p/'logo_downloaded.png').write_bytes(image_bytes)
(p/'logo_file.json').write_text(json.dumps(file,ensure_ascii=False,indent=2)+'\n')
check={'file_id':file['id'],'file_link_id':link['id'],'image_url':link['url'],'livemode':False,'http_status':http_status,'mime_type':mime_type,'original_sha256':hashlib.sha256(raw).hexdigest(),'download_sha256':hashlib.sha256(image_bytes).hexdigest(),'bytes_identical':raw==image_bytes}
(p/'logo_verified.json').write_text(json.dumps(check,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({k:v for k,v in check.items() if k!='image_url'},ensure_ascii=False))
