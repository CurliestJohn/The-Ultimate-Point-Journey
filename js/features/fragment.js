let FRAGMENT = {
	// Data
	chances: {
		glass_fragments: 50,
		chronite: 500
	},
	mult: {
		glass_fragments: () => 1,
		chronite: () => temp.upgs.f5,
	},

	// Calculations
	reqToShatter() {
		return temp.upgs.f1 + temp.passive[0]
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

		for (var i = 0; i < Math.min(amt, 50); i++) {
			var local = 2 - Math.log2(Math.random())
			var rng = luck / Math.random()

			RESOURCES.point_fragments.amt += local * factor * req
			for (var [j, ch] of Object.entries(FRAGMENT.chances)) {
				if (rng > ch) RESOURCES[j].amt += local * factor * temp.frag_mult[j]
			}
		}

		// Resets!
		RESOURCES.shatter_luck.amt = 0
		RESOURCES.points.amt = reset ? 0 : RESOURCES.points.amt - amt * req
		player.chronics.onUse = []
	},
	tick() {
		var point_floor = Math.floor(RESOURCES.points.amt / this.reqToShatter())
		if (point_floor == 0) return

		this.shatter(point_floor, false)
	}
}