import {Component} from '@angular/core';
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";
import {Character} from "../../classes/character";
import {DomSanitizer} from "@angular/platform-browser";
import {CharacterStorageService} from "../../services/character-storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent extends CharacterInjectingComponent {

    constructor(characterStorageService: CharacterStorageService,
                _snackBar: MatSnackBar,
                router: Router,
                private sanitizer: DomSanitizer) {
        super(characterStorageService, _snackBar, router);
    }

    downloadJsonHref: any;
    override ngOnInit() {
        super.ngOnInit();

        this.character$.pipe(takeUntil(this.destroy$)).subscribe(char => {
            let theJSON = JSON.stringify(char);
            let uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
            this.downloadJsonHref = uri;
        });
    }
}
