const Influx = require('influx');
module.exports = {
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
            name: Influx.FieldType.STRING,
            sensorId: Influx.FieldType.STRING
        },
        tags: ["name","sensorId"]
    }]
};
