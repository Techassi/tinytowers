import 'phaser';

import { EnemyStats } from '@/types/enemy';
import { Wave } from '@/types/wave';

import Level from '@/scenes/level';
import Enemy from '@/objects/enemy';

import Ticker from '@/utils/ticker';

export type TickerCallback = (
    ticks: number,
    interval: number,
    tick: number
) => void;

export default class WaveController {
    private level!: Level;
    private waves!: Wave[];
    private currentWave = 0;
    private currentStep = 0;

    private group!: Phaser.Physics.Arcade.Group;

    private waveTicker!: Ticker;
    private stepTicker!: Ticker;
    private enemyTicker!: Ticker;

    private availableEnemies!: Map<string, EnemyStats>;

    public constructor(waves: Wave[], availableEnemies: EnemyStats[]) {
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

    public startWave(): void {
        const wave = this.waves[this.currentWave];

        this.stepTicker = new Ticker(wave.steps.length, wave.steps[0].duration);
        this.enemyTicker = new Ticker(
            -1,
            wave.steps[0].duration / wave.steps[0].enemyAmount,
            true
        );

        this.stepTicker.on((tick: number) => {
            if (tick + 1 >= wave.steps.length) {
                this.enemyTicker.stop();
                this.currentWave++;
                return;
            }

            this.currentStep++;

            this.enemyTicker.setInterval(
                wave.steps[this.currentStep].duration /
                    wave.steps[this.currentStep].enemyAmount
            );
            this.enemyTicker.update();

            this.stepTicker.setInterval(wave.steps[this.currentStep].duration);
        });

        this.enemyTicker.on(this.spawnEnemy.bind(this));

        this.stepTicker.start();
        this.enemyTicker.start();
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

    private spawnEnemy() {
        const name = this.waves[this.currentWave].steps[this.currentStep]
            .enemyType;
        const stats = this.availableEnemies.get(name);

        if (stats == undefined) {
            throw Error('This enemy type is not defined');
        }

        const statsCopy = {};
        Object.assign(statsCopy, stats);

        const enemy = new Enemy(
            this.level,
            name,
            statsCopy as EnemyStats,
            this.level.getGridmapPath()
        );

        this.group.add(enemy);
    }
}
