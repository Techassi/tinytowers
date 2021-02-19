/// <reference types="Phaser" />
import 'phaser';
import { TurretStats } from '@/types/turret';
import TurretController from '@/controller/turret-controller';
import Controller from '@/controller/controller';
export declare enum Activity {
    IDLE = 0,
    ACTIVE = 1
}
export default class Turret extends Phaser.GameObjects.Image {
    private readonly cooldown;
    private imageHead;
    private stats;
    private isPlaced;
    private nextTick;
    private angleTarget;
    private currentCooldown;
    private activity;
    private controller;
    private shotSound;
    constructor(scene: Phaser.Scene, turretStats: TurretStats, controller: TurretController);
    parent(): TurretController;
    rootController(): Controller;
    getName(): string;
    getCosts(): number;
    place(x: number, y: number): void;
    rotate(deg: number): void;
    rotateAdd(deg: number): void;
    update(time: number, delta: number): void;
    private setActivityActive;
    private getEnemy;
    private shoot;
    private addBullet;
}
