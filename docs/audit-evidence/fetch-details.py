import pathlib
exec(open(pathlib.Path(__file__).with_name('fetch-inventory.py')).read().split('with concurrent.futures.ThreadPoolExecutor')[0])
paths=[]
for l in langs:
 for s in json.loads(root.joinpath(f'v2__{l}__series.json').read_text()): paths.append(f'v2/{l}/series/{s["id"]}')
paths+=['v2/ja/sets/PMCG1','v2/ja/sets/SM1M','v2/ja/sets/DP1','v2/ja/sets/BW1','v2/ja/sets/S8a-P','v2/en/sets/30th','v2/ja/cards/SM1M-001','v2/es-mx/sets/sv09','v2/nl/sets/base1','v2/pl/sets/dp1']
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool: results=list(pool.map(run,paths))
root.joinpath('requests-detail.json').write_text(json.dumps(results,indent=2))
print('requests',len(results),'errors',[r for r in results if 'error' in r])
