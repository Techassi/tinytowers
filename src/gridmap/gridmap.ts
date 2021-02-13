import 'phaser';

import Cell from './cell';
import { NumberCouple } from '@/types/generic';

export class GridMap extends Phaser.GameObjects.GameObject {
    private static INAVLID: Cell = new Cell('INVALID');
    private static DEFAULT: Cell = new Cell('DEFAULT');

    private graphic!: Phaser.GameObjects.Graphics;
    private cellSize!: number;
    private map!: Array<Cell>;
    private height!: number;
    private width!: number;

    public constructor(
        scene: Phaser.Scene,
        width: number,
        height: number,
        cellSize: number
    ) {
        super(scene, 'gridmap');

        this.cellSize = cellSize;
        this.height = height;
        this.width = width;
    }

    public create(): void {
        this.drawGrid();
    }

    public worldToGrid(x: number, y: number): Phaser.Math.Vector2 {
        const cellX = Math.floor(x / this.cellSize);
        const cellY = Math.floor(y / this.cellSize);
        return new Phaser.Math.Vector2(cellX, cellY);
    }

    public gridToMap(
        x: number,
        y: number,
        origin: NumberCouple
    ): Phaser.Math.Vector2 {
        const worldX = x * this.cellSize + origin.i * (this.cellSize / 2);
        const worldY = y * this.cellSize + origin.j * (this.cellSize / 2);

        return new Phaser.Math.Vector2(worldX, worldY);
    }

    public gridToCell(x: number, y: number): Cell {
        if (x < 0 || y < 0) {
            return GridMap.INAVLID;
        }
        return this.map[x + y * (this.width / this.cellSize)];
    }

    private drawGrid(): void {
        this.graphic = new Phaser.GameObjects.Graphics(this.scene);
        this.graphic.lineStyle(1, 0xffffff, 1.0);
        this.graphic.beginPath();

        for (let x = 0; x < this.width; x += this.cellSize) {
            this.graphic.moveTo(x, 0);
            this.graphic.lineTo(x, this.height);
        }

        for (let y = 0; y < this.height; y += this.cellSize) {
            this.graphic.moveTo(0, y);
            this.graphic.lineTo(this.width, y);
        }

        const cells =
            (this.width / this.cellSize) * (this.height / this.cellSize);

        for (let i = 0; i < cells; i++) {
            this.map.push(GridMap.DEFAULT);
        }

        this.graphic.closePath();
        this.graphic.strokePath();
    }
}

export { Cell };
