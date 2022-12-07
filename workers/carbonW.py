import csv
import pymongo


with open('static-data/carbon.csv', 'r') as f:
    client = pymongo.MongoClient()
    db = client.planetvizDB
    carbon_col = db['carbon']
    spamreader = csv.reader(f)
    l = []
    i = 0
    for row in spamreader:
        i += 1
        if (i == 0):
            continue
        (
            countryCode,
            country,
            gas,
            gasFullName,
            var,
            varFullName,
            yea,
            year,
            unitCode,
            unit,
            powerCodeNumber,
            powerCode,
            unkown,
            unkown2,
            value,
            unwanted,
            unwanted2
        ) = row
        if (gas != 'GHG' or var != 'TOTAL'):
            continue
        if country not in l:
            l.append(country)
            print(country, len(l))

        carbon_col.insert_one(
            {'country': country.lower(), 'year': int(year), 'value': float(value)})
