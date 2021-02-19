import { WaveConfig } from '@/types/wave';
export interface LevelConfig {
    name: string;
    path: Point[];
    waves: WaveConfig[];
    width: number;
    height: number;
}
export interface Point {
    x: number;
    y: number;
}
