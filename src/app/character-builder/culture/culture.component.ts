import {Component} from '@angular/core';
import {take} from "rxjs";
import {Character} from "../../classes/character";
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";
import {Culture} from "../../classes/culture";
import {CULTURES} from "../../data/cultures";

@Component({
    selector: 'app-culture',
    templateUrl: './culture.component.html',
    styleUrls: ['./culture.component.scss']
})
export class CultureComponent extends CharacterInjectingComponent {

    availableCultures: Culture[] = CULTURES;

    changeCulture(culture: Culture) {
        this.character$.pipe(take(1)).subscribe(char => {
            this.characterStorageService.saveCharacter(Object.setPrototypeOf({ ...char, culture}, Character.prototype));
        });
    }
}
