const router = require("express").Router();
import { GenericDataQuery } from "../service/QueryDb";

router.get("/data/:type/:startYear/:endYear/:step", (req: any, res: any) => {
  console.log(req.params.startYear, req.params.endYear);
  GenericDataQuery(
    req.params.type,
    req.params.startYear,
    req.params.endYear,
    req.params.step,
    (data: any) => {
      if (data === null) {
        console.log(data);
        res.send({});
      } else {
        console.log(data);
        res.send(data);
      }
    }
  );
});

module.exports = router;
