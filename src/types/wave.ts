// Wave describes a wave of enemies. A wave is composed of steps, which define the composition of enemies
export interface WaveConfig {
    name: string;
    steps: StepConfig[];
}

// WaveStep describes one step of a wave which is composed of the duration, the type of enemy and the number of enemies
// spawned
export interface StepConfig {
    duration: number;
    enemyType: string;
    enemyAmount: number;
}
