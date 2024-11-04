let UPGRADES = {
	f1: {
		desc: "Increase points needed to shatter.",

		effect: (lvl) => lvl + 1,
		cost: (lvl) => (2 ** lvl) * 5,
		cost_res: "point_fragments"
	},
	f2: {
		desc: "Generate Shatter Luck, resets on shatter.",

		effect: (lvl) => lvl * 0.1,
		cost: (lvl) => (3 ** lvl) * 10,
		cost_res: "point_fragments"
	},
	f3: {
		desc: "Gain more Shatter Luck.",

		effect: (lvl) => lvl * 0.5 + 1,
		cost: (lvl) => 2 ** lvl,
		cost_res: "glass_fragments"
	}
}

let UPG_FEATURE = {
	update() {
		let upg_t = temp.upgs = {}

		for (var [i, j] of Object.entries(UPGRADES)) upg_t[i] = j.effect(player.upgs[i] || 0)
	},
	buy(i) {
		let upg = UPGRADES[i]
		let res = RESOURCES[upg.cost_res]
		let cost = upg.cost(player.upgs[i] || 0)

		if (res.value < cost) return
		res.value -= cost
		player.upgs[i] = (player.upgs[i] || 0) + 1
	},
	disp(i) {
		let upg = UPGRADES[i]
		let cost = upg.cost(player.upgs[i] || 0)

		setHTML("upg_" + i, `
			<b>${upg.desc}</b><br>
			Effect: ${temp.upgs[i].toFixed(1)}<br>
			Cost: ${cost.toFixed(1)} ${RESOURCES[upg.cost_res].name}
		`)
		setEl("upg_" + i, RESOURCES[upg.cost_res].value < cost ? "upg locked" : "upg")
	}
}