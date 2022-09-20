import {Component} from '@angular/core';
import {take, takeUntil} from "rxjs";
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";
import {ADVENTURING_TEXT, COMBATLEVEL_TEXT, SOCIALLEVEL_TEXT} from "../../data/texts";
import produce from "immer";

@Component({
    selector: 'app-name-selector',
    templateUrl: './name-selector.component.html',
    styleUrls: ['./name-selector.component.scss']
})
export class NameSelectorComponent extends CharacterInjectingComponent{

    _COMBATLEVEL_TEXT = COMBATLEVEL_TEXT;
    _ADVENTURING_TEXT = ADVENTURING_TEXT;
    _SOCIALLEVEL_TEXT = SOCIALLEVEL_TEXT;

    name: string = "";
    combatXP: number = 0;
    adventuringXP: number = 0;
    socialXP: number = 0;

    override ngOnInit(): void {
        super.ngOnInit();
        this.character$.pipe(takeUntil(this.destroy$)).subscribe(char => {
            this.name = char.name;
            this.combatXP = char.combatXP || 0;
            this.adventuringXP = char.adventuringXP || 0;
            this.socialXP = char.socialXP || 0;
        });
    }

    change() {
        let newName = this.name;
        let newCombatXP = this.combatXP;
        let newAdventuringXP = this.adventuringXP;
        let newSocialXP = this.socialXP;

        if (newName === "") {
            this._snackBar.open("Name must not be empty");
            return
        }
        if (newCombatXP < 0) {
            this._snackBar.open("combatXP cannot be negative");
            return;
        }
        if (newAdventuringXP < 0) {
            this._snackBar.open("adventuringXP cannot be negative");
            return;
        }
        if (newSocialXP < 0) {
            this._snackBar.open("socialXP cannot be negative");
            return;
        }

        this.character$.pipe(take(1)).subscribe(char => {
            this.characterStorageService.saveCharacter(produce(char, draft => {
                draft.name = newName;
                draft.combatXP = newCombatXP;
                draft.adventuringXP = newAdventuringXP;
                draft.socialXP = newSocialXP;
            }));
        });
    }
}
