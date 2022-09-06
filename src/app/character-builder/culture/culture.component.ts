import {Component} from '@angular/core';
import {take} from "rxjs";
import {Character} from "../../classes/character";
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";
import {Culture} from "../../classes/culture";
import {getAllCultures} from "../../data/cultures";
import {cloneDeep} from "lodash-es";

@Component({
    selector: 'app-culture',
    templateUrl: './culture.component.html',
    styleUrls: ['./culture.component.scss']
})
export class CultureComponent extends CharacterInjectingComponent {

    availableCultures: Culture[] = getAllCultures();

    changeCulture(culture: Culture) {
        this.character$.pipe(take(1)).subscribe(char => {
            let charToEdit = cloneDeep(char) as Character;
            charToEdit.cultureName = culture.name;
            this.characterStorageService.saveCharacter(charToEdit);
        });
    }
}
