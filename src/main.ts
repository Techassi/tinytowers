import 'phaser';
import gameConfig from './config';

import Level, { LevelConfig } from '@/level/level';
import HUD from './scenes/hud/hud';
import Shop from './scenes/shop/shop';

export class TinyTowerGame extends Phaser.Game {
    public constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

window.addEventListener('load', () => {
    const game = new TinyTowerGame(gameConfig);

    console.info('Game started with:');
    console.info(game.config);

    const levelData: LevelConfig = {
        name: 'Test',
        path: [
            {
                x: 2,
                y: 0,
            },
            {
                x: 2,
                y: 2,
            },
            {
                x: 5,
                y: 2,
            },
            {
                x: 5,
                y: 7,
            },
            {
                x: 7,
                y: 7,
            },
            {
                x: 7,
                y: 2,
            },
            {
                x: 11,
                y: 2,
            },
            {
                x: 11,
                y: 6,
            },
            {
                x: 9,
                y: 6,
            },
            {
                x: 9,
                y: 9,
            },
            {
                x: 14,
                y: 9,
            },
            {
                x: 14,
                y: 15,
            },
        ],
        waves: [],
        width: gameConfig.width as number,
        height: 800,
    };

    const level = new Level(levelData);
    game.scene.add(level.getLevelConfig().name, level);

    const hud = new HUD();
    game.scene.add('hud', hud);

    const shop = new Shop();
    game.scene.add('shop', shop);

    game.scene.start(level.getLevelConfig().name);
});
