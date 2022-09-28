import {Component} from '@angular/core';
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";
import {Equipment, EquipmentType} from "../../classes/equipment/equipment";
import {BehaviorSubject, combineLatest, takeUntil} from "rxjs";
import {getAllEquipment} from "../../data/equipment";
import {Armor} from "../../classes/equipment/armor";
import {eq} from "lodash-es";

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent extends CharacterInjectingComponent {
    availableEquipment: Equipment[] = [];
    searchString$: BehaviorSubject<string> = new BehaviorSubject<string>("");
    _equipmentType = EquipmentType;

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

    equipmentName(index: number, eq: Equipment) {
        return eq.name;
    }

    asArmor(equipment: Equipment): Armor {
        if(!(equipment instanceof Armor)) throw new Error("Tried to convert equipment to armor, but its not an armor: " + JSON.stringify(equipment));
        return equipment;
    }
}
