import {Component, OnDestroy, OnInit} from '@angular/core';
import {CharacterStorageService} from "../../services/character-storage.service";
import {Observable, Subject, take, takeUntil} from "rxjs";
import {Character} from "../../classes/character";
import {PERKS} from "../../data/perks";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PerkAndLevel} from "../../classes/perk-and-level";
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";

@Component({
    selector: 'app-perks',
    templateUrl: './perks.component.html',
    styleUrls: ['./perks.component.scss']
})
export class PerksComponent extends CharacterInjectingComponent {

    openCharacterPoints!: number;
    totalCharacterPoints!: number;
    ownedPerks!: PerkAndLevel[];
    availablePerks!: PerkAndLevel[];
    searchString = "";

    perkByName(index: number, pal: PerkAndLevel) {
        return pal.perk.name;
    };

    override ngOnInit(): void {
        super.ngOnInit();

        this.character$.pipe(takeUntil(this.destroy$)).subscribe(char => {
            let remainingCP = this.totalCharacterPoints = char.getTotalCP();
            for (let pal of char.perks) {
                for (let i = 1; i <= pal.level; i++) {
                    remainingCP -= pal.perk.getCpCostForLevel(i, char.perks);
                }
            }

            this.openCharacterPoints = remainingCP;
            this.ownedPerks = char.perks;

            this.availablePerks = PERKS.map(p => {
                let found = this.ownedPerks.find(x => x.perk.name == p.name);
                return new PerkAndLevel((found?.level ?? 0) + 1, p)
            })

            if(char.combatXP == 0 && char.adventuringXP == 0 && char.socialXP == 0) {
                // At the start we can only upgrade skills for the first level, not any others
                this.availablePerks = this.availablePerks.filter(p => p.level === 1 &&  p.perk.startingLevel === 0);
            }
        });
    }

    filtered(list: PerkAndLevel[]) {
        if (!!this.searchString) {
            return list.filter(p => {
                return p.perk.name.toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1
                    || p.perk.description.toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1;
            })
        }
        return list;
    }

    selectPerk(selectedPal: PerkAndLevel) {
        this.character$.pipe(take(1)).subscribe(char => {
            let perks = Array.from(char.perks);

            if(selectedPal.perk.getCpCostForLevel(selectedPal.level, perks) > this.openCharacterPoints) {
                this._snackBar.open("Perk is too expensive", "Warning");
                return;
            }

            let existingIndex = perks.findIndex(pal => pal.perk.name == selectedPal.perk.name)
            if(existingIndex === -1) {
                perks.push(new PerkAndLevel(selectedPal.level, selectedPal.perk));
            } else {
                perks[existingIndex] = new PerkAndLevel(selectedPal.level, perks[existingIndex].perk);
            }

            this.characterStorageService.saveCharacter(Object.setPrototypeOf({ ...char, perks}, Character.prototype));
        });
    }

    deSelectPerk(selectedPal: PerkAndLevel) {
        this.character$.pipe(take(1)).subscribe(char => {
            let perks = Array.from(char.perks);
            let existingIndex = perks.findIndex(pal => pal.perk.name == selectedPal.perk.name)
            if(existingIndex === -1) { throw new Error("Deselected a perk the user doesnt have"); }

            if(perks[existingIndex].level == 1) {
                perks.splice(existingIndex, 1);
            } else {
                perks[existingIndex] = new PerkAndLevel(selectedPal.level - 1, perks[existingIndex].perk);
            }

            this.characterStorageService.saveCharacter(Object.setPrototypeOf({ ...char, perks}, Character.prototype));
        });
    }

    search($event: Event) {
        if($event.target as HTMLInputElement) {
            this.searchString = ($event.target as HTMLInputElement).value;
        }
    }
}
