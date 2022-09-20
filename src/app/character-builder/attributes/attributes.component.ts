import {Component} from '@angular/core';
import {Stats} from "../../classes/stats";
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
import {Mutable, OnlyProperties} from "../../definitions";
import produce from "immer";
import {standardArray} from "../../data/stats";

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

    stats: Stats = standardArray();

    override ngOnInit(): void {
        super.ngOnInit();
        this.character$.pipe(takeUntil(this.destroy$)).subscribe(char => this.stats = char.stats);
    }

    drop($event: CdkDragDrop<string[]>) {
        this.character$.pipe(take(1)).subscribe(char => {
            let chosenOrder = this.stats.toStatNumberArray();
            moveItemInArray(chosenOrder, $event.previousIndex, $event.currentIndex);
            this.stats = Stats.fromArray(chosenOrder);

            this.characterStorageService.saveCharacter(produce(char, charToEdit => {
                charToEdit.stats = this.stats;
            }));
        });
    }

    // Increase and Decrease for humans
    decreaseStat(statName: keyof OnlyProperties<Stats>) {
        this.character$.pipe(take(1)).subscribe(char => {
            let newStats = char.additionalData.chosenStats as OnlyProperties<Mutable<Stats>>;
            if(newStats[statName] <= 0) {
                this._snackBar.open("Cant decrease stats to negative values.");
                return;
            }

            this.characterStorageService.saveCharacter(produce(char, charToEdit => {
                charToEdit.additionalData.chosenStats[statName] -= 1;
            }));
        });
    }

    increaseStat(statName: keyof OnlyProperties<Stats>) {
        this.character$.pipe(take(1)).subscribe(char => {
            if(char.additionalData.chosenStats.summ() >= 2) {
                this._snackBar.open("You can only spend 2 stat increases as a human.");
                return;
            }

            this.characterStorageService.saveCharacter(produce(char, charToEdit => {
                charToEdit.additionalData.chosenStats[statName] += 1;
            }));
        });
    }
}
