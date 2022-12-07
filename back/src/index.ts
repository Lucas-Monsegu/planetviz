import express from "express";
import bodyparser from "body-parser";
const app = express();

// post parsing setup
app.use(
  bodyparser.urlencoded({
    extended: true
  })
);
app.use(bodyparser.json());

// server setup
let server = require("http").Server(app);
server.on("error", function(err: any) {
  console.error("Server error: ", err);
});
server.on("clientError", function(err: any) {
  console.error("Client error: ", err);
});

//app.use("/api", require("./routes/routes"));
app.use("/api/swagger", require("./routes/swagger"));
app.use("/api", require("./routes/data"));
// mongo connect
server.listen(3001, () => {
  console.log("Server running on port 3001");
});
