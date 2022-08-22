import {DiceAndFixed} from "./dice-and-fixed";


export class DiceAndFixedAndLevel {

    public static EMPTY: DiceAndFixedAndLevel = new DiceAndFixedAndLevel(DiceAndFixed.EMPTY, DiceAndFixed.EMPTY, DiceAndFixed.EMPTY, DiceAndFixed.EMPTY);

    constructor(
        public readonly baseModifier: DiceAndFixed,
        public readonly combatModifier: DiceAndFixed,
        public readonly adventuringModifier: DiceAndFixed,
        public readonly socialModifier: DiceAndFixed,
    ) { }

    increaseDice(times: number, sides: number) : DiceAndFixedAndLevel {
        return Object.setPrototypeOf({ ...this, baseModifier: this.baseModifier.increaseDice(times, sides) }, DiceAndFixedAndLevel.prototype);
    }

    increaseFixed(number: number) : DiceAndFixedAndLevel {
        return Object.setPrototypeOf({ ...this, baseModifier: this.baseModifier.increaseFixed(number) }, DiceAndFixedAndLevel.prototype);
    }

    average() : number {
        return this.baseModifier.average();
    }

    hasLevelSpecificValues() {
        return this.combatModifier.average() + this.adventuringModifier.average() + this.socialModifier.average() > 0;
    }

    public toString() : string {
        let baseString = this.baseModifier.toString();
        if(this.hasLevelSpecificValues()) {
            baseString += " *"
        }
        return baseString;
    }
}
