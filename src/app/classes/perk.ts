import {Character} from "./character";
import {PerkAndLevel} from "./perk-and-level";

export interface Perk {
    name: string;
    requirements: string;
    tags: string[];
    description: string;
    startingLevel: number;
    additionalData: any;
    priority: number,
    getCpCostForLevel(level: number, allPerks: Readonly<PerkAndLevel[]>): number;
    applyEffect(character: Readonly<Character>, level: number): Character;
}
