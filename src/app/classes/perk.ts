import {Character} from "./character";
import {PerkAndLevel} from "./perk-and-level";

export enum PerkCategory {
    BASE,
    MARTIAL,
    MAGIC,
    SKILL,
}

export interface Perk {
    groupName: string;
    name: string;
    requirements: { perkname: string, level: number }[];
    tags: string[];
    description: string;
    startingLevel: number;
    additionalData: any;
    priority: number,
    internalCategory: PerkCategory,
    getCpCostForLevel(level: number, allPerks: Readonly<PerkAndLevel[]>): number;
    getGoldCostForLevel(level: number, allPerks: Readonly<PerkAndLevel[]>): number,
    applyEffect(character: Readonly<Character>, level: number): Character;
}
