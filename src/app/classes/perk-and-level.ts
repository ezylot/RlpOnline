import {Perk} from "./perk";

export class PerkAndLevel {
    constructor(public readonly level: number, public readonly perk: Perk) {
    }

    public romanize () : string {
        let digits = String(+this.level).split("");
        let key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                "","I","II","III","IV","V","VI","VII","VIII","IX"];

        let roman = ""
        let i = 3;
        while (i--) {
            roman = (key[+(digits.pop() || '') + (i * 10)] || "") + roman;
        }

        return Array(+digits.join("") + 1).join("M") + roman;
    }
}
