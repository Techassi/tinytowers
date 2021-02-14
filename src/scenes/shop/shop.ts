import 'phaser';

export default class Shop extends Phaser.Scene {
    public constructor() {
        super({
            key: 'shop',
            active: true,
        });
    }

    public create(): void {
        console.log('created shop');
    }
}
