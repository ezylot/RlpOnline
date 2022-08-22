import {Dice} from "./dice";


export class DiceAndFixed {
    constructor(public readonly fixedNumber: number, public readonly dices: Dice[]) { }

    increaseDice(times: number, sides: number) : DiceAndFixed {
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

    increaseFixed(number: number) {
        return new DiceAndFixed(this.fixedNumber + number, Array.from(this.dices));
    }

    private average() {
        let sum = this.fixedNumber;
        this.dices.forEach(d => sum += (d.sides+1) / 2 * d.multiplier);
        return sum;
    }

    public toString() : string {
        let string = "";

        if(this.fixedNumber != 0) {
            string = this.fixedNumber.toString();
        }

        if(this.dices.length > 0) {
            string +=  " + "
            this.dices.forEach(dice => string += dice.toString() + " + ");
            string = string.substring(0, string.length-3).trim();
        }

        string += ` (${this.average()})`;
        return string;
    }
}
