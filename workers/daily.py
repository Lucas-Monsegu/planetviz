import pymongo
from datetime import datetime, timedelta
from bson.objectid import ObjectId
import time

# TODELETE
from aqicn import Work
client = pymongo.MongoClient()
db = client.planetvizDB


def getAverages(datas):
    if datas == []:
        return None
    tab = {}
    for data in datas:
        for key in data:
            if key != 'value':
                continue
            a = float(data[key])
            if tab.get(data['coord']) is None:
                tab[data['coord']] = {d: [0, 0]
                                      for d in data if d != '_id' and 'coord'}
            tab[data['coord']][key][1] += 1
            tab[data['coord']][key][0] += a
    return {k: v['value'][0]/v['value'][1] for k, v in tab.items()}


def getCountryTable(datas):
    tab = {}
    for data in datas:
        if tab.get(data['coord']) == None:
            tab[data['coord']] = data['country']
    return tab


def Daily():
    collections = {
        'temp': db['temp'],
        'wind': db['wind'],
        'pressure': db['pressure'],
        'humidity': db['humidity'],
        'pm25': db['pm25'],
        'pm10': db['pm10'],
        'o3': db['ozone'],
        'no2': db['nitrogen'],
        'co': db['carbon'],
        'r':  db['rain'],
        'd': db['dew'],
        'airquality': db['airquality']
    }
    start_date = datetime.now() + timedelta(-1)
    dummy_id = ObjectId.from_datetime(start_date)
    day = datetime.now()
    for name, collection in collections.items():
        mongo_filter = {'_id': {'$gte': dummy_id}}
        datas = [d for d in collection.find(
            mongo_filter).sort('timestamp', -1)]
        countryTable = getCountryTable(datas)
        datas = getAverages(datas)
        if not datas:
            continue
        for key in datas:
            colres = db[name+'Daily']
            res = {'coord': key, 'value': datas[key],
                   'date': day, 'country': countryTable[key]}
            colres.insert_one(res)
        collection.drop()
