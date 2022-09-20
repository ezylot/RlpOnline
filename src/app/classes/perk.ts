import {Character} from "./character";
import {PerkAndLevel} from "./perk-and-level";
import {Stats} from "./stats";
import {immerable, Immutable} from "immer";

export enum PerkCategory {
    BASE,
    MARTIAL,
    MANEUVERS,
    ODEM,
    MAGIC,
    DIVINE,
    SKILL,
}

export interface Perk {
    groupName: string;
    name: string;
    requirements: PerkRequirement[];
    tags: string[];
    description: string;
    startingLevel: number;
    additionalData: any;
    priority: number;
    internalCategory: PerkCategory;
    getCpCostForLevel(level: number, allPerks: PerkAndLevel[]): number;
    getGoldCostForLevel(level: number, allPerks: PerkAndLevel[]): number;
    applyEffect(character: Character, level: number): Character;
}

export class PerkRequirement {
    constructor(public readonly levels: { [key:number]:number; },
                public readonly perkname?: string,
                public readonly attributeName?: keyof Stats) { }

    public hasRequirements(char: Immutable<Character>, wantedLevel: number): boolean {
        if(this.perkname) {
            let perk = char.perks.find(pal => pal.perk.name == this.perkname)
            return (perk != undefined && perk.level >= this.getRequiredLevelForWantedLevel(wantedLevel));
        }

        if(this.attributeName) {
            // @ts-ignore
            let attr = char.getFinalCharacter().stats[this.attributeName] as number;
            return (attr != undefined && attr >= this.getRequiredLevelForWantedLevel(wantedLevel));
        }

        throw new Error("??");
    }

    public toCustomString(wantedLevel: number) : string {
        return `${this.perkname || this.attributeName?.toString()} : ${this.getRequiredLevelForWantedLevel(wantedLevel)}`
    }

    private getRequiredLevelForWantedLevel(wantedLevel: number) {
        for (let i = wantedLevel; i > 0; i--) {
            if(this.levels[i]) return this.levels[i];
        }
        throw new Error("??");
    }
}
