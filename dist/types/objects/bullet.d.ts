/// <reference types="Phaser" />
import 'phaser';
import Enemy from './enemy';
export default class Bullet extends Phaser.GameObjects.Image {
    private readonly speed;
    private lifespan;
    private damage;
    private directionX;
    private directionY;
    constructor(scene: Phaser.Scene, x: number, y: number);
    setDamage(damage: number): void;
    getDamage(): number;
    shoot(x: number, y: number, angle: number): void;
    place(x: number, y: number): void;
    update(time: number, delta: number): void;
    remove(): void;
}
export declare class TargetingBullet extends Bullet {
    private target;
    constructor(scene: Phaser.Scene, x: number, y: number, target: Enemy);
}
