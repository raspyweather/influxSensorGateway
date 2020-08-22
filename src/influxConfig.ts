const Influx = require('influx');
export default {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    protocol: 'http',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 8086,
    schema: [{
        measurement: 'mainData',
        fields: {
            temperature: Influx.FieldType.FLOAT,
            humidity: Influx.FieldType.FLOAT,
            rssi: Influx.FieldType.FLOAT,
            pressure: Influx.FieldType.FLOAT,
            measurementsTaken: Influx.FieldType.INTEGER,

            site: Influx.FieldType.STRING,
            sensorId: Influx.FieldType.STRING,
            sensorName: Influx.FieldType.STRING,
            location: Influx.FieldType.STRING
        },
        tags: ["site", "sensorId", "sensorName", "location"]
    }]
};
