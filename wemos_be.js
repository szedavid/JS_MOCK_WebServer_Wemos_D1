// Createt by David Szegedi - 2020

const express = require('express');
const path = require('path');
var cors = require('cors');
const app = express();

let port = 3000;

let ledState = false;
let servoAngle = 0;

app.use(cors());

app.get('/restText', (req, res) => {
    res.send(Math.random(1000).toFixed(2).toString());
});

app.get('/monitor', (req, res) => {
    res.send(JSON.stringify(getData()));
});

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
        value: Math.random(1000)
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

// todo delete above
app.post('/led/:ledState', (req, res) => {
    ledState = Boolean(JSON.parse(req.params.ledState));
    res.send(JSON.stringify({ledState: ledState, servoAngle: servoAngle}));
});

// SERVO
app.get('/controller', function(req, res) {
    res.send(JSON.stringify({ledState: ledState, servoAngle: servoAngle}));
});

app.post('/servo/:angle', function(req, res) {
    servoAngle = req.params.angle;
    res.send(JSON.stringify({ledState: ledState, servoAngle: servoAngle}));
});




// START
app.listen(port, () => {
    console.log('Server listening on port: ' + port);
});