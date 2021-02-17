import { RootState } from '@/types/states';
import { BuyState } from '@/constants/buy-states';

import { createStore } from '@/store/store';

const store = createStore<RootState>({
    state: {
        buyState: BuyState.DEFAULT,
        health: 100,
        money: 20,
        score: 0,
    },
    getters: {
        getBuyState(state: RootState): BuyState {
            return state.buyState;
        },
        getHealth(state: RootState): number {
            return state.health;
        },
        getMoney(state: RootState): number {
            return state.money;
        },
        getScore(state: RootState): number {
            return state.score;
        },
    },
    mutations: {
        setBuyState(state: RootState, buyState: BuyState): void {
            state.buyState = buyState;
        },
        setHealth(state: RootState, health: number): void {
            state.health = health;
        },
        updateHealth(state: RootState, health: number): void {
            state.health += health;
        },
        setMoney(state: RootState, money: number): void {
            state.money = money;
        },
        updateMoney(state: RootState, money: number): void {
            state.money += money;
        },
        setScore(state: RootState, score: number): void {
            state.score = score;
        },
        updateScore(state: RootState, score: number): void {
            state.score += score;
        },
    },
});

export default store;
