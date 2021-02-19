import { LevelConfig } from './level';
import { EnemyStats } from './enemy';
import { TurretStats } from './turret';
export interface CoreConfig {
    towerConfig: TurretStats[];
    enemyConfig: EnemyStats[];
    levelConfig: LevelConfig;
}
