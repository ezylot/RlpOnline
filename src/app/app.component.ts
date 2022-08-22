import {Component} from '@angular/core';
import {CharacterStorageService} from "./services/character-storage.service";
import {Character} from "./classes/character";
import {Observable} from "rxjs";
import {CharacterInjectingComponent} from "./character-builder/CharacterInjectingComponent";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends CharacterInjectingComponent {

    availableCharacters!: Observable<Character[]>;

    override ngOnInit(): void {
        super.ngOnInit();
        this.availableCharacters = this.characterStorageService.getCharacters()
    }

    loadChar(id: string) {
        this.characterStorageService.loadCharacter(id);
        this.router.navigate(["character-builder"]);
    }

    createNewChar() {
        this.characterStorageService.generateAndLoadNewCharacter();
        this.router.navigate(["character-builder"]);
    }

    uploadFile(event$: any) {
        event$.target.files.item(0)?.text().then((txt: string) => this.characterStorageService.importAndLoad(txt));
    }
}
