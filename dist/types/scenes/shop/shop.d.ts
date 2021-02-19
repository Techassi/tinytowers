/// <reference types="Phaser" />
import 'phaser';
import { TowerStats } from '@/objects/tower/tower';
export default class Shop extends Phaser.Scene {
    private availableTowers;
    constructor(towers: TowerStats[]);
    create(): void;
}
