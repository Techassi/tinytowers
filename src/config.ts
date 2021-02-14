import 'phaser';

import { TowerStats } from './tower/tower';

export const gameConfig: Phaser.Types.Core.GameConfig = {
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

export const towerConfig: TowerStats[] = new Array<TowerStats>(
    {
        name: 'T1',
        costs: 10,
        damage: 10,
        firerate: 1,
        shotsPerValve: 1,
    },
    {
        name: 'T2',
        costs: 15,
        damage: 10,
        firerate: 2,
        shotsPerValve: 1,
    }
);
