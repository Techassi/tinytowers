/// <reference types="Phaser" />
import 'phaser';
import { LevelConfig, Point } from '@/types/level';
export default class Level extends Phaser.Scene {
    private levelConfig;
    private gridmap;
    constructor(levelConfig: LevelConfig);
    init(): void;
    preload(): void;
    create(): void;
    getLevelConfig(): LevelConfig;
    getGridmapPath(): Phaser.Curves.Path;
    getName(): string;
}
export { LevelConfig, Point };
