import csv
import json
import os
import time
import datetime

aktualne_dane = {
    'LICZBA_ZAKAZEN': 2552898,
    'LICZBA_ZGONOW': 58176,
    'WSZYSCY_OZDROWIENCY': 2143065
}


def make_json(csvFilePath):
    with open(csvFilePath) as csvf:
        csvReader = csv.DictReader(csvf, delimiter=';')
        for row in csvReader:
            return row


if __name__ == '__main__':
    data = []
    parsed = []

    oldData = []
    with open('Zakazenia30323112020.csv') as csvf:
        csvReader = csv.DictReader(csvf, delimiter=';')
        for row in csvReader:
            oldData.append({
                'DATA_SHOW': row['Data'] + ' 10:30',
                'KWARANTANNA': int(row['Kwarantanna'].replace(" ", "")),
                'LICZBA_ZAKAZEN': int(row['Wszystkie przypadki kumulatywnie'].replace(" ", "")),
                'LICZBA_ZGONOW': int(row['Wszystkie zgony kumulatywnie'].replace(" ", "")),
                'TESTY': '-',
                'TESTY_POZYTYWNE': '-',
                'ZAKAZENIA_DZIENNE': int(row['Nowe przypadki'].replace(" ", "")),
                'ZGONY_COVID': '-',
                'ZGONY_DZIENNE': int(row['Zgony'].replace(" ", "")),
                'ZGONY_WSPOLISTNIEJACE': '-',
                'ZLECENIA_POZ': '-',
                'LICZBA_OZDROWIENCOW': int(row['Ozdrowieńcy (dzienna)'].replace(" ", "")),
                'WSZYSCY_OZDROWIENCY': int(row['Ozdrowieńcy (suma)'].replace(" ", "")),
                'AKTUALNE_ZAKAZENIA': int(row['Aktywne przypadki'].replace(" ", ""))
            })

    for index, file in enumerate(os.listdir('./historic/')):
        data.append(make_json('./historic/' + file))
        date = file.split('_')[0]
        data[-1]['date'] = date[6:8] + '.' + date[4:6] + '.' + date[0:4] + ' 10:30'
        parsed.append({})

    parsed.pop()

    for i in range(len(data) - 2, -1, -1):
        # data[-1]['date'] = date[0:4]+'-'+date[4:6]+'-'+date[6:8] + ' ' + date[8:10] + ':' + date[10:12] + ':' + date[12:14]

        parsed[i]['DATA_SHOW'] = data[i]['date']
        parsed[i]['KWARANTANNA'] = int(data[i]['liczba_osob_objetych_kwarantanna'])

        if (i == len(data) - 2):
            parsed[i]['LICZBA_ZAKAZEN'] = aktualne_dane['LICZBA_ZAKAZEN'] - int(data[i]["liczba_przypadkow"])
        else:
            parsed[i]['LICZBA_ZAKAZEN'] = parsed[i + 1]['LICZBA_ZAKAZEN'] - int(data[i]["liczba_przypadkow"])

        if (i == len(data) - 2):
            parsed[i]['LICZBA_ZGONOW'] = aktualne_dane['LICZBA_ZGONOW'] - int(data[i]["zgony"])
        else:
            parsed[i]['LICZBA_ZGONOW'] = parsed[i + 1]['LICZBA_ZGONOW'] - int(data[i]["zgony"])

        if (int(parsed[i]['DATA_SHOW'].split(' ')[0].split('.')[0]) <= 24 and int(
                parsed[i]['DATA_SHOW'].split(' ')[0].split('.')[1]) <= 12 or int(
                parsed[i]['DATA_SHOW'].split(' ')[0].split('.')[1]) <= 11) and int(
                parsed[i]['DATA_SHOW'].split(' ')[0].split('.')[2]) <= 2020:
            parsed[i]['LICZBA_OZDROWIENCOW'] = '-'
            parsed[i]['WSZYSCY_OZDROWIENCY'] = '-'
            parsed[i]['AKTUALNE_ZAKAZENIA'] = '-'
        else:
            parsed[i]['LICZBA_OZDROWIENCOW'] = int(data[i]['liczba_ozdrowiencow'])

            if (i == len(data) - 2):
                parsed[i]['WSZYSCY_OZDROWIENCY'] = aktualne_dane['WSZYSCY_OZDROWIENCY'] - int(
                    data[i]["liczba_ozdrowiencow"])
            else:
                parsed[i]['WSZYSCY_OZDROWIENCY'] = parsed[i + 1]['WSZYSCY_OZDROWIENCY'] - int(
                    data[i]["liczba_ozdrowiencow"])

            if (i == len(data) - 2):
                parsed[i]['AKTUALNE_ZAKAZENIA'] = int(parsed[i]["LICZBA_ZAKAZEN"]) - int(
                    parsed[i]["LICZBA_ZGONOW"]) - int(parsed[i]["WSZYSCY_OZDROWIENCY"])
            else:
                parsed[i]['AKTUALNE_ZAKAZENIA'] = parsed[i + 1]['AKTUALNE_ZAKAZENIA'] - int(
                    parsed[i]["LICZBA_ZGONOW"]) - int(parsed[i]["WSZYSCY_OZDROWIENCY"])

        parsed[i]['TESTY'] = int(data[i]['liczba_wykonanych_testow'])
        parsed[i]['TESTY_POZYTYWNE'] = int(data[i]['liczba_testow_z_wynikiem_pozytywnym'])

        parsed[i]['ZAKAZENIA_DZIENNE'] = int(data[i]['liczba_przypadkow'])
        parsed[i]['ZGONY_COVID'] = int(data[i]['zgony_w_wyniku_covid_bez_chorob_wspolistniejacych'])
        parsed[i]['ZGONY_DZIENNE'] = int(data[i]['zgony'])
        parsed[i]['ZGONY_WSPOLISTNIEJACE'] = int(data[i]['zgony_w_wyniku_covid_i_chorob_wspolistniejacych'])
        parsed[i]['ZLECENIA_POZ'] = int(data[i]['liczba_zlecen_poz'])

    with open('../../src/data/historicData.json', 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(oldData + parsed, indent=4))
