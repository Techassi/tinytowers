/// <reference types="Phaser" />
import 'phaser';
export default class Button extends Phaser.GameObjects.Text {
    private costsText;
    private costs;
    constructor(scene: Phaser.Scene, x: number, y: number, name: string, costs: number);
}
