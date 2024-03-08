const express = require('express');
const app = express();
const port = 5001;
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'consumer',
  brokers: ['kafka:9092'],
})
const topic = 'test-topic'
const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })
  await consumer.run({
    // eachBatch: async ({ batch }) => {
    //   console.log(batch)
    // },
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
      console.log(`- ${prefix} ${message.key}#${message.value}`)
    },
  })
}

run().catch(e => console.error(`[example/consumer] ${e.message}`, e))


app.listen(port, () => {
    console.log("server running for Consumer at: ", port)
})