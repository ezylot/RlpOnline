

export class Stats {

    readonly ST: number;
    readonly VI: number;
    readonly DE: number;
    readonly AG: number;
    readonly IN: number;
    readonly PE: number;
    readonly EM: number;

    constructor(
        readonly strength: number,
        readonly vitality: number,
        readonly dexterity: number,
        readonly agility: number,
        readonly intellect: number,
        readonly perception: number,
        readonly empathy: number
    ) {
        this.ST = strength;
        this.VI = vitality;
        this.DE = dexterity;
        this.AG = agility;
        this.IN = intellect;
        this.PE = perception;
        this.EM = empathy;
    }

    public toString() : string {
        let string = "";
        if(this.ST !== 0) string += `ST: ${this.ST}, `;
        if(this.VI !== 0) string += `VI: ${this.VI}, `;
        if(this.DE !== 0) string += `DE: ${this.DE}, `;
        if(this.AG !== 0) string += `AG: ${this.AG}, `;
        if(this.IN !== 0) string += `IN: ${this.IN}, `;
        if(this.PE !== 0) string += `PE: ${this.PE}, `;
        if(this.EM !== 0) string += `EM: ${this.EM}, `;

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
}
