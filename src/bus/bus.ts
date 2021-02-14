import 'phaser';

let instance: Bus | null = null;

export default class Bus extends Phaser.Events.EventEmitter {
    public constructor() {
        super();
    }

    public static getInstance(): Bus {
        if (instance == null) {
            instance = new Bus();
        }
        return instance;
    }
}
