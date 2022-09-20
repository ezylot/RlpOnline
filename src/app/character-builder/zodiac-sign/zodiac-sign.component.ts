import {Component} from '@angular/core';
import {take} from "rxjs";
import {Character} from "../../classes/character";
import {ZodiacSign} from "../../classes/zodiacsign";
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";
import {getAllZodiacSigns} from "../../data/zodiacsigns";
import produce from "immer";

@Component({
  selector: 'app-zodiac-sign',
  templateUrl: './zodiac-sign.component.html',
  styleUrls: ['./zodiac-sign.component.scss']
})
export class ZodiacSignComponent extends CharacterInjectingComponent {

    availableZodiacSigns: ZodiacSign[] = getAllZodiacSigns();

    changeZodiacSign(zodiacSign: ZodiacSign) {
        this.character$.pipe(take(1)).subscribe(char => {
            this.characterStorageService.saveCharacter(produce(char, draft => {
                draft.zodiacSignName = zodiacSign.name
            }));
        });
    }
}
