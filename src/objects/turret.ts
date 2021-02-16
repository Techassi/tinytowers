import 'phaser';

import { TurretStats } from '@/types/turret';

import Enemy from './enemy';
import Bullet from './bullet';
import TurretController from '@/controller/turret-controller';
import Controller from '@/controller/controller';

export enum Activity {
    IDLE,
    ACTIVE,
}

export default class Turret extends Phaser.GameObjects.Image {
    private readonly cooldown = 5000;
    private imageHead!: Phaser.GameObjects.Image;

    private stats!: TurretStats;

    private isPlaced = false;
    private nextTick = 0;
    private angleTarget = 0;
    private currentCooldown = 0;
    private activity = Activity.IDLE;

    private controller!: TurretController;

    public constructor(
        scene: Phaser.Scene,
        TurretStats: TurretStats,
        controller: TurretController
    ) {
        super(scene, 0, 0, 'turret1');

        this.imageHead = this.scene.add.image(0, 0, 'turret-head1');
        this.imageHead.setDepth(1);
        this.stats = TurretStats;

        this.scene.add.existing(this);
        this.controller = controller;

        // const t = new Phaser.Tweens.Tween()
        // this.on('pointerdown', () => {});
    }

    public parent(): TurretController {
        return this.controller;
    }

    public rootController(): Controller {
        return this.parent().parent();
    }

    public getName(): string {
        return this.stats.name;
    }

    public getCosts(): number {
        return this.stats.costs;
    }

    public place(x: number, y: number): void {
        this.imageHead.setPosition(x * 50 + 25, y * 50 + 25);
        this.setPosition(x * 50 + 25, y * 50 + 25);

        this.isPlaced = true;
        this.setInteractive();
    }

    public rotate(deg: number): void {
        this.imageHead.angle = deg;
    }

    public rotateAdd(deg: number): void {
        this.imageHead.angle += deg;
    }

    public update(time: number, delta: number): void {
        if (this.activity == Activity.ACTIVE) {
            if (Math.abs(this.angleTarget - this.imageHead.angle) > 5) {
                this.rotateAdd(this.angleTarget - this.imageHead.angle);
            }

            if (this.currentCooldown > this.cooldown) {
                this.activity = Activity.IDLE;
            }

            if (this.currentCooldown < this.cooldown) {
                this.currentCooldown += delta;
            }
        }

        if (this.activity == Activity.IDLE) {
            this.rotateAdd(0.2);
        }

        if (time > this.nextTick) {
            this.nextTick = time + this.stats.firerate * 1000;
            this.shoot();
        }
    }

    private setActivityActive(): void {
        this.activity = Activity.ACTIVE;
        this.currentCooldown = 0;
    }

    private getEnemy(x: number, y: number, range: number): Enemy | undefined {
        return this.rootController().getEnemyInRange(x, y, range);
    }

    private shoot(): void {
        const enemy = this.getEnemy(this.x, this.y, this.stats.firerange);
        if (enemy == undefined) {
            return;
        }

        this.setActivityActive();

        const angle = Phaser.Math.Angle.Between(
            this.x,
            this.y,
            enemy.x,
            enemy.y
        );

        this.angleTarget = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
        this.addBullet(this.x, this.y, angle);
    }

    private addBullet(x: number, y: number, angle: number): void {
        const bullet = this.parent().getBulletGroup().get() as Bullet;
        if (bullet) {
            bullet.setDamage(this.stats.damage);
            bullet.shoot(x, y, angle);
        }
    }
}
