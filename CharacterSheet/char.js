
$(function () {
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

	$("#page1").saveMyForm(
		{
			loadInputs: true,
		}
	);

	const talentStorageKey = "taoc_selected_talents";
	const fightingStyleStorageKey = "page1_fightingStyleChoices";
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
			const description = (descriptions[this.name] || []).join(" ");
			$(this).closest(".ability-choice-slot").find(".feature-description")
				.text(description)
				.prop("hidden", description === "");
			$(this).closest(".ability-choice-slot").toggleClass("has-description", description !== "");
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
		localStorage.removeItem(fightingStyleStorageKey);
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
				3: ["Infuse Item: infuse mundane items with magical infusions; learn infusions and infuse one item per known infusion."],
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
				[1, 2, 2, 0, 0, 0, 0],
				[2, 2, 2, 0, 0, 0, 0],
				[3, 2, 3, 0, 0, 0, 0],
				[3, 3, 3, 0, 0, 0, 0],
				[4, 3, 4, 2, 0, 0, 0],
				[4, 3, 4, 2, 0, 0, 0],
				[5, 3, 4, 3, 0, 0, 0],
				[5, 3, 4, 3, 0, 0, 0],
				[6, 4, 4, 3, 2, 0, 0],
				[6, 4, 4, 3, 2, 0, 0],
				[7, 4, 4, 3, 3, 0, 0],
				[7, 4, 4, 3, 3, 0, 0],
				[8, 4, 4, 3, 3, 1, 0],
				[8, 4, 4, 3, 3, 1, 0],
				[9, 4, 4, 3, 3, 2, 0],
				[9, 4, 4, 3, 3, 2, 0],
				[10, 4, 4, 3, 3, 3, 1],
				[10, 4, 4, 3, 3, 3, 1],
				[11, 4, 4, 3, 3, 3, 2],
				[11, 4, 4, 3, 3, 3, 2],
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
				totalLevel += level;
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
			const remainingLevel = Math.max(0, 20 - getTotalClassLevels(changedLevelInput));
			const changedLevel = Number($(changedLevelInput).val());
			if ($(changedLevelInput).val().trim() !== "" && changedLevel > remainingLevel) {
				$(changedLevelInput).val(remainingLevel >= 1 ? remainingLevel : "");
			}
		}

		let validLevels = populatedPairs.length > 0;
		let totalLevel = 0;

		$("#page1 .class-pair").each(function () {
			const levelInput = $(this).find(".class-level-input");
			const maxLevel = Math.max(0, 20 - getTotalClassLevels(levelInput[0]));
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

			totalLevel += level;
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

		const speedBonus = (characterEffects.speedBonuses || []).reduce(function (total, bonus) {
			const meetsArmorRequirement = !bonus.notWearingHeavyArmor || !armor.heavy;
			const armorType = $("#page1 [name='armor-type']").val();
			const isUnarmored = ["unarmored", "unarmored-barbarian", "unarmored-monk"].indexOf(armorType) !== -1;
			const meetsUnarmoredRequirement = !bonus.unarmored || isUnarmored;
			const meetsShieldRequirement = !bonus.noShield || !$("#page1 [name='armor-shield']").is(":checked");
			return total + (meetsArmorRequirement && meetsUnarmoredRequirement && meetsShieldRequirement ? bonus.value : 0);
		}, 0);
		speedInput.val(speed + speedBonus - heavyArmorSpeedPenalty);
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
				13: ["Brutal Critical (2 dice)"],
				15: ["Persistent Rage"],
				16: [
					{
						name: "Ability Score Improvement (4)",
						replaces: "Ability Score Improvement (3)"
					}
				],
				17: ["Brutal Critical (3 dice)"],
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
			savingThrows: ["Dexterity", "Charisma"],

			features: {
				1: ["Spellcasting", "Additional Bard Spells", "Bardic Inspiration"],
				2: ["Jack of All Trades", "Magical Inspiration", "Song of Rest (d6)"],
				3: ["Expertise"],
				4: ["Ability Score Improvement", "Bardic Versatility"],
				5: ["Bardic Inspiration (d8)", "Font of Inspiration"],
				6: ["Countercharm"],
				8: [
					{
						name: "Ability Score Improvement (2)",
						replaces: "Ability Score Improvement"
					}
				],
				9: ["Song of Rest (d8)"],
				10: ["Bardic Inspiration (d10)",
					{
						name: "Expertise (2)",
						replaces: "Expertise"
					},
					"Magical Secrets"],
				12: [
					{
						name: "Ability Score Improvement (3)",
						replaces: "Ability Score Improvement (2)"
					}
				],
				13: ["Song of Rest (d10)"],
				14: ["Magical Secrets"],
				15: ["Bardic Inspiration (d12)"],
				16: [
					{
						name: "Ability Score Improvement (4)",
						replaces: "Ability Score Improvement (3)"
					}
				],
				17: ["Song of Rest (d12)"],
				18: ["Magical Secrets"],
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
			savingThrows: ["Intelligence", "Wisdom"],

			features: {
				1: ["Spellcasting", "Additional Druid Spells", "Druidic"],
				2: ["Wild Companion", "Wild Shape"],
				4: ["Ability Score Improvement", "Cantrip Versatility",
					{
						name: "Wild Shape Improvement (swim speed)",
						replaces: "Wild Shape"
					}
				],
				8: [
					{
						name: "Ability Score Improvement (2)",
						replaces: "Ability Score Improvement"
					},
					{
						name: "Wild Shape Improvement (flight speed)",
						replaces: "Wild Shape (swim speed)"
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
			savingThrows: ["Strength", "Constitution"],

			features: {
				1: ["Fighting Style", "Fighting Style Options", "Second Wind"],
				2: ["Action Surge (one use)"],
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
				9: ["Indomitable (one use)"],
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
						name: "Indomitable (two uses)",
						replaces: "Indomitable (one use)"
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
						name: "Action Surge (two uses)",
						replaces: "Action Surge (one use)"
					},
					{
						name: "Indomitable (three uses)",
						replaces: "Indomitable (two uses)"
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
				2: ["Dedicated Weapon", "Ki", "Unarmored Movement"],
				3: ["Deflect Missiles", "Ki-Fueled Attack"],
				4: ["Ability Score Improvement", "Quickened Healing", "Slow Fall"],
				5: ["Stunning Strike", "Focused Aim", "Extra Attack"],
				6: ["Ki-Empowered Strikes"],
				7: ["Evasion", "Stillness of Mind"],
				8: [
					{
						name: "Ability Score Improvement (2)",
						replaces: "Ability Score Improvement"
					}
				],
				9: ["Unarmored Movement Improvement"],
				10: ["Purity of Body"],
				12: [
					{
						name: "Ability Score Improvement (3)",
						replaces: "Ability Score Improvement (2)"
					}
				],
				13: ["Tongue of the Sun and Moon"],
				14: ["Diamond Soul"],
				15: ["Timeless Body"],
				16: [
					{
						name: "Ability Score Improvement (4)",
						replaces: "Ability Score Improvement (3)"
					}
				],
				18: ["Empty Body"],
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
				return field.val() === previous.values[index];
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
			{ level: 2, effects: { speedBonuses: [{ value: 10, unarmored: true, noShield: true }] } },
			{ level: 6, effects: { speedBonuses: [{ value: 5, unarmored: true, noShield: true }] } },
			{ level: 10, effects: { speedBonuses: [{ value: 5, unarmored: true, noShield: true }] } },
			{ level: 14, effects: { speedBonuses: [{ value: 5, unarmored: true, noShield: true }] } },
			{ level: 18, effects: { speedBonuses: [{ value: 5, unarmored: true, noShield: true }] } },
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
			{ level: 3, effects: { skills: ["Nature", "Survival"], choiceNotes: ["Gain Expertise in Nature and Survival; choose these proficiencies if not already proficient"] } },
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

	function addAbilityScoreChoice(effects, choice, singlePoint) {
		if (!choice || choice.chooseFeat) {
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
			addAbilityScoreChoice(effects, classAsiChoices[key], !!activeSinglePointAsiKeys[key]);
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
			return count + (classAsiChoices[entry.key] && classAsiChoices[entry.key].chooseFeat ? 1 : 0);
		}, 0);
		const unlockedFeatSlots = [1];
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

		$("#page1 [name^='feat-slot-']").each(function () {
			const slotNumber = Number(this.name.match(/\d+$/)[0]);
			if (slotNumber === 1 || isRacialFeatSlot(slotNumber)) {
				return;
			}
			const unlocked = unlockedFeatSlots.indexOf(slotNumber) !== -1;
			if (!unlocked && magicItemInput === this) {
				closeMagicItemSuggestions();
			}
			$(this)
				.prop("readOnly", !unlocked)
				.toggleClass("locked-feat-slot", !unlocked)
				.attr("placeholder", unlocked ? "" : "Unlocks with a feat reward")
				.attr("aria-label", "Feat slot " + slotNumber + (unlocked ? "" : " (locked)"));
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
			return;
		}

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
		abilityControls.prop("hidden", !!choice.chooseFeat);
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

	function updateCharacterEffects(effects) {
		updateRageControls();
		raceEffects = effects;
		const combinedEffects = createEmptyEffects();
		mergeEffects(combinedEffects, effects);
		mergeEffects(combinedEffects, getClassModifierEffects());
		mergeEffects(combinedEffects, getSelectedFeatBoonTalentEffects());
		Object.keys(combinedEffects).forEach(function (effectName) {
			if (Array.isArray(combinedEffects[effectName])) {
				combinedEffects[effectName] = combinedEffects[effectName].filter(function (value, index, values) {
					const comparable = typeof value === "object" ? JSON.stringify(value) : value;
					return values.findIndex(function (otherValue) {
						return (typeof otherValue === "object" ? JSON.stringify(otherValue) : otherValue) === comparable;
					}) === index;
				});
			}
		});
		characterEffects = combinedEffects;
		updateDisplayedAbilityScores();
		const beastAttackWarning = updateBeastRageAttack();
		if (beastAttackWarning) {
			characterEffects.rageEffects.push(beastAttackWarning);
		}

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
		if (choiceNotes.length > 0) {
			proficiencySections.push("Other: " + choiceNotes.join(", "));
		}
		const $proficiencies = $("#page1 [name='otherprofs']");
		let existingText = $proficiencies.val() || "";
		const previousGenerated = localStorage.getItem("page1_generatedProficiencies")
			|| localStorage.getItem("page1_racialProficiencies")
			|| "";
		if (previousGenerated && existingText.indexOf(previousGenerated) === 0) {
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
			}
		});

		const characterLevel = getTotalClassLevels();
		syncTalentTreeLevel();
		updateAttunementSlots();
		activeClassAsiKeys = classAsiEntries.map(function (entry) { return entry.key; });
		activeSinglePointAsiKeys = {};
		classAsiEntries.forEach(function (entry) {
			if (isMentorSinglePointLevel(entry.level)) {
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
					allowFeat: true,
					choiceType: "class",
					label: "Class level " + asiEntry.level + " Ability Score Improvement",
					singlePoint: isMentorSinglePointLevel(asiEntry.level),
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
	$("#page1").on("change", ".feature-ability-choice", function () {
		const choiceKey = $(this).attr("data-ability-choice");
		selectedAbilityChoices[choiceKey] = $(this).val();
		localStorage.setItem(abilityChoiceStorageKey, JSON.stringify(selectedAbilityChoices));
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
		updateFeatures();
	});
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
		$(this).data("manualRacialProficiency", this.checked);
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
