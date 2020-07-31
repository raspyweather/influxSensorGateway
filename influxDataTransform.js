module.exports = {
    transformForInflux: (entry, measurementName) => {
        return [{
            measurement: measurementName,
            fields: {
                temperature: entry.temperature,
                humidity: entry.humidity,
                measurementsTaken: entry.measurementsTaken
            },
            tags: {
                sensorId: entry.sensorId,
                name: entry.name
            }
        }];
    }
};