module.exports = {
    transformForInflux: (entry, measurementName) => {
        return [{
            measurement: measurementName,
            fields: {
                temperature: entry.temperature,
                humidity: entry.humidity,
                pressure: entry.pressure,
                rssi: entry.rssi,
                measurementsTaken: entry.measurementsTaken
            },
            tags: {
                sensorId: entry.sensorId,
                name: entry.name
            }
        }];
    }
};