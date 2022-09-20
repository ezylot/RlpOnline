import {DiceAndFixed} from "./dice-and-fixed";
import {immerable, produce} from "immer";


export class DiceAndFixedAndLevel {
    [immerable] = true;

    public static empty(): DiceAndFixedAndLevel {
        return new DiceAndFixedAndLevel(DiceAndFixed.empty(), DiceAndFixed.empty(), DiceAndFixed.empty(), DiceAndFixed.empty());
    }

    constructor(
        public readonly baseModifier: DiceAndFixed,
        public readonly combatModifier: DiceAndFixed,
        public readonly adventuringModifier: DiceAndFixed,
        public readonly socialModifier: DiceAndFixed,
    ) { }

    increaseDice(times: number, sides: number) : DiceAndFixedAndLevel {
        return produce(this, draft => {
            draft.baseModifier = this.baseModifier.increaseDice(times, sides);
        });
    }

    increaseFixed(number: number) : DiceAndFixedAndLevel {
        return produce(this, draft => {
            draft.baseModifier = this.baseModifier.increaseFixed(number);
        });
    }

    average() : number {
        return this.baseModifier.average();
    }

    min() : number {
        return this.baseModifier.min();
    }

    max() : number {
        return this.baseModifier.max();
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

        return `<span class="exact-string-stat">Combat:</span> + ${combatTotal} <br />
                <span class="exact-string-stat"">Adven.:</span> + ${adventuringTotal} <br />
                <span class="exact-string-stat">Social:</span> + ${socialTotal}`;

    }
}
