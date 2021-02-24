export class Bus {
    private callbacks!: CallbackMap;

    public constructor() {
        this.callbacks = {};
    }

    public on(key: string, fn: Callback): void {
        this.callbacks[key] = this.callbacks[key] || [];
        this.callbacks[key].push(fn);
    }

    public off(key: string, fn: Callback): void {
        if (this.callbacks[key] && this.callbacks[key].length > 0) {
            for (let i = 0; i < this.callbacks[key].length; i++) {
                if (this.callbacks[key][i] == fn) {
                    this.callbacks[key].splice(i, 1);
                    break;
                }
            }
        }
    }

    public emit(key: string, data?: any): void {
        this.callbacks[key].forEach((fn) => {
            fn(data);
        });
    }
}

export interface CallbackMap {
    [key: string]: Array<Callback>;
}

export type Callback = (data?: any) => any;

// Komm Freddy, Bus bauen
export function createBus(): Bus {
    return new Bus();
}

const instance = createBus();
Object.freeze(instance);

export default instance;
