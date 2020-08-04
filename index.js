
const Influx = require('influx');

const influxConfig = require('./influxConfig');
const influxTransform = require('./influxDataTransform').transformForInflux;

const influx = new Influx.InfluxDB(influxConfig);
const measurementName = influxConfig.schema[0].measurement;

const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const app = express();


const port = 8080;

const transforms = {
    // 'id': 'name
};


app.post('/ingress', jsonParser, (request, response) => {
    try {
        const data = request.body;

        if (!data ||
            isNaN(data.humidity) ||
            isNaN(data.temperature) ||
            data.id === undefined ||
            data.measurementsTaken === undefined) {
            response.status(400);
            response.send('Invalid data');
            console.log({ data });
            return;
        }



        if (transforms[data.id] === undefined) {
            console.error(`Sensor ${data.id} is unknown!`);
            response.status(404);
            response.send();
            return;
        }

        const newData = {
            sensorId: data.id,
            name: transforms[data.id],
            temperature: data.temperature,
            humidity: data.humidity,
            pressure: data.pressure,
            rssi: data.rssi,
            measurementsTaken: data.measurementsTaken,
        };

        response.status(200);
        response.send();
        influx.writePoints(influxTransform(newData, measurementName));
        console.log(`${new Date().toISOString()} |  Received datapoint ${data.id}|${transforms[data.id]}`);
    } catch (e) { console.error(e); }
});

app.get('/health', (request, response) => {
    response.status(204);
    response.send();
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log(`server is listening on ${port}`);
});