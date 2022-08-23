import {Component} from '@angular/core';
import {CharacterStorageService} from "./services/character-storage.service";
import {Character} from "./classes/character";
import {Observable} from "rxjs";
import {CharacterInjectingComponent} from "./character-builder/CharacterInjectingComponent";
import {TooltipComponent} from "@angular/material/tooltip";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends CharacterInjectingComponent {

    availableCharacters!: Observable<Character[]>;

    override ngOnInit(): void {
        super.ngOnInit();
        this.availableCharacters = this.characterStorageService.getCharacters();

        Object.defineProperty(TooltipComponent.prototype, 'message', {
            set(v: any) {
                const el = document.querySelectorAll('.mat-tooltip');

                if (el) {
                    el[el.length - 1].innerHTML = v;
                }
            },
        });
    }

    loadChar(id: string) {
        this.characterStorageService.loadCharacter(id);
        this.router.navigate(["character-builder"]);
    }

    createNewChar() {
        this.characterStorageService.generateAndLoadNewCharacter();
        this.router.navigate(["character-builder"]);
    }

    deleteCharacter(character: Character) {
        let result = confirm("You really want to delete this character?");
        if(result) {
            this.characterStorageService.delete(character.id);
        }
    }

    uploadFile(event$: any) {
        event$.target.files.item(0)?.text().then((txt: string) => this.characterStorageService.importAndLoad(txt));
    }
}
