import { BuyState } from '@/constants/buy-states';
export interface RootState {
    buyState: BuyState;
    health: number;
    money: number;
    score: number;
}
