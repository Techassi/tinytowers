import 'phaser';

import { EDGES } from '@/constants/edges';
import { LevelData } from './level-data';
import { Status } from './status';

import { randomInteger } from '@/utils/random';

export class Level extends Phaser.Scene {
    private levelData!: LevelData;
    private internalGraphics!: Phaser.GameObjects.Graphics;

    constructor(levelData: LevelData) {
        super({
            key: levelData.name,
        });

        this.levelData = levelData;
    }

    public init(): void {
        console.log('init level');
    }

    public create(): void {
        this.generatePath()
            .then((status: Status) => {
                console.log(status);
            })
            .catch((error) => {
                console.error(error);
                this.game.destroy(true);
            });
    }

    public getLevelData(): LevelData {
        return this.levelData;
    }

    // generatePath generates a path based on the provided level data path. If no path is provided, the algorithm falls
    // back to a random path
    private generatePath(): Promise<Status> {
        this.internalGraphics = this.add.graphics();
        this.internalGraphics.lineStyle(5, 0xff00ff, 1.0);
        this.internalGraphics.beginPath();

        return new Promise((resolve, reject) => {
            if (this.levelData.path == undefined) {
                this.randomPath().catch((error: Status) => {
                    reject(error);
                });
            }

            const path: Phaser.Curves.Path = new Phaser.Curves.Path(
                this.levelData.path[0].x,
                this.levelData.path[0].y
            );

            for (let i = 1; i < this.levelData.path.length; i++) {
                const point = this.levelData.path[i];
                path.lineTo(point.x, point.y);
            }

            path.draw(this.internalGraphics);
            this.internalGraphics.closePath();
            this.internalGraphics.strokePath();

            console.log(path);

            const status: Status = {
                code: 1,
                message: '',
            };

            resolve(status);
        });
    }

    // randomPath generates a random path
    randomPath(): Promise<Status> {
        return new Promise((resolve, reject) => {
            // Determine the start and end edge (opposite sites)
            const index = randomInteger(0, EDGES.length);
            const startEdge: string = EDGES[index];
            const endEdge: string = EDGES[index - 2];

            const status: Status = {
                code: 1,
                message: '',
            };

            resolve(status);
        });
    }
}
