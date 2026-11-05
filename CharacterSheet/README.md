# DnD -  HTML character sheet #
A HTML based DnD Charcter Sheet to be used with a browser. Because PDF forms suck.

This is a DnD character sheet made in HTML to be directly run locally from the player's computer. The HTML form auto saves to local storage so that the data persists across multiple reloads/launches of the web browser. (Making a new charcter every time would defeat the purpose and would give PDF form believers a leg to stand on.)


The Mentor Spellcaster track includes spell choices, its Arena spell-slot progression, and expended-slot checkboxes that reset on a Long Rest. General spellcasting outside the Mentor track is still manual; the attacks, actions and weapons section can be used for it.

The spellcasting section at the bottom follows the third page of the official character sheet: it shows each spellcasting class, ability, save DC, attack bonus, spell lists, and expended slot checkboxes. Spell slots use standard and multiclass 5e progression for full casters, Artificers, half casters, and Eldritch Knights/Arcane Tricksters; Warlock Pact Magic is tracked separately and can be replenished with the Short Rest button. Slot usage and spell lists are saved with the character; a Long Rest resets all slot usage. Each spell level has a picker for the 322 SRD 5.1 spells, showing their listed classes; non-SRD spells can still be entered manually, one per line.

The attack rows provide dropdowns for 2014 Basic Rules weapons and offensive cantrips from 2014-era 5e sources. Only offensive cantrips entered in the Spellcasting cantrip list appear there; each cantrip option identifies the active spellcasting class used for its attack bonus or save DC. Damage dice scale with character level, and Agonizing Blast adds its spellcasting modifier to Eldritch Blast. Mystic Theurge uses the highest Intelligence, Wisdom, or Charisma modifier for spell attacks and save DCs. Weapon damage and properties (such as finesse, light, and heavy) remain in the weapon catalog; other attack values are editable.

The spell-name, level, and class-list catalog is based on the [Dungeons & Dragons System Reference Document 5.1](https://www.dndbeyond.com/srd), © Wizards of the Coast LLC, licensed under [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/). The catalog contains no spell descriptions; enter other spell names manually.

Class feature choices are saved and displayed with the features they belong to. This includes level-based selections such as Warlock pact boons and invocations, Sorcerer Metamagic, Artificer infusions, Battle Master maneuvers, Arcane Archer shots, Rune Knight runes, and selected subclass options. Open-ended spell picks and language choices are recorded as text; other listed options use dropdowns. These selections are tracked for reference and do not automatically apply their mechanical effects unless noted elsewhere in this sheet.

Class, subclass, ancestry, mentor, and feat skill choices are selected in a separate box below the Skills list. Completed selections are recorded under Proficiencies and Languages; use Edit choices to revise them. Expertise choices are limited to proficient skills unless the feature grants proficiency as well, and selections persist with the character. Monk Unarmored Movement bonuses accumulate at levels 2, 6, 10, 14, and 18 while unarmored and without a shield.

When Mentor is enabled, Gestalt rules apply automatically: the highest entered class level is the character level, duplicate class features are replaced, and each replacement unlocks a feat slot. At class ASI levels 4, 8, 12, 16, and 19, you can bank +1 points; every two banked points unlock a feat slot.

Expert mentor infusion fields unlock at levels 3, 9, 13, and 17, with a matching infused-item field for each known infusion to track active items. Warrior mentor attack and defense bonuses are reflected in the sheet's combat effects and AC calculation.

## Features ##
1. Consistent display of information. (Say goodbye to PDF forms not opening correctly on edge and then the saved form not opening correctly on chrome where it once opened just fine.)
2. Scrolling and textboxes that maintain sane sizes. (and font sizes)
3. Checkboxes that work like a charm every time.
4. Display those pesky numbers after the + in the skills and saving throws while not obscuring the label. (whaaat?)

## Upcoming Features (in order of development)
1. Spellcasting table - A full, dedicated spellcasting section to keep all your spells neatly at the end.
2. A DnDBeyond-esque die roller (but significantly less fancy, albeit functional).
3. Dark Mode (!! suck it PDF Sheets)
4. A page popup of sorts to dnd wikidot for quick refernces for levelups and such.

## Installation/ Setup ##
1. Download this repo.
2. Extract the .zip file to a directory of your choice.
3. Et voila!

## Usage ##
Simply right click on the character_sheet.html and click open with > (your favourite browser here)

## License ##
[MIT](https://github.com/vibhav1011/DnD-html-sheet/blob/main/LICENSE) 

--------------------------------------------------------------------------------------------------------
*Credit for codebase goes to : https://codepen.io/evertras/full/YVVeMd/   This project was build upon this.
