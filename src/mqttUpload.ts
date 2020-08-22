
import { connect } from 'mqtt'
import { DataPoint } from './DataPoint.interface';
const client = connect(process.env.MQTT_HOST);

export default (data: DataPoint[]) => {
    console.log(JSON.stringify(data));
    client.publish(
        process.env.MQTT_TOPIC ?? '',
        JSON.stringify(data),
        {},
        (err, info) => console.log({ err, info })
    );
    return;
}