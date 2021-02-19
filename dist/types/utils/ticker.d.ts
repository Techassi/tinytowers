export declare type TickerFunc = (tick: number, ticks: number, interval: number) => void;
export default class Ticker {
    private tick;
    private ticks;
    private interval;
    private leading;
    private internalInterval;
    private callbacks;
    constructor(ticks: number, interval: number, leading?: boolean);
    start(): void;
    stop(): void;
    stopAfter(delay: number): void;
    restart(): void;
    restartWithInterval(): void;
    reset(): void;
    on(fn: TickerFunc): void;
    setInterval(newInterval: number): void;
    setTicks(newTicks: number): void;
    private __internalTicker;
    private __internalCallback;
    private __internalDone;
}
