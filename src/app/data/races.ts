import {Race} from "../classes/race";
import {LevelUpBonus} from "../classes/levelupbonus";
import {Stats} from "../classes/stats";
import {ANIMALS} from "./languages";
import {zeroStats} from "./stats";
import produce from "immer";

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
        conditionalStatbonis: [],
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
        conditionalStatbonis: [],
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
        flavorText: "Elves are a short-growing people of mountain- and forest dwellers that like to avoid human contact. <br/> <br/>" +
            "Elves mature at an age of 30, and can live to be 200. <br/>" +
            "At their best, elves are cautious, reliable and loyal. <br/>" +
            "At their worst, elves are removed, mistrusting and superstitious. <br/>" +
            "Bark Elves have skin alike to wood and leaves. It is extremely difficult to spot them in forested terrain",
        textDescription: "Every Elve starts with an Agility increased by 2. <br />" +
            "Also, every Elve’s Dexterity increases by 1 <br />" +
            "Also, every Elve’s Intellect is reduced by 1. <br />" +
            "In forested terrain, they can attempt to hide in plain sight and when doing so they can add +1d4 on their stealth check <br/> <br/>" +
            "Elves start the game with 20 Health, 25 Stamina and 25 Mana <br /> ",
        statboni: new Stats(0, 0, 1, 2, -1, 0, 0),
        conditionalStatbonis: [],
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
        flavorText: "Fay are a race of tall-standing, fair skinned creatures that have adapted to different environments through magical means.<br /><br />" +
            "Fay mature at an age of 50, and can live up to 500 years - there is however no known case of a fay dying of old age.<br />" +
            "At their best, fay are reliable, honest and knowledgable.<br />" +
            "At their worst, fay are hard-headed, aloof and emotionless.<br />" +
            "Molfay (Marshland Fay) have adapted to have webbing and be able to swim in freshwate",
        textDescription: "Every Fay starts with an Intellect increased by 2.<br />" +
            "Also, every Fay’s Empathy is reduced by 1.<br />" +
            "Molfay have a Vitality increased by 1 and can hold their breath twice as long as normal in freshwater <br /><br />" +
            "Fay start the game with 20 Health, 20 Stamina and 30 Mana.",
        statboni: new Stats(0, 1, 0, 0, 2, 0, -1),
        conditionalStatbonis: [],
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
        flavorText: "Fay are a race of tall-standing, fair skinned creatures that have adapted to different environments through magical means.<br /><br />" +
            "Fay mature at an age of 50, and can live up to 500 years - there is however no known case of a fay dying of old age .<br />" +
            "At their best, fay are reliable, honest and knowledgable .<br />" +
            "At their worst, fay are hard-headed, aloof and emotionless .<br />" +
            "Trilfay (Deep Fay) have adapted to be able to move around swiftly in sands and resist the darkness of the deep",
        textDescription: "Every Fay starts with an Intellect increased by 2.<br />" +
            "Also, every Fay’s Empathy is reduced by 1.<br />" +
            "Trilfay can see in complete darkness as if it were daylight. However, they can not discern colour this way. <br />" +
            "Also, their Strength is increased by 1<br /><br />" +
            "Fay start the game with 20 Health, 20 Stamina and 30 Mana.",
        statboni: new Stats(1, 0, 0, 0, 2, 0, -1),
        conditionalStatbonis: [],
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
        flavorText: "Fay are a race of tall-standing, fair skinned creatures that have adapted to different environments through magical means.<br /><br />" +
            "Fay mature at an age of 50, and can live up to 500 years - there is however no known case of a fay dying of old age.<br />" +
            "At their best, fay are reliable, honest and knowledgable.<br />" +
            "At their worst, fay are hard-headed, aloof and emotionless.<br />" +
            "Marfay (Woodland Fay) have adapted to be excellent climbers, and can swing from tree to tree without effort.",
        textDescription: "Every Fay starts with an Intellect increased by 2.<br />" +
            "Also, every Fay’s Empathy is reduced by 1.<br />" +
            "A Woodland Fay moves at the same speed when climbing trees as running and their Agility is increased by 1<br /><br />" +
            "Fay start the game with 20 Health, 20 Stamina and 30 Mana.",
        statboni: new Stats(0, 0, 0, 1, 2, 0, -1),
        conditionalStatbonis: [],
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
        flavorText: "Fay are a race of tall-standing, fair skinned creatures that have adapted to different environments through magical means.<br /><br />" +
            "Fay mature at an age of 50, and can live up to 500 years - there is however no known case of a fay dying of old age.<br />" +
            "At their best, fay are reliable, honest and knowledgable.<br />" +
            "At their worst, fay are hard-headed, aloof and emotionless.<br />" +
            "Plafay (Grassland Fay) have adapted perfectly to steppes, being able to track creatures perfectly and move around in plains and rolling hills",
        textDescription: "Every Fay starts with an Intellect increased by 2.<br />" +
            "Also, every Fay’s Empathy is reduced by 1.<br />" +
            "Their Perception is increased by 1 and running doesn’t cost them stamina. <br /><br />" +
            "Fay start the game with 20 Health, 20 Stamina and 30 Mana.",
        statboni: new Stats(0, 0, 0, 0, 2, 1, -1),
        conditionalStatbonis: [],
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
        flavorText: "Gnomes are a very short race of empathic people that have a deep bond with nature.<br /><br />" +
            "At their best, gnomes are friendly, calm and wise.<br />" +
            "At their worst, gnomes are stubborn, close-minded and vengeful.",
        textDescription: "Every Gnome starts with an Empathy increased by 2.<br />" +
            "Also, Gnome’ Agility increases by 1<br />" +
            "However, every Gnome’s Strength is reduced by 2.<br />" +
            "Gnomes have a supernatural gift that allows them to understand and talk to animals as if they were speaking their language.<br />" +
            "In most situations however, animals have a very short memory and aren’t too intelligent.<br /><br />" +
            "Gnomes start the game with 20 Health, 20 Stamina and 30 Mana.",
        statboni: new Stats(-2, 0, 0, 1, 0, 0, 2),
        conditionalStatbonis: [],
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
        flavorText: "Halkarans are a very short race of nimble humanoids that enjoy the company of other races, but also often have their own enclaves to call home.<br /><br />" +
            "Halkarans mature at the age of 14, and live to be around 60.<br />" +
            "At their best, halkarans are friendly, curious and open-minded.<br />" +
            "At their worst, halkarans are naive, intrusive and dishonest",
        textDescription: "Every Halkaran starts with an Agility increased by 1.<br />" +
            "Also, Halkarans’ Dexterity increases by 2<br />" +
            "However, every Halkaran’s Strength is reduced by 2.<br />" +
            "Halkarans are known to have a built-in ability when it comes to throwing things accurately. " +
            "Many people have suffered head fractures from Halkaran-thrown stones over the ages. " +
            "This means that Halkarans add 1d4 to attack rolls made with throwing weapons.<br />" +
            "Additionally, Halkaran’s Luck is a winged word. A Halkaran can reroll one Natural 1 per day.<br />" +
            "Their small size allows them to sneak better. They are always treated to have a stealth perk 1 level higher than they trained it<br /><br />" +
            "Halkarans start the game with 25 Health, 25 Stamina and 20 Mana.",
        statboni: new Stats(-2, 0, 2, 1, 0, 0, 0),
        conditionalStatbonis: [],
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
        flavorText: "Humans are a widely spread race of different ethnicities. No other race is as numerous as humans are. " +
            "This is due to their high versatility and tenacity, as well as their adaptability.<br /><br />" +
            "They mature at 16 and live to around 80.",
        textDescription: "Humans can freely add 4 attribute points, but they can not increase any attribute above 12 with this.<br />" +
            "Additionally, humans can create their character with 1800 CP instead of 1500<br /><br />" +
            "Humans start the game with 25 Health, 25 Stamina and 25 Mana.",
        statboni: zeroStats(),
        conditionalStatbonis: [],
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
        flavorText: "Iganians are a proud race of muscular beings with partially mineralized bodies. They are known to live near volcanic regions.<br /><br />" +
            "Iganians mature at the age of 17, and live to be around 90.<br />" +
            "At their best, Iganians are honest, loyal and helpful.<br />" +
            "At their worst, Iganians are preachy, overbearing and naive",
        textDescription: "Every Iganian starts with an Empathy increased by 2.<br />" +
            "Also, Iganians’ Strength increases by 1<br />" +
            "However, every Iganian’s Agility is reduced by 2.<br />" +
            "Iganians are known for their heat-resistant, mineralized bodies. " +
            "They have a heat resistance of +3 and cutting and piercing resistance of +1. " +
            "This however means that they take double cold damage.<br /><br />" +
            "Iganians start the game with 25 Health, 20 Stamina and 25 Mana.",
        statboni: new Stats(1, 0, 0, -2, 0, 0, 2),
        conditionalStatbonis: [],
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
        flavorText: "Orobans are a stout, short race of beings that live near and inside of mountains in their large fortresses.<br /><br />" +
            "Orobans mature at an age of 23, and live up to 300 years. They tend to become extremely fragile<br />" +
            "and senile in the process, but reaching such an extreme age is widely respected in Oroban culture.<br />" +
            "At their best, Orobans are friendly, crafty and resourceful.<br />" +
            "At their worst, Orobans are bashful, blunt and devious.",
        textDescription: "Orobans start with a Vitality increased by 2.<br />" +
            "Also, their Intellect is increased by 1. <br />" +
            "Additionally, they gain +2 on checks against poison effects.<br />" +
            "Also Orobans can see in dim light normally.<br />" +
            "However, they have -2 on Perception checks in daylight and their Agility is reduced by 2<br /><br />" +
            "Orobans start the game with 30 Health, 20 Stamina and 20 Mana.",
        statboni: new Stats(0, 2, 0, 0, 1, 0, 0),
        conditionalStatbonis: [
            { condition: "In daylight", statboni: new Stats(0, 0, 0, -2, 0, 0, 0) }
        ],
        traitsAsStrings: [
            "They gain +2 on checks against poison effects",
            "Orobans can see in dim light normally.",
            "They have -2 on Perception checks in daylight and their Agility is reduced by 2"
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
        flavorText: "Syka are a wiry people of humanoids living in remote mountain villages. They also call some of the flying fortresses of the world their home.<br /><br />" +
            "Syka mature at the age of 25, and live to be around 120.<br />" +
            "At their best, Syka are witty, funny and charismatic.<br />" +
            "At their worst, Syka are carefree, smug and condescending.",
        textDescription: "Every Syka starts with an Agility increased by 2.<br />" +
            "Also, Sykas’ Perception is increased by 1<br />" +
            "However, every Syka’s Vitality is reduced by 1<br />" +
            "Syka have the ability to jump double the height and distance than normally and thanks to their natural affinity to " +
            "the air element they require half the amount of CP to learn Air-related perks, like the Air rune.<br /><br />" +
            "Syka start the game with 20 Health, 20 Stamina and 30 Mana.",
        statboni: new Stats(0, -1, 0, 2, 0, 1, 0),
        conditionalStatbonis: [],
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
        flavorText: "Umbrana are a brawny and strong, and very ugly race of humanoids that hail from the Ruins of Shadowdusk. " +
            "They enjoy human company - a usually one-sided pleasure. They often times try to fit into human society - especially higher society.<br /><br />" +
            "Umbrana mature at the age of 18, and live to be around 100.<br />" +
            "At their best, Umbrana are helpful, friendly and well-mannered.<br />" +
            "At their worst, Umbrana are insecure, distractable and superficial.",
        textDescription: "Every Umbrana starts with a Strength and Intellect increased by 2.<br />" +
            "However, every Umbrana’s Empathy is reduced by 2<br />" +
            "Also, their Agility is reduced by 1<br />" +
            "Due to their magical nature, Umbrana have an affinity for Magic. They gain +2 Mana for each level of ”Increase Mana” that they gain.<br />" +
            "Also, they gain an additional 2 resistance to damage from magic. This resistance triggers last in the line of resistances. For every point of damage it absorbs, the Umbrana regenerates 1 Mana<br /><br />" +
            "Umbrana start the game with 25 Health, 20 Stamina and 25 Mana.",
        statboni: new Stats(2, 0, 0, -1, 2, 0, -2),
        conditionalStatbonis: [],
        traitsAsStrings: [
            'Due to their magical nature, Umbrana have an affinity for Magic. They gain +2 Mana for each level of ”Increase Mana” that they gain <span style="font-size: 1em; vertical-align: sub;" data-tippy-content="Already included in calculated max mana" class="material-icons-outlined">help_outline</span>',
            "They gain an additional 2 resistance to damage from magic. This resistance triggers last in the line of resistances. For every point of damage it absorbs, the Umbrana regenerates 1 Mana"
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
        modifyIncomingDamage: function(damageRoll) { return damageRoll; }, // TODO: "They gain an additional 2 resistance to damage from magic. This resistance triggers last in the line of resistances. For every point of damage it absorbs, the Umbrana regenerates 1 Mana"
        modifyPerkWhenLearning: function(pal) {
            if(pal.perk.name == "Increase Mana") {
                let oldAdditionalFixedIncrease = pal.perk.additionalData.additionalFixedIncrease;
                let newAdditionalFixedIncrease = oldAdditionalFixedIncrease + 2 * pal.level;

                return produce(pal, draft => {
                    pal.perk.additionalData.additionalFixedIncrease = newAdditionalFixedIncrease;
                });
            }
            return pal;
        },
        levelUpBonus: function() { return new LevelUpBonus() },
    },
]
