import 'phaser';
export declare class Bus {
    private callbacks;
    constructor();
    on(key: string, fn: Callback): void;
    off(key: string, fn: Callback): void;
    emit(key: string, data?: any): void;
}
export interface CallbackMap {
    [key: string]: Array<Callback>;
}
export declare type Callback = (data?: any) => any;
export declare function createBus(): Bus;
declare const instance: Bus;
export default instance;
