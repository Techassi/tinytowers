import 'phaser';

import { BuyState } from '@/constants/buy-states';
import { TurretStats } from '@/types/turret';

import store from '@/store';
import bus from '@/bus';
import Button from './button';

export default class Shop extends Phaser.Scene {
    private availableTowers!: TurretStats[];

    public constructor(towers: TurretStats[]) {
        super({
            key: 'shop',
            active: true,
        });

        this.availableTowers = towers;
    }

    public preload(): void {
        this.load.audio('cancel-esc', 'assets/audio/cancel-esc.wav');
    }

    public create(): void {
        console.log(
            `Creating ${this.availableTowers.length} tower(s) in the shop`
        );

        // Add sounds
        const cancel = this.sound.add('cancel-esc');

        for (let i = 0; i < this.availableTowers.length; i++) {
            const tower = this.availableTowers[i];

            const button = new Button(
                this,
                (i + 1) * 100,
                900,
                tower.shortname,
                tower.costs
            );
            button.setInteractive();
            this.add.existing(button);

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
                cancel.play();
            }
        });
    }
}
