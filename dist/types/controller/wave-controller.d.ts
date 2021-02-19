/// <reference types="Phaser" />
import 'phaser';
import { EnemyStats } from '@/types/enemy';
import { WaveConfig } from '@/types/wave';
import Level from '@/scenes/level';
import Enemy from '@/objects/enemy';
export declare type TickerCallback = (ticks: number, interval: number, tick: number) => void;
export default class WaveController {
    private level;
    private waves;
    private currentWave;
    private currentStep;
    private group;
    private waveTicker;
    private wave;
    private availableEnemies;
    private nextWaveSound;
    constructor(waves: WaveConfig[], availableEnemies: EnemyStats[]);
    loadLevel(level: Level): void;
    start(): void;
    stop(): void;
    getEnemyInRange(x: number, y: number, range: number): Enemy | undefined;
    getEnemyGroup(): Phaser.Physics.Arcade.Group;
    removeEnemyFromWave(): void;
    private nextWave;
    private spawnEnemy;
    private removeAllEnemiesFromGroup;
}
