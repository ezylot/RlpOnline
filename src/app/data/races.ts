import {Race} from "../classes/race";
import {LevelUpBonus} from "../classes/levelupbonus";
import {Stats} from "../classes/stats";
import {ANIMALS} from "./languages";

export function getAllRaces() : Race[] { return RACES; }
const RACES: Race[] = [
    {
        name: "Daevana",
        flavorText: "Daevana are a very tall and muscular race of lesser giant-kin that live in small clans and call the " +
            " savage wilderness of Northern Knorkalith, but especially the island of Lonereach, their home. <br /><br />" +
            "Daevana mature at the age of 10, and live to be around 60. <br /> At their best, Daevana are loyal, helpful and friendly." +
            "<br />At their worst, Daevana are temperamental, boastful and unpredictable.",
        textDescription: "Every Daevana starts with a Strength increased by 2. <br/> " +
            "Also, their Vitality is increased by 1 <br/> " +
            "However, their Intellect is reduced by 2 <br/> " +
            "Additionally, their Daevana’s Empathy is reduced by 1 <br/> " +
            "Daevana are especially brutish. When they make a strength-based melee attack roll, they add 1d6 to the damage. <br/>" +
            "Also, their survival in savage lands has made them especially resilient. When they gain a level in ”Increase Health”, " +
            "they can roll twice and take the higher result. Lastly, Daevana have an increased Damage reduction against " +
            "cutting, piercing and blunt by +1. <br/><br/> Daevana start the game with 25 Health, 30 Stamina and 15 Mana",
        statboni: new Stats(2, 1, 0, 0, -2, 0, -1),
        traitsAsStrings: [
            "When they make a strength-based melee attack roll, they add 1d6 to the damage",
            "Increased Damage reduction against cutting, piercing and blunt by +1.",
            "When they gain a level in ”Increase Health”, they can roll twice and take the higher result.",
        ],
        startingHealth: 25,
        startingStamina: 30,
        startingMana: 15,
        languages: [],
        cpBonus: 0,
        freeAttributePoints: 0,
        modifyAbilityCheck: function(abilityRoll) { return abilityRoll; },
        modifyAttack: function(attackRoll) { return attackRoll; },
        modifyDamage: function(attackRoll, damageRoll) { return damageRoll; }, // TODO: When they make a strength-based melee attack roll, they add 1d6 to the damage
        modifyIncomingAttack: function(damageRoll) { return damageRoll; },
        modifyIncomingDamage: function(damageRoll) { return damageRoll; }, // TODO: increased Damage reduction against cutting, piercing and blunt by +1.
        modifyPerkWhenLearning: function(perk) { return perk; }, // TODO: When they gain a level in ”Increase Health”, they can roll twice and take the higher result.
        levelUpBonus: function() { return new LevelUpBonus() },
    },
    {
        name: "Rock Elf",
        flavorText: "Elves are a short-growing people of mountain- and forest dwellers that like to avoid human contact.<br /><br />" +
            "Elves mature at an age of 30, and can live to be 200.<br /> " +
            "At their best, elves are cautious, reliable and loyal.<br /> " +
            "At their worst, elves are removed, mistrusting and superstitious.<br /> " +
            "Rock Elves have skin alike to marble and granite. It is extremely difficult to spot them in rocky terrain.",
        textDescription: "Every Elve starts with an Agility increased by 2. <br /> " +
            "Also, every Elve’s Dexterity increases by 1 <br /> " +
            "Also, every Elve’s Intellect is reduced by 1. <br /> " +
            "In rocky terrain, they can attempt to hide in plain sight and when doing so, they can add +1d4 on their stealth check.<br /><br /> " +
            "Elves start the game with 20 Health, 25 Stamina and 25 Mana <br /> ",
        statboni: new Stats(0, 0, 1, 2, -1, 0, 0),
        traitsAsStrings: [
            "In rocky terrain, they can attempt to hide in plain sight and when doing so, they can add +1d4 on their stealth check",
        ],
        startingHealth: 20,
        startingStamina: 25,
        startingMana: 25,
        languages: [],
        cpBonus: 0,
        freeAttributePoints: 0,
        modifyAbilityCheck: function(abilityRoll) { return abilityRoll; }, // TODO: In rocky terrain, they can attempt to hide in plain sight and when doing so, they can add +1d4 on their stealth check
        modifyAttack: function(attackRoll) { return attackRoll; },
        modifyDamage: function(attackRoll, damageRoll) { return damageRoll; },
        modifyIncomingAttack: function(damageRoll) { return damageRoll; },
        modifyIncomingDamage: function(damageRoll) { return damageRoll; },
        modifyPerkWhenLearning: function(perk) { return perk; },
        levelUpBonus: function() { return new LevelUpBonus() },
    },
    {
        name: "Bark Elf",
        flavorText: "Elves are a short-growing people of mountain- and forest dwellers that like to avoid human contact. <br/> Elves mature at an age of 30, and can live to be 200. <br/> At their best, elves are cautious, reliable and loyal. <br/> At their worst, elves are removed, mistrusting and superstitious. <br/> Bark Elves have skin alike to wood and leaves. It is extremely difficult to spot them in forested <br/> terrain",
        textDescription: "Every Elve starts with an Agility increased by 2. <br /> Also, every Elve’s Dexterity increases by 1 <br /> Also, every Elve’s Intellect is reduced by 1. <br /> In forested terrain, they can attempt to hide in plain sight and when doing so, <br /> they can add +1d4 on their stealth check",
        statboni: new Stats(0, 0, 1, 2, -1, 0, 0),
        traitsAsStrings: [
            "In forested terrain, they can attempt to hide in plain sight and when doing so, they can add +1d4 on their stealth check",
        ],
        startingHealth: 20,
        startingStamina: 25,
        startingMana: 25,
        languages: [],
        cpBonus: 0,
        freeAttributePoints: 0,
        modifyAbilityCheck: function(abilityRoll) { return abilityRoll; },// TODO: In forested terrain, they can attempt to hide in plain sight and when doing so, they can add +1d4 on their stealth check
        modifyAttack: function(attackRoll) { return attackRoll; },
        modifyDamage: function(attackRoll, damageRoll) { return damageRoll; },
        modifyIncomingAttack: function(damageRoll) { return damageRoll; },
        modifyIncomingDamage: function(damageRoll) { return damageRoll; },
        modifyPerkWhenLearning: function(perk) { return perk; },
        levelUpBonus: function() { return new LevelUpBonus() },
    },
    {
        name: "Molfay",
        flavorText: "Fay are a race of tall-standing, fair skinned creatures that have adapted to different environments\n" +
            "through magical means.\n" +
            "Fay mature at an age of 50, and can live up to 500 years - there is however no known case of a fay\n" +
            "dying of old age.\n" +
            "At their best, fay are reliable, honest and knowledgable.\n" +
            "At their worst, fay are hard-headed, aloof and emotionless.\n" +
            "Molfay (Marshland Fay) have adapted to have webbing and be able to swim in freshwate",
        textDescription: "Every Fay starts with an Intellect increased by 2.\n" +
            "Also, every Fay’s Empathy is reduced by 1.\n" +
            "Fay start the game with 20 Health, 20 Stamina and 30 Mana.\n" +
            "Molfay have a Vitality increased by 1 and can hold their breath twice as long as normal in\n" +
            "freshwater",
        statboni: new Stats(0, 1, 0, 0, 2, 0, -1),
        traitsAsStrings: ["Molfay can hold their breath twice as long as normal in freshwater"],
        startingHealth: 20,
        startingStamina: 20,
        startingMana: 30,
        languages: [],
        cpBonus: 0,
        freeAttributePoints: 0,
        modifyAbilityCheck: function(abilityRoll) { return abilityRoll; },
        modifyAttack: function(attackRoll) { return attackRoll; },
        modifyDamage: function(attackRoll, damageRoll) { return damageRoll; },
        modifyIncomingAttack: function(damageRoll) { return damageRoll; },
        modifyIncomingDamage: function(damageRoll) { return damageRoll; },
        modifyPerkWhenLearning: function(perk) { return perk; },
        levelUpBonus: function() { return new LevelUpBonus() },
    },
    {
        name: "Trilfay",
        flavorText: "Fay are a race of tall-standing, fair skinned creatures that have adapted to different environments\n" +
            "through magical means.\n" +
            "Fay mature at an age of 50, and can live up to 500 years - there is however no known case of a fay\n" +
            "dying of old age.\n" +
            "At their best, fay are reliable, honest and knowledgable.\n" +
            "At their worst, fay are hard-headed, aloof and emotionless.\n" +
            "Trilfay (Deep Fay) have adapted to be able to move around swiftly in sands and resist the darkness\n" +
            "of the deep",
        textDescription: "Every Fay starts with an Intellect increased by 2.\n" +
            "Also, every Fay’s Empathy is reduced by 1.\n" +
            "Fay start the game with 20 Health, 20 Stamina and 30 Mana.\n" +
            "Trilfay can see in complete darkness as if it were daylight. However, they\n" +
            "can not discern colour this way. Also, their Strength is increased by 1",
        statboni: new Stats(1, 0, 0, 0, 2, 0, -1),
        traitsAsStrings: ["Trilfay can see in complete darkness as if it were daylight. However, they can not discern colour this way"],
        startingHealth: 20,
        startingStamina: 20,
        startingMana: 30,
        languages: [],
        cpBonus: 0,
        freeAttributePoints: 0,
        modifyAbilityCheck: function(abilityRoll) { return abilityRoll; },
        modifyAttack: function(attackRoll) { return attackRoll; },
        modifyDamage: function(attackRoll, damageRoll) { return damageRoll; },
        modifyIncomingAttack: function(damageRoll) { return damageRoll; },
        modifyIncomingDamage: function(damageRoll) { return damageRoll; },
        modifyPerkWhenLearning: function(perk) { return perk; },
        levelUpBonus: function() { return new LevelUpBonus() },
    },
    {
        name: "Marfay",
        flavorText: "Fay are a race of tall-standing, fair skinned creatures that have adapted to different environments\n" +
            "through magical means.\n" +
            "Fay mature at an age of 50, and can live up to 500 years - there is however no known case of a fay\n" +
            "dying of old age.\n" +
            "At their best, fay are reliable, honest and knowledgable.\n" +
            "At their worst, fay are hard-headed, aloof and emotionless.\n" +
            "Marfay (Woodland Fay) have adapted to be excellent climbers, and can swing from tree to tree\n" +
            "without effort.",
        textDescription: "Every Fay starts with an Intellect increased by 2.\n" +
            "Also, every Fay’s Empathy is reduced by 1.\n" +
            "Fay start the game with 20 Health, 20 Stamina and 30 Mana.\n" +
            "A Woodland Fay moves at the same speed when climbing trees as running\n" +
            "and their Agility is increased by 1",
        statboni: new Stats(0, 0, 0, 1, 2, 0, -1),
        traitsAsStrings: [ "A Woodland Fay moves at the same speed when climbing trees as running" ],
        startingHealth: 20,
        startingStamina: 20,
        startingMana: 30,
        languages: [],
        cpBonus: 0,
        freeAttributePoints: 0,
        modifyAbilityCheck: function(abilityRoll) { return abilityRoll; },
        modifyAttack: function(attackRoll) { return attackRoll; },
        modifyDamage: function(attackRoll, damageRoll) { return damageRoll; },
        modifyIncomingAttack: function(damageRoll) { return damageRoll; },
        modifyIncomingDamage: function(damageRoll) { return damageRoll; },
        modifyPerkWhenLearning: function(perk) { return perk; },
        levelUpBonus: function() { return new LevelUpBonus() },
    },
    {
        name: "Plafay",
        flavorText: "Fay are a race of tall-standing, fair skinned creatures that have adapted to different environments\n" +
            "through magical means.\n" +
            "Fay mature at an age of 50, and can live up to 500 years - there is however no known case of a fay\n" +
            "dying of old age.\n" +
            "At their best, fay are reliable, honest and knowledgable.\n" +
            "At their worst, fay are hard-headed, aloof and emotionless.\n" +
            "Plafay (Grassland Fay) have adapted perfectly to steppes, being able to track creatures perfectly\n" +
            "and move around in plains and rolling hills",
        textDescription: "Every Fay starts with an Intellect increased by 2.\n" +
            "Also, every Fay’s Empathy is reduced by 1.\n" +
            "Fay start the game with 20 Health, 20 Stamina and 30 Mana.\n" +
            "Their Perception is increased by 1 and running\n" +
            "doesn’t cost them stamina.",
        statboni: new Stats(0, 0, 0, 0, 2, 1, -1),
        traitsAsStrings: [ "Running doesn’t cost them stamina."],
        startingHealth: 20,
        startingStamina: 20,
        startingMana: 30,
        languages: [],
        cpBonus: 0,
        freeAttributePoints: 0,
        modifyAbilityCheck: function(abilityRoll) { return abilityRoll; },
        modifyAttack: function(attackRoll) { return attackRoll; },
        modifyDamage: function(attackRoll, damageRoll) { return damageRoll; },
        modifyIncomingAttack: function(damageRoll) { return damageRoll; },
        modifyIncomingDamage: function(damageRoll) { return damageRoll; },
        modifyPerkWhenLearning: function(perk) { return perk; },
        levelUpBonus: function() { return new LevelUpBonus() },
    },
    {
        name: "Gnome",
        flavorText: "Gnomes are a very short race of empathic people that have a deep bond with nature.\n" +
            "At their best, gnomes are friendly, calm and wise.\n" +
            "At their worst, gnomes are stubborn, close-minded and vengeful.",
        textDescription: "Every Gnome starts with an Empathy increased by 2.\n" +
            "Also, Gnome’ Agility increases by 1\n" +
            "However, every Gnome’s Strength is reduced by 2.\n" +
            "Gnomes have a supernatural gift that allows them to understand and talk to animals as if\n" +
            "they were speaking their language.\n" +
            "In most situations however, animals have a very short memory and aren’t too intelligent.\n" +
            "Gnomes start the game with 20 Health, 20 Stamina and 30 Mana.",
        statboni: new Stats(-2, 0, 0, 1, 0, 0, 2),
        traitsAsStrings: [ "Gnomes have a supernatural gift that allows them to understand and talk to animals as if they were speaking their language. In most situations however, animals have a very short memory and aren’t too intelligent."],
        startingHealth: 20,
        startingStamina: 20,
        startingMana: 30,
        languages: [ ANIMALS ],
        cpBonus: 0,
        freeAttributePoints: 0,
        modifyAbilityCheck: function(abilityRoll) { return abilityRoll; },
        modifyAttack: function(attackRoll) { return attackRoll; },
        modifyDamage: function(attackRoll, damageRoll) { return damageRoll; },
        modifyIncomingAttack: function(damageRoll) { return damageRoll; },
        modifyIncomingDamage: function(damageRoll) { return damageRoll; },
        modifyPerkWhenLearning: function(perk) { return perk; },
        levelUpBonus: function() { return new LevelUpBonus() },
    },
    {
        name: "Halkaran",
        flavorText: "Halkarans are a very short race of nimble humanoids that enjoy the company of other races, but\n" +
            "also often have their own enclaves to call home.\n" +
            "Halkarans mature at the age of 14, and live to be around 60.\n" +
            "At their best, halkarans are friendly, curious and open-minded.\n" +
            "At their worst, halkarans are naive, intrusive and dishonest",
        textDescription: "Every Halkaran starts with an Agility increased by 1.\n" +
            "Also, Halkarans’ Dexterity increases by 2\n" +
            "However, every Halkaran’s Strength is reduced by 2.\n" +
            "Halkarans are known to have a built-in ability when it comes to throwing things accurately. Many\n" +
            "people have suffered head fractures from Halkaran-thrown stones over the ages. This means that\n" +
            "Halkarans add 1d4 to attack rolls made with throwing weapons.\n" +
            "Additionally, Halkaran’s Luck is a winged word. A Halkaran can reroll one Natural 1 per\n" +
            "day.\n" +
            "Their small size allows them to sneak better. They are always treated to have a stealth perk\n" +
            "1 level higher than they trained it\n" +
            "Halkarans start the game with 25 Health, 25 Stamina and 20 Mana.",
        statboni: new Stats(-2, 0, 2, 1, 0, 0, 0),
        traitsAsStrings: [
            "Halkarans add 1d4 to attack rolls made with throwing weapons.",
            "Halkaran’s Luck is a winged word. A Halkaran can reroll one Natural 1 per day.",
            "Their small size allows them to sneak better. They are always treated to have a stealth perk 1 level higher than they trained it"
        ],
        startingHealth: 25,
        startingStamina: 25,
        startingMana: 20,
        languages: [ ],
        cpBonus: 0,
        freeAttributePoints: 0,
        modifyAbilityCheck: function(abilityRoll) { return abilityRoll; }, // TODO: Their small size allows them to sneak better. They are always treated to have a stealth perk 1 level higher than they trained it
        modifyAttack: function(attackRoll) { return attackRoll; }, // TODO: Halkarans add 1d4 to attack rolls made with throwing weapons.
        modifyDamage: function(attackRoll, damageRoll) { return damageRoll; },
        modifyIncomingAttack: function(damageRoll) { return damageRoll; },
        modifyIncomingDamage: function(damageRoll) { return damageRoll; },
        modifyPerkWhenLearning: function(perk) { return perk; },
        levelUpBonus: function() { return new LevelUpBonus() },
    },
    {
        name: "Humans",
        flavorText: "Humans are a widely spread race of different ethnicities. No other race is as numerous as humans\n" +
            "are. This is due to their high versatility and tenacity, as well as their adaptability.\n" +
            "They mature at 16 and live to around 80.",
        textDescription: "Humans can freely add 4 attribute points, but they can not increase any attribute\n" +
            "above 12 with this.\n" +
            "Additionally, humans can create their character with 1800 CP instead of 1500\n" +
            "Humans start the game with 25 Health, 25 Stamina and 25 Mana.",
        statboni: new Stats(0, 0, 0, 0, 0, 0, 0),
        traitsAsStrings: [ ],
        startingHealth: 25,
        startingStamina: 25,
        startingMana: 25,
        languages: [ ],
        cpBonus: 300,
        freeAttributePoints: 4,
        modifyAbilityCheck: function(abilityRoll) { return abilityRoll; },
        modifyAttack: function(attackRoll) { return attackRoll; },
        modifyDamage: function(attackRoll, damageRoll) { return damageRoll; },
        modifyIncomingAttack: function(damageRoll) { return damageRoll; },
        modifyIncomingDamage: function(damageRoll) { return damageRoll; },
        modifyPerkWhenLearning: function(perk) { return perk; },
        levelUpBonus: function() { return new LevelUpBonus() },
    },
    {
        name: "Iganian",
        flavorText: "Iganians are a proud race of muscular beings with partially mineralized bodies. They are known\n" +
            "to live near volcanic regions.\n" +
            "Iganians mature at the age of 17, and live to be around 90.\n" +
            "At their best, Iganians are honest, loyal and helpful.\n" +
            "At their worst, Iganians are preachy, overbearing and naive",
        textDescription: "Every Iganian starts with an Empathy increased by 2.\n" +
            "Also, Iganians’ Strength increases by 1\n" +
            "However, every Iganian’s Agility is reduced by 2.\n" +
            "Iganians are known for their heat-resistant, mineralized bodies. They have a heat resistance of\n" +
            "+3 and cutting and piercing resistance of +1. This however means that they take double\n" +
            "cold damage.\n" +
            "Iganians start the game with 25 Health, 20 Stamina and 25 Mana.",
        statboni: new Stats(1, 0, 0, -2, 0, 0, 2),
        traitsAsStrings: [ "Iganians are known for their heat-resistant, mineralized bodies. They have a heat resistance of +3 and cutting and piercing resistance of +1. This however means that they take double cold damage." ],
        startingHealth: 25,
        startingStamina: 20,
        startingMana: 25,
        languages: [ ],
        cpBonus: 0,
        freeAttributePoints: 0,
        modifyAbilityCheck: function(abilityRoll) { return abilityRoll; },
        modifyAttack: function(attackRoll) { return attackRoll; },
        modifyDamage: function(attackRoll, damageRoll) { return damageRoll; },
        modifyIncomingAttack: function(damageRoll) { return damageRoll; },
        modifyIncomingDamage: function(damageRoll) { return damageRoll; }, // TODO: "Iganians are known for their heat-resistant, mineralized bodies. They have a heat resistance of +3 and cutting and piercing resistance of +1. This however means that they take double cold damage."
        modifyPerkWhenLearning: function(perk) { return perk; },
        levelUpBonus: function() { return new LevelUpBonus() },
    },
    {
        name: "Oroban",
        flavorText: "Orobans are a stout, short race of beings that live near and inside of mountains in their large\n" +
            "fortresses.\n" +
            "Orobans mature at an age of 23, and live up to 300 years. They tend to become extremely fragile\n" +
            "and senile in the process, but reaching such an extreme age is widely respected in Oroban culture.\n" +
            "At their best, Orobans are friendly, crafty and resourceful.\n" +
            "At their worst, Orobans are bashful, blunt and devious.",
        textDescription: "Orobans start with a Vitality increased by 2.\n" +
            "Also, their Intellect is increased by 1. \n" +
            "Additionally, they gain +2 on checks against poison effects.\n" +
            "Also Orobans can see in dim light normally.\n" +
            "However, they have -2 on Perception checks in daylight and their Agility is reduced by 2\n" +
            "Orobans start the game with 30 Health, 20 Stamina and 20 Mana.",
        statboni: new Stats(0, 2, 0, -2, 1, 0, 0),
        traitsAsStrings: [
            "They gain +2 on checks against poison effects",
            "Orobans can see in dim light normally.",
            "They have -2 on Perception checks in daylight"
        ],
        startingHealth: 30,
        startingStamina: 20,
        startingMana: 20,
        languages: [ ],
        cpBonus: 0,
        freeAttributePoints: 0,
        modifyAbilityCheck: function(abilityRoll) { return abilityRoll; },
        modifyAttack: function(attackRoll) { return attackRoll; },
        modifyDamage: function(attackRoll, damageRoll) { return damageRoll; },
        modifyIncomingAttack: function(damageRoll) { return damageRoll; },
        modifyIncomingDamage: function(damageRoll) { return damageRoll; },
        modifyPerkWhenLearning: function(perk) { return perk; },
        levelUpBonus: function() { return new LevelUpBonus() },
    },
    {
        name: "Syka",
        flavorText: "Syka are a wiry people of humanoids living in remote mountain villages. They also call some of\n" +
            "the flying fortresses of the world their home.\n" +
            "Syka mature at the age of 25, and live to be around 120.\n" +
            "At their best, Syka are witty, funny and charismatic.\n" +
            "At their worst, Syka are carefree, smug and condescending.",
        textDescription: "Every Syka starts with an Agility increased by 2.\n" +
            "Also, Sykas’ Perception is increased by 1\n" +
            "However, every Syka’s Vitality is reduced by 1\n" +
            "Syka have the ability to jump double the height and distance than normally and thanks\n" +
            "to their natural affinity to the air element they require half the amount of CP to learn\n" +
            "Air-related perks, like the Air rune.\n" +
            "Syka start the game with 20 Health, 20 Stamina and 30 Mana.",
        statboni: new Stats(0, -1, 0, 2, 0, 1, 0),
        traitsAsStrings: [
            "Syka have the ability to jump double the height and distance than normally",
            "Thanks to their natural affinity to the air element they require half the amount of CP to learn Air-related perks, like the Air rune"
        ],
        startingHealth: 20,
        startingStamina: 20,
        startingMana: 30,
        languages: [ ],
        cpBonus: 0,
        freeAttributePoints: 0,
        modifyAbilityCheck: function(abilityRoll) { return abilityRoll; },
        modifyAttack: function(attackRoll) { return attackRoll; },
        modifyDamage: function(attackRoll, damageRoll) { return damageRoll; },
        modifyIncomingAttack: function(damageRoll) { return damageRoll; },
        modifyIncomingDamage: function(damageRoll) { return damageRoll; },
        modifyPerkWhenLearning: function(perk) { return perk; }, // TODO: Air related runes
        levelUpBonus: function() { return new LevelUpBonus() },
    },
    {
        name: "Umbrana",
        flavorText: "Umbrana are a brawny and strong, and very ugly race of humanoids that hail from the Ruins of\n" +
            "Shadowdusk. They enjoy human company - a usually one-sided pleasure. They often times try to\n" +
            "fit into human society - especially higher society.\n" +
            "Umbrana mature at the age of 18, and live to be around 100.\n" +
            "At their best, Umbrana are helpful, friendly and well-mannered.\n" +
            "At their worst, Umbrana are insecure, distractable and superficial.",
        textDescription: "Every Umbrana starts with a Strength and Intellect increased by 2.\n" +
            "However, every Umbrana’s Empathy is reduced by 2\n" +
            "Also, their Agility is reduced by 1\n" +
            "Due to their magical nature, Umbrana have an affinity for Magic. They gain +2 Mana for\n" +
            "each level of ”Increase Mana” that they gain.\n" +
            "Also, they gain an additional 2 resistance to damage from spells. This resistance triggers\n" +
            "last in the line of resistances. For every point of damage it absorbs, the Umbrana\n" +
            "regenerates 1 Mana\n" +
            "Umbrana start the game with 25 Health, 20 Stamina and 25 Mana.",
        statboni: new Stats(2, 0, 0, -1, 2, 0, -2),
        traitsAsStrings: [
            "Due to their magical nature, Umbrana have an affinity for Magic. They gain +2 Mana for each level of ”Increase Mana” that they gain",
            "They gain an additional 2 resistance to damage from spells. This resistance triggers last in the line of resistances. For every point of damage it absorbs, the Umbrana regenerates 1 Mana"
        ],
        startingHealth: 20,
        startingStamina: 20,
        startingMana: 30,
        languages: [ ],
        cpBonus: 0,
        freeAttributePoints: 0,
        modifyAbilityCheck: function(abilityRoll) { return abilityRoll; },
        modifyAttack: function(attackRoll) { return attackRoll; },
        modifyDamage: function(attackRoll, damageRoll) { return damageRoll; },
        modifyIncomingAttack: function(damageRoll) { return damageRoll; },
        modifyIncomingDamage: function(damageRoll) { return damageRoll; }, // TODO: "They gain an additional 2 resistance to damage from spells. This resistance triggers last in the line of resistances. For every point of damage it absorbs, the Umbrana regenerates 1 Mana"
        modifyPerkWhenLearning: function(perk) { return perk; }, // TODO: "Due to their magical nature, Umbrana have an affinity for Magic. They gain +2 Mana for each level of ”Increase Mana” that they gain"
        levelUpBonus: function() { return new LevelUpBonus() },
    },
]
