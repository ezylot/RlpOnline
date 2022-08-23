import {Component} from '@angular/core';
import {take} from "rxjs";
import {Character} from "../../classes/character";
import {ZodiacSign} from "../../classes/zodiacsign";
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";
import {Background} from "../../classes/background";
import {BACKGROUNDS} from "../../data/backgrounds";

@Component({
    selector: 'app-zodiac-sign',
    templateUrl: './backgrounds.component.html',
    styleUrls: ['./backgrounds.component.scss']
})
export class BackgroundsComponent extends CharacterInjectingComponent {

    availableBackgrounds: Background[] = BACKGROUNDS;

    changeBackground(background: Background) {
        this.character$.pipe(take(1)).subscribe(char => {
            this.characterStorageService.saveCharacter(Object.setPrototypeOf({ ...char, background}, Character.prototype));
        });
    }
}
