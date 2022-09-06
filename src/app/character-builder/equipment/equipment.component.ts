import {Component} from '@angular/core';
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent extends CharacterInjectingComponent{
    availableEquipment: { name: string }[] = [];

    override ngOnInit() {
        super.ngOnInit();
    }

    search($event: Event) {

    }

    changeEquipment(equipment: { name: string }) {

    }
}
