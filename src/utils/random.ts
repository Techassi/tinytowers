import 'phaser';

import { DIRECTIONS } from '@/constants/directions';

export function randomDirection(): Phaser.Math.Vector2 {
    const index: number = randomInteger(0, DIRECTIONS.length);
    return DIRECTIONS[index];
}

export function randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export function ID(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
}
