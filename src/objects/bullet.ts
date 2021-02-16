import 'phaser';

export default class Bullet extends Phaser.GameObjects.Image {
    private lifespan = 0;
    private speed = 0;

    private directionX = 0;
    private directionY = 0;

    public constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'bullet');
    }

    public shoot(x: number, y: number, angle: number): void {
        this.lifespan = 1000;
        this.setActive(true);
        this.setVisible(true);

        this.directionX = Math.cos(angle);
        this.directionY = Math.sin(angle);

        this.setPosition(x, y);
    }

    public place(x: number, y: number): void {
        this.setActive(true);
        this.setVisible(true);

        this.setPosition(x, y);
        console.log(this.x, this.y);
    }

    public update(time: number, delta: number): void {
        this.lifespan -= delta;

        this.x += this.directionX * (0.3 * delta);
        this.y += this.directionY * (0.3 * delta);

        if (this.lifespan < 0) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
