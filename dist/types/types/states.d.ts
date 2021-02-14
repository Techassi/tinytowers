import { BuyState } from '@/constants/buy-states';
export interface RootState {
    money: number;
    buyState: BuyState;
}
