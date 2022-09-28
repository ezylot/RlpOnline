import {Injectable} from '@angular/core';
import {Character} from '../classes/character';
import {
    BehaviorSubject,
    combineLatest,
    map,
    Observable,
    ReplaySubject,
    shareReplay,
    Subject,
    switchMap,
    take
} from "rxjs";
import {Stats} from "../classes/stats";
import {getAllPerks} from "../data/perks";
import {PerkAndLevel} from "../classes/perk-and-level";
import {OnlyProperties} from "../definitions";
import {plainToClassFromExist} from "class-transformer";

@Injectable({
  providedIn: 'root'
})
export class CharacterStorageService {

    private readonly reloadAll$: BehaviorSubject<void>;
    private readonly currentCharacterId$ : Subject<string | undefined>;
    private readonly currentCharacter$: Observable<Character>;
    private readonly allCharacters$: Observable<Character[]>;

    constructor() {
        this.reloadAll$ = new BehaviorSubject<void>(undefined);
        this.allCharacters$ = this.initAllCharObservable();
        this.currentCharacterId$ = this.initCurrentCharacterIdObservable()

        this.currentCharacter$ = combineLatest(this.currentCharacterId$, this.allCharacters$).pipe(
            map(([currentCharacterId, allCharacters]) => {

                if(allCharacters.length == 0) {
                    return this.generateNewCharacter();
                }

                if(currentCharacterId === undefined) return allCharacters[0];

                const storedIndex = allCharacters.findIndex(c => c.id === currentCharacterId);
                if (storedIndex == -1) throw new Error("Could not load character by id from storage");
                return allCharacters[storedIndex];
            }),
            shareReplay(1)
        );
    }


    selectCharacterById(id: string) {
        this.currentCharacterId$.next(id);
    }

    getCurrentCharacter(): Observable<Character> {
        return this.currentCharacter$;
    }

    getAllCharacters() : Observable<Character[]> {
        return this.allCharacters$;
    }

    generateNewCharacter() {
        let newId = Math.floor(Math.random() * Math.pow(36, 50)).toString(36);
        let now = new Date().getTime();
        let newCharacter = new Character(newId, now, now);
        this.saveCharacter(newCharacter);
        return newCharacter;
    }

    import(txt: string) {
        let character = Object.setPrototypeOf(JSON.parse(txt), Character.prototype);
        this.saveCharacter(character);
    }


    saveCharacter(character: Character) {
        this.allCharacters$.pipe(take(1)).subscribe((storedCharacters) => {
            const storedIndex = storedCharacters.findIndex(c => c.id === character.id);
            if(storedIndex === -1) {
                storedCharacters.push(character);
            } else {
                storedCharacters[storedIndex] = character;
            }
            window.localStorage.setItem("characters", JSON.stringify(storedCharacters));
            this.reloadAll$.next();
        });
    }


    delete(id: string) {
        combineLatest(this.currentCharacterId$, this.allCharacters$)
            .pipe(take(1))
            .subscribe(([currentCharacterId, storedCharacters]) => {
                let charactersWithDeleted = storedCharacters.filter(char => char.id !== id);
                if(currentCharacterId === id) this.currentCharacterId$.next(charactersWithDeleted[0]?.id);

                window.localStorage.setItem("characters", JSON.stringify(charactersWithDeleted));
                this.reloadAll$.next();
            });
    }

    private initAllCharObservable() : Observable<Character[]> {
        return this.reloadAll$.pipe(
            switchMap(() => {
                return new Observable<Character[]>(o => {
                    let storedString = window.localStorage.getItem("characters");
                    try {
                        let parsed = JSON.parse(storedString || "[]") as OnlyProperties<Character>[];

                        let parsedAndTransformed = parsed.map(plainCharacterObject => {
                            let newChar = new Character(plainCharacterObject.id, plainCharacterObject.createdTime, plainCharacterObject.updatedTime);
                            let character = plainToClassFromExist(newChar, plainCharacterObject, { enableImplicitConversion: true });

                            let race = character.getRace();
                            if(race !== null) {
                                if(race.name === "Humans") Object.setPrototypeOf(character.additionalData.chosenStats, Stats.prototype);
                            }

                            for (let i = 0; i < character.perks.length; i++){
                                const perkAndLevel = character.perks[i];
                                let foundPerk = getAllPerks().find(p => p.name === perkAndLevel.perk.name);
                                if(foundPerk === undefined) throw new Error("wtf?");
                                character.perks[i] = new PerkAndLevel(perkAndLevel.level, foundPerk);
                            }

                            return character;
                        });

                        o.next(parsedAndTransformed);
                        o.complete();
                    } catch (error) {
                        console.error(error);
                        console.error(storedString);
                        alert("Stored saves were incompatible, probably because a new update of RLP online was released. " +
                            "Characters will be wiped. If you didnt backup your old character and you desperatly need it check " +
                            "the javascript dev console and copy the error and the savestring and send it to a RLP online " +
                            "developer. If you are done, press ok and then reload the website");
                        window.localStorage.setItem("characters", "");
                        throw error;
                    }
                })
            }),
            shareReplay(1)
        );
    }

    private initCurrentCharacterIdObservable() : Subject<string | undefined>{
        let subject = new ReplaySubject<string | undefined>(1);
        this.allCharacters$.pipe(
            take(1),
        ).subscribe(chars => {
            let latestUpdated = chars.sort((a, b) => b.updatedTime - a.updatedTime)[0]
            subject.next(latestUpdated?.id)
        });
        return subject;
    }
}
