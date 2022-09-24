import {Component} from '@angular/core';
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";
import {Equipment, EquipmentType} from "../../classes/equipment/equipment";
import {BehaviorSubject, take, takeUntil} from "rxjs";
import {combineLatest} from "rxjs";
import {getAllEquipment, getTagDescription} from "../../data/equipment";
import {Armor, ArmorType} from "../../classes/equipment/armor";
import produce from "immer";
import {eq} from "lodash-es";
import {EquipmentAndQuality} from "../../classes/equipment/equipment-and-quality";

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent extends CharacterInjectingComponent{
    availableEquipment: Equipment[] = [];
    searchString$: BehaviorSubject<string> = new BehaviorSubject<string>("");
    equipmentQualityMap = new Map<string, number>();
    _armorType = ArmorType;

    override ngOnInit() {
        super.ngOnInit();

        combineLatest([this.character$, this.searchString$])
            .pipe(takeUntil(this.destroy$))
            .subscribe(([char, searchString]) => {

                let returnList = getAllEquipment();

                let category: EquipmentType = EquipmentType.ARMOR;
                if(this.router.url.endsWith("simple-weapon")) category = EquipmentType.WEAPON;
                if(this.router.url.endsWith("regular-weapon")) category = EquipmentType.WEAPON;
                if(this.router.url.endsWith("unusual-weapon")) category = EquipmentType.WEAPON;
                if(this.router.url.endsWith("shields")) category = EquipmentType.SHIELD;
                if(this.router.url.endsWith("hat")) category = EquipmentType.HAT;
                if(this.router.url.endsWith("gloves")) category = EquipmentType.GLOVE;
                if(this.router.url.endsWith("boots")) category = EquipmentType.BOOT;
                if(this.router.url.endsWith("rings")) category = EquipmentType.RING;
                if(this.router.url.endsWith("necklaces")) category = EquipmentType.NECKLACE;
                if(this.router.url.endsWith("belts")) category = EquipmentType.BELT;

                returnList = returnList.filter(p => p.type === category);

                if (!!this.searchString$) {
                    returnList = returnList.filter(p => {
                        return Object.entries(p).some(([key, value]) => JSON.stringify(value).toLowerCase().indexOf(searchString.toLowerCase()) !== -1)
                    });
                }

                this.availableEquipment = returnList;
            })

    }

    search($event: Event) {
        if($event.target as HTMLInputElement) {
            this.searchString$.next(($event.target as HTMLInputElement).value);
        }
    }

    toggleEquipment(equipmentName: string) {
        this.character$.pipe(take(1)).subscribe(char => {
            this.characterStorageService.saveCharacter(produce(char, charToEdit => {
                let equipmentId = charToEdit.equipment.findIndex(v => v.equipmentName === equipmentName);
                if(equipmentId === -1) {
                    charToEdit.equipment.push(new EquipmentAndQuality(equipmentName, this.equipmentQualityMap.get(equipmentName) || 0));
                } else {
                    charToEdit.equipment.splice(equipmentId, 1);
                }
            }));
        });
    }

    equipmentName(index: number, eq: Equipment) {
        return eq.name;
    }

    asArmorOrNull(equipment: Equipment): Armor | null {
        return (equipment instanceof Armor) ? equipment : null;
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
