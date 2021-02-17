import 'phaser';

import Enemy from './enemy';

export default class Bullet extends Phaser.GameObjects.Image {
    private readonly speed = 0.3;
    private lifespan = 0;
    private damage = 0;

    private directionX = 0;
    private directionY = 0;

    public constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'bullet');
    }

    public setDamage(damage: number): void {
        this.damage = damage;
    }

    public getDamage(): number {
        return this.damage;
    }

    public shoot(x: number, y: number, angle: number): void {
        this.lifespan = 1000;
        this.setActive(true);
        this.setVisible(true);

        this.directionX = Math.cos(angle);
        this.directionY = Math.sin(angle);

        this.setPosition(x, y);
    }

    public place(x: number, y: number): void {
        this.setActive(true);
        this.setVisible(true);

        this.setPosition(x, y);
    }

    public update(time: number, delta: number): void {
        this.lifespan -= delta;

        this.x += this.directionX * (this.speed * delta);
        this.y += this.directionY * (this.speed * delta);

        if (this.lifespan < 0) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

    public remove(): void {
        this.setActive(false);
        this.setVisible(false);
        this.destroy();
    }
}

export class TargetingBullet extends Bullet {
    private target!: Enemy;

    public constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        target: Enemy
    ) {
        super(scene, x, y);

        this.target = target;
    }

    // public update(): void {}
}
