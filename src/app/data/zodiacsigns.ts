import {ZodiacSign} from "../classes/zodiacsign";
import {Background} from "../classes/background";


export function getAllZodiacSigns() : ZodiacSign[] { return ZODIAC_SIGNS; }
const ZODIAC_SIGNS: ZodiacSign[] = [
    {
        name: "The Horseman",
        startDate: "1. Deepwinter",
        endDate: "9. Thawflight",
        description: "Those born under the sign of The Horseman are flexible, spontaneous and outgoing, but also tend to be indecisive.<br/><br/>" +
            "As someone born under the sign of The Horseman, you can increase your Agility by 2 for 10 Minutes once per day. " +
            "This increase can go above your race’s maximum Agility. You can do so as par of any other action you’re performing."
    },
    {
        name: "The Worker",
        startDate: "10. Thawflight",
        endDate: "18. Showerhome ",
        description: "Those born under the sign of The Worker are reliable, diligent and honorable, but also tend to be thick-headed.<br/><br/>" +
            "As someone born under the sign of The Worker, you can gain 5 temporary Stamina + 2 temporary stamina for " +
            "each level of ”Increase Stamina” that you have for 10 minutes once per day. These temporary stamina are used up after the " +
            "rest of your stamina, and you lose the leftover temporary stamina after 10 minutes. You can do so as part " +
            "of any other action you’re performing."
    },
    {
        name: "The Cave",
        startDate: "19 Showerhome",
        endDate: "27.Blossombreak",
        description: "Those born under the sign of The Cave are curious, smart and fast-thinking, but also tend to have short attention spans.<br/><br/>" +
            "As someone born under the sign of The Cave, you can increase your Perception by 2 for 10 Minutes once per day. " +
            "This increase can go above your race’s maximum Perception. You can do so as part of any other action you’re performing."
    },
    {
        name: "The Crown",
        startDate: "28. Blossombreak",
        endDate: "6.First Harvest",
        description: "Those born under the sign of The Crown are helpful, friendly and open-minded, but also tend to try and avoid conflicts.<br/><br/>" +
            "As someone born under the sign of The Crown, you can increase your Empathy by 2 for 10 Minutes once per day. " +
            "This increase can go above your race’s maximum Empathy. You can do so as part of any other action you’re performing"
    },
    {
        name: "The Hero",
        startDate: "7. First Harvest",
        endDate: "15. Fairterm",
        description: "Those born under the sign of The Hero are helpful, selfless and assertive, but also tend to be brash and overly emotional.<br/><br/>" +
            "As someone born under the sign of The Hero, once per day when a creature in an area of 5 passus around " +
            "you would take damage from a single source, you can decide to reduce that damage by half, taking the other " +
            "half. This includes all types of damage taken, and every type of damage is halved and rounded by itself."
    },
    {
        name: "The Eagle",
        startDate: "16. Fairterm",
        endDate: "24. Second Harvest",
        description: "Those born under the sign of The Eagle are free-thinking, open-minded and relaxed, but also tend to be unemotional.<br/><br/>" +
            "As someone born under the sign of The Eagle, you can increase your Dodge by 4 for 2 minutes once per day. " +
            "You can do so as part of any other action you’re performing."
    },
    {
        name: "The Mountain",
        startDate: "25. Second Harvest",
        endDate: "3.Last Harvest",
        description: "Those born under the sign of The Mountain are stoic, confident and disciplined, but also tend to be slow.<br/><br/>" +
            "As someone born under the sign of The Mountain, you can gain 5 temporary Health + 2 temporary Health per " +
            "Level of ”Increase Health” you have for 10 minutes once per day. You can do so as part of any other action you’re performing."
    },
    {
        name: "The Quill",
        startDate: "4. Last Harvest",
        endDate: "12.Gods’ Rest",
        description: "Those born under the sign of The Quill are resourceful, crafty and cunning, but also tend to be greedy.<br/><br/>" +
            "As someone born under the sign of The Quill, you can increase your Dexterity by 2 for 10 Minutes once per day. " +
            "This increase can go above your race’s maximum Dexterity. You can do so as part of any other action you’re performing."
    },
    {
        name: "The Shield",
        startDate: "13. Gods’ Rest",
        endDate: "21. Darkfall",
        description: "Those born under the sign of The Shield are stoic, reliable and confident, but tend to be overzealous<br/><br/>" +
            "As someone born under the sign of The Shield, you can gain +2 Resistance against Cutting, Blunt and " +
            "Piercing damage for 2 Minutes per day. You can do so as part of any other action you’re performing."
    },
    {
        name: "The Flower",
        startDate: "22. Darkfall",
        endDate: "30. Coldheart",
        description: "Those born under the sign of The Flower are graceful, resilient and focused, but tend to be aloof.<br/><br/>" +
            "As someone born under the sign of The Flower, you can gain 5 Mana + 2 Mana per Level of ”Increase Mana” " +
            "that you have for 10 minutes once per day. These Mana Points are used before the rest of your Mana. " +
            "You can do so as part of any other action you’re performing."
    },
    {
        name: "The Fateless",
        startDate: "1. Week of Darkness",
        endDate: "10. Week of Darkness",
        description: "Those born under the sign of the Fateless don’t really share any traits in common, but their birth is said to be an ill omen for the days to come.<br/><br/>" +
            "As someone born under the sign of The Fateless, you may repeat a roll you made once per day. " +
            "If this roll is a check (i.e. a D20 roll) and the second result is lower, you take 1 untyped damage per " +
            "Point of difference between the two rolls (i.e. when your first roll was 7 and your second was 3, you’d " +
            "take 4 untyped damage), and the task automatically fails as if your total result was a 0."
    },
]
