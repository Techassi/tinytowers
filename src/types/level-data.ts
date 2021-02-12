export interface LevelData {
    name: string;
    path: LevelPoint[];
    waves: Record<string, unknown>[];
}

export interface LevelPoint {
    x: number;
    y: number;
}
