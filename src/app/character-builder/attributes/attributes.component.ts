import {Component} from '@angular/core';
import {Character} from "../../classes/character";
import {Stats} from "../../classes/stats";
import {STANDARD_ARRAY} from "../../data/stats";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";
import {take, takeUntil} from "rxjs";

@Component({
    selector: 'app-attributes',
    templateUrl: './attributes.component.html',
    styleUrls: ['./attributes.component.scss']
})
export class AttributesComponent extends CharacterInjectingComponent{

    //TODO: add human column to distribute attributes
    stats: Stats = STANDARD_ARRAY;

    override ngOnInit(): void {
        super.ngOnInit();
        this.character$.pipe(takeUntil(this.destroy$)).subscribe(char => this.stats = char.stats);
    }

    drop($event: CdkDragDrop<string[]>) {
        this.character$.pipe(take(1)).subscribe(char => {
            let chosenOrder = this.stats.toStatNumberArray();
            moveItemInArray(chosenOrder, $event.previousIndex, $event.currentIndex);
            this.stats = Stats.fromArray(chosenOrder);
            this.characterStorageService.saveCharacter(Object.setPrototypeOf({
                ...char,
                stats: this.stats
            }, Character.prototype));
        });

    }
}
