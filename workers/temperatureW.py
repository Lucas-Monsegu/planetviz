import requests
import json
import pymongo
import datetime


def Work():

    def Get(lat, lon):
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
        }
        return cleanRes

    with open('utils/coordinates_to_country_code_v2.json', 'r') as f:
        coordinates = json.load(f)
    # to test without all the data
    # coordinates = {
    #     "fr": ['48.866667 2.333333'],
    #     "us": ['40.7808 -73.9772']
    # }
    client = pymongo.MongoClient()
    db = client.planetvizDB
    collections = {
        'temp': db['temp'],
        'wind': db['wind'],
        'pressure': db['pressure'],
        'humidity': db['humidity']
    }
    date = datetime.datetime.now()
    for country_code, string_coordinates in coordinates.items():
        for string_coordinate in string_coordinates:
            res = Get(*map(float, string_coordinate.split(' ')))
            for typ, col in collections.items():
                col.insert_one({
                    'country': country_code,
                    'coord': string_coordinate,
                    'date': date,
                    'value': res[typ]
                })
