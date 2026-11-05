
$(function () {
	const weaponCatalog = [
		{ name: "Club", group: "Simple melee weapons", damage: "1d4 bludgeoning", properties: ["Light"] },
		{ name: "Dagger", group: "Simple melee weapons", damage: "1d4 piercing", properties: ["Finesse", "Light", "Thrown (20/60)"] },
		{ name: "Greatclub", group: "Simple melee weapons", damage: "1d8 bludgeoning", properties: ["Two-handed"] },
		{ name: "Handaxe", group: "Simple melee weapons", damage: "1d6 slashing", properties: ["Light", "Thrown (20/60)"] },
		{ name: "Javelin", group: "Simple melee weapons", damage: "1d6 piercing", properties: ["Thrown (30/120)"] },
		{ name: "Light hammer", group: "Simple melee weapons", damage: "1d4 bludgeoning", properties: ["Light", "Thrown (20/60)"] },
		{ name: "Mace", group: "Simple melee weapons", damage: "1d6 bludgeoning", properties: [] },
		{ name: "Quarterstaff", group: "Simple melee weapons", damage: "1d6 bludgeoning", properties: ["Versatile (1d8)"] },
		{ name: "Sickle", group: "Simple melee weapons", damage: "1d4 slashing", properties: ["Light"] },
		{ name: "Spear", group: "Simple melee weapons", damage: "1d6 piercing", properties: ["Thrown (20/60)", "Versatile (1d8)"] },
		{ name: "Crossbow, light", group: "Simple ranged weapons", damage: "1d8 piercing", properties: ["Ammunition (80/320)", "Loading", "Two-handed"] },
		{ name: "Dart", group: "Simple ranged weapons", damage: "1d4 piercing", properties: ["Finesse", "Thrown (20/60)"] },
		{ name: "Shortbow", group: "Simple ranged weapons", damage: "1d6 piercing", properties: ["Ammunition (80/320)", "Two-handed"] },
		{ name: "Sling", group: "Simple ranged weapons", damage: "1d4 bludgeoning", properties: ["Ammunition (30/120)"] },
		{ name: "Battleaxe", group: "Martial melee weapons", damage: "1d8 slashing", properties: ["Versatile (1d10)"] },
		{ name: "Flail", group: "Martial melee weapons", damage: "1d8 bludgeoning", properties: [] },
		{ name: "Glaive", group: "Martial melee weapons", damage: "1d10 slashing", properties: ["Heavy", "Reach", "Two-handed"] },
		{ name: "Greataxe", group: "Martial melee weapons", damage: "1d12 slashing", properties: ["Heavy", "Two-handed"] },
		{ name: "Greatsword", group: "Martial melee weapons", damage: "2d6 slashing", properties: ["Heavy", "Two-handed"] },
		{ name: "Halberd", group: "Martial melee weapons", damage: "1d10 slashing", properties: ["Heavy", "Reach", "Two-handed"] },
		{ name: "Lance", group: "Martial melee weapons", damage: "1d12 piercing", properties: ["Reach", "Special"] },
		{ name: "Longsword", group: "Martial melee weapons", damage: "1d8 slashing", properties: ["Versatile (1d10)"] },
		{ name: "Maul", group: "Martial melee weapons", damage: "2d6 bludgeoning", properties: ["Heavy", "Two-handed"] },
		{ name: "Morningstar", group: "Martial melee weapons", damage: "1d8 piercing", properties: [] },
		{ name: "Pike", group: "Martial melee weapons", damage: "1d10 piercing", properties: ["Heavy", "Reach", "Two-handed"] },
		{ name: "Rapier", group: "Martial melee weapons", damage: "1d8 piercing", properties: ["Finesse"] },
		{ name: "Scimitar", group: "Martial melee weapons", damage: "1d6 slashing", properties: ["Finesse", "Light"] },
		{ name: "Shortsword", group: "Martial melee weapons", damage: "1d6 piercing", properties: ["Finesse", "Light"] },
		{ name: "Trident", group: "Martial melee weapons", damage: "1d6 piercing", properties: ["Thrown (20/60)", "Versatile (1d8)"] },
		{ name: "War pick", group: "Martial melee weapons", damage: "1d8 piercing", properties: [] },
		{ name: "Warhammer", group: "Martial melee weapons", damage: "1d8 bludgeoning", properties: ["Versatile (1d10)"] },
		{ name: "Whip", group: "Martial melee weapons", damage: "1d4 slashing", properties: ["Finesse", "Reach"] },
		{ name: "Blowgun", group: "Martial ranged weapons", damage: "1 piercing", properties: ["Ammunition (25/100)", "Loading"] },
		{ name: "Crossbow, hand", group: "Martial ranged weapons", damage: "1d6 piercing", properties: ["Ammunition (30/120)", "Light", "Loading"] },
		{ name: "Crossbow, heavy", group: "Martial ranged weapons", damage: "1d10 piercing", properties: ["Ammunition (100/400)", "Heavy", "Loading", "Two-handed"] },
		{ name: "Longbow", group: "Martial ranged weapons", damage: "1d8 piercing", properties: ["Ammunition (150/600)", "Heavy", "Two-handed"] },
		{ name: "Net", group: "Martial ranged weapons", damage: "-", properties: ["Special", "Thrown (5/15)"] },
	];
	const cantripAttackRules = {
		"Acid Splash": { saveAbility: "Dexterity", die: "d6", damageType: "acid", scalesWithLevel: true, classes: ["Artificer", "Sorcerer", "Wizard"] },
		"Booming Blade": { weaponAttack: true, damageType: "thunder", classes: ["Artificer", "Sorcerer", "Warlock", "Wizard"] },
		"Chill Touch": { attack: true, die: "d8", damageType: "necrotic", scalesWithLevel: true, classes: ["Sorcerer", "Warlock", "Wizard"] },
		"Create Bonfire": { saveAbility: "Dexterity", die: "d8", damageType: "fire", scalesWithLevel: true, classes: ["Artificer", "Druid", "Sorcerer", "Warlock", "Wizard"] },
		"Eldritch Blast": { attack: true, die: "d10", damageType: "force", beams: true, classes: ["Warlock"] },
		"Fire Bolt": { attack: true, die: "d10", damageType: "fire", scalesWithLevel: true, classes: ["Artificer", "Sorcerer", "Wizard"] },
		"Frostbite": { saveAbility: "Constitution", die: "d6", damageType: "cold", scalesWithLevel: true, classes: ["Artificer", "Bard", "Druid", "Sorcerer", "Warlock", "Wizard"] },
		"Green-Flame Blade": { weaponAttack: true, damageType: "fire", classes: ["Artificer", "Sorcerer", "Warlock", "Wizard"] },
		"Infestation": { saveAbility: "Constitution", die: "d6", damageType: "poison", scalesWithLevel: true, classes: ["Druid", "Sorcerer", "Warlock", "Wizard"] },
		"Lightning Lure": { saveAbility: "Strength", die: "d8", damageType: "lightning", scalesWithLevel: true, classes: ["Artificer", "Sorcerer", "Warlock", "Wizard"] },
		"Magic Stone": { attack: true, die: "d6", damageType: "bludgeoning", addAbilityDamage: true, classes: ["Artificer", "Druid", "Warlock"] },
		"Mind Sliver": { saveAbility: "Intelligence", die: "d6", damageType: "psychic", scalesWithLevel: true, classes: ["Sorcerer", "Warlock", "Wizard"] },
		"Poison Spray": { saveAbility: "Constitution", die: "d12", damageType: "poison", scalesWithLevel: true, classes: ["Artificer", "Druid", "Sorcerer", "Warlock", "Wizard"] },
		"Produce Flame": { attack: true, die: "d8", damageType: "fire", scalesWithLevel: true, classes: ["Druid"] },
		"Primal Savagery": { attack: true, die: "d10", damageType: "acid", scalesWithLevel: true, classes: ["Druid"] },
		"Ray of Frost": { attack: true, die: "d8", damageType: "cold", scalesWithLevel: true, classes: ["Artificer", "Sorcerer", "Wizard"] },
		"Sacred Flame": { saveAbility: "Dexterity", die: "d8", damageType: "radiant", scalesWithLevel: true, classes: ["Cleric"] },
		"Sapping Sting": { saveAbility: "Constitution", die: "d4", damageType: "necrotic", scalesWithLevel: true, classes: ["Wizard"] },
		"Shocking Grasp": { attack: true, die: "d8", damageType: "lightning", scalesWithLevel: true, classes: ["Artificer", "Sorcerer", "Wizard"] },
		"Sword Burst": { saveAbility: "Dexterity", die: "d6", damageType: "force", scalesWithLevel: true, classes: ["Artificer", "Sorcerer", "Warlock", "Wizard"] },
		"Thorn Whip": { attack: true, die: "d6", damageType: "piercing", classes: ["Artificer", "Druid", "Ranger"] },
		"Thunderclap": { saveAbility: "Constitution", die: "d6", damageType: "thunder", scalesWithLevel: true, classes: ["Artificer", "Bard", "Druid", "Sorcerer", "Warlock", "Wizard"] },
		"Toll the Dead": { saveAbility: "Wisdom", die: "d8", missingHitPointsDie: "d12", damageType: "necrotic", scalesWithLevel: true, classes: ["Cleric", "Warlock", "Wizard"] },
		"Vicious Mockery": { saveAbility: "Wisdom", die: "d4", damageType: "psychic", scalesWithLevel: true, classes: ["Bard"] },
		"Word of Radiance": { saveAbility: "Constitution", die: "d6", damageType: "radiant", scalesWithLevel: true, classes: ["Cleric"] },
	};
	const cantripAttackOptionPrefix = "__spellcantrip__:";
	function getCantripRule(name) {
		const normalizedName = String(name || "").trim().toLowerCase();
		const cantripName = Object.keys(cantripAttackRules).find(function (candidate) {
			return candidate.toLowerCase() === normalizedName;
		});
		return cantripName ? { name: cantripName, rule: cantripAttackRules[cantripName] } : null;
	}

	function parseCantripAttackOption(value) {
		if (typeof value !== "string" || value.indexOf(cantripAttackOptionPrefix) !== 0) {
			return null;
		}
		try {
			const selection = JSON.parse(value.slice(cantripAttackOptionPrefix.length));
			if (Array.isArray(selection) && selection.length >= 3
				&& selection.every(function (part) { return typeof part === "string"; })) {
				return { name: selection[0], sourceName: selection[1], ability: selection[2] };
			}
		} catch (error) {
			console.error("Unable to restore saved cantrip attack choice.", error);
		}
		return null;
	}

	function parseSavedAttackName(inputName) {
		const storedValue = localStorage.getItem("page1_" + inputName);
		if (storedValue === null) {
			return null;
		}
		try {
			const parsedValue = JSON.parse(storedValue);
			return typeof parsedValue === "string" ? parsedValue : null;
		} catch (error) {
			console.error("Unable to restore saved attack name for " + inputName + ".", error);
			return null;
		}
	}

	function getSrdSpellCatalog() {
		if (!Array.isArray(window.srdSpellCatalog)) {
			console.error("The SRD spell catalog did not load.");
			return [];
		}
		return window.srdSpellCatalog.filter(function (spell) {
			return spell
				&& typeof spell.name === "string"
				&& Number.isInteger(spell.level)
				&& spell.level >= 0
				&& spell.level <= 9
				&& Array.isArray(spell.classes)
				&& spell.classes.every(function (className) { return typeof className === "string"; });
		});
	}

	function populateSrdSpellCatalogOptions() {
		const spells = getSrdSpellCatalog();
		$("#page1 [data-spell-catalog-level]").each(function () {
			const level = Number($(this).attr("data-spell-catalog-level"));
			if (!Number.isInteger(level) || level < 0 || level > 9) {
				console.error("Unable to populate an SRD spell selector with an invalid level.");
				return;
			}
			const select = $(this).empty();
			$("<option>", {
				value: "",
				text: level === 0 ? "Add an SRD cantrip" : "Add an SRD spell",
			}).appendTo(select);
			spells.filter(function (spell) {
				return spell.level === level;
			}).forEach(function (spell) {
				const sourceClasses = spell.classes.length > 0
					? " — " + spell.classes.join(", ")
					: "";
				$("<option>", {
					value: spell.name,
					text: spell.name + sourceClasses,
				}).appendTo(select);
			});
		});
	}

	function addSelectedSrdSpell(level, select) {
		const spellName = $(select).val();
		if (!spellName) {
			return;
		}
		const spell = getSrdSpellCatalog().find(function (entry) {
			return entry.level === level && entry.name === spellName;
		});
		if (!spell) {
			console.error("The selected spell is not in the SRD catalog for level " + level + ".");
			return;
		}
		const spellList = $("#page1 #spell-list-level-" + level);
		if (spellList.length !== 1) {
			console.error("Unable to find the spell list for level " + level + ".");
			return;
		}
		const currentSpells = spellList.val().split(/\r?\n/);
		if (currentSpells.some(function (name) { return name.trim().toLowerCase() === spell.name.toLowerCase(); })) {
			$(select).val("");
			return;
		}
		const currentValue = spellList.val().trimEnd();
		spellList.val(currentValue ? currentValue + "\n" + spell.name : spell.name).trigger("input");
		$(select).val("");
	}

	const initialSavedAttackNames = {};
	const otherAttackNames = ["Beast Bite", "Beast Claws (two attacks)", "Beast Tail"];

	function populateAttackChoices(knownCantrips) {
		const attackSelects = $("#page1 select[name^='atkname']");
		const savedAttackNames = {};
		attackSelects.each(function () {
			const storedValue = localStorage.getItem("page1_" + this.name);
			if (storedValue === null) {
				return;
			}
			try {
				savedAttackNames[this.name] = JSON.parse(storedValue);
				initialSavedAttackNames[this.name] = savedAttackNames[this.name];
			} catch (error) {
				console.error("Unable to restore saved attack name for " + this.name + ".", error);
			}
		});

		attackSelects.each(function () {
			const select = this;
			const groups = {};
			weaponCatalog.forEach(function (weapon) {
				if (!groups[weapon.group]) {
					groups[weapon.group] = document.createElement("optgroup");
					groups[weapon.group].label = weapon.group;
					select.appendChild(groups[weapon.group]);
				}
				const option = document.createElement("option");
				option.value = weapon.name;
				option.textContent = weapon.name;
				option.dataset.damage = weapon.damage;
				option.dataset.properties = JSON.stringify(weapon.properties);
				groups[weapon.group].appendChild(option);
			});

			const otherAttacks = document.createElement("optgroup");
			otherAttacks.label = "Other attacks";
			otherAttackNames.forEach(function (name) {
				const option = document.createElement("option");
				option.value = name;
				option.textContent = name;
				otherAttacks.appendChild(option);
			});

			const catalogNames = weaponCatalog.map(function (weapon) { return weapon.name; })
				.concat(otherAttackNames);
			const savedName = savedAttackNames[select.name];
			const isKnownCantrip = !!getCantripRule(savedName) || !!parseCantripAttackOption(savedName)
				|| (Array.isArray(knownCantrips) && knownCantrips.some(function (name) {
					return name.toLowerCase() === String(savedName || "").trim().toLowerCase();
				}));
			if (typeof savedName === "string" && savedName !== ""
				&& catalogNames.indexOf(savedName) === -1 && !isKnownCantrip) {
				const legacyOption = document.createElement("option");
				legacyOption.value = savedName;
				legacyOption.textContent = savedName;
				otherAttacks.appendChild(legacyOption);
			}
			if (otherAttacks.children.length > 0) {
				select.appendChild(otherAttacks);
			}
			if (typeof savedName === "string" && !isKnownCantrip) {
				select.value = savedName;
			}
		});
	}

	const savedClass = localStorage.getItem("page1_characterclass");
	const savedClassLevel = localStorage.getItem("page1_classlevel");

	if (savedClass === null && savedClassLevel !== null) {
		const legacyClassLevel = JSON.parse(savedClassLevel);

		if (typeof legacyClassLevel === "string") {
			const legacyMatch = legacyClassLevel.trim().match(/^(.*?)\s+(\d{1,2})$/);
			const className = legacyMatch ? legacyMatch[1].trim() : legacyClassLevel;
			const level = legacyMatch ? legacyMatch[2] : "";

			localStorage.setItem("page1_characterclass", JSON.stringify(className));
			localStorage.setItem("page1_classlevel", JSON.stringify(level));
		}
	}
	const classAsiStorageKey = "page1_classAsiChoices";
	let classAsiChoices = {};
	let activeClassAsiKeys = [];
	let activeSinglePointAsiKeys = {};
	let gestaltDuplicateFeatures = [];
	const storedClassAsiChoices = localStorage.getItem(classAsiStorageKey);
	if (storedClassAsiChoices) {
		try {
			const parsedClassAsiChoices = JSON.parse(storedClassAsiChoices);
			if (parsedClassAsiChoices && typeof parsedClassAsiChoices === "object" && !Array.isArray(parsedClassAsiChoices)) {
				classAsiChoices = parsedClassAsiChoices;
			}
		} catch (error) {
			console.error("Unable to restore class ability score improvement choices.", error);
		}
	}
	const characterAsiStorageKey = "page1_characterAsiChoices";
	let characterAsiChoices = {};
	let activeCharacterAsiLevels = [];
	const storedCharacterAsiChoices = localStorage.getItem(characterAsiStorageKey);
	if (storedCharacterAsiChoices) {
		try {
			const parsedCharacterAsiChoices = JSON.parse(storedCharacterAsiChoices);
			if (parsedCharacterAsiChoices && typeof parsedCharacterAsiChoices === "object" && !Array.isArray(parsedCharacterAsiChoices)) {
				characterAsiChoices = parsedCharacterAsiChoices;
			}
		} catch (error) {
			console.error("Unable to restore character-level ability score improvement choices.", error);
		}
	}
	const mentorAsiStorageKey = "page1_mentorAsiChoices";
	let mentorAsiChoices = {};
	let activeMentorAsiLevels = [];
	const mentorRoleStorageKey = "page1_mentorRole";
	let selectedMentorRole = localStorage.getItem(mentorRoleStorageKey) || "";
	const mentorSpellStorageKey = "page1_mentorSpellChoices";
	let mentorSpellChoices = {};
	const storedMentorSpellChoices = localStorage.getItem(mentorSpellStorageKey);
	if (storedMentorSpellChoices) {
		try {
			const parsedMentorSpellChoices = JSON.parse(storedMentorSpellChoices);
			if (parsedMentorSpellChoices && typeof parsedMentorSpellChoices === "object" && !Array.isArray(parsedMentorSpellChoices)) {
				mentorSpellChoices = parsedMentorSpellChoices;
			}
		} catch (error) {
			console.error("Unable to restore mentor spell choices.", error);
		}
	}
	const attackBonusBaseStorageKey = "page1_attackBonusBaseValues";
	let attackBonusBaseValues = {};
	const storedAttackBonusBaseValues = localStorage.getItem(attackBonusBaseStorageKey);
	if (storedAttackBonusBaseValues) {
		try {
			const parsedAttackBonusBaseValues = JSON.parse(storedAttackBonusBaseValues);
			if (parsedAttackBonusBaseValues && typeof parsedAttackBonusBaseValues === "object" && !Array.isArray(parsedAttackBonusBaseValues)) {
				attackBonusBaseValues = parsedAttackBonusBaseValues;
			}
		} catch (error) {
			console.error("Unable to restore base attack bonuses.", error);
		}
	}
	const storedMentorAsiChoices = localStorage.getItem(mentorAsiStorageKey);
	if (storedMentorAsiChoices) {
		try {
			const parsedMentorAsiChoices = JSON.parse(storedMentorAsiChoices);
			if (parsedMentorAsiChoices && typeof parsedMentorAsiChoices === "object" && !Array.isArray(parsedMentorAsiChoices)) {
				mentorAsiChoices = parsedMentorAsiChoices;
			}
		} catch (error) {
			console.error("Unable to restore mentor ability score improvement choices.", error);
		}
	}
	const savedClassList = localStorage.getItem("page1_characterclass");
	if (savedClassList !== null) {
		const savedClasses = JSON.parse(savedClassList);
		if (typeof savedClasses === "string" && /[\/\r\n]/.test(savedClasses)) {
			const splitClasses = savedClasses.split(/[\/\r\n]+/).map(function (className) {
				return className.trim();
			}).filter(function (className) {
				return className !== "";
			});
			if (splitClasses.length > 0) {
				localStorage.setItem("page1_characterclass", JSON.stringify(splitClasses[0]));
				for (let classIndex = 1; classIndex < splitClasses.length && classIndex < 13; classIndex++) {
					const classKey = "page1_characterclass-" + (classIndex + 1);
					if (localStorage.getItem(classKey) === null) {
						localStorage.setItem(classKey, JSON.stringify(splitClasses[classIndex]));
					}
				}
			}
		}
	}
	const savedLevelList = localStorage.getItem("page1_classlevel");
	if (savedLevelList !== null) {
		const savedLevels = JSON.parse(savedLevelList);
		if (typeof savedLevels === "string" && /[\/\r\n]/.test(savedLevels)) {
			const splitLevels = savedLevels.split(/[\/\r\n]+/).map(function (level) {
				return level.trim();
			});
			localStorage.setItem("page1_classlevel", JSON.stringify(splitLevels[0]));
			for (let levelIndex = 1; levelIndex < splitLevels.length && levelIndex < 13; levelIndex++) {
				localStorage.setItem("page1_classlevel-" + (levelIndex + 1), JSON.stringify(splitLevels[levelIndex]));
			}
		}
	}

	const talentStorageKey = "taoc_selected_talents";
	const fightingStyleStorageKey = "page1_fightingStyleChoices";
	const featureChoiceStorageKey = "page1_featureChoiceSelections";
	const fightingStyleChoices = {
		"Archery": {
			sources: ["fighter", "ranger", "all"],
			description: "Gain +2 to attack rolls with ranged weapons.",
		},
		"Blind Fighting": {
			sources: ["fighter", "paladin", "ranger", "all"],
			description: "Gain blindsight to 10 feet.",
		},
		"Blessed Warrior": {
			sources: ["paladin", "all"],
			description: "Learn two cleric cantrips; they count as paladin spells for you.",
		},
		"Defense": {
			sources: ["fighter", "paladin", "ranger", "all"],
			description: "Gain +1 AC while wearing armor.",
		},
		"Druidic Warrior": {
			sources: ["ranger", "all"],
			description: "Learn two druid cantrips; they count as ranger spells for you.",
		},
		"Dueling": {
			sources: ["fighter", "paladin", "ranger", "swords", "all"],
			description: "Gain +2 damage with a melee weapon held in one hand while no other weapon is wielded.",
		},
		"Great Weapon Fighting": {
			sources: ["fighter", "paladin", "all"],
			description: "Reroll a 1 or 2 on a damage die for a two-handed or versatile melee weapon, using the new roll.",
		},
		"Interception": {
			sources: ["fighter", "paladin", "all"],
			description: "Use your reaction to reduce damage to a nearby creature by 1d10 + your proficiency bonus.",
		},
		"Protection": {
			sources: ["fighter", "paladin", "all"],
			description: "Use your reaction and shield to impose disadvantage on an attack against a nearby creature.",
		},
		"Superior Technique": {
			sources: ["fighter", "all"],
			description: "Learn one Battle Master maneuver and gain one d6 superiority die, regained on a short or long rest.",
		},
		"Thrown Weapon Fighting": {
			sources: ["fighter", "ranger", "all"],
			description: "Draw a thrown weapon as part of each attack and gain +2 damage with ranged attacks using thrown weapons.",
		},
		"Two-Weapon Fighting": {
			sources: ["fighter", "ranger", "swords", "all"],
			description: "Add your ability modifier to the damage of your off-hand attack.",
		},
		"Unarmed Fighting": {
			sources: ["fighter", "all"],
			description: "Unarmed strikes deal 1d6 damage, or 1d8 if both hands are free; deal 1d4 to a grappled creature at the start of your turn.",
		},
	};

	function readFightingStyleChoices() {
		const storedChoices = localStorage.getItem(fightingStyleStorageKey);
		if (storedChoices === null) {
			return {};
		}

		try {
			const parsedChoices = JSON.parse(storedChoices);
			if (parsedChoices && typeof parsedChoices === "object" && !Array.isArray(parsedChoices)) {
				return parsedChoices;
			}
			console.error("Unable to restore fighting style choices: saved data is not an object.");
		} catch (error) {
			console.error("Unable to restore fighting style choices.", error);
		}
		return {};
	}

	const selectedFightingStyles = readFightingStyleChoices();
	function readFeatureChoiceSelections() {
		const storedChoices = localStorage.getItem(featureChoiceStorageKey);
		if (storedChoices === null) {
			return {};
		}

		try {
			const parsedChoices = JSON.parse(storedChoices);
			if (parsedChoices && typeof parsedChoices === "object" && !Array.isArray(parsedChoices)) {
				return parsedChoices;
			}
			console.error("Unable to restore class feature choices: saved data is not an object.");
		} catch (error) {
			console.error("Unable to restore class feature choices.", error);
		}
		return {};
	}

	const featureChoiceSelections = readFeatureChoiceSelections();

	function createFightingStyleControl(choiceKey, source) {
		const control = $("<div>", { class: "fighting-style-choice" });
		const select = $("<select>", {
			"aria-label": "Fighting style",
			"data-fighting-style-key": choiceKey,
		}).appendTo(control);
		$("<option>", { value: "", text: "Choose fighting style" }).appendTo(select);

		const selectedStyle = selectedFightingStyles[choiceKey];
		const unavailableStyles = Object.keys(selectedFightingStyles).reduce(function (styles, key) {
			if (key !== choiceKey && selectedFightingStyles[key]) {
				styles.push(selectedFightingStyles[key]);
			}
			return styles;
		}, []);
		Object.keys(fightingStyleChoices).forEach(function (styleName) {
			const style = fightingStyleChoices[styleName];
			if (style.sources.indexOf(source) === -1) {
				return;
			}
			$("<option>", {
				value: styleName,
				text: styleName,
				disabled: unavailableStyles.indexOf(styleName) !== -1 && selectedStyle !== styleName,
			}).appendTo(select);
		});
		select.val(Object.prototype.hasOwnProperty.call(fightingStyleChoices, selectedStyle)
			&& fightingStyleChoices[selectedStyle].sources.indexOf(source) !== -1
			? selectedStyle
			: "");
		$("<div>", {
			class: "fighting-style-description",
			text: fightingStyleChoices[selectedStyle] && fightingStyleChoices[selectedStyle].sources.indexOf(source) !== -1
				? fightingStyleChoices[selectedStyle].description
				: "Choose a fighting style.",
			"aria-live": "polite",
		}).appendTo(control);
		return control;
	}

	const pactBoonOptions = ["Pact of the Chain", "Pact of the Blade", "Pact of the Tome", "Pact of the Talisman"];
	const eldritchInvocationOptions = [
		{ value: "Agonizing Blast", requires: "eldritch blast cantrip" },
		"Armor of Shadows",
		{ value: "Ascendant Step", minLevel: 9 },
		"Beast Speech",
		"Beguiling Influence",
		{ value: "Bewitching Whispers", minLevel: 7 },
		{ value: "Book of Ancient Secrets", pact: "Pact of the Tome" },
		{ value: "Chains of Carceri", minLevel: 15, pact: "Pact of the Chain" },
		{ value: "Cloak of Flies", minLevel: 5 },
		"Devil's Sight",
		{ value: "Dreadful Word", minLevel: 7 },
		{ value: "Eldritch Mind" },
		{ value: "Eldritch Smite", minLevel: 5, pact: "Pact of the Blade" },
		{ value: "Eldritch Sight" },
		{ value: "Eldritch Spear", requires: "eldritch blast cantrip" },
		{ value: "Eyes of the Rune Keeper" },
		{ value: "Far Scribe", minLevel: 5, pact: "Pact of the Tome" },
		{ value: "Fiendish Vigor" },
		{ value: "Gaze of Two Minds" },
		{ value: "Ghostly Gaze", minLevel: 7 },
		{ value: "Gift of the Depths", minLevel: 5 },
		{ value: "Gift of the Ever-Living Ones", pact: "Pact of the Chain" },
		{ value: "Gift of the Protectors", minLevel: 9, pact: "Pact of the Tome" },
		{ value: "Grasp of Hadar", requires: "eldritch blast cantrip" },
		{ value: "Improved Pact Weapon", pact: "Pact of the Blade" },
		{ value: "Investment of the Chain Master", pact: "Pact of the Chain" },
		{ value: "Lance of Lethargy", requires: "eldritch blast cantrip" },
		{ value: "Lifedrinker", minLevel: 12, pact: "Pact of the Blade" },
		{ value: "Maddening Hex", minLevel: 5 },
		{ value: "Mask of Many Faces" },
		{ value: "Master of Myriad Forms", minLevel: 15 },
		{ value: "Minions of Chaos", minLevel: 9 },
		{ value: "Mire the Mind", minLevel: 5 },
		{ value: "Misty Visions" },
		{ value: "One with Shadows", minLevel: 5 },
		{ value: "Otherworldly Leap", minLevel: 9 },
		{ value: "Protection of the Talisman", minLevel: 7, pact: "Pact of the Talisman" },
		{ value: "Rebuke of the Talisman", pact: "Pact of the Talisman" },
		{ value: "Relentless Hex", minLevel: 7 },
		{ value: "Repelling Blast", requires: "eldritch blast cantrip" },
		{ value: "Sculptor of Flesh", minLevel: 7 },
		{ value: "Shroud of Shadow", minLevel: 15 },
		{ value: "Sign of Ill Omen", minLevel: 5 },
		{ value: "Thief of Five Fates" },
		{ value: "Thirsting Blade", minLevel: 5, pact: "Pact of the Blade" },
		{ value: "Tomb of Levistus", minLevel: 5 },
		{ value: "Trickster's Escape", minLevel: 7 },
		{ value: "Undying Servitude", minLevel: 5 },
		{ value: "Visions of Distant Realms", minLevel: 15 },
		{ value: "Voice of the Chain Master", pact: "Pact of the Chain" },
		{ value: "Whispers of the Grave", minLevel: 9 },
		{ value: "Witch Sight", minLevel: 15 },
		{ value: "Bond of the Talisman", minLevel: 12, pact: "Pact of the Talisman" },
		{ value: "Aspect of the Moon", pact: "Pact of the Tome" },
	];
	const metamagicOptions = [
		"Careful Spell", "Distant Spell", "Empowered Spell", "Extended Spell",
		"Heightened Spell", "Quickened Spell", "Seeking Spell", "Subtle Spell",
		"Transmuted Spell", "Twinned Spell",
	];
	const battleMasterManeuvers = [
		"Ambush", "Bait and Switch", "Brace", "Commander's Strike",
		"Commanding Presence", "Disarming Attack", "Distracting Strike",
		"Evasive Footwork", "Feinting Attack", "Goading Attack",
		"Grappling Strike", "Lunging Attack", "Maneuvering Attack",
		"Menacing Attack", "Parry", "Precision Attack", "Pushing Attack",
		"Quick Toss", "Rally", "Riposte", "Sweeping Attack",
		"Tactical Assessment", "Trip Attack",
	];
	const arcaneShotOptions = [
		"Banishing Arrow", "Beguiling Arrow", "Bursting Arrow",
		"Enfeebling Arrow", "Grasping Arrow", "Piercing Arrow",
		"Seeking Arrow", "Shadow Arrow",
	];
	const runeOptions = [
		"Cloud Rune", "Fire Rune", "Frost Rune", "Stone Rune",
		{ value: "Hill Rune", minLevel: 7 },
		{ value: "Storm Rune", minLevel: 7 },
	];
	const elementalDisciplines = [
		"Elemental Attunement",
		"Fangs of the Fire Snake",
		"Fist of Four Thunders",
		"Fist of Unbroken Air",
		{ value: "Gong of the Summit", minLevel: 6 },
		{ value: "Rush of the Gale Spirits", minLevel: 6 },
		{ value: "Shape the Flowing River", minLevel: 6 },
		{ value: "Sweeping Cinder Strike", minLevel: 6 },
		{ value: "Flames of the Phoenix", minLevel: 11 },
		{ value: "Mist Stance", minLevel: 11 },
		{ value: "Ride the Wind", minLevel: 11 },
		{ value: "Breath of Winter", minLevel: 17 },
		{ value: "Eternal Mountain Defense", minLevel: 17 },
		{ value: "River of Hungry Flame", minLevel: 17 },
		{ value: "Wave of Rolling Earth", minLevel: 17 },
		"Water Whip",
	];
	const artisanToolOptions = [
		"Alchemist's supplies", "Brewer's supplies", "Calligrapher's supplies",
		"Carpenter's tools", "Cartographer's tools", "Cobbler's tools",
		"Cook's utensils", "Glassblower's tools", "Jeweler's tools",
		"Leatherworker's tools", "Mason's tools", "Painter's supplies",
		"Potter's tools", "Smith's tools", "Tinker's tools", "Weaver's tools",
		"Woodcarver's tools",
	];
	const artificerInfusions = [
		{ value: "Arcane Propulsion Armor", minLevel: 14 },
		"Armor of Magical Strength",
		{ value: "Boots of the Winding Path", minLevel: 6 },
		"Enhanced Arcane Focus",
		"Enhanced Defense",
		"Enhanced Weapon",
		{ value: "Helm of Awareness", minLevel: 10 },
		{ value: "Homunculus Servant", minLevel: 6 },
		"Mind Sharpener",
		{ value: "Radiant Weapon", minLevel: 6 },
		"Repeating Shot",
		{ value: "Repulsion Shield", minLevel: 6 },
		{ value: "Resistant Armor", minLevel: 6 },
		"Returning Weapon",
		{ value: "Spell-Refueling Ring", minLevel: 6 },
		{ value: "Replicate Magic Item: Alchemy jug", minLevel: 2 },
		{ value: "Replicate Magic Item: Bag of holding", minLevel: 2 },
		{ value: "Replicate Magic Item: Cap of water breathing", minLevel: 2 },
		{ value: "Replicate Magic Item: Goggles of night", minLevel: 2 },
		{ value: "Replicate Magic Item: Rope of climbing", minLevel: 2 },
		{ value: "Replicate Magic Item: Sending stones", minLevel: 2 },
		{ value: "Replicate Magic Item: Wand of magic detection", minLevel: 2 },
		{ value: "Replicate Magic Item: Wand of secrets", minLevel: 2 },
		{ value: "Replicate Magic Item: Boots of elvenkind", minLevel: 6 },
		{ value: "Replicate Magic Item: Cloak of elvenkind", minLevel: 6 },
		{ value: "Replicate Magic Item: Cloak of the manta ray", minLevel: 6 },
		{ value: "Replicate Magic Item: Eyes of charming", minLevel: 6 },
		{ value: "Replicate Magic Item: Gloves of thievery", minLevel: 6 },
		{ value: "Replicate Magic Item: Lantern of revealing", minLevel: 6 },
		{ value: "Replicate Magic Item: Pipes of haunting", minLevel: 6 },
		{ value: "Replicate Magic Item: Ring of water walking", minLevel: 6 },
		{ value: "Replicate Magic Item: Boots of striding and springing", minLevel: 10 },
		{ value: "Replicate Magic Item: Boots of the winterlands", minLevel: 10 },
		{ value: "Replicate Magic Item: Bracers of archery", minLevel: 10 },
		{ value: "Replicate Magic Item: Brooch of shielding", minLevel: 10 },
		{ value: "Replicate Magic Item: Cloak of protection", minLevel: 10 },
		{ value: "Replicate Magic Item: Eyes of the eagle", minLevel: 10 },
		{ value: "Replicate Magic Item: Gauntlets of ogre power", minLevel: 10 },
		{ value: "Replicate Magic Item: Gloves of missile snaring", minLevel: 10 },
		{ value: "Replicate Magic Item: Gloves of swimming and climbing", minLevel: 10 },
		{ value: "Replicate Magic Item: Hat of disguise", minLevel: 10 },
		{ value: "Replicate Magic Item: Headband of intellect", minLevel: 10 },
		{ value: "Replicate Magic Item: Helm of telepathy", minLevel: 10 },
		{ value: "Replicate Magic Item: Medallion of thoughts", minLevel: 10 },
		{ value: "Replicate Magic Item: Necklace of adaptation", minLevel: 10 },
		{ value: "Replicate Magic Item: Periapt of wound closure", minLevel: 10 },
		{ value: "Replicate Magic Item: Pipes of the sewers", minLevel: 10 },
		{ value: "Replicate Magic Item: Quiver of Ehlonna", minLevel: 10 },
		{ value: "Replicate Magic Item: Ring of jumping", minLevel: 10 },
		{ value: "Replicate Magic Item: Ring of mind shielding", minLevel: 10 },
		{ value: "Replicate Magic Item: Slippers of spider climbing", minLevel: 10 },
		{ value: "Replicate Magic Item: Winged boots", minLevel: 10 },
		{ value: "Replicate Magic Item: Amulet of health", minLevel: 14 },
		{ value: "Replicate Magic Item: Belt of hill giant strength", minLevel: 14 },
		{ value: "Replicate Magic Item: Boots of levitation", minLevel: 14 },
		{ value: "Replicate Magic Item: Boots of speed", minLevel: 14 },
		{ value: "Replicate Magic Item: Bracers of defense", minLevel: 14 },
		{ value: "Replicate Magic Item: Cloak of the bat", minLevel: 14 },
		{ value: "Replicate Magic Item: Dimensional shackles", minLevel: 14 },
		{ value: "Replicate Magic Item: Gem of seeing", minLevel: 14 },
		{ value: "Replicate Magic Item: Horn of blasting", minLevel: 14 },
		{ value: "Replicate Magic Item: Ring of free action", minLevel: 14 },
		{ value: "Replicate Magic Item: Ring of protection", minLevel: 14 },
		{ value: "Replicate Magic Item: Ring of the ram", minLevel: 14 },
	];
	const dragonAncestries = [
		"Black (acid)", "Blue (lightning)", "Brass (fire)", "Bronze (lightning)",
		"Copper (acid)", "Gold (fire)", "Green (poison)", "Red (fire)",
		"Silver (cold)", "White (cold)",
	];

	function getFeatureChoiceCount(rule, level, featureName) {
		return typeof rule.count === "function" ? rule.count(level, featureName) : rule.count;
	}

	function getFeatureChoiceKey(rule, context, featureName) {
		if (rule.key) {
			return rule.key;
		}
		const instanceKey = context.choiceInstanceKey || (context.scope + ":" + context.owner);
		return instanceKey + ":" + rule.id + (rule.keyByFeatureName ? ":" + featureName : "");
	}

	function getFeatureChoiceRules(context, featureName) {
		return featureChoiceRules.filter(function (rule) {
			return rule.scope === context.scope
				&& (!rule.owner || rule.owner === context.owner)
				&& rule.matches(featureName)
				&& (!rule.visibleWhen || rule.visibleWhen(context));
		});
	}

	function getEligibleFeatureChoiceOptions(rule, level, context) {
		const selectedPact = featureChoiceSelections["class:Warlock:warlock-pact-boon"] || [];
		return (rule.options || []).map(function (option) {
			return typeof option === "string" ? { value: option, label: option } : option;
		}).filter(function (option) {
			return (!option.minLevel || level >= option.minLevel)
				&& (!option.pact || (context.scope === "class" && context.owner === "Warlock"
					&& selectedPact.indexOf(option.pact) !== -1))
				&& (!rule.optionFilter || rule.optionFilter(option, context));
		});
	}

	function createFeatureChoiceControl(rule, context, featureName, choiceKey) {
		const optionList = Array.isArray(rule.options) ? getEligibleFeatureChoiceOptions(rule, context.level, context) : null;
		const selections = Array.isArray(featureChoiceSelections[choiceKey])
			? featureChoiceSelections[choiceKey]
			: [];
		const count = Math.max(0, getFeatureChoiceCount(rule, context.level, featureName));
		if (count === 0) {
			return $();
		}

		const control = $("<div>", { class: "feature-choice-control" });
		$("<div>", { class: "feature-choice-label", text: rule.label }).appendTo(control);
		for (let choiceIndex = 0; choiceIndex < count; choiceIndex++) {
			const value = selections[choiceIndex] || "";
			const slot = $("<label>", { class: "feature-choice-slot" }).appendTo(control);
			$("<span>", {
				class: "feature-choice-slot-label",
				text: (rule.choiceLabels && rule.choiceLabels[choiceIndex]) || ("Choice " + (choiceIndex + 1)),
			}).appendTo(slot);
			if (optionList) {
				const select = $("<select>", {
					"aria-label": rule.label + " choice " + (choiceIndex + 1),
					"data-feature-choice-key": choiceKey,
					"data-feature-choice-index": choiceIndex,
				}).appendTo(slot);
				$("<option>", { value: "", text: "Choose an option" }).appendTo(select);
				optionList.forEach(function (option) {
					const otherSelections = selections.filter(function (selected, selectedIndex) {
						return selectedIndex !== choiceIndex && selected !== "";
					});
					const optionElement = $("<option>", {
						value: option.value,
						text: option.label || option.value,
						disabled: rule.allowDuplicates !== true
							&& otherSelections.indexOf(option.value) !== -1
							&& value !== option.value,
					});
					const prerequisite = option.prerequisite || option.requires
						|| (option.minLevel ? "Requires level " + option.minLevel : "")
						|| (option.pact ? "Requires " + option.pact : "");
					if (prerequisite) {
						optionElement.attr("title", prerequisite);
					}
					optionElement.appendTo(select);
				});
				if (value && !optionList.some(function (option) { return option.value === value; })) {
					$("<option>", {
						value: value,
						text: value + " (previously selected; no longer available)",
					}).appendTo(select);
				}
				select.val(value);
			} else {
				$("<input>", {
					type: "text",
					value: value,
					placeholder: rule.placeholder || "Enter choice",
					"aria-label": rule.label + " choice " + (choiceIndex + 1),
					"data-feature-choice-key": choiceKey,
					"data-feature-choice-index": choiceIndex,
				}).appendTo(slot);
			}
		}
		return control;
	}

	const featureChoiceRules = [
		{
			id: "warlock-pact-boon", scope: "class", owner: "Warlock",
			label: "Pact Boon", matches: function (name) { return name === "Pact Boon"; },
			count: function (level) { return level >= 3 ? 1 : 0; }, options: pactBoonOptions,
		},
		{
			id: "warlock-tome-cantrips", scope: "class", owner: "Warlock",
			label: "Pact of the Tome cantrips", matches: function (name) { return name === "Pact Boon"; },
			count: function (level) { return level >= 3 ? 3 : 0; }, options: [],
			visibleWhen: function () {
				return (featureChoiceSelections["class:Warlock:warlock-pact-boon"] || []).indexOf("Pact of the Tome") !== -1;
			},
		},
		{
			id: "warlock-invocations", scope: "class", owner: "Warlock",
			label: "Eldritch Invocations",
			matches: function (name) { return name === "Eldritch Invocations"; },
			count: function (level) {
				return [0, 0, 2, 2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8][level] || 0;
			},
			options: eldritchInvocationOptions,
		},
		{
			id: "warlock-mystic-arcanum", scope: "class", owner: "Warlock",
			label: "Mystic Arcanum spell",
			matches: function (name) { return name.indexOf("Mystic Arcanum") === 0; },
			count: 1, placeholder: "Enter the chosen warlock spell", keyByFeatureName: true,
		},
		{
			id: "sorcerer-metamagic", scope: "class", owner: "Sorcerer",
			label: "Metamagic options",
			matches: function (name) { return /^Metamagic(?:\s+\(\d+\))?$/.test(name); },
			count: function (level) { return level >= 17 ? 4 : level >= 10 ? 3 : level >= 3 ? 2 : 0; },
			options: metamagicOptions,
		},
		{
			id: "bard-magical-secrets", scope: "class", owner: "Bard",
			label: "Magical Secrets spells",
			matches: function (name) { return /^Magical Secrets/.test(name); },
			count: function (level) { return level >= 18 ? 6 : level >= 14 ? 4 : level >= 10 ? 2 : 0; },
			placeholder: "Enter the chosen spell",
		},
		{
			id: "wizard-spell-mastery", scope: "class", owner: "Wizard",
			label: "Spell Mastery spells",
			matches: function (name) { return name === "Spell Mastery"; },
			count: 2, choiceLabels: ["1st-level spell", "2nd-level spell"],
			placeholder: "Enter a spell in your spellbook",
		},
		{
			id: "wizard-signature-spells", scope: "class", owner: "Wizard",
			label: "Signature Spells",
			matches: function (name) { return name === "Signature Spells"; },
			count: 2, placeholder: "Enter a 3rd-level spell in your spellbook",
		},
		{
			id: "artificer-infusions", scope: "class", owner: "Artificer",
			label: "Infusions Known",
			matches: function (name) { return name === "Infuse Item"; },
			count: function (level) { return level >= 18 ? 12 : level >= 14 ? 10 : level >= 10 ? 8 : level >= 6 ? 6 : level >= 2 ? 4 : 0; },
			options: artificerInfusions,
		},
		{
			id: "battle-master-maneuvers", scope: "subclass", owner: "Battle Master",
			label: "Maneuvers",
			matches: function (name) { return name === "Combat Superiority"; },
			count: function (level) { return level >= 15 ? 9 : level >= 10 ? 7 : level >= 7 ? 5 : level >= 3 ? 3 : 0; },
			options: battleMasterManeuvers,
		},
		{
			id: "battle-master-tools", scope: "subclass", owner: "Battle Master",
			label: "Student of War tool proficiency",
			matches: function (name) { return name === "Student of War"; },
			count: function (level) { return level >= 3 ? 1 : 0; }, options: artisanToolOptions,
		},
		{
			id: "arcane-archer-options", scope: "subclass", owner: "Arcane Archer",
			label: "Arcane Shot options",
			matches: function (name) { return /^Arcane Shot Options/.test(name); },
			count: function (level) { return level >= 18 ? 6 : level >= 15 ? 5 : level >= 10 ? 4 : level >= 7 ? 3 : level >= 3 ? 2 : 0; },
			options: arcaneShotOptions,
		},
		{
			id: "arcane-archer-cantrip", scope: "subclass", owner: "Arcane Archer",
			label: "Arcane Archer Lore cantrip",
			matches: function (name) { return name === "Arcane Archer Lore"; },
			count: function (level) { return level >= 3 ? 1 : 0; },
			options: ["Mage Hand", "Mending", "Message", "Prestidigitation"],
		},
		{
			id: "ranger-canny-language", scope: "class", owner: "Ranger",
			label: "Deft Explorer (Canny) language",
			matches: function (name) { return name.indexOf("Deft Explorer (Canny)") !== -1; },
			count: function (level) { return level >= 1 ? 1 : 0; },
			placeholder: "Enter the chosen language",
		},
		{
			id: "rune-knight-runes", scope: "subclass", owner: "Rune Knight",
			label: "Runes known",
			matches: function (name) { return /^Runes Known/.test(name); },
			count: function (level) { return level >= 15 ? 5 : level >= 10 ? 4 : level >= 7 ? 3 : level >= 3 ? 2 : 0; },
			options: runeOptions,
		},
		{
			id: "four-elements-disciplines", scope: "subclass", owner: "Way of the Four Elements",
			label: "Elemental Disciplines",
			matches: function (name) { return /^Elemental Disciplines/.test(name); },
			count: function (level) { return level >= 17 ? 5 : level >= 11 ? 4 : level >= 6 ? 3 : level >= 3 ? 2 : 0; },
			options: elementalDisciplines,
		},
		{
			id: "land-circle-terrain", scope: "subclass", owner: "Circle of Land",
			label: "Circle of the Land terrain",
			matches: function (name) { return name === "Circle Spells"; },
			count: function (level) { return level >= 2 ? 1 : 0; },
			options: ["Arctic", "Coast", "Desert", "Forest", "Grassland", "Mountain", "Swamp", "Underdark"],
		},
		{
			id: "hunter-prey", scope: "subclass", owner: "Hunter",
			label: "Hunter's Prey",
			matches: function (name) { return name === "Hunter’s Prey"; },
			count: function (level) { return level >= 3 ? 1 : 0; },
			options: ["Colossus Slayer", "Giant Killer", "Horde Breaker"],
		},
		{
			id: "hunter-defense", scope: "subclass", owner: "Hunter",
			label: "Defensive Tactics",
			matches: function (name) { return name === "Defensive Tactics"; },
			count: function (level) { return level >= 7 ? 1 : 0; },
			options: ["Escape the Horde", "Multiattack Defense", "Steel Will"],
		},
		{
			id: "hunter-multiattack", scope: "subclass", owner: "Hunter",
			label: "Multiattack",
			matches: function (name) { return name === "Multiattack"; },
			count: function (level) { return level >= 11 ? 1 : 0; },
			options: ["Volley", "Whirlwind Attack"],
		},
		{
			id: "hunter-defense-superior", scope: "subclass", owner: "Hunter",
			label: "Superior Hunter's Defense",
			matches: function (name) { return name === "Superior Hunter’s Defense"; },
			count: function (level) { return level >= 15 ? 1 : 0; },
			options: ["Evasion", "Stand Against the Tide", "Uncanny Dodge"],
		},
		{
			id: "lore-magical-secrets", scope: "subclass", owner: "College of Lore",
			label: "Additional Magical Secrets spells",
			matches: function (name) { return name === "Additional Magical Secrets"; },
			count: function (level) { return level >= 6 ? 2 : 0; },
			placeholder: "Enter a spell from any class",
		},
		{
			id: "dragonborn-ancestry", scope: "race", owner: "Dragonborn",
			label: "Draconic Ancestry",
			matches: function (name) { return name === "Draconic Ancestry"; },
			count: 1, options: dragonAncestries,
		},
		{
			id: "draconic-bloodline-ancestor", scope: "subclass", owner: "Draconic Bloodline",
			label: "Dragon Ancestor",
			matches: function (name) { return name === "Dragon Ancestor"; },
			count: 1, options: dragonAncestries,
		},
		{
			id: "eldritch-adept-feat", scope: "feat", owner: "Eldritch Adept",
			label: "Eldritch Adept invocation",
			matches: function (name) { return name === "Eldritch Adept"; },
			count: 1, options: eldritchInvocationOptions,
			optionFilter: function (option) { return !option.minLevel && !option.pact && !option.requires; },
		},
		{
			id: "metamagic-adept-feat", scope: "feat", owner: "Metamagic Adept",
			label: "Metamagic Adept options",
			matches: function (name) { return name === "Metamagic Adept"; },
			count: 2, options: metamagicOptions,
		},
		{
			id: "martial-adept-feat", scope: "feat", owner: "Martial Adept",
			label: "Martial Adept maneuvers",
			matches: function (name) { return name === "Martial Adept"; },
			count: 2, options: battleMasterManeuvers,
		},
	];

	function renderFeatureChoiceControls(context, featureName, parent) {
		getFeatureChoiceRules(context, featureName).forEach(function (rule) {
			const choiceKey = getFeatureChoiceKey(rule, context, featureName);
			createFeatureChoiceControl(rule, context, featureName, choiceKey).appendTo(parent);
		});
	}

	function syncTalentTreeLevel() {
		let characterLevel = 0;
		let hasClass = false;
		let hasIncompleteClass = false;

		$("#page1 .class-pair").each(function () {
			if ($(this).find(".class-name-input").val().trim() === "") {
				return;
			}

			hasClass = true;
			const levelValue = $(this).find(".class-level-input").val().trim();
			const level = Number(levelValue);
			if (levelValue === "" || !Number.isInteger(level) || level < 1 || level > 20) {
				hasIncompleteClass = true;
				return;
			}

			characterLevel += level;
		});

		if (!hasClass || hasIncompleteClass || characterLevel < 1 || characterLevel > 20) {
			return;
		}

		const storedTalentState = localStorage.getItem(talentStorageKey);
		let talentState = {
			talents: [],
			level: String(characterLevel),
			extra: "0",
		};

		if (storedTalentState !== null) {
			try {
				const parsedTalentState = JSON.parse(storedTalentState);
				if (Array.isArray(parsedTalentState)) {
					talentState.talents = parsedTalentState;
				} else if (parsedTalentState && typeof parsedTalentState === "object" && Array.isArray(parsedTalentState.talents)) {
					talentState = parsedTalentState;
				} else {
					console.error("Unable to sync the talent tree level because its saved state is invalid.");
					return;
				}
			} catch (error) {
				console.error("Unable to read the saved talent tree state.", error);
				return;
			}
		}

		if (String(talentState.level) === String(characterLevel)) {
			return;
		}

		talentState.level = String(characterLevel);
		localStorage.setItem(talentStorageKey, JSON.stringify(talentState));
	}

	function readSelectedTalents() {
		try {
			const savedState = JSON.parse(localStorage.getItem(talentStorageKey));
			const talents = Array.isArray(savedState)
				? savedState
				: savedState && Array.isArray(savedState.talents)
					? savedState.talents
					: [];

			return talents.filter(function (talent) {
				return typeof talent === "string" && talent.trim() !== "";
			}).slice(0, 21);
		} catch (error) {
			console.error("Unable to restore saved talents.", error);
			return [];
		}
	}

	function syncTalentSlots() {
		const talents = readSelectedTalents();

		$("#page1 .talent-slot").each(function (index) {
			$(this).val(talents[index] || "");
		});
	}

	function renderTalentDescriptions(descriptions, fightingStyles) {
		$("#page1 .talent-slot").each(function () {
			const description = (descriptions[this.name] || []).join(" ");
			const descriptionBox = $(this).closest(".talent-entry").find(".talent-description").empty();
			if (description) {
				descriptionBox.text(description);
			}
			if (fightingStyles[this.name]) {
				createFightingStyleControl("talent:" + this.name, fightingStyles[this.name]).appendTo(descriptionBox);
			}
			const hasDescription = description !== "" || !!fightingStyles[this.name];
			descriptionBox.prop("hidden", !hasDescription);
			$(this).closest(".talent-entry").toggleClass("has-description", hasDescription);
		});
	}

	function renderFeatBoonDescriptions(descriptions) {
		$("#page1 .feat-boon-slots input[name^='feat-slot-'], #page1 .feat-boon-slots input[name^='boon-slot-']").each(function () {
			const featureName = $(this).val().trim();
			const description = (descriptions[this.name] || []).join(" ");
			const descriptionBox = $(this).closest(".ability-choice-slot").find(".feature-description")
				.text(description);
			renderFeatureChoiceControls({
				scope: "feat",
				owner: featureName,
				level: 0,
				choiceInstanceKey: "feat:" + this.name,
			}, featureName, descriptionBox);
			const hasDescription = description !== "" || descriptionBox.children(".feature-choice-control").length > 0;
			descriptionBox.prop("hidden", !hasDescription);
			$(this).closest(".ability-choice-slot").toggleClass("has-description", hasDescription);
		});
	}

	syncTalentSlots();
	$(window).on("focus pageshow", function () {
		syncTalentSlots();
		updateFeatures();
	});
	window.addEventListener("storage", function (event) {
		if (event.key === talentStorageKey) {
			syncTalentSlots();
			updateFeatures();
		}
	});
	$("#reset-character").on("click", function () {
		if (!window.confirm("Reset this character sheet and delete all saved character data?")) {
			return;
		}

		$("#page1").saveMyForm("clearStorage");
		localStorage.removeItem("page1_baseSpeed");
		localStorage.removeItem("page1_baseSpeedManual");
		localStorage.removeItem(pointBuyStorageKey);
		localStorage.removeItem(abilityChoiceStorageKey);
		localStorage.removeItem(classAsiStorageKey);
		localStorage.removeItem(characterAsiStorageKey);
		localStorage.removeItem(mentorAsiStorageKey);
		localStorage.removeItem(mentorRoleStorageKey);
		localStorage.removeItem(mentorSpellStorageKey);
		localStorage.removeItem(attackBonusBaseStorageKey);
		localStorage.removeItem(skillChoiceStorageKey);
		localStorage.removeItem(manualSkillProficiencyStorageKey);
		localStorage.removeItem(fightingStyleStorageKey);
		localStorage.removeItem(featureChoiceStorageKey);
		localStorage.removeItem(spellSlotUsageStorageKey);
		localStorage.removeItem("page1_manualAttunementSlots");
		localStorage.removeItem(maxHpStorageKey);
		localStorage.removeItem("page1_racialProficiencies");
		localStorage.removeItem("page1_generatedProficiencies");
		window.location.reload();
	});

	const storedBaseSpeed = localStorage.getItem("page1_baseSpeed");
	let baseSpeedValue = storedBaseSpeed === null
		? $("#page1 [name='speed']").val().trim()
		: JSON.parse(storedBaseSpeed);
	const storedBaseSpeedManual = localStorage.getItem("page1_baseSpeedManual");
	let baseSpeedIsManual = storedBaseSpeedManual === null
		? String(baseSpeedValue).trim() !== "" && Number(baseSpeedValue) !== 30
		: JSON.parse(storedBaseSpeedManual);
	let raceEffects = {};
	let characterEffects = {};
	const skillChoiceStorageKey = "page1_skillChoices";
	const manualSkillProficiencyStorageKey = "page1_manualSkillProficiencies";
	let skillChoices = {};
	let skillChoiceEditMode = false;
	let manualSkillProficiencies = null;
	const storedSkillChoices = localStorage.getItem(skillChoiceStorageKey);
	if (storedSkillChoices) {
		try {
			const parsedSkillChoices = JSON.parse(storedSkillChoices);
			if (parsedSkillChoices && typeof parsedSkillChoices === "object" && !Array.isArray(parsedSkillChoices)) {
				skillChoices = parsedSkillChoices;
			}
		} catch (error) {
			console.error("Unable to restore skill choices.", error);
		}
	}
	const storedManualSkillProficiencies = localStorage.getItem(manualSkillProficiencyStorageKey);
	if (storedManualSkillProficiencies) {
		try {
			const parsedManualSkillProficiencies = JSON.parse(storedManualSkillProficiencies);
			if (Array.isArray(parsedManualSkillProficiencies)) {
				manualSkillProficiencies = parsedManualSkillProficiencies.filter(function (skillName) {
					return typeof skillName === "string";
				});
			}
		} catch (error) {
			console.error("Unable to restore manual skill proficiencies.", error);
		}
	}
	const abilityNames = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
	const pointBuyCosts = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };
	const characterFeatRewardLevels = [1, 3, 6, 9, 12, 15, 18];
	const characterAsiRewardLevels = [4, 8, 12, 16, 20];
	const characterMagicItemRewards = [
		{ level: 2, rarity: "uncommon", slot: 1 },
		{ level: 5, rarity: "uncommon", slot: 2 },
		{ level: 7, rarity: "rare", slot: 1 },
		{ level: 10, rarity: "rare", slot: 2 },
		{ level: 11, rarity: "very-rare", slot: 1 },
		{ level: 13, rarity: "very-rare", slot: 2 },
		{ level: 14, rarity: "very-rare", slot: 3 },
		{ level: 17, rarity: "legendary", slot: 1 },
		{ level: 19, rarity: "artifact", slot: 1 },
	];
	const mentorSinglePointAsiLevels = [4, 8, 12, 16, 19];
	const gestaltSinglePointAsiLevels = [4, 8, 12, 16, 19];
	const mentorFeatureRules = {
		Expert: {
			roleOptions: null,
			features: {
				1: [
					"Bonus proficiencies: choose Dexterity, Intelligence, or Charisma for a saving throw; choose five skills from Arcana, History, Insight, Investigation, Medicine, Performance, Persuasion, and Religion; gain light armor, simple weapon, and two tool proficiencies.",
					"Sneak Attack: once per turn, deal 1d6 extra damage to a creature hit with an attack roll when you have advantage or an ally is within 5 feet. The attack must use finesse or a ranged weapon. The damage scales with Expert level.",
					"Mentor reward: gain an extra feat, magic item, and talent. Random rewards offer four options, and you can build upwards from acquired talent nodes.",
				],
				2: ["Cunning Action: take Dash, Disengage, or Hide as a bonus action on your turn."],
				3: ["Infuse Item: learn one artificer infusion and infuse one item for each infusion known."],
				4: ["Ability Score Improvement"],
				6: ["Flash of Expertise: add your proficiency bonus to a nearby creature's ability check or saving throw as a reaction, proficiency-bonus uses per long rest."],
				7: ["Evasion: take no damage on a successful Dexterity save for half damage, and half damage on a failure; no benefit while incapacitated."],
				8: ["Ability Score Improvement"],
				9: ["Infuse Item Improvement: learn one additional infusion."],
				10: ["Ability Score Improvement"],
				11: ["Magic Item Adept: attune to up to four magic items at once."],
				12: ["Ability Score Improvement"],
				13: ["Infuse Item Improvement: learn one additional infusion."],
				14: ["Tactician's Insight: at combat start, make an Insight check; each 10 points grants insight into one enemy damage resistance or immunity."],
				16: ["Ability Score Improvement"],
				17: ["Infuse Item Improvement: learn one additional infusion."],
				18: ["Sharp Mind: gain proficiency in an Intelligence, Wisdom, or Charisma saving throw."],
				19: ["Ability Score Improvement"],
				20: ["Magic Item Adept+: attune to up to five magic items at once."],
			},
		},
		Spellcaster: {
			roleOptions: {
				Mage: "Wizard spell list; Intelligence is your spellcasting ability.",
				Healer: "Cleric and Druid spell lists; Wisdom is your spellcasting ability.",
				Prodigy: "Bard and Warlock spell lists; Charisma is your spellcasting ability.",
			},
			spellProgression: [
				[1, 2, 0, 0, 0, 0, 0],
				[2, 2, 2, 0, 0, 0, 0],
				[3, 2, 2, 0, 0, 0, 0],
				[3, 3, 2, 0, 0, 0, 0],
				[4, 3, 2, 0, 0, 0, 0],
				[4, 3, 3, 0, 0, 0, 0],
				[5, 3, 3, 0, 0, 0, 0],
				[5, 3, 3, 0, 0, 0, 0],
				[6, 3, 3, 0, 0, 0, 0],
				[6, 4, 4, 2, 0, 0, 0],
				[7, 4, 4, 2, 0, 0, 0],
				[7, 4, 4, 2, 0, 0, 0],
				[8, 4, 4, 2, 0, 0, 0],
				[8, 4, 4, 3, 0, 0, 0],
				[9, 4, 4, 3, 0, 0, 0],
				[9, 4, 4, 3, 0, 0, 0],
				[10, 4, 4, 3, 0, 0, 0],
				[10, 4, 4, 3, 2, 0, 0],
				[11, 4, 4, 3, 2, 0, 0],
				[11, 4, 4, 3, 2, 0, 0],
			],
			features: {
				1: ["Bonus proficiencies: choose Wisdom, Intelligence, or Charisma for a saving throw; choose two skills from Arcana, History, Insight, Investigation, Medicine, Performance, Persuasion, and Religion; gain light armor and one tool proficiency.", "Spellcasting: choose Mage, Healer, or Prodigy as your role. You know two cantrips and one 1st-level spell from its spell list; you regain expended spell slots on a long rest."],
				4: ["Ability Score Improvement"],
				6: ["Potent Cantrips: add your spellcasting ability modifier to cantrip damage."],
				8: ["Ability Score Improvement"],
				12: ["Ability Score Improvement"],
				14: ["Empowered Spells: choose one school of magic; when your sidekick casts one of its spells using a spell slot, add your spellcasting ability modifier to its damage or healing roll."],
				16: ["Ability Score Improvement"],
				18: ["Ability Score Improvement"],
				20: ["Focused Casting: taking damage can't break your concentration on a spell."],
			},
		},
		Warrior: {
			roleOptions: {
				Attacker: "Gain a +2 bonus to all attack rolls.",
				Defender: "Use your reaction to impose disadvantage on an attack against a creature within 5 feet of you (not you), if you can see the attacker.",
			},
			features: {
				1: ["Bonus proficiencies: choose Strength, Dexterity, or Constitution for a saving throw; choose two skills from Acrobatics, Animal Handling, Athletics, Intimidation, Nature, Perception, and Survival; gain proficiency with all armor, shields, and simple and martial weapons.", "Martial Role: choose Attacker or Defender."],
				2: ["Second Wind: regain 1d10 + Warrior level hit points as a bonus action; once per short or long rest, increasing to two uses between rests at level 20."],
				3: ["Improved Critical: your attack rolls score a critical hit on a d20 roll of 19 or 20."],
				4: ["Ability Score Improvement"],
				6: ["Extra Attack: attack twice, instead of once, when you take the Attack action."],
				7: ["Battle Readiness: gain advantage on initiative rolls."],
				8: ["Ability Score Improvement"],
				10: ["Improved Defense: your Armor Class increases by 1."],
				11: ["Indomitable: reroll a failed saving throw and use the new roll; once per long rest, increasing to two uses between long rests at level 18."],
				12: ["Ability Score Improvement"],
				14: ["Ability Score Improvement"],
				15: ["Extra Attack Improvement: attack three times, instead of twice, when you take the Attack action."],
				16: ["Ability Score Improvement"],
				18: ["Indomitable improvement: gain a second use between long rests."],
				19: ["Ability Score Improvement"],
				20: ["Second Wind improvement: gain a second use between rests."],
			},
		},
	};
	const pointBuyStorageKey = "page1_pointBuyBaseScores";
	let pointBuyBaseScores = {};
	const storedPointBuyScores = localStorage.getItem(pointBuyStorageKey);
	if (storedPointBuyScores) {
		try {
			const parsedPointBuyScores = JSON.parse(storedPointBuyScores);
			if (parsedPointBuyScores && typeof parsedPointBuyScores === "object" && !Array.isArray(parsedPointBuyScores)) {
				pointBuyBaseScores = parsedPointBuyScores;
			}
		} catch (error) {
			console.error("Unable to restore saved point-buy scores.", error);
		}
	}
	const abilityChoiceStorageKey = "page1_selectedAbilityChoices";
	let selectedAbilityChoices = {};
	const storedAbilityChoices = localStorage.getItem(abilityChoiceStorageKey);
	if (storedAbilityChoices) {
		try {
			selectedAbilityChoices = JSON.parse(storedAbilityChoices) || {};
		} catch (error) {
			console.error("Unable to restore saved feat and talent ability choices.", error);
		}
	}
	let applyingCalculatedScores = false;
	const maxHpStorageKey = "page1_baseMaxHp";
	let baseMaxHpValue = localStorage.getItem(maxHpStorageKey);
	const maxHpAdjustmentStorageKey = "page1_maxHpAdjustment";
	let maxHpAdjustment = null;
	const storedMaxHpAdjustment = localStorage.getItem(maxHpAdjustmentStorageKey);
	if (storedMaxHpAdjustment !== null) {
		try {
			const parsedMaxHpAdjustment = JSON.parse(storedMaxHpAdjustment);
			if (Number.isFinite(parsedMaxHpAdjustment)) {
				maxHpAdjustment = parsedMaxHpAdjustment;
			} else {
				console.error("Unable to restore the saved hit point adjustment: expected a number.");
			}
		} catch (error) {
			console.error("Unable to restore the saved hit point adjustment.", error);
		}
	}
	if (baseMaxHpValue !== null) {
		try {
			baseMaxHpValue = JSON.parse(baseMaxHpValue);
		} catch (error) {
			console.error("Unable to restore the saved base hit point maximum.", error);
			baseMaxHpValue = null;
		}
	}
	const hitDieByClass = {
		barbarian: 12,
		bard: 8,
		cleric: 8,
		druid: 8,
		fighter: 10,
		monk: 8,
		paladin: 10,
		ranger: 10,
		rogue: 8,
		sorcerer: 6,
		warlock: 8,
		wizard: 6,
		artificer: 8,
	};
	const armorTypes = {
		unarmored: { baseAC: 10, usesDexterity: true },
		padded: { baseAC: 11, usesDexterity: true, stealthDisadvantage: true },
		leather: { baseAC: 11, usesDexterity: true },
		"studded-leather": { baseAC: 12, usesDexterity: true },
		hide: { baseAC: 12, usesDexterity: true, dexterityCap: 2 },
		"chain-shirt": { baseAC: 13, usesDexterity: true, dexterityCap: 2 },
		"scale-mail": { baseAC: 14, usesDexterity: true, dexterityCap: 2, stealthDisadvantage: true },
		breastplate: { baseAC: 14, usesDexterity: true, dexterityCap: 2 },
		"half-plate": { baseAC: 15, usesDexterity: true, dexterityCap: 2, stealthDisadvantage: true },
		"ring-mail": { baseAC: 14, stealthDisadvantage: true },
		"chain-mail": { baseAC: 16, strengthRequirement: 13, stealthDisadvantage: true, heavy: true },
		splint: { baseAC: 17, strengthRequirement: 15, stealthDisadvantage: true, heavy: true },
		plate: { baseAC: 18, strengthRequirement: 15, stealthDisadvantage: true, heavy: true },
		"mage-armor": { baseAC: 13, usesDexterity: true },
		"unarmored-barbarian": { baseAC: 10, usesDexterity: true, secondaryAbility: "Constitution" },
		"unarmored-monk": { baseAC: 10, usesDexterity: true, secondaryAbility: "Wisdom" },
	};

	function savePointBuyBaseScores() {
		localStorage.setItem(pointBuyStorageKey, JSON.stringify(pointBuyBaseScores));
	}

	function updatePointBuyCounter() {
		let spent = 0;
		let complete = true;
		let valid = true;
		abilityNames.forEach(function (ability) {
			const value = pointBuyBaseScores[ability];
			if (value === undefined || String(value).trim() === "") {
				complete = false;
				return;
			}
			const score = Number(value);
			if (!Number.isInteger(score) || pointBuyCosts[score] === undefined) {
				valid = false;
				return;
			}
			spent += pointBuyCosts[score];
		});
		let counterText = complete && valid
			? "Point Buy: " + spent + "/27"
			: "Point Buy: --/27";
		if (complete && valid) {
			counterText += spent <= 27 ? " (" + (27 - spent) + " left)" : " over budget";
		}
		$("#point-buy-counter").text(counterText)
			.toggleClass("over-budget", complete && valid && spent > 27);
		$("#page1 .score-step-button").each(function () {
			const ability = $(this).attr("data-score-ability");
			const change = Number($(this).attr("data-score-change"));
			const baseScore = Number(pointBuyBaseScores[ability]);
			const nextScore = baseScore + change;
			let nextSpent = spent;
			if (complete && valid && change > 0) {
				nextSpent += pointBuyCosts[nextScore] - pointBuyCosts[baseScore];
			}
			$(this).prop("disabled",
				!Number.isInteger(baseScore)
				|| pointBuyCosts[baseScore] === undefined
				|| nextScore < 8
				|| nextScore > 15
				|| (change > 0 && complete && valid && nextSpent > 27)
			);
		});
	}

	function getRacialAbilityScoreBonuses() {
		const bonuses = {};
		abilityNames.forEach(function (ability) {
			bonuses[ability] = 0;
		});
		const race = ($("#page1 [name='race']").val() || "").trim().toLowerCase();
		const isLineage = /^(dhampir|reborn|hexblood)\s+\(/.test(race);
		const knownRace = isLineage || $("#race-options option").filter(function () {
			return $(this).val().toLowerCase() === race;
		}).length > 0;
		if (!knownRace || !race) {
			return bonuses;
		}

		if (race === "mountain dwarf") {
			bonuses.Strength = 2;
			bonuses.Constitution = 2;
			return bonuses;
		}

		const first = $("#page1 [name='racial-asi-ability-1']").val();
		const second = $("#page1 [name='racial-asi-ability-2']").val();
		const third = $("#page1 [name='racial-asi-ability-3']").val();
		const isVariantHuman = race === "variant human";
		const isCustomLineage = race === "custom lineage";
		if (isCustomLineage) {
			if (first) {
				bonuses[first] = 2;
			}
		} else if (isVariantHuman) {
			if (first && second && first !== second) {
				bonuses[first] = 1;
				bonuses[second] = 1;
			}
		} else if ($("#page1 [name='racial-asi-mode']").val() === "three-one") {
			if (first && second && third && first !== second && first !== third && second !== third) {
				bonuses[first] = 1;
				bonuses[second] = 1;
				bonuses[third] = 1;
			}
		} else if (first && second && first !== second) {
			bonuses[first] = 2;
			bonuses[second] = 1;
		}
		return bonuses;
	}

	function updateRacialAbilityScoreControls() {
		const race = ($("#page1 [name='race']").val() || "").trim().toLowerCase();
		const isLineage = /^(dhampir|reborn|hexblood)\s+\(/.test(race);
		const knownRace = isLineage || $("#race-options option").filter(function () {
			return $(this).val().toLowerCase() === race;
		}).length > 0;
		const controls = $("#racial-asi-controls");
		const variantHuman = race === "variant human";
		const customLineage = race === "custom lineage";
		const mountainDwarf = race === "mountain dwarf";
		controls.prop("hidden", !knownRace || !race);
		controls.find(".racial-asi-mode-label, [name='racial-asi-mode']").prop("hidden", variantHuman || customLineage || mountainDwarf);
		controls.find(".racial-asi-fixed")
			.prop("hidden", !mountainDwarf)
			.text(mountainDwarf ? "Strength +2, Constitution +2" : "");
		controls.find(".racial-asi-choice-label, select[name^='racial-asi-ability-']").prop("hidden", mountainDwarf);
		controls.find("label[for='racial-asi-ability-2'], select[name='racial-asi-ability-2']")
			.prop("hidden", mountainDwarf || customLineage);
		controls.find("label[for='racial-asi-ability-3'], select[name='racial-asi-ability-3']")
			.prop("hidden", mountainDwarf || customLineage || variantHuman || $("#page1 [name='racial-asi-mode']").val() !== "three-one");
		const threeOne = $("#page1 [name='racial-asi-mode']").val() === "three-one";
		controls.find("label[for='racial-asi-ability-1']").text(customLineage ? "Increase +2" : variantHuman || threeOne ? "First +1" : "Increase +2");
		controls.find("label[for='racial-asi-ability-2']").text(variantHuman || threeOne ? "Second +1" : "Increase +1");
		controls.find("label[for='racial-asi-ability-3']").text("Third +1");
	}

	function getAbilityScoreBonus(ability) {
		const bonuses = characterEffects.abilityScoreBonuses || {};
		return Number(bonuses[ability]) || 0;
	}

	function initializePointBuyBaseScores() {
		abilityNames.forEach(function (ability) {
			let baseValue = pointBuyBaseScores[ability];
			if (baseValue === undefined || String(baseValue).trim() === "") {
				baseValue = $("#page1 [name='" + ability + "score']").val().trim();
			}
			if (String(baseValue).trim() === "") {
				baseValue = "8";
			}
			pointBuyBaseScores[ability] = baseValue;
		});
		savePointBuyBaseScores();
		updatePointBuyCounter();
	}

	function updateDisplayedAbilityScores() {
		applyingCalculatedScores = true;
		abilityNames.forEach(function (ability) {
			const base = pointBuyBaseScores[ability];
			const input = $("#page1 [name='" + ability + "score']");
			const currentValue = input.val().trim();
			const baseNumber = Number(base);
			const abilityMaximumBonuses = characterEffects.abilityScoreMaximumBonuses || {};
			const abilityMaximum = 20 + (Number(abilityMaximumBonuses[ability]) || 0);
			input.attr("max", abilityMaximum);
			const nextValue = base === undefined || String(base).trim() === ""
				? ""
				: Number.isFinite(baseNumber)
					? String(Math.min(abilityMaximum, baseNumber + getAbilityScoreBonus(ability)))
					: String(base);
			if (currentValue !== nextValue) {
				input.val(nextValue).trigger("change");
			}
			updateModifier(input[0]);
		});
		applyingCalculatedScores = false;
		updatePointBuyCounter();
	}

	function getCalculatedMaxHpBeforeAdjustment() {
		let hitPointsFromClassLevels = 0;
		let totalLevels = 0;
		let firstClassLevel = true;
		const averageHitPointsByDie = { 6: 4, 8: 5, 10: 6, 12: 7 };

		$("#page1 .class-pair").each(function () {
			const className = $(this).find(".class-name-input").val().trim().toLowerCase();
			const levelValue = $(this).find(".class-level-input").val().trim();
			const level = Number(levelValue);
			const hitDie = hitDieByClass[className];
			if (!hitDie || levelValue === "" || !Number.isInteger(level) || level < 1 || level > 20) {
				return;
			}

			hitPointsFromClassLevels += firstClassLevel
				? hitDie + (level - 1) * averageHitPointsByDie[hitDie]
				: level * averageHitPointsByDie[hitDie];
			totalLevels += level;
			firstClassLevel = false;
		});

		const constitutionModifier = getModifierValue("Constitution");
		return hitPointsFromClassLevels + totalLevels * (constitutionModifier === null ? 0 : constitutionModifier);
	}

	function updateDisplayedMaxHp() {
		const input = $("#page1 [name='maxhp']");
		const currentValue = input.val().trim();
		const calculatedBaseMaxHp = getCalculatedMaxHpBeforeAdjustment();
		const calculatedMaxHp = calculatedBaseMaxHp + (characterEffects.maxHpBonus || 0);

		if (maxHpAdjustment === null) {
			if (baseMaxHpValue !== null && String(baseMaxHpValue).trim() !== "" && Number.isFinite(Number(baseMaxHpValue))) {
				maxHpAdjustment = Number(baseMaxHpValue) - calculatedBaseMaxHp;
			} else if (currentValue !== "" && Number.isFinite(Number(currentValue))) {
				maxHpAdjustment = Number(currentValue) - calculatedMaxHp;
			} else {
				maxHpAdjustment = 0;
			}
		}

		const nextValue = String(calculatedMaxHp + maxHpAdjustment);
		if (currentValue !== nextValue) {
			input.val(nextValue).trigger("change");
		}
		localStorage.setItem(maxHpAdjustmentStorageKey, JSON.stringify(maxHpAdjustment));
		localStorage.removeItem(maxHpStorageKey);
	}

	function updateModifier(scoreInput) {
		const ability = $(scoreInput).closest("li");
		const scoreValue = ability.find(".score input").val().trim();
		const modifierInput = ability.find(".modifier input");

		if (scoreValue === "" || !Number.isFinite(Number(scoreValue))) {
			modifierInput.val("");
			return;
		}

		const modifier = Math.floor((Number(scoreValue) - 10) / 2);
		modifierInput.val(modifier >= 0 ? "+" + modifier : modifier);
	}

	function updateInitiative() {
		const modifierValue = $("#page1 [name='Dexteritymod']").val().trim();
		const initiativeInput = $("#page1 [name='initiative']");

		if (modifierValue === "" || !Number.isFinite(Number(modifierValue))) {
			initiativeInput.val("");
			return;
		}

		let initiativeBonus = (characterEffects.initiativeBonusAbilities || []).reduce(function (total, ability) {
			return total + (getModifierValue(ability) || 0);
		}, 0);
		initiativeBonus += characterEffects.initiativeBonus || 0;
		if (characterEffects.initiativeProficiencyBonus) {
			initiativeBonus += Number($("#page1 [name='proficiencybonus']").val()) || 0;
		}
		const initiative = Number(modifierValue) + initiativeBonus;
		initiativeInput.val(initiative >= 0 ? "+" + initiative : initiative);
	}

	function getTotalClassLevels(excludedLevelInput) {
		let totalLevel = 0;
		const gestalt = isGestaltEnabled();

		$("#page1 .class-pair").each(function () {
			if ($(this).find(".class-name-input").val().trim() === "") {
				return;
			}

			const levelInput = $(this).find(".class-level-input");
			if (levelInput[0] === excludedLevelInput) {
				return;
			}

			const levelValue = levelInput.val().trim();
			const level = Number(levelValue);
			if (levelValue !== "" && Number.isInteger(level) && level >= 1 && level <= 20) {
				totalLevel = gestalt ? Math.max(totalLevel, level) : totalLevel + level;
			}
		});

		return totalLevel;
	}

	function updateTotalHitDice() {
		const levelsByDie = {};
		const checkedStates = {};

		$("#page1 .hit-die-checks input[type='checkbox']").each(function () {
			checkedStates[this.name] = this.checked;
		});

		$("#page1 .class-pair").each(function () {
			const className = $(this).find(".class-name-input").val().trim().toLowerCase();
			const levelValue = $(this).find(".class-level-input").val().trim();
			const level = Number(levelValue);
			const hitDie = hitDieByClass[className];

			if (!hitDie || levelValue === "" || !Number.isInteger(level) || level < 1 || level > 20) {
				return;
			}

			levelsByDie[hitDie] = (levelsByDie[hitDie] || 0) + level;
		});

		$("#page1 .hit-die-row").each(function () {
			const row = $(this);
			const hitDie = Number(row.attr("data-die"));
			const count = levelsByDie[hitDie] || 0;
			const checks = row.find(".hit-die-checks");
			checks.empty();
			row.find(".hit-die-total").text(count + "d" + hitDie);
			row.prop("hidden", count === 0);

			for (let index = 1; index <= count; index++) {
				const checkboxName = "hitdie-d" + hitDie + "-" + index;
				const storageKey = "page1_" + checkboxName;
				const checkbox = $("<input type='checkbox' />").attr({
					name: checkboxName,
					"aria-label": "Spent d" + hitDie + " hit die " + index,
				});
				const isChecked = Object.prototype.hasOwnProperty.call(checkedStates, checkboxName)
					? checkedStates[checkboxName]
					: localStorage.getItem(storageKey) === "true";

				checkbox.prop("checked", isChecked);
				checks.append(checkbox);
			}
		});
	}

	function getClassLevelForUseTracker(className, subclassName) {
		let level = 0;
		$("#page1 .class-pair").each(function () {
			const pairClassName = $(this).find(".class-name-input").val().trim();
			const pairSubclassName = $(this).find(".subclass-name-input").val().trim();
			if ((className && pairClassName.toLowerCase() === className.toLowerCase())
				|| (subclassName && pairSubclassName.toLowerCase() === subclassName.toLowerCase())) {
				const levelValue = $(this).find(".class-level-input").val().trim();
				const classLevel = Number(levelValue);
				if (Number.isInteger(classLevel) && classLevel >= 1 && classLevel <= 20) {
					level = classLevel;
				}
			}
		});
		return level;
	}

	function getClassNameForUseTracker(subclassName) {
		let className = "";
		$("#page1 .class-pair").each(function () {
			if ($(this).find(".subclass-name-input").val().trim().toLowerCase() === subclassName.toLowerCase()) {
				className = $(this).find(".class-name-input").val().trim();
			}
		});
		return className;
	}

	function getAbilityUseDefinition(featureName, className, classLevel, source) {
		const normalizedFeature = featureName.trim().toLowerCase();
		const normalizedClass = (className || "").toLowerCase();
		const proficiencyBonus = Number($("#page1 [name='proficiencybonus']").val()) || 0;
		const charismaModifier = getModifierValue("Charisma");
		const intelligenceModifier = getModifierValue("Intelligence");
		let definition = null;

		if (source === "mentor") {
			if (normalizedClass === "expert" && normalizedFeature.indexOf("flash of expertise:") === 0) {
				definition = { key: "flash-of-expertise", maximum: proficiencyBonus, recharge: "long" };
			} else if (normalizedClass === "warrior" && normalizedFeature.indexOf("second wind:") === 0) {
				definition = { key: "second-wind", maximum: classLevel >= 20 ? 2 : 1, recharge: "long" };
			} else if (normalizedClass === "warrior" && normalizedFeature.indexOf("indomitable:") === 0) {
				definition = { key: "indomitable", maximum: classLevel >= 18 ? 2 : 1, recharge: "long" };
			}
		} else if (normalizedClass === "expert" && normalizedFeature.indexOf("flash of expertise:") === 0) {
			definition = { key: "flash-of-expertise", maximum: proficiencyBonus, recharge: "long" };
		} else if (normalizedClass === "warrior" && normalizedFeature.indexOf("second wind:") === 0) {
			definition = { key: "second-wind", maximum: classLevel >= 20 ? 2 : 1, recharge: "long" };
		} else if (normalizedClass === "warrior" && normalizedFeature.indexOf("indomitable:") === 0) {
			definition = { key: "indomitable", maximum: classLevel >= 18 ? 2 : 1, recharge: "long" };
		} else if (normalizedClass === "barbarian" && normalizedFeature === "rage" && classLevel < 20) {
			const rageUses = classLevel >= 17 ? 6 : classLevel >= 12 ? 5 : classLevel >= 6 ? 4 : classLevel >= 3 ? 3 : 2;
			definition = { key: "rage", maximum: rageUses, recharge: "long" };
		} else if (normalizedClass === "bard" && normalizedFeature.indexOf("bardic inspiration") === 0) {
			definition = { key: "bardic-inspiration", maximum: Math.max(1, charismaModifier || 0), recharge: classLevel >= 5 ? "short" : "long" };
		} else if (normalizedClass === "cleric" && normalizedFeature.indexOf("channel divinity") === 0) {
			const channelUsesMatch = normalizedFeature.match(/\((\d+)\/rest\)/);
			definition = { key: "channel-divinity", maximum: channelUsesMatch ? Number(channelUsesMatch[1]) : 1, recharge: "short" };
		} else if (normalizedClass === "cleric" && normalizedFeature === "harness divine power") {
			definition = { key: "harness-divine-power", maximum: classLevel >= 18 ? 3 : classLevel >= 6 ? 2 : 1, recharge: "long" };
		} else if (normalizedClass === "cleric" && normalizedFeature.indexOf("divine intervention") === 0 && classLevel < 20) {
			definition = { key: "divine-intervention", maximum: 1, recharge: "long" };
		} else if (normalizedClass === "druid" && normalizedFeature === "wild shape") {
			definition = { key: "wild-shape", maximum: 2, recharge: "short" };
		} else if (normalizedClass === "fighter" && normalizedFeature.indexOf("second wind") === 0) {
			definition = { key: "second-wind", maximum: 1, recharge: "short" };
		} else if (normalizedClass === "fighter" && normalizedFeature.indexOf("action surge") === 0) {
			definition = { key: "action-surge", maximum: classLevel >= 17 ? 2 : 1, recharge: "short" };
		} else if (normalizedClass === "fighter" && normalizedFeature.indexOf("indomitable") === 0) {
			definition = { key: "indomitable", maximum: classLevel >= 17 ? 3 : classLevel >= 13 ? 2 : 1, recharge: "long" };
		} else if (normalizedClass === "fighter" && normalizedFeature.indexOf("combat superiority") === 0) {
			definition = { key: "combat-superiority", maximum: classLevel >= 15 ? 6 : classLevel >= 7 ? 5 : 4, recharge: "short" };
		} else if (normalizedClass === "fighter" && normalizedFeature.indexOf("arcane shot") === 0) {
			definition = { key: "arcane-shot", maximum: 2, recharge: "short" };
		} else if (normalizedClass === "fighter" && normalizedFeature.indexOf("fighting spirit") === 0) {
			definition = { key: "fighting-spirit", maximum: 3, recharge: "long" };
		} else if (normalizedClass === "monk" && normalizedFeature === "ki") {
			definition = { key: "ki", maximum: classLevel, recharge: "short" };
		} else if (normalizedClass === "paladin" && normalizedFeature === "divine sense") {
			definition = { key: "divine-sense", maximum: 1 + Math.max(0, charismaModifier || 0), recharge: "long" };
		} else if (normalizedClass === "paladin" && normalizedFeature === "cleansing touch") {
			definition = { key: "cleansing-touch", maximum: Math.max(1, charismaModifier || 0), recharge: "long" };
		} else if (normalizedClass === "ranger" && normalizedFeature.indexOf("favored foe") === 0) {
			definition = { key: "favored-foe", maximum: proficiencyBonus, recharge: "long" };
		} else if (normalizedClass === "ranger" && normalizedFeature.indexOf("nature’s veil") === 0) {
			definition = { key: "natures-veil", maximum: proficiencyBonus, recharge: "long" };
		} else if (normalizedClass === "rogue" && normalizedFeature === "stroke of luck") {
			definition = { key: "stroke-of-luck", maximum: 1, recharge: "short" };
		} else if (normalizedClass === "sorcerer" && normalizedFeature === "font of magic") {
			definition = { key: "sorcery-points", maximum: classLevel, recharge: "long" };
		} else if (normalizedClass === "warlock" && normalizedFeature === "eldritch master") {
			definition = { key: "eldritch-master", maximum: 1, recharge: "long" };
		} else if (normalizedClass === "wizard" && normalizedFeature === "arcane recovery") {
			definition = { key: "arcane-recovery", maximum: 1, recharge: "long" };
		} else if (normalizedClass === "artificer" && normalizedFeature === "flash of genius") {
			definition = { key: "flash-of-genius", maximum: Math.max(1, intelligenceModifier || 0), recharge: "long" };
		} else if (normalizedFeature.indexOf("breath weapon") === 0) {
			definition = { key: "breath-weapon", maximum: 1, recharge: "short" };
		} else if (normalizedFeature.indexOf("relentless endurance") === 0) {
			definition = { key: "relentless-endurance", maximum: 1, recharge: "long" };
		} else if (normalizedFeature.indexOf("fey step") === 0) {
			definition = { key: "fey-step", maximum: 1, recharge: "short" };
		}

		if (!definition || !Number.isInteger(definition.maximum) || definition.maximum < 1) {
			return null;
		}
		return definition;
	}

	function createAbilityUseTracker(featureName, source, className, classLevel, identity) {
		const definition = getAbilityUseDefinition(featureName, className, classLevel, source);
		if (!definition || !identity) {
			return $();
		}

		const resourceIdentity = identity + "|" + definition.key;
		const tracker = $("<span>", {
			class: "ability-use-tracker",
			title: definition.maximum + " uses per " + definition.recharge + " rest",
			"aria-label": featureName + ": " + definition.maximum + " uses per " + definition.recharge + " rest",
		});
		$("<span>", { class: "ability-use-label", text: "Uses" }).appendTo(tracker);
		for (let useIndex = 1; useIndex <= definition.maximum; useIndex++) {
			const storageKey = "page1_abilityUse_" + encodeURIComponent(resourceIdentity) + "_" + useIndex;
			const checkbox = $("<input>", {
				type: "checkbox",
				class: "ability-use-checkbox",
				name: "ability-use-" + encodeURIComponent(resourceIdentity) + "-" + useIndex,
				"aria-label": featureName + " use " + useIndex + " of " + definition.maximum,
				title: "Use " + useIndex + " of " + definition.maximum,
				"data-ability-use-storage": storageKey,
			});
			checkbox.prop("checked", localStorage.getItem(storageKey) === "true");
			tracker.append(checkbox);
		}
		return tracker;
	}

	function takeLongRest() {
		$("#page1 .hit-die-checks input[type='checkbox']")
			.prop("checked", false)
			.each(function () {
				localStorage.setItem("page1_" + this.name, JSON.stringify(false));
			});

		const resourceStorageKeys = [];
		for (let storageIndex = 0; storageIndex < localStorage.length; storageIndex++) {
			const storageKey = localStorage.key(storageIndex);
			if (storageKey && (storageKey.indexOf("page1_abilityUse_") === 0 || /^page1_hitdie-d\d+-\d+$/.test(storageKey))) {
				resourceStorageKeys.push(storageKey);
			}
		}
		resourceStorageKeys.forEach(function (storageKey) {
			localStorage.setItem(storageKey, JSON.stringify(false));
		});
		$("#page1 .ability-use-checkbox").prop("checked", false);
		$("#page1 .mentor-spell-slot-used").prop("checked", false);
		if (mentorSpellChoices.usedSlots) {
			Object.keys(mentorSpellChoices.usedSlots).forEach(function (spellLevel) {
				mentorSpellChoices.usedSlots[spellLevel] = mentorSpellChoices.usedSlots[spellLevel].map(function () {
					return false;
				});
			});
			saveMentorSpellChoices();
		}
		Object.keys(spellSlotUsage).forEach(function (key) {
			spellSlotUsage[key] = spellSlotUsage[key].map(function () { return false; });
		});
		saveSpellSlotUsage();
		renderSpellcasting();

		const maximumHp = Number($("#page1 [name='maxhp']").val());
		if (Number.isFinite(maximumHp)) {
			$("#page1 [name='currenthp']").val(maximumHp).trigger("input").trigger("change");
		}
	}

	function storeHitDieCheckbox(checkbox) {
		const storageKey = "page1_" + checkbox.name;
		localStorage.setItem(storageKey, JSON.stringify(checkbox.checked));

		const elementListKey = "elementList_page1";
		const elementList = JSON.parse(localStorage.getItem(elementListKey)) || [];
		if (elementList.indexOf(storageKey) === -1) {
			elementList.push(storageKey);
			localStorage.setItem(elementListKey, JSON.stringify(elementList));
		}
	}

	function updateProficiencyBonus(event) {
		const populatedPairs = $("#page1 .class-pair").filter(function () {
			return $(this).find(".class-name-input").val().trim() !== "";
		});
		const changedLevelInput = event && $(event.target).hasClass("class-level-input")
			? event.target
			: null;

		if (changedLevelInput) {
			if (!isGestaltEnabled()) {
				const remainingLevel = Math.max(0, 20 - getTotalClassLevels(changedLevelInput));
				const changedLevel = Number($(changedLevelInput).val());
				if ($(changedLevelInput).val().trim() !== "" && changedLevel > remainingLevel) {
					$(changedLevelInput).val(remainingLevel >= 1 ? remainingLevel : "");
				}
			}
		}

		let validLevels = populatedPairs.length > 0;
		let totalLevel = 0;

		$("#page1 .class-pair").each(function () {
			const levelInput = $(this).find(".class-level-input");
			const maxLevel = isGestaltEnabled() ? 20 : Math.max(0, 20 - getTotalClassLevels(levelInput[0]));
			levelInput.attr("max", maxLevel);

			if ($(this).find(".class-name-input").val().trim() === "") {
				return;
			}

			const levelValue = levelInput.val().trim();
			const level = Number(levelValue);

			if (levelValue === "" || !Number.isInteger(level) || level < 1 || level > 20) {
				validLevels = false;
				return;
			}

			totalLevel = isGestaltEnabled() ? Math.max(totalLevel, level) : totalLevel + level;
		});
		if (totalLevel > 20) {
			validLevels = false;
		}
		const proficiencyInput = $("#page1 [name='proficiencybonus']");

		if (!validLevels) {
			proficiencyInput.val("");
			updateSavingThrows();
			updateSkills();
			updateTotalHitDice();
			return;
		}

		const proficiencyBonus = 2 + Math.floor((totalLevel - 1) / 4);
		proficiencyInput.val("+" + proficiencyBonus);
		updateSavingThrows();
		updateSkills();
		updateTotalHitDice();
	}

	function updateClassLevelFields() {
		const pairs = $("#page1 .class-pair");
		let lastPopulatedPair = -1;

		pairs.each(function (index) {
			if ($(this).find(".class-name-input").val().trim() !== "") {
				lastPopulatedPair = index;
			}
		});

		const totalLevel = getTotalClassLevels();
		const extraPairCount = totalLevel < 20 ? 1 : 0;
		let visiblePairCount = Math.min(pairs.length, Math.max(1, lastPopulatedPair + 1 + extraPairCount));
		const focusedPair = $(document.activeElement).closest(".class-pair");
		if (focusedPair.length > 0) {
			visiblePairCount = Math.max(visiblePairCount, pairs.index(focusedPair) + 1);
		}

		pairs.each(function (index) {
			this.hidden = index >= visiblePairCount;
		});

		updateProficiencyBonus();
	}

	function updateSelectedClass(input) {
		const pair = $(input).closest(".class-pair");
		const selectedClass = $(input).val().trim();
		const isValidClass = $("#class-options option").filter(function () {
			return $(this).val() === selectedClass;
		}).length > 0;
		const levelInput = pair.find(".class-level-input");

		if (isValidClass && levelInput.val().trim() === "") {
			if (getTotalClassLevels() >= 20) {
				$(input).val("");
				updateClassLevelFields();
				return;
			}

			levelInput.val("1").trigger("input").trigger("change");
		}

		updateSubclassForPair(pair);
		updateClassLevelFields();
	}

	function updateSavingThrows() {
		const proficiencyValue = $("#page1 [name='proficiencybonus']").val().trim();
		let proficiencyBonus = Number(proficiencyValue);
		const savingThrowEffects = (characterEffects.saveAdvantages || [])
			.concat(characterEffects.saveDisadvantages || [])
			.concat(characterEffects.rageEffects || []);

		if (!Number.isFinite(proficiencyBonus)) {
			proficiencyBonus = 0;
		}

		$("#page1 .saves input[type='text']").each(function () {
			const saveName = $(this).attr("name");
			const abilityName = saveName.replace("-save", "");
			const modifierValue = $("#page1 [name='" + abilityName + "mod']").val().trim();
			const proficient = $("#page1 [name='" + saveName + "-prof']").is(":checked");
			const expertise = (characterEffects.expertiseSavingThrows || []).indexOf(abilityName) !== -1;
			const advantageReasons = getRollAdvantageReasons(savingThrowEffects, "saving", abilityName);
			const disadvantageReasons = getRollDisadvantageReasons(savingThrowEffects, "saving", abilityName);
			$(this).closest("li")
				.toggleClass("save-advantage", advantageReasons.length > 0)
				.toggleClass("save-disadvantage", disadvantageReasons.length > 0)
				.attr("title", getRollIndicatorTitle(advantageReasons, disadvantageReasons));

			if (modifierValue === "" || !Number.isFinite(Number(modifierValue))) {
				$(this).val("");
				return;
			}

			let saveBonus = (characterEffects.saveBonusAbilities || []).reduce(function (total, ability) {
				return total + Math.max(1, getModifierValue(ability) || 0);
			}, 0);
			saveBonus += characterEffects.allSavingThrowBonus || 0;
			if (characterEffects.halfProficiencyToSaves) {
				saveBonus += Math.ceil(proficiencyBonus / 2);
			}
			const save = Number(modifierValue)
				+ (proficient ? proficiencyBonus * (expertise ? 2 : 1) : 0)
				+ saveBonus;
			$(this).val(save >= 0 ? "+" + save : save);
		});
	}

	function updateClassSavingThrows() {
		let firstClass = "";

		$("#page1 .class-pair").each(function () {
			const className = $(this).find(".class-name-input").val().trim();

			if (className !== "" && firstClass === "") {
				firstClass = className;
			}
		});

		// Remove all existing class-based saving throw proficiencies
		$("#page1 .saves input[type='checkbox']")
			.prop("checked", false);

		const rules = classRules[firstClass];
		const featureSavingThrows = (getClassModifierEffects().savingThrows || [])
			.concat(getSelectedFeatBoonTalentEffects().savingThrows || []);

		if (!rules || !rules.savingThrows) {
			featureSavingThrows.forEach(function (ability) {
				$("#page1 .saves input[name='" + ability + "-save-prof']").prop("checked", true);
			});
			updateSavingThrows();
			return;
		}

		(rules.savingThrows || []).concat(featureSavingThrows).filter(function (ability, index, saves) {
			return saves.indexOf(ability) === index;
		}).forEach(function (ability) {
			$("#page1 .saves input[name='" + ability + "-save-prof']")
				.prop("checked", true);
		});

		updateSavingThrows();
	}


	function updateSkills() {
		const abilityNames = {
			str: "Strength",
			dex: "Dexterity",
			con: "Constitution",
			int: "Intelligence",
			wis: "Wisdom",
			cha: "Charisma",
		};
		const proficiencyValue = $("#page1 [name='proficiencybonus']").val().trim();
		let proficiencyBonus = Number(proficiencyValue);

		if (!Number.isFinite(proficiencyBonus)) {
			proficiencyBonus = 0;
		}

		$("#page1 .skills ul li").each(function () {
			const abilityCode = $(this).find("label .skill").text().replace(/[()]/g, "").trim().toLowerCase();
			const abilityName = abilityNames[abilityCode];
			const skillInput = $(this).find("input[type='text']").first();
			const skillName = $(this).find("label").clone().children().remove().end().text().trim();
			const skillEffects = (characterEffects.checkAdvantages || [])
				.concat(characterEffects.checkDisadvantages || [])
				.concat(characterEffects.rageEffects || []);
			const advantageReasons = getRollAdvantageReasons(skillEffects, "check", skillName, abilityName);
			const disadvantageReasons = getRollDisadvantageReasons(skillEffects, "check", skillName, abilityName);
			if (skillName === "Stealth" && $("#page1").attr("data-armor-stealth-disadvantage") === "true") {
				disadvantageReasons.push("Equipped armor imposes disadvantage on Stealth checks");
			}
			$(this)
				.toggleClass("skill-advantage", advantageReasons.length > 0)
				.toggleClass("skill-disadvantage", disadvantageReasons.length > 0)
				.attr("title", getRollIndicatorTitle(advantageReasons, disadvantageReasons));

			if (!abilityName) {
				skillInput.val("");
				return;
			}

			const modifierValue = $("#page1 [name='" + abilityName + "mod']").val().trim();
			const proficient = $(this).find("input[type='checkbox']").is(":checked");

			if (modifierValue === "" || !Number.isFinite(Number(modifierValue))) {
				skillInput.val("");
				return;
			}

			const expertise = (characterEffects.expertiseSkills || []).indexOf(skillName) !== -1;
			const skill = Number(modifierValue) + (proficient ? proficiencyBonus * (expertise ? 2 : 1) : 0);
			skillInput.val(skill >= 0 ? "+" + skill : skill);
		});

		updatePassivePerception();
	}

	const classSkillChoices = {
		Barbarian: { count: 2, options: ["Animal Handling", "Athletics", "Intimidation", "Nature", "Perception", "Survival"] },
		Bard: { count: 3, options: "all" },
		Cleric: { count: 2, options: ["History", "Insight", "Medicine", "Persuasion", "Religion"] },
		Druid: { count: 2, options: ["Animal Handling", "Arcana", "Insight", "Medicine", "Nature", "Perception", "Religion", "Survival"] },
		Fighter: { count: 2, options: ["Acrobatics", "Animal Handling", "Athletics", "History", "Insight", "Intimidation", "Perception", "Survival"] },
		Monk: { count: 2, options: ["Acrobatics", "Athletics", "History", "Insight", "Religion", "Stealth"] },
		Paladin: { count: 2, options: ["Athletics", "Insight", "Intimidation", "Medicine", "Persuasion", "Religion"] },
		Ranger: { count: 3, options: ["Animal Handling", "Athletics", "Insight", "Investigation", "Nature", "Perception", "Stealth", "Survival"] },
		Rogue: { count: 4, options: ["Acrobatics", "Athletics", "Deception", "Insight", "Intimidation", "Investigation", "Perception", "Performance", "Persuasion", "Sleight of Hand", "Stealth"] },
		Sorcerer: { count: 2, options: ["Arcana", "Deception", "Insight", "Intimidation", "Persuasion", "Religion"] },
		Warlock: { count: 2, options: ["Arcana", "Deception", "History", "Intimidation", "Investigation", "Nature", "Religion"] },
		Wizard: { count: 2, options: ["Arcana", "History", "Insight", "Investigation", "Medicine", "Religion"] },
		Artificer: { count: 2, options: ["Arcana", "History", "Investigation", "Medicine", "Nature", "Perception", "Sleight of Hand"] },
	};
	const druidSkillChoices = ["Animal Handling", "Arcana", "Insight", "Medicine", "Nature", "Perception", "Religion", "Survival"];
	const allSkillNames = $("#page1 .skills ul li").map(function () {
		return $(this).find("input[type='checkbox']").attr("name").replace(/-prof$/, "");
	}).get();

	function addSkillChoiceDefinition(definitions, type, key, label, count, options, gainsProficiency) {
		const normalizedOptions = options === "all"
			? allSkillNames.slice()
			: options === "proficient"
				? "proficient"
				: options.slice();
		if ((Array.isArray(normalizedOptions) && normalizedOptions.length === 0) || count < 1) {
			return;
		}
		definitions[type].push({
			key: key,
			label: label,
			count: count,
			options: normalizedOptions,
			gainsProficiency: !!gainsProficiency,
		});
	}

	function getSkillChoiceDefinitions() {
		const definitions = { proficiency: [], expertise: [] };
		$("#page1 .class-pair").each(function (pairIndex) {
			const className = $(this).find(".class-name-input").val().trim();
			const level = Number($(this).find(".class-level-input").val());
			if (!className || !Number.isInteger(level) || level < 1 || level > 20) {
				return;
			}
			const classChoices = classSkillChoices[className];
			if (classChoices) {
				addSkillChoiceDefinition(
					definitions,
					"proficiency",
					"class-" + pairIndex + "-skills",
					className + " skills",
					classChoices.count,
					classChoices.options,
					true
				);
			}
			if (className === "Bard" && level >= 3) {
				addSkillChoiceDefinition(definitions, "expertise", "class-" + pairIndex + "-expertise-1", "Bard Expertise", 2, "proficient", false);
			}
			if (className === "Bard" && level >= 10) {
				addSkillChoiceDefinition(definitions, "expertise", "class-" + pairIndex + "-expertise-2", "Additional Bard Expertise", 2, "proficient", false);
			}
			if (className === "Rogue" && level >= 1) {
				addSkillChoiceDefinition(definitions, "expertise", "class-" + pairIndex + "-expertise-1", "Rogue Expertise", 2, "proficient", false);
			}
			if (className === "Rogue" && level >= 6) {
				addSkillChoiceDefinition(definitions, "expertise", "class-" + pairIndex + "-expertise-2", "Additional Rogue Expertise", 2, "proficient", false);
			}
			if (className === "Ranger" && level >= 1) {
				addSkillChoiceDefinition(definitions, "expertise", "class-" + pairIndex + "-canny", "Deft Explorer (Canny) Expertise", 1, "all", true);
			}

			const subclassName = $(this).find(".subclass-name-input").val().trim();
			if (subclassName === "College of Lore" && level >= 3) {
				addSkillChoiceDefinition(definitions, "proficiency", "subclass-" + pairIndex + "-lore", "College of Lore Bonus Proficiencies", 3, "all", true);
			} else if (subclassName === "Nature Domain" && level >= 1) {
				addSkillChoiceDefinition(definitions, "proficiency", "subclass-" + pairIndex + "-nature-domain", "Nature Domain Druid Skill", 1, druidSkillChoices, true);
			} else if (subclassName === "Arcane Archer" && level >= 3) {
				addSkillChoiceDefinition(definitions, "proficiency", "subclass-" + pairIndex + "-arcane-archer", "Arcane Archer Lore Skill", 1, ["Arcana", "Nature"], true);
			} else if (subclassName === "Knowledge Domain" && level >= 1) {
				addSkillChoiceDefinition(definitions, "expertise", "subclass-" + pairIndex + "-knowledge-domain", "Knowledge Domain Expertise", 2, ["Arcana", "History", "Nature", "Religion"], true);
			} else if (subclassName === "Cavalier" && level >= 3) {
				addSkillChoiceDefinition(definitions, "proficiency", "subclass-" + pairIndex + "-cavalier", "Cavalier Bonus Proficiency", 1, ["Animal Handling", "History"], true);
			} else if (subclassName === "Fey Wanderer" && level >= 3) {
				addSkillChoiceDefinition(definitions, "proficiency", "subclass-" + pairIndex + "-fey-wanderer", "Otherworldly Glamour", 1, ["Deception", "Performance", "Persuasion"], true);
			} else if (subclassName === "Samurai" && level >= 3) {
				addSkillChoiceDefinition(definitions, "proficiency", "subclass-" + pairIndex + "-samurai", "Samurai Bonus Proficiency", 1, ["History", "Insight", "Performance", "Persuasion"], true);
			} else if (subclassName === "Purple Dragon Knight" && level >= 3) {
				addSkillChoiceDefinition(definitions, "proficiency", "subclass-" + pairIndex + "-purple-dragon-knight", "Purple Dragon Knight Bonus Proficiency", 1, ["Animal Handling", "Insight", "Performance", "Persuasion"], true);
			}
		});

		if (isMentorEnabled()) {
			const mentorType = $("#page1 [name='mentor-type']").val();
			if (mentorType === "Expert") {
				addSkillChoiceDefinition(definitions, "proficiency", "mentor-expert-skills", "Expert Mentor skill proficiencies", 5, "all", true);
			} else if (mentorType === "Spellcaster") {
				addSkillChoiceDefinition(definitions, "proficiency", "mentor-spellcaster-skills", "Spellcaster Mentor skill proficiencies", 2, ["Arcana", "History", "Insight", "Investigation", "Medicine", "Performance", "Persuasion", "Religion"], true);
			} else if (mentorType === "Warrior") {
				addSkillChoiceDefinition(definitions, "proficiency", "mentor-warrior-skills", "Warrior Mentor skill proficiencies", 2, ["Acrobatics", "Animal Handling", "Athletics", "Intimidation", "Nature", "Perception", "Survival"], true);
			}
		}

		const raceName = $("#page1 [name='race']").val().trim();
		const raceFamily = racialFeatAliases[raceName.toLowerCase()] || raceName;
		const racialSkillChoices = {
			"Half-Elf": { count: 2, options: "all" },
			"Variant Human": { count: 1, options: "all" },
			"Centaur": { count: 1, options: ["Animal Handling", "Survival"] },
			"Githyanki": { count: 1, options: "all" },
			"Kender": { count: 1, options: ["Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception", "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival"] },
			"Kenku": { count: 2, options: "all" },
			"Leonin": { count: 1, options: ["Athletics", "Intimidation", "Perception", "Survival"] },
			"Lizardfolk": { count: 2, options: ["Animal Handling", "Nature", "Perception", "Stealth", "Survival"] },
			"Shifter": { count: 1, options: ["Athletics", "Acrobatics", "Intimidation", "Survival"] },
			"Vedalken": { count: 1, options: "all" },
			"Warforged": { count: 1, options: "all" },
		};
		const racialChoice = racialSkillChoices[raceName] || racialSkillChoices[raceFamily];
		if (racialChoice) {
			addSkillChoiceDefinition(definitions, "proficiency", "race-" + raceName.toLowerCase().replace(/[^a-z0-9]+/g, "-"), raceName + " skill proficiencies", racialChoice.count, racialChoice.options, true);
		}

		$("#page1 [name^='feat-slot-']").each(function () {
			const featName = getBaseSelectedFeatureName($(this).val()).toLowerCase();
			if (featName === "skill expert" || featName === "prodigy") {
				const slotKey = this.name;
				addSkillChoiceDefinition(definitions, "proficiency", "feat-" + slotKey + "-skill", featName + " skill proficiency", 1, "all", true);
				addSkillChoiceDefinition(definitions, "expertise", "feat-" + slotKey + "-expertise", featName + " Expertise", 1, "proficient", false);
			} else if (featName === "squat nimbleness") {
				addSkillChoiceDefinition(definitions, "proficiency", "feat-" + this.name + "-skill", "Squat Nimbleness skill proficiency", 1, ["Athletics", "Acrobatics"], true);
			}
		});
		return definitions;
	}

	function getManualSkillProficiencies(definitions, fixedSkills) {
		if (manualSkillProficiencies === null) {
			const generatedSkills = (fixedSkills || []).slice();
			(definitions.proficiency || []).forEach(function (definition) {
				if (definition.gainsProficiency) {
					generatedSkills.push.apply(generatedSkills, getValidSkillChoiceValues(definition));
				}
			});
			(definitions.expertise || []).forEach(function (definition) {
				if (definition.gainsProficiency) {
					generatedSkills.push.apply(generatedSkills, getValidSkillChoiceValues(definition));
				}
			});
			manualSkillProficiencies = $("#page1 .skills input[type='checkbox']").map(function () {
				const skillName = this.name.replace(/-prof$/, "");
				return this.checked && generatedSkills.indexOf(skillName) === -1 ? skillName : null;
			}).get();
			localStorage.setItem(manualSkillProficiencyStorageKey, JSON.stringify(manualSkillProficiencies));
		}

		$("#page1 .skills input[type='checkbox']").each(function () {
			const skillName = this.name.replace(/-prof$/, "");
			$(this).data("manualRacialProficiency", manualSkillProficiencies.indexOf(skillName) !== -1);
		});
		return manualSkillProficiencies.slice();
	}

	function getValidSkillChoiceValues(definition, allowedOptions) {
		const selected = Array.isArray(skillChoices[definition.key]) ? skillChoices[definition.key] : [];
		const options = allowedOptions || (definition.options === "proficient" ? allSkillNames : definition.options);
		return selected.slice(0, definition.count).map(function (skillName) {
			return options.indexOf(skillName) !== -1 ? skillName : "";
		});
	}

	function getSkillChoiceEffects(definitions, fixedSkills) {
		const effects = { skills: [], expertiseSkills: [] };
		const manualSkills = getManualSkillProficiencies(definitions, fixedSkills);
		const proficiencyGroups = definitions.proficiency;
		proficiencyGroups.forEach(function (definition) {
			if (!definition.gainsProficiency) {
				return;
			}
			getValidSkillChoiceValues(definition).forEach(function (skillName) {
				if (skillName) {
					effects.skills.push(skillName);
				}
			});
		});
		const proficientSkills = manualSkills.concat(fixedSkills || [], effects.skills)
			.filter(function (skillName, index, skills) {
				return allSkillNames.indexOf(skillName) !== -1 && skills.indexOf(skillName) === index;
			});
		definitions.expertise.forEach(function (definition) {
			const availableExpertiseSkills = definition.options === "proficient"
				? proficientSkills
				: definition.options;
			getValidSkillChoiceValues(definition, definition.gainsProficiency ? definition.options : availableExpertiseSkills).forEach(function (skillName) {
				if (!skillName) {
					return;
				}
				if (!definition.gainsProficiency && proficientSkills.indexOf(skillName) === -1) {
					return;
				}
				if (definition.gainsProficiency) {
					effects.skills.push(skillName);
					proficientSkills.push(skillName);
				}
				effects.expertiseSkills.push(skillName);
			});
		});
		return {
			skills: effects.skills.filter(function (skillName, index, skills) {
				return skills.indexOf(skillName) === index;
			}),
			expertiseSkills: effects.expertiseSkills.filter(function (skillName, index, skills) {
				return skills.indexOf(skillName) === index;
			}),
			proficientSkills: proficientSkills,
		};
	}

	function renderSkillChoiceControls(definitions, proficientSkills) {
		const proficiencyList = $("#page1 #skill-choice-list").empty();
		const expertiseList = $("#page1 #skill-expertise-list").empty();
		const allDefinitions = definitions.proficiency.concat(definitions.expertise);
		const hasDefinitions = allDefinitions.length > 0;
		const hasSelectedChoices = allDefinitions.some(function (definition) {
			return getValidSkillChoiceValues(definition).some(Boolean);
		});
		$("#page1 .skill-choice-controls").prop("hidden", !hasDefinitions);
		$("#page1 #skill-choice-edit")
			.text(skillChoiceEditMode ? "Done" : "Edit choices")
			.prop("hidden", !hasSelectedChoices);
		function renderGroups(groups, container, type) {
			groups.forEach(function (definition) {
				const group = $("<div>", { class: "skill-choice-group" }).appendTo(container);
				$("<label>", { text: definition.label }).appendTo(group);
				const availableOptions = definition.options === "proficient"
					? proficientSkills
					: definition.options;
				const selectedValues = getValidSkillChoiceValues(definition, availableOptions);
				for (let index = 0; index < definition.count; index++) {
					if (!skillChoiceEditMode && selectedValues[index]) {
						continue;
					}
					const select = $("<select>", {
						"data-skill-choice-key": definition.key,
						"data-skill-choice-type": type,
						"data-skill-choice-index": index,
						"aria-label": definition.label + " " + (index + 1),
					}).appendTo(group);
					$("<option>", { value: "", text: "Choose skill" }).appendTo(select);
					availableOptions.forEach(function (skillName) {
						const duplicate = selectedValues.some(function (selectedSkill, selectedIndex) {
							return selectedIndex !== index && selectedSkill === skillName;
						});
						$("<option>", { value: skillName, text: skillName })
							.prop("disabled", duplicate)
							.appendTo(select);
					});
					select.val(selectedValues[index] || "");
				}
				if (group.find("select").length === 0) {
					group.remove();
				} else {
					const selectCount = group.find("select").length;
					const availableWidth = group.width();
					const columnCount = Math.max(1, Math.min(selectCount, Math.floor(availableWidth / 70)));
					group.css("grid-template-columns", "repeat(" + columnCount + ", minmax(0, 1fr))");
				}
			});
		}
		renderGroups(definitions.proficiency, proficiencyList, "proficiency");
		renderGroups(definitions.expertise, expertiseList, "expertise");
		const expertiseSkills = characterEffects.expertiseSkills || [];
		$("#page1 .skills ul li").each(function () {
			const skillName = $(this).find("input[type='checkbox']").attr("name").replace(/-prof$/, "");
			$(this).toggleClass("skill-expertise", expertiseSkills.indexOf(skillName) !== -1);
		});
	}

	function getRollAdvantageReasons(effects, rollType, rollName, abilityName) {
		return getRollEffectReasons(effects, "advantage", rollType, rollName, abilityName)
			.concat(rollType === "check"
				? (characterEffects.skillAdvantages || []).filter(function (skillName) {
					return String(skillName).toLowerCase() === String(rollName).toLowerCase();
				}).map(function () { return "Advantage on " + rollName + " checks"; })
				: [])
			.filter(function (reason, index, values) { return values.indexOf(reason) === index; });
	}

	function getRollDisadvantageReasons(effects, rollType, rollName, abilityName) {
		return getRollEffectReasons(effects, "disadvantage", rollType, rollName, abilityName)
			.concat(rollType === "check"
				? (characterEffects.skillDisadvantages || []).filter(function (skillName) {
					return String(skillName).toLowerCase() === String(rollName).toLowerCase();
				}).map(function () { return "Disadvantage on " + rollName + " checks"; })
				: [])
			.filter(function (reason, index, values) { return values.indexOf(reason) === index; });
	}

	function getRollEffectReasons(effects, polarity, rollType, rollName, abilityName) {
		const reasons = [];
		const rollPattern = rollType === "saving" ? /saving throws?/i : /(?:ability )?checks?/i;
		const abilityNames = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
		const ability = abilityName || "";

		(effects || []).forEach(function (effect) {
			if (typeof effect !== "string") {
				return;
			}
			const pattern = new RegExp("\\b" + polarity + "\\s+on\\s+(.+?)\\s+" + rollPattern.source + "\\b", "i");
			const match = pattern.exec(effect);
			if (!match) {
				return;
			}

			const scope = match[1];
			const scopeAbilities = abilityNames.filter(function (name) {
				return new RegExp("\\b" + name + "\\b", "i").test(scope);
			});
			const appliesToRoll = /\b(?:all|any)\b/i.test(scope)
				|| (rollType === "saving"
					? scopeAbilities.length === 0 || scopeAbilities.indexOf(rollName) !== -1
					: !ability || scopeAbilities.length === 0 || scopeAbilities.indexOf(ability) !== -1);
			if (!appliesToRoll) {
				return;
			}

			const remainder = effect.slice(match.index + match[0].length).trim().replace(/[.,;]+$/, "").trim();
			if (remainder) {
				const isDangerSenseScope = rollType === "saving"
					&& /^against effects you can see(?:,\s*while not blinded, deafened, or incapacitated)?$/i.test(remainder);
				const isSharedDuration = /^to you\b/i.test(remainder);
				const isCombinedRageScope = rollType === "check"
					&& new RegExp("^and\\s+(?:" + abilityNames.join("|") + ")\\s+saving throws?$", "i").test(remainder);
				if (!isDangerSenseScope && !isSharedDuration && !isCombinedRageScope) {
					return;
				}
			}
			reasons.push(effect);
		});
		return reasons;
	}

	function getRollIndicatorTitle(advantageReasons, disadvantageReasons) {
		return advantageReasons.map(function (reason) {
			return "Advantage: " + reason;
		}).concat(disadvantageReasons.map(function (reason) {
			return "Disadvantage: " + reason;
		})).join("\n");
	}

	function updatePassivePerception() {
		const perceptionValue = $("#page1 [name='Perception']").val().trim();
		const passivePerception = $("#page1 [name='passiveperception']");

		if (perceptionValue === "" || !Number.isFinite(Number(perceptionValue))) {
			passivePerception.val("");
			return;
		}

		passivePerception.val(10 + Number(perceptionValue) + (characterEffects.passivePerceptionBonus || 0));
	}

	function getModifierValue(abilityName) {
		const modifierValue = $("#page1 [name='" + abilityName + "mod']").val().trim();

		if (modifierValue === "" || !Number.isFinite(Number(modifierValue))) {
			return null;
		}

		return Number(modifierValue);
	}

	function updateArmorCalculations() {
		const armorType = $("#page1 [name='armor-type']").val();
		const armor = armorTypes[armorType] || armorTypes.unarmored;
		let armorClass = armor.baseAC;
		let armorClassValid = true;
		let classArmor = armorType === "unarmored" ? characterEffects.classArmor : null;
		const racialArmor = armorType === "unarmored" ? characterEffects.armor : null;
		if (classArmor && classArmor.requiresNoShield && $("#page1 [name='armor-shield']").is(":checked")) {
			classArmor = null;
		}
		let usesDexterity = armor.usesDexterity;
		let secondaryAbility = armor.secondaryAbility;
		const dexterityModifier = getModifierValue("Dexterity");
		const miscBonusValue = $("#page1 [name='armor-ac-bonus']").val().trim();
		const miscBonus = miscBonusValue === "" ? 0 : Number(miscBonusValue);

		if (classArmor || racialArmor) {
			const unarmoredFeature = classArmor || racialArmor;
			armorClass = unarmoredFeature.base;
			usesDexterity = !!unarmoredFeature.dexterity;
			secondaryAbility = unarmoredFeature.ability;
		}

		if (usesDexterity) {
			if (dexterityModifier === null) {
				armorClassValid = false;
			} else {
				let dexterityCap = armor.dexterityCap;
				if (characterEffects.mediumArmorMaster && dexterityCap === 2 && dexterityModifier >= 3) {
					dexterityCap = 3;
				}
				armorClass += armor.dexterityCap === undefined
					? dexterityModifier
					: Math.min(dexterityModifier, dexterityCap);
			}
		}

		if (secondaryAbility) {
			const secondaryModifier = getModifierValue(secondaryAbility);

			if (secondaryModifier === null) {
				armorClassValid = false;
			} else {
				armorClass += secondaryModifier;
			}
		}

		if (Number.isFinite(miscBonus)) {
			armorClass += miscBonus;
		}

		armorClass += characterEffects.armorBonus || 0;
		const proficiencyBonus = Number($("#page1 [name='proficiencybonus']").val()) || 0;
		if (characterEffects.halfProficiencyToArmor) {
			armorClass += Math.ceil(proficiencyBonus / 2);
		}
		const equippedArmorType = $("#page1 [name='armor-type']").val();
		const isUnarmoredForBonus = ["unarmored", "unarmored-barbarian", "unarmored-monk"].indexOf(equippedArmorType) !== -1;
		armorClass += isUnarmoredForBonus
			? characterEffects.armorBonusWhileUnarmored || 0
			: characterEffects.armorBonusWhileArmored || 0;

		if ($("#page1 [name='armor-shield']").is(":checked")) {
			if (armorType != "unarmored-monk")
				armorClass += 2;
			else
				armorClass += 0;
		}

		$("#page1 [name='ac']").val(armorClassValid ? armorClass : "");
		const mediumArmorTypes = ["hide", "chain-shirt", "scale-mail", "breastplate", "half-plate"];
		const stealthDisadvantage = !!armor.stealthDisadvantage
			&& !(characterEffects.mediumArmorMaster && mediumArmorTypes.indexOf(equippedArmorType) !== -1);
		$("#page1")
			.attr("data-armor-stealth-disadvantage", stealthDisadvantage ? "true" : "false");
		updateArmorSpeed(armor);
		updateSkills();
	}

	function updateArmorSpeed(armor) {
		const speedInput = $("#page1 [name='speed']");
		const effectiveBaseSpeed = !baseSpeedIsManual && Number.isFinite(characterEffects.walkSpeed)
			? characterEffects.walkSpeed
			: baseSpeedValue;
		const speedValue = String(effectiveBaseSpeed).trim();
		const speed = Number(speedValue);
		const strengthValue = $("#page1 [name='Strengthscore']").val().trim();
		const strength = Number(strengthValue);
		const strengthRequirementNotMet = armor.strengthRequirement !== undefined
			&& strengthValue !== ""
			&& Number.isFinite(strength)
			&& strength < armor.strengthRequirement;
		const heavyArmorSpeedPenalty = strengthRequirementNotMet
			&& !characterEffects.ignoreHeavyArmorSpeedPenalty
			? 10
			: 0;

		localStorage.setItem("page1_baseSpeed", JSON.stringify(String(baseSpeedValue).trim()));

		if (speedValue === "" || !Number.isFinite(speed)) {
			speedInput.val(speedValue);
			return;
		}

		const armorType = $("#page1 [name='armor-type']").val();
		const isUnarmored = ["unarmored", "unarmored-barbarian", "unarmored-monk"].indexOf(armorType) !== -1;
		const speedBonus = (characterEffects.speedBonuses || []).reduce(function (total, bonus) {
			const meetsArmorRequirement = !bonus.notWearingHeavyArmor || !armor.heavy;
			const meetsUnarmoredRequirement = !bonus.unarmored || isUnarmored;
			const meetsShieldRequirement = !bonus.noShield || !$("#page1 [name='armor-shield']").is(":checked");
			return total + (meetsArmorRequirement && meetsUnarmoredRequirement && meetsShieldRequirement ? bonus.value : 0);
		}, 0);
		let monkLevel = 0;
		$("#page1 .class-pair").each(function () {
			if ($(this).find(".class-name-input").val().trim() === "Monk") {
				const level = Number($(this).find(".class-level-input").val());
				if (Number.isInteger(level) && level > 0) {
					monkLevel += level;
				}
			}
		});
		monkLevel = Math.min(20, monkLevel);
		const monkMovementBonus = monkLevel >= 18 ? 30
			: monkLevel >= 14 ? 25
				: monkLevel >= 10 ? 20
					: monkLevel >= 6 ? 15
						: monkLevel >= 2 ? 10
							: 0;
		const hasShield = $("#page1 [name='armor-shield']").is(":checked");
		speedInput.val(speed + speedBonus + (isUnarmored && !hasShield ? monkMovementBonus : 0) - heavyArmorSpeedPenalty);
	}

	function updateAttunementSlots() {
		const slotCountInput = $("#page1 [name='attunement-slots']");
		const manualSlotStorageKey = "page1_manualAttunementSlots";
		const savedManualSlots = localStorage.getItem(manualSlotStorageKey);
		let manualSlotCount = savedManualSlots === null
			? Number(slotCountInput.val())
			: Number(savedManualSlots);
		if (!Number.isInteger(manualSlotCount)) {
			manualSlotCount = 3;
		}
		manualSlotCount = Math.max(3, Math.min(6, manualSlotCount));
		if (savedManualSlots === null) {
			localStorage.setItem(manualSlotStorageKey, String(manualSlotCount));
		}

		let artificerLevel = 0;
		$("#page1 .class-pair").each(function () {
			if ($(this).find(".class-name-input").val().trim().toLowerCase() !== "artificer") {
				return;
			}

			const levelValue = $(this).find(".class-level-input").val().trim();
			const level = Number(levelValue);
			if (Number.isInteger(level) && level >= 1 && level <= 20) {
				artificerLevel += level;
			}
		});
		const artificerBonusSlots = (artificerLevel >= 10 ? 1 : 0)
			+ (artificerLevel >= 14 ? 1 : 0)
			+ (artificerLevel >= 18 ? 1 : 0);
		const mentorLevel = Number(getTotalClassLevels());
		const expertMentorLevel = isMentorEnabled() && $("#page1 [name='mentor-type']").val() === "Expert"
			? mentorLevel
			: 0;
		const expertMentorSlots = expertMentorLevel >= 20 ? 5 : expertMentorLevel >= 11 ? 4 : 3;
		const minimumSlotCount = Math.min(6, Math.max(3 + artificerBonusSlots, expertMentorSlots));
		let slotCount = Math.max(manualSlotCount, minimumSlotCount);
		slotCount = Math.max(3, Math.min(6, slotCount));
		slotCountInput.attr("min", minimumSlotCount);
		slotCountInput.val(slotCount);

		$("#page1 .attunement-slots-grid input[type='checkbox']").each(function (index) {
			const enabled = index < slotCount;
			$(this).prop("disabled", !enabled);

			if (!enabled) {
				$(this).prop("checked", false);
			}
		});
	}

	function isMentorEnabled() {
		return $("#page1 [name='mentor-enabled']").is(":checked");
	}

	function isMentorSinglePointLevel(level) {
		return isMentorEnabled() && mentorSinglePointAsiLevels.indexOf(Number(level)) !== -1;
	}

	function isGestaltEnabled() {
		return isMentorEnabled();
	}

	function isSinglePointClassAsi(level) {
		return isMentorSinglePointLevel(level)
			|| (isGestaltEnabled() && gestaltSinglePointAsiLevels.indexOf(Number(level)) !== -1);
	}

	function saveMentorSpellChoices() {
		localStorage.setItem(mentorSpellStorageKey, JSON.stringify(mentorSpellChoices));
	}

	function getAttackBonusBaseValue(input) {
		if (!Object.prototype.hasOwnProperty.call(attackBonusBaseValues, input.name)) {
			attackBonusBaseValues[input.name] = $(input).val();
			localStorage.setItem(attackBonusBaseStorageKey, JSON.stringify(attackBonusBaseValues));
		}
		return String(attackBonusBaseValues[input.name] || "");
	}

	function updateCalculatedAttackBonuses() {
		const mentorBonus = Number(characterEffects.attackBonus) || 0;
		$("#page1 input[name^='atkbonus']").each(function () {
			const baseValue = getAttackBonusBaseValue(this);
			const match = baseValue.trim().match(/^([+-]?\d+)(.*)$/);
			if (!match) {
				$(this).val(baseValue);
				return;
			}
			const adjustedBonus = Number(match[1]) + mentorBonus;
			$(this).val((adjustedBonus > 0 ? "+" : "") + adjustedBonus + match[2]);
		});
	}

	function renderMentorSpellcasting(mentor, mentorType, mentorLevel) {
		const panel = $("#page1 #mentor-spellcasting-panel");
		const spellChoices = $("#page1 #mentor-spell-choice-list").empty();
		const slotTracker = $("#page1 #mentor-spell-slot-tracker").empty();
		const isSpellcaster = mentorType === "Spellcaster" && mentor && mentorLevel > 0;
		panel.prop("hidden", !isSpellcaster);
		if (!isSpellcaster) {
			return;
		}

		const progression = mentor.spellProgression[mentorLevel - 1];
		[
			{ key: "cantrips", label: "Cantrips", count: progression[1] },
			{ key: "spells", label: "Spells known", count: progression[0] },
		].forEach(function (category) {
			const group = $("<div>", { class: "mentor-spell-choice-group" }).appendTo(spellChoices);
			$("<strong>", { text: category.label }).appendTo(group);
			for (let index = 0; index < category.count; index++) {
				const values = Array.isArray(mentorSpellChoices[category.key]) ? mentorSpellChoices[category.key] : [];
				const input = $("<input>", {
					type: "text",
					class: "mentor-spell-choice-input",
					"data-spell-choice-kind": category.key,
					"data-spell-choice-index": index,
					"aria-label": category.label + " " + (index + 1),
					placeholder: (category.key === "cantrips" ? "Cantrip " : "Spell ") + (index + 1),
				}).val(values[index] || "");
				input.appendTo(group);
			}
		});

		const spellLevelNames = ["1st", "2nd", "3rd", "4th", "5th"];
		progression.slice(2).forEach(function (maximum, levelIndex) {
			if (!maximum) {
				return;
			}
			const spellLevel = levelIndex + 1;
			const levelGroup = $("<div>", { class: "mentor-spell-slot-group" }).appendTo(slotTracker);
			const usedSlots = mentorSpellChoices.usedSlots && mentorSpellChoices.usedSlots[spellLevel] || [];
			$("<span>", {
				class: "mentor-spell-slot-level",
				text: spellLevelNames[levelIndex] + "-level slots (" + maximum + ")",
			}).appendTo(levelGroup);
			for (let slotIndex = 0; slotIndex < maximum; slotIndex++) {
				const checkbox = $("<input>", {
					type: "checkbox",
					class: "mentor-spell-slot-used",
					"data-spell-slot-level": spellLevel,
					"data-spell-slot-index": slotIndex,
					"aria-label": spellLevelNames[levelIndex] + "-level slot " + (slotIndex + 1) + " expended",
				}).prop("checked", !!usedSlots[slotIndex]);
				$("<label>", { class: "mentor-spell-slot" })
					.append(checkbox)
					.appendTo(levelGroup);
			}
		});
	}

	function updateExpertInfusionSlots(mentorType, mentorLevel) {
		const infusionCount = mentorType !== "Expert"
			? 0
			: (mentorLevel >= 3 ? 1 : 0)
				+ (mentorLevel >= 9 ? 1 : 0)
				+ (mentorLevel >= 13 ? 1 : 0)
				+ (mentorLevel >= 17 ? 1 : 0);
		$("#page1 input[name^='magic-infusion-']:not([name^='magic-infusion-item-'])").each(function (index) {
			const unlocked = index < infusionCount;
			if (!unlocked && magicItemInput === this) {
				closeMagicItemSuggestions();
			}
			$(this)
				.prop("readOnly", !unlocked)
				.toggleClass("locked-magic-item-slot", !unlocked)
				.attr("placeholder", unlocked ? "Infusion " + (index + 1) : "Unlocks at Expert level " + [3, 9, 13, 17][index]);
			if (unlocked) {
				$(this).attr("data-suggestion-list", "magic-infusion-options").removeAttr("aria-readonly");
			} else {
				$(this).removeAttr("data-suggestion-list").attr("aria-readonly", "true");
			}
		});
		$("#page1 [name^='magic-infusion-item-']").each(function (index) {
			const unlocked = index < infusionCount;
			$(this)
				.prop("readOnly", !unlocked)
				.toggleClass("locked-magic-item-slot", !unlocked)
				.attr("placeholder", unlocked ? "Infused item " + (index + 1) : "Unlocks with infusion " + (index + 1));
			if (unlocked) {
				$(this).removeAttr("aria-readonly");
			}
		});
		$("#page1 #expert-infusion-limit").text(
			infusionCount + " infusion" + (infusionCount === 1 ? "" : "s") + " known; up to " + infusionCount + " item" + (infusionCount === 1 ? "" : "s") + " can be infused."
		);
	}

	function getGestaltFeatureName(feature) {
		return typeof feature === "string" ? feature : feature && feature.name;
	}

	function removeGestaltDuplicateFeatures(featureGroups) {
		const seenFeatureSources = {};
		const replacements = [];
		featureGroups.forEach(function (group) {
			group.features = group.features.filter(function (feature) {
				const name = getGestaltFeatureName(feature);
				if (!name || /^Ability Score Improvement(?:\s+\(\d+\))?$/i.test(name)) {
					return true;
				}
				if (!seenFeatureSources[name]) {
					seenFeatureSources[name] = group.source;
					return true;
				}
				if (seenFeatureSources[name] === group.source) {
					return true;
				}
				replacements.push(name);
				return false;
			});
		});
		return replacements;
	}

	const classRules = {
		"Barbarian": {
			savingThrows: ["Strength", "Constitution"],

			features: {
				1: ["Rage", "Unarmored Defense"],
				2: ["Reckless Attack", "Danger Sense"],
				3: ["Primal Knowledge"],
				4: ["Ability Score Improvement"],
				5: ["Extra Attack", "Fast Movement"],
				7: ["Feral Instinct", "Instinctive Pounce"],
				8: [
					{
						name: "Ability Score Improvement (2)",
						replaces: "Ability Score Improvement"
					}
				],
				9: ["Brutal Critical (1 die)"],
				10: ["Primal Knowledge"],
				11: ["Relentless Rage"],
				12: [
					{
						name: "Ability Score Improvement (3)",
						replaces: "Ability Score Improvement (2)"
					}
				],
				13: [
					{
						name: "Brutal Critical (2 dice)",
						replaces: "Brutal Critical (1 die)"
					}
				],
				15: ["Persistent Rage"],
				16: [
					{
						name: "Ability Score Improvement (4)",
						replaces: "Ability Score Improvement (3)"
					}
				],
				17: [
					{
						name: "Brutal Critical (3 dice)",
						replaces: "Brutal Critical (2 dice)"
					}
				],
				18: ["Indomitable Might"],
				19: [
					{
						name: "Ability Score Improvement (5)",
						replaces: "Ability Score Improvement (4)"
					}
				],
				20: ["Primal Champion"]
			}
		},

		"Bard": {
			spellcasting: { type: "fullCaster", ability: "Charisma" },
			cantrips: [
				"Blade Ward", "Dancing Lights", "Friends", "Light", "Mage Hand",
				"Mending", "Message", "Minor Illusion", "Prestidigitation",
				"True Strike", "Vicious Mockery",
			],
			savingThrows: ["Dexterity", "Charisma"],

			features: {
				1: ["Spellcasting", "Additional Bard Spells", "Bardic Inspiration (d6)"],
				2: ["Jack of All Trades", "Magical Inspiration", "Song of Rest (d6)"],
				3: ["Expertise (2)"],
				4: ["Ability Score Improvement", "Bardic Versatility"],
				5: [
					{
						name: "Bardic Inspiration (d8)",
						replaces: "Bardic Inspiration (d6)"
					},
					"Font of Inspiration"],
				6: ["Countercharm"],
				8: [
					{
						name: "Ability Score Improvement (2)",
						replaces: "Ability Score Improvement"
					}
				],
				9: [
					{
						name: "Song of Rest (d8)",
						replaces: "Song of Rest (d6)"
					}
				],
				10: [
					{
						name: "Bardic Inspiration (d10)",
						replaces: "Bardic Inspiration (d8)"
					},
					{
						name: "Expertise (4)",
						replaces: "Expertise (2)"
					},
					"Magical Secrets (2)"],
				12: [
					{
						name: "Ability Score Improvement (3)",
						replaces: "Ability Score Improvement (2)"
					}
				],
				13: [
					{
						name: "Song of Rest (d10)",
						replaces: "Song of Rest (d8)"
					}
				],
				14: [
					{
						name: "Magical Secrets (4)",
						replaces: "Magical Secrets (2)"
					}
				],
				15: [
					{
						name: "Bardic Inspiration (d12)",
						replaces: "Bardic Inspiration (d10)"
					}
				],
				16: [
					{
						name: "Ability Score Improvement (4)",
						replaces: "Ability Score Improvement (3)"
					}
				],
				17: [
					{
						name: "Song of Rest (d12)",
						replaces: "Song of Rest (d10)"
					}
				],
				18: [
					{
						name: "Magical Secrets (6)",
						replaces: "Magical Secrets (4)"
					}
				],
				19: [
					{
						name: "Ability Score Improvement (5)",
						replaces: "Ability Score Improvement (4)"
					}
				],
				20: ["Superior Inspiration"]
			}
		},

		"Cleric": {
			spellcasting: { type: "fullCaster", ability: "Wisdom" },
			cantrips: [
				"Guidance", "Light", "Mending", "Resistance", "Sacred Flame",
				"Spare the Dying", "Thaumaturgy",
			],
			savingThrows: ["Wisdom", "Charisma"],

			features: {
				1: ["Spellcasting", "Additional Cleric Spells"],
				2: ["Channel Divinity (1/rest)", "Harness Divine Power"],
				4: ["Ability Score Improvement", "Cantrip Versatility"],
				5: ["Destroy Undead (CR 1/2)"],
				6: [
					{
						name: "Channel Divinity (2/rest)",
						replaces: "Channel Divinity (1/rest)"
					}
				],
				8: [
					{
						name: "Ability Score Improvement (2)",
						replaces: "Ability Score Improvement"
					},
					{
						name: "Divine Strike",
						replacesChoice: [
							"Blessed Strikes",
							"Potent Spellcasting"
						]
					},
					{
						name: "Destroy Undead (CR 1)",
						replaces: "Destroy Undead (CR 1/2)"
					}
				],
				10: ["Divine Intervention"],
				11: [
					{
						name: "Destroy Undead (CR 2)",
						replaces: "Destroy Undead (CR 1)"
					}
				],
				12: [
					{
						name: "Ability Score Improvement (3)",
						replaces: "Ability Score Improvement (2)"
					}
				],
				14: [
					{
						name: "Destroy Undead (CR 3)",
						replaces: "Destroy Undead (CR 2)"
					}
				],
				16: [
					{
						name: "Ability Score Improvement (4)",
						replaces: "Ability Score Improvement (3)"
					}
				],
				17: [
					{
						name: "Destroy Undead (CR 4)",
						replaces: "Destroy Undead (CR 3)"
					}
				],
				18: [
					{
						name: "Channel Divinity (3/rest)",
						replaces: "Channel Divinity (2/rest)"
					}
				],
				19: [
					{
						name: "Ability Score Improvement (5)",
						replaces: "Ability Score Improvement (4)"
					}
				],
				20: [
					{
						name: "Divine Intervention Improvement",
						replaces: "Divine Intervention"
					}
				]
			}
		},

		"Druid": {
			spellcasting: { type: "fullCaster", ability: "Wisdom" },
			cantrips: [
				"Druidcraft", "Guidance", "Mending", "Poison Spray", "Produce Flame",
				"Resistance", "Shillelagh", "Thorn Whip",
			],
			savingThrows: ["Intelligence", "Wisdom"],

			features: {
				1: ["Spellcasting", "Additional Druid Spells", "Druidic"],
				2: ["Wild Companion", "Wild Shape"],
				4: ["Ability Score Improvement", "Cantrip Versatility", "Wild Shape Improvement (swim speed)"],
				8: [
					{
						name: "Ability Score Improvement (2)",
						replaces: "Ability Score Improvement"
					},
					{
						name: "Wild Shape Improvement (swim and flight speed)",
						replaces: "Wild Shape Improvement (swim speed)"
					}
				],
				10: ["Druid Circle feature"],
				12: [
					{
						name: "Ability Score Improvement (3)",
						replaces: "Ability Score Improvement (2)"
					}
				],
				16: [
					{
						name: "Ability Score Improvement (4)",
						replaces: "Ability Score Improvement (3)"
					}
				],
				18: ["Timeless Body", "Beast Spells"],
				19: [
					{
						name: "Ability Score Improvement (5)",
						replaces: "Ability Score Improvement (4)"
					}
				],
				20: ["Archdruid"]
			}
		},

		"Fighter": {
			subclassSpellcasting: {
				"Eldritch Knight": { type: "thirdCaster", ability: "Intelligence" },
			},
			savingThrows: ["Strength", "Constitution"],

			features: {
				1: ["Fighting Style", "Fighting Style Options", "Second Wind"],
				2: ["Action Surge"],
				4: ["Ability Score Improvement", "Martial Versatility"],
				5: ["Extra Attack"],
				6: [
					{
						name: "Ability Score Improvement (2)",
						replaces: "Ability Score Improvement"
					}
				],
				8: [
					{
						name: "Ability Score Improvement (3)",
						replaces: "Ability Score Improvement (2)"
					}
				],
				9: ["Indomitable"],
				11: [
					{
						name: "Extra Attack (2)",
						replaces: "Extra Attack"
					}
				],
				12: [
					{
						name: "Ability Score Improvement (4)",
						replaces: "Ability Score Improvement (3)"
					}
				],
				13: [
					{
						name: "Indomitable (2)",
						replaces: "Indomitable"
					}
				],
				14: [
					{
						name: "Ability Score Improvement (5)",
						replaces: "Ability Score Improvement (4)"
					}
				],
				16: [
					{
						name: "Ability Score Improvement (6)",
						replaces: "Ability Score Improvement (5)"
					}
				],
				17: [
					{
						name: "Action Surge (2)",
						replaces: "Action Surge"
					},
					{
						name: "Indomitable (3)",
						replaces: "Indomitable (2)"
					}
				],
				19: [
					{
						name: "Ability Score Improvement (7)",
						replaces: "Ability Score Improvement (6)"
					}
				],
				20: [
					{
						name: "Extra Attack (3)",
						replaces: "Extra Attack (2)"
					}
				]

			}
		},

		"Monk": {
			savingThrows: ["Strength", "Dexterity"],

			features: {
				1: ["Unarmored Defense", "Martial Arts"],
				2: ["Dedicated Weapon", "Ki", "Unarmored Movement (10 ft.)"],
				3: ["Deflect Missiles", "Ki-Fueled Attack"],
				4: ["Ability Score Improvement", "Quickened Healing", "Slow Fall"],
				5: ["Stunning Strike", "Focused Aim", "Extra Attack"],
				6: ["Ki-Empowered Strikes",
					{
						name: "Unarmored Movement (15 ft.)",
						replaces: "Unarmored Movement (10 ft.)"
					}
				],
				7: ["Evasion", "Stillness of Mind"],
				8: [
					{
						name: "Ability Score Improvement (2)",
						replaces: "Ability Score Improvement"
					}
				],
				9: ["Unarmored Movement (Improvement)"],
				10: ["Purity of Body",
					{
						name: "Unarmored Movement (20 ft.)",
						replaces: "Unarmored Movement (15 ft.)"
					}
				],
				12: [
					{
						name: "Ability Score Improvement (3)",
						replaces: "Ability Score Improvement (2)"
					}
				],
				13: ["Tongue of the Sun and Moon"],
				14: ["Diamond Soul",
					{
						name: "Unarmored Movement (25 ft.)",
						replaces: "Unarmored Movement (20 ft.)"
					}
				],
				15: ["Timeless Body"],
				16: [
					{
						name: "Ability Score Improvement (4)",
						replaces: "Ability Score Improvement (3)"
					}
				],
				18: ["Empty Body",
					{
						name: "Unarmored Movement (30 ft.)",
						replaces: "Unarmored Movement (25 ft.)"
					}
				],
				19: [
					{
						name: "Ability Score Improvement (5)",
						replaces: "Ability Score Improvement (4)"
					}
				],
				20: ["Perfect Self"]
			}
		},

		"Paladin": {
			spellcasting: { type: "halfCaster", ability: "Charisma" },
			savingThrows: ["Wisdom", "Charisma"],

			features: {
				1: ["Divine Sense", "Lay on Hands"],
				2: ["Spellcasting", "Additional Paladin Spells", "Divine Smite", "Fighting Style"],
				3: ["Divine Health", "Harness Divine Power"],
				4: ["Ability Score Improvement", "Martial Versatility"],
				5: ["Extra Attack"],
				6: ["Aura of Protection"],
				8: [
					{
						name: "Ability Score Improvement (2)",
						replaces: "Ability Score Improvement"
					}
				],
				10: ["Aura of Courage"],
				11: ["Improved Divine Smite"],
				12: [
					{
						name: "Ability Score Improvement (3)",
						replaces: "Ability Score Improvement (2)"
					}
				],
				14: ["Cleansing Touch"],
				16: [
					{
						name: "Ability Score Improvement (4)",
						replaces: "Ability Score Improvement (3)"
					}
				],
				19: [
					{
						name: "Ability Score Improvement (5)",
						replaces: "Ability Score Improvement (4)"
					}
				],
				20: ["Aura Improvements"]
			}
		},

		"Ranger": {
			spellcasting: { type: "halfCaster", ability: "Wisdom" },
			savingThrows: ["Strength", "Dexterity"],

			features: {
				1: ["Favored Foe (1d4), Deft Explorer (Canny)"],
				2: ["Spellcasting", "Additional Ranger Spells", "Fighting Style"],
				3: ["Primeval Awareness"],
				4: ["Ability Score Improvement", "Martial Versatility"],
				5: ["Extra Attack"],
				6: [
					{
						name: "Favored Foe Improvement (1d6)",
						replaces: "Favored Foe (1d4)"
					},
					{
						name: "Deft Explorer Improvement (Canny, Roving)",
						replaces: "Deft Explorer Improvement (Canny)"
					}
				],
				8: [
					{
						name: "Ability Score Improvement (2)",
						replaces: "Ability Score Improvement"
					},
					"Land’s Stride"],
				10: [
					{
						name: "Deft Explorer Improvement (Canny, Roving, Tireless)",
						replaces: "Deft Explorer Improvement (Canny, Roving)"
					},
					"Nature’s Veil"],
				12: [
					{
						name: "Ability Score Improvement (3)",
						replaces: "Ability Score Improvement (2)"
					}
				],
				14: [
					{
						name: "Favored Foe Improvement (1d8)",
						replaces: "Favored Foe Improvement (1d6)"
					},
					"Vanish"],
				16: [
					{
						name: "Ability Score Improvement (4)",
						replaces: "Ability Score Improvement (3)"
					}
				],
				18: ["Feral Senses"],
				19: [
					{
						name: "Ability Score Improvement (5)",
						replaces: "Ability Score Improvement (4)"
					}
				],
				20: ["Foe Slayer"]
			}
		},

		"Rogue": {
			subclassSpellcasting: {
				"Arcane Trickster": { type: "thirdCaster", ability: "Intelligence" },
			},
			savingThrows: ["Dexterity", "Intelligence"],

			features: {
				1: ["Expertise", "Sneak Attack", "Thieves' Cant"],
				2: ["Cunning Action"],
				3: ["Steady Aim"],
				4: ["Ability Score Improvement"],
				5: ["Uncanny Dodge"],
				6: [
					{
						name: "Expertise (2)",
						replaces: "Expertise"
					}
				],
				7: ["Evasion"],
				8: [
					{
						name: "Ability Score Improvement (2)",
						replaces: "Ability Score Improvement"
					}
				],
				10: [
					{
						name: "Ability Score Improvement (3)",
						replaces: "Ability Score Improvement (2)"
					}
				],
				11: ["Reliable Talent"],
				12: [
					{
						name: "Ability Score Improvement (4)",
						replaces: "Ability Score Improvement (3)"
					}
				],
				14: ["Blindsense"],
				15: ["Slippery Mind"],
				16: [
					{
						name: "Ability Score Improvement (5)",
						replaces: "Ability Score Improvement (4)"
					}
				],
				18: ["Elusive"],
				19: [
					{
						name: "Ability Score Improvement (6)",
						replaces: "Ability Score Improvement (5)"
					}
				],
				20: ["Stroke of Luck"]
			}
		},

		"Sorcerer": {
			spellcasting: { type: "fullCaster", ability: "Charisma" },
			cantrips: [
				"Acid Splash", "Blade Ward", "Chill Touch", "Dancing Lights",
				"Fire Bolt", "Friends", "Light", "Mage Hand", "Mending", "Message",
				"Minor Illusion", "Poison Spray", "Prestidigitation", "Ray of Frost",
				"Shocking Grasp", "True Strike",
			],
			savingThrows: ["Constitution", "Charisma"],

			features: {
				1: ["Spellcasting"],
				2: ["Font of Magic"],
				3: ["Metamagic (2)"],
				4: ["Ability Score Improvement"],
				8: [
					{
						name: "Ability Score Improvement (2)",
						replaces: "Ability Score Improvement"
					}
				],
				10: [
					{
						name: "Metamagic (3)",
						replaces: "Metamagic (2)"
					}
				],
				12: [
					{
						name: "Ability Score Improvement (3)",
						replaces: "Ability Score Improvement (2)"
					}
				],
				16: [
					{
						name: "Ability Score Improvement (4)",
						replaces: "Ability Score Improvement (3)"
					}
				],
				17: [
					{
						name: "Metamagic (4)",
						replaces: "Metamagic (3)"
					}
				],
				19: [
					{
						name: "Ability Score Improvement (5)",
						replaces: "Ability Score Improvement (4)"
					}
				],
				20: ["Sorcerous Restoration"],
			}
		},

		"Warlock": {
			spellcasting: { type: "pactCaster", ability: "Charisma" },
			cantrips: [
				"Blade Ward", "Chill Touch", "Eldritch Blast", "Friends", "Mage Hand",
				"Minor Illusion", "Poison Spray", "Prestidigitation", "True Strike",
			],
			savingThrows: ["Wisdom", "Charisma"],

			features: {
				1: ["Pact Magic"],
				2: ["Eldritch Invocations"],
				3: ["Pact Boon"],
				4: ["Ability Score Improvement"],
				8: [
					{
						name: "Ability Score Improvement (2)",
						replaces: "Ability Score Improvement"
					}
				],
				11: ["Mystic Arcanum (6th level)"],
				12: [
					{
						name: "Ability Score Improvement (3)",
						replaces: "Ability Score Improvement (2)"
					}
				],
				13: ["Mystic Arcanum (7th level)"],
				15: ["Mystic Arcanum (8th level)"],
				16: [
					{
						name: "Ability Score Improvement (4)",
						replaces: "Ability Score Improvement (3)"
					}
				],
				17: ["Mystic Arcanum (9th level)"],
				19: [
					{
						name: "Ability Score Improvement (5)",
						replaces: "Ability Score Improvement (4)"
					}
				],
				20: ["Eldritch Master"],
			}
		},

		"Wizard": {
			spellcasting: { type: "fullCaster", ability: "Intelligence" },
			cantrips: [
				"Acid Splash", "Blade Ward", "Chill Touch", "Dancing Lights",
				"Fire Bolt", "Friends", "Light", "Mage Hand", "Mending", "Message",
				"Minor Illusion", "Poison Spray", "Prestidigitation", "Ray of Frost",
				"Shocking Grasp", "True Strike",
			],
			savingThrows: ["Intelligence", "Wisdom"],

			features: {
				1: ["Spellcasting", "Arcane Recovery"],
				4: ["Ability Score Improvement"],
				8: [
					{
						name: "Ability Score Improvement (2)",
						replaces: "Ability Score Improvement"
					}
				],
				12: [
					{
						name: "Ability Score Improvement (3)",
						replaces: "Ability Score Improvement (2)"
					}
				],
				16: [
					{
						name: "Ability Score Improvement (4)",
						replaces: "Ability Score Improvement (3)"
					}
				],
				18: ["Spell Mastery"],
				19: [
					{
						name: "Ability Score Improvement (5)",
						replaces: "Ability Score Improvement (4)"
					}
				],
				20: ["Signature Spells"],
			}
		},

		"Artificer": {
			spellcasting: { type: "artiCaster", ability: "Intelligence" },
			cantrips: [
				"Guidance", "Light", "Mage Hand", "Mending", "Message", "Poison Spray",
				"Ray of Frost", "Resistance", "Shocking Grasp", "Spare the Dying",
				"Thorn Whip",
			],
			savingThrows: ["Constitution", "Intelligence"],

			features: {
				1: ["Spellcasting", "Magical Tinkering"],
				2: ["Infuse Item"],
				3: ["The Right Tool for the Job"],
				4: ["Ability Score Improvement"],
				6: ["Tool Expertise"],
				7: ["Flash of Genius"],
				8: [
					{
						name: "Ability Score Improvement (2)",
						replaces: "Ability Score Improvement"
					}
				],
				10: ["Magic Item Adept"],
				11: ["Spell-Storing Item"],
				12: [
					{
						name: "Ability Score Improvement (3)",
						replaces: "Ability Score Improvement (2)"
					}
				],
				14: ["Magic Item Savant (5)"],
				16: [
					{
						name: "Ability Score Improvement (4)",
						replaces: "Ability Score Improvement (3)"
					}
				],
				18: [
					{
						name: "Magic Item Master (6)",
						replaces: "Magic Item Savant"
					}
				],
				19: [
					{
						name: "Ability Score Improvement (5)",
						replaces: "Ability Score Improvement (4)"
					}
				],
				20: ["Soul of Artifice"],
			}
		},
	};

	const cantrips = [];
	Object.keys(classRules).forEach(function (className) {
		(classRules[className].cantrips || []).forEach(function (cantrip) {
			if (cantrips.indexOf(cantrip) === -1) {
				cantrips.push(cantrip);
			}
		});
	});
	featureChoiceRules.forEach(function (rule) {
		if (rule.id === "warlock-tome-cantrips") {
			rule.options = cantrips;
		}
	});
	populateAttackChoices(cantrips);
	populateSrdSpellCatalogOptions();
	$("#page1").saveMyForm(
		{
			loadInputs: true,
		}
	);

	const subclassLevels = {
		"Barbarian": 3,
		"Bard": 3,
		"Cleric": 1,
		"Druid": 2,
		"Fighter": 3,
		"Monk": 3,
		"Paladin": 3,
		"Ranger": 3,
		"Rogue": 3,
		"Sorcerer": 1,
		"Warlock": 3,
		"Wizard": 2,
		"Artificer": 3
	};

	const subclassRules = {
		//Barbarian Subclasses//
		"Path of the Ancestral Guardian": {
			features: {
				3: ["Ancestral Protectors"],
				6: ["Spirit Shield"],
				10: ["Consult the Spirits"],
				14: ["Vengeful Ancestors"]
			}
		},

		"Path of the Battlerager": {
			features: {
				3: ["Battlerager Armor"],
				6: ["Reckless Abandon"],
				10: ["Battlerager Charge"],
				14: ["Spiked Retribution"]
			}
		},

		"Path of the Beast": {
			features: {
				3: ["Form of the Beast"],
				6: ["Bestial Soul"],
				10: ["Infectious Fury"],
				14: ["Call the Hunt"]
			}
		},

		"Path of the Berserker": {
			features: {
				3: ["Frenzy"],
				6: ["Mindless Rage"],
				10: ["Intimidating Presence"],
				14: ["Retaliation"]
			}
		},

		"Path of the Giant": {
			features: {
				3: ["Giant’s Power", "Giant’s Havoc"],
				6: ["Elemental Cleaver"],
				10: ["Mighty Impel"],
				14: ["Demiurgic Colossus"]
			}
		},

		"Path of the Storm Herald": {
			features: {
				3: ["Storm Aura"],
				6: ["Storm Soul"],
				10: ["Shielding Storm"],
				14: ["Raging Storm"]
			}
		},

		"Path of the Totem Warrior": {
			features: {
				3: ["Spirit Seeker", "Totem Spirit"],
				6: ["Aspect of the Beast"],
				10: ["Spirit Walker"],
				14: ["Totemic Attunement"]
			}
		},

		"Path of the Zealot": {
			features: {
				3: ["Divine Fury", "Warrior of the Gods"],
				6: ["Fanatical Focus"],
				10: ["Zealous Presence"],
				14: ["Rage Beyond Death"]
			}
		},

		"Path of the Wild Magic": {
			features: {
				3: ["Magic Awareness", "Wild Surge"],
				6: ["Bolstering Magic"],
				10: ["Unstable Backlash"],
				14: ["Controlled Surge"]
			}
		},

		//Bard Subclasses//

		"College of Creation": {
			features: {
				3: ["Mote of Potential", "Performance of Creation"],
				6: ["Animating Performance"],
				14: ["Creative Crescendo"],
			}
		},

		"College of Eloquence": {
			features: {
				3: ["Silver Tongue", "Unsettling Words"],
				6: ["Unfailing Inspiration", "Universal Speech"],
				14: ["Infectious Inspiration"],
			}
		},

		"College of Glamour": {
			features: {
				3: ["Mantle of Inspiration", "Enthralling Performance"],
				6: ["Mantle of Majesty"],
				14: ["Unbreakable Majesty"],
			}
		},

		"College of Lore": {
			features: {
				3: ["Bonus Proficiencies", "Cutting Words"],
				6: ["Additional Magical Secrets"],
				14: ["Peerless Skill"],
			}
		},

		"College of Spirits": {
			features: {
				3: ["Guiding Whispers", "Spiritual Focus", "Tales from Beyond"],
				6: ["Spirit Session"],
				14: ["Mystical Connection"],
			}
		},

		"College of Swords": {
			features: {
				3: ["Bonus Proficiencies", "Fighting Style", "Blade Flourish", "Bonus Proficiencies"],
				6: ["Extra Attack"],
				14: ["Master’s Flourish"],
			}
		},

		"College of Valor": {
			features: {
				3: ["Bonus Proficiencies", "Combat Inspiration"],
				6: ["Extra Attack"],
				14: ["Battle Magic"],
			}
		},

		"College of Whispers": {
			features: {
				3: ["Psychic Blades", "Words of Terror"],
				6: ["Mantle of Whispers"],
				14: ["Shadow Lore"],
			}
		},

		//Cleric Subclasses//
		//Add Domain Spells

		"Arcana Domain": {
			features: {
				1: ["Arcane Initiate"],
				2: ["Channel Divinity: Arcane Abjuration"],
				6: ["Spell Breaker"],
				8: ["Potent Spellcasting"],
				17: ["Arcane Mastery"],
			}
		},

		"Death Domain": {
			features: {
				1: ["Bonus Proficiency", "Reaper"],
				2: ["Channel Divinity: Touch of Death"],
				6: ["Inescapable Destruction"],
				8: ["Divine Strike"],
				17: ["Improved Reaper"],
			}
		},

		"Forge Domain": {
			features: {
				1: ["Bonus Proficiencies", "Blessing of the Forge"],
				2: ["Channel Divinity: Artisan’s Blessing"],
				6: ["Soul of the Forge"],
				8: ["Divine Strike"],
				17: ["Saint of Forge and Fire"],
			}
		},

		"Grave Domain": {
			features: {
				1: ["Circle of Mortality", "Eyes of the Grave"],
				2: ["Channel Divinity: Path to the Grave"],
				6: ["Sentinel at Death’s Door"],
				8: ["Potent Spellcasting"],
				17: ["Keeper of Souls"],
			}
		},

		"Knowledge Domain": {
			features: {
				1: ["Blessings of Knowledge"],
				2: ["Channel Divinity: Knowledge of theAges"],
				6: ["Channel Divinity: Read Thoughts"],
				8: ["Potent Spellcasting"],
				17: ["Visions of the Past"],
			}
		},

		"Life Domain": {
			features: {
				1: ["Bonus Proficiency", "Disciple of Life"],
				2: ["Channel Divinity: Preserve Life"],
				6: ["Blessed Healer"],
				8: ["Divine Strike"],
				17: ["Supreme Healing"],
			}
		},

		"Light Domain": {
			features: {
				1: ["Bonus Cantrip", "Warding Flare"],
				2: ["Channel Divinity: Radiance of the Dawn"],
				6: ["Improved Flare"],
				8: ["Potent Spellcasting"],
				17: ["Corona of Light"],
			}
		},

		"Nature Domain": {
			features: {
				1: ["Acolyte of Nature", "Bonus Proficiency"],
				2: ["Channel Divinity: Charm Animals and Plants"],
				6: ["Dampen Elements"],
				8: ["Divine Strike"],
				17: ["Master of Nature"],
			}
		},

		"Order Domain": {
			features: {
				1: ["Bonus Proficiencies", "Voice of Authority"],
				2: ["Channel Divinity: Order’s Demand"],
				6: ["Embodiment of the Law"],
				8: ["Divine Strike"],
				17: ["Order’s Wrath"],
			}
		},

		"Peace Domain": {
			features: {
				1: ["Implement of Peace", "Emboldening Bond"],
				2: ["Channel Divinity: Balm of Peace"],
				6: ["Protective Bond"],
				8: ["Potent Spellcasting"],
				17: ["Expansive Bond"],
			}
		},

		"Tempest Domain": {
			features: {
				1: ["Bonus Proficiencies", "Wrath of the Storm"],
				2: ["Channel Divinity: Destructive Wrath"],
				6: ["Thunderbolt Strike"],
				8: ["Divine Strike"],
				17: ["Stormborn"],
			}
		},

		"Trickery Domain": {
			features: {
				1: ["Blessing of the Trickster"],
				2: ["Channel Divinity: Invoke Duplicity"],
				6: ["Channel Divinity: Cloak of Shadows"],
				8: ["Divine Strike"],
				17: ["Improved Duplicity"],
			}
		},

		"Twilight Domain": {
			features: {
				1: ["Bonus Proficiencies", "Eyes of Night", "Vigilant Blessing"],
				2: ["Channel Divinity: Twilight Sanctuary"],
				6: ["Steps of Night"],
				8: ["Divine Strike"],
				17: ["Twilight Shroud"],
			}
		},

		"War Domain": {
			features: {
				1: ["Bonus Proficiencies", "War Priest"],
				2: ["Channel Divinity: Guided Strike"],
				6: ["Channel Divinity: War God’s Blessing"],
				8: ["Divine Strike"],
				17: ["Avatar of Battle"],
			}
		},

		//Druid Subclasses//

		"Circle of Dreams": {
			features: {
				2: ["Balm of the Summer Court"],
				6: ["Hearth of Moonlight and Shadow"],
				10: ["Hidden Paths"],
				14: ["Walker in Dreams"],
			}
		},

		"Circle of Spores": {
			features: {
				2: ["Circle Spells", "Halo of Spores", "Symbiotic Entity"],
				6: ["Fungal Infestation"],
				10: ["Spreading Spores"],
				14: ["Fungal Body"],
			}
		},

		"Circle of Stars": {
			features: {
				2: ["Star Map", "Starry Form"],
				6: ["Cosmic Omen"],
				10: ["Twinkling Constellations"],
				14: ["Full of Stars"],
			}
		},

		"Circle of Land": {
			features: {
				2: ["Bonus Cantrip", "Natural Recovery", "Circle Spells"],
				6: ["Land’s Stride"],
				10: ["Nature’s Ward"],
				14: ["Nature’s Sanctuary"],
			}
		},

		"Circle of Moon": {
			features: {
				2: ["Combat Wild Shape", "Circle Forms"],
				6: ["Primal Strike", "Circle Forms"],
				10: ["Elemental Wild Shape"],
				14: ["Thousand Forms"],
			}
		},

		"Circle of Shepherd": {
			features: {
				2: ["Speech of the Woods", "Spirit Totem"],
				6: ["Mighty Summoner"],
				10: ["Guardian Spirit"],
				14: ["Faithful Summons"],
			}
		},

		"Circle of Wildfire": {
			features: {
				2: ["Circle Spells", "Summon Wildfire Spirit"],
				6: ["Enhanced Bond"],
				10: ["Cauterizing Flames"],
				14: ["Blazing Revival"],
			}
		},

		//Fighter Subclasses//

		"Arcane Archer": { //Add Arcane Shot Options
			features: {
				3: ["Arcane Archer Lore", "Arcane Shot", "Arcane Shot Options (2)"],
				7: ["Magic Arrow", "Curving Shot",
					{
						name: "Arcane Shot Options (3)",
						replaces: "Arcane Shot Options (2)"
					}
				],
				10: [
					{
						name: "Arcane Shot Options (4)",
						replaces: "Arcane Shot Options (3)"
					}
				],
				15: [
					{
						name: "Arcane Shot Options (5)",
						replaces: "Arcane Shot Options (4)"
					},
					"Ever-Ready Shot"],
				18: [
					{
						name: "Arcane Shot Options (6)",
						replaces: "Arcane Shot Options (5)"
					},
					{
						name: "Improved Arcane Shot",
						replaces: "Arcane Shot"
					}
				],
			}
		},

		"Battle Master": { // Add Maneuvers
			features: {
				3: ["Combat Superiority", "Student of War"],
				7: ["Know Your Enemy"],
				10: [
					{
						name: "Improved Combat Superiority (d10)",
						replaces: "Combat Superiority"
					}
				],
				15: ["Relentless"],
				18: [
					{
						name: "Improved Combat Superiority (d12)",
						replaces: "Improved Combat Superiority (d10)"
					}
				],
			}
		},

		"Cavalier": {
			features: {
				3: ["Born to the Saddle", "Unwavering Mark", "Bonus Proficiency"],
				7: ["Warding Maneuver"],
				10: ["Hold the Line"],
				15: ["Ferocious Charger"],
				18: ["Vigilant Defender"],
			}
		},

		"Champion": {
			features: {
				3: ["Improved Critical"],
				7: ["Remarkable Athlete"],
				10: ["Additional Fighting Style"],
				15: [
					{
						name: "Superior Critical",
						replaces: "Improved Critical"
					}
				],
				18: ["Survivor"],
			}
		},

		"Eldritch Knight": {
			features: {
				3: ["Spellcasting", "Weapon Bond"],
				7: ["War Magic"],
				10: ["Eldritch Strike"],
				15: ["Arcane Charge"],
				18: ["Improved War Magic"],
			}
		},

		"Psi Warrior": {
			features: {
				3: ["Psionic Power"],
				7: ["Telekinetic Adept"],
				10: ["Guarded Mind"],
				15: ["Bulwark of Force"],
				18: ["Telekinetic Master"],
			}
		},

		"Purple Dragon Knight": {
			features: {
				3: ["Rallying Cry"],
				7: ["Royal Envoy"],
				10: ["Inspiring Surge"],
				15: ["Bulwark"],
				18: [
					{
						name: "Inspiring Surge (2)",
						replaces: "Inspiring Surge"
					}
				],
			}
		},

		"Rune Knight": {
			features: {
				3: ["Bonus Proficiencies", "Rune Carver", "Runes Known (2)", "Giant’s Might"],
				7: ["Runic Shield",
					{
						name: "Runes Known (3)",
						replaces: "Runes Known (2)"
					}
				],
				10: ["Great Stature",
					{
						name: "Runes Known (4)",
						replaces: "Runes Known (3)"
					}
				],
				15: ["Master of Runes",
					{
						name: "Runes Known (5)",
						replaces: "Runes Known (4)"
					}
				],
				18: ["Runic Juggernaut"],
			}
		},

		"Samurai": {
			features: {
				3: ["Bonus Proficiency", "Fighting Spirit"],
				7: ["Elegant Courtier"],
				10: ["Tireless Spirit"],
				15: ["Rapid Strike"],
				18: ["Strength before Death"],
			}
		},

		//Monk Subclasses//

		"Way of Mercy": {
			features: {
				3: ["Implements of Mercy", "Hand of Healing", "Hand of Harm"],
				6: ["Physician’s Touch"],
				11: ["Flurry of Healing and Harm"],
				17: ["Hand of Ultimate Mercy"],
			}
		},

		"Way of Shadow": {
			features: {
				3: ["Shadow Arts"],
				6: ["Shadow Step"],
				11: ["Cloak of Shadows"],
				17: ["Opportunist"],
			}
		},

		"Way of the Ascendant Dragon": {
			features: {
				3: ["Draconic Disciple", "Breath of the Dragon"],
				6: ["Wings Unfurled"],
				11: ["Aspect of the Wyrm"],
				17: ["Ascendant Aspect"],
			}
		},

		"Way of the Astral Self": {
			features: {
				3: ["Arms of the Astral Self"],
				6: ["Visage of the Astral Self"],
				11: ["Body of the Astral Self"],
				17: ["Awakened Astral Self"],
			}
		},

		"Way of the Drunken Master": {
			features: {
				3: ["Bonus Proficiencies", "Drunken Technique"],
				6: ["Tipsy Sway"],
				11: ["Drunkard’s Luck"],
				17: ["Intoxicated Frenzy"],
			}
		},

		"Way of the Four Elements": {
			features: {
				3: ["Disciple of the Elements", "Elemental Disciplines (2)"],
				6: [
					{
						name: "Elemental Disciplines (3)",
						replaces: "Elemental Disciplines (2)"
					}
				],
				11: [
					{
						name: "Elemental Disciplines (4)",
						replaces: "Elemental Disciplines (3)"
					}
				],
				17: [
					{
						name: "Elemental Disciplines (5)",
						replaces: "Elemental Disciplines (4)"
					}
				],
			}
		},

		"Way of the Kensei": {
			features: {
				3: ["Path of the Kensei"],
				6: ["One with the Blade", "Kensei Weapon (3)"],
				11: ["Sharpen the Blade", "Kensei Weapon (4)"],
				17: ["Unerring Accuracy", "Kensei Weapon (5)"],
			}
		},

		"Way of the Long Death": {
			features: {
				3: ["Touch of Death"],
				6: ["Hour of Reaping"],
				11: ["Mastery of Death"],
				17: ["Touch of the Long Death"],
			}
		},

		"Way of the Open Hand": {
			features: {
				3: ["Open Hand Technique"],
				6: ["Wholeness of Body"],
				11: ["Tranquility"],
				17: ["Quivering Palm"],
			}
		},

		"Way of the Sun Soul": {
			features: {
				3: ["Radiant Sun Bolt"],
				6: ["Searing Arc Strike"],
				11: ["Searing Sunburst"],
				17: ["Sun Shield"],
			}
		},

		//Paladin Subclasses//

		"Oath of Conquest": {
			features: {
				3: ["Oath Spells", "Channel Divinity"],
				7: ["Aura of Conquest"],
				15: ["Scornful Rebuke"],
				20: ["Invincible Conqueror"],
			}
		},

		"Oath of Devotion": {
			features: {
				3: ["Oath Spells", "Channel Divinity"],
				7: ["Aura of Devotion"],
				15: ["Purity of Spirit"],
				20: ["Holy Nimbus"],
			}
		},

		"Oath of Glory": {
			features: {
				3: ["Oath Spells", "Channel Divinity"],
				7: ["Aura of Alacrity"],
				15: ["Glorious Defense"],
				20: ["Living Legend"],
			}
		},

		"Oath of Redemption": {
			features: {
				3: ["Oath Spells", "Channel Divinity"],
				7: ["Aura of the Guardian"],
				15: ["Protective Spirit"],
				20: ["Emissary of Redemption"],
			}
		},

		"Oath of the Ancients": {
			features: {
				3: ["Oath Spells", "Channel Divinity"],
				7: ["Aura of Warding"],
				15: ["Undying Sentinel"],
				20: ["Elder Champion"],
			}
		},

		"Oath of the Crown": {
			features: {
				3: ["Oath Spells", "Channel Divinity"],
				7: ["Divine Allegiance"],
				15: ["Unyielding Spirit"],
				20: ["Exalted Champion"],
			}
		},

		"Oath of the Watchers": {
			features: {
				3: ["Oath Spells", "Channel Divinity"],
				7: ["Aura of the Sentinel"],
				15: ["Vigilant Rebuke"],
				20: ["Mortal Bulwark"],
			}
		},

		"Oath of Vengeance": {
			features: {
				3: ["Oath Spells", "Channel Divinity"],
				7: ["Relentless Avenger"],
				15: ["Soul of Vengeance"],
				20: ["Avenging Angel"],
			}
		},

		"Oathbreaker": {
			features: {
				3: ["Oath Spells", "Channel Divinity"],
				7: ["Aura of Hate"],
				15: ["Supernatural Resistance"],
				20: ["Dread Lord"],
			}
		},

		//Ranger Subclasses//

		"Beast Master": {
			features: {
				3: ["Ranger’s Companion"],
				7: ["Exceptional Training"],
				11: ["Bestial Fury"],
				15: ["Share Spells"],
			}
		},

		"Drakewarden": {
			features: {
				3: ["Draconic Gift", "Drake Companion"],
				7: ["Bond of Fang and Scale"],
				11: ["Drake’s Breath"],
				15: ["Perfected Bond"],
			}
		},

		"Fey Wanderer": {
			features: {
				3: ["Dreadful Strikes", "Fey Wanderer Magic", "Otherworldly Glamour"],
				7: ["Beguiling Twist"],
				11: ["Fey Reinforcements"],
				15: ["Misty Wanderer"],
			}
		},

		"Gloom Stalker": {
			features: {
				3: ["Gloom Stalker Magic", "Dread Ambusher", "Umbral Sight"],
				7: ["Iron Mind"],
				11: ["Stalker’s Flurry"],
				15: ["Shadowy Dodge"],
			}
		},

		"Horizon Walker": {
			features: {
				3: ["Horizon Walker Magic", "Detect Portal", "Planar Warrior"],
				7: ["Ethereal Step"],
				11: ["Distant Strike"],
				15: ["Spectral Defense"],
			}
		},

		"Hunter": {
			features: {
				3: ["Hunter’s Prey"],
				7: ["Defensive Tactics"],
				11: ["Multiattack"],
				15: ["Superior Hunter’s Defense"],
			}
		},

		"Monster Slayer": {
			features: {
				3: ["Monster Slayer Magic", "Hunter’s Sense", "Slayer’s Prey"],
				7: ["Supernatural Defense"],
				11: ["Magic-User’s Nemesis"],
				15: ["Slayer’s Counter"],
			}
		},

		"Swarmkeeper": {
			features: {
				3: ["Gathered Swarm", "Swarmkeeper Magic"],
				7: ["Writhing Tide"],
				11: ["Mighty Swarm"],
				15: ["Swarming Dispersal"],
			}
		},

		//Rogue Subclasses//

		"Arcane Trickster": {
			features: {
				3: ["Spellcasting", "Mage Hand Legerdemain"],
				9: ["Magical Ambush"],
				13: ["Versatile Trickster"],
				17: ["Spell Thief"],
			}
		},

		"Assassin": {
			features: {
				3: ["Bonus Proficiencies", "Assassinate"],
				9: ["Infiltration Expertise"],
				13: ["Impostor"],
				17: ["Death Strike"],
			}
		},

		"Inquisitive": {
			features: {
				3: ["Ear for Deceit", "Eye for Detail", "Insightful Fighting"],
				9: ["Steady Eye"],
				13: ["Unerring Eye"],
				17: ["Eye for Weakness"],
			}
		},

		"Mastermind": {
			features: {
				3: ["Master of Intrigue", "Master of Tactics"],
				9: ["Insightful Manipulator"],
				13: ["Misdirection"],
				17: ["Soul of Deceit"],
			}
		},

		"Phantom": {
			features: {
				3: ["Whispers of the Dead", "Wails from the Grave"],
				9: ["Tokens of the Departed"],
				13: ["Ghost Walk"],
				17: ["Death’s Friend"],
			}
		},

		"Scout": {
			features: {
				3: ["Skirmisher", "Survivalist"],
				9: ["Superior Mobility"],
				13: ["Ambush Master"],
				17: ["Sudden Strike"],
			}
		},

		"Soulknife": {
			features: {
				3: ["Psionic Power", "Psychic Blades"],
				9: ["Soul Blades"],
				13: ["Psychic Veil"],
				17: ["Rend Mind"],
			}
		},

		"Swashbuckler": {
			features: {
				3: ["Fancy Footwork", "Rakish Audacity"],
				9: ["Panache"],
				13: ["Elegant Maneuver"],
				17: ["Master Duelist"],
			}
		},

		"Thief": {
			features: {
				3: ["Fast Hands", "Second-Story Work"],
				9: ["Supreme Sneak"],
				13: ["Use Magic Device"],
				17: ["Thief’s Reflexes"],
			}
		},

		//Sorcerer Subclasses//

		"Aberrant Mind": {
			features: {
				1: ["Psionic Spells", "Telepathic Speech"],
				6: ["Psionic Sorcery", "Psychic Defenses"],
				14: ["Revelation in Flesh"],
				18: ["Warping Implosion"],
			}
		},

		"Clockwork Soul": {
			features: {
				1: ["Clockwork Magic", "Restore Balance"],
				6: ["Bastion of Law"],
				14: ["Trance of Order"],
				18: ["Clockwork Cavalcade"],
			}
		},

		"Divine Soul": {
			features: {
				1: ["Divine Magic", "Favored by the Gods"],
				6: ["Empowered Healing"],
				14: ["Otherworldly Wings"],
				18: ["Unearthly Recovery"],
			}
		},

		"Draconic Bloodline": {
			features: {
				1: ["Dragon Ancestor", "Draconic Resilience"],
				6: ["Elemental Affinity"],
				14: ["Dragon Wings"],
				18: ["Draconic Presence"],
			}
		},

		"Lunar Sorcery": {
			features: {
				1: ["Lunar Embodiment", "Moon Fire"],
				6: ["Lunar Boons", "Waxing and Waning"],
				14: ["Lunar Empowerment"],
				18: ["Lunar Phenomenon"],
			}
		},

		"Shadow Magic": {
			features: {
				1: ["Eyes of the Dark", "Strength of the Grave"],
				6: ["Hound of Ill Omen"],
				14: ["Shadow Walk"],
				18: ["Umbral Form"],
			}
		},

		"Storm Sorcery": {
			features: {
				1: ["Wind Speaker", "Tempestuous Magic"],
				6: ["Heart of the Storm", "Storm Guide"],
				14: ["Storm’s Fury"],
				18: ["Wind Soul"],
			}
		},

		"Wild Magic": {
			features: {
				1: ["Wild Magic Surge", "Tides of Chaos"],
				6: ["Bend Luck"],
				14: ["Controlled Chaos"],
				18: ["Spell Bombardment"],
			}
		},

		//Warlock Subclasses//

		"The Archfey": {
			features: {
				1: ["Expanded Spell List", "Fey Presence"],
				6: ["Misty Escape"],
				10: ["Beguiling Defenses"],
				14: ["Dark Delirium"],
			}
		},

		"The Celestial": {
			features: {
				1: ["Expanded Spell List", "Bonus Cantrips", "Healing Light"],
				6: ["Radiant Soul"],
				10: ["Celestial Resilience"],
				14: ["Searing Vengeance"],
			}
		},

		"The Fathomless": {
			features: {
				1: ["Expanded Spell List", "Tentacle of the Deeps", "Gift of the Sea"],
				6: ["Oceanic Soul", "Guardian Coil"],
				10: ["Grasping Tentacles"],
				14: ["Fathomless Plunge"],
			}
		},

		"The Fiend": {
			features: {
				1: ["Expanded Spell List", "Dark One’s Blessing"],
				6: ["Dark One’s Own Luck"],
				10: ["Fiendish Resilience"],
				14: ["Hurl Through Hell"],
			}
		},

		"The Genie": {
			features: {
				1: ["Genie Kind", "Expanded Spell List", "Genie’s Vessel"],
				6: ["Elemental Gift"],
				10: ["Sanctuary Vessel"],
				14: ["Limited Wish"],
			}
		},

		"The Great Old One": {
			features: {
				1: ["Expanded Spell List", "Awakened Mind"],
				6: ["Entropic Ward"],
				10: ["Thought Shield"],
				14: ["Create Thrall"],
			}
		},

		"The Hexblade": {
			features: {
				1: ["Expanded Spell List", "Hexblade’s Curse", "Hex Warrior"],
				6: ["Accursed Specter"],
				10: ["Armor of Hexes"],
				14: ["Master of Hexes"],
			}
		},

		"The Undead": {
			features: {
				1: ["Expanded Spell List", "Form of Dread"],
				6: ["Grave Touched"],
				10: ["Necrotic Husk"],
				14: ["Spirit Projection"],
			}
		},

		"The Undying": {
			features: {
				1: ["Expanded Spell List", "Among the Dead"],
				6: ["Defy Death"],
				10: ["Undying Nature"],
				14: ["Indestructible Life"],
			}
		},

		//Wizard Subclasses//

		"Bladesinging": {
			features: {
				2: ["Training in War and Song", "Bladesong"],
				6: ["Extra Attack"],
				10: ["Song of Defense"],
				14: ["Song of Victory"],
			}
		},

		"Order of Scribes": {
			features: {
				2: ["Wizardly Quill", "Awakened Spellbook"],
				6: ["Manifest Mind"],
				10: ["Master Scrivener"],
				14: ["One with the Word"],
			}
		},

		"School of Abjuration": {
			features: {
				2: ["Arcane Ward", "Abjuration Savant"],
				6: ["Projected Ward"],
				10: ["Improved Abjuration"],
				14: ["Spell Resistance"],
			}
		},

		"School of Conjuration": {
			features: {
				2: ["Conjuration Savant", "Minor Conjuration"],
				6: ["Benign Transposition"],
				10: ["Focused Conjuration"],
				14: ["Durable Summons"],
			}
		},

		"School of Divination": {
			features: {
				2: ["Divination Savant", "Portent"],
				6: ["Expert Divination"],
				10: ["The Third Eye"],
				14: ["Greater Portent"],
			}
		},

		"School of Enchantment": {
			features: {
				2: ["Enchantment Savant", "Hypnotic Gaze"],
				6: ["Instinctive Charm"],
				10: ["Split Enchantment"],
				14: ["Alter Memories"],
			}
		},

		"School of Evocation": {
			features: {
				2: ["Evocation Savant", "Sculpt Spells"],
				6: ["Potent Cantrip"],
				10: ["Empowered Evocation"],
				14: ["Overchannel"],
			}
		},

		"School of Illusion": {
			features: {
				2: ["Illusion Savant", "Improved Minor Illusion"],
				6: ["Malleable Illusions"],
				10: ["Illusory Self"],
				14: ["Illusory Reality"],
			}
		},

		"School of Necromancy": {
			features: {
				2: ["Necromancy Savant", "Grim Harvest"],
				6: ["Undead Thralls"],
				10: ["Inured to Undeath"],
				14: ["Command Undead"],
			}
		},

		"School of Transmutation": {
			features: {
				2: ["Transmutation Savant", "Minor Alchemy"],
				6: ["Transmuter’s Stone"],
				10: ["Shapechanger"],
				14: ["Master Transmuter"],
			}
		},

		"War Magic": {
			features: {
				2: ["Arcane Deflection", "Tactical Wit"],
				6: ["Power Surge"],
				10: ["Durable Magic"],
				14: ["Deflecting Shroud"],
			}
		},

		//Artificer Subclasses//

		"Alchemist": {
			features: {
				3: ["Alchemist Spells", "Experimental Elixir", "Tool Proficiency"],
				5: ["Alchemical Savant"],
				9: ["Restorative Reagents"],
				15: ["Chemical Mastery"],
			}
		},

		"Armorer": {
			features: {
				3: ["Armorer Spells", "Arcane Armor", "Armor Model", "Tools of the Trade"],
				5: ["Extra Attack"],
				9: ["Armor Modifications"],
				15: ["Perfected Armor"],
			}
		},

		"Artillerist": {
			features: {
				3: ["Tool Proficiency", "Artillerist Spells", "Eldritch Cannon"],
				5: ["Arcane Firearm"],
				9: ["Explosive Cannon"],
				15: ["Fortified Position"],
			}
		},

		"Battle Smith": {
			features: {
				3: ["Battle Smith Spells", "Battle Ready", "Steel Defender", "Tool Proficiency"],
				5: ["Extra Attack"],
				9: ["Arcane Jolt"],
				15: ["Improved Defender"],
			}
		},

	};

	let rageActive = localStorage.getItem("page1_rageActive") === "true";
	const rageAttackStorageKey = "page1_rageAttackSlot";
	let beastRageFeature = "";

	function getBarbarianContext() {
		let barbarianContext = null;
		$("#page1 .class-pair").each(function () {
			const className = $(this).find(".class-name-input").val().trim();
			const level = Number($(this).find(".class-level-input").val());
			if (className !== "Barbarian" || !Number.isInteger(level) || level < 1 || level > 20) {
				return;
			}

			barbarianContext = {
				level: level,
				subclass: $(this).find(".subclass-name-input").val().trim(),
			};
		});
		return barbarianContext;
	}

	function isWearingHeavyArmor() {
		return ["ring-mail", "chain-mail", "splint", "plate"].indexOf($("#page1 [name='armor-type']").val()) !== -1;
	}

	function updateRageControls() {
		const barbarianContext = getBarbarianContext();
		const available = barbarianContext !== null;
		if (!available || (rageActive && isWearingHeavyArmor())) {
			rageActive = false;
			localStorage.setItem("page1_rageActive", "false");
		}

		$("#page1 .rage-toggle-slot").css("visibility", available ? "visible" : "hidden");
		$("#page1 #rage-toggle")
			.prop("disabled", !available || (!rageActive && isWearingHeavyArmor()))
			.attr("aria-pressed", rageActive ? "true" : "false")
			.text("Rage: " + (rageActive ? "On" : "Off"))
			.attr("title", isWearingHeavyArmor() ? "Rage cannot be activated while wearing heavy armor." : "");
		$("#page1 .beast-rage-choice").prop("hidden", !available || barbarianContext.subclass !== "Path of the Beast" || barbarianContext.level < 3);
		$("#page1 .totem-rage-choice").prop("hidden", !available || barbarianContext.subclass !== "Path of the Totem Warrior" || barbarianContext.level < 3);
		$("#page1 .aspect-beast-choice").prop("hidden", !available || barbarianContext.subclass !== "Path of the Totem Warrior" || barbarianContext.level < 6);
		$("#page1 .totemic-attunement-choice").prop("hidden", !available || barbarianContext.subclass !== "Path of the Totem Warrior" || barbarianContext.level < 14);
		$("#page1 .storm-rage-choice").prop("hidden", !available || barbarianContext.subclass !== "Path of the Storm Herald" || barbarianContext.level < 3);
		$("#page1 .zealot-rage-choice").prop("hidden", !available || barbarianContext.subclass !== "Path of the Zealot" || barbarianContext.level < 3);
		$("#page1 .giant-rage-choice").prop("hidden", !available || barbarianContext.subclass !== "Path of the Giant" || barbarianContext.level < 6);
		return barbarianContext;
	}

	function updateBeastRageAttack() {
		beastRageFeature = "";
		const previousAttack = localStorage.getItem(rageAttackStorageKey);
		if (previousAttack) {
			let previous;
			try {
				previous = JSON.parse(previousAttack);
			} catch (error) {
				localStorage.removeItem(rageAttackStorageKey);
				throw error;
			}
			const previousFields = [
				$("#page1 [name='atkname" + previous.slot + "']"),
				$("#page1 [name='atkbonus" + previous.slot + "']"),
				$("#page1 [name='atkdamage" + previous.slot + "']"),
			];
			if (previousFields.every(function (field, index) {
				const currentValue = index === 1 && field.length
					? getAttackBonusBaseValue(field[0])
					: field.val();
				return currentValue === previous.values[index];
			})) {
				previousFields.forEach(function (field) {
					field.val("").trigger("change");
				});
			}
			localStorage.removeItem(rageAttackStorageKey);
		}

		const barbarianContext = getBarbarianContext();
		const form = $("#page1 [name='rage-beast-form']").val();
		if (!barbarianContext
			|| barbarianContext.subclass !== "Path of the Beast"
			|| barbarianContext.level < 3
			|| ["bite", "claws", "tail"].indexOf(form) === -1) {
			return "";
		}

		const attacks = {
			bite: {
				name: "Beast Bite",
				die: "1d8",
				type: "piercing",
				feature: "Below half hit points, once per turn when you hit with this bite, gain temporary hit points equal to your proficiency bonus.",
			},
			claws: {
				name: "Beast Claws (two attacks)",
				die: "1d6",
				type: "slashing",
				feature: "When you attack with these claws, you can make one additional claw attack as part of the same action.",
			},
			tail: {
				name: "Beast Tail",
				die: "1d8",
				type: "piercing",
				feature: "When a creature you can see hits you within 10 feet, use your reaction to add 1d8 to your AC against that attack.",
			},
		};
		const attack = attacks[form];
		const strengthModifier = Number($("#page1 [name='Strengthmod']").val()) || 0;
		const proficiencyBonus = Number($("#page1 [name='proficiencybonus']").val()) || 0;
		const attackBonus = (Number.isFinite(strengthModifier) ? strengthModifier : 0)
			+ (Number.isFinite(proficiencyBonus) ? proficiencyBonus : 0);
		const rageDamageBonus = barbarianContext.level >= 16 ? 4 : barbarianContext.level >= 9 ? 3 : 2;
		const damageModifier = strengthModifier + (rageActive ? rageDamageBonus : 0);
		let damage = attack.die + (damageModifier >= 0 ? "+" : "") + damageModifier + " " + attack.type;
		if (barbarianContext.level >= 6) {
			damage += " (magical)";
		}
		const attackValues = [attack.name, (attackBonus >= 0 ? "+" : "") + attackBonus, damage];
		beastRageFeature = attack.feature;
		let slot = null;
		for (let index = 1; index <= 5; index++) {
			const fields = [
				$("#page1 [name='atkname" + index + "']"),
				$("#page1 [name='atkbonus" + index + "']"),
				$("#page1 [name='atkdamage" + index + "']"),
			];
			if (fields.every(function (field) { return field.val().trim() === ""; })) {
				slot = index;
				fields.forEach(function (field, fieldIndex) {
					field.val(attackValues[fieldIndex]).trigger("change");
				});
				break;
			}
		}

		if (slot === null) {
			return "No empty attack slot for the Beast Form natural weapon; clear one of the five attack rows.";
		}
		localStorage.setItem(rageAttackStorageKey, JSON.stringify({ slot: slot, values: attackValues }));
		return "";
	}

	const spellSlotsByCasterLevel = [
		[],
		[2],
		[3],
		[4, 2],
		[4, 3],
		[4, 3, 2],
		[4, 3, 3],
		[4, 3, 3, 1],
		[4, 3, 3, 2],
		[4, 3, 3, 3, 1],
		[4, 3, 3, 3, 2],
		[4, 3, 3, 3, 2, 1],
		[4, 3, 3, 3, 2, 1],
		[4, 3, 3, 3, 2, 1, 1],
		[4, 3, 3, 3, 2, 1, 1],
		[4, 3, 3, 3, 2, 1, 1, 1],
		[4, 3, 3, 3, 2, 1, 1, 1],
		[4, 3, 3, 3, 2, 1, 1, 1, 1],
		[4, 3, 3, 3, 2, 1, 1, 1, 1],
		[4, 3, 3, 3, 3, 1, 1, 1, 1],
		[4, 3, 3, 3, 3, 2, 1, 1, 1],
		[4, 3, 3, 3, 3, 2, 2, 1, 1],
	];
	const spellSlotUsageStorageKey = "page1_spellSlotUsage";
	let spellSlotUsage = {};
	const storedSpellSlotUsage = localStorage.getItem(spellSlotUsageStorageKey);
	if (storedSpellSlotUsage !== null) {
		try {
			const parsedSpellSlotUsage = JSON.parse(storedSpellSlotUsage);
			if (parsedSpellSlotUsage && typeof parsedSpellSlotUsage === "object" && !Array.isArray(parsedSpellSlotUsage)) {
				Object.keys(parsedSpellSlotUsage).forEach(function (key) {
					if (Array.isArray(parsedSpellSlotUsage[key])
						&& parsedSpellSlotUsage[key].every(function (used) { return typeof used === "boolean"; })) {
						spellSlotUsage[key] = parsedSpellSlotUsage[key];
					} else {
						console.error("Unable to restore spell slot usage for " + key + ": saved data is invalid.");
					}
				});
			} else {
				console.error("Unable to restore spell slot usage: saved data is not an object.");
			}
		} catch (error) {
			console.error("Unable to restore spell slot usage.", error);
		}
	}

	function saveSpellSlotUsage() {
		localStorage.setItem(spellSlotUsageStorageKey, JSON.stringify(spellSlotUsage));
	}

	function getSpellcastingEntries() {
		const entries = [];
		$("#page1 .class-pair").each(function () {
			const className = $(this).find(".class-name-input").val().trim();
			const level = Number($(this).find(".class-level-input").val());
			if (!className || !Number.isInteger(level) || level < 1 || level > 20) {
				return;
			}
			const classRule = classRules[className];
			if (!classRule) {
				return;
			}
			const subclassName = $(this).find(".subclass-name-input").val().trim();
			let spellcasting = classRule.spellcasting || null;
			let spellcastingName = className;
			if (!spellcasting && classRule.subclassSpellcasting && classRule.subclassSpellcasting[subclassName]
				&& level >= subclassLevels[className]) {
				spellcasting = classRule.subclassSpellcasting[subclassName];
				spellcastingName = subclassName;
			}
			if (!spellcasting
				|| (spellcasting.type === "halfCaster" && level < 2)
				|| (spellcasting.type === "artiCaster" && level < 1)) {
				return;
			}
			entries.push({
				className: className,
				subclassName: subclassName,
				name: spellcastingName,
				level: level,
				type: spellcasting.type,
				ability: spellcasting.ability,
			});
		});
		return entries;
	}

	function isMysticTheurgeSelected() {
		return readSelectedTalents().some(function (talent) {
			return talent.trim().toLowerCase() === "mystic theurge";
		});
	}

	function getHighestMentalAbility() {
		return ["Intelligence", "Wisdom", "Charisma"].reduce(function (highest, ability) {
			const modifier = Number($("#page1 [name='" + ability + "mod']").val()) || 0;
			return !highest || modifier > highest.modifier
				? { name: ability, modifier: modifier }
				: highest;
		}, null);
	}

	function getCantripAbility(sourceAbility) {
		return isMysticTheurgeSelected()
			? getHighestMentalAbility().name
			: sourceAbility;
	}

	function getCantripAbilityModifier(ability) {
		return Number($("#page1 [name='" + ability + "mod']").val()) || 0;
	}

	function isAgonizingBlastSelected() {
		const selections = featureChoiceSelections["class:Warlock:warlock-invocations"];
		return Array.isArray(selections) && selections.indexOf("Agonizing Blast") !== -1;
	}

	function cantripCanComeFromEntry(cantrip, entry) {
		const sourceClass = entry.name === "Eldritch Knight" || entry.name === "Arcane Trickster"
			? "Wizard"
			: entry.className;
		const hasEligibleClass = cantrip.rule.classes.indexOf(sourceClass) !== -1;
		const hasTomeCantrip = entry.className === "Warlock"
			&& (featureChoiceSelections["class:Warlock:warlock-pact-boon"] || []).indexOf("Pact of the Tome") !== -1;
		return hasEligibleClass || hasTomeCantrip;
	}

	function getCantripDamage(name, characterLevel, abilityModifier) {
		const cantrip = getCantripRule(name);
		if (!cantrip) {
			return "";
		}
		const rule = cantrip.rule;
		const tier = characterLevel >= 17 ? 4 : characterLevel >= 11 ? 3 : characterLevel >= 5 ? 2 : 1;
		if (cantrip.name === "Eldritch Blast") {
			const agonizingModifier = isAgonizingBlastSelected() ? abilityModifier : 0;
			const perBeam = "1d10" + (agonizingModifier > 0
				? " + " + agonizingModifier
				: agonizingModifier < 0 ? " - " + Math.abs(agonizingModifier) : "") + " force";
			return tier + " x (" + perBeam + ")";
		}
		if (cantrip.name === "Booming Blade") {
			const hitDice = characterLevel >= 17 ? 3 : characterLevel >= 11 ? 2 : characterLevel >= 5 ? 1 : 0;
			const moveDice = characterLevel >= 17 ? 4 : characterLevel >= 11 ? 3 : characterLevel >= 5 ? 2 : 1;
			const extraHit = hitDice ? "; +" + hitDice + "d8 thunder on hit" : "";
			const extraMove = "; " + moveDice + "d8 thunder if target moves";
			return "Weapon damage" + extraHit + extraMove;
		}
		if (cantrip.name === "Green-Flame Blade") {
			const hitDice = characterLevel >= 17 ? 3 : characterLevel >= 11 ? 2 : characterLevel >= 5 ? 1 : 0;
			const secondaryDice = characterLevel >= 17 ? 2 : characterLevel >= 11 ? 1 : 0;
			const secondaryMod = abilityModifier > 0
				? "+" + abilityModifier
				: abilityModifier < 0 ? "-" + Math.abs(abilityModifier) : "";
			return "Weapon damage" + (hitDice ? "; +" + hitDice + "d8 fire on hit" : "")
				+ "; " + (secondaryDice ? secondaryDice + "d8" : "") + secondaryMod
				+ " fire to a second target";
		}
		const numberOfDice = rule.scalesWithLevel ? tier : 1;
		const die = rule.die;
		if (cantrip.name === "Toll the Dead") {
			return numberOfDice + die + " or " + numberOfDice + rule.missingHitPointsDie + " " + rule.damageType
				+ " (target missing hit points)";
		}
		const abilityDamage = rule.addAbilityDamage && abilityModifier !== 0
			? (abilityModifier > 0 ? " + " : " - ") + Math.abs(abilityModifier)
			: "";
		return numberOfDice + die + abilityDamage + " " + rule.damageType;
	}

	function applyCantripAttackValues(select) {
		const option = select.selectedOptions[0];
		if (!option || !option.dataset.cantripName) {
			return;
		}
		const cantrip = getCantripRule(option.dataset.cantripName);
		if (!cantrip) {
			return;
		}
		const ability = getCantripAbility(option.dataset.spellcastingAbility);
		const abilityModifier = getCantripAbilityModifier(ability);
		const proficiencyBonus = Number($("#page1 [name='proficiencybonus']").val()) || 0;
		const saveBonus = Number(characterEffects.spellSaveBonus) || 0;
		const spellAttackBonus = Number(characterEffects.spellAttackBonus) || 0;
		const fieldIndex = select.name.slice("atkname".length);
		const hitField = $("#page1 [name='atkbonus" + fieldIndex + "']");
		const damageField = $("#page1 [name='atkdamage" + fieldIndex + "']");
		let hitValue = "Weapon hit";
		if (cantrip.rule.saveAbility) {
			const dc = 8 + proficiencyBonus + abilityModifier + saveBonus;
			hitValue = "DC " + dc + " (" + cantrip.rule.saveAbility.slice(0, 3).toUpperCase() + ")";
		} else if (cantrip.rule.attack) {
			const attackBonus = proficiencyBonus + abilityModifier + spellAttackBonus;
			hitValue = (attackBonus >= 0 ? "+" : "") + attackBonus;
		}
		const baseAttackValue = cantrip.rule.attack
			? (proficiencyBonus + abilityModifier + spellAttackBonus)
			: null;
		if (baseAttackValue !== null) {
			hitField.val((baseAttackValue >= 0 ? "+" : "") + baseAttackValue).trigger("change");
		} else {
			hitField.val(hitValue).trigger("change");
		}
		damageField.val(getCantripDamage(
			cantrip.name,
			Math.max(1, getTotalClassLevels()),
			abilityModifier
		)).trigger("change");
	}

	function refreshCantripAttackChoices(entries) {
		const listedCantrips = ($("#page1 #spell-list-level-0").val() || "")
			.split(/\r?\n/)
			.map(function (name) { return name.trim(); })
			.filter(Boolean)
			.map(getCantripRule)
			.filter(Boolean)
			.filter(function (cantrip, index, cantrips) {
				return cantrips.findIndex(function (candidate) {
					return candidate.name === cantrip.name;
				}) === index;
			});
		$("#page1 select[name^='atkname']").each(function () {
			const select = this;
			const selectedOption = select.selectedOptions[0];
			const previousSelection = selectedOption && selectedOption.dataset.cantripName
				? {
					name: selectedOption.dataset.cantripName,
					sourceName: selectedOption.dataset.spellcastingClass,
				}
				: parseCantripAttackOption(select.value);
			const savedName = parseSavedAttackName(select.name) || initialSavedAttackNames[select.name];
			delete initialSavedAttackNames[select.name];
			const savedSelection = parseCantripAttackOption(savedName);
			const desiredName = previousSelection ? previousSelection.name
				: savedSelection ? savedSelection.name
					: getCantripRule(savedName) ? getCantripRule(savedName).name : "";
			const desiredSource = previousSelection ? previousSelection.sourceName
				: savedSelection ? savedSelection.sourceName : "";
			$(select).find("optgroup[data-cantrip-options]").remove();
			if (listedCantrips.length > 0 && entries.length > 0) {
				const group = document.createElement("optgroup");
				group.label = "Cantrips from Spellcasting";
				group.dataset.cantripOptions = "true";
				listedCantrips.forEach(function (cantrip) {
					entries.forEach(function (entry, entryIndex) {
						if (!cantripCanComeFromEntry(cantrip, entry)) {
							return;
						}
						const option = document.createElement("option");
						option.value = cantripAttackOptionPrefix + JSON.stringify([
							cantrip.name, entry.name, entry.ability, String(entryIndex),
						]);
						option.textContent = cantrip.name + " (" + entry.name + ")";
						option.dataset.cantripName = cantrip.name;
						option.dataset.spellcastingAbility = entry.ability;
						option.dataset.spellcastingClass = entry.name;
						group.appendChild(option);
					});
				});
				if (group.children.length > 0) {
					select.appendChild(group);
				}
			}
			if (desiredName && listedCantrips.some(function (cantrip) { return cantrip.name === desiredName; })) {
				const matchingOption = Array.from(select.options).find(function (option) {
					return option.dataset.cantripName === desiredName
						&& (!desiredSource || option.dataset.spellcastingClass === desiredSource);
				}) || Array.from(select.options).find(function (option) {
					return option.dataset.cantripName === desiredName;
				});
				select.value = matchingOption ? matchingOption.value : "";
				if (matchingOption) {
					select.dataset.cantripValuesFilled = "true";
					applyCantripAttackValues(select);
				} else if (previousSelection || savedSelection || getCantripRule(savedName)) {
					delete select.dataset.cantripValuesFilled;
					const fieldIndex = select.name.slice("atkname".length);
					$("#page1 [name='atkbonus" + fieldIndex + "'], #page1 [name='atkdamage" + fieldIndex + "']")
						.val("").trigger("change");
				}
			} else if (previousSelection || savedSelection || getCantripRule(savedName)) {
				select.value = "";
				delete select.dataset.cantripValuesFilled;
				const fieldIndex = select.name.slice("atkname".length);
				$("#page1 [name='atkbonus" + fieldIndex + "'], #page1 [name='atkdamage" + fieldIndex + "']")
					.val("").trigger("change");
			}
		});
	}

	function getMulticlassCasterLevel(entry) {
		if (entry.type === "fullCaster") {
			return entry.level;
		}
		if (entry.type === "artiCaster") {
			return Math.ceil(entry.level / 2);
		}
		if (entry.type === "halfCaster") {
			return Math.floor(entry.level / 2);
		}
		if (entry.type === "thirdCaster") {
			return Math.floor(entry.level / 3);
		}
		return 0;
	}

	function getSpellSlotProgression(entries) {
		const spellcasters = entries.filter(function (entry) { return entry.type !== "pactCaster"; });
		if (spellcasters.length === 0) {
			return [];
		}

		let casterLevel = 0;
		if (spellcasters.length === 1) {
			const entry = spellcasters[0];
			if (entry.type === "fullCaster") {
				casterLevel = entry.level;
			} else if (entry.type === "artiCaster") {
				casterLevel = Math.ceil(entry.level / 2);
			} else if (entry.type === "halfCaster") {
				casterLevel = entry.level >= 2 ? Math.ceil(entry.level / 2) : 0;
			} else if (entry.type === "thirdCaster") {
				casterLevel = Math.floor((entry.level - 1) / 3) + 1;
			}
		} else {
			casterLevel = spellcasters.reduce(function (total, entry) {
				return total + getMulticlassCasterLevel(entry);
			}, 0);
		}

		return spellSlotsByCasterLevel[Math.max(0, Math.min(20, casterLevel))] || [];
	}

	function getPactMagicProgression(level) {
		if (level < 1) {
			return null;
		}
		return {
			slotLevel: level >= 9 ? 5 : level >= 7 ? 4 : level >= 5 ? 3 : level >= 3 ? 2 : 1,
			count: level >= 17 ? 4 : level >= 11 ? 3 : level >= 2 ? 2 : 1,
		};
	}

	function renderSpellSlotBoxes(container, storageKey, count, label) {
		const usedSlots = spellSlotUsage[storageKey] || [];
		const boxes = $("<div>", { class: "spell-slot-boxes" }).appendTo(container);
		for (let index = 0; index < count; index++) {
			$("<input>", {
				type: "checkbox",
				class: "spell-slot-used",
				"data-spell-slot-key": storageKey,
				"data-spell-slot-index": index,
				"aria-label": label + " slot " + (index + 1) + " expended",
			}).prop("checked", !!usedSlots[index]).appendTo(boxes);
		}
	}

	function renderSpellcasting() {
		const entries = getSpellcastingEntries();
		const classList = $("#page1 #spellcasting-class-list").empty();
		const standardEntries = entries.filter(function (entry) { return entry.type !== "pactCaster"; });
		const pactEntries = entries.filter(function (entry) { return entry.type === "pactCaster"; });
		const proficiencyBonus = Number($("#page1 [name='proficiencybonus']").val()) || 0;
		const mysticAbility = isMysticTheurgeSelected() ? getHighestMentalAbility().name : "";
		entries.forEach(function (entry) {
			const ability = mysticAbility || entry.ability;
			const abilityModifier = getCantripAbilityModifier(ability);
			const row = $("<div>", { class: "spellcasting-class-row" }).appendTo(classList);
			$("<span>", { text: entry.name + " " + entry.level }).appendTo(row);
			$("<span>", { text: ability }).appendTo(row);
			$("<span>", {
				text: 8 + proficiencyBonus + abilityModifier + (Number(characterEffects.spellSaveBonus) || 0),
			}).appendTo(row);
			const attackBonus = proficiencyBonus + abilityModifier + (Number(characterEffects.spellAttackBonus) || 0);
			$("<span>", { text: (attackBonus >= 0 ? "+" : "") + attackBonus }).appendTo(row);
		});
		if (entries.length === 0) {
			$("<div>", {
				class: "spellcasting-empty",
				text: "Add a spellcasting class or a spellcasting subclass to show its ability and slot progression.",
			}).appendTo(classList);
		}

		const slotTracker = $("#page1 #spell-slot-tracker").empty();
		const slotProgression = getSpellSlotProgression(entries);
		if (slotProgression.length > 0) {
			const levels = $("<div>", { class: "spell-slot-levels" }).appendTo(slotTracker);
			const levelNames = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];
			slotProgression.forEach(function (count, index) {
				if (!count) {
					return;
				}
				const level = index + 1;
				const group = $("<div>", { class: "spell-slot-group" }).appendTo(levels);
				$("<span>", {
					class: "spell-slot-level-label",
					text: levelNames[index] + " (" + count + ")",
				}).appendTo(group);
				renderSpellSlotBoxes(group, "standard:" + level, count, levelNames[index] + "-level");
			});
		} else if (standardEntries.length === 0) {
			$("<div>", {
				class: "spellcasting-empty",
				text: "No standard spell slots. Pact Magic is tracked separately when applicable.",
			}).appendTo(slotTracker);
		}

		const pactTracker = $("#page1 #pact-magic-slot-tracker").empty();
		$("#page1 #spell-short-rest-button").prop("hidden", pactEntries.length === 0);
		pactEntries.forEach(function (entry) {
			const progression = getPactMagicProgression(entry.level);
			const group = $("<div>", { class: "pact-magic-slot-group" }).appendTo(pactTracker);
			$("<strong>", {
				text: "Pact Magic — " + progression.count + " " + (progression.count === 1 ? "slot" : "slots")
					+ ", " + progression.slotLevel + (progression.slotLevel === 1 ? "st" : progression.slotLevel === 2 ? "nd" : progression.slotLevel === 3 ? "rd" : "th") + "-level",
			}).appendTo(group);
			renderSpellSlotBoxes(group, "pact:" + entry.className, progression.count, "Pact Magic");
		});
		refreshCantripAttackChoices(entries);
	}

	function resetPactMagicSlots() {
		Object.keys(spellSlotUsage).forEach(function (key) {
			if (key.indexOf("pact:") === 0) {
				spellSlotUsage[key] = spellSlotUsage[key].map(function () { return false; });
			}
		});
		saveSpellSlotUsage();
		renderSpellcasting();
	}

	const classModifierRules = {
		Barbarian: [
			{ level: 1, effects: { classArmor: { base: 10, dexterity: true, ability: "Constitution" } } },
			{ level: 2, effects: { saveAdvantages: ["Advantage on Dexterity saving throws against effects you can see, while not blinded, deafened, or incapacitated"] } },
			{ level: 5, effects: { speedBonuses: [{ value: 10, notWearingHeavyArmor: true }] } },
			{ level: 7, effects: { choiceNotes: ["Advantage on initiative rolls while not incapacitated"] } },
			{ level: 18, effects: { choiceNotes: ["Indomitable Might: use your Strength score instead of a lower Strength check result"] } },
		],
		Bard: [
			{ level: 2, effects: { checkBonuses: ["Add half your proficiency bonus to ability checks that do not already include it"] } },
			{ level: 3, effects: { choiceNotes: ["Choose two skill proficiencies for Expertise"] } },
			{ level: 10, effects: { choiceNotes: ["Choose two additional skill proficiencies for Expertise"] } },
		],
		Monk: [
			{ level: 1, effects: { classArmor: { base: 10, dexterity: true, ability: "Wisdom", requiresNoShield: true } } },
			{ level: 14, effects: { savingThrows: ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"] } },
			{ level: 10, effects: { damageImmunities: ["Poison"], conditionImmunities: ["Poisoned"] } },
		],
		Paladin: [
			{ level: 6, effects: { saveBonusAbilities: ["Charisma"], choiceNotes: ["Aura of Protection adds your Charisma modifier (minimum +1) to your saving throws"] } },
			{ level: 10, effects: { conditionImmunities: ["Frightened"] } },
		],
		Ranger: [
			{ level: 1, effects: { choiceNotes: ["Choose one skill for Deft Explorer (Canny); gain Expertise in it and choose one language"] } },
			{ level: 6, effects: { speedBonuses: [{ value: 5, notWearingHeavyArmor: true }], choiceNotes: ["Climb and swim speeds equal walking speed while not wearing heavy armor (Roving)"] } },
			{ level: 8, effects: { choiceNotes: ["Land's Stride: ignore nonmagical difficult terrain from plants and have advantage against magical plants that impede movement"] } },
		],
		Rogue: [
			{ level: 1, effects: { choiceNotes: ["Choose two skill or tool proficiencies for Expertise"] } },
			{ level: 6, effects: { choiceNotes: ["Choose two additional skill or tool proficiencies for Expertise"] } },
			{ level: 11, effects: { choiceNotes: ["Reliable Talent treats a d20 roll of 9 or lower as 10 for proficient ability checks"] } },
			{ level: 15, effects: { savingThrows: ["Wisdom"] } },
		],
		Artificer: [
			{ level: 7, effects: { choiceNotes: ["Flash of Genius can add your Intelligence modifier to a nearby creature's ability check or saving throw"] } },
			{ level: 20, effects: { choiceNotes: ["Soul of Artifice adds +1 to saving throws per attuned magic item"] } },
		],
	};

	const subclassModifierRules = {
		"College of Lore": [
			{ level: 3, effects: { choiceNotes: ["Choose three skill proficiencies (Bonus Proficiencies)"] } },
		],
		"College of Swords": [
			{ level: 3, effects: { armorProficiencies: ["Medium armor"], weaponProficiencies: ["Scimitars"] } },
		],
		"College of Valor": [
			{ level: 3, effects: { armorProficiencies: ["Medium armor", "Shields"], weaponProficiencies: ["Martial weapons"] } },
		],
		"Arcana Domain": [
			{ level: 1, effects: { skills: ["Arcana"], choiceNotes: ["Choose two wizard cantrips (Arcane Initiate)"] } },
		],
		"Death Domain": [
			{ level: 1, effects: { weaponProficiencies: ["Martial weapons"] } },
		],
		"Knowledge Domain": [
			{ level: 1, effects: { choiceNotes: ["Choose two languages and two proficiencies from Arcana, History, Nature, or Religion (the chosen skills gain Expertise)"] } },
		],
		"Peace Domain": [
			{ level: 1, effects: { choiceNotes: ["Emboldening Bond adds 1d4 to an attack roll, ability check, or saving throw for bonded creatures while they are near one another"] } },
		],
		"Trickery Domain": [
			{ level: 1, effects: { choiceNotes: ["Blessing of the Trickster grants another creature advantage on Stealth checks"] } },
		],
		"Forge Domain": [
			{ level: 1, effects: { armorProficiencies: ["Heavy armor"], toolProficiencies: ["Smith's tools"] } },
			{ level: 6, effects: { damageResistances: ["Fire"] } },
			{ level: 17, effects: { damageImmunities: ["Fire (while wearing heavy armor)"], damageResistances: ["Bludgeoning, piercing, and slashing from nonmagical attacks (while wearing heavy armor)"] } },
		],
		"Life Domain": [
			{ level: 1, effects: { armorProficiencies: ["Heavy armor"] } },
		],
		"Nature Domain": [
			{ level: 1, effects: { armorProficiencies: ["Heavy armor"], choiceNotes: ["Choose one druid skill proficiency"] } },
		],
		"Order Domain": [
			{ level: 1, effects: { armorProficiencies: ["Heavy armor"], weaponProficiencies: ["One martial weapon"] } },
		],
		"Tempest Domain": [
			{ level: 1, effects: { armorProficiencies: ["Heavy armor"], weaponProficiencies: ["Martial weapons"] } },
		],
		"Twilight Domain": [
			{ level: 1, effects: { armorProficiencies: ["Heavy armor"], weaponProficiencies: ["Martial weapons"] } },
		],
		"War Domain": [
			{ level: 1, effects: { armorProficiencies: ["Heavy armor"], weaponProficiencies: ["Martial weapons"] } },
		],
		"Circle of Land": [
			{ level: 10, effects: { damageImmunities: ["Poison"], conditionImmunities: ["Poisoned", "Charmed (by fey and elementals)", "Frightened (by fey and elementals)"] } },
		],
		"Cavalier": [
			{ level: 3, effects: { choiceNotes: ["Choose Animal Handling or History proficiency (Bonus Proficiency)"] } },
		],
		"Champion": [
			{ level: 7, effects: { checkBonuses: ["Remarkable Athlete adds half your proficiency bonus to Strength, Dexterity, or Constitution checks without proficiency"] } },
		],
		"Battle Master": [
			{ level: 3, effects: { choiceNotes: ["Choose one artisan's tool proficiency (Student of War)"] } },
		],
		"Psi Warrior": [
			{ level: 10, effects: { saveAdvantages: ["Advantage on saving throws against being charmed or frightened"], damageResistances: ["Psychic"] } },
		],
		"Rune Knight": [
			{ level: 3, effects: { toolProficiencies: ["Smith's tools"] } },
		],
		"Samurai": [
			{ level: 3, effects: { choiceNotes: ["Choose one proficiency in History, Insight, Performance, Persuasion, or a language"] } },
			{ level: 7, effects: { savingThrows: ["Wisdom"], skills: ["Persuasion"], checkBonuses: ["Add your Wisdom modifier to Persuasion checks"] } },
		],
		"Purple Dragon Knight": [
			{ level: 7, effects: { skills: ["Persuasion"] } },
		],
		"Way of Mercy": [
			{ level: 3, effects: { skills: ["Insight", "Medicine"], toolProficiencies: ["Herbalism kit"] } },
		],
		"Circle of Spores": [
			{ level: 14, effects: { conditionImmunities: ["Blinded", "Deafened", "Frightened", "Poisoned"] } },
		],
		"Way of the Drunken Master": [
			{ level: 3, effects: { skills: ["Performance"] } },
		],
		"Way of the Long Death": [
			{ level: 11, effects: { choiceNotes: ["When reduced to 0 hit points, spend 1 ki point to drop to 1 hit point instead"] } },
		],
		"Way of the Ascendant Dragon": [
			{ level: 11, effects: { damageResistanceNotes: ["Aspect of the Wyrm can grant resistance to a chosen damage type to you and nearby allies while active"] } },
		],
		"Oath of the Ancients": [
			{ level: 7, effects: { damageResistances: ["Damage from spells (you and allies within the aura)"] } },
		],
		"Oath of Devotion": [
			{ level: 7, effects: { conditionImmunities: ["Charmed"] } },
		],
		"Oath of Glory": [
			{ level: 7, effects: { speedBonuses: [{ value: 10 }], choiceNotes: ["Aura of Alacrity grants nearby allies +10 ft. walking speed"] } },
		],
		"Oath of Redemption": [
			{ level: 20, effects: { damageResistances: ["All damage from other creatures (while not incapacitated)"] } },
		],
		"Oathbreaker": [
			{ level: 15, effects: { damageResistances: ["Bludgeoning, piercing, and slashing from nonmagical weapons"] } },
		],
		"Oath of the Watchers": [
			{ level: 3, effects: { saveAdvantages: ["Watcher's Will grants advantage on Intelligence, Wisdom, and Charisma saving throws to you and nearby allies for 1 minute"] } },
			{ level: 7, effects: { initiativeProficiencyBonus: true, choiceNotes: ["Aura of the Sentinel adds your proficiency bonus to initiative rolls for you and nearby allies"] } },
		],
		"Beast Master": [
			{ level: 3, effects: { choiceNotes: ["Gain a primal companion; its statistics depend on the selected form"] } },
		],
		"Fey Wanderer": [
			{ level: 3, effects: { choiceNotes: ["Choose proficiency in Deception, Performance, or Persuasion (Otherworldly Glamour)"] } },
			{ level: 7, effects: { saveAdvantages: ["Advantage on saving throws against being charmed or frightened"] } },
		],
		"Gloom Stalker": [
			{ level: 7, effects: { savingThrows: ["Wisdom"] } },
		],
		"Hunter": [
			{ level: 15, effects: { choiceNotes: ["Choose a defensive feature: Evasion, Stand Against the Tide, or Uncanny Dodge"] } },
		],
		"Monster Slayer": [
			{ level: 7, effects: { checkBonuses: ["Add 1d6 to saving throws or ability checks contested by the target of Slayer's Prey (Supernatural Defense)"] } },
		],
		"Scout": [
			{ level: 3, effects: { skills: ["Nature", "Survival"], expertiseSkills: ["Nature", "Survival"] } },
		],
		"Assassin": [
			{ level: 3, effects: { toolProficiencies: ["Disguise kit", "Poisoner's kit"] } },
		],
		"Mastermind": [
			{ level: 3, effects: { toolProficiencies: ["Disguise kit", "Forgery kit", "One gaming set"], choiceNotes: ["Choose two languages"] } },
		],
		"Swashbuckler": [
			{ level: 3, effects: { initiativeBonusAbilities: ["Charisma"] } },
		],
		"Aberrant Mind": [
			{ level: 6, effects: { saveAdvantages: ["Advantage on saving throws against being charmed or frightened"], damageResistances: ["Psychic"] } },
		],
		"Draconic Bloodline": [
			{ level: 1, effects: { classArmor: { base: 13, dexterity: true }, languages: ["Draconic"], choiceNotes: ["Add double proficiency to Charisma checks when interacting with dragons if already proficient"] } },
		],
		"Divine Soul": [
			{ level: 1, effects: { choiceNotes: ["Favored by the Gods can add 2d4 to one failed saving throw or missed attack roll per short or long rest"] } },
			{ level: 14, effects: { choiceNotes: ["Otherworldly Wings grants a 30-ft. flying speed while manifested"] } },
		],
		"Shadow Magic": [
			{ level: 18, effects: { damageResistanceNotes: ["Umbral Form grants resistance to all damage except force and radiant while active"] } },
		],
		"Storm Sorcery": [
			{ level: 6, effects: { damageResistances: ["Lightning", "Thunder"] } },
			{ level: 18, effects: { damageImmunities: ["Lightning", "Thunder"], flySpeed: 60 } },
		],
		"The Fathomless": [
			{ level: 1, effects: { swimSpeed: 40, choiceNotes: ["Can breathe underwater"] } },
			{ level: 6, effects: { damageResistances: ["Cold"] } },
		],
		"The Archfey": [
			{ level: 10, effects: { conditionImmunities: ["Charmed"] } },
		],
		"The Fiend": [
			{ level: 10, effects: { damageResistanceNotes: ["Fiendish Resilience: choose a damage type (not bludgeoning, piercing, or slashing); change it after a short or long rest"] } },
		],
		"The Genie": [
			{ level: 6, effects: { damageResistanceNotes: ["Elemental Gift grants resistance to your patron's damage type while active"], choiceNotes: ["Elemental Gift grants a 30-ft. flying speed while active"] } },
		],
		"The Great Old One": [
			{ level: 10, effects: { damageResistances: ["Psychic"], choiceNotes: ["Thought Shield also reflects psychic damage to its source"] } },
		],
		"The Hexblade": [
			{ level: 1, effects: { armorProficiencies: ["Medium armor", "Shields"], weaponProficiencies: ["Martial weapons"] } },
		],
		"The Undead": [
			{ level: 1, effects: { conditionImmunities: ["Frightened (while Form of Dread is active)"] } },
			{ level: 10, effects: { damageResistances: ["Necrotic"], damageImmunities: ["Necrotic (while Form of Dread is active)"] } },
		],
		"School of Abjuration": [
			{ level: 14, effects: { saveAdvantages: ["Advantage on saving throws against spells"], damageResistances: ["Damage from spells"] } },
		],
		"School of Necromancy": [
			{ level: 10, effects: { damageResistances: ["Necrotic"] } },
		],
		"War Magic": [
			{ level: 10, effects: { choiceNotes: ["While concentrating on a spell, gain +2 AC and +2 to saving throws (Durable Magic)"] } },
		],
		"Bladesinging": [
			{ level: 2, effects: { armorProficiencies: ["Light armor"], choiceNotes: ["Choose one type of one-handed melee weapon proficiency; while Bladesong is active, gain +10 ft. speed and add Intelligence modifier to AC (requires no armor or shield)"] } },
		],
		"Alchemist": [
			{ level: 3, effects: { toolProficiencies: ["Alchemist's supplies"] } },
		],
		"Armorer": [
			{ level: 3, effects: { armorProficiencies: ["Heavy armor"], toolProficiencies: ["Smith's tools"] } },
		],
		"Artillerist": [
			{ level: 3, effects: { toolProficiencies: ["Woodcarver's tools"] } },
		],
		"Battle Smith": [
			{ level: 3, effects: { weaponProficiencies: ["Martial weapons"], toolProficiencies: ["Smith's tools"] } },
		],
	};

	const subclassOptions = $("<datalist id='subclass-options'></datalist>");
	Object.keys(subclassRules).forEach(function (subclassName) {
		subclassOptions.append($("<option>").val(subclassName));
	});
	$("#page1").append(subclassOptions);

	const subclassClassRules = {
		Barbarian: function (name) { return name.indexOf("Path of ") === 0; },
		Bard: function (name) { return name.indexOf("College of ") === 0; },
		Cleric: function (name) { return name.endsWith(" Domain"); },
		Druid: function (name) { return name.indexOf("Circle of ") === 0; },
		Fighter: function (name) {
			return ["Arcane Archer", "Battle Master", "Cavalier", "Champion", "Eldritch Knight", "Psi Warrior", "Purple Dragon Knight", "Rune Knight", "Samurai"].indexOf(name) !== -1;
		},
		Monk: function (name) { return name.indexOf("Way of ") === 0; },
		Paladin: function (name) { return name.indexOf("Oath of ") === 0 || name === "Oathbreaker"; },
		Ranger: function (name) {
			return ["Beast Master", "Drakewarden", "Fey Wanderer", "Gloom Stalker", "Horizon Walker", "Hunter", "Monster Slayer", "Swarmkeeper"].indexOf(name) !== -1;
		},
		Rogue: function (name) {
			return ["Arcane Trickster", "Assassin", "Inquisitive", "Mastermind", "Phantom", "Scout", "Soulknife", "Swashbuckler", "Thief"].indexOf(name) !== -1;
		},
		Sorcerer: function (name) {
			return ["Aberrant Mind", "Clockwork Soul", "Divine Soul", "Draconic Bloodline", "Lunar Sorcery", "Shadow Magic", "Storm Sorcery", "Wild Magic"].indexOf(name) !== -1;
		},
		Warlock: function (name) { return name.indexOf("The ") === 0; },
		Wizard: function (name) {
			return ["Bladesinging", "Order of Scribes", "War Magic"].indexOf(name) !== -1
				|| name.indexOf("School of ") === 0;
		},
		Artificer: function (name) {
			return ["Alchemist", "Armorer", "Artillerist", "Battle Smith"].indexOf(name) !== -1;
		},
	};

	function getSubclassesForClass(className) {
		const matches = subclassClassRules[className];
		return matches
			? Object.keys(subclassRules).filter(matches)
			: [];
	}

	function updateSubclassForPair(pair) {
		const className = pair.find(".class-name-input").val().trim();
		const subclassInput = pair.find(".subclass-name-input");
		const allowedSubclasses = getSubclassesForClass(className);
		const currentSubclass = subclassInput.val().trim();
		const isValidSubclass = allowedSubclasses.indexOf(currentSubclass) !== -1;

		subclassInput.attr("data-subclass-class", className);
		if (currentSubclass && !isValidSubclass) {
			subclassInput.val("");
			if (magicItemInput === subclassInput[0]) {
				closeMagicItemSuggestions();
			}
		}

		return allowedSubclasses;
	}

	$("#page1 .class-pair").each(function () {
		updateSubclassForPair($(this));
	});

	function getFeaturesUpToLevel(featuresByLevel, level) {
		let features = [];

		Object.keys(featuresByLevel)
			.sort(function (a, b) {
				return Number(a) - Number(b);
			})
			.forEach(function (featureLevel) {
				if (level >= Number(featureLevel)) {
					features = features.concat(featuresByLevel[featureLevel]);
				}
			});

		return features;
	}

	function removeReplacedFeatures(features) {
		const replacedFeatures = [];

		features.forEach(function (feature) {
			if (typeof feature === "object" && feature.replaces) {
				replacedFeatures.push(feature.replaces);
			}
		});

		return features.filter(function (feature) {
			const featureName = typeof feature === "string"
				? feature
				: feature.name;

			return replacedFeatures.indexOf(featureName) === -1;
		});
	}

	function getSelectedRaceRule() {
		const selectedRace = $("#page1 [name='race']").val().trim();
		const normalizedRace = selectedRace.toLowerCase();
		const familyName = racialFeatAliases[normalizedRace];
		const baseRuleName = Object.keys(racialFeatureRules).find(function (name) {
			return name.toLowerCase() === (familyName || normalizedRace).toLowerCase();
		});
		const variantRuleName = Object.keys(racialFeatureVariantRules).find(function (name) {
			return name.toLowerCase() === normalizedRace;
		});
		let standaloneRuleName = Object.keys(racialFeatureStandaloneRules).find(function (name) {
			return name.toLowerCase() === normalizedRace;
		});
		const rules = [];

		if (lineageRace) {
			standaloneRuleName = Object.keys(racialFeatureStandaloneRules).find(function (name) {
				return name.toLowerCase() === lineageRace;
			});
			if (standaloneRuleName) {
				rules.push(racialFeatureStandaloneRules[standaloneRuleName]);
			}
		} else {
			if (baseRuleName) {
				rules.push(racialFeatureRules[baseRuleName]);
			}
			if (variantRuleName) {
				rules.push(racialFeatureVariantRules[variantRuleName]);
			}
			if (standaloneRuleName) {
				rules.push(racialFeatureStandaloneRules[standaloneRuleName]);
			}
		}

		const result = {
			features: [],
			effects: {
				skills: [],
				languages: [],
				armorProficiencies: [],
				weaponProficiencies: [],
				toolProficiencies: [],
				choiceNotes: [],
				checkBonuses: [],
				checkAdvantages: [],
				checkDisadvantages: [],
				skillAdvantages: [],
				skillDisadvantages: [],
				saveAdvantages: [],
				saveDisadvantages: [],
				conditionAdvantages: [],
				conditionImmunities: [],
			},
		};

		rules.forEach(function (rule) {
			result.features = result.features.concat(rule.features || []);
			Object.keys(rule.effects || {}).forEach(function (effectName) {
				const effectValue = rule.effects[effectName];
				if (Array.isArray(effectValue)) {
					result.effects[effectName] = (result.effects[effectName] || []).concat(effectValue);
				} else {
					result.effects[effectName] = effectValue;
				}
			});
		});

		result.features = result.features.filter(function (feature, index) {
			return result.features.indexOf(feature) === index;
		});
		Object.keys(result.effects).forEach(function (effectName) {
			if (Array.isArray(result.effects[effectName])) {
				result.effects[effectName] = result.effects[effectName].filter(function (effect, index) {
					return result.effects[effectName].indexOf(effect) === index;
				});
			}
		});
		if (rules.length > 0) {
			result.effects.walkSpeed = result.effects.walkSpeed || 30;
		}

		return result;
	}

	function createEmptyEffects() {
		return {
			skills: [],
			expertiseSkills: [],
			languages: [],
			armorProficiencies: [],
			weaponProficiencies: [],
			toolProficiencies: [],
			choiceNotes: [],
			checkBonuses: [],
			checkAdvantages: [],
			checkDisadvantages: [],
			skillAdvantages: [],
			skillDisadvantages: [],
			saveAdvantages: [],
			saveDisadvantages: [],
			conditionAdvantages: [],
			conditionImmunities: [],
			damageResistances: [],
			damageResistanceNotes: [],
			damageImmunities: [],
			rageEffects: [],
			savingThrows: [],
			saveBonusAbilities: [],
			expertiseSavingThrows: [],
			abilityScoreBonuses: {},
			abilityScoreMaximumBonuses: {},
			initiativeBonusAbilities: [],
			speedBonuses: [],
			specialNotes: [],
		};
	}

	function mergeEffects(target, source) {
		Object.keys(source || {}).forEach(function (effectName) {
			const value = source[effectName];
			if (Array.isArray(value)) {
				target[effectName] = (target[effectName] || []).concat(value);
			} else if (effectName === "armorBonus") {
				target.armorBonus = (target.armorBonus || 0) + value;
			} else if (effectName === "abilityScoreBonuses") {
				target.abilityScoreBonuses = target.abilityScoreBonuses || {};
				Object.keys(value || {}).forEach(function (ability) {
					target.abilityScoreBonuses[ability] = (target.abilityScoreBonuses[ability] || 0) + value[ability];
				});
			} else if (effectName === "abilityScoreMaximumBonuses") {
				target.abilityScoreMaximumBonuses = target.abilityScoreMaximumBonuses || {};
				Object.keys(value || {}).forEach(function (ability) {
					target.abilityScoreMaximumBonuses[ability] = (target.abilityScoreMaximumBonuses[ability] || 0) + value[ability];
				});
			} else if (["allSavingThrowBonus", "initiativeBonus", "maxHpBonus", "maxHpPerLevel", "physicalDamageReduction", "magicalDamageReduction", "attackBonus", "meleeAttackBonus", "rangedAttackBonus", "spellAttackBonus", "spellSaveBonus", "physicalDamageBonus", "spellDamageBonus", "passivePerceptionBonus", "passiveInvestigationBonus", "concentrationBonus"].indexOf(effectName) !== -1) {
				target[effectName] = (target[effectName] || 0) + value;
			} else if (effectName === "armor" || effectName === "classArmor") {
				if (!target[effectName]) {
					target[effectName] = value;
				}
			} else {
				target[effectName] = value;
			}
		});
	}

	function getClassModifierEffects() {
		const effects = createEmptyEffects();

		function addLevelEffects(rules, level) {
			(rules || []).forEach(function (rule) {
				if (level >= rule.level) {
					mergeEffects(effects, rule.effects);
				}
			});
		}

		$("#page1 .class-pair").each(function () {
			const className = $(this).find(".class-name-input").val().trim();
			const level = Number($(this).find(".class-level-input").val());
			if (!className || !Number.isInteger(level) || level < 1 || level > 20) {
				return;
			}

			addLevelEffects(classModifierRules[className], level);
			const subclassName = $(this).find(".subclass-name-input").val().trim();
			const subclassLevel = subclassLevels[className];
			if (subclassName && Number.isInteger(subclassLevel) && level >= subclassLevel) {
				addLevelEffects(subclassModifierRules[subclassName], level);
			}
		});

		const barbarianContext = getBarbarianContext();
		if (rageActive && barbarianContext) {
			const level = barbarianContext.level;
			const rageDamageBonus = level >= 16 ? 4 : level >= 9 ? 3 : 2;
			effects.rageEffects.push(
				"Strength-based melee weapon attacks deal +" + rageDamageBonus + " damage; advantage on Strength checks and Strength saving throws"
			);
			effects.rageEffects.push(level >= 15
				? "Cannot cast spells or concentrate; rage lasts up to 1 minute, and Persistent Rage ends early only if you become unconscious or choose to end it"
				: "Cannot cast spells or concentrate; rage lasts up to 1 minute and ends early if you become unconscious, choose to end it as a bonus action, or neither attack a hostile creature nor take damage since your previous turn");

			const subclassName = barbarianContext.subclass;
			const beastForm = $("#page1 [name='rage-beast-form']").val();
			const isBearTotem = subclassName === "Path of the Totem Warrior"
				&& level >= 3
				&& $("#page1 [name='rage-totem-spirit']").val() === "bear";
			if (isBearTotem) {
				effects.damageResistances.push("All damage except psychic (while raging)");
			} else {
				effects.damageResistances.push("Bludgeoning, piercing, and slashing (while raging)");
			}

			if (subclassName === "Path of the Ancestral Guardian" && level >= 3) {
				effects.rageEffects.push("Ancestral Protectors: the first creature hit on your turn has disadvantage on attacks against targets other than you; any creature other than you that it hits has resistance to damage from its attacks");
				if (level >= 6) {
					const spiritShieldDice = level >= 14 ? 4 : level >= 10 ? 3 : 2;
					effects.rageEffects.push("Spirit Shield reaction: reduce damage to a nearby creature by " + spiritShieldDice + "d6");
				}
				if (level >= 14) {
					effects.rageEffects.push("Vengeful Ancestors: Spirit Shield can also damage the attacker");
				}
			} else if (subclassName === "Path of the Battlerager" && level >= 3) {
				effects.rageEffects.push("Battlerager Armor (while wearing spiked armor): bonus-action attack (1d4 + Strength piercing)");
				if (level >= 6) {
					effects.rageEffects.push("Reckless Abandon: when you use Reckless Attack while raging, gain temporary hit points equal to your Constitution modifier (minimum 1)");
				}
				if (level >= 10) {
					effects.rageEffects.push("Battlerager Charge: Dash as a bonus action while raging");
				}
				if (level >= 14) {
					effects.rageEffects.push("Spiked Retribution: reaction to deal 3 piercing damage to a creature that damages you within 5 feet");
				}
			} else if (subclassName === "Path of the Beast" && level >= 3) {
				effects.rageEffects.push(beastForm
					? "Form of the Beast " + beastForm + " natural weapon is listed in the attacks table"
					: "Choose Bite, Claws, or Tail for your Form of the Beast natural weapon");
				if (level >= 6) {
					effects.rageEffects.push("Bestial Soul: natural weapon attacks count as magical; choose the enhanced jump, climb, or swim benefit");
				}
				if (level >= 10) {
					effects.rageEffects.push("Infectious Fury: once per rage, force a target hit by your natural weapon to make a save or take psychic damage / attack another creature");
				}
				if (level >= 14) {
					effects.rageEffects.push("Call the Hunt: grant allies temporary hit points and extra damage while raging");
				}
			} else if (subclassName === "Path of the Berserker" && level >= 3) {
				effects.rageEffects.push("Frenzy: make one melee weapon attack as a bonus action on turns after entering a Frenzied Rage; gain one exhaustion level when the rage ends");
				if (level >= 6) {
					effects.conditionImmunities.push("Charmed (while raging)", "Frightened (while raging)");
				}
				if (level >= 14) {
					effects.rageEffects.push("Retaliation: when a creature within 5 feet damages you, make a melee weapon attack against it as a reaction");
				}
			} else if (subclassName === "Path of the Giant" && level >= 3) {
				effects.rageEffects.push("Giant's Havoc: become Large if space permits, gain 5 ft. reach, and deal +1d6 damage once per turn");
				if (level >= 6) {
					const giantDamageType = $("#page1 [name='rage-giant-damage']").val();
					effects.rageEffects.push("Elemental Cleaver: add 1d6 " + (giantDamageType || "chosen elemental") + " damage to one weapon; it becomes magical and can be thrown and recalled");
				}
				if (level >= 10) {
					effects.rageEffects.push("Mighty Impel: move a creature smaller than Large up to 30 feet as a bonus action (Strength save negates)");
				}
				if (level >= 14) {
					effects.rageEffects.push("Demiurgic Colossus: become Huge if space permits, gain 10 ft. reach, and increase Giant's Havoc bonus damage to 1d8");
				}
			} else if (subclassName === "Path of the Storm Herald" && level >= 3) {
				const stormAura = $("#page1 [name='rage-storm-aura']").val();
				effects.rageEffects.push("Storm Aura (" + (stormAura || "choose Desert, Sea, or Tundra") + "): activate your aura's area effect when you enter rage and as a bonus action");
				if (level >= 6) {
					const stormResistance = { desert: "Fire", sea: "Lightning", tundra: "Cold" }[stormAura];
					if (stormResistance) {
						effects.damageResistances.push(stormResistance + " (Storm Soul, while raging)");
					} else {
						effects.damageResistanceNotes.push("Storm Soul: choose fire, lightning, or cold resistance based on your storm aura (while raging)");
					}
				}
				if (level >= 10) {
					effects.rageEffects.push("Shielding Storm: nearby allies gain resistance to the damage type granted by Storm Soul");
				}
				if (level >= 14) {
					effects.rageEffects.push("Raging Storm: gain the additional reaction effect for your chosen Desert, Sea, or Tundra aura");
				}
			} else if (subclassName === "Path of the Zealot" && level >= 3) {
				const zealotDamageType = $("#page1 [name='rage-zealot-damage']").val();
				effects.rageEffects.push("Divine Fury: first creature hit on each of your turns takes 1d6 + " + Math.floor(level / 2) + " " + (zealotDamageType || "radiant or necrotic") + " damage");
				if (level >= 6) {
					effects.rageEffects.push("Fanatical Focus: once per rage, reroll a failed saving throw");
				}
				if (level >= 10) {
					effects.rageEffects.push("Zealous Presence: once per long rest, grant nearby allies advantage on attacks and saves for 1 round");
				}
				if (level >= 14) {
					effects.rageEffects.push("Rage Beyond Death: avoid falling unconscious from 0 hit points while raging");
				}
			} else if (subclassName === "Path of the Wild Magic" && level >= 3) {
				effects.rageEffects.push("Wild Surge: roll on the Wild Magic table when you enter rage; later features can restore spell slots or trigger another surge");
				if (level >= 6) {
					effects.rageEffects.push("Bolstering Magic: use a bonus action to add 1d3 to an attack roll or ability check for 10 minutes, or restore a spell slot");
				}
				if (level >= 10) {
					effects.rageEffects.push("Unstable Backlash: when you take damage or fail a save while raging, use your reaction to trigger another Wild Surge");
				}
				if (level >= 14) {
					effects.rageEffects.push("Controlled Surge: choose the Wild Surge effect instead of rolling randomly");
				}
			}
		}

		Object.keys(effects).forEach(function (effectName) {
			if (Array.isArray(effects[effectName])) {
				effects[effectName] = effects[effectName].filter(function (value, index, values) {
					const comparable = typeof value === "object" ? JSON.stringify(value) : value;
					return values.findIndex(function (otherValue) {
						return (typeof otherValue === "object" ? JSON.stringify(otherValue) : otherValue) === comparable;
					}) === index;
				});
			}
		});
		return effects;
	}

	const selectedFeatureEffectRules = {
		feats: {
			"athlete": { abilityChoices: ["Strength", "Dexterity"] },
			"crusher": { abilityChoices: ["Strength", "Constitution"] },
			"durable": { abilityChoices: ["Constitution"] },
			"fey touched": { abilityChoices: ["Intelligence", "Wisdom", "Charisma"] },
			"piercer": { abilityChoices: ["Strength", "Dexterity"] },
			"shadow touched": { abilityChoices: ["Intelligence", "Wisdom", "Charisma"] },
			"slasher": { abilityChoices: ["Strength", "Dexterity"] },
			"tavern brawler": { abilityChoices: ["Strength", "Constitution"] },
			"gunner": { abilityChoices: ["Dexterity"] },
			"chef": { abilityChoices: ["Constitution", "Wisdom"] },
			"gift of the chromatic dragon": { abilityChoices: ["Strength", "Dexterity", "Constitution"] },
			"gift of the gem dragon": { abilityChoices: ["Strength", "Constitution", "Charisma"] },
			"gift of the metallic dragon": { abilityChoices: ["Strength", "Dexterity", "Constitution"] },
			"telekinetic": { abilityChoices: ["Intelligence", "Wisdom", "Charisma"] },
			"telepathic": { abilityChoices: ["Intelligence", "Wisdom", "Charisma"] },
			"keen mind": { abilityChoices: ["Intelligence"] },
			"elven accuracy": { abilityChoices: ["Dexterity", "Intelligence", "Wisdom", "Charisma"] },
			"dragon fear": { abilityChoices: ["Strength", "Constitution", "Charisma"] },
			"squat nimbleness": { abilityChoices: ["Strength", "Dexterity"], effects: { speedBonuses: [{ value: 5 }] }, notes: ["Gain proficiency in Athletics or Acrobatics."] },
			"dwarven fortitude": { abilityChoices: ["Constitution"] },
			"fade away": { abilityChoices: ["Dexterity", "Intelligence"] },
			"second chance": { abilityChoices: ["Dexterity", "Constitution", "Charisma"] },
			"orcish fury": { abilityChoices: ["Strength", "Constitution"] },
			"prodigy": { abilityChoices: abilityNames, notes: ["Choose one skill proficiency, one skill expertise, and one language."] },
			"skill expert": { abilityChoices: abilityNames, notes: ["Choose one skill proficiency and one skill for expertise."] },
			"armored": { abilityChoices: ["Strength", "Dexterity"], notes: ["Gain armor proficiency granted by this feat."] },
			"alert": { effects: { initiativeBonus: 5 } },
			"medium armor master": { effects: { mediumArmorMaster: true }, notes: ["Medium armor does not impose disadvantage on Stealth checks; add up to +3 Dexterity modifier to AC while wearing it."] },
			"dragon hide": { abilityChoices: ["Strength", "Charisma"], effects: { armor: { base: 13, dexterity: true } } },
			"observant": { abilityChoices: ["Intelligence", "Wisdom"], effects: { passivePerceptionBonus: 5, passiveInvestigationBonus: 5 } },
			"resilient": { abilityChoices: abilityNames, choiceEffect: "savingThrows" },
			"vigor of the hill giant": { abilityChoices: ["Strength", "Constitution"] },
			"fury of the frost giant": { abilityChoices: ["Strength", "Constitution", "Wisdom"] },
			"guile of the cloud giant": { abilityChoices: ["Strength", "Constitution", "Charisma"] },
			"keenness of the stone giant": { abilityChoices: ["Strength", "Constitution", "Wisdom"] },
			"ember of the fire giant": { abilityChoices: ["Strength", "Constitution", "Intelligence"] },
			"soul of the storm giant": { abilityChoices: ["Strength", "Constitution", "Wisdom"] },
			"aberrant dragonmark": { abilityChoices: ["Constitution"] },
			"tough": { effects: { maxHpPerLevel: 2 } },
			"mobile": { effects: { speedBonuses: [{ value: 10 }] } },
		},
		boons: {
			"boon of speed": { effects: { speedBonuses: [{ value: 30 }] } },
			"boon of fortitude": { effects: { maxHpBonus: 40 } },
			"boon of magic resistance": { effects: { saveAdvantages: ["Advantage on saving throws against spells and other magical effects"] } },
			"boon of perfect health": { effects: { conditionImmunities: ["Poisoned"], damageImmunities: ["Poison"] }, notes: ["You are immune to disease."] },
			"boon of fire soul": { effects: { damageImmunities: ["Fire"] } },
			"boon of the stormborn": { effects: { flySpeed: 30, damageImmunities: ["Lightning", "Thunder"] } },
			"boon of resilience": { notes: ["Choose one damage type for the resistance granted by this boon."] },
			"boon of truesight": { notes: ["Gain truesight out to 60 feet."] },
			"boon of the unfettered": { notes: ["Ignore difficult terrain and magical effects that reduce movement or restrain you."] },
			"boon of irresistible offense": { notes: ["Your weapon attacks overcome resistance to bludgeoning, piercing, and slashing damage."] },
			"boon of recovery": { notes: ["Regain 20 hit points when you roll initiative."] },
			"boon of invincibility": { notes: ["Use the boon to gain resistance to all damage for 1 minute."] },
			"boon of dimensional travel": { notes: ["Teleport up to 30 feet as a bonus action."] },
			"boon of luck": { notes: ["Add a d10 to an ability check, attack roll, or saving throw once per short rest."] },
			"boon of fate": { notes: ["Add or subtract a d10 from a creature's ability check, attack roll, or saving throw once per short rest."] },
			"boon of peerless aim": { notes: ["Turn a missed ranged weapon attack into a hit once per short rest."] },
			"boon of combat prowess": { notes: ["Turn a missed melee weapon attack into a hit once per short rest."] },
			"boon of high magic": { notes: ["Gain one additional 9th-level spell slot."] },
			"boon of spell mastery": { notes: ["Choose a 1st-level spell to cast at will."] },
			"boon of spell recall": { notes: ["Recover one expended spell slot of 8th level or lower once per long rest."] },
			"boon of quick casting": { notes: ["Cast a spell with a casting time of 1 action as a bonus action once per short rest."] },
			"boon of the night spirit": { notes: ["Become invisible while in dim light or darkness."] },
		},
		talents: {
			"martial artist": { fightingStyleSource: "all" },
			"ranged": { effects: { rangedAttackBonus: 1 } },
			"melee": { effects: { meleeAttackBonus: 1 } },
			"defense": { effects: { armorBonus: 1 } },
			"fortitude": { effects: { allSavingThrowBonus: 1 } },
			"spell attack": { effects: { spellAttackBonus: 1 } },
			"spell save": { effects: { spellSaveBonus: 1 } },
			"kite": { notes: ["Move 5 feet faster when moving away from enemies."] },
			"wound": { effects: { physicalDamageBonus: 1 } },
			"prowl": { notes: ["Move 10 feet faster when moving toward enemies."] },
			"shrug": { effects: { physicalDamageReduction: 1 } },
			"vigor": { notes: ["Roll your largest Hit Die once and add the result to your hit point maximum."] },
			"agonizing spells": { effects: { spellDamageBonus: 1 } },
			"strong minded": { effects: { concentrationBonus: 1 } },
			"attack mitigation": { effects: { physicalDamageReduction: 1 } },
			"spell mitigation": { effects: { magicalDamageReduction: 1 } },
			"excessive training": { abilityChoices: ["Dexterity", "Strength"], increaseMaximum: true },
			"bodily focus": { abilityChoices: ["Constitution"], increaseMaximum: true },
			"deep studies": { abilityChoices: ["Intelligence", "Wisdom", "Charisma"], increaseMaximum: true },
			"inner storm": { notes: ["Deal 1 lightning damage to creatures that hit you with an attack."] },
			"defensive casting": { notes: ["Spells that increase or set your AC grant an additional +1 AC."] },
			"defensive concentration": { notes: ["Gain +1 AC while concentrating on a spell."] },
			"focused resistance": { notes: ["Choose one damage type; you gain resistance to it."] },
			"warding": { effects: { halfProficiencyToSaves: true } },
			"precise hits": { effects: { halfProficiencyToPhysicalDamage: true } },
			"hardened skin": { effects: { damageResistances: ["Nonmagical bludgeoning, piercing, and slashing"] } },
			"proficient defence": { effects: { halfProficiencyToArmor: true } },
			"focused immunity": { notes: ["Choose one damage type other than bludgeoning, piercing, or slashing; you gain immunity to it."] },
			"tactical start": { abilityChoices: ["Intelligence", "Wisdom", "Charisma"], choiceEffect: "initiativeBonusAbilities" },
			"excruciating spells": { effects: { halfProficiencyToSpellDamage: true } },
			"alacrity": { effects: { initiativeProficiencyBonus: true } },
			"strong start": { effects: { initiativeBonusAbilities: ["Strength"] } },
			"armored": { effects: { armorBonusWhileArmored: 1 } },
			"unarmored": { effects: { armorBonusWhileUnarmored: 1 } },
			"iron will": { abilityChoices: ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"], choiceEffect: "expertiseSavingThrows" },
		},
	};

	const talentDescriptionByName = {
		"ranged": "+1 to ranged attack rolls.",
		"melee": "+1 to melee attack rolls.",
		"defense": "+1 to AC.",
		"fortitude": "+1 to all saving throws.",
		"spell attack": "+1 to spell attacks.",
		"spell save": "+1 to spell saves.",
		"kite": "+5 ft movement away from enemies.",
		"wound": "+1 physical damage.",
		"prowl": "+10 ft movement towards enemies.",
		"dual shield": "You can benefit from multiple shields at the same time.",
		"shrug": "+1 damage reduction.",
		"vigor": "Roll your largest HD once and add it to your HP total.",
		"spell sniper": "Double the range of spells.",
		"agonizing spells": "+1 spell damage.",
		"strong minded": "+1 to concentration checks.",
		"stagger": "Ranged attacks slow enemies hit by 5 ft.",
		"enhanced weaponry": "All weapons and ammunition count as magical.",
		"dexterous wielder": "All weapons gain the finesse property.",
		"iron grip": "Versatile weapons use their highest damage die when wielded one-handed.",
		"shield bash": "If you are wielding a shield, you can use the shove action as a bonus action. Add the AC bonus from your shield to the Athletics check.",
		"attack mitigation": "+1 physical damage reduction.",
		"spell mitigation": "+1 magical damage reduction.",
		"mithril casing": "Ignore Strength requirements for armor.",
		"repelling spells": "Spells knock creatures back 5 ft. Usable once per turn.",
		"twinned cantrips": "Cantrips can target an additional creature or point.",
		"extended spells": "Double the duration of spells.",
		"split mind": "You can target an additional creature or point with concentration spells.",
		"point blank": "No penalty for firing into melee.",
		"sniper": "Double the range of weapons.",
		"excessive training": "+1 Dexterity or Strength and raise that ability score's maximum by 2.",
		"distancing": "Increase the reach of weapons and unarmed strikes by 5 ft.",
		"offensive defense": "Shields count as simple 1d4 bludgeoning weapons.",
		"inner storm": "Deal 1 lightning damage to attackers.",
		"bodily focus": "+1 Constitution and raise the ability score maximum by 2.",
		"veil of the guardian": "Once per turn, when a creature hits you with an attack roll, you can use your reaction to roll a d6. On a 5-6, the attack instead misses you, regardless of its roll.",
		"defensive casting": "Spells that increase or set AC grant an extra +1 AC (does not stack with multiple spells).",
		"cantrip versatility": "Learn 1 cantrip from any class; it counts as being from your spellcasting classes.",
		"deep studies": "+1 Intelligence, Wisdom, or Charisma and raise that ability score's maximum by 2.",
		"danger zone": "+10 ft spell area.",
		"defensive concentration": "Gain +1 AC if you are concentrating on a spell.",
		"curved shot": "You ignore all forms of cover.",
		"retaliate": "If an enemy misses you with an attack, you can use your reaction to make a ranged attack of opportunity.",
		"draconic weapon": "Transmute weapon damage into acid, cold, fire, lightning, or thunder.",
		"arms specialist": "Swap between bludgeoning, piercing, and slashing damage.",
		"well sharpened": "Weapon damage dice can't be below 1d8 (does not affect 2dx weapons).",
		"vibranium shield": "Shields gain the thrown and returning properties with a range of 30/60 ft.",
		"nimble": "You can take the Dodge action as a bonus action.",
		"focused resistance": "Gain resistance to one damage type.",
		"warding": "Add half your proficiency bonus, rounded up, to all saving throws.",
		"armored focus": "Use armor or a shield as a spellcasting focus.",
		"freecasting": "Cantrips require no components.",
		"masterful transmutation": "Transmute spell damage to any type.",
		"rejuvenating spells": "Whenever you cast a spell, restore hit points equal to 2 x the level of the spell slot expended.",
		"concentration expert": "You can concentrate on 2 spells at once (they share concentration checks).",
		"arcane shot": "Imbue a ranged weapon attack with a spell (range of touch or self) once per turn.",
		"heavy blow": "The first attack that hits each turn deals 1 additional weapon damage die.",
		"precise hits": "Add half your proficiency bonus, rounded up, to physical damage rolls.",
		"martial artist": "Gain 1 fighting style from any source.",
		"final stand": "When you are reduced to 0 hit points but not killed outright, you drop to 1 hit point instead. Once you use this trait, you can't do so again until you finish a long rest.",
		"hardened skin": "Gain resistance to non-magical bludgeoning, piercing, and slashing damage.",
		"proficient defence": "Add half your proficiency bonus, rounded up, to AC.",
		"focused immunity": "Gain immunity to 1 damage type (except bludgeoning, piercing, and slashing).",
		"phantom": "Once per long rest, negate the first instance of damage you would take.",
		"tactical start": "Add either your Intelligence, Wisdom, or Charisma modifier to initiative.",
		"excruciating spells": "Add half your proficiency bonus, rounded up, to magic damage rolls.",
		"sorcerer's pupil": "Gain 1 sorcery point and 1 metamagic option.",
		"concentration insurance": "If you lose concentration, you can use your reaction to keep the spell going until the end of your next turn.",
		"alacrity": "Gain proficiency in initiative.",
		"arcane reforger": "Change a magic weapon to any weapon type.",
		"strong start": "Add your Strength modifier to initiative rolls.",
		"impervious": "You are immune to 1 condition of your choice, except Incapacitated (see Appendix A: Conditions).",
		"armored": "+1 AC while wearing armor.",
		"unarmored": "+1 AC while not wearing armor.",
		"iron will": "Gain expertise in a saving throw of your choice. You must already have proficiency in that saving throw.",
		"quicken cantrip": "If you cast a cantrip on your turn, you can cast a different cantrip as a bonus action.",
		"mystic theurge": "Use any mental stat for casting.",
		"flexible aoe": "Line and cone areas are interchangeable by doubling or halving the range.",
		"focused attack": "If you spend your entire turn attacking, you can attack 1 additional time (no movement, spells, or active abilities).",
		"critical hits": "Improve critical range by 1.",
		"critical immmunity": "You can't be critically hit.",
		"critical casting": "Improve spell critical range by 1 and save spells crit on a 1.",
		"greater freecasting": "The first spell you cast during combat doesn't expend a spell slot.",
		"master of arms": "You gain expertise in all weapons you have proficiency with.",
		"legendary resistance": "Gain 1 legendary resistance.",
		"spell mastery": "You gain expertise in spells.",
	};

	function getBaseSelectedFeatureName(value) {
		return String(value || "").replace(/\s+\(\+1 (Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)\)$/, "");
	}

	function addAbilityScoreChoice(effects, choice, singlePoint, gestaltPoint) {
		if (!choice || (choice.chooseFeat && !gestaltPoint) || (choice.bankPoint && gestaltPoint)) {
			return;
		}
		const first = choice.firstAbility;
		const second = choice.secondAbility;
		if (singlePoint) {
			if (abilityNames.indexOf(first) !== -1) {
				effects.abilityScoreBonuses[first] = (effects.abilityScoreBonuses[first] || 0) + 1;
			}
			return;
		}
		if (choice.mode === "one-one") {
			if (abilityNames.indexOf(first) !== -1 && abilityNames.indexOf(second) !== -1 && first !== second) {
				effects.abilityScoreBonuses[first] = (effects.abilityScoreBonuses[first] || 0) + 1;
				effects.abilityScoreBonuses[second] = (effects.abilityScoreBonuses[second] || 0) + 1;
			}
		} else if (abilityNames.indexOf(first) !== -1) {
			effects.abilityScoreBonuses[first] = (effects.abilityScoreBonuses[first] || 0) + 2;
		}
	}

	function getAbilityImprovementEffects() {
		const effects = createEmptyEffects();
		activeClassAsiKeys.forEach(function (key) {
			const gestaltPoint = isGestaltEnabled() && !!activeSinglePointAsiKeys[key];
			addAbilityScoreChoice(effects, classAsiChoices[key], !!activeSinglePointAsiKeys[key], gestaltPoint);
		});
		activeCharacterAsiLevels.forEach(function (level) {
			addAbilityScoreChoice(effects, characterAsiChoices[level], false);
		});
		activeMentorAsiLevels.forEach(function (level) {
			addAbilityScoreChoice(effects, mentorAsiChoices[level], isMentorSinglePointLevel(level));
		});
		return effects;
	}

	function getClassAbilityScoreImprovements(classRule, classLevel, pairIndex) {
		const improvements = [];
		Object.keys((classRule && classRule.features) || {}).forEach(function (levelKey) {
			const level = Number(levelKey);
			if (!Number.isInteger(level) || level > classLevel) {
				return;
			}
			const featuresAtLevel = Array.isArray(classRule.features[levelKey])
				? classRule.features[levelKey]
				: [classRule.features[levelKey]];
			featuresAtLevel.forEach(function (feature) {
				const name = typeof feature === "object" && feature ? feature.name : feature;
				if (typeof name === "string" && /^Ability Score Improvement(?:\s+\(\d+\))?$/i.test(name)) {
					improvements.push({
						key: "class-pair-" + pairIndex + "-asi-" + level,
						level: level,
						name: name,
						chooseFeat: false,
					});
				}
			});
		});
		return improvements.sort(function (first, second) {
			return first.level - second.level;
		});
	}

	function updateFeatRewardSlots(characterLevel, classAsiEntries) {
		const classFeatChoices = classAsiEntries.reduce(function (count, entry) {
			const choice = classAsiChoices[entry.key];
			const isGestaltSinglePoint = isGestaltEnabled()
				&& gestaltSinglePointAsiLevels.indexOf(entry.level) !== -1;
			return count + (choice && choice.chooseFeat && !isGestaltSinglePoint ? 1 : 0);
		}, 0);
		const bankedAsiPoints = isGestaltEnabled()
			? classAsiEntries.reduce(function (count, entry) {
				return count + (classAsiChoices[entry.key] && classAsiChoices[entry.key].bankPoint ? 1 : 0);
			}, 0)
			: 0;
		const gestaltFeatCount = Math.floor(bankedAsiPoints / 2);
		const unlockedFeatSlots = [1];
		const gestaltFeatLabels = [];
		let nextSlot = getFirstCharacterFeatSlot();
		characterFeatRewardLevels.forEach(function (level) {
			if (characterLevel >= level) {
				unlockedFeatSlots.push(nextSlot);
				nextSlot += 1;
			}
		});
		for (let classFeatIndex = 0; classFeatIndex < classFeatChoices; classFeatIndex++) {
			unlockedFeatSlots.push(nextSlot);
			nextSlot += 1;
		}
		for (let bankedFeatIndex = 0; bankedFeatIndex < gestaltFeatCount; bankedFeatIndex++) {
			unlockedFeatSlots.push(nextSlot);
			gestaltFeatLabels.push({ slot: nextSlot, label: "Gestalt ASI feat (2 banked points)" });
			nextSlot += 1;
		}
		gestaltDuplicateFeatures.forEach(function (featureName) {
			unlockedFeatSlots.push(nextSlot);
			gestaltFeatLabels.push({ slot: nextSlot, label: "Replace duplicate " + featureName });
			nextSlot += 1;
		});
		$("#page1 #gestalt-asi-bank-status")
			.text(isGestaltEnabled()
				? "Gestalt ASI points banked toward feats: " + bankedAsiPoints + " (each pair unlocks a feat slot)."
				: "")
			.prop("hidden", !isGestaltEnabled());

		$("#page1 [name^='feat-slot-']").each(function () {
			const slotNumber = Number(this.name.match(/\d+$/)[0]);
			if (slotNumber === 1 || isRacialFeatSlot(slotNumber)) {
				return;
			}
			const unlocked = unlockedFeatSlots.indexOf(slotNumber) !== -1;
			const gestaltFeatLabel = gestaltFeatLabels.find(function (entry) {
				return entry.slot === slotNumber;
			});
			if (!unlocked && magicItemInput === this) {
				closeMagicItemSuggestions();
			}
			$(this)
				.prop("readOnly", !unlocked)
				.toggleClass("locked-feat-slot", !unlocked)
				.attr("placeholder", unlocked ? (gestaltFeatLabel ? gestaltFeatLabel.label : "") : "Unlocks with a feat reward")
				.attr("aria-label", "Feat slot " + slotNumber + (gestaltFeatLabel ? ": " + gestaltFeatLabel.label : unlocked ? "" : " (locked)"));
			if (unlocked) {
				$(this).attr("data-suggestion-list", "feat-options").removeAttr("aria-readonly");
			} else {
				$(this).removeAttr("data-suggestion-list").attr("aria-readonly", "true");
			}
		});
	}

	function getFirstCharacterFeatSlot() {
		return 2 + racialFeatCount + (smallSizeFeatSlot === null ? 0 : 1);
	}

	function isRacialFeatSlot(slotNumber) {
		return (slotNumber >= 2 && slotNumber < racialFeatCount + 2)
			|| slotNumber === smallSizeFeatSlot;
	}

	function renderCharacterLevelRewards(characterLevel) {
		const rewardList = $("#page1 #character-level-reward-list").empty();
		const rewardLevels = characterFeatRewardLevels
			.concat(characterAsiRewardLevels)
			.concat(characterMagicItemRewards.map(function (reward) { return reward.level; }))
			.filter(function (level, index, levels) { return levels.indexOf(level) === index; })
			.sort(function (first, second) { return first - second; });

		rewardLevels.forEach(function (level) {
			const card = $("<div>", {
				class: "character-level-reward" + (characterLevel >= level ? " earned" : " locked"),
			}).appendTo(rewardList);
			$("<strong>", { class: "character-level-reward-heading", text: "Level " + level }).appendTo(card);
			const contents = $("<div>", { class: "character-level-reward-content" }).appendTo(card);

			if (characterFeatRewardLevels.indexOf(level) !== -1) {
				const featSlot = getFirstCharacterFeatSlot() + characterFeatRewardLevels.indexOf(level);
				$("<span>", {
					class: "character-level-reward-item",
					text: "Feat" + (featSlot ? " - Slot " + featSlot : ""),
				}).appendTo(contents);
			}
			if (characterAsiRewardLevels.indexOf(level) !== -1) {
				$("<span>", { class: "character-level-reward-item", text: "Ability Score Improvement" }).appendTo(contents);
				if (characterLevel >= level) {
					const levelKey = String(level);
					const choice = $.extend({}, characterAsiChoices[levelKey] || {}, { key: levelKey });
					createAbilityScoreChoiceControl(choice, {
						allowFeat: false,
						choiceType: "character",
						label: "Character level " + level + " Ability Score Improvement",
					}).appendTo(contents);
				}
			}
			characterMagicItemRewards.forEach(function (reward) {
				if (reward.level === level) {
					const rarity = reward.rarity.split("-").map(function (word) {
						return word.charAt(0).toUpperCase() + word.slice(1);
					}).join(" ");
					$("<span>", {
						class: "character-level-reward-item",
						text: rarity + " Magic Item - " + rarity + " slot " + reward.slot,
					}).appendTo(contents);
				}
			});
		});
	}

	function updateMentorSelectionUi() {
		const mentorEnabled = isMentorEnabled();
		const mentorType = $("#page1 [name='mentor-type']").val();
		const typeSelect = $("#page1 .mentor-type-select");
		typeSelect.prop("hidden", !mentorEnabled).prop("disabled", !mentorEnabled);
		$("#page1 .mentor-progression").prop("hidden", !mentorEnabled || !mentorFeatureRules[mentorType]);
	}

	function renderMentorProgression(characterLevel) {
		updateMentorSelectionUi();
		const mentorType = $("#page1 [name='mentor-type']").val();
		const mentor = isMentorEnabled() ? mentorFeatureRules[mentorType] : null;
		const roleChoice = $("#page1 #mentor-role-choice").empty();
		const progressionList = $("#page1 #mentor-progression-list").empty();
		activeMentorAsiLevels = [];

		if (!mentor) {
			renderMentorSpellcasting(null, mentorType, 0);
			updateExpertInfusionSlots("", 0);
			return;
		}
		renderMentorSpellcasting(mentor, mentorType, characterLevel);
		updateExpertInfusionSlots(mentorType, characterLevel);

		const selectedRole = selectedMentorRole;
		if (mentor.roleOptions) {
			const roleSelect = $("<select>", {
				name: "mentor-role",
				"aria-label": mentorType + " mentor role",
			}).appendTo(roleChoice);
			$("<option>", { value: "", text: "Choose " + mentorType + " role" }).appendTo(roleSelect);
			Object.keys(mentor.roleOptions).forEach(function (role) {
				$("<option>", { value: role, text: role }).appendTo(roleSelect);
			});
			roleSelect.val(Object.prototype.hasOwnProperty.call(mentor.roleOptions, selectedRole) ? selectedRole : "");
			$("<div>", {
				class: "mentor-role-description",
				text: mentor.roleOptions[selectedRole] || "Choose a role to see its features.",
			}).appendTo(roleChoice);
		}

		for (let level = 1; level <= 20; level++) {
			const earned = characterLevel >= level;
			const card = $("<div>", {
				class: "character-level-reward" + (earned ? " earned" : " locked"),
			}).appendTo(progressionList);
			$("<strong>", { class: "character-level-reward-heading", text: "Level " + level }).appendTo(card);
			const contents = $("<div>", { class: "character-level-reward-content" }).appendTo(card);
			$("<span>", {
				class: "character-level-reward-item",
				text: "Proficiency Bonus +" + (2 + Math.floor((level - 1) / 4)),
			}).appendTo(contents);
			(mentor.features[level] || []).forEach(function (feature) {
				const featureItem = $("<span>", {
					class: "character-level-reward-item",
					text: feature,
				}).appendTo(contents);
				if (earned) {
					const mentorUseTracker = createAbilityUseTracker(
						feature,
						"mentor",
						mentorType,
						characterLevel,
						"mentor:" + mentorType
					);
					if (mentorUseTracker.length) {
						featureItem.append(mentorUseTracker);
					}
				}
				if (feature === "Ability Score Improvement" && earned) {
					const levelKey = String(level);
					activeMentorAsiLevels.push(levelKey);
					const choice = $.extend({}, mentorAsiChoices[levelKey] || {}, { key: levelKey });
					createAbilityScoreChoiceControl(choice, {
						allowFeat: false,
						choiceType: "mentor",
						label: mentorType + " level " + level + " Ability Score Improvement",
						singlePoint: isMentorSinglePointLevel(level),
					}).appendTo(contents);
				}
			});

			if (mentorType === "Spellcaster") {
				const progression = mentor.spellProgression[level - 1];
				const slotCounts = progression.slice(2).map(function (count) {
					return count || null;
				});
				const spellLevelNames = ["1st", "2nd", "3rd", "4th", "5th"];
				const slots = slotCounts.map(function (count, index) {
					return count ? spellLevelNames[index] + ": " + count : null;
				}).filter(Boolean);
				$("<span>", {
					class: "character-level-reward-item",
					text: progression[0] + " spells known, " + progression[1] + " cantrips; spell slots: " + (slots.join(", ") || "none"),
				}).appendTo(contents);
			} else if (mentorType === "Expert") {
				$("<span>", {
					class: "character-level-reward-item",
					text: "Sneak Attack: " + (Math.floor((level - 1) / 4) + 1) + "d6",
				}).appendTo(contents);
			}
		}
	}

	function updateMagicItemRewardSlots(characterLevel) {
		characterMagicItemRewards.forEach(function (reward) {
			const name = "magic-" + reward.rarity + "-" + reward.slot;
			const input = $("#page1 [name='" + name + "']");
			if (input.length === 0) {
				return;
			}
			const rarity = reward.rarity.split("-").map(function (word) {
				return word.charAt(0).toUpperCase() + word.slice(1);
			}).join(" ");
			const isUnlocked = characterLevel >= reward.level;
			input
				.prop("readOnly", !isUnlocked)
				.toggleClass("locked-magic-item-slot", !isUnlocked)
				.attr("placeholder", isUnlocked
					? "Level " + reward.level + " reward"
					: "Unlocks at level " + reward.level)
				.attr("aria-label", "Level " + reward.level + " " + rarity + " magic item reward");
			if (isUnlocked) {
				input.attr("data-suggestion-list", "magic-" + reward.rarity + "-options").removeAttr("aria-readonly");
			} else {
				if (magicItemInput === input[0]) {
					closeMagicItemSuggestions();
				}
				input.removeAttr("data-suggestion-list").attr("aria-readonly", "true");
			}
		});
	}

	function createAbilityScoreChoiceControl(choice, options) {
		const control = $("<div>", { class: "asi-choice-control" });
		const singlePoint = !!options.singlePoint;
		let checkboxLabel = $();
		let bankLabel = $();
		if (options.allowFeat) {
			checkboxLabel = $("<label>", { class: "asi-feat-toggle" }).appendTo(control);
			$("<input>", {
				type: "checkbox",
				"data-asi-choice-key": choice.key,
				"data-asi-choice-type": options.choiceType,
				"data-asi-feat-toggle": "true",
			}).prop("checked", !!choice.chooseFeat).appendTo(checkboxLabel);
			$("<span>", { text: "Choose a feat instead" }).appendTo(checkboxLabel);
		}
		if (options.allowBank && singlePoint) {
			bankLabel = $("<label>", { class: "asi-bank-toggle" }).appendTo(control);
			$("<input>", {
				type: "checkbox",
				"data-asi-choice-key": choice.key,
				"data-asi-choice-type": options.choiceType,
				"data-asi-bank-toggle": "true",
			}).prop("checked", !!choice.bankPoint).appendTo(bankLabel);
			$("<span>", { text: "Bank this +1 point" }).appendTo(bankLabel);
		}

		const abilityControls = $("<div>", { class: "asi-ability-controls" }).appendTo(control);
		const modeSelect = $("<select>", {
			"data-asi-choice-key": choice.key,
			"data-asi-choice-type": options.choiceType,
			"data-asi-field": "mode",
			"aria-label": options.label + " increase pattern",
		}).appendTo(abilityControls);
		if (singlePoint) {
			$("<option>", { value: "single", text: "+1 to one ability" }).appendTo(modeSelect);
		} else {
			$("<option>", { value: "two", text: "+2 to one ability" }).appendTo(modeSelect);
			$("<option>", { value: "one-one", text: "+1 to two abilities" }).appendTo(modeSelect);
		}
		modeSelect.val(singlePoint ? "single" : choice.mode === "one-one" ? "one-one" : "two");
		modeSelect.prop("hidden", singlePoint);

		function createAbilitySelect(field, label) {
			const select = $("<select>", {
				"data-asi-choice-key": choice.key,
				"data-asi-choice-type": options.choiceType,
				"data-asi-field": field,
				"aria-label": options.label + " " + label,
			}).appendTo(abilityControls);
			$("<option>", { value: "", text: "Choose ability" }).appendTo(select);
			abilityNames.forEach(function (ability) {
				$("<option>", { value: ability, text: ability }).appendTo(select);
			});
			select.val(abilityNames.indexOf(choice[field]) !== -1 ? choice[field] : "");
			return select;
		}

		const firstSelect = createAbilitySelect("firstAbility", "first ability");
		const secondSelect = createAbilitySelect("secondAbility", "second ability");
		function disableDuplicateSecondAbility() {
			const firstAbility = firstSelect.val();
			secondSelect.find("option").each(function () {
				if (this.value) {
					$(this).prop("disabled", this.value === firstAbility);
				}
			});
			if (secondSelect.val() === firstAbility) {
				secondSelect.val("");
			}
		}
		firstSelect.on("change", disableDuplicateSecondAbility);
		disableDuplicateSecondAbility();
		if (singlePoint || choice.mode !== "one-one") {
			secondSelect.prop("hidden", true);
		}
		const abilityChoiceComplete = singlePoint
			? abilityNames.indexOf(choice.firstAbility) !== -1
			: choice.mode === "one-one"
			? abilityNames.indexOf(choice.firstAbility) !== -1
				&& abilityNames.indexOf(choice.secondAbility) !== -1
				&& choice.firstAbility !== choice.secondAbility
			: abilityNames.indexOf(choice.firstAbility) !== -1;
		const bankPointSelected = !!options.allowBank && !!choice.bankPoint;
		abilityControls.prop("hidden", (!!choice.chooseFeat && !options.allowBank) || bankPointSelected);
		checkboxLabel.prop("hidden", !choice.chooseFeat && abilityChoiceComplete);
		return control;
	}

	function renderAbilityChoiceControls(choices) {
		const activeChoices = {};
		choices.forEach(function (choice) {
			const slot = $("#page1 [name='" + choice.key + "']");
			if (!slot.length) {
				return;
			}
			const wrapper = slot.parent(".ability-choice-slot");
			if (!wrapper.length) {
				console.error("Missing ability-choice wrapper for " + choice.key + ".");
				return;
			}
			wrapper.addClass("ability-choice-input");
			slot.val(getBaseSelectedFeatureName(slot.val()));
			let select = wrapper.children(".feature-ability-choice");
			if (!select.length) {
				select = $("<select>", { class: "feature-ability-choice" }).appendTo(wrapper);
			}
			select
				.attr("data-ability-choice", choice.key)
				.attr("aria-label", choice.label + " - choose ability")
				.prop("hidden", false);
			const currentAbilities = select.find("option").slice(1).map(function () {
				return this.value;
			}).get();
			const abilitiesChanged = currentAbilities.length !== choice.abilities.length
				|| currentAbilities.some(function (ability, index) {
					return ability !== choice.abilities[index];
				});
			if (abilitiesChanged) {
				select.empty();
				$("<option>", { value: "", text: "Choose ability" }).appendTo(select);
				choice.abilities.forEach(function (ability) {
					$("<option>", { value: ability, text: ability }).appendTo(select);
				});
			}
			const selected = selectedAbilityChoices[choice.key];
			select.val(choice.abilities.indexOf(selected) !== -1 ? selected : "");
			activeChoices[choice.key] = true;
		});
		$("#page1 .ability-choice-slot").each(function () {
			const slotName = $(this).children("input").attr("name");
			if (!activeChoices[slotName]) {
				$(this).removeClass("ability-choice-input")
					.children(".feature-ability-choice")
					.prop("hidden", true);
			}
		});
	}

	function initializeAbilityChoiceSlots() {
		$("#page1 .feat-boon-slots input[name^='feat-slot-'], #page1 .feat-boon-slots input[name^='boon-slot-'], #page1 .talent-slot").each(function () {
			if (!$(this).parent().hasClass("ability-choice-slot")) {
				$(this).wrap("<div class='ability-choice-slot'></div>");
			}
		});
		$("#page1 .feat-boon-slots .ability-choice-slot").each(function () {
			$(this).addClass("feature-slot-entry");
			if (!$(this).children(".feature-description").length) {
				$("<div>", { class: "feature-description", hidden: true }).appendTo(this);
			}
		});
		$("#page1 .talent-slot").each(function () {
			const slot = $(this);
			if (slot.closest(".talent-entry").length) {
				return;
			}
			const entry = $("<div>", { class: "talent-entry" });
			slot.parent().before(entry);
			slot.parent().appendTo(entry);
			$("<div>", {
				class: "talent-description",
				hidden: true,
				"aria-live": "polite",
			}).appendTo(entry);
		});
	}

	function getSelectedFeatBoonTalentEffects() {
		const effects = createEmptyEffects();
		const featChoices = [];
		const talentChoices = [];
		const featBoonDescriptions = {};
		const talentDescriptions = {};
		const talentFightingStyles = {};

		function addSelection(selectionName, slotName, ruleSet, choices, descriptions) {
			const featureName = getBaseSelectedFeatureName(selectionName.trim());
			const normalizedName = featureName.toLowerCase();
			let rule = ruleSet[normalizedName];
			if (!selectionName) {
				return;
			}
			if (!rule && ruleSet !== selectedFeatureEffectRules.talents) {
				return;
			}
			rule = rule || {};
			mergeEffects(effects, rule.effects || {});
			let descriptionLines = (rule.notes || []).slice();
			const ruleEffects = rule.effects || {};
			const effectLabels = [
				["attackBonus", "Attack rolls"],
				["armorBonus", "Armor Class"],
				["initiativeBonus", "Initiative"],
				["allSavingThrowBonus", "All saving throws"],
				["meleeAttackBonus", "Melee attack rolls"],
				["rangedAttackBonus", "Ranged attack rolls"],
				["spellAttackBonus", "Spell attack rolls"],
				["spellSaveBonus", "Spell save DC"],
				["physicalDamageBonus", "Physical damage"],
				["spellDamageBonus", "Spell damage"],
				["passivePerceptionBonus", "Passive Perception"],
				["passiveInvestigationBonus", "Passive Investigation"],
				["concentrationBonus", "Concentration checks"],
			];
			effectLabels.forEach(function (entry) {
				if (ruleEffects[entry[0]]) {
					descriptionLines.push(entry[1] + " +" + ruleEffects[entry[0]] + ".");
				}
			});
			[
				["halfProficiencyToSaves", "Add half your proficiency bonus, rounded up, to all saving throws."],
				["halfProficiencyToArmor", "Add half your proficiency bonus, rounded up, to AC."],
				["initiativeProficiencyBonus", "Add your proficiency bonus to initiative."],
				["halfProficiencyToPhysicalDamage", "Add half your proficiency bonus, rounded up, to physical damage."],
				["halfProficiencyToSpellDamage", "Add half your proficiency bonus, rounded up, to spell damage."],
				["mediumArmorMaster", "Medium armor does not impose disadvantage on Stealth checks."],
				["armorBonusWhileArmored", "Gain +" + (ruleEffects.armorBonusWhileArmored || 0) + " AC while armored."],
				["armorBonusWhileUnarmored", "Gain +" + (ruleEffects.armorBonusWhileUnarmored || 0) + " AC while unarmored."],
			].forEach(function (entry) {
				if (ruleEffects[entry[0]]) {
					descriptionLines.push(entry[1]);
				}
			});
			[
				["physicalDamageReduction", "Reduce physical damage taken by "],
				["magicalDamageReduction", "Reduce magical damage taken by "],
				["maxHpBonus", "Hit point maximum +"],
			].forEach(function (entry) {
				if (ruleEffects[entry[0]]) {
					descriptionLines.push(entry[1] + ruleEffects[entry[0]] + ".");
				}
			});
			if (ruleEffects.maxHpPerLevel) {
				descriptionLines.push("Hit point maximum +" + ruleEffects.maxHpPerLevel + " per character level.");
			}
			(ruleEffects.saveAdvantages || []).forEach(function (advantage) {
				descriptionLines.push(advantage + ".");
			});
			(ruleEffects.speedBonuses || []).forEach(function (bonus) {
				descriptionLines.push("Speed bonus: +" + bonus.value + " feet.");
			});
			(ruleEffects.damageResistances || []).forEach(function (resistance) {
				descriptionLines.push("Resistance to " + resistance + " damage.");
			});
			(ruleEffects.damageImmunities || []).forEach(function (immunity) {
				descriptionLines.push("Immunity to " + immunity + " damage.");
			});
			(ruleEffects.conditionImmunities || []).forEach(function (condition) {
				descriptionLines.push("Immunity to the " + condition.toLowerCase() + " condition.");
			});
			if (ruleEffects.flySpeed) {
				descriptionLines.push("Flying speed: " + ruleEffects.flySpeed + " feet.");
			}
			if (ruleEffects.armor && ruleEffects.armor.base) {
				descriptionLines.push("Natural Armor: AC " + ruleEffects.armor.base + " + Dexterity modifier.");
			}
			if (ruleSet === selectedFeatureEffectRules.talents) {
				if (!talentDescriptionByName[normalizedName]) {
					console.error("Missing description for talent: " + featureName + ".");
				}
				descriptionLines = talentDescriptionByName[normalizedName]
					? [talentDescriptionByName[normalizedName]]
					: [];
			}
			if (descriptions && descriptionLines.length) {
				descriptions[slotName] = descriptionLines;
			}
			if (rule.notes) {
				effects.specialNotes = effects.specialNotes.concat(rule.notes);
			}
			if (rule.fightingStyleSource && descriptions === talentDescriptions) {
				talentFightingStyles[slotName] = rule.fightingStyleSource;
			}
			if (rule.abilityChoices) {
				choices.push({
					key: slotName,
					label: featureName + " (" + slotName.slice(-2) + ")",
					abilities: rule.abilityChoices,
				});
				const selectedAbility = selectedAbilityChoices[slotName];
				if (rule.abilityChoices.indexOf(selectedAbility) !== -1) {
					if (rule.choiceEffect === "savingThrows") {
						effects.savingThrows.push(selectedAbility);
						effects.abilityScoreBonuses[selectedAbility] = (effects.abilityScoreBonuses[selectedAbility] || 0) + 1;
					} else if (rule.choiceEffect === "initiativeBonusAbilities") {
						effects.initiativeBonusAbilities.push(selectedAbility);
					} else if (rule.choiceEffect === "expertiseSavingThrows") {
						effects.expertiseSavingThrows.push(selectedAbility);
						effects.savingThrows.push(selectedAbility);
					} else {
						effects.abilityScoreBonuses[selectedAbility] = (effects.abilityScoreBonuses[selectedAbility] || 0) + 1;
						if (rule.increaseMaximum) {
							effects.abilityScoreMaximumBonuses[selectedAbility] = (effects.abilityScoreMaximumBonuses[selectedAbility] || 0) + 2;
						}
					}
				}
			}
		}

		$("#page1 [name^='feat-slot-']").each(function () {
			if ($(this).prop("readOnly")) {
				return;
			}
			addSelection($(this).val(), this.name, selectedFeatureEffectRules.feats, featChoices, featBoonDescriptions);
		});
		$("#page1 [name^='boon-slot-']").each(function () {
			addSelection($(this).val(), this.name, selectedFeatureEffectRules.boons, featChoices, featBoonDescriptions);
		});
		$("#page1 .talent-slot").each(function () {
			addSelection($(this).val(), this.name, selectedFeatureEffectRules.talents, talentChoices, talentDescriptions);
		});

		renderFeatBoonDescriptions(featBoonDescriptions);
		renderTalentDescriptions(talentDescriptions, talentFightingStyles);
		mergeEffects(effects, getAbilityImprovementEffects());
		renderAbilityChoiceControls(featChoices.concat(talentChoices));
		const totalLevels = getTotalClassLevels();
		if (effects.maxHpPerLevel) {
			effects.maxHpBonus = (effects.maxHpBonus || 0) + effects.maxHpPerLevel * totalLevels;
		}
		[
			["attackBonus", "Attack rolls"],
			["armorBonus", "Armor Class"],
			["initiativeBonus", "Initiative"],
			["allSavingThrowBonus", "All saving throws"],
			["meleeAttackBonus", "Melee attack rolls"],
			["rangedAttackBonus", "Ranged attack rolls"],
			["spellAttackBonus", "Spell attack rolls"],
			["spellSaveBonus", "Spell save DC"],
			["physicalDamageBonus", "Physical damage"],
			["spellDamageBonus", "Spell damage"],
			["passivePerceptionBonus", "Passive Perception"],
			["passiveInvestigationBonus", "Passive Investigation"],
			["concentrationBonus", "Concentration checks"],
		].forEach(function (entry) {
			if (effects[entry[0]]) {
				effects.specialNotes.push(entry[1] + " +" + effects[entry[0]] + ".");
			}
		});
		if (effects.halfProficiencyToSaves) {
			effects.specialNotes.push("Add half your proficiency bonus, rounded up, to all saving throws.");
		}
		if (effects.halfProficiencyToArmor) {
			effects.specialNotes.push("Add half your proficiency bonus, rounded up, to AC.");
		}
		if (effects.initiativeProficiencyBonus) {
			effects.specialNotes.push("Add your proficiency bonus to initiative.");
		}
		if (effects.halfProficiencyToPhysicalDamage) {
			effects.specialNotes.push("Add half your proficiency bonus, rounded up, to physical damage.");
		}
		if (effects.halfProficiencyToSpellDamage) {
			effects.specialNotes.push("Add half your proficiency bonus, rounded up, to spell damage.");
		}
		if (effects.physicalDamageReduction) {
			effects.specialNotes.push("Reduce physical damage taken by " + effects.physicalDamageReduction + ".");
		}
		if (effects.magicalDamageReduction) {
			effects.specialNotes.push("Reduce magical damage taken by " + effects.magicalDamageReduction + ".");
		}
		(effects.saveAdvantages || []).forEach(function (advantage) {
			effects.specialNotes.push(advantage + ".");
		});
		(effects.speedBonuses || []).forEach(function (bonus) {
			effects.specialNotes.push("Speed bonus: +" + bonus.value + " feet.");
		});
		if (effects.maxHpBonus) {
			effects.specialNotes.push("Hit point maximum +" + effects.maxHpBonus + ".");
		}
		effects.specialNotes = effects.specialNotes.filter(function (note, index, notes) {
			return notes.indexOf(note) === index;
		});
		return effects;
	}

	function getMentorCombatEffects() {
		const effects = createEmptyEffects();
		if (!isMentorEnabled() || $("#page1 [name='mentor-type']").val() !== "Warrior") {
			return effects;
		}

		const mentorLevel = getTotalClassLevels();
		const mentorRole = selectedMentorRole;
		if (mentorRole === "Attacker") {
			effects.attackBonus = 2;
			effects.specialNotes.push("Warrior Attacker: +2 to all attack rolls.");
		} else if (mentorRole === "Defender") {
			effects.specialNotes.push("Warrior Defender: use your reaction to impose disadvantage on an attack against a creature within 5 feet of you (not you), if you can see the attacker.");
		}
		if (mentorLevel >= 10) {
			effects.armorBonus = 1;
			effects.specialNotes.push("Warrior Improved Defense: +1 AC.");
		}
		return effects;
	}

	function updateCharacterEffects(effects) {
		updateRageControls();
		raceEffects = effects;
		const combinedEffects = createEmptyEffects();
		mergeEffects(combinedEffects, effects);
		mergeEffects(combinedEffects, getClassModifierEffects());
		mergeEffects(combinedEffects, getSelectedFeatBoonTalentEffects());
		mergeEffects(combinedEffects, getMentorCombatEffects());
		const skillChoiceDefinitions = getSkillChoiceDefinitions();
		const skillChoiceEffects = getSkillChoiceEffects(skillChoiceDefinitions, combinedEffects.skills);
		mergeEffects(combinedEffects, {
			skills: skillChoiceEffects.skills,
			expertiseSkills: skillChoiceEffects.expertiseSkills,
		});
		Object.keys(combinedEffects).forEach(function (effectName) {
			if (Array.isArray(combinedEffects[effectName]) && effectName !== "speedBonuses") {
				combinedEffects[effectName] = combinedEffects[effectName].filter(function (value, index, values) {
					const comparable = typeof value === "object" ? JSON.stringify(value) : value;
					return values.findIndex(function (otherValue) {
						return (typeof otherValue === "object" ? JSON.stringify(otherValue) : otherValue) === comparable;
					}) === index;
				});
			}
		});
		characterEffects = combinedEffects;
		renderSkillChoiceControls(skillChoiceDefinitions, skillChoiceEffects.proficientSkills);
		const mentorCombatBonuses = [];
		if (isMentorEnabled()
			&& $("#page1 [name='mentor-type']").val() === "Warrior"
			&& selectedMentorRole === "Attacker") {
			mentorCombatBonuses.push("Warrior Attacker: +2 to all attack rolls");
		}
		if (isMentorEnabled()
			&& $("#page1 [name='mentor-type']").val() === "Warrior"
			&& getTotalClassLevels() >= 10) {
			mentorCombatBonuses.push("Warrior Improved Defense: +1 AC");
		}
		$("#page1 .mentor-combat-bonus")
			.text(mentorCombatBonuses.join(" | "))
			.prop("hidden", mentorCombatBonuses.length === 0);
		updateDisplayedAbilityScores();
		const beastAttackWarning = updateBeastRageAttack();
		if (beastAttackWarning) {
			characterEffects.rageEffects.push(beastAttackWarning);
		}
		updateCalculatedAttackBonuses();

		const racialSkills = characterEffects.skills || [];
		$("#page1 .skills input[type='checkbox']").each(function () {
			const checkbox = $(this);
			let manualProficiency = checkbox.data("manualRacialProficiency");
			if (manualProficiency === undefined) {
				manualProficiency = this.checked;
				checkbox.data("manualRacialProficiency", manualProficiency);
			}

			const skillName = this.name.replace(/-prof$/, "");
			checkbox.prop("checked", manualProficiency || racialSkills.indexOf(skillName) !== -1);
		});

		const choiceNotes = (characterEffects.choiceNotes || []).slice();
		["swimSpeed", "climbSpeed", "flySpeed"].forEach(function (speedType) {
			if (Number.isFinite(characterEffects[speedType])) {
				const label = speedType.replace("Speed", " speed").replace(/^./, function (letter) {
					return letter.toUpperCase();
				});
				choiceNotes.push(label + ": " + characterEffects[speedType] + " ft.");
			}
		});
		const proficiencyCategories = [
			{ label: "Languages", entries: characterEffects.languages || [] },
			{ label: "Armor", entries: characterEffects.armorProficiencies || [] },
			{ label: "Weapons", entries: characterEffects.weaponProficiencies || [] },
			{ label: "Tools", entries: characterEffects.toolProficiencies || [] },
		];
		const proficiencySections = proficiencyCategories.map(function (section) {
			return section.label + ": " + (section.entries.length > 0 ? section.entries.join(", ") : "None");
		});
		const selectedSkillChoices = [];
		[
			{ type: "proficiency", label: "Skill proficiencies" },
			{ type: "expertise", label: "Skill Expertise" },
		].forEach(function (choiceType) {
			skillChoiceDefinitions[choiceType.type].forEach(function (definition) {
				const choices = getValidSkillChoiceValues(definition).filter(Boolean);
				if (choices.length > 0) {
					selectedSkillChoices.push(definition.label + ": " + choices.join(", "));
				}
			});
		});
		if (selectedSkillChoices.length > 0) {
			proficiencySections.push("Skill choices: " + selectedSkillChoices.join("; "));
		}
		if (choiceNotes.length > 0) {
			proficiencySections.push("Other: " + choiceNotes.join(", "));
		}
		const $proficiencies = $("#page1 [name='otherprofs']");
		let existingText = $proficiencies.val() || "";
		const previousGenerated = localStorage.getItem("page1_generatedProficiencies")
			|| localStorage.getItem("page1_racialProficiencies")
			|| "";
		while (previousGenerated && existingText.indexOf(previousGenerated) === 0) {
			existingText = existingText.slice(previousGenerated.length).replace(/^(?:\r?\n)+/, "");
		}
		const generatedText = proficiencySections.join("\n");
		$proficiencies.val(generatedText + (existingText ? "\n\n" + existingText : ""));
		localStorage.setItem("page1_generatedProficiencies", generatedText);
		localStorage.removeItem("page1_racialProficiencies");
		$proficiencies.trigger("change");

		const saveAdvantages = characterEffects.saveAdvantages || [];
		const conditionNames = [
			"Blinded", "Charmed", "Deafened", "Exhaustion", "Frightened", "Grappled",
			"Incapacitated", "Invisible", "Paralyzed", "Petrified", "Poisoned", "Prone",
			"Restrained", "Stunned", "Unconscious",
		];
		let conditionAdvantages = (characterEffects.conditionAdvantages || []).slice();
		saveAdvantages.forEach(function (advantage) {
			const normalizedAdvantage = advantage.toLowerCase();
			if (normalizedAdvantage.indexOf("against being") === -1 && normalizedAdvantage.indexOf("against poison") === -1) {
				return;
			}
			conditionNames.forEach(function (condition) {
				if (new RegExp("\\b" + condition.toLowerCase() + "\\b").test(normalizedAdvantage)) {
					conditionAdvantages.push(condition);
				}
			});
			if (normalizedAdvantage.indexOf("against poison") !== -1) {
				conditionAdvantages.push("Poisoned");
			}
		});
		conditionAdvantages = conditionAdvantages.filter(function (condition, index, conditions) {
			return conditions.indexOf(condition) === index;
		});
		$("#page1 .saves")
			.attr("data-racial-save-advantages", JSON.stringify(raceEffects.saveAdvantages || []))
			.attr("data-character-save-advantages", JSON.stringify(saveAdvantages))
			.attr("title", saveAdvantages.join("; "));
		$("#page1")
			.attr("data-racial-damage-resistances", JSON.stringify(raceEffects.damageResistances || []))
			.attr("data-racial-damage-immunities", JSON.stringify(raceEffects.damageImmunities || []))
			.attr("data-racial-check-bonuses", JSON.stringify(raceEffects.checkBonuses || []))
			.attr("data-character-damage-resistances", JSON.stringify(characterEffects.damageResistances || []))
			.attr("data-character-damage-resistance-notes", JSON.stringify(characterEffects.damageResistanceNotes || []))
			.attr("data-character-damage-immunities", JSON.stringify(characterEffects.damageImmunities || []))
			.attr("data-character-condition-immunities", JSON.stringify(characterEffects.conditionImmunities || []))
			.attr("data-character-condition-advantages", JSON.stringify(conditionAdvantages))
			.attr("data-character-check-bonuses", JSON.stringify(characterEffects.checkBonuses || []))
			.attr("data-character-attack-bonus", characterEffects.attackBonus || 0)
			.attr("data-character-melee-attack-bonus", characterEffects.meleeAttackBonus || 0)
			.attr("data-character-ranged-attack-bonus", characterEffects.rangedAttackBonus || 0)
			.attr("data-character-spell-attack-bonus", characterEffects.spellAttackBonus || 0)
			.attr("data-character-spell-save-bonus", characterEffects.spellSaveBonus || 0)
			.attr("data-character-physical-damage-bonus", characterEffects.physicalDamageBonus || 0)
			.attr("data-character-spell-damage-bonus", characterEffects.spellDamageBonus || 0)
			.attr("data-character-physical-damage-reduction", characterEffects.physicalDamageReduction || 0)
			.attr("data-character-magical-damage-reduction", characterEffects.magicalDamageReduction || 0)
			.attr("data-character-half-proficiency-to-saves", !!characterEffects.halfProficiencyToSaves)
			.attr("data-character-half-proficiency-to-armor", !!characterEffects.halfProficiencyToArmor)
			.attr("data-character-half-proficiency-to-physical-damage", !!characterEffects.halfProficiencyToPhysicalDamage)
			.attr("data-character-half-proficiency-to-spell-damage", !!characterEffects.halfProficiencyToSpellDamage)
			.attr("data-character-passive-investigation-bonus", characterEffects.passiveInvestigationBonus || 0);
		$("#page1").attr("data-character-concentration-bonus", characterEffects.concentrationBonus || 0);

		$("#page1 .damage-resistance-value").text((characterEffects.damageResistances || []).join(", ") || "None");
		$("#page1 .damage-immunity-value").text((characterEffects.damageImmunities || []).join(", ") || "None");
		$("#page1 .condition-immunity-value").text((characterEffects.conditionImmunities || []).join(", ") || "None");
		$("#page1 .condition-advantage-value").text(conditionAdvantages.join(", ") || "None");
		$("#page1").attr("data-character-rage-damage-bonus", rageActive ? (getBarbarianContext().level >= 16 ? 4 : getBarbarianContext().level >= 9 ? 3 : 2) : 0);

		updateClassSavingThrows();
		updateDisplayedMaxHp();
		updateArmorCalculations();
		updateInitiative();
		updateSkills();
	}

	function updateFeatures() {
		const raceRule = getSelectedRaceRule();
		const raceFeatures = raceRule.features;
		const classFeatures = {};
		const classAsiEntriesByClass = {};
		let classAsiEntries = [];
		const subclassFeatures = {};
		const gestaltFeatureGroups = [];
		const subclassChoiceDetails = {};
		const subclassChoiceControls = {
			"Path of the Totem Warrior|Totem Spirit": ".totem-rage-choice",
			"Path of the Totem Warrior|Aspect of the Beast": ".aspect-beast-choice",
			"Path of the Totem Warrior|Totemic Attunement": ".totemic-attunement-choice",
			"Path of the Storm Herald|Storm Aura": ".storm-rage-choice",
			"Path of the Zealot|Divine Fury": ".zealot-rage-choice",
			"Path of the Giant|Elemental Cleaver": ".giant-rage-choice",
		};
		raceRule.effects.abilityScoreBonuses = getRacialAbilityScoreBonuses();

		$("#page1 .class-pair").each(function (pairIndex) {
			const className = $(this).find(".class-name-input").val().trim();
			const levelValue = $(this).find(".class-level-input").val().trim();
			const level = Number(levelValue);

			if (!className || !Number.isInteger(level) || level < 1 || level > 20) {
				return;
			}

			const classRule = classRules[className];

			if (!classRule) {
				return;
			}

			// Class features
			classFeatures[className] = getFeaturesUpToLevel(
				classRule.features,
				level
			);
			gestaltFeatureGroups.push({ source: "class:" + className, features: classFeatures[className] });
			const classImprovements = getClassAbilityScoreImprovements(classRule, level, pairIndex);
			if (classImprovements.length) {
				classAsiEntriesByClass[className] = (classAsiEntriesByClass[className] || [])
					.concat(classImprovements);
				classAsiEntries = classAsiEntries.concat(classImprovements);
			}

			// Subclass features
			const subclassName = $(this).find(".subclass-name-input").val().trim();
			const subclassRule = subclassRules[subclassName];
			const subclassLevel = subclassLevels[className];

			if (subclassRule && Number.isInteger(subclassLevel) && level >= subclassLevel) {
				subclassFeatures[subclassName] = getFeaturesUpToLevel(
					subclassRule.features,
					level
				);
				gestaltFeatureGroups.push({ source: "subclass:" + subclassName, features: subclassFeatures[subclassName] });
			}
		});

		const characterLevel = getTotalClassLevels();
		gestaltDuplicateFeatures = isGestaltEnabled()
			? removeGestaltDuplicateFeatures(gestaltFeatureGroups)
			: [];
		syncTalentTreeLevel();
		updateAttunementSlots();
		activeClassAsiKeys = classAsiEntries.map(function (entry) { return entry.key; });
		activeSinglePointAsiKeys = {};
		classAsiEntries.forEach(function (entry) {
			if (isSinglePointClassAsi(entry.level)) {
				activeSinglePointAsiKeys[entry.key] = true;
			}
		});
		activeCharacterAsiLevels = characterAsiRewardLevels
			.filter(function (level) { return characterLevel >= level; })
			.map(String);
		updateFeatRewardSlots(characterLevel, classAsiEntries);
		updateMagicItemRewardSlots(characterLevel);
		renderCharacterLevelRewards(characterLevel);
		renderMentorProgression(characterLevel);
		updateCharacterEffects(raceRule.effects);
		renderSpellcasting();

		// Apply feature replacements
		Object.keys(classFeatures).forEach(function (className) {
			classFeatures[className] = removeReplacedFeatures(
				classFeatures[className]
			);
		});
		Object.keys(subclassFeatures).forEach(function (subclassName) {
			subclassFeatures[subclassName] = removeReplacedFeatures(
				subclassFeatures[subclassName]
			);
		});

		const totemContext = getBarbarianContext();
		if (totemContext && totemContext.subclass === "Path of the Totem Warrior") {
			const totemDescriptions = {
				spirit: {
					bear: "Totem Spirit (Bear): while raging, you have resistance to all damage except psychic.",
					eagle: "Totem Spirit (Eagle): while raging, you can Dash as a bonus action, and opportunity attacks against you have disadvantage.",
					elk: "Totem Spirit (Elk): while raging and not wearing heavy armor, you and nearby allies gain 15 feet of walking speed.",
					tiger: "Totem Spirit (Tiger): gain proficiency in two skills chosen from Athletics, Acrobatics, Stealth, Sleight of Hand, and Survival.",
					wolf: "Totem Spirit (Wolf): while raging, nearby allies have advantage on melee attacks against hostile creatures within 5 feet of you.",
				},
				aspect: {
					bear: "Aspect of the Beast (Bear): double your carrying capacity and gain advantage on Strength checks to push, pull, lift, or break objects.",
					eagle: "Aspect of the Beast (Eagle): see up to 1 mile away without difficulty, discern fine details, and ignore dim-light penalties on Wisdom (Perception) checks.",
					elk: "Aspect of the Beast (Elk): double your travel pace, whether mounted or on foot.",
					tiger: "Aspect of the Beast (Tiger): gain proficiency in two skills chosen from Athletics, Acrobatics, Stealth, Sleight of Hand, and Survival.",
					wolf: "Aspect of the Beast (Wolf): track creatures at a fast pace and move stealthily while traveling at a normal pace.",
				},
				attunement: {
					bear: "Totemic Attunement (Bear): while raging, hostile creatures within 5 feet have disadvantage on attacks against targets other than you or another Bear totem barbarian.",
					eagle: "Totemic Attunement (Eagle): while raging, you gain a flying speed equal to your walking speed; you fall if you end your turn aloft.",
					elk: "Totemic Attunement (Elk): while raging, use a bonus action to move through a Large or smaller creature's space; it must make a Strength save or be knocked prone and take bludgeoning damage.",
					tiger: "Totemic Attunement (Tiger): while raging, use a bonus action to move up to your speed in a straight line; after moving at least 20 feet, make a melee weapon attack as part of the bonus action.",
					wolf: "Totemic Attunement (Wolf): while raging, use a bonus action after hitting a Large or smaller creature with a melee weapon attack to knock it prone on a failed Strength save.",
				},
			};
			[
				{ name: "rage-totem-spirit", level: 3, feature: "spirit" },
				{ name: "rage-aspect-beast", level: 6, feature: "aspect" },
				{ name: "rage-totemic-attunement", level: 14, feature: "attunement" },
			].forEach(function (choice) {
				const selectedTotem = $("#page1 [name='" + choice.name + "']").val();
				const description = totemDescriptions[choice.feature][selectedTotem];
				const featureName = {
					spirit: "Totem Spirit",
					aspect: "Aspect of the Beast",
					attunement: "Totemic Attunement",
				}[choice.feature];
				if (totemContext.level >= choice.level && description && subclassFeatures["Path of the Totem Warrior"]) {
					subclassChoiceDetails["Path of the Totem Warrior|" + featureName] = description;
				}
			});
		}

		const output = [];

		output.push("Race Features:");
		output.push("");

		raceFeatures.forEach(function (feature) {
			output.push(feature);
		});

		output.push("");
		output.push("Class Features:");
		output.push("");

		Object.keys(classFeatures).forEach(function (className) {
			output.push(className + ":");

			classFeatures[className].forEach(function (feature) {
				if (typeof feature === "object") {
					output.push(feature.name);
				} else {
					output.push(feature);
				}
			});

			output.push("");
		});

		output.push("Subclass Features:");
		output.push("");

		Object.keys(subclassFeatures).forEach(function (subclassName) {
			output.push(subclassName + ":");

			subclassFeatures[subclassName].forEach(function (feature) {
				const featureName = typeof feature === "object" ? feature.name : feature;
				output.push(featureName);
				const featureKey = subclassName + "|" + featureName;
				if (subclassChoiceDetails[featureKey]) {
					output.push(subclassChoiceDetails[featureKey]);
				}
				if (subclassName === "Path of the Beast" && featureName === "Form of the Beast" && beastRageFeature) {
					output.push(beastRageFeature);
				}
			});

			output.push("");
		});

		const activeFeatureEffects = (characterEffects.rageEffects || [])
			.concat(characterEffects.damageResistanceNotes || []);
		if (activeFeatureEffects.length > 0) {
			output.push("Rage & Conditional Subclass Effects:");
			output.push("");
			activeFeatureEffects.forEach(function (feature) {
				output.push(feature);
			});
		}
		const serializedFeatures = output.join("\n").trim();
		const choiceControls = {};
		Object.keys(subclassChoiceControls).forEach(function (featureKey) {
			choiceControls[featureKey] = $(subclassChoiceControls[featureKey]).detach();
		});
		const renderedFeatures = $("#page1 .features-rendered").empty();
		let currentSection = "";
		let currentSubclass = "";
		let currentClass = "";
		let lastEntry = null;
		const renderedClassAsiControls = {};
		const classAsiControlsByClass = {};
		Object.keys(classAsiEntriesByClass).forEach(function (className) {
			classAsiControlsByClass[className] = $("<div>", { class: "feature-asi-choices" });
			classAsiEntriesByClass[className].forEach(function (asiEntry) {
				const savedChoice = classAsiChoices[asiEntry.key] || {};
				const choice = $.extend({}, savedChoice, { key: asiEntry.key });
				const row = $("<div>", { class: "feature-asi-choice" });
				$("<span>", { class: "feature-asi-level", text: "Level " + asiEntry.level }).appendTo(row);
				createAbilityScoreChoiceControl(choice, {
					allowFeat: !(isGestaltEnabled() && gestaltSinglePointAsiLevels.indexOf(asiEntry.level) !== -1),
					allowBank: isGestaltEnabled() && gestaltSinglePointAsiLevels.indexOf(asiEntry.level) !== -1,
					choiceType: "class",
					label: "Class level " + asiEntry.level + " Ability Score Improvement",
					singlePoint: isSinglePointClassAsi(asiEntry.level),
				}).appendTo(row);
				row.appendTo(classAsiControlsByClass[className]);
			});
		});
		const detailLines = Object.keys(subclassChoiceDetails).map(function (key) {
			return subclassChoiceDetails[key];
		});
		if (beastRageFeature) {
			detailLines.push(beastRageFeature);
		}
		serializedFeatures.split("\n").forEach(function (line) {
			if (!line) {
				$("<div>", { class: "feature-output-spacer", "aria-hidden": "true" })
					.appendTo(renderedFeatures);
				lastEntry = null;
				return;
			}

			if (line === "Race Features:" || line === "Class Features:" || line === "Subclass Features:" || line === "Rage & Conditional Subclass Effects:") {
				currentSection = line;
				currentSubclass = "";
				currentClass = "";
				$("<div>", { class: "feature-output-heading", text: line })
					.appendTo(renderedFeatures);
				lastEntry = null;
				return;
			}

			if (currentSection === "Class Features:" && line.charAt(line.length - 1) === ":") {
				currentClass = line.slice(0, -1);
				$("<div>", { class: "feature-output-subheading", text: line })
					.appendTo(renderedFeatures);
				lastEntry = null;
				return;
			}

			if (currentSection === "Subclass Features:" && line.charAt(line.length - 1) === ":") {
				currentSubclass = line.slice(0, -1);
				$("<div>", { class: "feature-output-subheading", text: line })
					.appendTo(renderedFeatures);
				lastEntry = null;
				return;
			}

			if (currentSection === "Subclass Features:" && detailLines.indexOf(line) !== -1 && lastEntry) {
				$("<div>", { class: "feature-output-detail", text: line }).appendTo(lastEntry);
				return;
			}

			const entry = $("<div>", { class: "feature-output-entry" }).appendTo(renderedFeatures);
			const titleRow = $("<div>", { class: "feature-output-title-row" }).appendTo(entry);
			$("<div>", { class: "feature-output-name", text: line }).appendTo(titleRow);
			let trackerClassName = currentClass;
			let trackerLevel = currentClass
				? getClassLevelForUseTracker(currentClass)
				: 0;
			let trackerIdentity = "";
			if (currentSection === "Race Features:") {
				trackerIdentity = "race:" + ($("#page1 [name='race']").val() || "selected-race");
			} else if (currentSection === "Class Features:") {
				trackerIdentity = "class:" + currentClass;
			} else if (currentSection === "Subclass Features:") {
				trackerClassName = getClassNameForUseTracker(currentSubclass);
				trackerLevel = getClassLevelForUseTracker(trackerClassName, currentSubclass);
				trackerIdentity = "subclass:" + currentSubclass;
			}
			const abilityUseTracker = createAbilityUseTracker(
				line,
				currentSection === "Race Features:" ? "race" : "class",
				trackerClassName,
				trackerLevel,
				trackerIdentity
			);
			if (abilityUseTracker.length) {
				titleRow.append(abilityUseTracker);
			}
			let fightingStyleSource = null;
			let fightingStyleKey = "";
			if (currentSection === "Class Features:" && line === "Fighting Style") {
				fightingStyleSource = {
					Fighter: "fighter",
					Paladin: "paladin",
					Ranger: "ranger",
				}[currentClass] || null;
				fightingStyleKey = "class:" + currentClass + ":fighting-style";
			} else if (currentSection === "Subclass Features:" && currentSubclass === "College of Swords" && line === "Fighting Style") {
				fightingStyleSource = "swords";
				fightingStyleKey = "subclass:" + currentSubclass + ":fighting-style";
			} else if (currentSection === "Subclass Features:" && currentSubclass === "Champion" && line === "Additional Fighting Style") {
				fightingStyleSource = "fighter";
				fightingStyleKey = "subclass:" + currentSubclass + ":additional-fighting-style";
			}
			if (fightingStyleSource) {
				createFightingStyleControl(fightingStyleKey, fightingStyleSource).appendTo(entry);
			}
			if (currentSection === "Class Features:"
				&& /^Ability Score Improvement(?:\s+\(\d+\))?$/i.test(line)
				&& classAsiControlsByClass[currentClass]
				&& !renderedClassAsiControls[currentClass]) {
				classAsiControlsByClass[currentClass].appendTo(entry);
				renderedClassAsiControls[currentClass] = true;
			}
			const featureKey = currentSubclass + "|" + line;
			if (currentSection === "Subclass Features:" && choiceControls[featureKey] && choiceControls[featureKey].length) {
				choiceControls[featureKey].appendTo(entry);
				delete choiceControls[featureKey];
			}
			const choiceScope = currentSection === "Race Features:"
				? "race"
				: currentSection === "Class Features:"
					? "class"
					: currentSection === "Subclass Features:"
						? "subclass"
						: "";
			if (choiceScope) {
				renderFeatureChoiceControls({
					scope: choiceScope,
					owner: choiceScope === "race"
						? $("#page1 [name='race']").val().trim()
						: choiceScope === "class"
							? currentClass
							: currentSubclass,
					level: trackerLevel,
				}, line, entry);
			}
			lastEntry = entry;
		});

		Object.keys(choiceControls).forEach(function (featureKey) {
			choiceControls[featureKey].appendTo("#page1 .rage-feature-choices");
		});
		$("#page1 [name='features']").val(serializedFeatures);
	}

	const backgroundFeatRules = {
		"astral drifter": { feat: "Magic Initiate (Cleric)" },
		"giant foundling": { feat: "Strike of the Giants" },
		"knight of solamnia": { feat: "Squire of Solamnia" },
		"squire of solamnia": { feat: "Squire of Solamnia" },
		wildspacer: { feat: "Tough" },
		"mage of high sorcery": { feat: "Initiate of High Sorcery" },
		"rune carver": { feat: "Rune Shaper" },
		custom: { list: "feat-options" },
		"silverquill student": { feat: "Strixhaven Initiate: Silverquill" },
		"witherbloom student": { feat: "Strixhaven Initiate: Witherbloom" },
		"quandrix student": { feat: "Strixhaven Initiate: Quandrix" },
		"prismari student": { feat: "Strixhaven Initiate: Prismari" },
		"lorehold student": { feat: "Strixhaven Initiate: Lorehold" },
		"gate warden": { feat: "Scion of the Outer Planes" },
		"planar philosopher": { feat: "Scion of the Outer Planes" },
		rewarded: { list: "rewarded-feat-options" },
		ruined: { list: "ruined-feat-options" },
	};
	let backgroundFeatMode = "choice";
	let backgroundFeatValue = "";

	function updateBackgroundFeat() {
		const backgroundName = $("#page1 [name='background']").val().trim().toLowerCase();
		const rule = backgroundFeatRules[backgroundName];
		const firstFeat = $("#page1 [name='feat-slot-01']");

		if (rule && rule.feat) {
			backgroundFeatMode = "fixed";
			backgroundFeatValue = rule.feat;
			firstFeat.prop("readOnly", true).removeAttr("data-suggestion-list").attr("aria-readonly", "true").attr("placeholder", "");
			if (firstFeat.val() !== rule.feat) {
				firstFeat.val(rule.feat).trigger("change");
			}
			if (magicItemInput === firstFeat[0]) {
				closeMagicItemSuggestions();
			}
			return;
		}

		backgroundFeatMode = "choice";
		const listId = rule ? rule.list : "feat-options";

		if (backgroundName === "custom") {
			firstFeat.attr("placeholder", "Random Feat");
		} else if (backgroundName === "rewarded") {
			firstFeat.attr("placeholder", "Lucky / Skilled / Magic Initiate");
		} else if (backgroundName === "ruined") {
			firstFeat.attr("placeholder", "Skilled / Tough / Alert");
		} else {
			firstFeat.attr("placeholder", "Background Feat");
		}

		firstFeat.prop("readOnly", false).attr("data-suggestion-list", listId).removeAttr("aria-readonly");

		const allowedFeats = $("#" + listId + " option").map(function () {
			return $(this).val();
		}).get();
		const currentFeat = firstFeat.val().trim();
		const nextFeat = allowedFeats.indexOf(currentFeat) === -1 ? "" : currentFeat;
		backgroundFeatValue = nextFeat;

		if (currentFeat !== nextFeat) {
			firstFeat.val(nextFeat).trigger("change");
		}
	}



	// Lineage feat allocation
	let lineageRace = "";
	let formerRace = "";

	let racialFeatCount = 0;
	let smallSizeFeatSlot = null;

	const lineageRaces = [
		"dhampir",
		"reborn",
		"hexblood"
	];

	const racialFeatureRules = {
		"Dwarf": {
			features: ["Darkvision", "Dwarven Resilience", "Stonecunning"],
			effects: {
				walkSpeed: 25,
				ignoreHeavyArmorSpeedPenalty: true,
				saveAdvantages: ["Advantage on saving throws against poison"],
				damageResistances: ["Poison"],
				languages: ["Common", "Dwarvish"],
				weaponProficiencies: ["Battleaxe", "Handaxe", "Light hammer", "Warhammer"],
			},
		},
		"Elf": {
			features: ["Darkvision", "Keen Senses", "Fey Ancestry", "Trance"],
			effects: {
				saveAdvantages: ["Advantage on saving throws against being charmed"],
				skills: ["Perception"],
				languages: ["Common", "Elvish"],
			},
		},
		"Halfling": {
			features: ["Lucky", "Brave", "Halfling Nimbleness"],
			effects: {
				walkSpeed: 25,
				languages: ["Common", "Halfling"],
			},
		},
		"Human": {
			features: ["Ability Score Increase", "Languages"],
			effects: {
				walkSpeed: 30,
				languages: ["Common", "Choose one additional language"],
			},
		},
		"Dragonborn": {
			features: ["Draconic Ancestry", "Breath Weapon", "Damage Resistance"],
			effects: {
				walkSpeed: 30,
				languages: ["Common", "Draconic"],
				choiceNotes: ["Choose a Draconic Ancestry"],
			},
		},
		"Gnome": {
			features: ["Darkvision", "Gnome Cunning"],
			effects: {
				walkSpeed: 25,
				saveAdvantages: ["Advantage on Intelligence, Wisdom, and Charisma saving throws against magic"],
				languages: ["Common", "Gnomish"],
			},
		},
		"Half-Elf": {
			features: ["Darkvision", "Fey Ancestry", "Skill Versatility"],
			effects: {
				saveAdvantages: ["Advantage on saving throws against being charmed"],
				languages: ["Common", "Elvish", "Choose one additional language"],
				choiceNotes: ["Choose two skill proficiencies"],
			},
		},
		"Half-Orc": {
			features: ["Darkvision", "Menacing", "Relentless Endurance", "Savage Attacks"],
			effects: {
				walkSpeed: 30,
				skills: ["Intimidation"],
				languages: ["Common", "Orc"],
			},
		},
		"Tiefling": {
			features: ["Darkvision", "Hellish Resistance", "Infernal Legacy"],
			effects: {
				walkSpeed: 30,
				damageResistances: ["Fire"],
				languages: ["Common", "Infernal"],
			},
		},
	};

	const racialFeatureVariantRules = {
		"Hill Dwarf": {
			features: ["Dwarven Toughness"],
			effects: { maxHpPerLevel: 1 },
		},
		"Mountain Dwarf": {
			features: ["Dwarven Armor Training"],
			effects: {
				armorProficiencies: ["Light armor", "Medium armor"],
				weaponProficiencies: ["Battleaxe", "Handaxe", "Light hammer", "Warhammer"],
			},
		},
		"Duergar": {
			features: ["Superior Darkvision", "Duergar Resilience", "Sunlight Sensitivity", "Duergar Magic"],
			effects: { languages: ["Undercommon"] },
		},
		"Mark of Warding Dwarf": {
			features: ["Mark of Warding"],
			effects: { checkBonuses: ["Add a d4 to Investigation or thieves' tools checks"] },
		},
		"High Elf": {
			features: ["Elf Weapon Training", "Cantrip"],
			effects: {
				weaponProficiencies: ["Longsword", "Shortsword", "Shortbow", "Longbow"],
				choiceNotes: ["Choose one wizard cantrip"],
			},
		},
		"Wood Elf": {
			features: ["Elf Weapon Training", "Fleet of Foot", "Mask of the Wild"],
			effects: {
				walkSpeed: 35,
				weaponProficiencies: ["Longsword", "Shortsword", "Shortbow", "Longbow"],
			},
		},
		"Drow": {
			features: ["Superior Darkvision", "Sunlight Sensitivity", "Drow Magic", "Drow Weapon Training"],
			effects: { weaponProficiencies: ["Rapiers", "Shortswords", "Hand crossbows"] },
		},
		"Sea Elf": {
			features: ["Child of the Sea", "Friend of the Sea"],
			effects: { swimSpeed: 30, languages: ["Aquan"] },
		},
		"Eladrin": {
			features: ["Fey Step"],
		},
		"Shadar-Kai": {
			features: ["Blessing of the Raven Queen"],
		},
		"Astral Elf": {
			features: ["Astral Fire", "Starlight Step", "Astral Trance"],
			effects: { languages: ["One language of your choice"] },
		},
		"Mark of Shadow Elf": {
			features: ["Mark of Shadow"],
			effects: { checkBonuses: ["Add a d4 to Performance or Stealth checks"] },
		},
		"Lightfoot Halfling": {
			features: ["Naturally Stealthy"],
		},
		"Stout Halfling": {
			features: ["Stout Resilience"],
			effects: {
				saveAdvantages: ["Advantage on saving throws against poison"],
				damageResistances: ["Poison"],
			},
		},
		"Ghostwise Halfling": {
			features: ["Silent Speech"],
		},
		"Mark of Healing Halfling": {
			features: ["Mark of Healing"],
			effects: { checkBonuses: ["Add a d4 to Medicine checks"] },
		},
		"Mark of Hospitality Halfling": {
			features: ["Mark of Hospitality"],
			effects: { checkBonuses: ["Add a d4 to Persuasion or tool checks"] },
		},
		"Variant Human": {
			features: ["Variant Human Traits", "Feat", "Skill"],
			effects: {
				choiceNotes: ["Choose one skill proficiency and one feat"],
			},
		},
		"Mark of Finding Human": {
			features: ["Mark of Finding"],
			effects: { checkBonuses: ["Add a d4 to Perception or Survival checks"] },
		},
		"Mark of Handling Human": {
			features: ["Mark of Handling"],
			effects: { checkBonuses: ["Add a d4 to Animal Handling or Nature checks"] },
		},
		"Mark of Making Human": {
			features: ["Mark of Making"],
			effects: { checkBonuses: ["Add a d4 to checks with artisan's tools"] },
		},
		"Mark of Passage Human": {
			features: ["Mark of Passage"],
			effects: { checkBonuses: ["Add a d4 to Acrobatics checks"] },
		},
		"Mark of Sentinel Human": {
			features: ["Mark of Sentinel"],
			effects: { checkBonuses: ["Add a d4 to Insight or Perception checks"] },
		},
		"Chromatic Dragonborn": {
			features: ["Chromatic Ancestry", "Breath Weapon", "Damage Resistance", "Draconic Language"],
			effects: { languages: ["Common", "Draconic"] },
		},
		"Metallic Dragonborn": {
			features: ["Metallic Ancestry", "Breath Weapon", "Damage Resistance", "Draconic Language"],
			effects: { languages: ["Common", "Draconic"] },
		},
		"Gem Dragonborn": {
			features: ["Gem Ancestry", "Breath Weapon", "Damage Resistance", "Draconic Language"],
			effects: { languages: ["Common", "Draconic"] },
		},
		"Forest Gnome": {
			features: ["Natural Illusionist", "Speak with Small Beasts"],
		},
		"Rock Gnome": {
			features: ["Artificer's Lore", "Tinker"],
			effects: { toolProficiencies: ["Tinker's tools"] },
		},
		"Deep Gnome": {
			features: ["Superior Darkvision", "Stone Camouflage"],
		},
		"Mark of Scribing Gnome": {
			features: ["Mark of Scribing"],
		},
		"High Half-Elf": {
			features: ["Cantrip"],
			effects: {
				choiceNotes: ["Choose one wizard cantrip"],
				languages: ["One language of your choice"],
			},
		},
		"Wood Half-Elf": {
			features: ["Fleet of Foot"],
			effects: { walkSpeed: 35 },
		},
		"Drow Half-Elf": {
			features: ["Drow Magic"],
		},
		"Aquatic Half-Elf": {
			features: ["Swim Speed"],
			effects: { swimSpeed: 30, languages: ["Aquan"] },
		},
		"Mark of Detection Half-Elf": {
			features: ["Mark of Detection"],
			effects: { checkBonuses: ["Add a d4 to Insight or Investigation checks"] },
		},
		"Mark of Storm Half-Elf": {
			features: ["Mark of Storm"],
			effects: { checkBonuses: ["Add a d4 to Acrobatics checks"] },
		},
		"Mark of Finding Half-Orc": {
			features: ["Mark of Finding"],
			effects: { checkBonuses: ["Add a d4 to Perception or Survival checks"] },
		},
		"Variant Tiefling": {
			features: ["Variant Tiefling Traits"],
		},
		"Baalzebul Tiefling": {
			features: ["Legacy of Maladomini"],
		},
		"Dispater Tiefling": {
			features: ["Legacy of Dis"],
		},
		"Fierna Tiefling": {
			features: ["Legacy of Phlegethos"],
		},
		"Glasya Tiefling": {
			features: ["Legacy of Malbolge"],
		},
		"Levistus Tiefling": {
			features: ["Legacy of Stygia"],
		},
		"Mammon Tiefling": {
			features: ["Legacy of Minauros"],
		},
		"Mephistopheles Tiefling": {
			features: ["Legacy of Cania"],
		},
		"Zariel Tiefling": {
			features: ["Legacy of Avernus"],
		},
	};

	const racialFeatureStandaloneRules = {
		"Dhampir": {
			features: ["Darkvision", "Deathless Nature", "Spider Climb", "Vampiric Bite", "Ancestral Legacy"],
			effects: { walkSpeed: 35, climbSpeed: 35, languages: ["Two languages of your choice"] },
		},
		"Hexblood": {
			features: ["Fey", "Hex Magic", "Eerie Token", "Ancestral Legacy"],
		},
		"Reborn": {
			features: ["Deathless Nature", "Knowledge from a Past Life"],
			effects: { languages: ["Two languages of your choice"] },
		},
		"Aarakocra": {
			features: ["Flight", "Talons"],
			effects: { walkSpeed: 25, flySpeed: 50, languages: ["Common", "Aarakocra"] },
		},
		"Aasimar": {
			features: ["Darkvision", "Celestial Resistance", "Healing Hands", "Light Bearer", "Aasimar Subrace Feature"],
			effects: {
				damageResistances: ["Necrotic", "Radiant"],
				languages: ["Common", "Celestial"],
				choiceNotes: ["Choose Protector, Scourge, or Fallen subrace features"],
			},
		},
		"Autognome": {
			features: ["Armored Casing", "Constructed Resilience", "Built for Success", "Mechanical Nature", "Sentry's Rest"],
			effects: {
				toolProficiencies: ["Choose one tool proficiency"],
				languages: ["Common", "One language of your choice"],
				saveAdvantages: ["Advantage on saving throws against poison"],
				damageResistances: ["Poison"],
			},
		},
		"Bugbear": {
			features: ["Darkvision", "Fey Ancestry", "Long-Limbed", "Powerful Build", "Sneaky", "Surprise Attack"],
			effects: { skills: ["Stealth"], languages: ["Common", "Goblin"] },
		},
		"Centaur": {
			features: ["Fey", "Charge", "Equine Build", "Survivor"],
			effects: {
				walkSpeed: 40,
				languages: ["Common", "Sylvan"],
				choiceNotes: ["Choose proficiency in Animal Handling or Survival"],
			},
		},
		"Custom Lineage": {
			features: ["Creature Type", "Size", "Feat", "Variable Trait"],
			effects: { languages: ["Common", "One language of your choice"] },
		},
		"Fairy": {
			features: ["Fairy Type", "Flight", "Fairy Magic"],
			effects: {
				flySpeed: 30,
				languages: ["Common", "Sylvan"],
				choiceNotes: ["Choose a spellcasting ability for Fairy Magic"],
			},
		},
		"Firbolg": {
			features: ["Firbolg Magic", "Hidden Step", "Powerful Build", "Speech of Beast and Leaf"],
			effects: { languages: ["Common", "Elvish", "Giant"] },
		},
		"Air Genasi": {
			features: ["Unending Breath", "Mingle with the Wind"],
			effects: { walkSpeed: 30, languages: ["Common", "Primordial"] },
		},
		"Earth Genasi": {
			features: ["Earth Walk", "Merge with Stone"],
			effects: { walkSpeed: 30, languages: ["Common", "Primordial"] },
		},
		"Fire Genasi": {
			features: ["Darkvision", "Fire Resistance", "Reach to the Blaze"],
			effects: { walkSpeed: 30, damageResistances: ["Fire"], languages: ["Common", "Primordial"] },
		},
		"Water Genasi": {
			features: ["Acid Resistance", "Amphibious", "Swim", "Call to the Wave"],
			effects: { walkSpeed: 30, swimSpeed: 30, damageResistances: ["Acid"], languages: ["Common", "Primordial"] },
		},
		"Giff": {
			features: ["Astral Spark", "Firearms Mastery", "Hippo Build"],
			effects: { languages: ["Common", "One language of your choice"] },
		},
		"Githyanki": {
			features: ["Decadent Mastery", "Githyanki Psionics", "Martial Prodigy"],
			effects: {
				languages: ["Common", "Gith"],
				choiceNotes: ["Choose one skill, tool, or language proficiency"],
			},
		},
		"Githzerai": {
			features: ["Mental Discipline", "Githzerai Psionics"],
			effects: {
				saveAdvantages: ["Advantage on saving throws against being charmed or frightened"],
				languages: ["Common", "Gith"],
			},
		},
		"Goblin": {
			features: ["Darkvision", "Fury of the Small", "Nimble Escape"],
			effects: { skills: ["Stealth"], languages: ["Common", "Goblin"] },
		},
		"Goliath": {
			features: ["Natural Athlete", "Mountain Born", "Stone's Endurance"],
			effects: {
				skills: ["Athletics"],
				damageResistances: ["Cold"],
				languages: ["Common", "Giant"],
			},
		},
		"Grung": {
			features: ["Arboreal Alertness", "Poisonous Skin", "Standing Leap", "Water Dependency"],
			effects: { walkSpeed: 25, climbSpeed: 25, languages: ["Grung"] },
		},
		"Hadozee": {
			features: ["Dexterous Feet", "Glide", "Hadozee Resilience"],
			effects: { languages: ["Common", "One language of your choice"] },
		},
		"Harengon": {
			features: ["Hare-Trigger", "Leporine Senses", "Lucky Footwork", "Rabbit Hop"],
			effects: { skills: ["Perception"], languages: ["Common", "One language of your choice"] },
		},
		"Hobgoblin": {
			features: ["Darkvision", "Fey Ancestry", "Martial Training", "Saving Face"],
			effects: {
				armorProficiencies: ["Light armor"],
				weaponProficiencies: ["Choose two martial weapon proficiencies"],
				languages: ["Common", "Goblin"],
			},
		},
		"Kalashtar": {
			features: ["Dual Mind", "Mental Discipline", "Mind Link", "Severed from Dreams"],
			effects: {
				saveAdvantages: ["Advantage on Wisdom saving throws"],
				damageResistances: ["Psychic"],
				languages: ["Common", "Quori"],
			},
		},
		"Kender": {
			features: ["Kender Fearlessness", "Kender Aptitude", "Taunt"],
			effects: {
				saveAdvantages: ["Advantage on saving throws against being frightened"],
				choiceNotes: ["Choose one skill proficiency from Kender Aptitude"],
				languages: ["Common", "One language of your choice"],
			},
		},
		"Kenku": {
			features: ["Expert Forgery", "Kenku Training", "Mimicry"],
			effects: {
				choiceNotes: ["Choose two skill proficiencies"],
				languages: ["Common", "Auran"],
			},
		},
		"Kobold": {
			features: ["Darkvision", "Grovel, Cower, and Beg", "Pack Tactics", "Sunlight Sensitivity"],
			effects: { languages: ["Common", "Draconic"] },
		},
		"Leonin": {
			features: ["Darkvision", "Claws", "Hunter's Instinct", "Daunting Roar"],
			effects: {
				walkSpeed: 35,
				languages: ["Common"],
				choiceNotes: ["Choose proficiency in Athletics, Intimidation, Perception, or Survival"],
			},
		},
		"Lizardfolk": {
			features: ["Bite", "Cunning Artisan", "Hold Breath", "Hunter's Lore", "Natural Armor", "Hungry Jaws"],
			effects: {
				choiceNotes: ["Choose two: Animal Handling, Nature, Perception, Stealth, or Survival"],
				languages: ["Common", "Draconic"],
				armor: { base: 13, dexterity: true },
			},
		},
		"Locathah": {
			features: ["Limited Amphibiousness", "Leviathan Will", "Natural Armor", "Observant and Athletic"],
			effects: {
				swimSpeed: 30,
				skills: ["Athletics", "Survival"],
				saveAdvantages: ["Advantage on saving throws against being charmed, frightened, paralyzed, poisoned, stunned, or put to sleep"],
				armor: { base: 12, dexterity: true },
				languages: ["Common", "Locathah"],
			},
		},
		"Loxodon": {
			features: ["Powerful Build", "Loxodon Serenity", "Natural Armor", "Trunk", "Keen Smell"],
			effects: {
				saveAdvantages: ["Advantage on saving throws against being charmed or frightened"],
				armor: { base: 12, ability: "Constitution" },
				languages: ["Common", "Loxodon"],
			},
		},
		"Minotaur": {
			features: ["Horns", "Goring Rush", "Hammering Horns", "Labyrinthine Recall"],
			effects: { languages: ["Common", "Minotaur"] },
		},
		"Orc": {
			features: ["Darkvision", "Aggressive", "Menacing", "Powerful Build"],
			effects: { walkSpeed: 30, skills: ["Intimidation"], languages: ["Common", "Orc"] },
		},
		"Owlin": {
			features: ["Darkvision", "Flight", "Silent Feathers"],
			effects: { flySpeed: 30, skills: ["Stealth"], languages: ["Common", "One language of your choice"] },
		},
		"Plasmoid": {
			features: ["Amorphous", "Darkvision", "Hold Breath", "Natural Resilience", "Shape Self"],
			effects: { languages: ["Common", "One language of your choice"] },
		},
		"Satyr": {
			features: ["Fey", "Ram", "Magic Resistance", "Mirthful Leaps", "Reveler"],
			effects: {
				walkSpeed: 35,
				saveAdvantages: ["Advantage on saving throws against spells and other magical effects"],
				skills: ["Performance", "Persuasion"],
				languages: ["Common", "Sylvan"],
			},
		},
		"Shifter": {
			features: ["Bestial Instincts", "Darkvision", "Shifting"],
			effects: {
				choiceNotes: ["Choose one: Athletics, Acrobatics, Intimidation, or Survival proficiency"],
				languages: ["Common"],
			},
		},
		"Tabaxi": {
			features: ["Darkvision", "Feline Agility", "Cat's Claws", "Cat's Talent"],
			effects: { climbSpeed: 20, skills: ["Perception", "Stealth"], languages: ["Common", "One language of your choice"] },
		},
		"Thri-kreen": {
			features: ["Chameleon Carapace", "Darkvision", "Secondary Arms", "Sleepless", "Thri-kreen Telepathy"],
			effects: { armor: { base: 13, dexterity: true }, languages: ["Common", "One language of your choice"] },
		},
		"Tortle": {
			features: ["Claws", "Hold Breath", "Natural Armor", "Shell Defense", "Survival Instinct"],
			effects: { armor: { base: 17 }, skills: ["Survival"], languages: ["Common", "Aquan"] },
		},
		"Triton": {
			features: ["Control Air and Water", "Emissary of the Sea", "Guardians of the Depths", "Amphibious"],
			effects: { swimSpeed: 30, damageResistances: ["Cold"], languages: ["Common", "Primordial"] },
		},
		"Vedalken": {
			features: ["Vedalken Dispassion", "Tireless Precision", "Partially Amphibious"],
			effects: {
				saveAdvantages: ["Advantage on Intelligence, Wisdom, and Charisma saving throws"],
				choiceNotes: ["Choose one skill or tool proficiency"],
				languages: ["Common", "Vedalken"],
			},
		},
		"Warforged": {
			features: ["Constructed Resilience", "Sentry's Rest", "Integrated Protection", "Specialized Design"],
			effects: {
				armorBonus: 1,
				saveAdvantages: ["Advantage on saving throws against poison"],
				damageResistances: ["Poison"],
				choiceNotes: ["Choose one skill or tool proficiency"],
				languages: ["Common"],
			},
		},
		"Yuan-ti": {
			features: ["Darkvision", "Innate Spellcasting", "Magic Resistance", "Poison Immunity"],
			effects: {
				saveAdvantages: ["Advantage on saving throws against spells and other magical effects"],
				damageImmunities: ["Poison"],
				conditionImmunities: ["Poisoned"],
				languages: ["Common", "Abyssal"],
			},
		},
	};

	const racialFeatRules = {
		"Dwarf": ["Dwarven Fortitude", "Squat Nimbleness"],
		"Elf": ["Elven Accuracy", "Revenant Blade"],
		"Halfling": ["Bountiful Luck", "Second Chance"],
		"Human": ["Prodigy"],
		"Dragonborn": ["Dragon Fear", "Dragon Hide"],
		"Gnome": ["Fade Away"],
		"Half-Elf": ["Prodigy", "Elven Accuracy"],
		"Half-Orc": ["Prodigy", "Orcish Fury"],
		"Tiefling": ["Flames of Phlegethos", "Infernal Constitution"],
		// Add the rest of your races here
	};

	const racialFeatVariantRules = {
		"High Elf": ["Fey Teleportation"],
		"Wood Elf": ["Wood Elf Magic"],
		"Drow": ["Drow High Magic"],
		"High Half-Elf": ["Fey Teleportation"],
		"Wood Half-Elf": ["Wood Elf Magic"],
		"Half-Drow": ["Drow High Magic"],
		"Deep Gnome": ["Svirfneblin Magic"],
	};

	const racialFeatAliases = {
		"hill dwarf": "Dwarf",
		"mountain dwarf": "Dwarf",
		"duergar": "Dwarf",
		"mark of warding dwarf": "Dwarf",
		"high elf": "Elf",
		"wood elf": "Elf",
		"drow": "Elf",
		"sea elf": "Elf",
		"eladrin": "Elf",
		"shadar-kai": "Elf",
		"astral elf": "Elf",
		"mark of shadow elf": "Elf",
		"lightfoot halfling": "Halfling",
		"stout halfling": "Halfling",
		"ghostwise halfling": "Halfling",
		"mark of healing halfling": "Halfling",
		"mark of hospitality halfling": "Halfling",
		"variant human": "Human",
		"mark of finding human": "Human",
		"mark of handling human": "Human",
		"mark of making human": "Human",
		"mark of passage human": "Human",
		"mark of sentinel human": "Human",
		"chromatic dragonborn": "Dragonborn",
		"metallic dragonborn": "Dragonborn",
		"gem dragonborn": "Dragonborn",
		"forest gnome": "Gnome",
		"rock gnome": "Gnome",
		"deep gnome": "Gnome",
		"mark of scribing gnome": "Gnome",
		"high half-elf": "Half-Elf",
		"wood half-elf": "Half-Elf",
		"drow half-elf": "Half-Elf",
		"aquatic half-elf": "Half-Elf",
		"mark of detection half-elf": "Half-Elf",
		"mark of storm half-elf": "Half-Elf",
		"mark of finding half-orc": "Half-Orc",
		"variant tiefling": "Tiefling",
		"baalzebul tiefling": "Tiefling",
		"dispater tiefling": "Tiefling",
		"fierna tiefling": "Tiefling",
		"glasya tiefling": "Tiefling",
		"levistus tiefling": "Tiefling",
		"mammon tiefling": "Tiefling",
		"mephistopheles tiefling": "Tiefling",
		"zariel tiefling": "Tiefling",
	};

	const smallSizeFeat = "Squat Nimbleness";

	function updateRace() {
		const raceInput = $("#page1 [name='race']");
		const selectedRace = raceInput.val().trim();

		const selectedRaceLower = selectedRace.toLowerCase();
		const savedLineageMatch = selectedRace.match(/^(dhampir|reborn|hexblood)\s+\((.+)\)$/i);

		if (savedLineageMatch) {
			lineageRace = savedLineageMatch[1].toLowerCase();
			formerRace = savedLineageMatch[2].trim().toLowerCase();
			raceInput
				.attr("data-lineage", lineageRace)
				.attr("data-former-race", formerRace);
			updateRacialAbilityScoreControls();
			updateRacialFeat();
			return;
		}

		// User selected a lineage
		if (lineageRaces.includes(selectedRaceLower)) {
			lineageRace = selectedRaceLower;
			formerRace = "";

			raceInput
				.val("")
				.attr("placeholder", "Pick former race");

			updateRacialAbilityScoreControls();
			updateRacialFeat();
			return;
		}

		// If the input already contains "Dhampir (Hill Dwarf)",
		// extract just "Hill Dwarf" as the former race.
		if (lineageRace && selectedRaceLower.startsWith(lineageRace + " (") && selectedRace.endsWith(")")) {
			formerRace = selectedRace
				.substring(lineageRace.length + 2, selectedRace.length - 1)
				.trim()
				.toLowerCase();
		} else if (lineageRace && selectedRace) {
			formerRace = selectedRaceLower;
		}

		// User selected a former race for a lineage
		if (lineageRace && formerRace) {
			const lineageName =
				lineageRace.charAt(0).toUpperCase() + lineageRace.slice(1);

			const formerName = formerRace
				.split(" ")
				.map(function (word) {
					return word.charAt(0).toUpperCase() + word.slice(1);
				})
				.join(" ");

			raceInput
				.val(lineageName + " (" + formerName + ")")
				.attr("placeholder", "")
				.attr("data-lineage", lineageRace)
				.attr("data-former-race", formerRace);

			updateRacialAbilityScoreControls();
			updateRacialFeat();
			return;
		}

		// Normal race
		lineageRace = "";
		formerRace = "";

		raceInput
			.attr("placeholder", "Human")
			.removeAttr("data-lineage")
			.removeAttr("data-former-race");

		updateRacialAbilityScoreControls();
		updateRacialFeat();
	}


	function updateRacialFeat() {
		let raceName = $("#page1 [name='race']").val().trim();

		// Lineages inherit racial feats from their former race
		if (lineageRace && formerRace) {
			raceName = formerRace;
		}

		const normalizedRaceName = raceName.toLowerCase();
		const racialRuleNames = Object.keys(racialFeatRules).filter(function (key) {
			const normalizedRuleName = key.toLowerCase();
			return normalizedRaceName === normalizedRuleName
				|| normalizedRaceName.indexOf(normalizedRuleName + " ") === 0
				|| normalizedRaceName.endsWith(" " + normalizedRuleName);
		});
		const aliasedRule = racialFeatAliases[normalizedRaceName];

		if (aliasedRule && racialRuleNames.indexOf(aliasedRule) === -1) {
			racialRuleNames.push(aliasedRule);
		}

		let newRacialFeats = [];
		racialRuleNames.forEach(function (ruleName) {
			newRacialFeats = newRacialFeats.concat(racialFeatRules[ruleName]);
		});
		Object.keys(racialFeatVariantRules).forEach(function (variantName) {
			if (normalizedRaceName === variantName.toLowerCase()) {
				newRacialFeats = newRacialFeats.concat(racialFeatVariantRules[variantName]);
			}
		});
		newRacialFeats = newRacialFeats.filter(function (feat, index) {
			return newRacialFeats.indexOf(feat) === index;
		});

		// Remove old racial feats
		for (let i = 0; i < racialFeatCount; i++) {
			const slotNumber = i + 2;
			const slotName = "feat-slot-" + String(slotNumber).padStart(2, "0");
			const slot = $("#page1 [name='" + slotName + "']");

			slot.val("").trigger("change");
		}

		// Remove old Squat Nimbleness
		if (smallSizeFeatSlot !== null) {
			const oldSmallSlotName =
				"feat-slot-" + String(smallSizeFeatSlot).padStart(2, "0");

			$("#page1 [name='" + oldSmallSlotName + "']")
				.val("")
				.trigger("change");

			smallSizeFeatSlot = null;
		}

		racialFeatCount = newRacialFeats.length;

		// Add racial feats starting at slot 2
		for (let i = 0; i < racialFeatCount; i++) {
			const slotNumber = i + 2;
			const slotName = "feat-slot-" + String(slotNumber).padStart(2, "0");
			const slot = $("#page1 [name='" + slotName + "']");

			slot.val(newRacialFeats[i]).trigger("change");
		}

		// Add Squat Nimbleness after all racial feats if the character is Small
		const sizeValue = $("#page1 [name='charSize']").val().trim().toLowerCase();

		if (sizeValue === "small" && newRacialFeats.indexOf(smallSizeFeat) === -1) {
			smallSizeFeatSlot = racialFeatCount + 2;

			const smallSlotName =
				"feat-slot-" + String(smallSizeFeatSlot).padStart(2, "0");

			$("#page1 [name='" + smallSlotName + "']")
				.val("Squat Nimbleness")
				.trigger("change");
		}

		updateFeatures();
	}

	$("#page1 [name='race']").on("change", function () {
		updateRace();
	});

	$("#page1 [name='charSize']").on("input change", updateRacialFeat);


	let magicItemInput = null;
	let magicItemSuggestionIndex = -1;
	const magicItemSuggestions = $("<div class='magic-item-suggestions' role='listbox'></div>").appendTo("body");

	function positionMagicItemSuggestions() {
		if (!magicItemInput) {
			return;
		}

		const inputBounds = magicItemInput.getBoundingClientRect();
		const menuWidth = Math.min(Math.max(inputBounds.width, 240), 360);
		const left = Math.max(8, Math.min(inputBounds.left, window.innerWidth - menuWidth - 8));
		const maxHeight = Math.max(80, Math.min(240, window.innerHeight - inputBounds.bottom - 8));

		magicItemSuggestions.css({
			left: left + "px",
			top: inputBounds.bottom + 2 + "px",
			width: menuWidth + "px",
			maxHeight: maxHeight + "px",
		});
	}

	function showMagicItemSuggestions(input) {
		const listId = $(input).attr("data-suggestion-list");
		const inputValue = $(input).val().trim();
		const query = inputValue.toLowerCase();
		const list = $("#" + listId);
		const groups = list.children("optgroup");
		let suggestionCount = 0;
		let selectedClasses = [];
		let allowedSubclasses = null;

		if ($(input).hasClass("class-name-input")) {
			const classOptions = list.find("option").map(function () {
				return $(this).val();
			}).get();
			selectedClasses = $("#page1 .class-name-input").not(input).map(function () {
				return $(this).val().trim();
			}).get().filter(function (className) {
				return classOptions.indexOf(className) !== -1;
			});
		} else if ($(input).hasClass("subclass-name-input")) {
			allowedSubclasses = getSubclassesForClass($(input).closest(".class-pair").find(".class-name-input").val().trim());
		}

		magicItemInput = input;
		magicItemSuggestionIndex = -1;
		magicItemSuggestions.empty();

		function appendSuggestion(option) {
			const suggestion = $("<button type='button' class='magic-item-suggestion' role='option'></button>")
				.text(option.val());
			magicItemSuggestions.append(suggestion);
			suggestionCount++;
		}

		if (groups.length > 0) {
			groups.each(function () {
				const group = $(this);
				const options = group.children("option").filter(function () {
					return $(this).val().toLowerCase().indexOf(query) !== -1;
				});

				if (options.length > 0 || query === "") {
					magicItemSuggestions.append(
						$("<div class='magic-item-suggestion-group' role='presentation'></div>").text(group.attr("label"))
					);
					options.each(function () {
						appendSuggestion($(this));
					});
				}
			});
		} else {
			list.find("option").filter(function () {
				const optionValue = $(this).val();
				const allowedForField = allowedSubclasses === null || allowedSubclasses.indexOf(optionValue) !== -1;
				return allowedForField
					&& optionValue.toLowerCase().indexOf(query) !== -1
					&& selectedClasses.indexOf(optionValue) === -1;
			}).each(function () {
				appendSuggestion($(this));
			});
		}

		if (suggestionCount === 0 && magicItemSuggestions.children().length === 0) {
			closeMagicItemSuggestions();
			return;
		}

		$(input).attr("aria-expanded", "true");
		positionMagicItemSuggestions();
		magicItemSuggestions.show();
	}

	function selectMagicItemSuggestion(value) {
		if (!magicItemInput) {
			return;
		}

		const input = $(magicItemInput);
		if (input.hasClass("class-name-input")) {
			input.val(value);
		} else {
			input.val(value);
		}

		input.trigger("input").trigger("change");
		closeMagicItemSuggestions();
		input.trigger("blur");
	}

	function closeMagicItemSuggestions() {
		if (magicItemInput) {
			$(magicItemInput).attr("aria-expanded", "false");
		}

		magicItemInput = null;
		magicItemSuggestionIndex = -1;
		magicItemSuggestions.hide().empty();
	}

	function highlightMagicItemSuggestion(index) {
		const suggestions = magicItemSuggestions.children("button");
		magicItemSuggestionIndex = Math.max(0, Math.min(index, suggestions.length - 1));
		suggestions.removeClass("highlighted").attr("aria-selected", "false");
		suggestions.eq(magicItemSuggestionIndex).addClass("highlighted").attr("aria-selected", "true");
	}

	$("#page1 [name='background']").on("input change", updateBackgroundFeat);
	$("#page1").on("input change", "[name^='feat-slot-'], [name^='boon-slot-']", updateFeatures);
	$("#page1").on("change", "input[name^='atkbonus']", function () {
		attackBonusBaseValues[this.name] = $(this).val();
		localStorage.setItem(attackBonusBaseStorageKey, JSON.stringify(attackBonusBaseValues));
		updateCalculatedAttackBonuses();
	});
	$("#page1").on("change", "select[name^='atkname']", function () {
		const option = this.selectedOptions[0];
		if (option && option.dataset.cantripName) {
			this.dataset.cantripValuesFilled = "true";
			applyCantripAttackValues(this);
		} else if (this.dataset.cantripValuesFilled === "true") {
			const fieldIndex = this.name.slice("atkname".length);
			$("#page1 [name='atkbonus" + fieldIndex + "'], #page1 [name='atkdamage" + fieldIndex + "']")
				.val("").trigger("change");
			delete attackBonusBaseValues["atkbonus" + fieldIndex];
			localStorage.setItem(attackBonusBaseStorageKey, JSON.stringify(attackBonusBaseValues));
			delete this.dataset.cantripValuesFilled;
		}
	});
	$("#page1").on("change", ".feature-ability-choice", function () {
		const choiceKey = $(this).attr("data-ability-choice");
		selectedAbilityChoices[choiceKey] = $(this).val();
		localStorage.setItem(abilityChoiceStorageKey, JSON.stringify(selectedAbilityChoices));
		updateFeatures();
	});
	$("#page1").on("change", "[data-feature-choice-key]", function () {
		const choiceKey = $(this).attr("data-feature-choice-key");
		const choiceIndex = Number($(this).attr("data-feature-choice-index"));
		if (!Number.isInteger(choiceIndex) || choiceIndex < 0) {
			return;
		}
		const selectedValues = Array.isArray(featureChoiceSelections[choiceKey])
			? featureChoiceSelections[choiceKey]
			: [];
		selectedValues[choiceIndex] = $(this).val();
		featureChoiceSelections[choiceKey] = selectedValues;
		localStorage.setItem(featureChoiceStorageKey, JSON.stringify(featureChoiceSelections));
		updateFeatures();
	});
	$("#page1").on("change", "[data-skill-choice-key]", function () {
		const choiceKey = $(this).attr("data-skill-choice-key");
		const choiceIndex = Number($(this).attr("data-skill-choice-index"));
		if (!Number.isInteger(choiceIndex) || choiceIndex < 0) {
			return;
		}
		const selectedValues = Array.isArray(skillChoices[choiceKey]) ? skillChoices[choiceKey] : [];
		selectedValues[choiceIndex] = $(this).val();
		skillChoices[choiceKey] = selectedValues;
		localStorage.setItem(skillChoiceStorageKey, JSON.stringify(skillChoices));
		updateFeatures();
	});
	$("#page1").on("click", "#skill-choice-edit", function () {
		skillChoiceEditMode = !skillChoiceEditMode;
		updateFeatures();
	});
	$("#page1").on("change", "[data-fighting-style-key]", function () {
		const choiceKey = $(this).attr("data-fighting-style-key");
		const selectedStyle = $(this).val();
		if (selectedStyle) {
			selectedFightingStyles[choiceKey] = selectedStyle;
		} else {
			delete selectedFightingStyles[choiceKey];
		}
		localStorage.setItem(fightingStyleStorageKey, JSON.stringify(selectedFightingStyles));
		updateFeatures();
	});
	$("#page1 [name='mentor-enabled'], #page1 [name='mentor-type']").on("input change", function () {
		updateProficiencyBonus();
		updateFeatures();
	});
	$("#page1").on("input change", ".mentor-spell-choice-input", function () {
		const kind = $(this).attr("data-spell-choice-kind");
		const index = Number($(this).attr("data-spell-choice-index"));
		if (kind !== "spells" && kind !== "cantrips") {
			return;
		}
		if (!Array.isArray(mentorSpellChoices[kind])) {
			mentorSpellChoices[kind] = [];
		}
		mentorSpellChoices[kind][index] = $(this).val();
		saveMentorSpellChoices();
	});
	$("#page1").on("change", ".mentor-spell-slot-used", function () {
		const level = $(this).attr("data-spell-slot-level");
		const index = Number($(this).attr("data-spell-slot-index"));
		mentorSpellChoices.usedSlots = mentorSpellChoices.usedSlots || {};
		mentorSpellChoices.usedSlots[level] = mentorSpellChoices.usedSlots[level] || [];
		mentorSpellChoices.usedSlots[level][index] = $(this).prop("checked");
		saveMentorSpellChoices();
	});
	$("#page1").on("change", ".spell-slot-used", function () {
		const key = $(this).attr("data-spell-slot-key");
		const index = Number($(this).attr("data-spell-slot-index"));
		if (!key || !Number.isInteger(index) || index < 0) {
			return;
		}
		spellSlotUsage[key] = spellSlotUsage[key] || [];
		spellSlotUsage[key][index] = $(this).prop("checked");
		saveSpellSlotUsage();
	});
	$("#page1").on("input", ".spell-list-level textarea", function () {
		localStorage.setItem("page1_" + this.name, JSON.stringify($(this).val()));
		if (this.name === "spell-list-level-0") {
			renderSpellcasting();
		}
	});
	$("#page1").on("click", "[data-add-srd-spell]", function () {
		const level = Number($(this).attr("data-add-srd-spell"));
		if (!Number.isInteger(level) || level < 0 || level > 9) {
			console.error("Unable to add an SRD spell: the selected spell level is invalid.");
			return;
		}
		const select = $("#page1 [data-spell-catalog-level='" + level + "']");
		if (select.length !== 1) {
			console.error("Unable to add an SRD spell: its catalog selector is missing.");
			return;
		}
		addSelectedSrdSpell(level, select[0]);
	});
	$("#page1 #spell-short-rest-button").on("click", resetPactMagicSlots);
	$("#page1").on("input change", [
		"[name='Strengthmod']", "[name='Dexteritymod']", "[name='Constitutionmod']",
		"[name='Intelligencemod']", "[name='Wisdommod']", "[name='Charismamod']",
		"[name='proficiencybonus']",
	].join(", "), renderSpellcasting);
	$("#page1").on("change", "[name='mentor-role']", function () {
		selectedMentorRole = $(this).val();
		localStorage.setItem(mentorRoleStorageKey, selectedMentorRole);
		updateFeatures();
	});
	$("#page1").on("change", "[data-asi-choice-key]", function () {
		const choiceType = $(this).attr("data-asi-choice-type");
		const choiceKey = $(this).attr("data-asi-choice-key");
		const choices = choiceType === "class"
			? classAsiChoices
			: choiceType === "mentor"
				? mentorAsiChoices
				: characterAsiChoices;
		const choice = choices[choiceKey] || {};
		if ($(this).is("[data-asi-feat-toggle]")) {
			choice.chooseFeat = $(this).prop("checked");
			if (choice.chooseFeat) {
				choice.bankPoint = false;
			}
		} else if ($(this).is("[data-asi-bank-toggle]")) {
			choice.bankPoint = $(this).prop("checked");
			if (choice.bankPoint) {
				choice.chooseFeat = false;
			}
		} else {
			choice[$(this).attr("data-asi-field")] = $(this).val();
		}
		choices[choiceKey] = choice;
		localStorage.setItem(
			choiceType === "class"
				? classAsiStorageKey
				: choiceType === "mentor"
					? mentorAsiStorageKey
					: characterAsiStorageKey,
			JSON.stringify(choices)
		);
		updateFeatures();
	});
	$("#page1 [name='racial-asi-ability-1'], #page1 [name='racial-asi-ability-2'], #page1 [name='racial-asi-ability-3']").on("change", updateFeatures);
	$("#page1 [name='racial-asi-mode']").on("change", function () {
		updateRacialAbilityScoreControls();
		updateFeatures();
	});
	$("#page1 [name='feat-slot-01']").on("change", function () {
		if (backgroundFeatMode !== "choice") {
			return;
		}

		const selectedFeat = $(this).val().trim();
		const listId = $(this).attr("data-suggestion-list");
		const isValidChoice = $("#" + listId + " option").filter(function () {
			return $(this).val() === selectedFeat;
		}).length > 0;

		if (isValidChoice) {
			backgroundFeatValue = selectedFeat;
		} else if (selectedFeat !== backgroundFeatValue) {
			$(this).val(backgroundFeatValue).trigger("change");
		}
	});

	const suggestionFieldSelector = "input[data-suggestion-list], textarea[data-suggestion-list]";
	$("#page1").on("focus", suggestionFieldSelector, function () {
		showMagicItemSuggestions(this);
	});
	$("#page1").on("input", suggestionFieldSelector, function () {
		showMagicItemSuggestions(this);
	});
	$("#page1").on("keydown", suggestionFieldSelector, function (event) {
		let suggestions = magicItemSuggestions.children("button");

		if (event.key === "ArrowDown" || event.key === "ArrowUp") {
			if (magicItemInput !== this || suggestions.length === 0) {
				showMagicItemSuggestions(this);
				suggestions = magicItemSuggestions.children("button");
			}

			if (suggestions.length === 0) {
				event.preventDefault();
				return;
			}

			highlightMagicItemSuggestion(magicItemSuggestionIndex + (event.key === "ArrowDown" ? 1 : -1));
			event.preventDefault();
		} else if (event.key === "Enter" && magicItemSuggestionIndex >= 0) {
			selectMagicItemSuggestion(suggestions.eq(magicItemSuggestionIndex).text());
			event.preventDefault();
		} else if (event.key === "Enter" && $(this).hasClass("class-name-input")) {
			event.preventDefault();
		} else if (event.key === "Escape") {
			closeMagicItemSuggestions();
		}
	});
	magicItemSuggestions.on("mousedown", "button", function (event) {
		event.preventDefault();
	});
	magicItemSuggestions.on("click", "button", function () {
		selectMagicItemSuggestion($(this).text());
	});
	magicItemSuggestions.on("mousemove", "button", function () {
		highlightMagicItemSuggestion(magicItemSuggestions.children("button").index(this));
	});
	$(document).on("mousedown", function (event) {
		if (magicItemInput && !$(event.target).closest(".magic-item-suggestions, " + suggestionFieldSelector).length) {
			closeMagicItemSuggestions();
		}
	});
	$(window).on("scroll resize", positionMagicItemSuggestions);

	$("#page1 .scores").on("input", ".score input", function () {
		if (!applyingCalculatedScores) {
			const enteredScore = $(this).val().trim();
			const scoreNumber = Number(enteredScore);
			pointBuyBaseScores[this.name.replace("score", "")] = enteredScore === ""
				? ""
				: Number.isFinite(scoreNumber)
					? scoreNumber - getAbilityScoreBonus(this.name.replace("score", ""))
					: enteredScore;
			savePointBuyBaseScores();
			updatePointBuyCounter();
		}
		updateModifier(this);
		updateInitiative();
		updateSavingThrows();
		updateSkills();
		updateArmorCalculations();
		if (this.name === "Constitutionscore") {
			updateDisplayedMaxHp();
		}
		if (this.name === "Strengthscore" || this.name === "Charismascore" || this.name === "Intelligencescore") {
			updateFeatures();
		}
	});
	$("#page1 .scores").on("click", ".score-step-button", function () {
		const ability = $(this).attr("data-score-ability");
		const change = Number($(this).attr("data-score-change"));
		const currentScore = Number(pointBuyBaseScores[ability]);
		const nextScore = currentScore + change;
		if ($(this).prop("disabled") || !Number.isInteger(nextScore) || pointBuyCosts[nextScore] === undefined) {
			return;
		}
		if (change > 0) {
			let currentSpent = 0;
			abilityNames.forEach(function (abilityName) {
				currentSpent += pointBuyCosts[Number(pointBuyBaseScores[abilityName])] || 0;
			});
			if (currentSpent + pointBuyCosts[nextScore] - pointBuyCosts[currentScore] > 27) {
				return;
			}
		}
		pointBuyBaseScores[ability] = nextScore;
		savePointBuyBaseScores();
		updateFeatures();
	});

	$("#page1 .scores .score input").each(function () {
		updateModifier(this);
	});
	updateInitiative();

	$("#page1 .saves").on("change", "input[type='checkbox']", updateSavingThrows);
	$("#page1 .skills").on("change", "input[type='checkbox']", function () {
		const skillName = this.name.replace(/-prof$/, "");
		const manualSkills = getManualSkillProficiencies(getSkillChoiceDefinitions(), characterEffects.skills);
		manualSkillProficiencies = manualSkills.filter(function (name) {
			return name !== skillName;
		});
		if (this.checked) {
			manualSkillProficiencies.push(skillName);
		}
		$(this).data("manualRacialProficiency", this.checked);
		localStorage.setItem(manualSkillProficiencyStorageKey, JSON.stringify(manualSkillProficiencies));
		updateCharacterEffects(raceEffects);
	});
	$("#page1 .class-level-pairs").on("input change", ".class-name-input", function () {
		updateSelectedClass(this);
		updateClassSavingThrows();
		updateFeatures();
	});
	$("#page1 .class-level-pairs").on("input change", ".class-level-input", function () {
		updateProficiencyBonus();
		updateClassSavingThrows();
		updateFeatures();
	});
	$("#page1 .class-level-pairs").on("change", ".subclass-name-input", function () {
		updateSubclassForPair($(this).closest(".class-pair"));
		updateFeatures();
	});
	$("#page1 #rage-toggle").on("click", function () {
		if (!getBarbarianContext() || isWearingHeavyArmor()) {
			return;
		}
		rageActive = !rageActive;
		localStorage.setItem("page1_rageActive", rageActive ? "true" : "false");
		updateFeatures();
	});
	$("#page1 [name='proficiencybonus']").on("input change", updateBeastRageAttack);
	$("#page1 [name='rage-beast-form'], #page1 [name='rage-totem-spirit'], #page1 [name='rage-aspect-beast'], #page1 [name='rage-totemic-attunement'], #page1 [name='rage-storm-aura'], #page1 [name='rage-zealot-damage'], #page1 [name='rage-giant-damage']").on("change", updateFeatures);
	$("#page1 .hitdice").on("change", ".hit-die-checks input[type='checkbox']", function () {
		storeHitDieCheckbox(this);
	});
	$("#page1").on("change", ".ability-use-checkbox", function () {
		const storageKey = $(this).attr("data-ability-use-storage");
		localStorage.setItem(storageKey, JSON.stringify(this.checked));
		$(".ability-use-checkbox").filter(function () {
			return $(this).attr("data-ability-use-storage") === storageKey;
		}).prop("checked", this.checked);
	});
	$("#page1 #long-rest-button").on("click", takeLongRest);
	$("#page1 [name='armor-type']").on("change", function () {
		updateArmorCalculations();
		updateFeatures();
	});
	$("#page1 [name='armor-shield']").on("change", updateArmorCalculations);
	$("#page1 [name='armor-ac-bonus']").on("input", updateArmorCalculations);
	$("#page1 [name='speed']").on("input", function () {
		baseSpeedValue = $(this).val().trim();
		baseSpeedIsManual = true;
		localStorage.setItem("page1_baseSpeed", JSON.stringify(baseSpeedValue));
		localStorage.setItem("page1_baseSpeedManual", JSON.stringify(true));
	});
	$("#page1 [name='speed']").on("change", updateArmorCalculations);
	$("#page1 [name='attunement-slots']").on("input change", function () {
		const manualSlotCount = Number($(this).val());
		if (Number.isInteger(manualSlotCount)) {
			localStorage.setItem("page1_manualAttunementSlots", String(Math.max(3, Math.min(6, manualSlotCount))));
		}
		updateAttunementSlots();
	});
	$("#page1 [name='maxhp']").on("input", function () {
		const enteredMaxHp = $(this).val().trim();
		if (enteredMaxHp === "") {
			maxHpAdjustment = 0;
		} else if (Number.isFinite(Number(enteredMaxHp))) {
			maxHpAdjustment = Number(enteredMaxHp)
				- getCalculatedMaxHpBeforeAdjustment()
				- (characterEffects.maxHpBonus || 0);
		} else {
			return;
		}
		localStorage.setItem(maxHpAdjustmentStorageKey, JSON.stringify(maxHpAdjustment));
		updateDisplayedMaxHp();
	});
	initializeAbilityChoiceSlots();
	updateBackgroundFeat();
	updateClassLevelFields();
	initializePointBuyBaseScores();
	updateRace();
	updateArmorCalculations();
	updateAttunementSlots();
	updateFeatures();
});

$ (function() {
	$("#ins1").on("click",function() {  
		//$(this).css('background-color', 'black');
		//console.log('!works!');
		$(this).toggleClass("active");
		});
});
