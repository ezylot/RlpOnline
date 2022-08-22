import {Component} from '@angular/core';
import {Character} from "../../classes/character";
import {take, takeUntil} from "rxjs";
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";

@Component({
    selector: 'app-name-selector',
    templateUrl: './name-selector.component.html',
    styleUrls: ['./name-selector.component.scss']
})
export class NameSelectorComponent extends CharacterInjectingComponent{

    name: string = "";
    combatXP: number = 0;
    adventuringXP: number = 0;
    socialXP: number = 0;

    override ngOnInit(): void {
        super.ngOnInit();
        this.character$.pipe(takeUntil(this.destroy$)).subscribe(char => {
            this.name = char.name;
            this.combatXP = char.combatXP;
            this.adventuringXP = char.adventuringXP;
            this.socialXP = char.socialXP;
        });
    }

    change() {
        let newName = this.name;
        let newCombatXP = this.combatXP;
        let newAdventuringXP = this.adventuringXP;
        let newSocialXP = this.socialXP;

        this.character$.pipe(take(1)).subscribe(char => {
            let charCopy = Object.setPrototypeOf({
                ...char,
                name: newName,
                combatXP: newCombatXP,
                adventuringXP: newAdventuringXP,
                socialXP: newSocialXP,
            }, Character.prototype);

            if (charCopy.name === "") {
                this._snackBar.open("Name must not be empty");
                return
            }
            if (charCopy.combatXP < 0) {
                this._snackBar.open("combatXP cannot be negative");
                return;
            }
            if (charCopy.adventuringXP < 0) {
                this._snackBar.open("adventuringXP cannot be negative");
                return;
            }
            if (charCopy.socialXP < 0) {
                this._snackBar.open("socialXP cannot be negative");
                return;
            }
            this.characterStorageService.saveCharacter(charCopy);
        });
    }
}
