import urllib.request, json, pathlib, datetime, concurrent.futures, hashlib
root=pathlib.Path(__file__).resolve().parent
langs='en fr es es-mx it pt pt-br pt-pt de nl pl ru ja ko zh-tw id th zh-cn'.split()
paths=[f'v2/{l}/{e}' for l in langs for e in ['series','sets']]+['status','v2/xx/sets','v2/en/sets/base1','v2/en/sets/swsh3','v2/en/cards/base1-4','v2/en/cards/swsh3-136','v2/ja/sets','v2/ja/cards/SM1M-1','v2/en/sets/basep','v2/en/cards/basep-1','v2/zh-cn/sets/CSM1aC']
def run(p):
 url='https://api.tcgdex.net/'+p
 rec={'url':url,'fetched_at':datetime.datetime.now(datetime.timezone.utc).isoformat()}
 try:
  with urllib.request.urlopen(url,timeout=35) as r: body=r.read(); rec['http_status']=r.status
  name=p.replace('/','__')+'.json'
  try: obj=json.loads(body); root.joinpath(name).write_bytes(body); rec['file']=name; rec['items']=len(obj) if isinstance(obj,list) else None
  except ValueError: name=p.replace('/','__')+'.html';root.joinpath(name).write_bytes(body);rec['file']=name
  rec['sha256']=hashlib.sha256(body).hexdigest()
 except Exception as e: rec['error']=str(e);rec['http_status']=getattr(e,'code',None)
 return rec
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool: results=list(pool.map(run,dict.fromkeys(paths)))
root.joinpath('requests.json').write_text(json.dumps(results,indent=2))
for r in results: print(r['url'],r.get('http_status'),r.get('items'),r.get('error',''))
