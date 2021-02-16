import 'phaser';

import store from '@/store';
import { RootState } from '@/types/states';

export default class HUD extends Phaser.Scene {
    private moneyText!: Phaser.GameObjects.Text;

    public constructor() {
        super({
            key: 'hud',
            active: true,
        });
    }

    public create(): void {
        this.moneyText = this.add.text(
            25,
            25,
            `Money: ${store.get('getMoney')}`
        );

        this.addSubscribers();
    }

    private addSubscribers(): void {
        store.subscribe('updateMoney', this.updateMoney.bind(this));
    }

    private updateMoney(state: RootState): void {
        this.moneyText.setText(`Money: ${state.money.toString()}`);
    }
}
