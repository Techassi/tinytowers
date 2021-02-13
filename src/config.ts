import 'phaser';

// Main scene
import MainScene from './scenes/main-scene';

const gameConfig: Phaser.Types.Core.GameConfig = {
    title: 'TinyTowers',
    version: '0.0.1',
    width: 800,
    height: 800,
    backgroundColor: '#000000',
    type: Phaser.AUTO,
    scene: MainScene,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0,
            },
            debug: false,
        },
    },
    input: true,
};

export default gameConfig;
