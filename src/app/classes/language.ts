import {immerable} from "immer";

export class Language {
    [immerable] = true;

    constructor(
        readonly family: string,
        readonly name: string,
        readonly alphabet: string,
        private readonly cpCost: number,
        readonly gpCost: number
    ) {}


    getCpCost(knownLanguagesWhenLearning: Language[]) {
        if(this.alphabet === "Shadim") {
            knownLanguagesWhenLearning = knownLanguagesWhenLearning.filter(l => l.alphabet !== "Shadim (Simplified)")
        }

        let helpfulLanguages = knownLanguagesWhenLearning.filter(lang => {
            return (
                lang.family === this.family
                || lang.alphabet === this.alphabet
            ) && lang.name !== this.name;
        });

        return Math.ceil(this.cpCost * (helpfulLanguages.length >= 2 ? 0.5 : helpfulLanguages.length == 1 ? 0.75 : 1));
    }
}
