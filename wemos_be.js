// Created by David Szegedi - 2020
// Feel free to use it for any project.

const express = require("express");
const path = require("path");
var cors = require("cors");
const app = express();

let port = 3000;

let ledState = false;
let servoAngle = 0;

const POTMETER_DATA_INTERVAL = 100;
let potmeterDataTime = 0;
let potmeterData = { time: 0, value: 0 };

app.use(cors());

// not used yet
app.get("/rest-array", (req, res) => {
  let data = [];
  for (let i = 0; i < 10; i++) {
    data.push(getData());
  }
  // console.log(data);
  res.end(JSON.stringify(data));
});

// - QUERY
app.get("/V1/monitor", (req, res) => {
  res.send(JSON.stringify(potmeterData));
});

app.get("/v1/controller", function(req, res) {
  res.send(JSON.stringify({ ledState: ledState, servoAngle: servoAngle }));
});

// - SET
app.post("/v1/led", (req, res) => {
  ledState = Boolean(JSON.parse(req.query.state));
  res.send(JSON.stringify({ ledState: ledState, servoAngle: servoAngle }));
});

app.post("/v1/servo", function(req, res) {
  servoAngle = req.query.angle;
  res.send(JSON.stringify({ ledState: ledState, servoAngle: servoAngle }));
});

setInterval(() => {
  potmeterData = {
    time: potmeterDataTime.toFixed(0),
    value: (Math.sin(potmeterDataTime/3) + 1) * 2   // value range: 0 - 4    potmeterDataTime/3 to slow change down
  };
  potmeterDataTime += POTMETER_DATA_INTERVAL/1000.0;
}, POTMETER_DATA_INTERVAL);

// START
app.listen(port, () => {
  console.log("Server listening on port: " + port);
});
