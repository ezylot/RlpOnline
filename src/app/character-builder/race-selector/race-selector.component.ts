import {Component} from '@angular/core';
import {Race} from "../../classes/race";
import {take} from "rxjs";
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";
import {getAllRaces} from "../../data/races";
import produce from "immer";
import {zeroStats} from "../../data/stats";

@Component({
    selector: 'app-race-selector',
    templateUrl: './race-selector.component.html',
    styleUrls: ['./race-selector.component.scss']
})
export class RaceSelectorComponent extends CharacterInjectingComponent {

    availableRaces: Race[] = getAllRaces();

    changeRace(race: Race) {
        this.character$.pipe(take(1)).subscribe(char => {
            this.characterStorageService.saveCharacter(produce(char, draft => {
                draft.raceName = race.name;
                if(race.name === "Humans") draft.additionalData.chosenStats = zeroStats();
            }));
        })
    }
}
