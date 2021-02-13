import { Wave } from '@/types/wave';

export interface LevelConfig {
    name: string;
    path: Point[];
    waves: Wave[];
    width: number;
    height: number;
}

export interface Point {
    x: number;
    y: number;
}
