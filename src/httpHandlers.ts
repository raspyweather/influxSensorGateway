import express from 'express';
const port = 8080;
const app = express();
import bodyParser from 'body-parser';
import { sensorNames } from './sensorNames';
const jsonParser = bodyParser.json();

export function createServer(
    checkData: (data: any) => boolean,
    insertData: (data: any) => void) {
    app.post('/ingress', jsonParser, (request, response) => {
        try {
            const data = request.body;

            if (!checkData(data)) {
                response.status(400);
                response.send('Invalid data');
                console.log({ data });
                return;
            }

            insertData(data);
            response.status(200);
            response.send();
            console.log(`${new Date().toISOString()} |  Received datapoint ${data.id}|${sensorNames[data.id]}`);
        } catch (e) { console.error(e); }
    });

    app.get('/health', (request, response) => {
        response.status(204);
        response.send();
    });

    app.listen(port, () => {
        console.log(`server is listening on ${port}`);
    });
}