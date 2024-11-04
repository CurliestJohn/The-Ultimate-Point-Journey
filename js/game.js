/* DATA */
let temp = {}
let player = {
	points: 0,
	upgs: {},

	fragments: {
		amt: 0,
		luck: 0,
		glass: 0,
		flux: 0
	},

	last_update: Date.now()
}

/* TICKS */
function game_tick(dt) {
	//Gain all currencies
	for (var [i, j] of Object.entries(RESOURCES)) j.value += temp.production[i] * dt

	//Points to Fragments
	var point_req = temp.upgs.f1
	var point_floor = Math.floor(RESOURCES.points.value / point_req)
	if (point_floor > 0) {
		var rng_res = "", rng = RESOURCES.shatter_luck.value / Math.random()
		if (rng > 50)  rng_res = "glass_fragments"
		if (rng > 500) rng_res = "glass_flux"
		RESOURCES.shatter_luck.value = 0

		// Add resources!
		var toAdd = 0
		for (var i = 0; i < Math.min(point_floor, 10); i++) toAdd += 2 - Math.log2(Math.random())

		// Determine factors.
		var factor = Math.max(point_floor / 10, 1)
		RESOURCES.points.value -= point_floor * point_req
		RESOURCES.point_fragments.value += toAdd * factor * point_req
		if (rng_res) RESOURCES[rng_res].value += toAdd * factor
	}
}

function html_tick() {
	RES_DISP.update("points")
	TABS.tabs[TABS.in].update()
}

function temp_tick() {
	UPG_FEATURE.update()

	temp.production = {}
	for (var [i, j] of Object.entries(RESOURCES)) temp.production[i] = j.production()
}

function general_tick() {
	let now = Date.now()
	let dt = (now - player.last_update) / 1e3
	player.last_update = now

	temp_tick()
	game_tick(dt)
	html_tick()
}