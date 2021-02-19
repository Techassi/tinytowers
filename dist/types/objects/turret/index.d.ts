/// <reference types="Phaser" />
import 'phaser';
import { TurretStats } from '@/types/turret';
export default class Turret extends Phaser.GameObjects.Image {
    private imageHead;
    private stats;
    private isPlaced;
    constructor(scene: Phaser.Scene, imageBase: string, imageHead: string, TurretStats: TurretStats);
    getName(): string;
    place(x: number, y: number): void;
    rotate(deg: number): void;
    update(time: number, delta: number): void;
}
