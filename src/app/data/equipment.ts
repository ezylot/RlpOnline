import {Equipment} from "../classes/equipment/equipment";
import {Armor, ArmorType, Resist} from "../classes/equipment/armor";
import {Hat} from "../classes/equipment/hat";
import {Glove} from "../classes/equipment/gloves";
import {Boot} from "../classes/equipment/boot";
import {Ring} from "../classes/equipment/ring";
import {produce} from "immer";
import {Necklace} from "../classes/equipment/necklace";
import {Belt} from "../classes/equipment/belt";

export const TAGS = {
    UNDER: "Under",
    OVER: "Over",
    SHIELDING: "Shielding",
    INSULATING: "Insulating",
    LIVING: "Living",
    FLAMMABLE: "Flammable",
    HORRID: "Horrid",
    LIGHTWEIGHT: "Lightweight",
    MAGIC_DEFENSE: "Magic Defense",
    ELEMENTAL_DEFENSE: "Elemental Defense",
    INDESTRUCTIBLE: "Indestructible",
    POCKETS(size: string): string { return `Pockets(${size})`},
    WARMING(amount: number): string { return `Warming(${amount})`},
    COOLING(amount: number): string { return `Cooling(${amount})`},
    ENCHANTABLE(amount: number): string { return `Enchantable(${amount})`},
};


export function getAllEquipment() : Equipment[] { return EQUIPMENT; }
export function getEquipmentByName(equipmentName: string): Equipment {
    let foundEquipment = getAllEquipment().find(value => value.name === equipmentName);
    if(foundEquipment == undefined) throw new Error("Could not find equipment with name: " + equipmentName);
    return foundEquipment;
}

export function getTagDescription(tag: string): string {
    if(tag.startsWith(TAGS.FLAMMABLE)) return "An Armor with this attribute easily catches fire. Whenever a character wearing it would take heat damage, the armor starts to burn. Read RLP for further information.";
    if(tag.startsWith(TAGS.HORRID)) return "An Armor with the horrid attribute has dark energies associated with it. When the wearer of such armor takes necrose or psychic damage, they take an additional 3 damage from that damage source.";
    if(tag.startsWith(TAGS.UNDER)) return "An armor with the ”under” attribute can be worn under any ”over” armor. When both armors grant resistances to a damage type, do not add them together. Instead, the larger respective resistance count. Wearing two pieces of armor reduces a character’s Agility by 2, to a minimum of 1.";
    if(tag.startsWith(TAGS.OVER)) return "An armor with the ”over” attribute can be worn over any ”under” armor. When both armors grant resistances to a damage type, do not add them together. Instead, the larger respective resistance count. Wearing two pieces of armor reduces a character’s Agility by 2, to a minimum of 1.";
    if(tag.startsWith(TAGS.LIVING)) return "An Armor with this attribute grants damage resistance to Necrotic damage by the amount specified.";
    if(tag.startsWith(TAGS.INSULATING)) return "An Armor with this attribute grants damage resistance to Electrical damage by the amount specified.";
    if(tag.startsWith(TAGS.SHIELDING)) return "An Armor with this attribute grants damage resistance to Radiation damage by the amount specified.";
    if(tag.startsWith(TAGS.LIGHTWEIGHT)) return "An Armor with the Leightweight attribute reduces the wearer’s Agility as if it were one Weight class lower. Additionally, if the wearer of said armor is more proficient in the lower weight class than the armor’s actual weight class, he can benefit from the lower proficiency as if the armor was one weight class lower.";
    if(tag.startsWith(TAGS.MAGIC_DEFENSE)) return "An Armor with this attribute grants additional damage resistance to damage from spells, by the amount specified";
    if(tag.startsWith(TAGS.ELEMENTAL_DEFENSE)) return "An Armor with this attribute grants damage resistance to elemental damage by the amount specified, if no other aspect of the armor already grants larger resistance to that element.";
    if(tag.startsWith(TAGS.INDESTRUCTIBLE)) return "An Armor with this attribute grants damage resistance to Corrosion and Nihilation damage by the amount specified.";


    if(tag.startsWith('Pockets')) return "An armor with Pockets has the ability to hold a certain amount of items in its pockets.";
    if(tag.startsWith('Warming')) return "An Armor with this attribute helps against the cold. It grants resistance to cold by the value specified.";
    if(tag.startsWith('Cooling')) return "An Armor with this attribute helps against the heat. It grants resistance to heat by the value specified.";
    if(tag.startsWith('Enchantable')) return "An Armor that has this attribute can be enchanted a different amount than just once. It can instead hold an amount of Enchantments by the number specified. This means that any armor that doesn’t have the ”Enchantable” attribute specified has the ”Enchantable 1”.";

    return "Tag has no description yet";
}

