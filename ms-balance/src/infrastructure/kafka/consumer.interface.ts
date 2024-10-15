export interface SimpleConsumer {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    handle(payload: any): Promise<void>;
}