/// <reference types="Phaser" />
import 'phaser';
import { TurretStats } from '@/types/turret';
import { LevelConfig } from '@/types/level';
import { EnemyStats } from '@/types/enemy';
import { CoreConfig } from '@/types/core-config';
export declare const gameConfig: Phaser.Types.Core.GameConfig;
export declare const towerConfig: TurretStats[];
export declare const levelConfig: LevelConfig;
export declare const enemyConfig: EnemyStats[];
export declare const coreConfig: CoreConfig;
