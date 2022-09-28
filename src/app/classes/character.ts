import {Race} from "./race";
import {Stats} from "./stats";
import {ZodiacSign} from "./zodiacsign";
import {Background} from "./background";
import {Culture} from "./culture";
import {DiceAndFixed} from "./dice-and-fixed";
import {PerkAndLevel} from "./perk-and-level";
import {DiceAndFixedAndLevel} from "./dice-and-fixed-and-level";
import {Dice} from "./dice";
import {Language} from "./language";
import {PerkCategory, PerkRequirement} from "./perk";
import {getAllZodiacSigns} from "../data/zodiacsigns";
import {getAllRaces} from "../data/races";
import {getAllCultures} from "../data/cultures";
import {getAllBackgrounds} from "../data/backgrounds";
import {orderBy} from "lodash-es";
import {Type} from "class-transformer";
import {immerable, produce} from "immer";
import {standardArray} from "../data/stats";
import {EquipmentAndQuality} from "./equipment/equipment-and-quality";
import {getEquipmentByName} from "../data/equipment";
import {EquipmentType} from "./equipment/equipment";
import {Armor, ArmorType} from "./equipment/armor";

// TODO: add perk cache
export class CharacterCaches {
    raceCache: Race | null = null;
    cultureCache: Culture | null = null;
    backgroundCache: Background | null = null;
    zodiacSignCache: ZodiacSign | null = null;
    finalCharacterCache: Character | null = null;
    unfulfilledPerkRequirements: { pal: PerkAndLevel; req: PerkRequirement[] }[] | null = null;
}

export class Character {
    [immerable] = true;

    // TODO: inventory
    // TODO: list of actions in combat
    // TODO: point buy

    public readonly startingCP = 1500;
    public readonly startingGold = 500;
    public readonly combatXP: number = 0;
    public readonly socialXP: number = 0;
    public readonly adventuringXP: number = 0;

    public readonly name: string = "New Character";
    public readonly raceName: string | null = null;
    public readonly cultureName: string | null = null;
    public readonly backgroundName: string | null = null;
    public readonly zodiacSignName: string | null = null;

    caches = new CharacterCaches();

    @Type(() => DiceAndFixed) public readonly maxHealth: DiceAndFixed = DiceAndFixed.empty();
    @Type(() => DiceAndFixed) public readonly healthRegenBonus: DiceAndFixed = DiceAndFixed.empty();
    @Type(() => DiceAndFixed) public readonly maxStamina: DiceAndFixed = DiceAndFixed.empty();
    @Type(() => DiceAndFixed) public readonly staminaRegenBonus: DiceAndFixed = DiceAndFixed.empty();
    @Type(() => DiceAndFixed) public readonly maxMana: DiceAndFixed = DiceAndFixed.empty();
    @Type(() => DiceAndFixed) public readonly manaRegenBonus: DiceAndFixed = DiceAndFixed.empty();

    @Type(() => DiceAndFixedAndLevel) public readonly dodgeModifier: DiceAndFixedAndLevel = DiceAndFixedAndLevel.empty();
    @Type(() => DiceAndFixedAndLevel) public readonly noticeModifier: DiceAndFixedAndLevel = DiceAndFixedAndLevel.empty();
    @Type(() => DiceAndFixedAndLevel) public readonly willpowerModifier: DiceAndFixedAndLevel = DiceAndFixedAndLevel.empty();

    @Type(() => Stats) public readonly statcap: Stats = new Stats(12, 12, 12, 12, 12,12, 12);
    @Type(() => Stats) public readonly stats: Stats = standardArray();

    @Type(() => PerkAndLevel) public readonly perks: PerkAndLevel[] = [];
    @Type(() => Language) public readonly languagesInLearnOrder: Language[] = [];

    public readonly equipment: EquipmentAndQuality[] = [];
    public readonly additionalData: any = { };


    constructor(public readonly id: string, public readonly createdTime: number, public updatedTime: number) { }

    getEquipment(equipmentName: string): EquipmentAndQuality | undefined {
        return this.equipment.filter(value => value.equipmentName === equipmentName)[0];
    }

    hasItems(itemName: string): boolean {
        return true;
    }

    getRace() : Race | null {
        if(this.raceName == null) return null;
        if(this.caches.raceCache != null && this.caches.raceCache.name == this.raceName) {
            return this.caches.raceCache;
        }

        let o = getAllRaces().find(r => r.name === this.raceName) || null;
        this.caches.raceCache = o;
        return o;
    }

    getCulture(): Culture | null {
        if(this.cultureName == null) return null;
        if(this.caches.cultureCache != null && this.caches.cultureCache.name == this.cultureName) {
            return this.caches.cultureCache;
        }

        let o = getAllCultures().find(r => r.name === this.cultureName) || null;
        this.caches.cultureCache = o;
        return o;
    }

    getBackground(): Background | null {
        if(this.backgroundName == null) return null;
        if(this.caches.backgroundCache != null && this.caches.backgroundCache.name == this.backgroundName) {
            return this.caches.backgroundCache;
        }

        let o = getAllBackgrounds().find(r => r.name === this.backgroundName) || null;
        this.caches.backgroundCache = o;
        return o;
    }

