export declare class Store<T> {
    private state;
    private getters;
    private mutations;
    private subscribers;
    constructor(options: StoreOptions<T>);
    mutate<T>(key: string, payload: T): any;
    get<T>(key: string): T;
    subscribe(key: string, subscriber: Subscriber<T>): void;
    private __internalNotifier;
}
export interface StoreOptions<T> {
    state: T;
    getters: GetterMap<T>;
    mutations: MutationMap<T>;
}
export interface GetterMap<T> {
    [key: string]: Getter<T>;
}
export interface MutationMap<T> {
    [key: string]: Mutator<T>;
}
export interface SubscriberMap<T> {
    [key: string]: Subscriber<T>[];
}
export declare type Getter<T> = (state: T) => any;
export declare type Mutator<T> = (state: T, payload: any) => void;
export declare type Subscriber<T> = (state: T, payload: any) => void;
export declare function createStore<T>(options: StoreOptions<T>): Store<T>;
