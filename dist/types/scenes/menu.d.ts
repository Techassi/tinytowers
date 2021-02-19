/// <reference types="Phaser" />
import 'phaser';
import { CoreConfig } from '@/types/core-config';
export default class Menu extends Phaser.Scene {
    private startText;
    private controller;
    constructor();
    create(): void;
    loadGame(game: Phaser.Game, gameConfig: Phaser.Types.Core.GameConfig, coreConfig: CoreConfig): void;
    private startLevel;
}
