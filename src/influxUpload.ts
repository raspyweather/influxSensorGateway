import Influx from 'influx';

import influxConfig from './influxConfig';
import influxTransform from './influxDataTransform';

const influx = new Influx.InfluxDB(influxConfig as any);
const measurementName = influxConfig.schema[0].measurement;

export default (newData: any) => {
    influx.writePoints(influxTransform(newData, measurementName));
}