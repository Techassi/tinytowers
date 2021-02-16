import { TurretStats } from '@/types/turret';

import Turret from '@/objects/turret';
import Level from '@/scenes/level';

import bus from '@/bus';
import Controller from './controller';
import Bullet from '@/objects/bullet';

export default class TurretController {
    private currentPreSelected!: string;
    private availableTurrets!: Map<string, TurretStats>;

    private level!: Level;
    private turretGroup!: Phaser.GameObjects.Group;
    private bulletGroup!: Phaser.Physics.Arcade.Group;

    private placedTurrets!: Array<Turret>;

    private controller!: Controller;

    public constructor(
        availableTurrets: TurretStats[],
        controller: Controller
    ) {
        this.availableTurrets = new Map<string, TurretStats>();

        availableTurrets.forEach((turret) => {
            if (this.availableTurrets.has(turret.name)) return;
            this.availableTurrets.set(turret.name, turret);
        });

        this.controller = controller;
        // this.placedTurrets = new Array<Turret>();
    }

    public parent(): Controller {
        return this.controller;
    }

    public loadLevel(level: Level): void {
        this.level = level;

        this.turretGroup = this.level.add.group({
            classType: Turret,
            runChildUpdate: true,
        });

        this.bulletGroup = this.level.physics.add.group({
            classType: Bullet,
            runChildUpdate: true,
        });
    }

    public placeTurret(x: number, y: number): void {
        const turretStats = this.availableTurrets.get(
            this.currentPreSelected
        ) as TurretStats;

        const turret = new Turret(this.level, turretStats, this);

        this.turretGroup.add(turret);
        turret.place(x, y);

        this.level.setGridmapCell(x, y, 'TURRET');

        // this.placedTurrets.push(turret);
        bus.emit('level-placed-turret');
    }

    public setCurrentPreSelected(key: string): void {
        this.currentPreSelected = key;
    }

    public resetCurrentPreSelected(): void {
        this.currentPreSelected = '';
    }

    public getBulletGroup(): Phaser.Physics.Arcade.Group {
        return this.bulletGroup;
    }
}
