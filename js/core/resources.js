let RESOURCES = {
	points: {
		name: "Points",
		get amt() {
			return player.points
		},
		set amt(x) {
			player.points = x
		},

		production() {
			let x = player.upgs.f4 ? 0.15 : 0.1
			if (player.chronics.onUse.includes(2)) x /= 2
			return x
		}
	},
	point_fragments: {
		name: "Point Fragments",
		get amt() {
			return player.fragments.amt
		},
		set amt(x) {
			player.fragments.amt = x
		},

		production() {
			return 0
		}
	},
	shatter_luck: {
		name: "Shatter Luck",
		get amt() {
			return player.fragments.luck
		},
		set amt(x) {
			player.fragments.luck = x
		},

		production() {
			return (temp.upgs.f2 * temp.upgs.f3 + temp.passive[1])
		}
	},

	// Chronics
	chronite: {
		name: "Chronites",
		color: "#b0f",
		get amt() {
			return player.chronics.flux
		},
		set amt(x) {
			player.chronics.flux = Math.max(x, 0)
		},

		production() {
			return player.chronics.speed ? -1 : 0
		}
	},
	asc_perk: {
		name: "Ascensions",
		color: "#b0f",
		get amt() {
			return Math.floor((temp.plane - 1) * (player.upgs.f7 ? 1.5 : 1) - temp.upgs.a1 - temp.upgs.a2 * 1.5)
		},
		set amt(x) {

		}
	},
}

let RES_DISP = {
	init() {
		for (let i in RESOURCES) setHTML("curr_" + i, `<img src="img/${i}.png"></img> <span id='curr_inner_${i}'></span>`)
	},
	update(i) {
		let prod = temp.production[i]
		let frag = temp.frag.chance[i]

		let h = `<b style='color: ${RESOURCES[i].color}'>${((RESOURCES[i].amt * 100) / 100).toFixed(2)}</b> ${RESOURCES[i].name}`
		if (frag) h += ` (${Math.min(RESOURCES.shatter_luck.amt * 100 / frag, 100).toFixed(1)}%/shatter)`
		if (prod > 0) h += ` (+${prod.toFixed(1)}/s)`

		setHTML("curr_inner_" + i, h)
	}
}