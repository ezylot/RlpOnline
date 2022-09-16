import {Component} from '@angular/core';
import {Character} from "../../classes/character";
import {Race} from "../../classes/race";
import {take} from "rxjs";
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";
import {getAllRaces} from "../../data/races";
import {cloneDeep} from "lodash-es";
import {ZERO_STATS} from "../../data/stats";

@Component({
    selector: 'app-race-selector',
    templateUrl: './race-selector.component.html',
    styleUrls: ['./race-selector.component.scss']
})
export class RaceSelectorComponent extends CharacterInjectingComponent {

    availableRaces: Race[] = getAllRaces();

    changeRace(race: Race) {
        this.character$.pipe(take(1)).subscribe(char => {
            let charToEdit = cloneDeep(char) as Character;
            charToEdit.raceName = race.name;
            if(race.name === "Humans") charToEdit.additionalData.chosenStats = ZERO_STATS;
            this.characterStorageService.saveCharacter(charToEdit);
        })
    }
}
