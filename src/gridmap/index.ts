import 'phaser';

import Cell from './cell';
import { NumberCouple } from '@/types/generic';
import { Point } from '@/types/level';

export class GridMap extends Phaser.GameObjects.Graphics {
    private static INAVLID: Cell = new Cell('INVALID');

    private cellSizeHalf!: number;
    private cellSize!: number;
    private map!: Array<Cell>;
    private height!: number;
    private width!: number;
    private path!: Phaser.Curves.Path;

    public constructor(
        scene: Phaser.Scene,
        width: number,
        height: number,
        cellSize: number
    ) {
        super(scene);

        this.cellSizeHalf = cellSize / 2;
        this.cellSize = cellSize;
        this.height = height;
        this.width = width;
        this.map = new Array<Cell>();
    }

    addedToScene(): void {
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

    public getPath(): Phaser.Curves.Path {
        return this.path;
    }

    public drawPath(path: Point[]): void {
        this.lineStyle(2, 0x0000ff, 1.0);
        this.beginPath();

        this.path = new Phaser.Curves.Path(
            (path[0].x + 1) * this.cellSize - this.cellSizeHalf,
            (path[0].y + 1) * this.cellSize - this.cellSizeHalf
        );

        path.forEach((point) => {
            this.path.lineTo(
                (point.x + 1) * this.cellSize - this.cellSizeHalf,
                (point.y + 1) * this.cellSize - this.cellSizeHalf
            );

            this.gridToCell(point.x, point.y).setType('PATH');
        });

        this.path.draw(this);
        this.closePath();
        this.strokePath();
    }

    public markPathCells(): void {
        const side = Math.max(this.width, this.height);
        const division = Math.max(40, side / this.cellSize);
        const points = this.path.getSpacedPoints(division);

        points.forEach((point) => {
            const position = this.worldToGrid(point.x, point.y);
            const cell = this.gridToCell(position.x, position.y);

            if (cell.getType() == 'INVALID') {
                return;
            }

            cell.setType('PATH');
        });
    }

    private drawGrid(): void {
        this.lineStyle(1, 0xffffff, 1.0);
        this.beginPath();

        for (let x = 0; x < this.width; x += this.cellSize) {
            this.moveTo(x, 0);
            this.lineTo(x, this.height);
        }

        for (let y = 0; y < this.height; y += this.cellSize) {
            this.moveTo(0, y);
            this.lineTo(this.width, y);
        }

        const numberOfCells =
            (this.width / this.cellSize) * (this.height / this.cellSize);

        for (let i = 0; i < numberOfCells; i++) {
            this.map.push(new Cell('DEFAULT'));
        }

        this.closePath();
        this.strokePath();
    }
}

export { Cell };
