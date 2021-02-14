/// <reference types="Phaser" />
import 'phaser';
import { TowerStage, TowerStats } from '@/types/tower';
export default class Tower extends Phaser.GameObjects.Image {
    private imageHead;
    private positionX;
    private positionY;
    private towerStats;
    constructor(scene: Phaser.Scene, imageBase: string, imageHead: string, towerStats: TowerStats);
    getName(): string;
    place(x: number, y: number): void;
    rotate(deg: number): void;
    update(time: number, delta: number): void;
}
export { TowerStage, TowerStats };
