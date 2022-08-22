import {Perk} from "../classes/perk";
import {Character} from "../classes/character";
import {PerkAndLevel} from "../classes/perk-and-level";
import {DiceAndFixed} from "../classes/dice-and-fixed";
import {Stats} from "../classes/stats";
import {DiceAndFixedAndLevel} from "../classes/dice-and-fixed-and-level";

/*

{
    name: "",
    requirements: "",
    tags: [""],
    description: "",
    startingLevel: 0,
    additionalData: null,
    getCpCostForLevel: function (level: number) : number { return 0; },
}
 */

export const PERKS: Perk[] = [
    {
        name: "Increase Health",
        requirements: "",
        tags: ["Passive", "Repeatable"],
        description: "You increase your Health by 1D6 + Vitality. Each time you gain a higher Rank for this perk, your\n" +
            "Health is increased again.\n" +
            "Rank Progression: Cost = Current Perk Rank * 50 + Cost of previous Rank",
        startingLevel: 0,
        priority: 100,
        additionalData: null,
        getCpCostForLevel: level => summTo(level) * 50,
        applyEffect(character: Readonly<Character>, level) {

            let charToEdit = { ...character } as Character;
            Object.setPrototypeOf(charToEdit, Character.prototype)

            let maxHealth = charToEdit.maxHealth;
            let vitality = charToEdit.getFinalStats().vitality;

            let enhancePoolPerk = charToEdit.perks.find(pal => pal.perk.name == "Enhance Pool: Health")
            if(enhancePoolPerk == undefined) {
                maxHealth = maxHealth.increaseDice(level, 6);
            } else {
                maxHealth = maxHealth.increaseDice(level, 6 + 2 * enhancePoolPerk.level);
            }

            maxHealth = maxHealth.increaseFixed(vitality * level);
            charToEdit.maxHealth = maxHealth;
            return charToEdit;
        }
    },
    {
        name: "Increase Stamina",
        requirements: "",
        tags: ["Passive", "Repeatable"],
        description: "You increase your Stamina by 1D6 + Strength. Each time you gain a higher Rank for this perk, your\n" +
            "Stamina is increased again.\n" +
            "Rank Progression: Cost = Current Perk Rank * 50 + Cost of previous Rank",
        startingLevel: 0,
        priority: 100,
        additionalData: null,
        getCpCostForLevel: level => summTo(level) * 50,
        applyEffect(character: Readonly<Character>, level) {
            let charToEdit = { ...character } as Character;
            Object.setPrototypeOf(charToEdit, Character.prototype)

            let maxStamina = charToEdit.maxStamina;
            let strength = charToEdit.getFinalStats().strength;

            let enhancePoolPerk = charToEdit.perks.find(pal => pal.perk.name == "Enhance Pool: Stamina")
            if(enhancePoolPerk == undefined) {
                maxStamina = maxStamina.increaseDice(level, 6);
            } else {
                maxStamina = maxStamina.increaseDice(level, 6 + 2 * enhancePoolPerk.level);
            }

            maxStamina = maxStamina.increaseFixed(strength * level);
            charToEdit.maxStamina = maxStamina;
            return charToEdit;
        }
    },
    {
        name: "Increase Mana",
        requirements: "",
        tags: ["Passive", "Repeatable"],
        description: "You increase your Mana by 1D6 + Intellect. Each time you gain a higher Rank for this perk, your\n" +
            "Mana is increased again.\n" +
            "Rank Progression: Cost = Current Perk Rank * 50 + Cost of previous Rank",
        startingLevel: 0,
        priority: 100,
        additionalData: null,
        getCpCostForLevel: level => summTo(level) * 50,
        applyEffect(character: Readonly<Character>, level) {
            let charToEdit = { ...character } as Character;
            Object.setPrototypeOf(charToEdit, Character.prototype)

            let maxMana = charToEdit.maxMana;
            let intellect = charToEdit.getFinalStats().intellect;

            let enhancePoolPerk = charToEdit.perks.find(pal => pal.perk.name == "Enhance Pool: Mana")
            if(enhancePoolPerk == undefined) {
                maxMana = maxMana.increaseDice(level, 6);
            } else {
                maxMana = maxMana.increaseDice(level, 6 + 2 * enhancePoolPerk.level);
            }

            maxMana = maxMana.increaseFixed(intellect * level);
            charToEdit.maxMana = maxMana;
            return charToEdit;
        }
    },

    ...[
        "Health",
        "Stamina",
        "Mana",
    ].map((stat : string) : Perk => ({
        name: "Enhance Pool: " + stat,
        requirements: "",
        tags: ["Passive", "Repeatable"],
        description: "Choose a pool value. Whenever you gain a rank in the ”Increase” Perk for that pool value (In-\n" +
            "crease Health, Increase Stamina or Increase Mana), the amount of points you gain is increased\n" +
            "by one die size (from 1d6 to 1d8 to 1d10 to a maximum of 1d12). Don’t re-roll previous ranks\n" +
            "of the ”Increase” Perk for that pool value. Instead, you gain 1 point for each rank of ”Increase”\n" +
            "you already have for that pool value. Additionally, your regeneration factor is increased by 1 (for\n" +
            "Mana, you roll twice, thrice or four times per hour respectively).\n" +
            "Whenever you gain another rank of this perk, you choose the pool value to enhance. No one pool\n" +
            "value can be enhanced more than 3 times",
        startingLevel: 0,
        priority: 80,
        additionalData: null,
        getCpCostForLevel: (level, allPerks) => {
            let alreadyLevel = allPerks
                .filter(value => value.perk.name.startsWith("Enhance Pool"))
                .filter(value => !value.perk.name.endsWith(stat))
                .map(value => value.level)
                .reduce((a,b) => a+b, 0);

            return [
                500,
                2500,
                5000,
                7500,
                10000
            ][level + alreadyLevel - 1];
        },
        applyEffect(character: Readonly<Character>, level) {
            let charToEdit = { ...character } as Character;
            Object.setPrototypeOf(charToEdit, Character.prototype)

            // Dice increase is done in the correct Increase Perk
            switch(stat) {
                case "Health":
                    charToEdit.healthRegenBonus = new DiceAndFixed(charToEdit.healthRegenBonus.fixedNumber + level, charToEdit.healthRegenBonus.dices);
                    break;
                case "Stamina":
                    charToEdit.staminaRegenBonus = new DiceAndFixed(charToEdit.staminaRegenBonus.fixedNumber + level, charToEdit.staminaRegenBonus.dices);
                    break;
                case "Mana":
                    charToEdit.manaRegenBonus = new DiceAndFixed(charToEdit.manaRegenBonus.fixedNumber + level, charToEdit.manaRegenBonus.dices);
                    break;
            }
            return charToEdit;
        }
    })),

    ...[
        "Strength",
        "Vitality",
        "Dexterity",
        "Agility",
        "Intellect",
        "Perception",
        "Empathy",
    ].map((stat : string) : Perk => ({
        name: "Increase Attribute: " + stat,
        requirements: "",
        tags: ["Passive", "Repeatable"],
        description: "You increase one of your Attribute value by one, to a maximum of 12.\n" +
            "If you increase Strength, Intellect or Vitality, your Stamina, Mana or Health also increase by 1, plus\n" +
            "1 for each rank of Increase Stamina, Increase Mana or Increase Health you have. Each time you\n" +
            "gain a higher rank for this perk, you increase an Attribute value by one point, to a maximum of 12.",
        startingLevel: 0,
        priority: 30,
        additionalData: null,
        getCpCostForLevel: (level, allPerks) => {
            let alreadyLevel = allPerks
                .filter(value => value.perk.name.startsWith("Increase Attribute"))
                .filter(value => !value.perk.name.endsWith(stat))
                .map(value => value.level)
                .reduce((a,b) => a+b, 0);

            return [
                100,
                250,
                500,
                750,
                1000,
                2500,
                5000,
                7500,
                10000,
                25000,
                75000,
            ][level + alreadyLevel - 1];
        },
        applyEffect(character: Readonly<Character>, level) {
            let charToEdit = { ...character } as Character;
            Object.setPrototypeOf(charToEdit, Character.prototype);


            let newStats = { ...charToEdit.stats };
            type statkey = keyof typeof newStats;

            newStats[stat as statkey] = charToEdit.stats[stat as statkey] + level;

            charToEdit.stats = Object.setPrototypeOf(newStats, Stats.prototype);
            return charToEdit;
        }
    })),
    {
        name: "Alert",
        requirements: "",
        tags: ["Passive", "Repeatable"],
        description: "You have honed your senses and gained increased reflexes. You add your level to Notice",
        startingLevel: 0,
        priority: 100,
        additionalData: null,
        getCpCostForLevel: level => [200, 800, 4500, 12500][level-1],
        applyEffect(character: Readonly<Character>, level) {

            let newModifier = new DiceAndFixedAndLevel(
                character.noticeModifier.baseModifier,
                character.noticeModifier.socialModifier.increaseFixed((level - 1) * 2 + character.getSocialLevel()),
                character.noticeModifier.combatModifier.increaseFixed((level - 1) * 2 + character.getCombatLevel()),
                character.noticeModifier.adventuringModifier.increaseFixed((level - 1) * 2 + character.getAdventuringLevel()),
            )

            return Object.setPrototypeOf({ ...character, noticeModifier: newModifier  }, Character.prototype);;
        }
    },
    {
        name: "Resilient",
        requirements: "",
        tags: ["Passive", "Repeatable"],
        description: "You have become strong-willed and aren’t as easily swayed anymore. You add your level to Willpower",
        startingLevel: 0,
        priority: 100,
        additionalData: null,
        getCpCostForLevel: level => [200, 800, 4500, 12500][level-1],
        applyEffect(character: Readonly<Character>, level) {

            let newModifier = new DiceAndFixedAndLevel(
                character.willpowerModifier.baseModifier,
                character.willpowerModifier.socialModifier.increaseFixed((level - 1) * 2 + character.getSocialLevel()),
                character.willpowerModifier.combatModifier.increaseFixed((level - 1) * 2 + character.getCombatLevel()),
                character.willpowerModifier.adventuringModifier.increaseFixed((level - 1) * 2 + character.getAdventuringLevel()),
            )

            return Object.setPrototypeOf({ ...character, noticeModifier: newModifier  }, Character.prototype);;
        }
    },
];


function summTo(val: number): number {
    let sum = 0;
    for(let i = 1; i <= val; i++) sum += i;
    return sum;
}
