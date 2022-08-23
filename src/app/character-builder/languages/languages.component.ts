import {Component} from '@angular/core';
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";
import {take, takeUntil} from "rxjs";
import {Character} from "../../classes/character";
import {Language} from "../../classes/language";
import {LANGUAGES} from "../../data/languages";

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent extends CharacterInjectingComponent {

    openCharacterPoints!: number;
    totalCharacterPoints!: number;
    ownedLanguages!: Language[];
    availableLanguages!: Language[];
    searchString = "";
    hideTooExpensive: boolean = false;

    languageByName(index: number, language: Language) {
        return language.name;
    };

    override ngOnInit(): void {
        super.ngOnInit();
        this.character$.pipe(takeUntil(this.destroy$)).subscribe(char => {
            this.totalCharacterPoints = char.getTotalCP();
            this.openCharacterPoints = char.getRemainingCP();
            this.ownedLanguages = char.languagesInLearnOrder;
            let ownedLanguageNames = this.ownedLanguages.map(l => l.name);
            this.availableLanguages = LANGUAGES.filter(x => !ownedLanguageNames.includes(x.name));
        });
    }

    filtered(list: Language[], hideTooExpensive: boolean) {
        let returnList = list;

        if(hideTooExpensive) {
            returnList = returnList.filter(lang => lang.getCpCost(this.ownedLanguages) < this.openCharacterPoints);
        }

        if (!!this.searchString) {
            returnList = returnList.filter(l => {
                return l.name.toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1
                    || l.family.toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1
                    || l.alphabet.toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1;
            })
        }
        return returnList;
    }

    selectLanguage(selectedLanguage: Language) {
        this.character$.pipe(take(1)).subscribe(char => {
            let languages = Array.from(char.languagesInLearnOrder);

            if(selectedLanguage.getCpCost(languages) > this.openCharacterPoints) {
                this._snackBar.open("Language is too expensive", "Warning");
                return;
            }

            languages.push(selectedLanguage);
            this.characterStorageService.saveCharacter(Object.setPrototypeOf({ ...char, languagesInLearnOrder: languages}, Character.prototype));
        });
    }

    deselectLanguage(selectedLanguage: Language) {
        this.character$.pipe(take(1)).subscribe(char => {
            let languages = Array.from(char.languagesInLearnOrder);

            let existingIndex = languages.findIndex(l => l.name == selectedLanguage.name);
            if(existingIndex === -1) { throw new Error("Deselected a language the user doesnt have"); }

            languages.splice(existingIndex, 1)
            this.characterStorageService.saveCharacter(Object.setPrototypeOf({ ...char, languagesInLearnOrder: languages}, Character.prototype));
        });
    }

    search($event: Event) {
        if($event.target as HTMLInputElement) {
            this.searchString = ($event.target as HTMLInputElement).value;
        }
    }
}
