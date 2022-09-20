import {Language} from "../classes/language";


// Special Language for Gnomes
export const ANIMALS = new Language("", "Animals", "", 0, 0);

export function getAllLanguages() : Language[] { return LANGUAGES; }
const LANGUAGES = [
    new Language("Common", "Common", "Halkaren", 0, 0),
    new Language("Common", "Halkaren", "Halkaren", 200, 200),
    new Language("Common", "Whitlan", "Whitlan", 300, 300),
    new Language("Common", "Laetharnian", "Laetharnian", 150, 150),
    new Language("Common", "Steppespeach", "", 350, 150),
    new Language("Common", "Theralian", "Theralian", 250, 260),
    new Language("Common", "Mardimian", "Laetharnian", 200, 200),
    new Language("Common", "Old Truinic", "Old Truinic", 800, 300),
    new Language("Common", "Noldarian", "Noldarian", 250, 150),
    new Language("Common", "Neduin", "Neduin", 150, 300),
    new Language("Common", "Cors Common", "Halkaren", 200, 100),
    new Language("Common", "Flaemic", "Flaemic Halkaren", 150, 150),
    new Language("Common", "Velothi", "Halkaren", 120, 120),

    new Language("Fay", "Elven", "Fay", 250, 250),
    new Language("Fay", "Fay", "Fay", 300, 300),
    new Language("Fay", "Old Fay", "Fay", 600, 300),
    new Language("Fay", "Gnomish", "Fay", 250, 400),

    new Language("Terran", "Oroban", "Giant", 300, 400),
    new Language("Terran", "Giant", "Giant", 350, 800),
    new Language("Terran", "Daevan", "-", 400, 200),
    new Language("Terran", "Trollspeak", "-", 50, 100),
    new Language("Terran", "Goblin", "Goblin", 100, 100),

    new Language("Shadim", "Shadim", "Shadim", 500, 750),
    new Language("Shadim", "Umbran", "Halkaren", 250, 250),
    new Language("Shadim", "Sykan", "Shadim (Simplified)", 300, 250),

    new Language("Beastspeak", "Orcish", "Halkaren", 200, 200),
    new Language("Beastspeak", "Gnoll", "Neduin", 100, 200),
    new Language("Beastspeak", "Lupine", "Flaemic Halkaren", 100, 200),
    new Language("Beastspeak", "Aquine", "", 300, 300),
    new Language("Beastspeak", "Leonine", "Neduin", 300, 450),
    new Language("Shamanic", "Shamanic", "", 500, 1000),

    new Language("Thieves’ Cant", "Thieves’ Cant", "Symbols", 250, 300),
]

