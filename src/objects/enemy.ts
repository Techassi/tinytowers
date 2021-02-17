import 'phaser';

import { EnemyStats } from '@/types/enemy';

import bus from '@/bus';

export default class Enemy extends Phaser.GameObjects.Image {
    private follower!: Follower;
    private stats!: EnemyStats;

    public constructor(
        scene: Phaser.Scene,
        textureKey: string,
        stats: EnemyStats,
        path: Phaser.Curves.Path
    ) {
        super(scene, 0, 0, textureKey);

        this.stats = stats;
        this.follower = new Follower(path);

        this.scene.add.existing(this);
    }

    public update(time: number, delta: number): void {
        this.follower.setT(this.stats.speed * delta);
        const vector: Phaser.Math.Vector2 = this.follower.getVector();
        this.setPosition(vector.x, vector.y);

        // Reached the end
        if (this.follower.getT() >= 1) {
            this.setActive(false);
            this.setVisible(false);
        }

        // Got killed
        if (this.stats.health <= 0) {
            this.setActive(false);
            this.setVisible(false);

            const score = Math.round(
                this.getReward() * (1 - this.follower.getT())
            );
            bus.emit('level-enemy-reward', this.getReward());
            bus.emit('level-enemy-score', score);
        }
    }

    public takeDamage(damage: number): void {
        this.stats.health -= damage;
    }

    public getReward(): number {
        return this.stats.reward;
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
