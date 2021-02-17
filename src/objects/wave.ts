import { StepConfig, WaveConfig } from '@/types/wave';

export default class Wave {
    private name!: string;
    private steps!: Step[];

    private currentStep = 0;
    private remainingEnemies = 0;

    public constructor(waveConfig: WaveConfig) {
        this.name = waveConfig.name;

        this.steps = new Array<Step>();
        waveConfig.steps.forEach((step) => {
            this.remainingEnemies += step.enemyAmount;
            this.steps.push(new Step(step));
        });

        console.log(this.remainingEnemies);
    }

    public getName(): string {
        return this.name;
    }

    // getDuration returns the duration of the wave (sum of step durations)
    public getDuration(): number {
        let duration = 0;
        this.steps.forEach((step) => {
            duration += step.getDuration();
        });
        return duration;
    }

    public getSteps(): number {
        return this.steps.length;
    }

    // curretStep returns the current step
    public curretStep(): Step {
        return this.steps[this.currentStep];
    }

    public getRemainingEnemies(): number {
        return this.remainingEnemies;
    }

    // nextStep advances to the next step and returns it
    public nextStep(): Step {
        this.currentStep++;
        console.log(this.currentStep);
        return this.steps[this.currentStep];
    }

    public removeEnemy(): void {
        this.remainingEnemies--;
    }
}

export class Step {
    private duration!: number;
    private enemyType!: string;
    private enemyAmount!: number;

    public constructor(stepConfig: StepConfig) {
        this.duration = stepConfig.duration;
        this.enemyType = stepConfig.enemyType;
        this.enemyAmount = stepConfig.enemyAmount;
    }

    public getDuration(): number {
        return this.duration;
    }

    public getEnemyType(): string {
        return this.enemyType;
    }

    public getEnemyAmount(): number {
        return this.enemyAmount;
    }

    public getInterval(): number {
        return this.duration / this.enemyAmount;
    }
}
