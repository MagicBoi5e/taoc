
$(function () {
	var savedClass = localStorage.getItem("page1_characterclass");
	var savedClassLevel = localStorage.getItem("page1_classlevel");

	if (savedClass === null && savedClassLevel !== null) {
		var legacyClassLevel = JSON.parse(savedClassLevel);

		if (typeof legacyClassLevel === "string") {
			var legacyMatch = legacyClassLevel.trim().match(/^(.*?)\s+(\d{1,2})$/);
			var className = legacyMatch ? legacyMatch[1].trim() : legacyClassLevel;
			var level = legacyMatch ? legacyMatch[2] : "";

			localStorage.setItem("page1_characterclass", JSON.stringify(className));
			localStorage.setItem("page1_classlevel", JSON.stringify(level));
		}
	}
	var savedClassList = localStorage.getItem("page1_characterclass");
	if (savedClassList !== null) {
		var savedClasses = JSON.parse(savedClassList);
		if (typeof savedClasses === "string" && /[\/\r\n]/.test(savedClasses)) {
			var splitClasses = savedClasses.split(/[\/\r\n]+/).map(function (className) {
				return className.trim();
			}).filter(function (className) {
				return className !== "";
			});
			if (splitClasses.length > 0) {
				localStorage.setItem("page1_characterclass", JSON.stringify(splitClasses[0]));
				for (var classIndex = 1; classIndex < splitClasses.length && classIndex < 13; classIndex++) {
					var classKey = "page1_characterclass-" + (classIndex + 1);
					if (localStorage.getItem(classKey) === null) {
						localStorage.setItem(classKey, JSON.stringify(splitClasses[classIndex]));
					}
				}
			}
		}
	}
	var savedLevelList = localStorage.getItem("page1_classlevel");
	if (savedLevelList !== null) {
		var savedLevels = JSON.parse(savedLevelList);
		if (typeof savedLevels === "string" && /[\/\r\n]/.test(savedLevels)) {
			var splitLevels = savedLevels.split(/[\/\r\n]+/).map(function (level) {
				return level.trim();
			});
			localStorage.setItem("page1_classlevel", JSON.stringify(splitLevels[0]));
			for (var levelIndex = 1; levelIndex < splitLevels.length && levelIndex < 13; levelIndex++) {
				localStorage.setItem("page1_classlevel-" + (levelIndex + 1), JSON.stringify(splitLevels[levelIndex]));
			}
		}
	}

	$("#page1").saveMyForm(
		{
			loadInputs: true,
		}
	);

	var talentStorageKey = "taoc_selected_talents";

	function readSelectedTalents() {
		try {
			var savedState = JSON.parse(localStorage.getItem(talentStorageKey));
			var talents = Array.isArray(savedState)
				? savedState
				: savedState && Array.isArray(savedState.talents)
					? savedState.talents
					: [];

			return talents.filter(function (talent) {
				return typeof talent === "string" && talent.trim() !== "";
			}).slice(0, 21);
		} catch (error) {
			return [];
		}
	}

	function syncTalentSlots() {
		var talents = readSelectedTalents();

		$("#page1 .talent-slot").each(function (index) {
			$(this).val(talents[index] || "");
		});
	}

	syncTalentSlots();
	$(window).on("focus pageshow", syncTalentSlots);
	window.addEventListener("storage", function (event) {
		if (event.key === talentStorageKey) {
			syncTalentSlots();
		}
	});
	$("#reset-character").on("click", function () {
		if (!window.confirm("Reset this character sheet and delete all saved character data?")) {
			return;
		}

		$("#page1").saveMyForm("clearStorage");
		localStorage.removeItem("page1_baseSpeed");
		window.location.reload();
	});

	var storedBaseSpeed = localStorage.getItem("page1_baseSpeed");
	var baseSpeedValue = storedBaseSpeed === null
		? $("#page1 [name='speed']").val().trim()
		: JSON.parse(storedBaseSpeed);
	var armorTypes = {
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
		"chain-mail": { baseAC: 16, strengthRequirement: 13, stealthDisadvantage: true },
		splint: { baseAC: 17, strengthRequirement: 15, stealthDisadvantage: true },
		plate: { baseAC: 18, strengthRequirement: 15, stealthDisadvantage: true },
		"mage-armor": { baseAC: 13, usesDexterity: true },
		"unarmored-barbarian": { baseAC: 10, usesDexterity: true, secondaryAbility: "Constitution" },
		"unarmored-monk": { baseAC: 10, usesDexterity: true, secondaryAbility: "Wisdom" },
	};

	function updateModifier(scoreInput) {
		var ability = $(scoreInput).closest("li");
		var scoreValue = ability.find(".score input").val().trim();
		var modifierInput = ability.find(".modifier input");

		if (scoreValue === "" || !Number.isFinite(Number(scoreValue))) {
			modifierInput.val("");
			return;
		}

		var modifier = Math.floor((Number(scoreValue) - 10) / 2);
		modifierInput.val(modifier >= 0 ? "+" + modifier : modifier);
	}

	function updateInitiative() {
		var modifierValue = $("#page1 [name='Dexteritymod']").val().trim();
		var initiativeInput = $("#page1 [name='initiative']");

		if (modifierValue === "" || !Number.isFinite(Number(modifierValue))) {
			initiativeInput.val("");
			return;
		}

		initiativeInput.val(modifierValue);
	}

	function getTotalClassLevels(excludedLevelInput) {
		var totalLevel = 0;

		$("#page1 .class-pair").each(function () {
			if ($(this).find(".class-name-input").val().trim() === "") {
				return;
			}

			var levelInput = $(this).find(".class-level-input");
			if (levelInput[0] === excludedLevelInput) {
				return;
			}

			var levelValue = levelInput.val().trim();
			var level = Number(levelValue);
			if (levelValue !== "" && Number.isInteger(level) && level >= 1 && level <= 20) {
				totalLevel += level;
			}
		});

		return totalLevel;
	}

	function updateTotalHitDice() {
		var hitDieByClass = {
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
		var levelsByDie = {};
		var checkedStates = {};

		$("#page1 .hit-die-checks input[type='checkbox']").each(function () {
			checkedStates[this.name] = this.checked;
		});

		$("#page1 .class-pair").each(function () {
			var className = $(this).find(".class-name-input").val().trim().toLowerCase();
			var levelValue = $(this).find(".class-level-input").val().trim();
			var level = Number(levelValue);
			var hitDie = hitDieByClass[className];

			if (!hitDie || levelValue === "" || !Number.isInteger(level) || level < 1 || level > 20) {
				return;
			}

			levelsByDie[hitDie] = (levelsByDie[hitDie] || 0) + level;
		});

		$("#page1 .hit-die-row").each(function () {
			var row = $(this);
			var hitDie = Number(row.attr("data-die"));
			var count = levelsByDie[hitDie] || 0;
			var checks = row.find(".hit-die-checks");
			checks.empty();
			row.find(".hit-die-total").text(count + "d" + hitDie);
			row.prop("hidden", count === 0);

			for (var index = 1; index <= count; index++) {
				var checkboxName = "hitdie-d" + hitDie + "-" + index;
				var storageKey = "page1_" + checkboxName;
				var checkbox = $("<input type='checkbox' />").attr({
					name: checkboxName,
					"aria-label": "Spent d" + hitDie + " hit die " + index,
				});
				var isChecked = Object.prototype.hasOwnProperty.call(checkedStates, checkboxName)
					? checkedStates[checkboxName]
					: localStorage.getItem(storageKey) === "true";

				checkbox.prop("checked", isChecked);
				checks.append(checkbox);
			}
		});
	}

	function storeHitDieCheckbox(checkbox) {
		var storageKey = "page1_" + checkbox.name;
		localStorage.setItem(storageKey, JSON.stringify(checkbox.checked));

		var elementListKey = "elementList_page1";
		var elementList = JSON.parse(localStorage.getItem(elementListKey)) || [];
		if (elementList.indexOf(storageKey) === -1) {
			elementList.push(storageKey);
			localStorage.setItem(elementListKey, JSON.stringify(elementList));
		}
	}

	function updateProficiencyBonus(event) {
		var populatedPairs = $("#page1 .class-pair").filter(function () {
			return $(this).find(".class-name-input").val().trim() !== "";
		});
		var changedLevelInput = event && $(event.target).hasClass("class-level-input")
			? event.target
			: null;

		if (changedLevelInput) {
			var remainingLevel = Math.max(0, 20 - getTotalClassLevels(changedLevelInput));
			var changedLevel = Number($(changedLevelInput).val());
			if ($(changedLevelInput).val().trim() !== "" && changedLevel > remainingLevel) {
				$(changedLevelInput).val(remainingLevel >= 1 ? remainingLevel : "");
			}
		}

		var validLevels = populatedPairs.length > 0;
		var totalLevel = 0;

		$("#page1 .class-pair").each(function () {
			var levelInput = $(this).find(".class-level-input");
			var maxLevel = Math.max(0, 20 - getTotalClassLevels(levelInput[0]));
			levelInput.attr("max", maxLevel);

			if ($(this).find(".class-name-input").val().trim() === "") {
				return;
			}

			var levelValue = levelInput.val().trim();
			var level = Number(levelValue);

			if (levelValue === "" || !Number.isInteger(level) || level < 1 || level > 20) {
				validLevels = false;
				return;
			}

			totalLevel += level;
		});
		if (totalLevel > 20) {
			validLevels = false;
		}
		var proficiencyInput = $("#page1 [name='proficiencybonus']");

		if (!validLevels) {
			proficiencyInput.val("");
			updateSavingThrows();
			updateSkills();
			updateTotalHitDice();
			return;
		}

		var proficiencyBonus = 2 + Math.floor((totalLevel - 1) / 4);
		proficiencyInput.val("+" + proficiencyBonus);
		updateSavingThrows();
		updateSkills();
		updateTotalHitDice();
	}

	function updateClassLevelFields() {
		var pairs = $("#page1 .class-pair");
		var lastPopulatedPair = -1;

		pairs.each(function (index) {
			if ($(this).find(".class-name-input").val().trim() !== "") {
				lastPopulatedPair = index;
			}
		});

		var totalLevel = getTotalClassLevels();
		var extraPairCount = totalLevel < 20 ? 1 : 0;
		var visiblePairCount = Math.min(pairs.length, Math.max(1, lastPopulatedPair + 1 + extraPairCount));
		var focusedPair = $(document.activeElement).closest(".class-pair");
		if (focusedPair.length > 0) {
			visiblePairCount = Math.max(visiblePairCount, pairs.index(focusedPair) + 1);
		}

		pairs.each(function (index) {
			this.hidden = index >= visiblePairCount;
		});

		updateProficiencyBonus();
	}

	function updateSelectedClass(input) {
		var pair = $(input).closest(".class-pair");
		var selectedClass = $(input).val().trim();
		var isValidClass = $("#class-options option").filter(function () {
			return $(this).val() === selectedClass;
		}).length > 0;
		var levelInput = pair.find(".class-level-input");

		if (isValidClass && levelInput.val().trim() === "") {
			if (getTotalClassLevels() >= 20) {
				$(input).val("");
				updateClassLevelFields();
				return;
			}

			levelInput.val("1").trigger("input").trigger("change");
		}

		updateClassLevelFields();
	}

	function updateSavingThrows() {
		var proficiencyValue = $("#page1 [name='proficiencybonus']").val().trim();
		var proficiencyBonus = Number(proficiencyValue);

		if (!Number.isFinite(proficiencyBonus)) {
			proficiencyBonus = 0;
		}

		$("#page1 .saves input[type='text']").each(function () {
			var saveName = $(this).attr("name");
			var abilityName = saveName.replace("-save", "");
			var modifierValue = $("#page1 [name='" + abilityName + "mod']").val().trim();
			var proficient = $("#page1 [name='" + saveName + "-prof']").is(":checked");

			if (modifierValue === "" || !Number.isFinite(Number(modifierValue))) {
				$(this).val("");
				return;
			}

			var save = Number(modifierValue) + (proficient ? proficiencyBonus : 0);
			$(this).val(save >= 0 ? "+" + save : save);
		});
	}

	function updateClassSavingThrows() {
		var firstClass = "";

		$("#page1 .class-pair").each(function () {
			var className = $(this).find(".class-name-input").val().trim();

			if (className !== "" && firstClass === "") {
				firstClass = className;
			}
		});

		// Remove all existing class-based saving throw proficiencies
		$("#page1 .saves input[type='checkbox']")
			.prop("checked", false);

		var rules = classRules[firstClass];

		if (!rules || !rules.savingThrows) {
			updateSavingThrows();
			return;
		}

		rules.savingThrows.forEach(function (ability) {
			$("#page1 .saves input[name='" + ability + "-save-prof']")
				.prop("checked", true);
		});

		updateSavingThrows();
	}


	function updateSkills() {
		var abilityNames = {
			str: "Strength",
			dex: "Dexterity",
			con: "Constitution",
			int: "Intelligence",
			wis: "Wisdom",
			cha: "Charisma",
		};
		var proficiencyValue = $("#page1 [name='proficiencybonus']").val().trim();
		var proficiencyBonus = Number(proficiencyValue);

		if (!Number.isFinite(proficiencyBonus)) {
			proficiencyBonus = 0;
		}

		$("#page1 .skills ul li").each(function () {
			var abilityCode = $(this).find("label .skill").text().replace(/[()]/g, "").trim().toLowerCase();
			var abilityName = abilityNames[abilityCode];
			var skillInput = $(this).find("input[type='text']").first();

			if (!abilityName) {
				skillInput.val("");
				return;
			}

			var modifierValue = $("#page1 [name='" + abilityName + "mod']").val().trim();
			var proficient = $(this).find("input[type='checkbox']").is(":checked");

			if (modifierValue === "" || !Number.isFinite(Number(modifierValue))) {
				skillInput.val("");
				return;
			}

			var skill = Number(modifierValue) + (proficient ? proficiencyBonus : 0);
			skillInput.val(skill >= 0 ? "+" + skill : skill);
		});

		updatePassivePerception();
	}

	function updatePassivePerception() {
		var perceptionValue = $("#page1 [name='Perception']").val().trim();
		var passivePerception = $("#page1 [name='passiveperception']");

		if (perceptionValue === "" || !Number.isFinite(Number(perceptionValue))) {
			passivePerception.val("");
			return;
		}

		passivePerception.val(10 + Number(perceptionValue));
	}

	function getModifierValue(abilityName) {
		var modifierValue = $("#page1 [name='" + abilityName + "mod']").val().trim();

		if (modifierValue === "" || !Number.isFinite(Number(modifierValue))) {
			return null;
		}

		return Number(modifierValue);
	}

	function updateArmorCalculations() {
		var armorType = $("#page1 [name='armor-type']").val();
		var armor = armorTypes[armorType] || armorTypes.unarmored;
		var armorClass = armor.baseAC;
		var armorClassValid = true;
		var dexterityModifier = getModifierValue("Dexterity");
		var miscBonusValue = $("#page1 [name='armor-ac-bonus']").val().trim();
		var miscBonus = miscBonusValue === "" ? 0 : Number(miscBonusValue);

		if (armor.usesDexterity) {
			if (dexterityModifier === null) {
				armorClassValid = false;
			} else {
				armorClass += armor.dexterityCap === undefined
					? dexterityModifier
					: Math.min(dexterityModifier, armor.dexterityCap);
			}
		}

		if (armor.secondaryAbility) {
			var secondaryModifier = getModifierValue(armor.secondaryAbility);

			if (secondaryModifier === null) {
				armorClassValid = false;
			} else {
				armorClass += secondaryModifier;
			}
		}

		if (Number.isFinite(miscBonus)) {
			armorClass += miscBonus;
		}

		if ($("#page1 [name='armor-shield']").is(":checked")) {
			if (armorType != "unarmored-monk")
				armorClass += 2;
			else
				armorClass += 0;
		}

		$("#page1 [name='ac']").val(armorClassValid ? armorClass : "");
		$("#page1 [name='Stealth']").closest("li").toggleClass("stealth-disadvantage", !!armor.stealthDisadvantage);
		updateArmorSpeed(armor);
	}

	function updateArmorSpeed(armor) {
		var speedInput = $("#page1 [name='speed']");
		var speedValue = String(baseSpeedValue).trim();
		var speed = Number(speedValue);
		var strengthValue = $("#page1 [name='Strengthscore']").val().trim();
		var strength = Number(strengthValue);
		var strengthRequirementNotMet = armor.strengthRequirement !== undefined
			&& strengthValue !== ""
			&& Number.isFinite(strength)
			&& strength < armor.strengthRequirement;

		localStorage.setItem("page1_baseSpeed", JSON.stringify(speedValue));

		if (speedValue === "" || !Number.isFinite(speed)) {
			speedInput.val(speedValue);
			return;
		}

		speedInput.val(speed - (strengthRequirementNotMet ? 10 : 0));
	}

	function updateAttunementSlots() {
		var slotCountInput = $("#page1 [name='attunement-slots']");
		var slotCount = Number(slotCountInput.val());

		if (!Number.isInteger(slotCount)) {
			slotCount = 3;
		}

		slotCount = Math.max(3, Math.min(6, slotCount));
		slotCountInput.val(slotCount);

		$("#page1 .attunement-slots-grid input[type='checkbox']").each(function (index) {
			var enabled = index < slotCount;
			$(this).prop("disabled", !enabled);

			if (!enabled) {
				$(this).prop("checked", false);
			}
		});
	}

	var classRules = {
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

	var subclassLevels = {
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

	var subclassRules = {
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

	var subclassOptions = $("<datalist id='subclass-options'></datalist>");
	Object.keys(subclassRules).forEach(function (subclassName) {
		subclassOptions.append($("<option>").val(subclassName));
	});
	$("#page1").append(subclassOptions);

	function getFeaturesUpToLevel(featuresByLevel, level) {
		var features = [];

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
		var replacedFeatures = [];

		features.forEach(function (feature) {
			if (typeof feature === "object" && feature.replaces) {
				replacedFeatures.push(feature.replaces);
			}
		});

		return features.filter(function (feature) {
			var featureName = typeof feature === "string"
				? feature
				: feature.name;

			return replacedFeatures.indexOf(featureName) === -1;
		});
	}

	function updateFeatures() {
		var raceFeatures = [];
		var classFeatures = {};
		var subclassFeatures = {};

		$("#page1 .class-pair").each(function () {
			var className = $(this).find(".class-name-input").val().trim();
			var levelValue = $(this).find(".class-level-input").val().trim();
			var level = Number(levelValue);

			if (!className || !Number.isInteger(level) || level < 1 || level > 20) {
				return;
			}

			var classRule = classRules[className];

			if (!classRule) {
				return;
			}

			// Class features
			classFeatures[className] = getFeaturesUpToLevel(
				classRule.features,
				level
			);

			// Subclass features
			var subclassName = $(this).find(".subclass-name-input").val().trim();
			var subclassRule = subclassRules[subclassName];
			var subclassLevel = subclassLevels[className];

			if (subclassRule && Number.isInteger(subclassLevel) && level >= subclassLevel) {
				subclassFeatures[subclassName] = getFeaturesUpToLevel(
					subclassRule.features,
					level
				);
			}
		});

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

		var output = [];

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
				if (typeof feature === "object") {
					output.push(feature.name);
				} else {
					output.push(feature);
				}
			});

			output.push("");
		});

		$("#page1 [name='features']").val(output.join("\n").trim());
	}

	var backgroundFeatRules = {
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
	var backgroundFeatMode = "choice";
	var backgroundFeatValue = "";

	function updateBackgroundFeat() {
		var backgroundName = $("#page1 [name='background']").val().trim().toLowerCase();
		var rule = backgroundFeatRules[backgroundName];
		var firstFeat = $("#page1 [name='feat-slot-01']");

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
		var listId = rule ? rule.list : "feat-options";

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

		var allowedFeats = $("#" + listId + " option").map(function () {
			return $(this).val();
		}).get();
		var currentFeat = firstFeat.val().trim();
		var nextFeat = allowedFeats.indexOf(currentFeat) === -1 ? "" : currentFeat;
		backgroundFeatValue = nextFeat;

		if (currentFeat !== nextFeat) {
			firstFeat.val(nextFeat).trigger("change");
		}
	}



	// Lineage feat allocation
	var lineageRace = "";
	var formerRace = "";

	var racialFeatValue = [];
	var racialFeatCount = 0;
	var smallSizeFeatSlot = null;

	var lineageRaces = [
		"dhampir",
		"reborn",
		"hexblood"
	];

	var racialFeatRules = {
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

	var racialFeatVariantRules = {
		"High Elf": ["Fey Teleportation"],
		"Wood Elf": ["Wood Elf Magic"],
		"Drow": ["Drow High Magic"],
		"High Half-Elf": ["Fey Teleportation"],
		"Wood Half-Elf": ["Wood Elf Magic"],
		"Half-Drow": ["Drow High Magic"],
		"Deep Gnome": ["Svirfneblin Magic"],
	};

	var racialFeatAliases = {
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

	var smallSizeFeat = "Squat Nimbleness";

	function updateRace() {
		var raceInput = $("#page1 [name='race']");
		var selectedRace = raceInput.val().trim();

		var selectedRaceLower = selectedRace.toLowerCase();

		// User selected a lineage
		if (lineageRaces.includes(selectedRaceLower)) {
			lineageRace = selectedRaceLower;
			formerRace = "";

			raceInput
				.val("")
				.attr("placeholder", "Pick former race");

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
			var lineageName =
				lineageRace.charAt(0).toUpperCase() + lineageRace.slice(1);

			var formerName = formerRace
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

		updateRacialFeat();
	}


	function updateRacialFeat() {
		var raceName = $("#page1 [name='race']").val().trim();

		// Lineages inherit racial feats from their former race
		if (lineageRace && formerRace) {
			raceName = formerRace;
		}

		var normalizedRaceName = raceName.toLowerCase();
		var racialRuleNames = Object.keys(racialFeatRules).filter(function (key) {
			var normalizedRuleName = key.toLowerCase();
			return normalizedRaceName === normalizedRuleName
				|| normalizedRaceName.indexOf(normalizedRuleName + " ") === 0
				|| normalizedRaceName.endsWith(" " + normalizedRuleName);
		});
		var aliasedRule = racialFeatAliases[normalizedRaceName];

		if (aliasedRule && racialRuleNames.indexOf(aliasedRule) === -1) {
			racialRuleNames.push(aliasedRule);
		}

		var newRacialFeats = [];
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
		for (var i = 0; i < racialFeatCount; i++) {
			var slotNumber = i + 2;
			var slotName = "feat-slot-" + String(slotNumber).padStart(2, "0");
			var slot = $("#page1 [name='" + slotName + "']");

			slot.val("").trigger("change");
		}

		// Remove old Squat Nimbleness
		if (smallSizeFeatSlot !== null) {
			var oldSmallSlotName =
				"feat-slot-" + String(smallSizeFeatSlot).padStart(2, "0");

			$("#page1 [name='" + oldSmallSlotName + "']")
				.val("")
				.trigger("change");

			smallSizeFeatSlot = null;
		}

		racialFeatValue = newRacialFeats;
		racialFeatCount = newRacialFeats.length;

		// Add racial feats starting at slot 2
		for (var i = 0; i < racialFeatCount; i++) {
			var slotNumber = i + 2;
			var slotName = "feat-slot-" + String(slotNumber).padStart(2, "0");
			var slot = $("#page1 [name='" + slotName + "']");

			slot.val(newRacialFeats[i]).trigger("change");
		}

		// Add Squat Nimbleness after all racial feats if the character is Small
		var sizeValue = $("#page1 [name='charSize']").val().trim().toLowerCase();

		if (sizeValue === "small" && newRacialFeats.indexOf(smallSizeFeat) === -1) {
			smallSizeFeatSlot = racialFeatCount + 2;

			var smallSlotName =
				"feat-slot-" + String(smallSizeFeatSlot).padStart(2, "0");

			$("#page1 [name='" + smallSlotName + "']")
				.val("Squat Nimbleness")
				.trigger("change");
		}
	}

	$("#page1 [name='race']").on("change", function () {
		updateRace();
	});

	$("#page1 [name='charSize']").on("input change", updateRacialFeat);


	var magicItemInput = null;
	var magicItemSuggestionIndex = -1;
	var magicItemSuggestions = $("<div class='magic-item-suggestions' role='listbox'></div>").appendTo("body");

	function positionMagicItemSuggestions() {
		if (!magicItemInput) {
			return;
		}

		var inputBounds = magicItemInput.getBoundingClientRect();
		var menuWidth = Math.min(Math.max(inputBounds.width, 240), 360);
		var left = Math.max(8, Math.min(inputBounds.left, window.innerWidth - menuWidth - 8));
		var maxHeight = Math.max(80, Math.min(240, window.innerHeight - inputBounds.bottom - 8));

		magicItemSuggestions.css({
			left: left + "px",
			top: inputBounds.bottom + 2 + "px",
			width: menuWidth + "px",
			maxHeight: maxHeight + "px",
		});
	}

	function showMagicItemSuggestions(input) {
		var listId = $(input).attr("data-suggestion-list");
		var inputValue = $(input).val().trim();
		var query = inputValue.toLowerCase();
		var list = $("#" + listId);
		var groups = list.children("optgroup");
		var suggestionCount = 0;
		var selectedClasses = [];

		if ($(input).hasClass("class-name-input")) {
			var classOptions = list.find("option").map(function () {
				return $(this).val();
			}).get();
			selectedClasses = $("#page1 .class-name-input").not(input).map(function () {
				return $(this).val().trim();
			}).get().filter(function (className) {
				return classOptions.indexOf(className) !== -1;
			});
		}

		magicItemInput = input;
		magicItemSuggestionIndex = -1;
		magicItemSuggestions.empty();

		function appendSuggestion(option) {
			var suggestion = $("<button type='button' class='magic-item-suggestion' role='option'></button>")
				.text(option.val());
			magicItemSuggestions.append(suggestion);
			suggestionCount++;
		}

		if (groups.length > 0) {
			groups.each(function () {
				var group = $(this);
				var options = group.children("option").filter(function () {
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
				var optionValue = $(this).val();
				return optionValue.toLowerCase().indexOf(query) !== -1
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

		var input = $(magicItemInput);
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
		var suggestions = magicItemSuggestions.children("button");
		magicItemSuggestionIndex = Math.max(0, Math.min(index, suggestions.length - 1));
		suggestions.removeClass("highlighted").attr("aria-selected", "false");
		suggestions.eq(magicItemSuggestionIndex).addClass("highlighted").attr("aria-selected", "true");
	}

	$("#page1 [name='background']").on("input change", updateBackgroundFeat);
	$("#page1 [name='feat-slot-01']").on("change", function () {
		if (backgroundFeatMode !== "choice") {
			return;
		}

		var selectedFeat = $(this).val().trim();
		var listId = $(this).attr("data-suggestion-list");
		var isValidChoice = $("#" + listId + " option").filter(function () {
			return $(this).val() === selectedFeat;
		}).length > 0;

		if (isValidChoice) {
			backgroundFeatValue = selectedFeat;
		} else if (selectedFeat !== backgroundFeatValue) {
			$(this).val(backgroundFeatValue).trigger("change");
		}
	});

	var suggestionFieldSelector = "input[data-suggestion-list], textarea[data-suggestion-list]";
	$("#page1").on("focus", suggestionFieldSelector, function () {
		showMagicItemSuggestions(this);
	});
	$("#page1").on("input", suggestionFieldSelector, function () {
		showMagicItemSuggestions(this);
	});
	$("#page1").on("keydown", suggestionFieldSelector, function (event) {
		var suggestions = magicItemSuggestions.children("button");

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
		updateModifier(this);
		updateInitiative();
		updateSavingThrows();
		updateSkills();
		updateArmorCalculations();
	});

	$("#page1 .scores .score input").each(function () {
		updateModifier(this);
	});
	updateInitiative();

	$("#page1 .saves").on("change", "input[type='checkbox']", updateSavingThrows);
	$("#page1 .skills").on("change", "input[type='checkbox']", updateSkills);
	$("#page1 .class-level-pairs").on("input change", ".class-name-input", function () {
		updateSelectedClass(this);
		updateClassSavingThrows();
		updateFeatures();
	});
	$("#page1 .class-level-pairs").on("input change", ".class-level-input", function () {
		updateProficiencyBonus();
		updateFeatures();
	});
	$("#page1 .class-level-pairs").on("input change", ".subclass-name-input", updateFeatures);
	$("#page1 .hitdice").on("change", ".hit-die-checks input[type='checkbox']", function () {
		storeHitDieCheckbox(this);
	});
	$("#page1 [name='armor-type'], #page1 [name='armor-shield']").on("change", updateArmorCalculations);
	$("#page1 [name='armor-ac-bonus']").on("input", updateArmorCalculations);
	$("#page1 [name='speed']").on("input", function () {
		baseSpeedValue = $(this).val().trim();
		localStorage.setItem("page1_baseSpeed", JSON.stringify(baseSpeedValue));
	});
	$("#page1 [name='speed']").on("change", updateArmorCalculations);
	$("#page1 [name='attunement-slots']").on("input change", updateAttunementSlots);
	updateBackgroundFeat();
	updateClassLevelFields();
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
