export class Store<T> {
    private state!: T;
    private getters!: GetterMap<T>;
    readonly mutations!: MutationMap<T>;

    public constructor(options: StoreOptions<T>) {
        this.state = options.state;

        this.getters = {};
        Object.keys(options.getters).forEach((key) => {
            this.getters[key] = options.getters[key];
        });

        this.mutations = {};
        Object.keys(options.mutations).forEach((key) => {
            this.mutations[key] = options.mutations[key];
        });
    }

    public mutate<T>(key: string, payload: T): any {
        this.mutations[key](this.state, payload);
    }

    public get<T>(key: string): T {
        return this.getters[key](this.state) as T;
    }
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

export type Getter<T> = (state: T) => any;
export type Mutator<T> = (state: T, payload: any) => any;

export function createStore<T>(options: StoreOptions<T>): Store<T> {
    return new Store(options);
}
