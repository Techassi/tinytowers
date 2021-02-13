import 'phaser';

import { EDGES } from '@/constants/edges';
import { CELL_SIZE } from '@/constants/cells';
import { Status } from '@/types/status';
import { LevelConfig } from '@/types/level';

import { randomInteger } from '@/utils/random';

export class Level extends Phaser.Scene {
    private pathGraphic!: Phaser.GameObjects.Graphics;
    private gridGraphic!: Phaser.GameObjects.Graphics;
    private path!: Phaser.Curves.Path;
    private levelData!: LevelConfig;
    private gridMap!: Array<Cell>;

    public constructor(levelData: LevelConfig) {
        super({
            key: levelData.name,
        });

        this.levelData = levelData;
        this.gridMap = new Array<Cell>();
    }

    public init(): void {
        console.log('init level');
    }

    public create(): void {
        this.generateGrid();
        this.generatePath();
        this.generatePathCellsBasedOnPath();

        this.input.on('pointerdown', (event: any) => {
            const position: Phaser.Math.Vector2 = this.worldToGrid(
                event.downX,
                event.downY
            );
            console.log(this.gridToCell(position.x, position.y).getType());
        });
    }

    public getLevelConfig(): LevelConfig {
        return this.levelData;
    }

    private generateGrid(): void {
        this.gridGraphic = this.add.graphics();
        this.gridGraphic.lineStyle(1, 0xffffff, 1.0);
        this.gridGraphic.beginPath();

        for (let x = 0; x < this.levelData.width; x += CELL_SIZE) {
            this.gridGraphic.moveTo(x, 0);
            this.gridGraphic.lineTo(x, this.levelData.height);
        }

        for (let y = 0; y < this.levelData.height; y += CELL_SIZE) {
            this.gridGraphic.moveTo(0, y);
            this.gridGraphic.lineTo(this.levelData.width, y);
        }

        const cells =
            (this.levelData.width / CELL_SIZE) *
            (this.levelData.height / CELL_SIZE);

        for (let i = 0; i < cells; i++) {
            const cell: Cell = new Cell('DEFAULT');
            this.gridMap.push(cell);
        }

        this.gridGraphic.closePath();
        this.gridGraphic.strokePath();
    }

    // generatePath generates a path based on the provided level data path. If no path is provided, the algorithm falls
    // back to a random path
    private generatePath(): void {
        this.pathGraphic = this.add.graphics();
        this.pathGraphic.lineStyle(2, 0x0000ff, 1.0);
        this.pathGraphic.beginPath();

        this.path = new Phaser.Curves.Path(
            (this.levelData.path[0].x + 1) * CELL_SIZE - CELL_SIZE / 2,
            (this.levelData.path[0].y + 1) * CELL_SIZE - CELL_SIZE / 2
        );

        for (let i = 1; i < this.levelData.path.length; i++) {
            const point = this.levelData.path[i];
            this.path.lineTo(
                (point.x + 1) * CELL_SIZE - CELL_SIZE / 2,
                (point.y + 1) * CELL_SIZE - CELL_SIZE / 2
            );

            this.gridToCell(point.x, point.y).setType('PATH');
        }

        this.path.draw(this.pathGraphic);
        this.pathGraphic.closePath();
        this.pathGraphic.strokePath();
    }

    private generatePathCellsBasedOnPath(): void {
        const side = Math.max(this.levelData.width, this.levelData.height);
        const division = Math.max(40, side / CELL_SIZE);
        const points = this.path.getSpacedPoints(division);

        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            const position = this.worldToGrid(point.x, point.y);
            const cell = this.gridToCell(position.x, position.y);

            if (cell.getType() == 'INVALID') {
                continue;
            }

            cell.setType('PATH');
        }
    }

    // worldToGrid translates the world position to the cell position within the grid map
    private worldToGrid(x: number, y: number): Phaser.Math.Vector2 {
        const cellX = Math.floor(x / CELL_SIZE);
        const cellY = Math.floor(y / CELL_SIZE);
        return new Phaser.Math.Vector2(cellX, cellY);
    }

    private gridToCell(x: number, y: number): Cell {
        if (x < 0 || y < 0) {
            return new Cell('INVALID');
        }
        return this.gridMap[x + y * (this.levelData.width / CELL_SIZE)];
    }
}

export class Cell {
    private type!: string;

    public constructor(type: string) {
        this.type = type;
    }

    public setType(type: string): void {
        this.type = type;
    }

    public getType(): string {
        return this.type;
    }
}

export { LevelConfig };
