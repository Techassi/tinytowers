import 'phaser';

import { gameConfig, levelConfig, towerConfig } from './config';

import Controller from './controller/controller';

export class TinyTowerGame extends Phaser.Game {
    public constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

window.addEventListener('load', () => {
    const game = new TinyTowerGame(gameConfig);

    console.info('Game started with:');
    console.info(game.config);

    const controller = new Controller(
        game,
        gameConfig,
        levelConfig,
        towerConfig
    );
    controller.startLevel();
});
