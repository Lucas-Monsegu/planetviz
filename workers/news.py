import pymongo
import requests
from datetime import datetime, timedelta
from bson.objectid import ObjectId
from utils.countrycodes import ccode
client = pymongo.MongoClient()
db = client.planetvizDB

def tempMaxOfTheDay(db):
    start_date = datetime.now() + timedelta(-1)
    dummy_id = ObjectId.from_datetime(start_date)
    mongo_filter = {'_id': {'$gte': dummy_id}}
    dailyTemp = db["tempDaily"].find(mongo_filter)
    data = [d for d in dailyTemp]
    tempMax = 0
    tempCountry = ""

    for temp in data:
        if temp["value"] > tempMax:
            tempMax = max(tempMax, temp["value"])
            tempCountry = temp["country"]
    
    return (tempMax, tempCountry)

(tempMax, tempCountry) = tempMaxOfTheDay(db)
# TODO: Add BasicAuth of API Token to request
response = requests.post("api.twitter.com/oauth2/token")
token = response.json()["access_token"]
print(f"Max temperature is of {tempMax} in {ccode[tempCountry]}")
