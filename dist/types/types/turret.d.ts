export interface TurretStats {
    name: string;
    costs: number;
    damage: number;
    firerate: number;
    firerange: number;
    shortname: string;
    shotsPerValve: number;
    stages?: TurretStage[];
}
export interface TurretStage {
    upgradeCosts: number;
    damageMultiplier: number;
    firerateMultiplier: number;
    shotsPerValveMultiplier: number;
}
