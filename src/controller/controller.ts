import 'phaser';

import Level, { LevelConfig } from '@/scenes/level';
import { TowerStats } from '@/types/tower';

import HUD from '@/scenes/hud';
import Shop from '@/scenes/shop';

import WaveController from './wave-controller';
import TowerController from './tower-controller';
import bus, { Bus } from '@/bus/bus';

export default class Controller {
    // The main game instance
    private game!: Phaser.Game;

    // Configurations (maybe generate them later)
    private gameConfig!: Phaser.Types.Core.GameConfig;
    private levelConfig!: LevelConfig;
    private towerConfig!: TowerStats[];

    // Event bus
    private bus!: Bus;

    // Sub controllers
    private waveController!: WaveController;
    private towerController!: TowerController;

    // Scenes (HUD and shop)
    private hudScene!: HUD;
    private shopScene!: Shop;

    // Current level
    private level!: Level;

    public constructor(
        game: Phaser.Game,
        gameConfig: Phaser.Types.Core.GameConfig,
        levelConfig: LevelConfig,
        towerConfig: TowerStats[]
    ) {
        this.game = game;

        this.gameConfig = gameConfig;
        this.levelConfig = levelConfig;
        this.towerConfig = towerConfig;

        this.bus = bus;

        this.waveController = new WaveController(this.levelConfig.waves);
        this.towerController = new TowerController();
    }

    public startLevel(): void {
        this.level = new Level(this.levelConfig);
        this.game.scene.add(this.level.getName(), this.level);

        this.hudScene = new HUD();
        this.game.scene.add('hud', this.hudScene);

        this.shopScene = new Shop(this.towerConfig);
        this.game.scene.add('shop', this.shopScene);

        this.startListeners();
        this.game.scene.start(this.level.getName());
    }

    private startListeners() {
        this.bus.on('shop-tower-selected', (data: any) => {
            console.log(data);
        });

        this.bus.on('level-place-turret', () => {
            console.log('level-place-turret');
        });

        this.bus.on('level-create', () => {
            this.waveController.loadLevel(this.level);
            this.waveController.startWave();
        });
    }
}
