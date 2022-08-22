import {Component} from '@angular/core';
import {CharacterStorageService} from "./services/character-storage.service";
import {Character} from "./classes/character";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rlp-playtest';

    constructor(private characterStorageService: CharacterStorageService,
                private router: Router) {
    }

    availableCharacters!: Observable<Character[]>;
    currentChar!: Observable<Character>;

    ngOnInit(): void {
        this.availableCharacters = this.characterStorageService.getCharacters()
        this.currentChar = this.characterStorageService.getLoadedCharacter();
    }

    loadChar(id: string) {
        this.characterStorageService.loadCharacter(id);
        this.router.navigate(["character-builder"]);
    }

    createNewChar() {
        this.characterStorageService.generateAndLoadNewCharacter();
        this.router.navigate(["character-builder"]);
    }
}
