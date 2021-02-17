import 'phaser';

import store from '@/store';
import { RootState } from '@/types/states';

export default class HUD extends Phaser.Scene {
    private healthText!: Phaser.GameObjects.Text;
    private moneyText!: Phaser.GameObjects.Text;
    private scoreText!: Phaser.GameObjects.Text;

    public constructor() {
        super({
            key: 'hud',
            active: true,
        });
    }

    public create(): void {
        this.healthText = this.add.text(
            675,
            25,
            `Health: ${store.get('getHealth')}`
        );

        this.moneyText = this.add.text(
            25,
            25,
            `Money: ${store.get('getMoney')}`
        );

        this.scoreText = this.add.text(
            175,
            25,
            `Score: ${store.get('getScore')}`
        );

        this.addSubscribers();
    }

    private addSubscribers(): void {
        store.subscribe('updateHealth', this.updateHealth.bind(this));
        store.subscribe('updateMoney', this.updateMoney.bind(this));
        store.subscribe('updateScore', this.updateScore.bind(this));
    }

    private updateHealth(state: RootState): void {
        this.healthText.setText(`Health: ${state.health.toString()}`);
    }

    private updateMoney(state: RootState): void {
        this.moneyText.setText(`Money: ${state.money.toString()}`);
    }

    private updateScore(state: RootState): void {
        this.scoreText.setText(`Score: ${state.score.toString()}`);
    }
}
