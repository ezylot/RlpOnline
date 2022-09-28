import {Equipment, EquipmentType} from "./equipment";
import {Character} from "../character";

export class Necklace implements Equipment {
    type: EquipmentType = EquipmentType.NECKLACE;
    attributes: string[] = [];

    constructor(readonly name: string,
                readonly price: string,
                readonly size: string,
                readonly description: string,
                applyEffectFunction?: (character: Character) => Character) {
        if(applyEffectFunction) this.applyEffect = applyEffectFunction;
    }

    applyEffect = function (character: Character): Character {
        return character;
    }
}
