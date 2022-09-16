import {Injectable} from '@angular/core';
import {Character, CharacterCaches} from '../classes/character';
import {
    BehaviorSubject,
    combineLatest,
    filter,
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
import {DiceAndFixed} from "../classes/dice-and-fixed";
import {getAllRaces} from "../data/races";
import {DiceAndFixedAndLevel} from "../classes/dice-and-fixed-and-level";
import {Language} from "../classes/language";

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
                    let newChar = this.generateNewCharacter();
                    console.log("Creating new character", newChar.id);
                    this.saveCharacter(newChar);
                    return newChar;
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
        return new Character(newId, now, now);
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
                        let parsed = JSON.parse(storedString || "[]", function(key, value) {
                            if(key == "baseModifier") return Object.setPrototypeOf(value, DiceAndFixed.prototype);
                            if(key == "combatModifier") return Object.setPrototypeOf(value, DiceAndFixed.prototype);
                            if(key == "adventuringModifier") return Object.setPrototypeOf(value, DiceAndFixed.prototype);
                            if(key == "socialModifier") return Object.setPrototypeOf(value, DiceAndFixed.prototype);

                            return value;
                        }) as Character[];

                        for (let character of parsed) {
                            Object.setPrototypeOf(character, Character.prototype);
                            Object.setPrototypeOf(character.stats, Stats.prototype);

                            Object.setPrototypeOf(character.maxHealth, DiceAndFixed.prototype);
                            Object.setPrototypeOf(character.healthRegenBonus, DiceAndFixed.prototype);
                            Object.setPrototypeOf(character.maxStamina, DiceAndFixed.prototype);
                            Object.setPrototypeOf(character.staminaRegenBonus, DiceAndFixed.prototype);
                            Object.setPrototypeOf(character.maxMana, DiceAndFixed.prototype);
                            Object.setPrototypeOf(character.manaRegenBonus, DiceAndFixed.prototype);
                            Object.setPrototypeOf(character.dodgeModifier, DiceAndFixedAndLevel.prototype);
                            Object.setPrototypeOf(character.noticeModifier, DiceAndFixedAndLevel.prototype);
                            Object.setPrototypeOf(character.willpowerModifier, DiceAndFixedAndLevel.prototype);

                            character.caches = new CharacterCaches();

                            let race = character.getRace();
                            if(race !== null) {
                                let foundRace = getAllRaces().find(r => r.name === race!.name)
                                if(foundRace === undefined) throw new Error("wtf??");
                                race = foundRace;

                                if(foundRace.name === "Humans") Object.setPrototypeOf(character.additionalData.chosenStats, Stats.prototype);
                            }

                            for (let i = 0; i < character.perks.length; i++){
                                const perkAndLevel = character.perks[i];
                                let foundPerk = getAllPerks().find(p => p.name === perkAndLevel.perk.name);
                                if(foundPerk === undefined) throw new Error("wtf?");
                                character.perks[i] = new PerkAndLevel(perkAndLevel.level, foundPerk);
                            }

                            character.languagesInLearnOrder.forEach(l => Object.setPrototypeOf(l, Language.prototype));
                        }

                        o.next(parsed);
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
