import 'phaser';

import { CELL_SIZE } from '@/constants/cells';
import { LevelConfig, Point } from '@/types/level';

import { GridMap } from '@/gridmap/gridmap';
import store from '@/store';
import { BuyState } from '@/constants/buy-states';

export default class Level extends Phaser.Scene {
    private levelData!: LevelConfig;

    private gridmap!: GridMap;

    public constructor(levelData: LevelConfig) {
        super({
            key: levelData.name,
        });

        this.levelData = levelData;
    }

    public init(): void {
        console.log('init level');
    }

    public create(): void {
        this.gridmap = this.add.existing(
            new GridMap(
                this,
                this.levelData.width,
                this.levelData.height,
                CELL_SIZE
            )
        );

        this.gridmap.drawPath(this.levelData.path);
        this.gridmap.markPathCells();

        this.input.on('pointerdown', (event: any) => {
            const position: Phaser.Math.Vector2 = this.gridmap.worldToGrid(
                event.downX,
                event.downY
            );
            console.log(
                this.gridmap.gridToCell(position.x, position.y).getType()
            );

            if (store.get<BuyState>('getBuyState') == BuyState.PRE) {
                console.log('place turret');
            }
        });
    }

    public getLevelConfig(): LevelConfig {
        return this.levelData;
    }
}

export { LevelConfig, Point };
