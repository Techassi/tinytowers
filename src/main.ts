import 'phaser';

import { coreConfig, gameConfig } from './config';

import Controller from './controller/controller';

export class TinyTowerGame extends Phaser.Game {
    public constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

window.addEventListener('load', () => {
    const game = new TinyTowerGame(gameConfig);

    console.info('Game started with: ', game.config);

    const controller = new Controller(game, gameConfig, coreConfig);
    controller.startLevel();
});
