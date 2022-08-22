import {Race} from "./race";
import {Stats} from "./stats";
import {STANDARD_ARRAY} from "../data/stats";
import {ZodiacSign} from "./zodiacsign";
import {Background} from "./background";
import {Culture} from "./culture";
import {DiceAndFixed} from "./dice-and-fixed";
import {PerkAndLevel} from "./perk-and-level";
import {DiceAndFixedAndLevel} from "./dice-and-fixed-and-level";


export class Character {

    startingCP = 1500;

    public name: string = "New Character";
    public race: Race | null = null;
    public culture: Culture | null = null;
    public background: Background | null = null;
    public zodiacSign: ZodiacSign | null = null;

    public maxHealth: DiceAndFixed = DiceAndFixed.EMPTY;
    public healthRegenBonus: DiceAndFixed = DiceAndFixed.EMPTY;
    public maxStamina: DiceAndFixed = DiceAndFixed.EMPTY;
    public staminaRegenBonus: DiceAndFixed = DiceAndFixed.EMPTY;
    public maxMana: DiceAndFixed = DiceAndFixed.EMPTY;
    public manaRegenBonus: DiceAndFixed = DiceAndFixed.EMPTY;

    public dodgeModifier: DiceAndFixedAndLevel = DiceAndFixedAndLevel.EMPTY;
    public noticeModifier: DiceAndFixedAndLevel = DiceAndFixedAndLevel.EMPTY;
    public willpowerModifier: DiceAndFixedAndLevel = DiceAndFixedAndLevel.EMPTY;

    public stats: Stats = STANDARD_ARRAY;
    public perks: PerkAndLevel[] = [];

    combatXP: number = 0;
    socialXP: number = 0;
    adventuringXP: number = 0;

    constructor(readonly id: string, public readonly createdTime: number, public updatedTime: number) {
    }


    getFinalStats() : Stats {
        let chosenStats = this.stats.toStatNumberArray();
        let raceStatBonis = this.race?.statboni?.toStatNumberArray() || new Array(7).fill(0)

        return Stats.fromArray(chosenStats.map(function(stat, i) {
            return stat + raceStatBonis[i];
        }));
    }

    getTotalCP() {
        return this.startingCP + (this.race?.cpBonus || 0);
    }

    getFinalCombatStats() {
        let finalChar = this.getFinalCharacter();
        return Object.freeze({
            maxHealth: finalChar.maxHealth
                .increaseFixed(finalChar.race?.startingHealth || 0)
                .increaseFixed(finalChar.stats.vitality),
            maxStamina: finalChar.maxStamina
                .increaseFixed(finalChar.race?.startingStamina || 0)
                .increaseFixed(finalChar.stats.strength),
            maxMana: finalChar.maxMana
                .increaseFixed(finalChar.race?.startingMana || 0)
                .increaseFixed(finalChar.stats.intellect),

            dodgeModifier: finalChar.dodgeModifier
                .increaseFixed(finalChar.stats.agility)
                .increaseFixed(8),
            noticeModifier: finalChar.noticeModifier
                .increaseFixed(finalChar.stats.perception)
                .increaseFixed(8),
            willpowerModifier: finalChar.willpowerModifier
                .increaseFixed(finalChar.stats.empathy)
                .increaseFixed(8),
        });
    }

    getSocialLevel() : number {
        return 1;
    }

    getCombatLevel() : number {
        return 1;
    }

    getAdventuringLevel() : number {
        return 1;
    }


    getFinalCharacter() {
        let finalChar: Character = this;
        for (let pal of this.perks) {
            finalChar = Object.freeze(finalChar);
            if(this.race) {
                pal = this.race?.modifyPerkWhenLearning(pal);
            }
            finalChar = pal.perk.applyEffect(finalChar, pal.level);
        }

        // TODO: background? culture? zodiac sign?
        return Object.freeze(finalChar);
    }
}
