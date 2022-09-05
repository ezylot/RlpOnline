import {Component} from '@angular/core';
import {Character} from "./classes/character";
import {Observable, takeUntil} from "rxjs";
import {CharacterInjectingComponent} from "./character-builder/CharacterInjectingComponent";
import {TooltipComponent} from "@angular/material/tooltip";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {CharacterStorageService} from "./services/character-storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {delegate} from "tippy.js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends CharacterInjectingComponent {

    availableCharacters!: Observable<Character[]>;
    downloadJsonHref!: SafeUrl;
    tippyDelegateInstance: any | null = null;

    constructor(characterStorageService: CharacterStorageService,
                _snackBar: MatSnackBar,
                router: Router,
                private sanitizer: DomSanitizer) {
        super(characterStorageService, _snackBar, router);
    }


    override ngOnInit(): void {
        super.ngOnInit();
        this.availableCharacters = this.characterStorageService.getCharacters();

        this.character$.pipe(takeUntil(this.destroy$)).subscribe(char => {
            let theJSON = JSON.stringify(char);
            let uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
            this.downloadJsonHref = uri;
        });

        Object.defineProperty(TooltipComponent.prototype, 'message', {
            set(v: any) {
                const el = document.querySelectorAll('.mat-tooltip');

                if (el) {
                    el[el.length - 1].innerHTML = v;
                }
            },
        });

        this.tippyDelegateInstance = delegate('body', {
            target: '[data-tippy-content]',
            allowHTML: true,
            //theme: 'material',
        });
    }


    override ngOnDestroy() {
        super.ngOnDestroy();
        if(this.tippyDelegateInstance) this.tippyDelegateInstance.destroy();
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
