/// <reference types="Phaser" />
import 'phaser';
import { TurretStats } from '@/types/turret';
export default class Shop extends Phaser.Scene {
    private availableTowers;
    constructor(towers: TurretStats[]);
    preload(): void;
    create(): void;
}
