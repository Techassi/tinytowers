/// <reference types="Phaser" />
import 'phaser';
export default class HUD extends Phaser.Scene {
    private healthText;
    private moneyText;
    private scoreText;
    constructor();
    create(): void;
    private addSubscribers;
    private updateHealth;
    private updateMoney;
    private updateScore;
}
