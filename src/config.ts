import 'phaser';

const gameConfig: Phaser.Types.Core.GameConfig = {
    title: 'TinyTowers',
    version: '0.0.1',
    width: 800,
    height: 1000,
    backgroundColor: '#000000',
    type: Phaser.AUTO,
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
