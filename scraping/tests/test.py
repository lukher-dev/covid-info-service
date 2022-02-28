import re

def get_groups(t, r):
    return re.search(r, t).groups()

r1 = '(?:(\\d+) os.+ zmar.*|adna.os.+) (\\d+) os.+ zma'

t1 = '92 osoby zmarły z powodu #COVID19, 268 osób zmarło z powodu współistnienia COVID-19 z innymi schorzeniami.'
t2 = '4 osoby zmarły z powodu #COVID19, 36 osób zmarło z powodu współistnienia COVID-19 z innymi schorzeniami.'
t3 = 'Z powodu #COVID19 nie zmarła żadna osoba, 1 osoba zmarła z powodu współistnienia COVID-19 z innymi schorzeniami.'

print(get_groups(t1, r1))
print(get_groups(t2, r1))
print(get_groups(t3, r1))