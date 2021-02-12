import 'phaser';
import gameConfig from './config';

import { LevelData } from './types/level-data';
import { Level } from './types/level';

export class TinyTowerGame extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

window.addEventListener('load', () => {
    const game = new TinyTowerGame(gameConfig);

    console.info('Game started with:');
    console.info(game.config);

    const levelData: LevelData = {
        name: 'Test',
        path: [
            {
                x: 100,
                y: 0,
            },
            {
                x: 100,
                y: 100,
            },
            {
                x: 200,
                y: 100,
            },
        ],
        waves: [],
    };

    const level = new Level(levelData);
    game.scene.add(level.getLevelData().name, level);
    game.scene.start(level.getLevelData().name);
});
