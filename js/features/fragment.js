let FRAGMENT = {
	// Data
	types: {
		glass_fragments: {
			name:   "Remnants",
			old_id: "glass",
			chance: 10,
			mult:   () => 1
		},
		chronite: {
			name:   "Chronites",
			color:  "#b0f",
			chance: 100,
			mult:   () => player.upgs.f5 ? .75 : .5
		},
		shiny_pure: {
			name:   "Purified Fragments",
			color:  "#fb0",
			chance: 2e3,
			mult:   () => 0.1
		},
		/*shiny_radiant: {
			name:   "Radiant Essences",
			color:  "#fb0",
			chance: 1e5,
			mult:   () => 1
		},*/
	},
	groups: {
		shiny: {
			name:       "Shiny",
			unl:        () => player.chronics.plane >= 2,
			group_luck: () => temp.upgs.a2 ?? 1,
			res:        ["shiny_pure"/*, "shiny_radiant"*/]
		}
	},

	// Calculations
	reqToShatter() {
		return temp.upgs.f1 + temp.upgs.a1
	},

	// Functions
	exchange() {
		if (RESOURCES.point_fragments.amt < 6) return
		RESOURCES.point_fragments.amt -= 6
		RESOURCES.points.amt += 2
	},
	shatter(amt = 1, reset) {
		// Add resources!
		var req = this.reqToShatter()
		var luck = RESOURCES.shatter_luck.amt / amt
		var factor = Math.max(amt / 50, 1)

		for (let i = 0; i < Math.min(amt, 50); i++) {
			var local = 2 + Math.random()
			var rng = luck / Math.random()

			RESOURCES.point_fragments.amt += local * factor * req
			for (let [j, ch] of Object.entries(temp.frag.chance)) {
				if (rng > ch) RESOURCES[j].amt += local * factor * temp.frag.mult[j]
			}
		}

		// Resets!
		RESOURCES.shatter_luck.amt = temp.upgs.f6
		if (reset) {
			RESOURCES.points.amt -= amt * req
			player.chronics.onUse = []
		}
	},

	//Misc
	init() {
		// Setup Flavors
		let h = ``
		for (let [i, j] of Object.entries(FRAGMENT.groups)) {
			let h2 = ``
			for (let i2 of j.res) h2 += `<p id="curr_${i2}"></p>`

			h += `<td id="flavor_${i}" style='width: 400px; vertical-align: 0'>
				<h2>${j.name}</h2>
				<button id="flavor_${i}_boost" onclick="player.fragments.flavor_charge = '${i}'">Focus (2x luck)</button>
				${h2}
			</td>`
		}
		setHTML("flavors", h)

		// Setup Resources for Fragments
		for (let [i, j] of Object.entries(FRAGMENT.types)) {
			if (RESOURCES[i] !== undefined) continue

			let id = j.old_id ?? i
			RESOURCES[i] = {
				name:  j.name,
				color: j.color,
				get amt() {
					return isNaN(player.fragments[id]) ? 0 : player.fragments[id]
				},
				set amt(x) {
					player.fragments[id] = x
				}
			}
		}
	},
	temp() {
		let frag = temp.frag = {}

		frag.mult = {}
		frag.chance = {}
		for (let [i, j] of Object.entries(FRAGMENT.types)) {
			frag.mult[i]   = j.mult()
			frag.chance[i] = j.chance
		}

		for (let i of Object.values(FRAGMENT.groups)) {
			var mult = i.unl() ? i.group_luck() : 0
			if (player.fragments.flavor_charge == i) mult *= 2

			for (let j of i.res) frag.chance[j] /= mult
		}
	},
	tick() {
		var point_floor = Math.floor(RESOURCES.points.amt / this.reqToShatter())
		if (point_floor == 0) return

		this.shatter(point_floor, true)
	},
	html() {
		RES_DISP.update("point_fragments")
		RES_DISP.update("glass_fragments")
		RES_DISP.update("shatter_luck")
		UPG_FEATURE.dispGroup("frag")

		for (let [i, j] of Object.entries(FRAGMENT.groups)) {
			let unl = j.unl()
			switchEl("flavor_" + i, unl)
			if (!unl) continue

			setEl(`flavor_${i}_boost`, player.fragments.flavor_charge == i ? "bought" : "")
			for (let i2 of j.res) RES_DISP.update(i2)
		}
	}
}