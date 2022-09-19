import {Dice} from "./dice";
import {DeepReadonly} from "ts-essentials";


export class DiceAndFixed {

    public static EMPTY: DiceAndFixed = new DiceAndFixed(0, []);

    constructor(public readonly fixedNumber: number, public readonly dices: DeepReadonly<Dice[]>) { }

    increaseDice(times: number, sides: number) : DeepReadonly<DiceAndFixed> {
        let newDices = Array.from(this.dices);

        let index = newDices.findIndex(value => value.sides === sides);
        if(index === -1) {
            newDices.push(new Dice(times, sides));
        } else {
            let oldRoll = newDices[index];
            newDices[index] = new Dice(oldRoll.multiplier + times, sides);
        }

        return new DiceAndFixed(this.fixedNumber, newDices);
    }

    increaseFixed(number: number): DeepReadonly<DiceAndFixed> {
        return new DiceAndFixed(this.fixedNumber + number, Array.from(this.dices));
    }

    average(): number {
        return this.fixedNumber + this.dices.reduce((counter, dice) => counter + dice.average(), 0);
    }

    min() : number {
        return this.fixedNumber + this.dices.reduce((counter, dice) => counter + dice.min(), 0);
    }

    max() : number {
        return this.fixedNumber + this.dices.reduce((counter, dice) => counter + dice.max(), 0);
    }


    public toString(): string {
        let fixedString = "";
        let diceString = "";

        if(this.fixedNumber != 0) fixedString = this.fixedNumber.toString();

        diceString = this.dices
            .filter(dice => dice.multiplier !== 0)
            .map(dice => dice.toString())
            .join(" + ");

        if(this.dices.filter(dice => dice.multiplier !== 0).length > 0) {
            diceString += ` (${this.average()})`;
        }
        return [fixedString, diceString].filter(s => s.length > 0).join(" + ");
    }
}
