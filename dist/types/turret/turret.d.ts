/// <reference types="Phaser" />
import 'phaser';
import { TurretStats, TurretStage } from '@/types/trurret';
export default class Turret extends Phaser.GameObjects.GameObject {
    private imageBase;
    private imageHead;
    private positionX;
    private positionY;
    private turrenStats;
    constructor(scene: Phaser.Scene, imageBase: Phaser.GameObjects.Image, imageHead: Phaser.GameObjects.Image, turretStats: TurretStats);
    place(x: number, y: number): void;
    rotate(deg: number): void;
    update(time: number, delta: number): void;
}
export { TurretStats, TurretStage };
