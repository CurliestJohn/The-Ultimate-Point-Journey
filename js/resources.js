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
			return 0.1
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
	glass_fragments: {
		name: "Glasskites",
		get amt() {
			return player.fragments.glass
		},
		set amt(x) {
			player.fragments.glass = x
		}
	},
	glass_flux: {
		name: "Glasskite Flux",
		get amt() {
			return player.fragments.flux
		},
		set amt(x) {
			player.fragments.flux = x
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
			return temp.upgs.f2 * temp.upgs.f3
		}
	},
}

let RES_DISP = {
	init() {
		for (var i in RESOURCES) setHTML("curr_" + i, `<img src="img/${i}.png"></img> <span id='curr_inner_${i}'></span>`)
	},
	update(i) {
		let prod = temp.production[i]
		let frag = FRAGMENT.chances[i]

		let h = `<b>${((RESOURCES[i].amt * 100) / 100).toFixed(2)}</b> ${RESOURCES[i].name}`
		if (frag) h += ` (${Math.min(RESOURCES.shatter_luck.amt * 100 / frag, 100).toFixed(1)}%/shatter)`
		if (prod > 0) h += ` (+${prod.toFixed(1)}/s)`

		setHTML("curr_inner_" + i, h)
	}
}