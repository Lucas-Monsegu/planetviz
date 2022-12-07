import { redis } from "./redis";
import { MongoClient, Db } from "mongodb";
import { Collection } from "mongoose";

var db: Db;
MongoClient.connect("mongodb://localhost:27017", function(err, client) {
  if (err) console.log("error while connecting to mongo");
  console.log("Connected successfully to server");

  db = client.db("planetvizDB");
});

export function GenericDataQuery(
  type: string,
  startYear: string,
  endYear: string,
  step: string,
  callback: Function
) {
  function GetModel(type: string, step: string) {
    switch (step) {
      case "day":
        return type + "Daily";
      case "month":
        return type + "Monthly";
      case "year":
        return type + "Yearly";
      default:
        return "NotFound";
    }
  }

  let key = type + startYear + endYear + step;
  let colName = GetModel(type, step);
  const collection = db.collection(colName);

  redis.get(key, (err: any, res: string) => {
    if (err) callback(null);
    else if (res) {
      console.log("error");
      callback(JSON.parse(res));
    } else {
      console.log("good");
      collection
        .find({
          date: {
            $gte: new Date(startYear),
            $lte: new Date(endYear)
          }
        })
        .toArray((err, docs) => {
          console.log("found", docs);
          if (err) return "nothing found";
          //addtoredis
          callback(docs);
        });
    }
  });
}
