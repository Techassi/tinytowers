import { RootState } from '@/types/states';
import { BuyState } from '@/constants/buy-states';

import { createStore } from '@/store/store';

const store = createStore<RootState>({
    state: {
        money: 20,
        buyState: BuyState.DEFAULT,
    },
    getters: {
        getMoney(state: RootState): number {
            return state.money;
        },
        getBuyState(state: RootState): BuyState {
            return state.buyState;
        },
    },
    mutations: {
        setMoney(state: RootState, payload: number): void {
            state.money = payload;
        },
        updateMoney(state: RootState, payload: number): void {
            state.money += payload;
        },
        setBuyState(state: RootState, payload: BuyState): void {
            state.buyState = payload;
        },
    },
});

export default store;
