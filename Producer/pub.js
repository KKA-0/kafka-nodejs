const express = require('express');
const app = express();
const port = 5000;
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'producer',
  brokers: ['kafka:9092'],
})
const producer = kafka.producer()
const run = async () => {
    // Produce
    await producer.connect()
    await producer.send({
    topic: 'test-topic',
    messages: [
        { value: 'Hello KKA' },
    ],
    })

    await producer.disconnect()
}
run();
app.listen(port, () => {
    console.log("server running for Publisher at: ", port)
})