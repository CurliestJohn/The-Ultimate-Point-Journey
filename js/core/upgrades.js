let UPGRADES = {
	f1: {
		desc: "Increase points needed to shatter.",

		effect: (lvl) => lvl / 2 + 1,
		effect_disp: (i) => i.toFixed(1),
		cost: (lvl) => (3 ** lvl) * 5,
		cost_res: "point_fragments"
	},
	f2: {
		desc: "Generate Shatter Luck, resets on shatter.",

		effect: (lvl) => lvl * 0.1,
		effect_disp: (i) => i.toFixed(1) + "/s",
		cost: (lvl) => (10 ** lvl) * 10,
		cost_res: "point_fragments"
	},
	f3: {
		desc: "Gain more Shatter Luck.",

		effect: (lvl) => lvl / 4 + 1,
		effect_disp: (i) => i.toFixed(2) + "x",
		cost: (lvl) => 5 ** lvl,
		cost_res: "glass_fragments",
		max: 4
	},
	f5: {
		desc: "1.5x Chronites gain.",

		unl: _ => player.chronics.unl,
		cost: (lvl) => 75,
		once: true,
		cost_res: "glass_fragments"
	},
	f6: {
		desc: "Start at more Shatter Luck.",

		effect: (lvl) => lvl * 10,
		effect_disp: (i) => "+" + i,

		unl: _ => FRAGMENT.groups.shiny.unl(),
		cost: (lvl) => 2 ** lvl,
		cost_res: "shiny_pure"
	},
	f7: {
		desc: "1.5x Ascend Quality [soon]",

		unl: _ => FRAGMENT.groups.shiny.unl(),
		cost: (lvl) => 1/0,
		once: true,
		cost_res: "shiny_pure"
	},

	a1: {
		desc: "Ascend: Points",

		effect: (lvl) => lvl / 2,
		effect_disp: (i) => `+${i.toFixed(1)} point threshold`,
		cost: (lvl) => 1,
		cost_res: "asc_perk"
	},
	a2: {
		desc: "Ascend: Luck",

		effect: (lvl) => lvl * 2.5,
		effect_disp: (i) => `+${i.toFixed(1)} cap to Shatter Luck.`,
		cost: (lvl) => 1,
		cost_res: "asc_perk"
	}
}

let UPG_GROUP = {
	frag: ["f1", "f2", "f3", "f5", "f6", "f7"],
	asc: ["a1", "a2"]
}

let UPG_FEATURE = {
	//Upgrades
	buy(i) {
		if (this.isMaxed(i)) return

		let upg = UPGRADES[i]
		let res = RESOURCES[upg.cost_res]
		let cost = upg.cost(player.upgs[i] || 0)
		if (res.amt < cost) return

		res.amt -= cost
		player.upgs[i] = (player.upgs[i] || 0) + 1
	},
	isMaxed(i) {
		let upg = UPGRADES[i]
		if (upg.once && player.upgs[i] != undefined) return true
		if (upg.max && player.upgs[i] >= upg.max) return true
	},

	//HTML
	init() {
		for (let [i, j] of Object.entries(UPG_GROUP)) {
			let h = ``
			for (let k of j) h += `<button id="upg_${k}" onclick="UPG_FEATURE.buy('${k}')"></button><br>`

			setHTML("upgs_" + i, h)
		}
	},
	update() {
		let upg_t = temp.upgs = {}
		for (let [i, j] of Object.entries(UPGRADES)) {
			let upg_lvl = player.upgs[i] || 0
			if (i.max) upg_lvl = Math.min(upg_lvl, i.max)

			if (j.effect !== undefined) upg_t[i] = j.effect(upg_lvl)
		}
	},
	dispGroup(i) {
		for (let k of UPG_GROUP[i]) UPG_FEATURE.disp(k)
	},
	disp(i) {
		let upg = UPGRADES[i]
		let unl = upg.unl !== undefined ? upg.unl() : true
		switchEl("upg_" + i, unl)

		if (!unl) return
		let cost = upg.cost(player.upgs[i] || 0)
		let max = this.isMaxed(i)
		
		let h = `<b>${upg.desc}</b><br>`
		if (upg.effect !== undefined) h += `Effect: ${upg.effect_disp(temp.upgs[i])}<br>`
		if (!max) h += `Cost: ${cost.toFixed(1)} ${RESOURCES[upg.cost_res].name}`

		setHTML("upg_" + i, h)
		setEl("upg_" + i, max ? "upg bought" : RESOURCES[upg.cost_res].amt < cost ? "upg locked" : "upg")
	}
}