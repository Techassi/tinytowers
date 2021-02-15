import 'phaser';

import { TowerStats } from '@/types/tower';
import { LevelConfig } from '@/types/level';

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

export const levelConfig: LevelConfig = {
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
