import { Component, OnInit } from '@angular/core';
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent extends CharacterInjectingComponent{
    availableItems: { name: string }[] = [];

    override ngOnInit() {
        super.ngOnInit();
    }

    search($event: Event) {

    }

    changeItems(equipment: { name: string }) {

    }
}

