import json
import requests

if __name__ == '__main__':
    old_data = []
    with open('../src/data/historicData.json', 'r') as jsonf:
        old_data = json.loads(jsonf.read())
        r = requests.get(
            url='https://services-eu1.arcgis.com/zk7YlClTgerl62BY/arcgis/rest/services/global_corona_actual_widok3/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&resultOffset=0&resultRecordCount=100&resultType=standard&cacheHint=true')
        data = r.json()

        if old_data[-1]['DATA_SHOW'] != data['features'][0]['attributes']['DATA_SHOW']:
            old_data.append(data['features'][0]['attributes'])

    with open('../src/data/historicData.json', 'w') as jsonf:
        jsonf.write(json.dumps(old_data, indent=2))
