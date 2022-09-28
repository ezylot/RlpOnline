import {Component, Input} from '@angular/core';
import {CharacterInjectingComponent} from "../../CharacterInjectingComponent";
import {take} from "rxjs";
import produce from "immer";
import {EquipmentAndQuality} from "../../../classes/equipment/equipment-and-quality";
import {Equipment} from "../../../classes/equipment/equipment";

@Component({
  selector: 'equipment-other-wearable',
  templateUrl: './other-wearable.component.html',
  styleUrls: ['./other-wearable.component.scss']
})
export class OtherWearableComponent extends CharacterInjectingComponent {

    @Input()
    equipment!: Equipment;

    toggleEquipment(equipmentName: string) {
        this.character$.pipe(take(1)).subscribe(char => {
            this.characterStorageService.saveCharacter(produce(char, charToEdit => {
                let armorIndex = charToEdit.equipment.findIndex(v => v.equipmentName === equipmentName);
                if(armorIndex === -1) {
                    charToEdit.equipment.push(new EquipmentAndQuality(equipmentName, 0));
                } else {
                    charToEdit.equipment.splice(armorIndex, 1);
                }
            }));
        });
    }
}
