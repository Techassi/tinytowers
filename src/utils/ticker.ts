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
        this._internalTicker();
    }

    public stop(): void {
        this.reset();
    }

    public stopAfter(delay: number): void {
        setTimeout(() => {
            this.reset();
        }, delay * 1000);
    }

    public reset(): void {
        this.tick = 0;
        this.ticks = 0;
        this.interval = 0;
        this._internalDone();
    }

    public update(): void {
        this.tick = 0;
        this._internalDone();
        this._internalTicker();
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

    private _internalTicker() {
        if (this.leading && this.tick == 0) {
            this._internalCallback();
            this.tick++;
        }

        if (this.tick > this.ticks && this.ticks != -1) {
            return;
        }

        this.internalInterval = setTimeout(() => {
            this._internalCallback();
            this._internalTicker();
            this.tick++;
        }, this.interval * 1000);
    }

    private _internalCallback(): void {
        // console.log('cb');

        if (this.callbacks.length == 0) return;

        this.callbacks.forEach((fn) => {
            fn(this.tick, this.ticks, this.interval);
        });
    }

    private _internalDone(): void {
        clearTimeout(this.internalInterval);
    }
}
