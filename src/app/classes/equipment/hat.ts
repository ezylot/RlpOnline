import {Equipment, EquipmentType} from "./equipment";

export class Hat implements Equipment {
    type: EquipmentType = EquipmentType.HAT;
    attributes: string[] = [];
    description: string;
    name: string;
    price: string;
    size: string;


    constructor(name: string, price: string, size: string, description: string) {
        this.description = description;
        this.name = name;
        this.price = price;
        this.size = size;
    }
}
