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
	for (var [i, j] of Object.entries(RESOURCES)) j.amt += temp.production[i] * dt
	FRAGMENT.tick()
}

function html_tick() {
	RES_DISP.update("points")
	TABS.tabs[TABS.in].update()
}

function temp_tick() {
	UPG_FEATURE.update()

	temp.production = {}
	for (var [i, j] of Object.entries(RESOURCES)) temp.production[i] = j.production !== undefined ? j.production() : 0
}

function general_tick() {
	let now = Date.now()
	let dt = (now - player.last_update) / 1e3
	player.last_update = now

	temp_tick()
	game_tick(dt)
	html_tick()
}