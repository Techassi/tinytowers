export interface TurretStats {
    name: string;
    costs: number;
    damage: number;
    firerate: number;
    shotsPerValve: number;
    stages?: TurretStage[];
}

export interface TurretStage {
    upgradeCosts: number;
    damageMultiplier: number;
    firerateMultiplier: number;
    shotsPerValveMultiplier: number;
}
