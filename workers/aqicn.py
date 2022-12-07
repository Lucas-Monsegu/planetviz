import requests
import json
import pymongo
import datetime
from utils.coordinates import coordinates
import time

translate_table = {
    "pm25": "PM2.5",
    "pm10": "PM10",
    "o3": "Ozone",
    "no2": "Nitrogen Dioxide",
    "so2": "Sulphur Dioxide",
    "co": "Carbon Monoxyde",
    "r": "Rain (precipitation)",
    "d": "Dew",
}


def Work():
    def GetGaz(lat, lon):
        url = "https://api.waqi.info/feed/geo:{lat};{lon}/?token={token}"\
            .format(lat=str(lat), lon=str(lon), token='4b75b3141c96b37840ac5bfb3b77e1d948ac936e')
        try:
            j = json.loads(requests.get(url).text)
        except:
            pass
        if j['status'] != 'ok':
            return {}
        res = j['data']['iaqi']

        clean = {}
        for i in res:
            clean[i] = res[i]['v']
        clean['airquality'] = j['data']['aqi']
        g = j['data']['city']['geo']
        clean['geo'] = f'{g[0]} + {g[1]}'
        return clean

    def GetTemp(lat, lon):
        url = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={appid}' \
            .format(lat=str(lat), lon=str(lon), appid='32f8b21e3cebf9f06ba83155a946bbb9')
        try:
            res = json.loads(requests.get(url).text)
        except Exception as e:
            pass
        cleanRes = {
            'temp': res['main']['temp'],
            'pressure': res['main']['pressure'],
            'humidity': res['main']['humidity'],
            'wind': res['wind']['speed'],
            'meteo': res['weather'][0]['main'],
            'geo': f'{res["coord"]["lon"]} {res["coord"]["lat"]}'
        }
        return cleanRes

    client = pymongo.MongoClient()
    db = client.planetvizDB
    all_collections = {
        'gaz': {
            'func': GetGaz,
            'data': {
                'pm25': db['pm25'],
                'pm10': db['pm10'],
                'o3': db['ozone'],
                'no2': db['nitrogen'],
                'co': db['carbon'],
                'r':  db['rain'],
                'd': db['dew'],
                'airquality': db['airquality']
            }
        },
        'temp': {
            'func': GetTemp,
            'data': {
                'temp': db['temp'],
                'wind': db['wind'],
                'pressure': db['pressure'],
                'humidity': db['humidity']
            }
        }
    }

    n = 0
    date = datetime.datetime.now()
    with open('utils/coordinates_to_country_code_v2.json', 'r') as f:
        coordinates = json.load(f)
    # to test without all the data
    coordinates = {
        "fr": ['48.866667 2.333333', '48.866666 2.333333'],
        "us": ['40.7808 -73.9772']
    }
    for value in all_collections.values():
        get_function = value['func']
        collections = value['data']
        already_inserted_coordinates = {}

        for country_code, string_coordinates in coordinates.items():
            for string_coordinate in string_coordinates:
                res = get_function(*map(float, string_coordinate.split(' ')))
                if already_inserted_coordinates.get(res['geo']):
                    continue
                already_inserted_coordinates[res['geo']] = True

                for typ, col in collections.items():
                    if typ not in res:
                        continue
                    col.insert_one({
                        'country': country_code,
                        'coord': string_coordinate,
                        'date': date,
                        'value': res[typ]
                    })
                n += 1


Work()
