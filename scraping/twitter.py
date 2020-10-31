import requests
from bs4 import BeautifulSoup
import re
import json
URL = 'https://mobile.twitter.com/MZ_GOV_PL'
page = requests.get(URL)

soup = BeautifulSoup(page.content, 'html.parser')
tweets = soup.find_all('div', class_='tweet-text')
dead_covid_today = None
dead_intercurrent_today = None
new_cases_today = None
cases_global = None
dead_global = None
tests_done_today = None
per_voivodeship = {}
for tweet in tweets:
    text = tweet.text.strip()
    match = re.search(
        'Z powodu COVID.19 zmar.o (\\d+) os.b, .+ innymi .+ (\\d+) os.b', text)
    if match:
        dead_covid_today = match.groups()[0].replace(" ", "")
        dead_intercurrent_today = match.groups()[1].replace(" ", "")
    match = re.search(
        'Mamy (\\d+) nowych i potwierdzonych przypadk.w zaka.enia', text)
    if match:
        new_cases_today = match.groups()[0].replace(" ", "")
    match = re.search(
        'Mamy ([ \\d]+) nowych i potwierdzonych przypadk.w zaka.enia', text)
    if match:
        new_cases_today = match.groups()[0].replace(" ", "")
    match = re.search(
        '.iczba zaka.onych koronawirusem.([ \\d]+).([ \\d]+).wszystkie', text)
    if match:
        cases_global = match.groups()[
            0].replace(" ", "")
        dead_global = match.groups()[1].replace(" ", "")
    match = re.search(
        'ci.gu doby wykonano ponad (.+) test.w', text)
    if match:
        tests_done_today = match.groups()[0]
    match = re.findall(
        '(\\S+ie)go .([ \\d]+).', text)
    if match:
        for m in match:
            woj= m[0].replace("ą", "a").replace("ś", "s").replace("ń", "n").replace("ł", "l").replace("ó", "o").replace("ę", "e")
            per_voivodeship[woj] = m[1].replace(" ", "")
            
print(json.dumps({
    'dead_covid_today': dead_covid_today,
    'dead_intercurrent_today': dead_intercurrent_today,
    'new_cases_today': new_cases_today,
    'cases_global': cases_global,
    'dead_global': dead_global,
    'tests_done_today': tests_done_today,
    'per_voivodeship': per_voivodeship,
}, sort_keys=True, indent=4))
