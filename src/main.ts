import 'phaser';

import { gameConfig } from './config';
import { loadFromURL } from './config/loader';

import Menu from './scenes/menu';

export class TinyTowerGame extends Phaser.Game {
    public constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

window.addEventListener('load', async () => {
    const coreConfig = await loadFromURL('core-config.json');

    const game = new TinyTowerGame(gameConfig);
    const menu = new Menu();

    game.scene.add('menu', menu);
    menu.loadGame(game, gameConfig, coreConfig);

    console.info('Game started with: ', game.config);
});
