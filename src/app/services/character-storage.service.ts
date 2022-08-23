import {Injectable} from '@angular/core';
import {Character} from '../classes/character';
import {BehaviorSubject, filter, map, Observable, ReplaySubject, switchMap, take} from "rxjs";
import {Stats} from "../classes/stats";
import {PERKS} from "../data/perks";
import {PerkAndLevel} from "../classes/perk-and-level";
import {DiceAndFixed} from "../classes/dice-and-fixed";
import {RACES} from "../data/races";
import {DiceAndFixedAndLevel} from "../classes/dice-and-fixed-and-level";
import {Language} from "../classes/language";

@Injectable({
  providedIn: 'root'
})
export class CharacterStorageService {

    private loadedCharacterId: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    private allCharactersSubject: ReplaySubject<Character[]> = new ReplaySubject<Character[]>(1);
    private readonly loadedCharacterSubject: Observable<Character>;

    constructor() {
        this.loadDataInitially();
        this.loadLatest();

        this.loadedCharacterSubject = this.loadedCharacterId.pipe(
            filter(id => id !== null),
            switchMap(id => this.getCharacter(id!!)),
        );
    }

    private loadLatest() {
        this.getCharacters().pipe(take(1)).subscribe(chars => {
            if(chars.length === 0) {
                this.generateAndLoadNewCharacter();
            } else {
                let latestUpdated = chars.sort((a, b) => b.updatedTime - a.updatedTime)[0]
                this.loadCharacter(latestUpdated.id);
            }
        });
    }

    loadCharacter(id: string) {
        this.loadedCharacterId.next(id);
    }

    generateAndLoadNewCharacter() {
        let newId = Math.floor(Math.random() * Math.pow(36, 50)).toString(36);
        let now = new Date().getTime();
        let newCharacter = new Character(newId, now, now);
        this.saveCharacter(newCharacter);
        this.loadCharacter(newCharacter.id);
    }

    getLoadedCharacter(): Observable<Character> {
        return this.loadedCharacterSubject;
    }

    private getCharacter(id: string) : Observable<Character> {
        return this.getCharacters().pipe(map(storedCharacters => {
            const storedIndex = storedCharacters.findIndex(c => c.id === id);
            if (storedIndex == -1) throw new Error("Could not load character by id from storage");;
            return storedCharacters[storedIndex];
        }));
    }

    saveCharacter(character: Character) {
        this.allCharactersSubject.pipe(take(1)).subscribe((storedCharacters) => {
            const storedIndex = storedCharacters.findIndex(c => c.id === character.id);
            if(storedIndex === -1) {
                storedCharacters.push(character);
            } else {
                storedCharacters[storedIndex] = character;
            }
            window.localStorage.setItem("characters", JSON.stringify(storedCharacters));
            this.allCharactersSubject.next(storedCharacters);
        });
    }

    getCharacters() : Observable<Character[]> {
        return this.allCharactersSubject;
    }

    private loadDataInitially() {
        let parsed = JSON.parse(window.localStorage.getItem("characters") || "[]", function(key, value) {
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

            if(character.race !== null) {
                let foundRace = RACES.find(r => r.name === character.race!.name)
                if(foundRace === undefined) throw new Error("wtf??");
                character.race = foundRace;
            }

            for (let i = 0; i < character.perks.length; i++){
                const perkAndLevel = character.perks[i];
                let foundPerk = PERKS.find(p => p.name === perkAndLevel.perk.name);
                if(foundPerk === undefined) throw new Error("wtf?");
                character.perks[i] = new PerkAndLevel(perkAndLevel.level, foundPerk);
            }

            character.languagesInLearnOrder.forEach(l => Object.setPrototypeOf(l, Language.prototype));
        }

        this.allCharactersSubject.next(parsed);
    }

    importAndLoad(txt: string) {
        let characters = JSON.parse(window.localStorage.getItem("characters") || "[]");
        let character = Object.setPrototypeOf(JSON.parse(txt), Character.prototype);

        characters.push(character);
        window.localStorage.setItem("characters", JSON.stringify(characters));

        this.loadDataInitially();
    }

    delete(id: string) {

    }
}
