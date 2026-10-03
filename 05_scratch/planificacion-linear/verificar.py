import json
import pathlib
import re

root = pathlib.Path(__file__).resolve().parents[2]
folder = root / '04_outputs/planificacion/linear'
source = json.loads((root / '05_scratch/planificacion-linear/fuentes-snapshot.json').read_text())

for name, doc in zip(['00_situacion.md', '01_roadmap_funcional.md', '02_roadmap_cronologico.md'], source['documents']):
    raw = (folder / name).read_text()
    assert raw.split('\n---\n\n', 1)[1] == doc['content'] + '\n', name
    assert doc['url'] in raw and doc['updatedAt'] in raw and doc['id'] in raw

issues = source['issues']['issues']
active = source['active']['issues']
unassigned = source['unassigned']['issues']
assert len(issues) == len({i['id'] for i in issues}) == 106
assert len(active) == 104 and len(unassigned) == 105
assert all(source[k]['hasNextPage'] is False for k in ['issues', 'active', 'unassigned'])
assert {i['id'] for i in active} == {i['id'] for i in issues if i['archivedAt'] is None}
assert {i['id'] for i in unassigned} == {i['id'] for i in issues if not i.get('assignee')}

text = (folder / 'tareas.md').read_text()
rows = [row for row in text.splitlines() if re.match(r'\| T\d{3} \|', row)]
assert len(rows) == len(set(re.findall(r'\| (T\d{3}) \|', text))) == 106
assert len(re.findall(r'^## OL\d', text, re.M)) == 8
for issue in issues:
    row = next(row for row in rows if f'[{issue["id"]} — ' in row)
    assert issue['url'] in row
    assert f'| {issue["status"]} |' in row
    assert f'| {issue.get("assignee") or "Sin asignar"} |' in row
    assert f'| {issue["dueDate"] or "Sin fecha"} |' in row
    assert (f'Sí · {issue["archivedAt"]}' if issue['archivedAt'] else '| No |') in row

functional = source['documents'][1]['content']
refs = re.findall(r'\*\*(T\d+) · (OL\d+)\*\* — `([^`]+)`', functional)
assert len(refs) == 106
for ref, wave, title in refs:
    normalized = re.sub(r'^OL\d+ \[[^\]]+\] ', '', title).removesuffix(' | EPI10 MVP Fase 1')
    issue = next(i for i in issues if i['title'] == normalized)
    assert issue['projectMilestone']['name'].startswith(wave + ' ')
    assert f'| {ref} | [{issue["id"]} — ' in text
assert len(re.findall(r'^## \d+\.', functional, re.M)) == 7
assert len(re.findall(r'^### \d+\.\d+', functional, re.M)) == 31

local_links = []
for path in folder.glob('*.md'):
    for link in re.findall(r'\]\(([^)]+)\)', path.read_text()):
        if re.match(r'https?://', link) or link.startswith('#'):
            continue
        local_links.append((path.name, link, (path.parent / link.split('#')[0]).resolve().exists()))
assert all(item[2] for item in local_links), [item for item in local_links if not item[2]]
secret = re.compile(r'(?:sk|rk)_(?:test|live)_[A-Za-z0-9]{12,}|whsec_[A-Za-z0-9]{12,}|-----BEGIN [A-Z ]*PRIVATE KEY-----')
assert not any(secret.search(path.read_text()) for path in folder.glob('*.md'))
result = {'result': 'PASS', 'documents_exact': 3, 'unique_tasks': 106, 'active': 104, 'archived': 2,
          'milestones': 8, 'roadmap_refs': 106, 'local_links': len(local_links),
          'functional_blocks': 7, 'functional_subblocks': 31,
          'no_secret_patterns': True, 'snapshot': source['consultedAt']}
(root / '05_scratch/planificacion-linear/qa-result.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
print(json.dumps(result, ensure_ascii=False, indent=2))
