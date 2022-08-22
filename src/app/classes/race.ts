import {Stats} from "./stats";
import {Language} from "./language";
import {AbilityRoll} from "./abilityroll";
import {Attackroll} from "./attackroll";
import {DamageRoll} from "./damageroll";
import {LevelUpBonus} from "./levelupbonus";
import {PerkAndLevel} from "./perk-and-level";


export interface Race {
    name: string
    flavorText: string;
    textDescription: string;
    statboni: Stats;

    traitsAsStrings: string[];

    startingHealth: number;
    startingStamina: number;
    startingMana: number

    languages: Language[];

    cpBonus: number;
    freeAttributePoints: number;

    modifyAbilityCheck(abilityRoll: AbilityRoll) : AbilityRoll;
    modifyAttack(attackRoll: Attackroll) : Attackroll;
    modifyDamage(attackRoll: Attackroll, damageRoll: DamageRoll) : DamageRoll;
    modifyIncomingAttack(damageRoll: DamageRoll) : DamageRoll;
    modifyIncomingDamage(damageRoll: DamageRoll) : DamageRoll;
    modifyPerkWhenLearning(pal: PerkAndLevel) : PerkAndLevel;
    levelUpBonus() : LevelUpBonus;
}
