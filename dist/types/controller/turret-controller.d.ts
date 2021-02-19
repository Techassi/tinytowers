/// <reference types="Phaser" />
import { TurretStats } from '@/types/turret';
import Level from '@/scenes/level';
import Controller from './controller';
export default class TurretController {
    private currentPreSelected;
    private availableTurrets;
    private level;
    private turretGroup;
    private bulletGroup;
    private placedTurrets;
    private controller;
    constructor(availableTurrets: TurretStats[], controller: Controller);
    parent(): Controller;
    loadLevel(level: Level): void;
    placeTurret(x: number, y: number): void;
    setCurrentPreSelected(key: string): void;
    resetCurrentPreSelected(): void;
    getBulletGroup(): Phaser.Physics.Arcade.Group;
}
