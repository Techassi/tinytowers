import Turret from '@/objects/turret';
import Level from '@/scenes/level';
import { TurretStats } from '@/types/turret';

export default class TurretController {
    private currentPreSelected!: string;
    private availableTurrets!: Map<string, TurretStats>;

    private level!: Level;
    private group!: Phaser.GameObjects.Group;

    private placedTurrets!: Array<Turret>;

    public constructor(availableTurrets: TurretStats[]) {
        this.availableTurrets = new Map<string, TurretStats>();

        availableTurrets.forEach((turret) => {
            if (this.availableTurrets.has(turret.name)) return;
            this.availableTurrets.set(turret.name, turret);
        });
    }

    public loadLevel(level: Level): void {
        this.level = level;

        this.group = this.level.add.group({
            classType: Turret,
            runChildUpdate: true,
        });
    }

    public placeTurret(x: number, y: number): void {
        const turretStats = this.availableTurrets.get(
            this.currentPreSelected
        ) as TurretStats;

        const turret = new Turret(
            this.level,
            'turret1',
            'turret-head1',
            turretStats
        );
        this.group.add(turret);
        turret.place(x, y);
    }

    public setCurrentPreSelected(key: string): void {
        console.log(key);

        this.currentPreSelected = key;
    }

    public resetCurrentPreSelected(): void {
        this.currentPreSelected = '';
    }
}
