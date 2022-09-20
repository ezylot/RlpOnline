import {Component} from '@angular/core';
import {take} from "rxjs";
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";
import {Culture} from "../../classes/culture";
import {getAllCultures} from "../../data/cultures";
import produce from "immer";

@Component({
    selector: 'app-culture',
    templateUrl: './culture.component.html',
    styleUrls: ['./culture.component.scss']
})
export class CultureComponent extends CharacterInjectingComponent {

    availableCultures: Culture[] = getAllCultures();

    changeCulture(culture: Culture) {
        this.character$.pipe(take(1)).subscribe(char => {
            this.characterStorageService.saveCharacter(produce(char, draft => {
                draft.cultureName = culture.name;
            }));
        });
    }
}
