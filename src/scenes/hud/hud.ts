import 'phaser';

export default class HUD extends Phaser.Scene {
    public constructor() {
        super({
            key: 'hud',
            active: true,
        });
    }

    public create(): void {
        console.log('created hud');
    }
}
