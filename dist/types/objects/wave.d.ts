import { StepConfig, WaveConfig } from '@/types/wave';
export default class Wave {
    private name;
    private steps;
    private currentStep;
    private remainingEnemies;
    constructor(waveConfig: WaveConfig);
    getName(): string;
    getDuration(): number;
    getSteps(): number;
    curretStep(): Step;
    getRemainingEnemies(): number;
    nextStep(): Step;
    removeEnemy(): void;
}
export declare class Step {
    private duration;
    private enemyType;
    private enemyAmount;
    constructor(stepConfig: StepConfig);
    getDuration(): number;
    getEnemyType(): string;
    getEnemyAmount(): number;
    getInterval(): number;
}
