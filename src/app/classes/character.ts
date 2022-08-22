import {Race} from "./race";
import {Stats} from "./stats";
import {STANDARD_ARRAY} from "../data/stats";
import {ZodiacSign} from "./zodiacsign";
import {Background} from "./background";
import {Culture} from "./culture";
import {DiceAndFixed} from "./dice-and-fixed";
import {PerkAndLevel} from "./perk-and-level";


export class Character {

    startingCP = 1500;

    public name: string = "New Character";
    public race: Race | null = null;
    public culture: Culture | null = null;
    public background: Background | null = null;
    public zodiacSign: ZodiacSign | null = null;

    public maxHealth: DiceAndFixed = new DiceAndFixed(0, []);
    public healthRegenBonus: DiceAndFixed = new DiceAndFixed(0, []);
    public maxStamina: DiceAndFixed = new DiceAndFixed(0, []);
    public staminaRegenBonus: DiceAndFixed = new DiceAndFixed(0, []);
    public maxMana: DiceAndFixed = new DiceAndFixed(0, []);
    public manaRegenBonus: DiceAndFixed = new DiceAndFixed(0, []);

    public dodgeModifier: DiceAndFixed = new DiceAndFixed(0, []);
    public noticeModifier: DiceAndFixed = new DiceAndFixed(0, []);
    public willpowerModifier: DiceAndFixed = new DiceAndFixed(0, []);

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
