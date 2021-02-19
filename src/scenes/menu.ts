import 'phaser';

import { CoreConfig } from '@/types/core-config';

import Controller from '@/controller/controller';

export default class Menu extends Phaser.Scene {
    private startText!: Phaser.GameObjects.Text;
    private controller!: Controller;

    public constructor() {
        super({
            key: 'menu',
            active: true,
        });
    }

    public create(): void {
        this.startText = this.add.text(400, 400, 'Start Game', {
            fontSize: '50px',
            align: 'center',
        });

        this.startText.setOrigin(0.5);
        this.startText.setInteractive();

        this.startText.on('pointerdown', this.startLevel.bind(this));
    }

    public loadGame(
        game: Phaser.Game,
        gameConfig: Phaser.Types.Core.GameConfig,
        coreConfig: CoreConfig
    ): void {
        this.controller = new Controller(game, gameConfig, coreConfig);
    }

    private startLevel(): void {
        this.startText.setVisible(false);
        this.controller.startLevel();
    }
}
