import {Race} from "./race";
import {Stats} from "./stats";
import {STANDARD_ARRAY} from "../data/stats";
import {ZodiacSign} from "./zodiacsign";
import {Background} from "./background";
import {Culture} from "./culture";
import {DiceAndFixed} from "./dice-and-fixed";
import {PerkAndLevel} from "./perk-and-level";
import {DiceAndFixedAndLevel} from "./dice-and-fixed-and-level";
import {Dice} from "./dice";
import {Language} from "./language";
import {PerkCategory} from "./perk";


export class Character {

    // TODO: inventory
    // TODO: list of actions in combat
    // TODO: point buy

    startingCP = 1500;
    startingGold = 500;

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
    public evadeModifier: DiceAndFixedAndLevel = DiceAndFixedAndLevel.EMPTY;
    public noticeModifier: DiceAndFixedAndLevel = DiceAndFixedAndLevel.EMPTY;
    public willpowerModifier: DiceAndFixedAndLevel = DiceAndFixedAndLevel.EMPTY;

    public statcap: Stats = new Stats(12, 12, 12, 12, 12,12, 12);

    public stats: Stats = STANDARD_ARRAY;
    public perks: PerkAndLevel[] = [];

    public equipment: [] | null = null;
    public languagesInLearnOrder: Language[] = [];

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
        return this.startingCP + this.getCPFromLevel() + (this.race?.cpBonus || 0);
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

    getHealthRecovery() : DiceAndFixed {
        let enhancePool = this.perks.find(pal => pal.perk.name == "Enhance Pool: Health");
        return new DiceAndFixed( 1 + (enhancePool?.level || 0), []);
    }
    getStaminaRecovery() : DiceAndFixed {
        let enhancePool = this.perks.find(pal => pal.perk.name == "Enhance Pool: Stamina");
        return new DiceAndFixed(1 + (enhancePool?.level || 0), []);
    }
    getManaRecovery() : DiceAndFixed {
        let enhancePool = this.perks.find(pal => pal.perk.name == "Enhance Pool: Mana");
        return new DiceAndFixed(0, [ new Dice(1 + (enhancePool?.level || 0), 6) ]);
    }

    getSocialLevel() : number {
        return this.getLevel(this.socialXP);
    }

    getCombatLevel() : number {
        return this.getLevel(this.combatXP);
    }

    getAdventuringLevel() : number {
        return this.getLevel(this.adventuringXP);
    }

    getCPFromLevel() : number {
        let totalCpAdded = 0;

        for (let i = 1; i <= this.combatXP; i++) {
            totalCpAdded += 100 * this.getLevel(i);
        }
        for (let i = 1; i <= this.adventuringXP; i++) {
            totalCpAdded += 100 * this.getLevel(i);
        }
        for (let i = 1; i <= this.socialXP; i++) {
            totalCpAdded += 100 * this.getLevel(i);
        }

        return totalCpAdded;
    }

    getRemainingCP() : number {
        let remainingCP = this.getTotalCP();

        for (let pal of this.perks.filter(pal => pal.perk.internalCategory !== PerkCategory.SKILL)) {
            for (let i = 1; i <= pal.level; i++) {
                remainingCP -= pal.perk.getCpCostForLevel(i, this.perks);
            }
        }

        let skillsAlreadyCalculated: PerkAndLevel[] = []
        for (let pal of this.perks.filter(pal => pal.perk.internalCategory == PerkCategory.SKILL)) {
            for (let i = 1; i <= pal.level; i++) {
                remainingCP -= pal.perk.getCpCostForLevel(i, skillsAlreadyCalculated);
                skillsAlreadyCalculated.push(new PerkAndLevel(1, pal.perk));
            }
        }

        for (let i = 0; i < this.languagesInLearnOrder.length || 0; i++){
            let lang = this.languagesInLearnOrder[i];
            let knownLanguagesWhenLearning = this.languagesInLearnOrder.slice(0, i);
            remainingCP -= lang.getCpCost(knownLanguagesWhenLearning);
        }

        return remainingCP;
    }

    getLevel(xp : number) : number {
        if(xp >= 761) return 21;
        if(xp >= 685) return 20;
        if(xp >= 613) return 19;
        if(xp >= 545) return 18;
        if(xp >= 481) return 17;
        if(xp >= 421) return 16;
        if(xp >= 365) return 15;
        if(xp >= 313) return 14;
        if(xp >= 365) return 13;
        if(xp >= 221) return 12;
        if(xp >= 181) return 11;
        if(xp >= 145) return 10;
        if(xp >= 113) return 9;
        if(xp >= 85) return 8;
        if(xp >= 61) return 7;
        if(xp >= 41) return 6;
        if(xp >= 25) return 5;
        if(xp >= 13) return 4;
        if(xp >= 5) return 3;
        if(xp >= 1) return 2;
        return 1;
    }

    getFinalCharacter() {
        let finalChar: Character = this;
        for (let pal of this.perks.sort((a,b) => a.perk.priority - b.perk.priority)) {
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
