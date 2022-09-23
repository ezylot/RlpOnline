import {immerable} from "immer";

export class EquipmentAndQuality {
    [immerable]=true;

    equipmentName: string;
    quality: number;

    constructor(equipmentName: string, quality: number) {
        this.equipmentName = equipmentName;
        this.quality = quality;
    }
}
