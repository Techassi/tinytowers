/// <reference types="Phaser" />
import 'phaser';
import { EnemyStats } from '@/types/enemy';
export default class Enemy extends Phaser.GameObjects.Image {
    private follower;
    private stats;
    constructor(scene: Phaser.Scene, textureKey: string, stats: EnemyStats, path: Phaser.Curves.Path);
    update(time: number, delta: number): void;
}
export declare class Follower {
    private t;
    private path;
    private vector;
    constructor(path: Phaser.Curves.Path);
    getT(): number;
    setT(t: number): void;
    getVector(): Phaser.Math.Vector2;
}
export { EnemyStats };
