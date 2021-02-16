import 'phaser';

import Level from '@/scenes/level';
import Enemy from '@/objects/enemy';
import { Wave } from '@/types/wave';
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

    private group!: Phaser.GameObjects.Group;

    private waveTicker!: Ticker;
    private stepTicker!: Ticker;
    private enemyTicker!: Ticker;

    public constructor(waves: Wave[]) {
        this.waves = waves;
    }

    public loadLevel(level: Level): void {
        this.level = level;

        this.group = this.level.add.group({
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

    private spawnEnemy() {
        const enemy = new Enemy(
            this.level,
            this.waves[this.currentWave].steps[this.currentStep].enemyType,
            { health: 10, speed: 1 / 30000 },
            this.level.getGridmapPath()
        );

        this.group.add(enemy);
    }
}
