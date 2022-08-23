import {Component} from '@angular/core';
import {take, takeUntil} from "rxjs";
import {Character} from "../../classes/character";
import {PERKS} from "../../data/perks";
import {PerkAndLevel} from "../../classes/perk-and-level";
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";
import {PerkCategory} from "../../classes/perk";

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
    hideTooExpensive: boolean = false;

    perkByName(index: number, pal: PerkAndLevel) {
        return pal.perk.name;
    };

    override ngOnInit(): void {
        super.ngOnInit();

        let filter = PerkCategory.BASE;
        if(this.router.url.endsWith("martial-perks")) filter = PerkCategory.MARTIAL;
        if(this.router.url.endsWith("magical-perks")) filter = PerkCategory.MAGIC;
        if(this.router.url.endsWith("skill-perks")) filter = PerkCategory.SKILL;

        this.character$.pipe(takeUntil(this.destroy$)).subscribe(char => {
            this.totalCharacterPoints = char.getTotalCP();
            this.openCharacterPoints = char.getRemainingCP();
            this.ownedPerks = char.perks.filter(p => p.perk.internalCategory === filter);

            this.availablePerks = PERKS
                .filter(p => p.internalCategory === filter)
                .map(p => {
                    let found = this.ownedPerks.find(x => x.perk.name == p.name);
                    return new PerkAndLevel((found?.level ?? 0) + 1, p)
                })
               .filter(pal => pal.perk.getCpCostForLevel(pal.level, this.ownedPerks) > 0);

            if(char.combatXP == 0 && char.adventuringXP == 0 && char.socialXP == 0) {
                // At the start we can only upgrade skills for the first level, not any others
                this.availablePerks = this.availablePerks
                    .filter(p => this.ownedPerks.findIndex(owned => owned.perk.groupName == p.perk.groupName) === -1)
                    .filter(p => p.level === 1 &&  p.perk.startingLevel === 0);
            }
        });
    }

    filtered(list: PerkAndLevel[], hideTooExpensive: boolean) {
        let returnList = list;

        if (!!this.searchString) {
            returnList =  returnList.filter(p => {
                return p.perk.name.toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1
                    || p.perk.description.toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1;
            })
        }

        if(hideTooExpensive) {
            returnList = returnList.filter(pal => pal.perk.getCpCostForLevel(pal.level, this.ownedPerks) < this.openCharacterPoints);
        }

        return returnList;
    }

    selectPerk(selectedPal: PerkAndLevel) {
        this.character$.pipe(take(1)).subscribe(char => {
            let perks = Array.from(char.perks);

            if(selectedPal.perk.requirements.length > 0) {

                for (const neededPerk of selectedPal.perk.requirements) {
                    let perk = perks.find(pal => pal.perk.name == neededPerk.perkname);
                    if (perk === undefined) {
                        this._snackBar.open(`You do not have the requirement: ${neededPerk.perkname} on level ${neededPerk.level}`);
                        return;
                    }
                    if(perk.level < neededPerk.level) {
                        this._snackBar.open(`Your perk ${neededPerk.perkname} needs to have level ${neededPerk.level}`);
                        return;
                    }
                }
            }

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

    deselectPerk(selectedPal: PerkAndLevel) {
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
