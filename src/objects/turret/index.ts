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
        // this.imageHead = imageHead;
        this.stats = TurretStats;
    }

    public getName(): string {
        return this.stats.name;
    }

    public place(x: number, y: number): void {
        console.log('placed');

        this.x = x * 50 + 25;
        this.y = y * 50 + 25;
        this.isPlaced = true;
    }

    public rotate(deg: number): void {
        this.imageHead.angle = deg;
    }

    public update(time: number, delta: number) {
        // console.log(time, delta);
    }
}
