
export class Dice {
    constructor(public readonly multiplier: number, public readonly sides: number) { }
    getAverage(): number {
        return (1+this.sides) / 2 * this.multiplier;
    }
    public toString() : string {
        return `${this.multiplier}d${this.sides}`;
    }
}
