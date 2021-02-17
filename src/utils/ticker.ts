export type TickerFunc = (
    tick: number,
    ticks: number,
    interval: number
) => void;

export default class Ticker {
    private tick = 0;
    private ticks = 0;
    private interval = 0;
    private leading!: boolean;
    private internalInterval!: number;

    private callbacks!: TickerFunc[];

    public constructor(ticks: number, interval: number, leading = false) {
        this.ticks = ticks;
        this.interval = interval;
        this.leading = leading;

        this.callbacks = new Array<TickerFunc>();
    }

    public start(): void {
        this.restart();
    }

    public stop(): void {
        this.reset();
    }

    public stopAfter(delay: number): void {
        setTimeout(() => {
            this.reset();
        }, delay * 1000);
    }

    public restart(): void {
        this.tick = 0;
        this.__internalDone();
        this.__internalTicker();
    }

    public restartWithInterval(): void {
        this.__internalDone();
        this.__internalTicker();
    }

    public reset(): void {
        this.tick = 0;
        this.ticks = 0;
        this.interval = 0;
        this.__internalDone();
    }

    public on(fn: TickerFunc): void {
        this.callbacks.push(fn);
    }

    public setInterval(newInterval: number): void {
        this.interval = newInterval;
    }

    public setTicks(newTicks: number): void {
        this.ticks = newTicks;
    }

    private __internalTicker() {
        if (this.leading && this.tick == 0) {
            this.__internalCallback();
            this.tick++;
        }

        if (this.tick >= this.ticks && this.ticks != -1) {
            return;
        }

        this.internalInterval = setTimeout(() => {
            this.__internalCallback();
            this.__internalTicker();
            this.tick++;
        }, this.interval * 1000);
    }

    private __internalCallback(): void {
        if (this.callbacks.length == 0) return;

        this.callbacks.forEach((fn) => {
            fn(this.tick, this.ticks, this.interval);
        });
    }

    private __internalDone(): void {
        clearTimeout(this.internalInterval);
    }
}
