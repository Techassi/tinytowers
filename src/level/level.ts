import 'phaser';

import { CELL_SIZE } from '@/constants/cells';
import { LevelConfig, Point } from '@/types/level';

import { GridMap } from '@/gridmap/gridmap';
import store from '@/store';
import { BuyState } from '@/constants/buy-states';
import Enemy from '@/objects/enemy/enemy';

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
        this.load.image('enemy', 'assets/enemy/enemy.png');
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

        const enemies = this.add.group({
            classType: Enemy,
            runChildUpdate: true,
        });

        const enemy = new Enemy(
            this,
            'enemy',
            { health: 10, speed: 1 / 10000 },
            this.gridmap.getPath()
        );
        enemy.setActive(true);
        enemy.setVisible(true);
        console.log(enemy);

        this.add.existing(enemy);

        enemies.add(enemy);
    }

    public getLevelConfig(): LevelConfig {
        return this.levelConfig;
    }

    public getName(): string {
        return this.levelConfig.name;
    }
}

export { LevelConfig, Point };
