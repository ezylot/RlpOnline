export enum EquipmentType {
    ARMOR,
    WEAPON,
    BELT,
    NECKLACE,
    RING,
    BOOT,
    GLOVE,
    HAT,
    SHIELD,
}

export const TAGS = {
    UNDER: "Under",
    OVER: "Over",
    POCKETS(size: string): string { return `Pockets(${size})`},
    WARMING(amount: number): string { return `Warming(${amount})`},
    COOLING(amount: number): string { return `Cooling(${amount})`},
    ENCHANTABLE(amount: number): string { return `Enchantable(${amount})`},
};


export interface Equipment {
    type: EquipmentType;
    name: string;
    size: string;
    price: string;
    attributes: string[];
    description: string;
}
