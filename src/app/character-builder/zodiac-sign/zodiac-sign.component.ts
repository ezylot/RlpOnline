import { Component, OnInit } from '@angular/core';
import {CharacterStorageService} from "../../services/character-storage.service";
import {Observable, take} from "rxjs";
import {Character} from "../../classes/character";
import {ZodiacSign} from "../../classes/zodiacsign";
import {ZODIAC_SIGNS} from "../../data/zodiacsigns";
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";

@Component({
  selector: 'app-zodiac-sign',
  templateUrl: './zodiac-sign.component.html',
  styleUrls: ['./zodiac-sign.component.scss']
})
export class ZodiacSignComponent extends CharacterInjectingComponent {

    availableZodiacSigns: ZodiacSign[] = ZODIAC_SIGNS;

    changeZodiacSign(zodiacSign: ZodiacSign) {
        this.character$.pipe(take(1)).subscribe(char => {
            this.characterStorageService.saveCharacter(Object.setPrototypeOf({ ...char, zodiacSign}, Character.prototype));
        });
    }
}
