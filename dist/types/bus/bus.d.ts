/// <reference types="Phaser" />
import 'phaser';
export default class Bus extends Phaser.Events.EventEmitter {
    constructor();
    static getInstance(): Bus;
}
