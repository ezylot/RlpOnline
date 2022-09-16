import {Component} from '@angular/core';
import {Character} from "../../classes/character";
import {Stats} from "../../classes/stats";
import {STANDARD_ARRAY} from "../../data/stats";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";
import {take, takeUntil} from "rxjs";
import {
    AGILITY_TEXT,
    CONDITIONAL_STAT_TEXT,
    DEXTERITY_TEXT,
    EMPATHY_TEXT,
    INTELLECT_TEXT,
    PERCEPTION_TEXT,
    STRENGTH_TEXT,
    VITALITY_TEXT,
} from "../../data/texts";
import {cloneDeep} from "lodash-es";
import {Mutable, OnlyProperties} from "../../definitions";

@Component({
    selector: 'app-attributes',
    templateUrl: './attributes.component.html',
    styleUrls: ['./attributes.component.scss']
})
export class AttributesComponent extends CharacterInjectingComponent{

    _STRENGTH_TEXT = STRENGTH_TEXT;
    _VITALITY_TEXT = VITALITY_TEXT;
    _DEXTERITY_TEXT = DEXTERITY_TEXT;
    _AGILITY_TEXT = AGILITY_TEXT;
    _INTELLECT_TEXT = INTELLECT_TEXT;
    _PERCEPTION_TEXT = PERCEPTION_TEXT;
    _EMPATHY_TEXT = EMPATHY_TEXT;
    conditionalStatsWarning = CONDITIONAL_STAT_TEXT;

    //TODO: add human column to distribute attributes
    stats: Stats = STANDARD_ARRAY;

    override ngOnInit(): void {
        super.ngOnInit();
        this.character$.pipe(takeUntil(this.destroy$)).subscribe(char => this.stats = char.stats);
    }

    drop($event: CdkDragDrop<string[]>) {
        this.character$.pipe(take(1)).subscribe(char => {
            let charToEdit = cloneDeep(char) as Character;
            let chosenOrder = this.stats.toStatNumberArray();

            moveItemInArray(chosenOrder, $event.previousIndex, $event.currentIndex);

            this.stats = Stats.fromArray(chosenOrder);
            charToEdit.stats = this.stats;
            this.characterStorageService.saveCharacter(charToEdit);
        });

    }

    // Increase and Decrease for humans
    decreaseStat(statName: keyof OnlyProperties<Stats>) {
        this.character$.pipe(take(1)).subscribe(char => {
            let charToEdit = cloneDeep(char) as Character;
            let newStats = charToEdit.additionalData.chosenStats as OnlyProperties<Mutable<Stats>>;
            if(newStats[statName] <= 0) {
                this._snackBar.open("Cant decrease stats to negative values.");
                return;
            }
            newStats[statName] -= 1;

            charToEdit.additionalData.chosenStats = newStats;
            this.characterStorageService.saveCharacter(charToEdit);
        });
    }

    increaseStat(statName: keyof OnlyProperties<Stats>) {
        this.character$.pipe(take(1)).subscribe(char => {
            if(char.additionalData.chosenStats.summ() >= 2) {
                this._snackBar.open("You can only spend 2 stat increases as a human.");
                return;
            }

            let charToEdit = cloneDeep(char) as Character;
            let newStats = charToEdit.additionalData.chosenStats as OnlyProperties<Mutable<Stats>>;

            newStats[statName] += 1;

            charToEdit.additionalData.chosenStats = newStats;
            this.characterStorageService.saveCharacter(charToEdit);
        });
    }
}
