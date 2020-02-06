// Created by David Szegedi - 2020
// Feel free to use it for any project.

const express = require('express');
const path = require('path');
var cors = require('cors');
const app = express();

let port = 3000;

let ledState = false;
let servoAngle = 0;

app.use(cors());

app.get('/monitor', (req, res) => {
    res.send(JSON.stringify(getData()));
});

// not used yet
app.get('/rest-array', (req, res) => {
            let data = [];
        for(let i=0; i<10; i++){
            data.push(getData());
        }
        // console.log(data);
        res.end(JSON.stringify(data));
});

function getData(){
    let now = new Date();
    let myObj = {
        // time: now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(),
        time: (now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds())*1000 + now.getMilliseconds(),
        value: Math.random()*4
    };
    return myObj;
}

// LED
// app.get('/on', (req, res) => {
//     ledState = true;
//     res.send(JSON.stringify({ledState: ledState}));
// });

// app.get('/off', (req, res) => {
//     ledState = false;
//     res.send(JSON.stringify({ledState: ledState}));
// });

// // todo delete above
// app.post('/led/:ledState', (req, res) => {
//     ledState = Boolean(JSON.parse(req.params.ledState));
//     res.send(JSON.stringify({ledState: ledState, servoAngle: servoAngle}));
// });

// todo delete above
app.post('/v1/led', (req, res) => {
    ledState = Boolean(JSON.parse(req.query.state));
    res.send(JSON.stringify({ledState: ledState, servoAngle: servoAngle}));
});


app.get('/v1/controller', function(req, res) {
    res.send(JSON.stringify({ledState: ledState, servoAngle: servoAngle}));
});

// SERVO
app.post('/v1/servo', function(req, res) {
    servoAngle = req.query.angle;
    res.send(JSON.stringify({ledState: ledState, servoAngle: servoAngle}));
});




// START
app.listen(port, () => {
    console.log('Server listening on port: ' + port);
});