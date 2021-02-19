import { LevelConfig } from './level';
import { EnemyStats } from './enemy';
import { TurretStats } from './turret';

export interface CoreConfig {
    turretConfig: TurretStats[];
    enemyConfig: EnemyStats[];
    levelConfig: LevelConfig;
}
