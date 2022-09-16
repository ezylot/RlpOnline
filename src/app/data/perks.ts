import {Perk, PerkCategory, PerkRequirement} from "../classes/perk";
import {Character} from "../classes/character";
import {DiceAndFixed} from "../classes/dice-and-fixed";
import {Stats} from "../classes/stats";
import {DiceAndFixedAndLevel} from "../classes/dice-and-fixed-and-level";
import {PerkAndLevel} from "../classes/perk-and-level";
import {cloneDeep} from "lodash-es";
import {DeepReadonly} from "ts-essentials";

export function getAllPerks() : Perk[] { return PERKS; }
const PERKS: Perk[] = [

    // BASE PERKS
    //<editor-fold defaultstate="collapsed" desc="Increase Health">
    {
        groupName: "Increase Health",
        name: "Increase Health",
        requirements: [],
        tags: ["Passive", "Repeatable"],
        description: "You increase your Health by 1D6 + Vitality. Each time you gain a higher Rank for this perk, your Health is increased again.",
        startingLevel: 0,
        priority: 100,
        internalCategory: PerkCategory.BASE,
        additionalData: null,
        getCpCostForLevel: level => sumTo(level) * 50,
        getGoldCostForLevel: () => 0,
        applyEffect(character: DeepReadonly<Character>, level) {
            let charToEdit = cloneDeep(character) as Character;

            let maxHealth = charToEdit.maxHealth;
            let vitality = charToEdit.stats.vitality;

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
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Increase Stamina">
    {
        groupName: "Increase Stamina",
        name: "Increase Stamina",
        requirements: [],
        tags: ["Passive", "Repeatable"],
        description: "You increase your Stamina by 1D6 + Strength. Each time you gain a higher Rank for this perk, your Stamina is increased again.",
        startingLevel: 0,
        priority: 100,
        internalCategory: PerkCategory.BASE,
        additionalData: null,
        getCpCostForLevel: level => sumTo(level) * 50,
        getGoldCostForLevel: () => 0,
        applyEffect(character: DeepReadonly<Character>, level) {
            let charToEdit = cloneDeep(character) as Character;

            let maxStamina = charToEdit.maxStamina;
            let strength = character.stats.strength;

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
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Increase Mana">
    {
        groupName: "Increase Mana",
        name: "Increase Mana",
        requirements: [],
        tags: ["Passive", "Repeatable"],
        description: "You increase your Mana by 1D6 + Intellect. Each time you gain a higher Rank for this perk, your Mana is increased again.",
        startingLevel: 0,
        priority: 100,
        internalCategory: PerkCategory.BASE,
        additionalData: { additionalFixedIncrease: 0 },
        getCpCostForLevel: level => sumTo(level) * 50,
        getGoldCostForLevel: () => 0,
        applyEffect(character: DeepReadonly<Character>, level) {
            let charToEdit = cloneDeep(character) as Character;

            let maxMana = charToEdit.maxMana;
            let intellect = character.stats.intellect;

            let enhancePoolPerk = charToEdit.perks.find(pal => pal.perk.name == "Enhance Pool: Mana")
            if(enhancePoolPerk == undefined) {
                maxMana = maxMana.increaseDice(level, 6);
            } else {
                maxMana = maxMana.increaseDice(level, 6 + 2 * enhancePoolPerk.level);
            }

            maxMana = maxMana.increaseFixed(intellect * level);
            maxMana = maxMana.increaseFixed(this.additionalData.additionalFixedIncrease);
            charToEdit.maxMana = maxMana;
            return charToEdit;
        }
    },

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Enhance Pool">
    ...[
        "Health",
        "Stamina",
        "Mana",
    ].map((stat : string) : Perk => ({
        groupName: "Enhance Pool",
        name: "Enhance Pool: " + stat,
        requirements: [],
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
        internalCategory: PerkCategory.BASE,
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
        getGoldCostForLevel: () => 0,
        applyEffect(character: DeepReadonly<Character>, level) {
            let charToEdit = cloneDeep(character) as Character;

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

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Increase Attribute">
    ...[
        "Strength",
        "Vitality",
        "Dexterity",
        "Agility",
        "Intellect",
        "Perception",
        "Empathy",
    ].map((stat : string) : Perk => ({
        groupName: "Increase Attribute",
        name: "Increase Attribute: " + stat,
        requirements: [],
        tags: ["Passive", "Repeatable"],
        description: "You increase one of your Attribute value by one, to a maximum of 12.\n" +
            "If you increase Strength, Intellect or Vitality, your Stamina, Mana or Health also increase by 1, plus\n" +
            "1 for each rank of Increase Stamina, Increase Mana or Increase Health you have. Each time you\n" +
            "gain a higher rank for this perk, you increase an Attribute value by one point, to a maximum of 12.",
        startingLevel: 0,
        priority: 30,
        internalCategory: PerkCategory.BASE,
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
        getGoldCostForLevel: () => 0,
        applyEffect(charToEdit: DeepReadonly<Character>, level) {
            let clonedChar = cloneDeep(charToEdit) as Character;
            let stats = charToEdit.stats.toStatNumberArray();
            let indexToIncrease = [
                "Strength",
                "Vitality",
                "Dexterity",
                "Agility",
                "Intellect",
                "Perception",
                "Empathy",
            ].indexOf(stat);
            stats[indexToIncrease] += level;

            clonedChar.stats = Stats.fromArray(stats);
            return clonedChar;
        }
    })),
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Alert">
    {
        groupName: "Alert",
        name: "Alert",
        requirements: [],
        tags: ["Passive", "Repeatable"],
        description: "You have honed your senses and gained increased reflexes. You add your level to Notice",
        startingLevel: 0,
        priority: 100,
        internalCategory: PerkCategory.BASE,
        additionalData: null,
        getCpCostForLevel: level => [200, 800, 4500, 12500][level-1],
        getGoldCostForLevel: () => 0,
        applyEffect(character: DeepReadonly<Character>, level) {
            let charToEdit = cloneDeep(character) as Character;
            charToEdit.noticeModifier = new DiceAndFixedAndLevel(
                character.noticeModifier.baseModifier,
                character.noticeModifier.socialModifier.increaseFixed((level - 1) * 2 + character.getSocialLevel()),
                character.noticeModifier.combatModifier.increaseFixed((level - 1) * 2 + character.getCombatLevel()),
                character.noticeModifier.adventuringModifier.increaseFixed((level - 1) * 2 + character.getAdventuringLevel()),
            );

            return charToEdit;
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Resilient">
    {
        groupName: "Resilient",
        name: "Resilient",
        requirements: [],
        tags: ["Passive", "Repeatable"],
        description: "You have become strong-willed and aren’t as easily swayed anymore. You add your level to Willpower",
        startingLevel: 0,
        priority: 100,
        internalCategory: PerkCategory.BASE,
        additionalData: null,
        getCpCostForLevel: level => [200, 800, 4500, 12500][level-1],
        getGoldCostForLevel: () => 0,
        applyEffect(character: DeepReadonly<Character>, level) {
            let charToEdit = cloneDeep(character) as Character;
            charToEdit.willpowerModifier = new DiceAndFixedAndLevel(
                character.willpowerModifier.baseModifier,
                character.willpowerModifier.socialModifier.increaseFixed((level - 1) * 2 + character.getSocialLevel()),
                character.willpowerModifier.combatModifier.increaseFixed((level - 1) * 2 + character.getCombatLevel()),
                character.willpowerModifier.adventuringModifier.increaseFixed((level - 1) * 2 + character.getAdventuringLevel()),
            )

            return charToEdit;
        }
    },
    //</editor-fold>

    // MARTIAL PERKS
    //<editor-fold defaultstate="collapsed" desc="Cloth Armor Training">
    {
        groupName: "Cloth Armor Training",
        name: "Cloth Armor Training",
        requirements: [],
        tags: ["Passive", "Repeatable"],
        description: "You are trained with armor made of cloth. You add your level to Dodge and Evade checks while naked, or equipped with armor with the Cloth” descriptor.",
        startingLevel: 0,
        priority: 150,
        internalCategory: PerkCategory.MARTIAL,
        additionalData: null,
        getCpCostForLevel: level => [10, 100, 250, 500][level-1],
        getGoldCostForLevel: level => [0,100,250,600][level-1],
        applyEffect(character: DeepReadonly<Character>, level) {

            // TODO: check if current armor is none or cloth, or else return
            return getArmorModifiers(character, level);
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Light Armor Training">
    {
        groupName: "Light Armor Training",
        name: "Light Armor Training",
        requirements: [ new PerkRequirement({ 1: 1 }, "Cloth Armor Training")],
        tags: ["Passive", "Repeatable", "Source"],
        description: "You are trained with light. You add your level to Dodge and Evade checks while equipped with armor with the ”Light” descriptor.",
        startingLevel: 0,
        priority: 150,
        internalCategory: PerkCategory.MARTIAL,
        additionalData: null,
        getCpCostForLevel: level => [250, 550, 1200, 2500][level-1],
        getGoldCostForLevel: level => [250, 550, 1200, 2500][level-1],
        applyEffect(character: DeepReadonly<Character>, level) {

            // TODO: check if current armor is light, or else return
            return getArmorModifiers(character, level);
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Medium Armor Training">
    {
        groupName: "Medium Armor Training",
        name: "Medium Armor Training",
        requirements: [ new PerkRequirement({ 1: 1 }, "Cloth Armor Training")],
        tags: ["Passive", "Repeatable", " Source"],
        description: "You are trained with medium armor. You add your level to Dodge and Evade checks while equipped with armor with the ”Medium” descriptor.\n" +
                "Additionally, your Agility can not exceed 9 while wearing this type of armor",
        startingLevel: 0,
        priority: 150,
        internalCategory: PerkCategory.MARTIAL,
        additionalData: null,
        getCpCostForLevel: level => [500, 1000, 2500, 5000 ][level-1],
        getGoldCostForLevel: level => [500,1000,2500,5000][level-1],
        applyEffect(character: DeepReadonly<Character>, level) {

            // TODO: check if current armor is medium, or else return
            let charToEdit = cloneDeep(getArmorModifiers(character, level)) as Character;
            let stats = charToEdit.statcap.toStatNumberArray();
            stats[3] = 9;
            charToEdit.statcap = Stats.fromArray(stats);
            return charToEdit;
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Heavy Armor Training">
    {
        groupName: "Heavy Armor Training",
        name: "Heavy Armor Training",
        requirements: [ new PerkRequirement({ 1: 1 }, "Cloth Armor Training")],
        tags: ["Passive", "Repeatable", "Source"],
        description: "You are trained with heavy armor. You add your level to Dodge and Evade checks while equipped with armor with the ”Heavy” descriptor.\n" +
                "Additionally, the resistance you gain from such armor against blunt, cutting and piercing is increased by 1.",
        startingLevel: 0,
        priority: 150,
        internalCategory: PerkCategory.MARTIAL,
        additionalData: null,
        getCpCostForLevel: level => [2500,7500,10000,15000][level-1],
        getGoldCostForLevel: level => [2500,7500,10000,15000][level-1],
        applyEffect(character: DeepReadonly<Character>, level) {

            // TODO: check if current armor is heavy, or else return
            // TODO: all resistances
            // TODO:
            return getArmorModifiers(character, level);
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Simple Weapon Training">
    {
        groupName: "Simple Weapon Training",
        name: "Simple Weapon Training",
        requirements: [],
        tags: ["Passive", "Repeatable", "Source"],
        description: "You are trained with all weapons that have the ”Simple” descriptor. You add your level to attack\n" +
            "and block rolls made with that weapon.",
        startingLevel: 0,
        priority: 100,
        internalCategory: PerkCategory.MARTIAL,
        additionalData: null,
        getCpCostForLevel: level => [10,200,700,1500][level-1],
        getGoldCostForLevel: level => [10,200,700,1500][level-1],
        applyEffect(character: DeepReadonly<Character>, level) {
            // TODO: You add your level to attack and block rolls made with that weapon.
            return character;
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Axe Training">
    {
        groupName: "Axe Training",
        name: "Axe Training",
        requirements: [ new PerkRequirement({ 1: 1 }, "Simple Weapon Training") ],
        tags: ["Passive", "Repeatable", "Source"],
        description: "You are trained with axes. This includes all weapons with the ”Axe” descriptor. You add your\n" +
            "level to attack and block rolls made with these weapons.",
        startingLevel: 0,
        priority: 160,
        internalCategory: PerkCategory.MARTIAL,
        additionalData: null,
        getCpCostForLevel: level => [ 200, 800, 4500, 12500 ][level-1],
        getGoldCostForLevel: level => [ 200, 800, 4500, 12500 ][level-1],
        applyEffect(character: DeepReadonly<Character>, level) {
            // TODO: You add your level to attack and block rolls made with that weapon.
            return character;
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Blunt Training">
    {
        groupName: "Blunt Training",
        name: "Blunt Training",
        requirements: [ new PerkRequirement({ 1: 1 }, "Simple Weapon Training") ],
        tags: ["Passive", "Repeatable", "Source"],
        description: "You are trained with blunt weapons. This includes all weapons with the ”Blunt” descriptor. You\n" +
            "add your level to attack and block rolls made with these weapons.",
        startingLevel: 0,
        priority: 155,
        internalCategory: PerkCategory.MARTIAL,
        additionalData: null,
        getCpCostForLevel: level => [ 200, 800, 4500, 12500 ][level-1],
        getGoldCostForLevel: level => [ 200, 800, 4500, 12500 ][level-1],
        applyEffect(character: DeepReadonly<Character>, level) {
            // TODO: You add your level to attack and block rolls made with that weapon.
            return character;
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Bow Training">
    {
        groupName: "Bow Training",
        name: "Bow Training",
        requirements: [ new PerkRequirement({ 1: 1 }, "Simple Weapon Training") ],
        tags: ["Passive", "Repeatable", "Source"],
        description: "You are trained with bows. This includes all weapons with the ”Bow” descriptor. You add your\n" +
            "level to attack and block rolls made with these weapons.",
        startingLevel: 0,
        priority: 160,
        internalCategory: PerkCategory.MARTIAL,
        additionalData: null,
        getCpCostForLevel: level => [ 150, 550, 3000, 6000 ][level-1],
        getGoldCostForLevel: level => [ 150, 550, 3000, 6000 ][level-1],
        applyEffect(character: DeepReadonly<Character>, level) {
            // TODO: You add your level to attack and block rolls made with that weapon.
            return character;
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Crossbow Training">
    {
        groupName: "Crossbow Training",
        name: "Crossbow Training",
        requirements: [ new PerkRequirement({ 1: 1 }, "Simple Weapon Training") ],
        tags: ["Passive", "Repeatable", "Source"],
        description: "You are trained with crossbows. This includes all weapons with the ”Crossbow” descriptor. You\n" +
            "add your level to attack and block rolls made with these weapons.",
        startingLevel: 0,
        priority: 160,
        internalCategory: PerkCategory.MARTIAL,
        additionalData: null,
        getCpCostForLevel: level => [ 100, 500, 2500, 7500 ][level-1],
        getGoldCostForLevel: level => [ 100, 500, 2500, 7500 ][level-1],
        applyEffect(character: DeepReadonly<Character>, level) {
            // TODO: You add your level to attack and block rolls made with that weapon.
            return character;
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Polearm Training">
    {
        groupName: "Polearm Training",
        name: "Polearm Training",
        requirements: [ new PerkRequirement({ 1: 1 }, "Simple Weapon Training") ],
        tags: ["Passive", "Repeatable", "Source"],
        description: "You are trained with polearms. This includes all weapons that have the ”Polearm” descriptor.\n" +
            "You add your level to attack and block rolls made with these weapons.",
        startingLevel: 0,
        priority: 160,
        internalCategory: PerkCategory.MARTIAL,
        additionalData: null,
        getCpCostForLevel: level => [ 200, 800, 4500, 12500 ][level-1],
        getGoldCostForLevel: level => [ 200, 800, 4500, 12500 ][level-1],
        applyEffect(character: DeepReadonly<Character>, level) {
            // TODO: You add your level to attack and block rolls made with that weapon.
            return character;
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Shield Training">
    {
        groupName: "Shield Training",
        name: "Shield Training",
        requirements: [ new PerkRequirement({ 1: 1 }, "Simple Weapon Training") ],
        tags: ["Passive", "Repeatable", "Source"],
        description: "You are trained with shields. This includes all weapons with the ”Shield” descriptor. You add\n" +
            "your level to attack and block rolls made with these weapons.",
        startingLevel: 0,
        priority: 160,
        internalCategory: PerkCategory.MARTIAL,
        additionalData: null,
        getCpCostForLevel: level => [ 200, 800, 4500, 12500 ][level-1],
        getGoldCostForLevel: level => [ 200, 800, 4500, 12500 ][level-1],
        applyEffect(character: DeepReadonly<Character>, level) {
            // TODO: You add your level to attack and block rolls made with that weapon.
            return character;
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Sword Training">
    {
        groupName: "Sword Training",
        name: "Sword Training",
        requirements: [ new PerkRequirement({ 1: 1 }, "Simple Weapon Training") ],
        tags: ["Passive", "Repeatable", "Source"],
        description: "You are trained with swords. This includes all weapons that have the ”Sword” descriptor. You\n" +
            "add your level to attack and block rolls made with these weapons.",
        startingLevel: 0,
        priority: 160,
        internalCategory: PerkCategory.MARTIAL,
        additionalData: null,
        getCpCostForLevel: level => [ 200, 800, 4500, 12500 ][level-1],
        getGoldCostForLevel: level => [ 200, 800, 4500, 12500 ][level-1],
        applyEffect(character: DeepReadonly<Character>, level) {
            // TODO: You add your level to attack and block rolls made with that weapon.
            return character;
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Throwing Training">
    {
        groupName: "Throwing Training",
        name: "Throwing Training",
        requirements: [ new PerkRequirement({ 1: 1 }, "Simple Weapon Training") ],
        tags: ["Passive", "Repeatable", "Source"],
        description: "You are trained with throwing weapons. This includes all weapons that have the ”Throwing”\n" +
            "descriptor. You add your level to attack and block rolls made with these weapons.",
        startingLevel: 0,
        priority: 155,
        internalCategory: PerkCategory.MARTIAL,
        additionalData: null,
        getCpCostForLevel: level => [ 80, 250, 1200, 4500 ][level-1],
        getGoldCostForLevel: level => [ 80, 250, 1200, 4500 ][level-1],
        applyEffect(character: DeepReadonly<Character>, level) {
            // TODO: You add your level to attack and block rolls made with that weapon.
            return character;
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Weapon Training">
    {
        groupName: "Weapon Training",
        name: "Weapon Training",
        requirements: [ new PerkRequirement({ 1: 1 }, "Simple Weapon Training") ],
        tags: ["Passive", "Repeatable", "Source"],
        description: "This is a set of different perks. You are trained with a certain type of weapon that does not have\n" +
            "the ”Unusual” descriptor. You add your level to attack and block rolls made with that weapon.\n" +
            "You choose the weapon type that you are proficient in when you choose this perk. You can gain\n" +
            "another instance of this perk by choosing a different weapon.",
        startingLevel: 0,
        priority: 170,
        internalCategory: PerkCategory.MARTIAL,
        additionalData: null,
        getCpCostForLevel: level => [ 50, 250, 750, 1500 ][level-1],
        getGoldCostForLevel: level => [ 50, 250, 750, 1500 ][level-1],
        applyEffect(character: DeepReadonly<Character>, level) {
            // TODO: You add your level to attack and block rolls made with that weapon.
            return character;
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Unusual Weapon Training">
    {
        groupName: "Unusual Weapon Training",
        name: "Unusual Weapon Training",
        requirements: [ new PerkRequirement({ 1: 1 }, "Simple Weapon Training") ],
        tags: ["Passive", "Repeatable", "Source"],
        description: "This is a set of different perks. You are trained with a certain type of weapon that has the ”Un-\n" +
            "usual” descriptor. You add your level to attack and block rolls made with that weapon.\n" +
            "You choose the weapon type that you are proficient in when you choose this perk. You can gain\n" +
            "another instance of this perk by choosing a different weapon.",
        startingLevel: 0,
        priority: 170,
        internalCategory: PerkCategory.MARTIAL,
        additionalData: null,
        getCpCostForLevel: level => [ 500, 1500, 5000, 10000 ][level-1],
        getGoldCostForLevel: level => [ 500, 1500, 5000, 10000 ][level-1],
        applyEffect(character: DeepReadonly<Character>, level) {
            // TODO: You add your level to attack and block rolls made with that weapon.
            return character;
        }
    },
    //</editor-fold>

    // TODO: Maneuvers
    //<editor-fold defaultstate="collapsed" desc="Aimed Attack">
    {
        groupName: "Aimed Attack",
        name: "Aimed Attack",
        requirements: [
            new PerkRequirement({ 1: 3, 2: 6, 3: 9, 4: 12 }, undefined, "dexterity"),
        ],
        tags: [ "Maneuver", "Active", "Repeatable" ],
        description: "When making a weapon attack based on Dexterity, you can increase the AP cost of the attack by " +
            "up to 3. If you do, the attack roll and the damage are increased by this value. " +
            "If the attack is ranged, this increase is doubled.",
        startingLevel: 0,
        priority: 10,
        internalCategory: PerkCategory.MANEUVERS,
        additionalData: null,
        getCpCostForLevel: level => [ 100, 500, 2500, 7500 ][level-1],
        getGoldCostForLevel: () => 100,
        applyEffect(character: DeepReadonly<Character>, level) {
            // TODO:
            return character;
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Brutal Attack">
    {
        groupName: "Brutal Attack",
        name: "Brutal Attack",
        requirements: [
            new PerkRequirement({ 1: 3, 2: 6, 3: 9, 4: 12 }, undefined, "strength"),
        ],
        tags: [ "Maneuver", "Active", "Repeatable" ],
        description: "When making a melee weapon attack based on Strength, you can pay 5 Stamina and reduce your " +
            "attack roll by up to 3 and add that value to the damage. For example, if your weapon would deal " +
            "2D4 damage and you had 8 Strength, you could pay 5 Stamina and reduce your attack roll by up " +
            "to 2, changing the weapon’s damage to 2d4+2. " +
            "When using this weapon with a two-handed weapon attack, the damage increase is doubled.",
        startingLevel: 0,
        priority: 10,
        internalCategory: PerkCategory.MANEUVERS,
        additionalData: null,
        getCpCostForLevel: level => [ 100, 500, 2500, 7500 ][level-1],
        getGoldCostForLevel: () => 100,
        applyEffect(character: DeepReadonly<Character>, level) {
            // TODO:
            return character;
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Elegant Attack">
    {
        groupName: "Elegant Attack",
        name: "Elegant Attack",
        requirements: [
            new PerkRequirement({ 1: 3, 2: 6, 3: 9, 4: 12 }, undefined, "agility"),
        ],
        tags: [ "Maneuver", "Active", "Repeatable" ],
        description: "When making a weapon attack based on Agility, you can pay up to 3 Stamina and increase the " +
            "weapon damage by that number. This damage increase is doubled for unarmed strikes.",
        startingLevel: 0,
        priority: 10,
        internalCategory: PerkCategory.MANEUVERS,
        additionalData: null,
        getCpCostForLevel: level => [ 100, 500, 2500, 7500 ][level-1],
        getGoldCostForLevel: () => 100,
        applyEffect(character: DeepReadonly<Character>, level) {
            // TODO:
            return character;
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Feint Attack">
    {
        groupName: "Feint Attack",
        name: "Feint Attack",
        requirements: [ ],
        tags: [ "Maneuver", "Active" ],
        description: "You can spend 2 additional AP to create an opening in your opponent’s defenses, to be able to " +
            "hit easier. When making a melee weapon attack, make an Empathy check adding bonuses for deception, " +
            "contested by the defender’s Notice and Perception check (adding bonuses for recognizing " +
            "deceptions). If your Empathy check succeeds, the defender has to take the hit. This counts for the " +
            "prerequisite of a Sneak Attack. If you don’t succeed, the defender can react as usual",
        startingLevel: 0,
        priority: 10,
        internalCategory: PerkCategory.MANEUVERS,
        additionalData: null,
        getCpCostForLevel: level => [ 200 ][level-1],
        getGoldCostForLevel: () => 150,
        applyEffect(character: DeepReadonly<Character>, level) {
            // TODO:
            return character;
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Provoke">
    {
        groupName: "Provoke",
        name: "Provoke",
        requirements: [ ],
        tags: [ "Maneuver", "Active", "Repeatable" ],
        description: "You can spend 2 AP to provoke an Opponent to attack you. Make an Empathy check, contested " +
            "by this opponent’s Perception check. If you succeed, this opponent deals half damage (round up) " +
            "against any creature that isn’t you for their next 1D6 attacks, with an exception to attacks that " +
            "deal area-based damage effects that includes you.",
        startingLevel: 0,
        priority: 10,
        internalCategory: PerkCategory.MANEUVERS,
        additionalData: null,
        getCpCostForLevel: level => [ 200, 500, 2500, 7500 ][level-1],
        getGoldCostForLevel: () => 150,
        applyEffect(character: DeepReadonly<Character>, level) {
            // TODO:
            return character;
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Rage">
    {
        groupName: "Rage",
        name: "Rage",
        requirements: [ ],
        tags: [ "Passive", "Repeatable" ],
        description: "You can enter a state of rage as part of an action. While in rage, your Strength is increased by " +
            "+1, and your strength-based attacks deal +1 damage, or +2 damage if they are done with a " +
            "two-handed weapon. Additionally, you gain an amount of temporary Hit Points equal to your Vitality. " +
            "While in rage, you lose one Stamina per Action Point that you spend. While in rage, you are " +
            "immune to becoming Exhausted or Heavily Exhausted. After you have raged, you become Heavily " +
            "Exhausted for 1 hour. While heavily exhausted in this manner, your Stamina are reduced to 1⁄10 " +
            "of your maximum stamina. You begin regaining stamina normally after one hour." +
            " Further levels give different effect, refer for that to the RLP for now", // TODO
        startingLevel: 0,
        priority: 10,
        internalCategory: PerkCategory.MANEUVERS,
        additionalData: null,
        getCpCostForLevel: level => [ 100, 250, 750, 1500, 3500, 7500 ][level-1],
        getGoldCostForLevel: () => 0,
        applyEffect(character: DeepReadonly<Character>, level) {
            // TODO:
            return character;
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Sneak Attack">
    {
        groupName: "Sneak Attack",
        name: "Sneak Attack",
        requirements: [ ],
        tags: [ "Maneuver", "Active", "Repeatable" ],
        description: "You can spend 4 Stamina while making a melee weapon attack based on DE or AG, targeting a " +
            "creature’s weak spot. Enemies immune to critical hits are immune to this effect. You can only do " +
            "a sneak attack if the target hasn’t seen you or is unable to react to your attack. You deal damage " +
            "as if you had already hit and as if the target was not wearing any armor, so the target’s armor " +
            "reduction is bypassed and you deal 1d6 additional damage.",
        startingLevel: 0,
        priority: 10,
        internalCategory: PerkCategory.MANEUVERS,
        additionalData: null,
        getCpCostForLevel: level => [ 100, 250, 550, 1000, 1700, 2450 ][level-1],
        getGoldCostForLevel: () => 100,
        applyEffect(character: DeepReadonly<Character>, level) {
            // TODO:
            return character;
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Trip Attack">
    {
        groupName: "Trip Attack",
        name: "Trip Attack",
        requirements: [ ],
        tags: [ "Maneuver", "Active" ],
        description: "When making a melee weapon attack with a weapon you are proficient with, if that attack deals " +
            "at least 1 damage, you can spend 10 Stamina to make an additional trip attempt (You don’t have to pay the 5 usual Stamina for that attempt).",
        startingLevel: 0,
        priority: 10,
        internalCategory: PerkCategory.MANEUVERS,
        additionalData: null,
        getCpCostForLevel: level => [ 1000 ][level-1],
        getGoldCostForLevel: () => 350,
        applyEffect(character: DeepReadonly<Character>, level) {
            // TODO:
            return character;
        }
    },
    //</editor-fold>




    // TODO: Odem Perks
    // TODO: Magic Perks
    // TODO: Divine Perks

    // Skill Perks
    //<editor-fold defaultstate="collapsed" desc="Animal Handling">
    {
        groupName: "Animal Handling",
        name: "Animal Handling",
        requirements: [],
        tags: ["Skill", "Passive", "Repeatable", "Source"],
        description: "You can add your relevant game mode level to checks concerning the handling of animals, like\n" +
            "riding horses, taming wild beasts or soothing aggressive wolves",
        startingLevel: 0,
        priority: 40,
        internalCategory: PerkCategory.SKILL,
        additionalData: null,
        getCpCostForLevel: skillCostCalculationFunction,
        getGoldCostForLevel: () => 10,
        applyEffect: char => char,
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Balancing">
    {
        groupName: "Balancing",
        name: "Balancing",
        requirements: [],
        tags: ["Skill", "Passive", "Repeatable", "Source"],
        description: "You can add your relevant game mode level to checks concerning keeping your balance. This\n" +
            "includes trying to walk over slippery surfaces or navigating tightropes. Additionally, balancing is\n" +
            "used to not be knocked over.",
        startingLevel: 0,
        priority: 40,
        internalCategory: PerkCategory.SKILL,
        additionalData: null,
        getCpCostForLevel: skillCostCalculationFunction,
        getGoldCostForLevel: () => 50,
        applyEffect: char => char,
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Climbing">
    {
        groupName: "Climbing",
        name: "Climbing",
        requirements: [],
        tags: ["Skill", "Passive", "Repeatable", "Source"],
        description: "You can add your relevant game mode level to checks concerning climbing. This includes knowledge\n" +
            "about climbing, but also climbing itself.",
        startingLevel: 0,
        priority: 40,
        internalCategory: PerkCategory.SKILL,
        additionalData: null,
        getCpCostForLevel: skillCostCalculationFunction,
        getGoldCostForLevel: () => 25,
        applyEffect: char => char,
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Deception">
    {
        groupName: "Deception",
        name: "Deception",
        requirements: [],
        tags: ["Skill", "Passive", "Repeatable", "Source"],
        description: "You can add your relevant game mode level to checks concerning hiding your true intentions as well as truths.\n" +
            "You can also add your relevant game mode level to checks concerning recognizing Deception and realizing someone’s true intentions.",
        startingLevel: 0,
        priority: 40,
        internalCategory: PerkCategory.SKILL,
        additionalData: null,
        getCpCostForLevel: skillCostCalculationFunction,
        getGoldCostForLevel: () => 25,
        applyEffect: char => char,
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Examination">
    {
        groupName: "Examination",
        name: "Examination",
        requirements: [],
        tags: ["Skill", "Passive", "Repeatable", "Source"],
        description: "You can add your relevant game mode level to checks concerning examining things, such as searching for hidden objects or creatures or trying to decipher faded text.",
        startingLevel: 0,
        priority: 40,
        internalCategory: PerkCategory.SKILL,
        additionalData: null,
        getCpCostForLevel: skillCostCalculationFunction,
        getGoldCostForLevel: () => 30,
        applyEffect: char => char,
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Forgery">
    {
        groupName: "Forgery",
        name: "Forgery",
        requirements: [],
        tags: ["Skill", "Passive", "Repeatable", "Source"],
        description: "You can add your relevant game mode level to checks concerning the creation and recognition of\n" +
            "forged documents, seals, jewellery, or other types of forgeries.",
        startingLevel: 0,
        priority: 40,
        internalCategory: PerkCategory.SKILL,
        additionalData: null,
        getCpCostForLevel: skillCostCalculationFunction,
        getGoldCostForLevel: () => 150,
        applyEffect: char => char,
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Intimidation">
    {
        groupName: "Intimidation",
        name: "Intimidation",
        requirements: [],
        tags: ["Skill", "Passive", "Repeatable", "Source"],
        description: "You can add your relevant game mode level to checks concerning threatening behaviour, extortion,\n" +
            "blackmail, torture or other forms of intimidation.",
        startingLevel: 0,
        priority: 40,
        internalCategory: PerkCategory.SKILL,
        additionalData: null,
        getCpCostForLevel: skillCostCalculationFunction,
        getGoldCostForLevel: () => 25,
        applyEffect: char => char,
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Jumping">
    {
        groupName: "Jumping",
        name: "Jumping",
        requirements: [],
        tags: ["Skill", "Passive", "Repeatable", "Source"],
        description: "You can add your relevant game mode level to checks concerning jumping. This includes jumping\n" +
            "far distances as well as making targeted jumps. Additionally, it also includes landing a jump from\n" +
            "a height without taking damage, or reducing falling damage from a high fall.",
        startingLevel: 0,
        priority: 40,
        internalCategory: PerkCategory.SKILL,
        additionalData: null,
        getCpCostForLevel: skillCostCalculationFunction,
        getGoldCostForLevel: () => 10,
        applyEffect: char => char,
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Lock Picking">
    {
        groupName: "Lock Picking",
        name: "Lock Picking",
        requirements: [],
        tags: ["Skill", "Passive", "Repeatable", "Source"],
        description: "You can add your relevant game mode level to checks concerning the picking of locks. Lock Picking\n" +
            "checks can also be used to close locks again. Magic locks usually can not be picked by the means\n" +
            "of a lock pick.",
        startingLevel: 0,
        priority: 40,
        internalCategory: PerkCategory.SKILL,
        additionalData: null,
        getCpCostForLevel: skillCostCalculationFunction,
        getGoldCostForLevel: () => 25,
        applyEffect: char => char,
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Lore X">
    {
        groupName: "Lore X",
        name: "Lore X",
        requirements: [],
        tags: ["Skill", "Passive", "Repeatable", "Source"],
        description: "This perk is a collection of multiple Skill perks, each of which concerns a particular area of expertise." +
            " You can add your relevant game mode level to checks made to recall information about said\n" +
            "topic.",
        startingLevel: 0,
        priority: 40,
        internalCategory: PerkCategory.SKILL,
        additionalData: null,
        getCpCostForLevel: skillCostCalculationFunction,
        getGoldCostForLevel: () => 100,
        applyEffect: char => char,
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Masquerade">
    {
        groupName: "Masquerade",
        name: "Masquerade",
        requirements: [],
        tags: ["Skill", "Passive", "Repeatable", "Source"],
        description: "You can add your relevant game mode level to checks concerning the creation of costumes, masks\n" +
            "and disguises. It is also useful for creating second identities, staying in character, and pretending\n" +
            "to be someone else.",
        startingLevel: 0,
        priority: 40,
        internalCategory: PerkCategory.SKILL,
        additionalData: null,
        getCpCostForLevel: skillCostCalculationFunction,
        getGoldCostForLevel: () => 75,
        applyEffect: char => char,
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Medicine">
    {
        groupName: "Medicine",
        name: "Medicine",
        requirements: [],
        tags: ["Skill", "Passive", "Repeatable", "Source"],
        description: "You can add your relevant game mode level to checks concerning illnesses, wounds, poisons, and\n" +
            "anatomy in general. It can be used to recognize the cause of death in a corpse, diagnose and treat\n" +
            "illnesses or poisons, and treat wounds.",
        startingLevel: 0,
        priority: 40,
        internalCategory: PerkCategory.SKILL,
        additionalData: null,
        getCpCostForLevel: skillCostCalculationFunction,
        getGoldCostForLevel: () => 100,
        applyEffect: char => char,
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Negotiation">
    {
        groupName: "Negotiation",
        name: "Negotiation",
        requirements: [],
        tags: ["Skill", "Passive", "Repeatable", "Source"],
        description: "You can add your relevant game mode level to checks concerning diplomacy, persuasion, haggling\n" +
            "and any other forms of debate.",
        startingLevel: 0,
        priority: 40,
        internalCategory: PerkCategory.SKILL,
        additionalData: null,
        getCpCostForLevel: skillCostCalculationFunction,
        getGoldCostForLevel: () => 50,
        applyEffect: char => char,
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Performance X">
    {
        groupName: "Performance X",
        name: "Performance X",
        requirements: [],
        tags: ["Skill", "Passive", "Repeatable", "Source"],
        description: "This perk is a collection of multiple Skill perks, each of which concerns a particular art form or\n" +
            "instrument. You can add your relevant game mode level to checks made to create, recite, recall\n" +
            "and perform pieces of art in the given art form or with the give",
        startingLevel: 0,
        priority: 40,
        internalCategory: PerkCategory.SKILL,
        additionalData: null,
        getCpCostForLevel: skillCostCalculationFunction,
        getGoldCostForLevel: () => 75,
        applyEffect: char => char,
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Pickpocket">
    {
        groupName: "Pickpocket",
        name: "Pickpocket",
        requirements: [],
        tags: ["Skill", "Passive", "Repeatable", "Source"],
        description: "You can add your relevant game mode level to checks concerning the picking of pockets. This\n" +
            "includes actually stealing a person’s wallet, but also tricks like stealing a ring off of their finger\n" +
            "while shaking hands, or recognizing how much money a person might have on them.",
        startingLevel: 0,
        priority: 40,
        internalCategory: PerkCategory.SKILL,
        additionalData: null,
        getCpCostForLevel: skillCostCalculationFunction,
        getGoldCostForLevel: () => 10,
        applyEffect: char => char,
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Research">
    {
        groupName: "Research",
        name: "Research",
        requirements: [],
        tags: ["Skill", "Passive", "Repeatable", "Source"],
        description: "You can add your relevant game mode level to checks concerning the research of information. This\n" +
            "includes looking through books, but also gathering information in a seedy tavern or knowing who\n" +
            "to ask for favours in order to gain data.",
        startingLevel: 0,
        priority: 40,
        internalCategory: PerkCategory.SKILL,
        additionalData: null,
        getCpCostForLevel: skillCostCalculationFunction,
        getGoldCostForLevel: () => 50,
        applyEffect: char => char,
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Rope Handling">
    {
        groupName: "Rope Handling",
        name: "Rope Handling",
        requirements: [],
        tags: ["Skill", "Passive", "Repeatable", "Source"],
        description: "You can add your relevant game mode level to checks concerning the tying and untying of knots,\n" +
            "as well as the function and usability of different types of ropes, strings, chains and bindings.",
        startingLevel: 0,
        priority: 40,
        internalCategory: PerkCategory.SKILL,
        additionalData: null,
        getCpCostForLevel: skillCostCalculationFunction,
        getGoldCostForLevel: () => 50,
        applyEffect: char => char,
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Seduction">
    {
        groupName: "Seduction",
        name: "Seduction",
        requirements: [],
        tags: ["Skill", "Passive", "Repeatable", "Source"],
        description: "You can add your relevant game mode level checks concerning the seduction of others. This can\n" +
            "include making them act against their moral compass, persuading them to an intimate encounter,\n" +
            "or making someone fall in love with you.\n" +
            "It is also useful for recognizing it if someone is trying to seduce someone.",
        startingLevel: 0,
        priority: 40,
        internalCategory: PerkCategory.SKILL,
        additionalData: null,
        getCpCostForLevel: skillCostCalculationFunction,
        getGoldCostForLevel: () => 25,
        applyEffect: char => char,
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Stealth">
    {
        groupName: "Stealth",
        name: "Stealth",
        requirements: [],
        tags: ["Skill", "Passive", "Repeatable", "Source"],
        description: "You can add your relevant game mode level to checks concerning staying hidden, moving silently,\n" +
            "moving unnoticed, hiding objects and subterfuge in general.",
        startingLevel: 0,
        priority: 40,
        internalCategory: PerkCategory.SKILL,
        additionalData: null,
        getCpCostForLevel: skillCostCalculationFunction,
        getGoldCostForLevel: () => 10,
        applyEffect: char => char,
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Survival">
    {
        groupName: "Survival",
        name: "Survival",
        requirements: [],
        tags: ["Skill", "Passive", "Repeatable", "Source"],
        description: "You can add your relevant game mode level to checks concerning survival in nature. This includes\n" +
            "foraging for basic food, finding, interpreting, and following tracks, as well as creating basic shelters\n" +
            "and starting fires.",
        startingLevel: 0,
        priority: 40,
        internalCategory: PerkCategory.SKILL,
        additionalData: null,
        getCpCostForLevel: skillCostCalculationFunction,
        getGoldCostForLevel: () => 25,
        applyEffect: char => char,
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Swimming">
    {
        groupName: "Swimming",
        name: "Swimming",
        requirements: [],
        tags: ["Skill", "Passive", "Repeatable", "Source"],
        description: "You can add your relevant game mode level to checks concerning moving in water as well as\n" +
            "other fluids. This is also useful for diving for a long period of time, fighting against a current, or\n" +
            "appraising how rough the currents in a body of water are.",
        startingLevel: 0,
        priority: 40,
        internalCategory: PerkCategory.SKILL,
        additionalData: null,
        getCpCostForLevel: skillCostCalculationFunction,
        getGoldCostForLevel: () => 10,
        applyEffect: char => char,
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Trap Handling">
    {
        groupName: "Trap Handling",
        name: "Trap Handling",
        requirements: [],
        tags: ["Skill", "Passive", "Repeatable", "Source"],
        description: "You can add your relevant game mode level to checks concerning the setting and disabling of non-\n" +
            "magical traps. Traps usually have a trigger as well as an effect, that’s typically supposed to harm\n" +
            "the person triggering the trap.",
        startingLevel: 0,
        priority: 40,
        internalCategory: PerkCategory.SKILL,
        additionalData: null,
        getCpCostForLevel: skillCostCalculationFunction,
        getGoldCostForLevel: () => 100,
        applyEffect: char => char,
    },
    //</editor-fold>
];

function skillCostCalculationFunction(level: number, allPerks: DeepReadonly<PerkAndLevel[]>): number {
    let totalSkillLevels = allPerks
        .filter(p => p.perk.internalCategory == PerkCategory.SKILL)
        .reduce((adder, perk) => adder + perk.level, 0);
    return recursiveSkillCostCalculator(totalSkillLevels + 1);
}

function recursiveSkillCostCalculator(current: number) : number {
    if(current == 0) return 0;
    return current * 20 + recursiveSkillCostCalculator(current - 1);
}

function getArmorModifiers(character: DeepReadonly<Character>, level: number) : DeepReadonly<Character> {
    let dodgeModifier = new DiceAndFixedAndLevel(
        character.dodgeModifier.baseModifier,
        character.dodgeModifier.socialModifier
            .increaseDice(level - 1, 4)
            .increaseFixed((level - 1) * 2 + character.getSocialLevel()),
        character.dodgeModifier.combatModifier
            .increaseDice(level - 1, 4)
            .increaseFixed((level - 1) * 2 + character.getCombatLevel()),
        character.dodgeModifier.adventuringModifier
            .increaseDice(level - 1, 4)
            .increaseFixed((level - 1) * 2 + character.getAdventuringLevel()),
    );

    let evadeModifier = new DiceAndFixedAndLevel(
        character.evadeModifier.baseModifier,
        character.evadeModifier.socialModifier
            .increaseDice(level - 1, 4)
            .increaseFixed((level - 1) * 2 + character.getSocialLevel()),
        character.evadeModifier.combatModifier
            .increaseDice(level - 1, 4)
            .increaseFixed((level - 1) * 2 + character.getCombatLevel()),
        character.evadeModifier.adventuringModifier
            .increaseDice(level - 1, 4)
            .increaseFixed((level - 1) * 2 + character.getAdventuringLevel()),
    );

    let charToEdit = cloneDeep(character) as Character;
    charToEdit.dodgeModifier = dodgeModifier;
    charToEdit.evadeModifier = evadeModifier;
    return charToEdit;
}

function sumTo(val: number): number {
    let sum = 0;
    for(let i = 1; i <= val; i++) sum += i;
    return sum;
}
