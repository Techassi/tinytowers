export interface WaveConfig {
    name: string;
    steps: StepConfig[];
}
export interface StepConfig {
    duration: number;
    enemyType: string;
    enemyAmount: number;
}
