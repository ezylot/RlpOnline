import {Component, OnDestroy, OnInit} from "@angular/core";
import {Observable, Subject, takeUntil} from "rxjs";
import {CharacterStorageService} from "../services/character-storage.service";
import {Character} from "../classes/character";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({ template: '' })
export abstract class CharacterInjectingComponent implements OnInit, OnDestroy {

    protected destroy$ = new Subject<void>();

    constructor(protected characterStorageService: CharacterStorageService,
                protected _snackBar: MatSnackBar) {
    }

    character$!: Observable<Readonly<Character>>;

    ngOnInit(): void {
        this.character$ = this.characterStorageService.getLoadedCharacter();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
