import subprocess,json,pathlib
root=pathlib.Path.cwd(); out=root/'05_scratch/stripe-pruebas'
base=['npx','--yes','agent-browser','--session','epi10-qa-52']
def run(*args): return subprocess.check_output(base+list(args),text=True).strip()
js="JSON.stringify({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,title:document.querySelector('h1')?.innerText,buttons:Array.from(document.querySelectorAll('button')).filter(e=>e.textContent.includes('Probar')).map(e=>({text:e.innerText,height:e.getBoundingClientRect().height,width:e.getBoundingClientRect().width,left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right,font:getComputedStyle(e).fontSize})),images:Array.from(document.images).map(e=>({alt:e.alt,loaded:e.complete&&e.naturalWidth>0,width:e.width})),bodyFont:getComputedStyle(document.body).fontFamily,paragraphs:Array.from(document.querySelectorAll('.hero-intro,.section-intro,.offer-note,.demo-disclosure')).map(e=>({text:e.innerText,font:getComputedStyle(e).fontSize})),viewportMeta:document.querySelector('meta[name=viewport]')?.content})"
run('scrollintoview','footer')
run('wait','--fn','Array.from(document.images).every(e=>e.complete&&e.naturalWidth>0)')
checks=[]
for width in [320,390,768,1440]:
 run('set','viewport',str(width),'844' if width<500 else '1000')
 raw=run('eval',js); data=json.loads(raw); data=json.loads(data) if isinstance(data,str) else data
 assert data['scrollWidth']<=width and data['bodyWidth']<=width,data
 assert all(i['loaded'] for i in data['images']),data
 assert all(b['height']>=44 and b['left']>=0 and b['right']<=width for b in data['buttons']),data
 checks.append(data)
run('set','viewport','390','844')
run('scroll','up','10000')
run('screenshot',str(out/'landing-mobile-top.png'))
run('scrollintoview','#demo')
run('screenshot',str(out/'landing-mobile-cta.png'))
(out/'responsive-landing.json').write_text(json.dumps(checks,indent=2,ensure_ascii=False)+'\n')
print(json.dumps({'widths':[c['width'] for c in checks],'no_overflow':True,'buttons_min_height':min(b['height'] for c in checks for b in c['buttons']),'images_loaded':True}))
