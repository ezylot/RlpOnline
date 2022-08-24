import {Component} from '@angular/core';
import {Character} from "../../classes/character";
import {Race} from "../../classes/race";
import {take} from "rxjs";
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";
import {getAllRaces} from "../../data/races";

@Component({
    selector: 'app-race-selector',
    templateUrl: './race-selector.component.html',
    styleUrls: ['./race-selector.component.scss']
})
export class RaceSelectorComponent extends CharacterInjectingComponent {

    availableRaces: Race[] = getAllRaces();

    changeRace(race: Race) {
        this.character$.pipe(take(1)).subscribe(char => {
            this.characterStorageService.saveCharacter(Object.setPrototypeOf({
                ...char,
                raceName: race.name
            }, Character.prototype));
        })
    }
}
