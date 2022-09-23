import {Equipment, EquipmentType} from "./equipment";

export enum ArmorType {
    CLOTHING = "Clothing",
    LIGHT = "Light",
    MEDIUM = "Medium",
    HEAVY = "Heavy"
}

export class Resist {
    cutAmount: number;
    piercingAmount: number;
    bluntAmount: number;


    constructor(cutAmount: number, piercingAmount: number, bluntAmount: number) {
        this.cutAmount = cutAmount;
        this.piercingAmount = piercingAmount;
        this.bluntAmount = bluntAmount;
    }

    public toString(): string {
        return `${this.cutAmount}c, ${this.piercingAmount}p, ${this.bluntAmount}b`;
    }
}

export class Armor implements Equipment {
    type: EquipmentType = EquipmentType.ARMOR;
    description: string = "";

    armorType: ArmorType;
    name: string;
    resists: Resist;
    attributes: string[];
    size: string;
    price: string;


    constructor(armorType: ArmorType,
                name: string,
                resists: Resist,
                attributes: string[],
                size: string,
                price: string) {
        this.armorType = armorType;
        this.name = name;
        this.resists = resists;
        this.attributes = attributes;
        this.size = size;
        this.price = price;
    }

}
