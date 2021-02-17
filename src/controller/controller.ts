import 'phaser';

import { BuyState } from '@/constants/buy-states';
import { TurretStats } from '@/types/turret';
import { EnemyStats } from '@/types/enemy';
import { RootState } from '@/types/states';

import HUD from '@/scenes/hud';
import Shop from '@/scenes/shop';
import Level, { LevelConfig } from '@/scenes/level';

import WaveController from './wave-controller';
import TurretController from './turret-controller';

import bus, { Bus } from '@/bus';
import store from '@/store';
import Enemy from '@/objects/enemy';

export default class Controller {
    // The main game instance
    private game!: Phaser.Game;

    // Configurations (maybe generate them later)
    private gameConfig!: Phaser.Types.Core.GameConfig;
    private enemyConfig!: EnemyStats[];
    private levelConfig!: LevelConfig;
    private turretStats!: TurretStats[];

    // Event bus
    private bus!: Bus;

    // Sub controllers
    private waveController!: WaveController;
    private turretController!: TurretController;

    // Scenes (HUD and shop)
    private hudScene!: HUD;
    private shopScene!: Shop;

    // Current level
    private level!: Level;

    public constructor(
        game: Phaser.Game,
        gameConfig: Phaser.Types.Core.GameConfig,
        levelConfig: LevelConfig,
        towerConfig: TurretStats[],
        enemyConfig: EnemyStats[]
    ) {
        this.game = game;

        this.gameConfig = gameConfig;
        this.enemyConfig = enemyConfig;
        this.levelConfig = levelConfig;
        this.turretStats = towerConfig;

        this.bus = bus;

        this.waveController = new WaveController(
            this.levelConfig.waves,
            this.enemyConfig
        );
        this.turretController = new TurretController(this.turretStats, this);
    }

    public startLevel(): void {
        this.level = new Level(this.levelConfig);
        this.game.scene.add(this.level.getName(), this.level);

        this.hudScene = new HUD();
        this.game.scene.add('hud', this.hudScene);

        this.shopScene = new Shop(this.turretStats);
        this.game.scene.add('shop', this.shopScene);

        this.addListeners();
        this.game.scene.start(this.level.getName());
    }

    private addListeners() {
        // Event bus listeners
        this.bus.on('shop-turret-selected', (data: string) => {
            this.turretController.setCurrentPreSelected(data);
        });

        this.bus.on('shop-turret-unselected', () => {
            this.turretController.resetCurrentPreSelected();
        });

        this.bus.on('level-place-turret', (data: any) => {
            this.turretController.placeTurret(data.x, data.y);
        });

        this.bus.on('level-placed-turret', (costs: number) => {
            store.mutate<BuyState>('setBuyState', BuyState.DEFAULT);
            store.mutate<number>('updateMoney', -costs);
            this.turretController.resetCurrentPreSelected();
        });

        this.bus.on('level-create', () => {
            this.waveController.loadLevel(this.level);
            this.turretController.loadLevel(this.level);
            this.level.addPhysics(
                this.turretController.getBulletGroup(),
                this.waveController.getEnemyGroup()
            );
            this.waveController.start();
        });

        this.bus.on('enemy-hit-base', (damage: number) => {
            store.mutate<number>('updateHealth', -damage);
        });

        this.bus.on('enemy-reward', (reward: number) => {
            store.mutate<number>('updateMoney', reward);
        });

        this.bus.on('enemy-score', (score: number) => {
            store.mutate<number>('updateScore', score);
        });

        this.bus.on('enemy-removed', () => {
            this.waveController.removeEnemyFromWave();
        });

        this.bus.on('wave-waves-done', () => {
            if (store.get<number>('getHealth') > 0) {
                console.log('You win!');
            }
        });

        // Store subscribers
        store.subscribe('updateHealth', this.lost.bind(this));
    }

    private lost(state: RootState): void {
        if (state.health <= 0) {
            console.log('You lost!');
            this.game.destroy(false);
        }
    }

    // Wave controller interface
    public getEnemyInRange(
        x: number,
        y: number,
        range: number
    ): Enemy | undefined {
        return this.waveController.getEnemyInRange(x, y, range);
    }

    public getEnemyGroup(): Phaser.GameObjects.Group {
        return this.waveController.getEnemyGroup();
    }
}
