// Wave describes a wave of enemies. A wave is composed of steps, which define the composition of enemies
export interface Wave {
    name: string;
    steps: WaveStep[];
}

// WaveStep describes one step of a wave which is composed of the duration, the type of enemy and the number of enemies
// spawned
export interface WaveStep {
    duration: number;
    enemyType: string;
    enemyAmount: number;
}
