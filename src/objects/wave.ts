export default class Wave {
    private name!: string;
    private steps!: Step[];

    public constructor(name: string, steps: Step[]) {
        this.name = name;
        this.steps = steps;
    }
}

export class Step {
    private duration!: number;
    private enemyType!: string;
    private enemyAmount!: number;
}
