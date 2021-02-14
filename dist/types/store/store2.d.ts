export declare class Store<T> {
    private state;
    private getters;
    readonly mutations: MutationMap<T>;
    constructor(options: StoreOptions<T>);
    mutate(key: string, payload: any): any;
    get(key: string): any;
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
export declare type Getter<T> = (state: T) => any;
export declare type Mutator<T> = (state: T, payload: any) => any;
export declare function createStore<T>(options: StoreOptions<T>): Store<T>;
