// Createt by David Szegedi - 2020

const express = require('express');
const path = require('path');
var cors = require('cors');
const app = express();

let port = 3000;

let ledState = false;

app.use(cors());

app.get('/restText', (req, res) => {
    res.send(Math.random(1000).toFixed(2).toString());
});

app.get('/rest', (req, res) => {
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
        ledState: ledState,
        // time: now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(),
        time: (now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds())*1000 + now.getMilliseconds(),
        value: Math.random(1000)
    };
    return myObj;
}

// LED
app.get('/on', (req, res) => {
    ledState = true;
    res.send(JSON.stringify({ledState: ledState}));
});

app.get('/off', (req, res) => {
    ledState = false;
    res.send(JSON.stringify({ledState: ledState}));
});


app.listen(port, () => {
    console.log('Server listening on port: ' + port);
});