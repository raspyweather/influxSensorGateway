export interface DataPoint {
    fields: Fields;
    tags: Tags;
    timestamp: string;
}

interface Fields {
    temperature?: number;
    humidity?: number;
    pressure?: number;

    windSpeed?: number;
    windDirection?: number;

    rssi?: number;
    measurementsTaken?: number;
}

interface Tags {
    sensorId: string;
    site: string;
    location: string;
    sensorName: string;
}