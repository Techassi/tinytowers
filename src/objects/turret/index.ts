import 'phaser';

import { TowerStage, TowerStats } from '@/types/tower';

export default class Tower extends Phaser.GameObjects.Image {
    private imageHead!: Phaser.GameObjects.Image;

    private positionX!: number;
    private positionY!: number;

    private stats!: TowerStats;

    private isPlaced = false;

    public constructor(
        scene: Phaser.Scene,
        imageBase: string,
        imageHead: string,
        towerStats: TowerStats
    ) {
        super(scene, 0, 0, imageBase);
        // this.imageHead = imageHead;
        this.stats = towerStats;
    }

    public getName(): string {
        return this.stats.name;
    }

    public place(x: number, y: number): void {
        this.positionX = x * 50 + 25;
        this.positionY = y * 50 + 25;
        this.isPlaced = true;
    }

    public rotate(deg: number): void {
        this.imageHead.angle = deg;
    }

    public update(time: number, delta: number) {
        console.log(time, delta);
    }
}

export { TowerStage, TowerStats };
