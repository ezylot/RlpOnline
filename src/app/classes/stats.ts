

export class Stats {

    constructor(
        readonly strength: number,
        readonly vitality: number,
        readonly dexterity: number,
        readonly agility: number,
        readonly intellect: number,
        readonly perception: number,
        readonly empathy: number
    ) { }

    public toString() : string {
        let string = "";
        if(this.strength !== 0) string += `ST: ${this.strength}, `;
        if(this.vitality !== 0) string += `VI: ${this.vitality}, `;
        if(this.dexterity !== 0) string += `DE: ${this.dexterity}, `;
        if(this.agility !== 0) string += `AG: ${this.agility}, `;
        if(this.intellect !== 0) string += `IN: ${this.intellect}, `;
        if(this.perception !== 0) string += `PE: ${this.perception}, `;
        if(this.empathy !== 0) string += `EM: ${this.empathy}, `;

        if(string.length > 0) string = string.substring(0, string.length - 2);
        return string;
    }

    public toStatNumberArray(): number[] {
        return [
            this.strength,
            this.vitality,
            this.dexterity,
            this.agility,
            this.intellect,
            this.perception,
            this.empathy,
        ];
    }

    public static fromArray(array: number[]) : Stats {
        return new Stats(
            array[0],
            array[1],
            array[2],
            array[3],
            array[4],
            array[5],
            array[6],
        )
    }

    public summ(): number {
        return this.toStatNumberArray().reduce((a,b) => a + b, 0);
    }
}
