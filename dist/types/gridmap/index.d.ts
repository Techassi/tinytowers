/// <reference types="Phaser" />
import 'phaser';
import Cell from './cell';
import { NumberCouple } from '@/types/generic';
import { Point } from '@/types/level';
export declare class GridMap extends Phaser.GameObjects.Graphics {
    private static INAVLID;
    private cellSizeHalf;
    private cellSize;
    private map;
    private height;
    private width;
    private path;
    constructor(scene: Phaser.Scene, width: number, height: number, cellSize: number);
    addedToScene(): void;
    worldToGrid(x: number, y: number): Phaser.Math.Vector2;
    gridToMap(x: number, y: number, origin: NumberCouple): Phaser.Math.Vector2;
    getCell(x: number, y: number): Cell;
    setCellType(x: number, y: number, type: string): void;
    getPath(): Phaser.Curves.Path;
    drawPath(path: Point[]): void;
    markPathCells(): void;
    private drawGrid;
}
export { Cell };
