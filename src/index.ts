import mqttUpstream from './mqttUpload';
import { createServer } from './httpHandlers';
import cron from 'cron';
import { DataPoint } from './DataPoint.interface';
// import uploadToInflux from './influxUpload';
import { sensorNames } from './sensorNames';

let buffer: DataPoint[] = [];

function transformData(rawData: any[]) {
    return rawData.map(entry => {
        return <DataPoint>{
            tags: {
                site: 'Altkrautheim',
                location: sensorNames[entry.sensorId] ?? entry.location,
                sensorId: entry.sensorId,
                sensorName: entry.sensorName
            },
            fields: entry.fields,
            timestamp: (new Date()).toISOString()
        }
    });

}

function insertData(data: any[]) {
    buffer.push(...transformData(data));
}

function uploadData() {
    console.log({ tick: new Date().toISOString() });
    const dataToUpload = buffer;
    buffer = [];
    if (dataToUpload.length === 0) { return; }
    //  uploadToInflux(dataToUpload);
    mqttUpstream(dataToUpload);
}

const cronjob = new cron.CronJob('* * * * *', uploadData, null, true, 'Europe/Berlin');
cronjob.start();

createServer(() => true, insertData);