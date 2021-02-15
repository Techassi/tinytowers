import 'phaser';

import Level, { LevelConfig } from '@/scenes/level';
import { TurretStats } from '@/types/turret';

import HUD from '@/scenes/hud';
import Shop from '@/scenes/shop';

import WaveController from './wave-controller';
import TurretController from './turret-controller';
import bus, { Bus } from '@/bus';

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
        this.turretController = new TurretController(this.turretStats);
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
        this.bus.on('shop-tower-selected', (data: string) => {
            this.turretController.setCurrentPreSelected(data);
        });

        this.bus.on('shop-tower-unselected', () => {
            this.turretController.resetCurrentPreSelected();
        });

        this.bus.on('level-place-turret', (data: any) => {
            this.turretController.placeTurret(data.x, data.y);
            console.log('level-place-turret');
        });

        this.bus.on('level-create', () => {
            this.waveController.loadLevel(this.level);
            this.turretController.loadLevel(this.level);
            this.waveController.startWave();
        });
    }
}
