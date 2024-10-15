import { Consumer, EachMessagePayload } from "kafkajs";
import { SimpleConsumer } from "./consumer.interface";
import { EventHandler } from "./event.handler.interface";


type KafkaConsumerProps = {
    consumer: Consumer,
    topics: string[],
    handler: EventHandler,
}

export class KafkaConsumer implements SimpleConsumer {
    private readonly _consumer: Consumer;
    private readonly _topics: string[];
    private readonly _handler: EventHandler;

    constructor({ consumer, topics, handler }: KafkaConsumerProps) {
        this._consumer = consumer;
        this._topics = topics;
        this._handler = handler;
    }

    async connect(): Promise<void> {
        await this._consumer.connect();
        await this._consumer.subscribe({ topics: this._topics });

        await this._consumer.run({
            eachMessage: async (payload: EachMessagePayload) => this.handle(payload),
        });
    }

    async handle({ message }: EachMessagePayload): Promise<void> {
        if (!message.value) return;


        const data = JSON.parse(message.value.toString());
        await this._handler.handle(data);
    }

    async disconnect(): Promise<void> {
        await this._consumer.disconnect();
    }
}