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

    public toExactString() : string {

        let combatTotal = this.baseModifier.increaseFixed(this.combatModifier.fixedNumber)
        for (let dice of this.combatModifier.dices) {
            combatTotal = combatTotal.increaseDice(dice.multiplier, dice.sides);
        }

        let adventuringTotal = this.baseModifier.increaseFixed(this.adventuringModifier.fixedNumber)
        for (let dice of this.adventuringModifier.dices) {
            adventuringTotal = adventuringTotal.increaseDice(dice.multiplier, dice.sides);
        }

        let socialTotal = this.baseModifier.increaseFixed(this.socialModifier.fixedNumber)
        for (let dice of this.socialModifier.dices) {
            socialTotal = socialTotal.increaseDice(dice.multiplier, dice.sides);
        }

        if(combatTotal.average() == adventuringTotal.average() && adventuringTotal.average() == socialTotal.average()) {
            return combatTotal.toString();
        }

        return `Combat ${combatTotal} | Adventuring ${adventuringTotal} | Social ${socialTotal}`;

    }
}
