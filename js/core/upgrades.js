let UPGRADES = {
	f1: {
		desc: "Increase points needed to shatter.",

		effect: (lvl) => lvl + 1,
		effect_disp: (i) => i.toFixed(0),
		cost: (lvl) => (2 ** lvl) * 5,
		cost_res: "point_fragments"
	},
	f2: {
		desc: "Generate Shatter Luck, resets on shatter.",

		effect: (lvl) => lvl * 0.1,
		effect_disp: (i) => i.toFixed(1) + "/s",
		cost: (lvl) => (3 ** lvl) * 10,
		cost_res: "point_fragments"
	},
	f3: {
		desc: "Gain more Shatter Luck.",

		effect: (lvl) => lvl * 0.5 + 1,
		effect_disp: (i) => i.toFixed(1) + "x",
		cost: (lvl) => (3 ** lvl) * 2,
		cost_res: "glass_fragments"
	},
	f4: {
		desc: "Gain 1.5x more Points.",

		cost: (lvl) => 5,
		once: true,
		cost_res: "points"
	},
	f5: {
		desc: "Gain more Chronites.",

		effect: (lvl) => lvl / 2 + 1,
		effect_disp: (i) => i.toFixed(1) + "x",
		cost: (lvl) => (5 ** lvl) * 50,
		cost_res: "glass_fragments"
	},
	f6: {
		desc: "Unlock Flavors.",

		cost: (lvl) => 5,
		once: true,
		cost_res: "points"
	},
	f7: {
		desc: "Bank Points per Shatter.",

		effect: (lvl) => lvl,
		effect_disp: (i) => "+" + i + "/shatter",
		cost: (lvl) => 100,
		once: true,
		cost_res: "points"
	},

	new_part: {
		desc: "New Part+",

		effect: (lvl) => lvl,
		effect_disp: (i) => `Did ${i} total parts!`,
		cost: (lvl) => (2 + lvl) ** 2,
		cost_res: "chronite"
	},
	a1: {
		desc: "Ascend: Points",

		effect: (lvl) => lvl,
		effect_disp: (i) => `+${i} point threshold`,
		cost: (lvl) => 1,
		cost_res: "asc_perk"
	}
}

let UPG_GROUP = {
	frag: ["f1", "f2", "f3", "f4", "f5"],
	asc: ["a1"],
	new_part: ["new_part"]
}

let UPG_FEATURE = {
	//Upgrades
	buy(i) {
		let upg = UPGRADES[i]
		let res = RESOURCES[upg.cost_res]
		let cost = upg.cost(player.upgs[i] || 0)

		if (upg.once && player.upgs[i] != undefined) return
		if (res.amt < cost) return
		res.amt -= cost
		player.upgs[i] = (player.upgs[i] || 0) + 1
	},

	//HTML
	init() {
		for (var [i, j] of Object.entries(UPG_GROUP)) {
			let h = ``
			for (var k of j) h += `<button id="upg_${k}" onclick="UPG_FEATURE.buy('${k}')"></button><br>`

			setHTML("upgs_" + i, h)
		}
	},
	update() {
		let upg_t = temp.upgs = {}
		for (var [i, j] of Object.entries(UPGRADES)) if (j.effect !== undefined) upg_t[i] = j.effect(player.upgs[i] || 0)
	},
	dispGroup(i) {
		for (var k of UPG_GROUP[i]) UPG_FEATURE.disp(k)
	},
	disp(i) {
		let upg = UPGRADES[i]
		let cost = upg.cost(player.upgs[i] || 0)
		let max = upg.once && player.upgs[i] != undefined
		
		let h = `<b>${upg.desc}</b><br>`
		if (upg.effect !== undefined) h += `Effect: ${upg.effect_disp(temp.upgs[i])}<br>`
		if (!max) h += `Cost: ${cost.toFixed(1)} ${RESOURCES[upg.cost_res].name}`

		setHTML("upg_" + i, h)
		setEl("upg_" + i, max ? "upg bought" : RESOURCES[upg.cost_res].amt < cost ? "upg locked" : "upg")
	}
}