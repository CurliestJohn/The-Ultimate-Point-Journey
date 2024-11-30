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
			return temp.upgs.f2 * temp.upgs.f3 + temp.passive[1]
		}
	},
	glass_fragments: {
		name: "Glasskites",
		get amt() {
			return player.fragments.glass
		},
		set amt(x) {
			player.fragments.glass = x
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
			player.chronics.flux = x
		}
	},
	asc_perk: {
		name: "Ascensions",
		color: "#b0f",
		get amt() {
			return Math.floor((temp.upgs.new_part + 1) / 3 - temp.upgs.a1)
		},
		set amt(x) {

		}
	},
	/*asc_luck: {
		name: "Ascensional Luck",
		color: "#b0f",
		get amt() {
			return 1
		},
		set amt(x) {
			
		}
	},*/
}

let RES_DISP = {
	init() {
		for (var i in RESOURCES) setHTML("curr_" + i, `<img src="img/${i}.png"></img> <span id='curr_inner_${i}'></span>`)
	},
	update(i) {
		let prod = temp.production[i]
		let frag = FRAGMENT.chances[i]

		let h = `<b style='color: ${RESOURCES[i].color}'>${((RESOURCES[i].amt * 100) / 100).toFixed(2)}</b> ${RESOURCES[i].name}`
		if (frag) h += ` (${Math.min(RESOURCES.shatter_luck.amt * 100 / frag, 100).toFixed(1)}%/shatter)`
		if (prod > 0) h += ` (+${prod.toFixed(1)}/s)`

		setHTML("curr_inner_" + i, h)
	}
}