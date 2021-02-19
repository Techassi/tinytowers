import 'phaser';

export default class Overlay extends Phaser.Scene {
    private damageSound!: Phaser.Sound.BaseSound;
    private lossSound!: Phaser.Sound.BaseSound;
    private winSound!: Phaser.Sound.BaseSound;

    private lossText!: Phaser.GameObjects.Text;
    private winText!: Phaser.GameObjects.Text;

    private damageOverlay!: Phaser.GameObjects.Graphics;

    public constructor() {
        super({
            key: 'overlay',
            active: true,
        });
    }

    public preload(): void {
        // Win / Loss
        this.load.audio('loss', 'assets/audio/loss.wav');
        this.load.audio('win', 'assets/audio/win.wav');

        // Damage
        this.load.audio('damage', 'assets/audio/damage.wav');
    }

    public create(): void {
        this.damageSound = this.sound.add('damage', {
            volume: 0.3,
        });
        this.lossSound = this.sound.add('loss');
        this.winSound = this.sound.add('win');

        this.lossText = this.add.text(400, 400, 'You Lost!', {
            align: 'center',
            fontSize: '50px',
        });
        this.lossText.setOrigin(0.5);

        this.winText = this.add.text(400, 400, 'You Won!', {
            align: 'center',
            fontSize: '50px',
        });
        this.winText.setOrigin(0.5);

        this.lossText.setVisible(false);
        this.winText.setVisible(false);

        this.damageOverlay = this.add.graphics();
        this.damageOverlay.fillStyle(0xff0000, 0.5);
        this.damageOverlay.fillRect(0, 0, 800, 800);
        this.damageOverlay.setVisible(false);
    }

    public displayWin(): void {
        this.winSound.play();
        this.winText.setVisible(true);
    }

    public displayLoss(): void {
        this.lossSound.play();
        this.lossText.setVisible(true);
    }

    public displayDamageIndicator(): void {
        this.damageSound.play();
        this.damageOverlay.setVisible(true);

        setTimeout(() => {
            this.damageOverlay.setVisible(false);
        }, 50);
    }
}
