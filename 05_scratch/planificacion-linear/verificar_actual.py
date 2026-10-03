import collections
import hashlib
import json
import pathlib
import re
import zipfile

root = pathlib.Path(__file__).resolve().parents[2]
folder = root / '04_outputs/planificacion/linear'
scratch = root / '05_scratch/planificacion-linear'
old = json.loads((scratch / 'fuentes-snapshot.json').read_text())
now = json.loads((scratch / 'fuentes-snapshot-actual.json').read_text())
plan = json.loads((root / '05_scratch/stripe-remodelacion/plan.json').read_text())
issues = now['issues']['issues']
by_id = {i['id']: i for i in issues}
assert len(issues) == len(by_id) == 106
assert set(by_id) == {i['id'] for i in old['issues']['issues']}
assert all(now[k]['hasNextPage'] is False for k in ['issues', 'active', 'unassigned'])
assert len(now['active']['issues']) == 104 and len(now['unassigned']['issues']) == 93
assert {i['id'] for i in now['active']['issues']} == {i['id'] for i in issues if i['archivedAt'] is None}
assert {i['id'] for i in now['unassigned']['issues']} == {i['id'] for i in issues if not i.get('assignee')}

refs = {}
for ref, wave, title in re.findall(r'\*\*(T\d+) · (OL\d+)\*\* — `([^`]+)`', old['documents'][1]['content']):
    title = re.sub(r'^OL\d+ \[[^\]]+\] ', '', title).removesuffix(' | EPI10 MVP Fase 1')
    original = next(i for i in old['issues']['issues'] if i['title'] == title)
    refs[original['id']] = ref
text = (folder / 'tareas.md').read_text()
rows = [r for r in text.splitlines() if re.match(r'\| T\d{3} \|', r)]
assert len(rows) == len(set(re.findall(r'\| (T\d{3}) \|', text))) == 106
assert len(re.findall(r'^## OL\d', text, re.M)) == 8
for issue in issues:
    row = next(r for r in rows if f'[{issue["id"]} — ' in r)
    assert f'| {refs[issue["id"]]} |' in row
    assert issue['title'].replace('|', '\\|') in row and issue['url'] in row
    assert f'| {issue["status"]} |' in row
    assert f'| {issue.get("assignee") or "Sin asignar"} |' in row
    assert f'| {issue["dueDate"] or "Sin fecha"} |' in row
    assert (f'Sí · {issue["archivedAt"]}' if issue['archivedAt'] else '| No |') in row
    parent = issue.get('parentId')
    assert (f'[{parent}]({by_id[parent]["url"]})' if parent else '| — |') in row
    section = text.split('## ' + issue['projectMilestone']['name'].strip() + '\n', 1)[1].split('\n## ', 1)[0]
    assert row in section

stripe_current = {p['id'] for p in plan['payloads']}
stripe_old = stripe_current | set(plan['merged'])
assert len(stripe_current) == 12 and len(stripe_old) == 21
for payload in plan['payloads']:
    issue = by_id[payload['id']]
    assert issue['title'] == payload['title']
    assert issue['dueDate'] == payload['dueDate']
    assert issue['assigneeId'] == payload['assignee']
    assert issue['projectMilestone']['id'] == payload['milestone']
    assert issue['statusType'] not in ['canceled'] and issue['archivedAt'] is None
assert by_id['SKI-81']['parentId'] == 'SKI-77'
for replaced, target in plan['merged'].items():
    assert by_id[replaced]['status'] == 'Canceled'
    assert by_id[replaced].get('assignee') is None
    assert by_id[replaced]['archivedAt'] is None
    assert f'| [{replaced}]({by_id[replaced]["url"]}) | [{target}]({by_id[target]["url"]}) |' in text

for original in old['issues']['issues']:
    if original['id'] in stripe_old:
        continue
    current = by_id[original['id']]
    for key in ['title', 'projectMilestone', 'status', 'statusType', 'assignee', 'dueDate', 'archivedAt']:
        assert original.get(key) == current.get(key), (original['id'], key)
for name, doc in zip(['00_situacion.md', '01_roadmap_funcional.md', '02_roadmap_cronologico.md'], old['documents']):
    assert (folder / name).read_text().split('\n---\n\n', 1)[1] == doc['content'] + '\n'

history = root / '00_inbox/linear-2026-09-15-previo-stripe'
manifest = json.loads((history / 'sha256.json').read_text())
with zipfile.ZipFile(history / 'snapshot-original-163505Z.zip') as archive:
    assert all(hashlib.sha256(archive.read(name)).hexdigest() == digest for name, digest in manifest.items())
    assert archive.read('05_scratch/planificacion-linear/verificar.py') == (scratch / 'verificar.py').read_bytes()

links = []
for path in list(folder.glob('*.md')) + [history / 'README.md']:
    for link in re.findall(r'\]\(([^)]+)\)', path.read_text()):
        if re.match(r'https?://', link) or link.startswith('#'):
            continue
        target = (path.parent / link.split('#')[0]).resolve()
        links.append((path.name, link, target.exists()))
assert all(item[2] for item in links), [item for item in links if not item[2]]
secret = re.compile(r'(?:sk|rk)_(?:test|live)_[A-Za-z0-9]{12,}|whsec_[A-Za-z0-9]{12,}|-----BEGIN [A-Z ]*PRIVATE KEY-----')
assert not any(secret.search(path.read_text()) for path in folder.glob('*.md'))
status = dict(collections.Counter(i['status'] for i in issues if i['archivedAt'] is None))
readme = (folder / 'README.md').read_text()
assert now['consultedAt'] in readme and now['consultedAt'] in text
for name, count in status.items():
    assert f'{count} `{name}`' in readme
result = {'result': 'PASS', 'snapshot': now['consultedAt'], 'tasks': 106, 'unarchived': 104,
          'archived': 2, 'status_unarchived': status, 'assigned': 13, 'unassigned': 93,
          'stripe_current': 12, 'stripe_replaced': 9, 'stripe_subtask': 'SKI-81 -> SKI-77',
          'original_refs_by_id': 106, 'untouched_non_stripe_tasks': 85,
          'original_documents_unchanged': 3, 'history_files_sha256': len(manifest),
          'local_links': len(links), 'no_secret_patterns': True}
(scratch / 'qa-result-actual.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
print(json.dumps(result, ensure_ascii=False, indent=2))
