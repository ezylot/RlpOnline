import {Component, OnDestroy, OnInit} from "@angular/core";
import {Observable, Subject, takeUntil} from "rxjs";
import {CharacterStorageService} from "../services/character-storage.service";
import {Character} from "../classes/character";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({ template: '' })
export abstract class CharacterInjectingComponent implements OnInit, OnDestroy {

    protected destroy$ = new Subject<void>();

    constructor(protected characterStorageService: CharacterStorageService,
                protected _snackBar: MatSnackBar,
                protected router: Router) {
    }

    character$!: Observable<Readonly<Character>>;

    ngOnInit(): void {
        this.character$ = this.characterStorageService.getCurrentCharacter();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
