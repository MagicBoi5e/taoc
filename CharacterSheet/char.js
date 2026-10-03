
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
				3: [""],
				6: [""],
				14: [""],
			}
		},

		"College of Glamour": {
			features: {
				3: [""],
				6: [""],
				14: [""],
			}
		},

		"College of Lore": {
			features: {
				3: [""],
				6: [""],
				14: [""],
			}
		},

		"College of Spirits": {
			features: {
				3: [""],
				6: [""],
				14: [""],
			}
		},

		"College of Swords": {
			features: {
				3: [""],
				6: [""],
				14: [""],
			}
		},

		"College of Valor": {
			features: {
				3: [""],
				6: [""],
				14: [""],
			}
		},

		"College of Whispers": {
			features: {
				3: [""],
				6: [""],
				14: [""],
			}
		},

		//Cleric Subclasses//

		"Arcana Domain": {
			features: {
				1: [""],
				2: [""],
				6: [""],
				8: [""],
				17: [""],
			}
		},

		"Death Domain": {
			features: {
				1: [""],
				2: [""],
				6: [""],
				8: [""],
				17: [""],
			}
		},

		"Forge Domain": {
			features: {
				1: [""],
				2: [""],
				6: [""],
				8: [""],
				17: [""],
			}
		},

		"Grave Domain": {
			features: {
				1: [""],
				2: [""],
				6: [""],
				8: [""],
				17: [""],
			}
		},

		"Knowledge Domain": {
			features: {
				1: [""],
				2: [""],
				6: [""],
				8: [""],
				17: [""],
			}
		},

		"Life Domain": {
			features: {
				1: [""],
				2: [""],
				6: [""],
				8: [""],
				17: [""],
			}
		},

		"Light Domain": {
			features: {
				1: [""],
				2: [""],
				6: [""],
				8: [""],
				17: [""],
			}
		},

		"Nature Domain": {
			features: {
				1: [""],
				2: [""],
				6: [""],
				8: [""],
				17: [""],
			}
		},

		"Order Domain": {
			features: {
				1: [""],
				2: [""],
				6: [""],
				8: [""],
				17: [""],
			}
		},

		"Peace Domain": {
			features: {
				1: [""],
				2: [""],
				6: [""],
				8: [""],
				17: [""],
			}
		},

		"Tempest Domain": {
			features: {
				1: [""],
				2: [""],
				6: [""],
				8: [""],
				17: [""],
			}
		},

		"Trickery Domain": {
			features: {
				1: [""],
				2: [""],
				6: [""],
				8: [""],
				17: [""],
			}
		},

		"Twilight Domain": {
			features: {
				1: [""],
				2: [""],
				6: [""],
				8: [""],
				17: [""],
			}
		},

		"War Domain": {
			features: {
				1: [""],
				2: [""],
				6: [""],
				8: [""],
				17: [""],
			}
		},

		//Druid Subclasses//

		"Circle of Dreams": {
			features: {
				2: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		"Circle of Spores": {
			features: {
				2: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		"Circle of Stars": {
			features: {
				2: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		"Circle of Land": {
			features: {
				2: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		"Circle of Moon": {
			features: {
				2: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		"Circle of Shepherd": {
			features: {
				2: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		"Circle of Wildfire": {
			features: {
				2: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		//Fighter Subclasses//

		"Arcane Archer": {
			features: {
				3: [""],
				7: [""],
				15: [""],
				18: [""],
			}
		},

		"Battle Master": {
			features: {
				3: [""],
				7: [""],
				15: [""],
				18: [""],
			}
		},

		"Cavalier": {
			features: {
				3: [""],
				7: [""],
				15: [""],
				18: [""],
			}
		},

		"Champion": {
			features: {
				3: [""],
				7: [""],
				15: [""],
				18: [""],
			}
		},

		"Eldritch Knight": {
			features: {
				3: [""],
				7: [""],
				15: [""],
				18: [""],
			}
		},

		"Psi Warrior": {
			features: {
				3: [""],
				7: [""],
				15: [""],
				18: [""],
			}
		},

		"Purple Dragon Knight": {
			features: {
				3: [""],
				7: [""],
				15: [""],
				18: [""],
			}
		},

		"Rune Knight": {
			features: {
				3: [""],
				7: [""],
				15: [""],
				18: [""],
			}
		},

		"Samurai": {
			features: {
				3: [""],
				7: [""],
				15: [""],
				18: [""],
			}
		},

		//Monk Subclasses//

		"Way of Mercy": {
			features: {
				3: [""],
				6: [""],
				11: [""],
				17: [""],
			}
		},

		"Way of Shadow": {
			features: {
				3: [""],
				6: [""],
				11: [""],
				17: [""],
			}
		},

		"Way of the Ascendant Dragon": {
			features: {
				3: [""],
				6: [""],
				11: [""],
				17: [""],
			}
		},

		"Way of the Astral Self": {
			features: {
				3: [""],
				6: [""],
				11: [""],
				17: [""],
			}
		},

		"Way of the Drunken Master": {
			features: {
				3: [""],
				6: [""],
				11: [""],
				17: [""],
			}
		},

		"Way of the Four Elements": {
			features: {
				3: [""],
				6: [""],
				11: [""],
				17: [""],
			}
		},

		"Way of the Kensei": {
			features: {
				3: [""],
				6: [""],
				11: [""],
				17: [""],
			}
		},

		"Way of the Long Death": {
			features: {
				3: [""],
				6: [""],
				11: [""],
				17: [""],
			}
		},

		"Way of the Open Hand": {
			features: {
				3: [""],
				6: [""],
				11: [""],
				17: [""],
			}
		},

		"Way of the Sun Soul": {
			features: {
				3: [""],
				6: [""],
				11: [""],
				17: [""],
			}
		},

		//Paladin Subclasses//

		"Oath of Conquest": {
			features: {
				3: [""],
				7: [""],
				15: [""],
				20: [""],
			}
		},

		"Oath of Devotion": {
			features: {
				3: [""],
				7: [""],
				15: [""],
				20: [""],
			}
		},

		"Oath of Glory": {
			features: {
				3: [""],
				7: [""],
				15: [""],
				20: [""],
			}
		},

		"Oath of Redemption": {
			features: {
				3: [""],
				7: [""],
				15: [""],
				20: [""],
			}
		},

		"Oath of the Ancients": {
			features: {
				3: [""],
				7: [""],
				15: [""],
				20: [""],
			}
		},

		"Oath of the Crown": {
			features: {
				3: [""],
				7: [""],
				15: [""],
				20: [""],
			}
		},

		"Oath of the Watchers": {
			features: {
				3: [""],
				7: [""],
				15: [""],
				20: [""],
			}
		},

		"Oath of Vengeance": {
			features: {
				3: [""],
				7: [""],
				15: [""],
				20: [""],
			}
		},

		"Oathbreaker": {
			features: {
				3: [""],
				7: [""],
				15: [""],
				20: [""],
			}
		},

		//Ranger Subclasses//

		"Beast Master": {
			features: {
				3: [""],
				7: [""],
				11: [""],
				15: [""],
			}
		},

		"Drakewarden": {
			features: {
				3: [""],
				7: [""],
				11: [""],
				15: [""],
			}
		},

		"Fey Wanderer": {
			features: {
				3: [""],
				7: [""],
				11: [""],
				15: [""],
			}
		},

		"Gloom Stalker": {
			features: {
				3: [""],
				7: [""],
				11: [""],
				15: [""],
			}
		},

		"Horizon Walker": {
			features: {
				3: [""],
				7: [""],
				11: [""],
				15: [""],
			}
		},

		"Hunter": {
			features: {
				3: [""],
				7: [""],
				11: [""],
				15: [""],
			}
		},

		"Monster Slayer": {
			features: {
				3: [""],
				7: [""],
				11: [""],
				15: [""],
			}
		},

		"Swarmkeeper": {
			features: {
				3: [""],
				7: [""],
				11: [""],
				15: [""],
			}
		},

		//Rogue Subclasses//

		"Arcane Trickster": {
			features: {
				3: [""],
				9: [""],
				13: [""],
				17: [""],
			}
		},

		"Assassin": {
			features: {
				3: [""],
				9: [""],
				13: [""],
				17: [""],
			}
		},

		"Inquisitive": {
			features: {
				3: [""],
				9: [""],
				13: [""],
				17: [""],
			}
		},

		"Mastermind": {
			features: {
				3: [""],
				9: [""],
				13: [""],
				17: [""],
			}
		},

		"Phantom": {
			features: {
				3: [""],
				9: [""],
				13: [""],
				17: [""],
			}
		},

		"Scout": {
			features: {
				3: [""],
				9: [""],
				13: [""],
				17: [""],
			}
		},

		"Soulknife": {
			features: {
				3: [""],
				9: [""],
				13: [""],
				17: [""],
			}
		},

		"Swashbuckler": {
			features: {
				3: [""],
				9: [""],
				13: [""],
				17: [""],
			}
		},

		"Thief": {
			features: {
				3: [""],
				9: [""],
				13: [""],
				17: [""],
			}
		},

		//Sorcerer Subclasses//

		"Aberrant Mind": {
			features: {
				1: [""],
				6: [""],
				14: [""],
				18: [""],
			}
		},

		"Clockwork Soul": {
			features: {
				1: [""],
				6: [""],
				14: [""],
				18: [""],
			}
		},

		"Divine Soul": {
			features: {
				1: [""],
				6: [""],
				14: [""],
				18: [""],
			}
		},

		"Draconic Bloodline": {
			features: {
				1: [""],
				6: [""],
				14: [""],
				18: [""],
			}
		},

		"Lunar Sorcery": {
			features: {
				1: [""],
				6: [""],
				14: [""],
				18: [""],
			}
		},

		"Shadow Magic": {
			features: {
				1: [""],
				6: [""],
				14: [""],
				18: [""],
			}
		},

		"Storm Sorcery": {
			features: {
				1: [""],
				6: [""],
				14: [""],
				18: [""],
			}
		},

		"Wild Magic": {
			features: {
				1: [""],
				6: [""],
				14: [""],
				18: [""],
			}
		},

		//Warlock Subclasses//

		"The Archfey": {
			features: {
				1: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		"The Celestial": {
			features: {
				1: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		"The Fathomless": {
			features: {
				1: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		"The Fiend": {
			features: {
				1: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		"The Genie": {
			features: {
				1: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		"The Great Old One": {
			features: {
				1: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		"The Hexblade": {
			features: {
				1: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		"The Undead": {
			features: {
				1: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		"The Undying": {
			features: {
				1: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		//Wizard Subclasses//

		"Bladesinging": {
			features: {
				2: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		"Order of Scribes": {
			features: {
				2: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		"School of Abjuration": {
			features: {
				2: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		"School of Conjuration": {
			features: {
				2: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		"School of Divination": {
			features: {
				2: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		"School of Enchantment": {
			features: {
				2: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		"School of Evocation": {
			features: {
				2: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		"School of Illusion": {
			features: {
				2: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		"School of Necromancy": {
			features: {
				2: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		"School of Transmutation": {
			features: {
				2: [""],
				6: [""],
				10: [""],
				14: [""],
			}
		},

		"War Magic": {
			features: {
				2: [""],
				6: [""],
				10: [""],
				14: [""],
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
			// We will connect this to the subclass field later.
		});

		// Apply feature replacements
		Object.keys(classFeatures).forEach(function (className) {
			classFeatures[className] = removeReplacedFeatures(
				classFeatures[className]
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

		// Find racial feat rule without depending on capitalization
		var racialRuleName = Object.keys(racialFeatRules).find(function (key) {
			return key.toLowerCase() === raceName.toLowerCase();
		});

		var newRacialFeats = racialRuleName
			? racialFeatRules[racialRuleName]
			: [];

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

		if (sizeValue === "small") {
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