    getZodiacSign(): ZodiacSign | null {
        if(this.zodiacSignName == null) return null;
        if(this.caches.zodiacSignCache != null && this.caches.zodiacSignCache.name == this.zodiacSignName) {
            return this.caches.zodiacSignCache;
        }

        let o = getAllZodiacSigns().find(r => r.name === this.zodiacSignName) || null;
        this.caches.zodiacSignCache = o;
        return o;
    }


    getTotalCP() {
        let finalCharacter = this.getFinalCharacter();
        return finalCharacter.startingCP + this.getCPFromLevel() + (this.getRace()?.cpBonus || 0);
    }

    getFinalCombatStats() {
        let finalChar = this.getFinalCharacter();
        let race = finalChar.getRace();

        return {
            maxHealth: finalChar.maxHealth
                .increaseFixed(race?.startingHealth || 0)
                .increaseFixed(finalChar.stats.vitality),
            maxStamina: finalChar.maxStamina
                .increaseFixed(race?.startingStamina || 0)
                .increaseFixed(finalChar.stats.strength),
            maxMana: finalChar.maxMana
                .increaseFixed(race?.startingMana || 0)
                .increaseFixed(finalChar.stats.intellect),

            dodgeModifier: finalChar.dodgeModifier.increaseFixed(finalChar.stats.agility),
            noticeModifier: finalChar.noticeModifier.increaseFixed(finalChar.stats.perception),
            willpowerModifier: finalChar.willpowerModifier.increaseFixed(finalChar.stats.empathy),
        };
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

    getUnfulfilledPerkRequirements(category: string | undefined = undefined) : PerkRequirement[] {
        if(this.caches.unfulfilledPerkRequirements === null) {
            let finalCharacter = this.getFinalCharacter();
            this.caches.unfulfilledPerkRequirements = (finalCharacter.perks as PerkAndLevel[])
                .flatMap(pal => ({ pal, req: pal.perk.requirements.filter(req => !req.hasRequirements(finalCharacter, pal.level)) }));
        }

        if(category !== undefined) {
            let key = category as keyof typeof PerkCategory

            return this.caches.unfulfilledPerkRequirements
                .filter(r => r.pal.perk.internalCategory == PerkCategory[key])
                .flatMap(value => value.req);
        }

        return this.caches.unfulfilledPerkRequirements
            .flatMap(value => value.req);
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

    getFinalCharacter(): Character {
        if(this.caches.finalCharacterCache !== null) return this.caches.finalCharacterCache;

        let chosenStats = this.stats.toStatNumberArray();
        let raceStatBonis = this.getRace()?.statboni?.toStatNumberArray() || new Array(7).fill(0);
        if(this.getRace()?.name === "Humans") raceStatBonis = this.additionalData.chosenStats.toStatNumberArray();

        let newChar: Character = produce(this, draft => {
            draft.stats = Stats.fromArray(chosenStats.map(function(stat, i) {
                return stat + raceStatBonis[i];
            }));
        });

        newChar = this.applyEquipmentEffects(newChar);

        newChar = produce(newChar, draft => {
            draft.stats.strength = Math.min(draft.stats.strength, Math.max(1, draft.statcap.strength));
            draft.stats.vitality = Math.min(draft.stats.vitality, Math.max(1, draft.statcap.vitality));
            draft.stats.dexterity = Math.min(draft.stats.dexterity, Math.max(1, draft.statcap.dexterity));
            draft.stats.agility = Math.min(draft.stats.agility, Math.max(1, draft.statcap.agility));
            draft.stats.intellect = Math.min(draft.stats.intellect, Math.max(1, draft.statcap.intellect));
            draft.stats.perception = Math.min(draft.stats.perception, Math.max(1, draft.statcap.perception));
            draft.stats.empathy = Math.min(draft.stats.empathy, Math.max(1, draft.statcap.empathy));
        });


        for (let pal of orderBy(this.perks, ['perk.priority'], ['asc'])) {
            let race = this.getRace();
            if(race !== null) {
                pal = race.modifyPerkWhenLearning(pal);
            }
            newChar = pal.perk.applyEffect(newChar, pal.level)
        }

        this.caches.finalCharacterCache = newChar;
        return this.caches.finalCharacterCache;
    }

    private applyEquipmentEffects(newChar: Character) {
        let wornArmors = newChar.equipment
            .map(value => getEquipmentByName(value.equipmentName))
            .filter(value => value.type == EquipmentType.ARMOR) as Armor[];

        newChar = produce(newChar, draft => {
            if(wornArmors.some(value => value.armorType === ArmorType.LIGHT)) draft.statcap.agility = Math.min(draft.statcap.agility, 10);
            if(wornArmors.some(value => value.armorType === ArmorType.MEDIUM)) draft.statcap.agility = Math.min(draft.statcap.agility, 8);
            if(wornArmors.some(value => value.armorType === ArmorType.HEAVY)) draft.statcap.agility = Math.min(draft.statcap.agility, 6);
        });

        // Wearing two pieces of armor reduces a character’s Agility by 2, to a minimum of 1.
        if(wornArmors.length > 0) {
            newChar = produce(newChar, draft => {
                draft.statcap.agility = draft.statcap.agility - 2;
            });
        }

        for (let e of newChar.equipment) {
            newChar = getEquipmentByName(e.equipmentName).applyEffect(newChar);
        }

        // TODO: add armor quality bonus

        return newChar;
    }

    // noinspection JSUnusedGlobalSymbols
    toJSON()  {
        let {
            caches,
            ...objectWithoutCaches
        } = this;

        return objectWithoutCaches;
    }
}
