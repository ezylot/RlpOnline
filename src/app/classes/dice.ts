import {multicast} from "rxjs";

export class Dice {
    constructor(public readonly multiplier: number, public readonly sides: number) { }

    average(): number {
        return (1+this.sides) / 2 * this.multiplier;
    }

    min() : number {
        return this.multiplier;
    }

    max() : number {
        return this.multiplier * this.sides;
    }

    public toString() : string {
        return `${this.multiplier}d${this.sides}`;
    }
}
