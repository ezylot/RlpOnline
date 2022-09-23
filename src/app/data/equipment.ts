import {Equipment, TAGS} from "../classes/equipment/equipment";
import {Armor, ArmorType, Resist} from "../classes/equipment/armor";


export function getAllEquipment() : Equipment[] { return EQUIPMENT; }
export function getEquipmentByName(equipmentName: string): Equipment {
    let foundEquipment = getAllEquipment().find(value => value.name === equipmentName);
    if(foundEquipment == undefined) throw new Error("Could not find equipment with name: " + equipmentName);
    return foundEquipment;
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
