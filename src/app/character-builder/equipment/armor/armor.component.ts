import {Component, Input} from '@angular/core';
import {Armor, ArmorType} from "../../../classes/equipment/armor";
import {take} from "rxjs";
import produce from "immer";
import {getTagDescription} from "../../../data/equipment";
import {CharacterInjectingComponent} from "../../CharacterInjectingComponent";
import {EquipmentAndQuality} from "../../../classes/equipment/equipment-and-quality";

@Component({
    selector: 'equipment-armor',
    templateUrl: './armor.component.html',
    styleUrls: ['./armor.component.scss']
})
export class ArmorComponent extends CharacterInjectingComponent {
    _armorType = ArmorType;
    equipmentQualityMap = new Map<string, number>();

    @Input()
    armor!: Armor;

    toggleArmor(equipmentName: string) {
        this.character$.pipe(take(1)).subscribe(char => {
            this.characterStorageService.saveCharacter(produce(char, charToEdit => {
                let armorIndex = charToEdit.equipment.findIndex(v => v.equipmentName === equipmentName);
                if(armorIndex === -1) {
                    charToEdit.equipment.push(new EquipmentAndQuality(equipmentName, this.equipmentQualityMap.get(equipmentName) || 0));
                } else {
                    charToEdit.equipment.splice(armorIndex, 1);
                }
            }));
        });
    }

    selectQuality(name: string, value: Event) {
        let selectElement = value.target as HTMLSelectElement;
        this.equipmentQualityMap.set(name, Number(selectElement.value));

        this.character$.pipe(take(1)).subscribe(char => {
            this.characterStorageService.saveCharacter(produce(char, charToEdit => {
                let equipmentToEdit = charToEdit.equipment.find(v => v.equipmentName === name);
                if(equipmentToEdit == undefined) return;
                equipmentToEdit.quality = Number(selectElement.value);
            }));
        });
    }

    getTooltipForAttr(attr: string) {
        return getTagDescription(attr);
    }
}
