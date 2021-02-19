/// <reference types="Phaser" />
import 'phaser';
import Enemy from '@/objects/enemy';
import { CoreConfig } from '@/types/core-config';
export default class Controller {
    private game;
    private gameConfig;
    private enemyConfig;
    private levelConfig;
    private turretStats;
    private bus;
    private waveController;
    private turretController;
    private overlayScene;
    private shopScene;
    private hudScene;
    private level;
    constructor(game: Phaser.Game, gameConfig: Phaser.Types.Core.GameConfig, coreConfig: CoreConfig);
    startLevel(): void;
    private addListeners;
    private lost;
    getEnemyInRange(x: number, y: number, range: number): Enemy | undefined;
    getEnemyGroup(): Phaser.GameObjects.Group;
}
