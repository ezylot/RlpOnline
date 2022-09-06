import {Component} from '@angular/core';
import {take} from "rxjs";
import {Character} from "../../classes/character";
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";
import {Background} from "../../classes/background";
import {getAllBackgrounds} from "../../data/backgrounds";
import {cloneDeep} from "lodash-es";

@Component({
    selector: 'app-background',
    templateUrl: './backgrounds.component.html',
    styleUrls: ['./backgrounds.component.scss']
})
export class BackgroundsComponent extends CharacterInjectingComponent {

    availableBackgrounds: Background[] = getAllBackgrounds();

    changeBackground(background: Background) {
        this.character$.pipe(take(1)).subscribe(char => {
            let charToEdit = cloneDeep(char) as Character;
            charToEdit.backgroundName = background.name;
            this.characterStorageService.saveCharacter(charToEdit);
        });
    }
}
