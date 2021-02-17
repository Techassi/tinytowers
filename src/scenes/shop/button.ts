import 'phaser';

export default class Button extends Phaser.GameObjects.Text {
    private costsText!: Phaser.GameObjects.Text;
    private costs!: number;

    public constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        name: string,
        costs: number
    ) {
        super(scene, x, y, name, {});

        this.costs = costs;

        this.costsText = this.scene.add.text(
            this.x,
            this.y + 15,
            `$${this.costs}`
        );
    }
}
