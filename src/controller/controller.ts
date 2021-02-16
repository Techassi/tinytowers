import 'phaser';

import { BuyState } from '@/constants/buy-states';
import { TurretStats } from '@/types/turret';

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
        towerConfig: TurretStats[]
    ) {
        this.game = game;

        this.gameConfig = gameConfig;
        this.levelConfig = levelConfig;
        this.turretStats = towerConfig;

        this.bus = bus;

        this.waveController = new WaveController(this.levelConfig.waves);
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
        this.bus.on('shop-turret-selected', (data: string) => {
            this.turretController.setCurrentPreSelected(data);
        });

        this.bus.on('shop-turret-unselected', () => {
            this.turretController.resetCurrentPreSelected();
        });

        this.bus.on('level-place-turret', (data: any) => {
            this.turretController.placeTurret(data.x, data.y);
        });

        this.bus.on('level-placed-turret', () => {
            store.mutate<BuyState>('setBuyState', BuyState.DEFAULT);
            this.turretController.resetCurrentPreSelected();
        });

        this.bus.on('level-create', () => {
            this.waveController.loadLevel(this.level);
            this.turretController.loadLevel(this.level);
            this.level.addPhysics(
                this.turretController.getBulletGroup(),
                this.waveController.getEnemyGroup()
            );
            this.waveController.startWave();
        });

        this.bus.on('level-bullet-enemy-collision', (data: any) => {
            console.log('Hit!', data);
        });
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
