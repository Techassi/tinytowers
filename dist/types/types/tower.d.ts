export interface TowerStats {
    name: string;
    costs: number;
    damage: number;
    firerate: number;
    shotsPerValve: number;
    stages?: TowerStage[];
}
export interface TowerStage {
    upgradeCosts: number;
    damageMultiplier: number;
    firerateMultiplier: number;
    shotsPerValveMultiplier: number;
}
