import 'phaser';

import { TurretStats } from '@/types/turret';

import store from '@/store';
import { BuyState } from '@/constants/buy-states';
import bus from '@/bus';

export default class Shop extends Phaser.Scene {
    private availableTowers!: TurretStats[];

    public constructor(towers: TurretStats[]) {
        super({
            key: 'shop',
            active: true,
        });

        this.availableTowers = towers;
    }

    public create(): void {
        console.log(
            `Creating ${this.availableTowers.length} tower(s) in the shop`
        );

        for (let i = 0; i < this.availableTowers.length; i++) {
            const tower = this.availableTowers[i];

            const button = this.add
                .text((i + 1) * 50, 900, tower.name, { color: '#ffffff' })
                .setInteractive();

            button.on('pointerdown', () => {
                const money = store.get<number>('getMoney');
                if (money < tower.costs) {
                    return;
                }

                store.mutate<BuyState>('setBuyState', BuyState.PRE);
                bus.emit('shop-turret-selected', tower.name);
            });
        }

        this.input.keyboard.on('keydown-ESC', () => {
            if (store.get<BuyState>('getBuyState') == BuyState.PRE) {
                store.mutate<BuyState>('setBuyState', BuyState.DEFAULT);
                bus.emit('shop-turret-unselected');
            }
        });
    }
}
