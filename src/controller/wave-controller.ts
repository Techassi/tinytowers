import 'phaser';

import { EnemyStats } from '@/types/enemy';
import { WaveConfig } from '@/types/wave';

import Level from '@/scenes/level';
import Enemy from '@/objects/enemy';
import Wave from '@/objects/wave';

import Ticker from '@/utils/ticker';
import bus from '@/bus';

export type TickerCallback = (
    ticks: number,
    interval: number,
    tick: number
) => void;

export default class WaveController {
    private level!: Level;
    private waves!: WaveConfig[];
    private currentWave = 0;
    private currentStep = 0;

    private group!: Phaser.Physics.Arcade.Group;

    private waveTicker!: Ticker;
    private wave!: Wave;

    private availableEnemies!: Map<string, EnemyStats>;

    public constructor(waves: WaveConfig[], availableEnemies: EnemyStats[]) {
        this.waves = waves;

        this.availableEnemies = new Map<string, EnemyStats>();
        availableEnemies.forEach((enemy) => {
            if (this.availableEnemies.has(enemy.name)) return;
            this.availableEnemies.set(enemy.name, enemy);
        });
    }

    public loadLevel(level: Level): void {
        this.level = level;

        this.group = this.level.physics.add.group({
            classType: Enemy,
            runChildUpdate: true,
        });
    }

    public start(): void {
        this.nextWave(false);

        this.waveTicker = new Ticker(-1, 1 / 4);
        this.waveTicker.on(() => {
            if (this.wave.getRemainingEnemies() <= 0) {
                this.nextWave(true);
            }
        });
        this.waveTicker.start();
    }

    public getEnemyInRange(
        x: number,
        y: number,
        range: number
    ): Enemy | undefined {
        const enemies = this.group.getChildren();
        let minDistance = 100000;
        let index = -1;

        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i] as Enemy;
            const distance = Phaser.Math.Distance.Between(
                x,
                y,
                enemy.x,
                enemy.y
            );

            if (enemy.active && distance <= range) {
                if (distance < minDistance) {
                    minDistance = distance;
                    index = i;
                }
            }
        }

        if (index >= 0) {
            return enemies[index] as Enemy;
        }

        return undefined;
    }

    public getEnemyGroup(): Phaser.Physics.Arcade.Group {
        return this.group;
    }

    public removeEnemyFromWave(): void {
        this.wave.removeEnemy();
    }

    private nextWave(add: boolean): void {
        if (add) this.currentWave++;

        if (this.currentWave >= this.waves.length) {
            this.waveTicker.stop();

            bus.emit('wave-waves-done');
            return;
        }

        const waveConfig = this.waves[this.currentWave];
        this.wave = new Wave(waveConfig);

        let step = this.wave.curretStep();

        const stepTicker = new Ticker(this.wave.getSteps(), step.getDuration());
        const enemyTicker = new Ticker(-1, step.getInterval(), true);

        stepTicker.on((tick: number) => {
            if (tick >= this.wave.getSteps() - 1) {
                enemyTicker.stop();
                return;
            }

            step = this.wave.nextStep();
            enemyTicker.setInterval(step.getInterval());
            enemyTicker.restart();

            stepTicker.setInterval(step.getDuration());
            stepTicker.restartWithInterval();
        });

        enemyTicker.on(() => {
            this.spawnEnemy();
        });

        stepTicker.start();
        enemyTicker.start();
    }

    private spawnEnemy() {
        const name = this.wave.curretStep().getEnemyType();
        const stats = this.availableEnemies.get(name);

        if (stats == undefined) {
            throw Error('This enemy type is not defined');
        }

        const enemy = new Enemy(this.level, stats, this.level.getGridmapPath());
        this.group.add(enemy);
    }
}
