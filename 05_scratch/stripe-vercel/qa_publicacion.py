import json,subprocess
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin
P=Path('05_scratch/stripe-vercel');URL='https://epi10-nutriwell-demo.vercel.app'
class Page(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.images=[];self.meta={};self.styles=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='a':self.links.append(a.get('href',''))
  if tag=='img':self.images.append(a)
  if tag=='meta':self.meta[a.get('property') or a.get('name')]=a.get('content')
  if tag=='link' and a.get('rel')=='stylesheet':self.styles.append(a['href'])
def fetch(url,target):
 r=subprocess.run(['curl','-sS','--max-time','35','-o',str(target),'-w','%{http_code}',url],capture_output=True,text=True,check=True)
 return int(r.stdout)
status=fetch(URL,P/'pagina-publica.html');html=(P/'pagina-publica.html').read_text();p=Page();p.feed(html)
assert status==200 and 'NutriWell' in html and 'Importe de prueba' in html, f'Public access failed: HTTP {status}'
urls=sorted(set([x['src'] for x in p.images]+p.styles+['/og.png']))
assets=[]
for i,url in enumerate(urls):
 code=fetch(urljoin(URL,url),P/f'asset-{i}.bin');assets.append({'url':url,'status':code})
checks={'anonymous_http_200':status==200,'two_checkout_links':p.links.count('https://buy.stripe.com/test_fZufZj1Nyg7mfNQ7BkeME00?locale=es')==2,'new_price_block':'Importe de prueba' in html,'og_uses_vercel':p.meta.get('og:image')==URL+'/og.png','twitter_uses_vercel':p.meta.get('twitter:image')==URL+'/og.png','no_chatgpt_origin_in_html':'chatgpt.site' not in html,'noindex':'noindex' in p.meta.get('robots',''),'stylesheets_present':len(p.styles)>0,'all_assets_http_200':all(x['status']==200 for x in assets)}
result={'result':'PASS' if all(checks.values()) else 'FAIL','url':URL,'checks':checks,'assets':assets,'request_had_cookies_or_authorization':False,'payment_executed':False};(P/'qa-publicacion.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(json.dumps(result,ensure_ascii=False));assert all(checks.values())
