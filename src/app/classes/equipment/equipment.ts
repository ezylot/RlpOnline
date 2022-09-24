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

export interface Equipment {
    type: EquipmentType;
    name: string;
    size: string;
    price: string;
    attributes: string[];
    description: string;
}