const EQUIPMENT: Equipment[] = [

    //<editor-fold defaultstate="collapsed" desc="CLOTH ARMOR">
    new Armor(ArmorType.CLOTHING, "Linen Jacket", new Resist(1, 0, 0), [ TAGS.UNDER, TAGS.POCKETS("4S") ], "M", "40G"),
    new Armor(ArmorType.CLOTHING, "Fleece Jacket", new Resist(1, 0, 0), [ TAGS.WARMING(1), TAGS.POCKETS("4S") ], "M", "60G"),
    new Armor(ArmorType.CLOTHING, "Linen Robes", new Resist(1, 0, 0), [ TAGS.OVER, TAGS.POCKETS("2S"), TAGS.ENCHANTABLE(2) ], "M", "85G"),
    new Armor(ArmorType.CLOTHING, "Fleece Robes", new Resist(1, 0, 0), [ TAGS.WARMING(1), TAGS.OVER, TAGS.POCKETS("2S"), TAGS.ENCHANTABLE(2) ], "M", "70G"),
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="LIGHT ARMOR">
    new Armor(ArmorType.LIGHT, "Fur Jacket", new Resist(1, 1, 1), [TAGS.WARMING(2), TAGS.UNDER, TAGS.POCKETS("2S")] ,"M" ,"100G"),
    new Armor(ArmorType.LIGHT, "Leather Jacket", new Resist(2, 2, 2), [TAGS.WARMING(1), TAGS.COOLING(1), TAGS.UNDER, TAGS.POCKETS("4S")] ,"M" ,"250G"),
    new Armor(ArmorType.LIGHT, "Linen Gambeson", new Resist(2, 1, 3), [TAGS.WARMING(1), TAGS.UNDER, TAGS.POCKETS("3S")] ,"L" ,"180G"),
    new Armor(ArmorType.LIGHT, "Fleece Gambeson", new Resist(3, 2, 4), [TAGS.WARMING(1), TAGS.UNDER, TAGS.POCKETS("3S")] ,"L" ,"250G"),
    new Armor(ArmorType.LIGHT, "Bronze Chain Shirt", new Resist(5, 2, 2), [TAGS.OVER, TAGS.UNDER, TAGS.POCKETS ("2S")] ,"M" ,"700G"),
    new Armor(ArmorType.LIGHT, "Iron Chain Shirt", new Resist(7, 3, 3), [TAGS.OVER, TAGS.UNDER, TAGS.POCKETS("2S")] ,"M" ,"1200G"),

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="MEDIUM ARMOR">
    new Armor(ArmorType.MEDIUM, "Fur Gambeson", new Resist(2, 1, 3), [TAGS.WARMING(2), TAGS.UNDER, TAGS.POCKETS("3S")], "L", "225G"),
    new Armor(ArmorType.MEDIUM, "Leather Gambeson", new Resist(4, 2, 5), [TAGS.WARMING(1), TAGS.COOLING(1), TAGS.UNDER,TAGS.POCKETS("3S")] ,"L" ,"450G"),
    new Armor(ArmorType.MEDIUM, "Bronze Brigandine", new Resist(5, 4, 5), [TAGS.POCKETS("2S")] ,"L" ,"700G"),
    new Armor(ArmorType.MEDIUM, "Iron Brigandine", new Resist(7, 7, 7), [TAGS.POCKETS("2S")] ,"L" ,"1400G"),
    new Armor(ArmorType.MEDIUM, "Steel Brigandine", new Resist(7, 7, 7), [TAGS.POCKETS("2S")] ,"L" ,"2400G"),
    new Armor(ArmorType.MEDIUM, "Bronze Scale Mail", new Resist(8, 4, 4), [TAGS.POCKETS("2S")] ,"L" ,"800G"),
    new Armor(ArmorType.MEDIUM, "Iron Scale Mail", new Resist(9, 5, 5), [TAGS.POCKETS("2S")] ,"L" ,"1540G"),
    new Armor(ArmorType.MEDIUM, "Steel Scale Mail", new Resist(9, 5, 5), [TAGS.POCKETS("2S")] ,"L" ,"2640G"),

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="HEAVY ARMOR">
    new Armor(ArmorType.HEAVY, "Bronze Half Plate", new Resist(8, 8, 5), [TAGS.OVER, TAGS.POCKETS("2S")] ,"L" ,"350G"),
    new Armor(ArmorType.HEAVY, "Iron Half Plate", new Resist(11, 11, 7), [TAGS.OVER, TAGS.POCKETS("2S")] ,"L" ,"800G"),
    new Armor(ArmorType.HEAVY, "Steel Half Plate", new Resist(11, 11, 7), [TAGS.OVER, TAGS.POCKETS("2S")] ,"L" ,"2500G"),
    new Armor(ArmorType.HEAVY, "Bronze Full Plate", new Resist(9, 9, 7), [TAGS.OVER, TAGS.POCKETS("2S")] ,"L" ,"750G"),
    new Armor(ArmorType.HEAVY, "Iron Full Plate", new Resist(12, 12, 10), [TAGS.OVER, TAGS.POCKETS("2S")] ,"XL" ,"1500G"),
    new Armor(ArmorType.HEAVY, "Steel Full Plate", new Resist(12, 12, 10), [TAGS.OVER, TAGS.POCKETS("2S")] ,"XL" ,"3200G"),
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="HATS">
    new Hat("Knights Helmet", "100G", "M", "The knight’s helmet is a full metal helmet with a visor. It reduces the wearer’s perception by 2, to a minimum of 1. If the wearer of this helmet is subject to a critical hit from a weapon attack, the attacker must roll a d6. On a 1, the attack does not deal additional damage from being a critical hit.",
        character => produce(character, draft => {
            draft.statcap.perception = draft.statcap.perception - 2;
        })),
    new Hat("Mages’ Hat", "150G", "M", "The mages’ hat is a signifier of a studied magister of magic. It is pointy and made of magical silk. While wearing a Mages’ Hat, the wearer can remember 4 additional spells."),
    new Hat("Leather Helmet", "20G", "M", "The Leather Helmet is a simple cap made of leather, with straps on the sides. If the wearer of this helmet is subject to a critical hit from a weapon attack, the attacker must roll a d12. On a 1, the attack does not deal additional damage from being a critical hit."),
    new Hat("Hood", "5G", "M", "This hood protects the wearer’s head of wind and rain and makes it more difficult to ee their face from the side."),
    new Hat("Skullcap", "50G", "M", "This metal cap hugs the wearer’s skull in order to protect it. If the wearer of this helmet is subject to a critical hit from a weapon attack, the attacker must roll a d8. On a 1, the attack does not deal additional damage from being a critical hit."),
    new Hat("Faceless Mask", "70G", "M", "This special mask is completely featureless. It blocks the user’s sight, making them effectively blind. However, it also increases their concentration. While wearing a faceless mask, the mana costs for spell upkeep is halved"),
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="GLOVES">
    new Glove("Leather Gloves", "5G", "S", "These Leather Gloves protect the hands."),
    new Glove("Gauntlets", "50G", "S", "These Gauntlets protect the hands. When the wearer is targeted disarming attempt, they can add 5 to their opposing weapon attack roll. Also, the wearer’s unarmed attacks deal 1d8 damage instead of 1d4."),
    new Glove("Silk Gloves", "15G", "S", "These gloves protect against the weather and help the wearer with delicate work. When doing something filigree that requires a Dexterity check, the wearer can add 2 to that check"),
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="BOOT">
    new Boot("Cloth boots", "2G", "S", "These boots provide basic protection from natural hazards without reducing agility."),
    new Boot("Leather boots", "5G", "S", "These boots provide further protection from natural hazards without reducing agility."),
    new Boot("Sabaton", "50G", "S", "These metallic boots provide advanced protection from natural hazards, but reduce the wearer’s Agility by 1.",
        character => produce(character, draft => {
            draft.stats.agility -= 1;
        })),
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="RING">
    new Ring("Ring of Protection", "500G", "T", "This ring increases the wearer’s resistance to blunt, piercing and cutting by 1.",
        character => produce(character, draft => {
            // TODO: add resistances
        })),
    new Ring("Fox Ring", "1000G", "T", "This ring increases the wearer’s agility by 1.",
        character => produce(character, draft => {
            draft.stats.agility += 1;
        })),
    new Ring("Ring of Health", "2500G", "T", "This ring increases the wearer’s health by 4 for every level of Increase Health that they have.",
        character => {
            const incHealthPal = character.perks.find(value => value.perk.name === "Increase Health")
            if(incHealthPal === undefined) return character;

            return produce(character, draft => {
                draft.maxHealth = draft.maxHealth.increaseFixed(4 * incHealthPal.level);
            });
        }),
    new Ring("Ring of Might", "1000G", "T", "This ring increases the wearer’s strength by 1.",
        character => produce(character, draft => {
            draft.stats.strength += 1;
        })),
    new Ring("Ring of the Mage", "2500G", "T", "This ring increases the wearer’s mana by 4 for every level of Increase Mana that they have.",
        character => {
            const incManaPal = character.perks.find(value => value.perk.name === "Increase Mana")
            if(incManaPal === undefined) return character;

            return produce(character, draft => {
                draft.maxMana = draft.maxMana.increaseFixed(4 * incManaPal.level);
            });
        }),
    new Ring("Ring of Stars", "5000G", "T", "This ring can be activated by the wearer by taking 4 AP to speak the ring’s command phrase. When doing so, the wearer gains +3 on Intellect, Perception and Empathy for the next 10 minutes. The ring then ceases to function for the next 24 hours."),
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="NECKLACE">
    new Necklace("Amulet of the Lord", "1000G", "S", "This amulet increases the wearer’s Empathy by 1.", character => produce(character, draft => { draft.stats.empathy += 1 })),
    new Necklace("Amulet of Vitality", "1000G", "S", "This amulet increases the wearer’s Vitality by 1.", character => produce(character, draft => { draft.stats.vitality += 1 })),
    new Necklace("Amulet of Fatigue", "2500G", "S", "This amulet increases the wearer’s Stamina by 2 for every level of Increase Stamina that they have.", character => produce(character, draft => {
        const incStaminaPal = character.perks.find(value => value.perk.name === "Increase Stamina")
        if(incStaminaPal === undefined) return character;

        return produce(character, draft => {
            draft.maxStamina = draft.maxStamina.increaseFixed(2 * incStaminaPal.level);
        });
    })),
    new Necklace("Amulet of Light", "1500G", "S", "This amulet allows the user to activate it for 2 AP by speaking its command phrase. When doing so, the amulet starts to glow. It sheds bright light in a radius of 6 ps (9 m, 30 ft) and dim light beyond that for 6 ps (9 m, 30 ft). Speaking its command phrase again ends the glowing"),
    new Necklace("Amulet of Feathers", "1500G", "S", "This amulet allows the user to carry twice as much as they would be able to otherwise."),
    new Necklace("Amulet of Poison Protection", "1500G", "S", "This Amulet allows you to roll twice whenever you try to resist poison effects, taking the higher result. If a poison would damage you, you only take half damage from it. This damage reduction is applied after the static reduction."),
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="BELT">
    new Belt("Leather Belt", "5G", "M", "A Leather Belt can hold up to 4 different items that can be attached to a belt, like a quiver, bag or purse"),
    new Belt("Girdle", "2G", "S", "This girdle keeps your pants up."),
    new Belt("Potion Belt, 3 Slots", "10G", "S", "This belt can be used to strap 3 filled vials to a person’s body. This removes the need to retrieve it from that person’s backpack, making it far quicker to drink a potion."),
    new Belt("Potion Belt, 5 Slots", "50G", "S", "This belt can be used to strap 5 filled vials to a person’s body. This removes the need to retrieve it from that person’s backpack, making it far quicker to drink a potion."),
    new Belt("Potion Belt, 10 Slots", "200G", "S", "This belt can be used to strap 10 filled vials to a person’s body. This removes the need to retrieve it from that person’s backpack, making it far quicker to drink a potion"),
    //</editor-fold>
];
