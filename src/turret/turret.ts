import 'phaser';

import { TurretStats, TurretStage } from '@/types/trurret';

export default class Turret extends Phaser.GameObjects.GameObject {
    private imageBase!: Phaser.GameObjects.Image;
    private imageHead!: Phaser.GameObjects.Image;

    private positionX!: number;
    private positionY!: number;

    private turrenStats!: TurretStats;

    public constructor(
        scene: Phaser.Scene,
        imageBase: Phaser.GameObjects.Image,
        imageHead: Phaser.GameObjects.Image,
        turretStats: TurretStats
    ) {
        super(scene, 'turret');
        this.imageBase = imageBase;
        this.imageHead = imageHead;
        this.turrenStats = turretStats;
    }

    public place(x: number, y: number): void {
        this.positionX = x * 50 + 25;
        this.positionY = y * 50 + 25;
    }

    public rotate(deg: number): void {
        this.imageHead.angle = deg;
    }

    public update(time: number, delta: number) {
        console.log(time, delta);
    }
}

export { TurretStats, TurretStage };
