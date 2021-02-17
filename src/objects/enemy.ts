import 'phaser';

import { EnemyStats } from '@/types/enemy';

import bus from '@/bus';

export default class Enemy extends Phaser.GameObjects.Image {
    private follower!: Follower;

    private health!: number;
    private reward!: number;
    private damage!: number;
    private speed!: number;
    private _name!: string;

    public constructor(
        scene: Phaser.Scene,
        stats: EnemyStats,
        path: Phaser.Curves.Path
    ) {
        super(scene, 0, 0, stats.name);

        this.follower = new Follower(path);

        this.health = stats.health;
        this.reward = stats.reward;
        this.damage = stats.damage;
        this.speed = stats.speed;
        this._name = stats.name;

        this.scene.add.existing(this);
    }

    public update(time: number, delta: number): void {
        this.follower.setT(this.speed * delta);
        const vector: Phaser.Math.Vector2 = this.follower.getVector();
        this.setPosition(vector.x, vector.y);

        // Reached the end
        if (this.follower.getT() >= 1) {
            this.setActive(false);
            this.setVisible(false);

            bus.emit('enemy-hit-base', this.damage);
            bus.emit('enemy-removed');
        }

        // Got killed
        if (this.health <= 0) {
            this.setActive(false);
            this.setVisible(false);

            const score = Math.round(
                this.getReward() * (1 - this.follower.getT())
            );

            bus.emit('enemy-reward', this.getReward());
            bus.emit('enemy-score', score);
            bus.emit('enemy-removed');
        }
    }

    public takeDamage(damage: number): void {
        this.health -= damage;
    }

    public getReward(): number {
        return this.reward;
    }
}

export class Follower {
    private t!: number;
    private path!: Phaser.Curves.Path;
    private vector!: Phaser.Math.Vector2;

    public constructor(path: Phaser.Curves.Path) {
        this.t = 0;
        this.path = path;
        this.vector = new Phaser.Math.Vector2();
    }

    public getT(): number {
        return this.t;
    }

    public setT(t: number): void {
        this.t += t;
    }

    public getVector(): Phaser.Math.Vector2 {
        this.path.getPoint(this.t, this.vector);
        return this.vector;
    }
}
