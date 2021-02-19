/// <reference types="Phaser" />
import 'phaser';
export default class Overlay extends Phaser.Scene {
    private damageSound;
    private lossSound;
    private winSound;
    private lossText;
    private winText;
    private damageOverlay;
    constructor();
    preload(): void;
    create(): void;
    displayWin(): void;
    displayLoss(): void;
    displayDamageIndicator(): void;
}
