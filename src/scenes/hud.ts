import 'phaser';

import store from '@/store';
import { RootState } from '@/types/states';

export default class HUD extends Phaser.Scene {
    private moneyText!: Phaser.GameObjects.Text;
    private scoreText!: Phaser.GameObjects.Text;

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

        this.scoreText = this.add.text(
            150,
            25,
            `Score: ${store.get('getScore')}`
        );

        this.addSubscribers();
    }

    private addSubscribers(): void {
        store.subscribe('updateMoney', this.updateMoney.bind(this));
        store.subscribe('updateScore', this.updateScore.bind(this));
    }

    private updateMoney(state: RootState): void {
        this.moneyText.setText(`Money: ${state.money.toString()}`);
    }

    private updateScore(state: RootState): void {
        this.scoreText.setText(`Score: ${state.score.toString()}`);
    }
}
