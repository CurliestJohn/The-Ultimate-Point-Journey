let RESOURCES = {
	points: {
		name: "Points",
		get value() {
			return player.points
		},
		set value(x) {
			player.points = x
		},

		production() {
			return 0.1
		}
	},
	point_fragments: {
		name: "Point Fragments",
		get value() {
			return player.fragments.amt
		},
		set value(x) {
			player.fragments.amt = x
		},

		production() {
			return 0
		}
	},
	glass_fragments: {
		name: "Glasskites",
		get value() {
			return player.fragments.glass
		},
		set value(x) {
			player.fragments.glass = x
		},

		production() {
			return 0
		}
	},
	glass_flux: {
		name: "Glasskite Flux",
		get value() {
			return player.fragments.flux
		},
		set value(x) {
			player.fragments.flux = x
		},

		production() {
			return 0
		}
	},
	shatter_luck: {
		name: "Shatter Luck",
		get value() {
			return player.fragments.luck
		},
		set value(x) {
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

		let h = `<b>${(Math.floor(RESOURCES[i].value * 100) / 100).toFixed(2)}</b> ${RESOURCES[i].name}`
		if (prod > 0) h += ` (+${prod.toFixed(1)}/s)`
		setHTML("curr_inner_" + i, h)
	}
}