import 'phaser';

import { TurretStats } from '@/types/turret';

export default class Turret extends Phaser.GameObjects.Image {
    private imageHead!: Phaser.GameObjects.Image;

    private stats!: TurretStats;

    private isPlaced = false;

    public constructor(
        scene: Phaser.Scene,
        imageBase: string,
        imageHead: string,
        TurretStats: TurretStats
    ) {
        super(scene, 0, 0, imageBase);

        this.imageHead = this.scene.add.image(0, 0, imageHead);
        this.imageHead.setDepth(1);
        this.stats = TurretStats;

        this.scene.add.existing(this);
        console.log(this);
    }

    public getName(): string {
        return this.stats.name;
    }

    public place(x: number, y: number): void {
        this.imageHead.x = x * 50 + 25;
        this.imageHead.y = y * 50 + 25;

        this.x = x * 50 + 25;
        this.y = y * 50 + 25;
        this.isPlaced = true;
    }

    public rotate(deg: number): void {
        this.imageHead.angle = deg;
    }

    public rotateAdd(deg: number): void {
        this.imageHead.angle += deg;
    }

    public update(time: number, delta: number) {
        this.rotateAdd(1);
    }
}
