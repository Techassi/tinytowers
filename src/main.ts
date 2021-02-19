import 'phaser';

import { coreConfig, gameConfig } from './config';

import Controller from './controller/controller';
import Menu from './scenes/menu';

export class TinyTowerGame extends Phaser.Game {
    public constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

window.addEventListener('load', () => {
    const game = new TinyTowerGame(gameConfig);
    const menu = new Menu();

    game.scene.add('menu', menu);
    menu.loadGame(game, gameConfig, coreConfig);

    console.info('Game started with: ', game.config);
});
