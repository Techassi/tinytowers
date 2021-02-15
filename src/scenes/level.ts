import 'phaser';

import { BuyState } from '@/constants/buy-states';
import { CELL_SIZE } from '@/constants/cells';
import { LevelConfig, Point } from '@/types/level';

import { GridMap } from '@/gridmap';
import store from '@/store';

import bus from '@/bus';

export default class Level extends Phaser.Scene {
    private levelConfig!: LevelConfig;

    private gridmap!: GridMap;

    public constructor(levelConfig: LevelConfig) {
        super({
            key: levelConfig.name,
        });

        this.levelConfig = levelConfig;
    }

    public init(): void {
        console.log('init level');
    }

    public preload(): void {
        this.load.image('enemy1', 'assets/enemy/enemy1.png');
        this.load.image('enemy2', 'assets/enemy/enemy2.png');
        this.load.image('turret1', 'assets/turret/turret1.png');
    }

    public create(): void {
        this.gridmap = this.add.existing(
            new GridMap(
                this,
                this.levelConfig.width,
                this.levelConfig.height,
                CELL_SIZE
            )
        );

        this.gridmap.drawPath(this.levelConfig.path);
        this.gridmap.markPathCells();

        this.input.on('pointerdown', (event: any) => {
            const click: Phaser.Math.Vector2 = this.gridmap.worldToGrid(
                event.downX,
                event.downY
            );

            // Placing towers on a path is not possible
            if (this.gridmap.gridToCell(click.x, click.y).getType() == 'PATH') {
                return;
            }

            // If we didnt select a tower from the shop we do nothing
            if (store.get<BuyState>('getBuyState') != BuyState.PRE) {
                return;
            }

            bus.emit('level-place-turret', { x: click.x, y: click.y });
        });

        bus.emit('level-create');
    }

    public getLevelConfig(): LevelConfig {
        return this.levelConfig;
    }

    public getGridmapPath(): Phaser.Curves.Path {
        return this.gridmap.getPath();
    }

    public getName(): string {
        return this.levelConfig.name;
    }
}

export { LevelConfig, Point };
