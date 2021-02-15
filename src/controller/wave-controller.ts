import { Wave } from '@/types/wave';

export default class WaveController {
    private waves!: Wave[];

    public constructor(waves: Wave[]) {
        this.waves = waves;
    }
}
