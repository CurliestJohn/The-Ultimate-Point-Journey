let FRAGMENT = {
	// Data
	chances: {
		glass_fragments: 50,
		glass_flux: 500
	},

	// Functions
	exchange() {
		if (RESOURCES.point_fragments.amt < 6) return
		RESOURCES.point_fragments.amt -= 6
		RESOURCES.points.amt += 2
	},
	tick() {
		var point_req = temp.upgs.f1
		var point_floor = Math.floor(RESOURCES.points.amt / point_req)
		if (point_floor == 0) return

		// Add resources!
		var luck = RESOURCES.shatter_luck.amt / point_floor
		var factor = Math.max(point_floor / 10, 1)
		RESOURCES.shatter_luck.amt = 0
		RESOURCES.points.amt -= point_floor * point_req

		for (var i = 0; i < Math.min(point_floor, 10); i++) {
			var local = 2 - Math.log2(Math.random()) * factor
			var rng = luck / Math.random()

			RESOURCES.point_fragments.amt += local * point_req
			for (var [i, j] of Object.entries(RESOURCES)) {
				var frag = FRAGMENT.chances[i]
				if (frag !== undefined && rng > frag) RESOURCES[i].amt += local
			}
		}
	}
}