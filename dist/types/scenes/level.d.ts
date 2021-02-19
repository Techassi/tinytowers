/// <reference types="Phaser" />
import 'phaser';
import { LevelConfig } from '@/types/level';
export default class Level extends Phaser.Scene {
    private bgSound;
    private levelConfig;
    private gridmap;
    constructor(levelConfig: LevelConfig);
    init(): void;
    preload(): void;
    create(): void;
    addPhysics(bulletGroup: Phaser.Physics.Arcade.Group, enemyGroup: Phaser.Physics.Arcade.Group): void;
    getLevelConfig(): LevelConfig;
    getGridmapPath(): Phaser.Curves.Path;
    setGridmapCell(x: number, y: number, type: string): void;
    getName(): string;
    startBackgroundMusic(): void;
    stopBackgroundMusic(): void;
}
