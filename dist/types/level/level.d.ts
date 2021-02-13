/// <reference types="Phaser" />
import 'phaser';
import { LevelConfig, Point } from '@/types/level';
export declare class Level extends Phaser.Scene {
    private levelData;
    private gridmap;
    constructor(levelData: LevelConfig);
    init(): void;
    create(): void;
    getLevelConfig(): LevelConfig;
}
export { LevelConfig, Point };
