import {Component} from '@angular/core';
import {Character} from "../../classes/character";
import {take, takeUntil} from "rxjs";
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";
import {ADVENTURING_TEXT, COMBATLEVEL_TEXT, SOCIALLEVEL_TEXT} from "../../data/texts";
import {cloneDeep} from "lodash-es";

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

        this.character$.pipe(take(1)).subscribe(char => {
            let charToEdit = cloneDeep(char) as Character;

            charToEdit.name = newName;
            charToEdit.combatXP = newCombatXP;
            charToEdit.adventuringXP = newAdventuringXP;
            charToEdit.socialXP = newSocialXP;

            if (charToEdit.name === "") {
                this._snackBar.open("Name must not be empty");
                return
            }
            if (charToEdit.combatXP < 0) {
                this._snackBar.open("combatXP cannot be negative");
                return;
            }
            if (charToEdit.adventuringXP < 0) {
                this._snackBar.open("adventuringXP cannot be negative");
                return;
            }
            if (charToEdit.socialXP < 0) {
                this._snackBar.open("socialXP cannot be negative");
                return;
            }

            this.characterStorageService.saveCharacter(charToEdit);
        });
    }
}
