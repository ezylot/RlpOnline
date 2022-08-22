import { Component, OnInit } from '@angular/core';
import {CharacterStorageService} from "../../services/character-storage.service";
import {Character} from "../../classes/character";
import {Race} from "../../classes/race";
import { RACES } from 'src/app/data/races';
import {Observable, take, takeUntil} from "rxjs";
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";

@Component({
  selector: 'app-race-selector',
  templateUrl: './race-selector.component.html',
  styleUrls: ['./race-selector.component.scss']
})
export class RaceSelectorComponent extends CharacterInjectingComponent {

    availableRaces: Race[] = RACES;

    changeRace(race: Race) {
        this.character$.pipe(take(1)).subscribe(char => {
            this.characterStorageService.saveCharacter(Object.setPrototypeOf({ ...char, race}, Character.prototype));
        })
    }
}
