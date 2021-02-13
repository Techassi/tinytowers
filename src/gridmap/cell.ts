export default class Cell {
    private type!: string;

    public constructor(type: string) {
        this.type = type;
    }

    public setType(type: string): void {
        this.type = type;
    }

    public getType(): string {
        return this.type;
    }
}
