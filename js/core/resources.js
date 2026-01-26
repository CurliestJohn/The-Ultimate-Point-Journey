let RESOURCES = {
	points: {
		name: "Points",
		get amt() {
			return player.points
		},
		set amt(x) {
			player.points = Math.max(x, 0)
		},

		production() {
			let x = 0.1
			if (player.chronics.onUse.includes(1)) x *= 1.5
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
		}
	},
	shatter_luck: {
		name: "Shatter Luck",
		get amt() {
			return player.fragments.luck
		},
		set amt(x) {
			player.fragments.luck = Math.min(x, this.cap)
		},

		production() {
			let x = temp.upgs.f2 * temp.upgs.f3
			if (player.chronics.onUse.includes(1)) x *= 1.5
			return x
		},
		get cap() {
			return 20 + temp.upgs.a2
		},
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
	},
	asc_perk: {
		name: "Ascensions",
		color: "#b0f",
		get amt() {
			return player.chronics.ascends
		},
		set amt(x) {
			player.chronics.ascends = x
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

		let h = `<b style='color: ${RESOURCES[i].color}'>${Math.floor(RESOURCES[i].amt * 100) / 100}</b>`
		if (RESOURCES[i].cap > 0) h += ` / ${RESOURCES[i].cap}`

		h += ` ${RESOURCES[i].name}`
		if (frag) h += ` (${Math.min(RESOURCES.shatter_luck.amt * 100 / frag, 100).toFixed(1)}%/shatter)`
		if (prod > 0) h += ` (+${Math.floor(prod * 100) / 100}/s)`

		setHTML("curr_inner_" + i, h)
	}
}