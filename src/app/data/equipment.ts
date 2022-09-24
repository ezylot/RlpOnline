import {Equipment} from "../classes/equipment/equipment";
import {Armor, ArmorType, Resist} from "../classes/equipment/armor";

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
];
