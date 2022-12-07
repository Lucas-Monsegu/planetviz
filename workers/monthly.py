import pymongo
from datetime import datetime, timedelta
from bson.objectid import ObjectId
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
            if tab.get(data['coord']) == None:
                tab[data['coord']] = {d: [0, 0]
                                      for d in data if d != '_id' and 'coord'}
            tab[data['coord']][key][1] += 1
            tab[data['coord']][key][0] += a
    return {k: v['value'][0]/v['value'][1] for k, v in tab.items()}


def Monthly():
    collections = {
        'temp': db['tempDaily'],
        'wind': db['windDaily'],
        'pressure': db['pressureDaily'],
        'humidity': db['humidityDaily'],
        'pm25': db['pm25'],
        'pm10': db['pm10'],
        'o3': db['ozone'],
        'no2': db['nitrogen'],
        'co': db['carbon'],
        'r':  db['rain'],
        'd': db['dew'],
        'airquality': db['airquality']
    }
    res = {}
    start_date = datetime.now() + timedelta(-30)
    dummy_id = ObjectId.from_datetime(start_date)
    day = datetime.now().strftime('%Y-%m')
    for name, collection in collections.items():
        mongo_filter = {'_id': {'$gte': dummy_id}}
        datas = [d for d in collection.find(
            mongo_filter).sort('timestamp', -1)]
        datas = getAverages(datas)
        if not datas:
            continue
        for key in datas:
            colres = db[name+'Monthly']
            res = {'coord': key, 'value': datas[key], 'date': day}
            colres.insert_one(res)


Monthly()
