export interface Wave {
    name: string;
    steps: WaveStep[];
}
export interface WaveStep {
    duration: number;
    enemyType: string;
    enemyAmount: number;
}
