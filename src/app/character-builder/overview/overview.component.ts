import {Component} from '@angular/core';
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";
import {DomSanitizer} from "@angular/platform-browser";
import {CharacterStorageService} from "../../services/character-storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {takeUntil} from "rxjs";
import {
    ADVENTURING_TEXT,
    AGILITY_TEXT,
    COMBATLEVEL_TEXT,
    DEXTERITY_TEXT,
    DODGE_TEXT,
    EMPATHY_TEXT,
    HEALTH_RECOVER_TEXT,
    HEALTH_TEXT,
    INTELLECT_TEXT,
    MANA_RECOVER_TEXT,
    MANA_TEXT,
    NOTICE_TEXT,
    PERCEPTION_TEXT,
    SOCIALLEVEL_TEXT,
    STAMINA_RECOVER_TEXT,
    STAMINA_TEXT,
    STRENGTH_TEXT,
    VITALITY_TEXT,
    WILLPOWER_TEXT
} from "../../data/texts";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent extends CharacterInjectingComponent {

    _COMBATLEVEL_TEXT = COMBATLEVEL_TEXT;
    _ADVENTURING_TEXT = ADVENTURING_TEXT;
    _SOCIALLEVEL_TEXT = SOCIALLEVEL_TEXT;

    _STRENGTH_TEXT = STRENGTH_TEXT;
    _VITALITY_TEXT = VITALITY_TEXT;
    _DEXTERITY_TEXT = DEXTERITY_TEXT;
    _AGILITY_TEXT = AGILITY_TEXT;
    _INTELLECT_TEXT = INTELLECT_TEXT;
    _PERCEPTION_TEXT = PERCEPTION_TEXT;
    _EMPATHY_TEXT = EMPATHY_TEXT;

    _HEALTH_TEXT = HEALTH_TEXT;
    _STAMINA_TEXT = STAMINA_TEXT;
    _MANA_TEXT = MANA_TEXT;
    _HEALTH_RECOVER_TEXT = HEALTH_RECOVER_TEXT;
    _STAMINA_RECOVER_TEXT = STAMINA_RECOVER_TEXT;
    _MANA_RECOVER_TEXT = MANA_RECOVER_TEXT;

    _DODGE_TEXT = DODGE_TEXT;
    _NOTICE_TEXT = NOTICE_TEXT;
    _WILLPOWER_TEXT = WILLPOWER_TEXT;

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
