
export const COMBATLEVEL_TEXT = 'Whenever an encounter is solved by attacking someone and directly harming them, it\n' +
    'should be considered combat. When a trap is laid, or the characters try to defeat enemies by\n' +
    'pushing a boulder onto them, it is adventuring instead.';

export const ADVENTURING_TEXT = 'Adventuring is the sum amount of exploration, navigation, and survival. Whenever characters\n' +
    'try to sneak by enemies, find their way around a massive ravine or create a distraction for a group\n' +
    'of enemies, they’re engaged in Adventuring.';

export const SOCIALLEVEL_TEXT = 'Social is interacting with other (at least somewhat) intelligent creatures in non-violent ways. This\n' +
    'includes diplomacy, haggling, perceiving information about others, subterfuge and threats, but  ́ıt\n' +
    'doesn’t include stealth (but does include disguise) or illusion. Neither does it include a feint or\n' +
    'trick during combat.';

export const STRENGTH_TEXT = 'Strength (ST) describes a character’s muscle strength. ' +
    'It’s an important ability for melee combat, and determines carrying capacity';

export const VITALITY_TEXT = 'Vitality (VI) is a character’s bodily defensive ability. ' +
    'It determines how a character is able to withstand extreme weather conditions, sickness or poison.';

export const DEXTERITY_TEXT = 'Dexterity (DE) describes a character’s hand-eye-coordination. ' +
    'It’s important with fine tasks like crafting or disabling traps, picking pockets and locks or tying knots. ' +
    'It also helps with ranged or melee combat, depending on the attacker’s weapon.';

export const AGILITY_TEXT = 'Agility (AG) is a character’s ability to act when necessary, and also describes how a character is able to move around. ' +
    'It’s important for climbing, swimming, running, sneaking, gymnastics and tumbling in general';

export const INTELLECT_TEXT = 'Intellect (IN) describes a character’s overall rational ability, his memory and his ability to acquire knowledge. ' +
    'It can also be used to describe a character’s overall knowledge about a specific topic or lore. ' +
    'It’s also important for magic users';

export const PERCEPTION_TEXT = 'Perception (PE) is a character’s ability to realize his surroundings. ' +
    'It’s important for battle, but also necessary to survive while exploring dangerous environments. ' +
    'It’s also important for social encounters';

export const EMPATHY_TEXT = 'Empathy (EM) describes a character’s ability to understand others. ' +
    'It’s important for most social encounters, and determines how easy it is for a character to haggle prices, ' +
    'to talk himself out of a battle or seduce a barmaid.';

export const HEALTH_TEXT = 'Health describes a character’s ability to withstand any type of damage. Health can be seen as a combination ' +
    'of resilience, bodily health and luck. If a character reaches 0 Health, he is dead. A ' +
    'character with less than one fourth of their Health becomes ”Wounded”. A character with less ' +
    'than one tenth of their Health becomes ”Heavily Wounded”. Health can be restored by resting, ' +
    'by alchemy and by magic. A character that is dead can not ' +
    'be healed. Reviving magic doesn’t exist in the Ragged Lands.';

export const STAMINA_TEXT = 'Stamina describes a character’s ability to act out tasks that are bodily challenging. When a character climbs ' +
    'or swims fast, or if a character uses special maneuvers in combat, he loses stamina. Stamina can ' +
    'be restored by resting (See below). It usually doesn’t take much longer than an hour to completely ' +
    'restore Stamina, so outside of a stressful situation, a character usually has full Stamina. A character ' +
    'with less than one fourth of their Stamina becomes ”Exhausted”. A character with less than ' +
    'one tenth of their Stamina becomes ”Heavily Exhausted”.k If a character reaches a Stamina of 0, ' +
    'they become unconscious.';

export const MANA_TEXT = 'Mana is usually tracked for every character, but only important for magic users. It describes a character’s ' +
    'ability to cast spells. Casting a spell costs Mana, and a character replenishes mana by eating. A ' +
    'character with less than one fourth of their Mana becomes ”Drained”. A character with less than ' +
    'one tenth of their Mana becomes ”Heavily Drained”. A character that reaches 0 Mana becomes ' +
    'paralyzed.';

export const HEALTH_RECOVER_TEXT = 'Aside from using special tools or magic for healing, each character has the ability to recover health ' +
    'in a natural way. A character’s natural healing ability allows them to heal 1 points of health, ' +
    'per 1 hour. While resting, this healing effect is doubled. A priest or healer may further improve ' +
    'someone’s natural healing ability';

export const STAMINA_RECOVER_TEXT = 'Stamina can be recovered by taking a break, regaining breath, not moving too much around, sitting ' +
    'down for a minute or two or drinking a bit of water. For every 2 seconds a character rests like that ' +
    '(or every AP in combat they spend just resting), they gain back 1 Stamina.';

export const MANA_RECOVER_TEXT = 'Mana is recovered over time, but the rate at which it recovers can be influenced by the food that ' +
    'the character eats. A meal usually lasts for 8 hours. A usual ration provides a recovery of 1d6 ' +
    'points per hour';


export const DODGE_TEXT = 'Dodge is a character’s ability to dodge an incoming attack. If an attack is below this value, it ' +
    'automatically misses. If it is above the target’s Dodge value, the defender might still be able to ' +
    'perform defensive actions. ' +
    '<br><br>It is equal to 8 + AG';

export const NOTICE_TEXT = 'Notice is a character’s ability to notice something unseen, like a noise, slight draft, or sneaking ' +
    'enemy. It does not automatically unveil anything, but a hidden object not reaching a character’s ' +
    'notice value will at least give them the idea that something is off. ' +
    '<br><br>It is equal to 8 + PE';

export const WILLPOWER_TEXT = 'Willpower is a    character’s ability to withstand emotional manipulation, as well as enchantment. ' +
    'If a character is target to emotional manipulation or a spell or magical effect they don’t want to ' +
    'be affected by, and the roll associated with the effect does not reach their Willpower value, the ' +
    'resist the effect outright and don’t have to roll competing checks. ' +
    '<br><br>It is equal to 8 + EM';

