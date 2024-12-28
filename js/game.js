/* DATA */
let temp = {}
let player = SAVING.get_new_save()

/* TICKS */
function game_tick(dt) {
	player.stats.time += dt

	//Handle Speedup
	if (player.chronics.speed) {
		let max = Math.min(RESOURCES.chronite.amt, dt)
		if (max == RESOURCES.chronite.amt) {
			RESOURCES.chronite.amt = 0
			player.chronics.speed  = !player.chronics.speed
		}

		RESOURCES.points.amt          += temp.production.points       * max
		RESOURCES.points.shatter_luck += temp.production.shatter_luck * max
	}

	//Gain all currencies
	for (let [i, j] of Object.entries(RESOURCES)) j.amt += temp.production[i] * dt

	//Features
	player.stats.best = Math.max(player.stats.best, Math.min(RESOURCES.points.amt, FRAGMENT.reqToShatter()))
	FRAGMENT.tick()
}

function html_tick() {
	RES_DISP.update("points")
	setHTML("shatter_req", `Need ${FRAGMENT.reqToShatter()} points to shatter.`)

	TABS.tabs[TABS.in].update()
}

function temp_tick() {
	UPG_FEATURE.update()
	CHRONICS.temp()

	temp.production = {}
	for (let [i, j] of Object.entries(RESOURCES)) temp.production[i] = j.production !== undefined ? j.production() : 0

	FRAGMENT.temp()
}

function general_tick() {
	let now = Date.now()
	let dt = player.last_update ? (now - player.last_update) / 1e3 : 0
	player.last_update = now

	temp_tick()
	game_tick(dt)
	html_tick()
}

// One Second Ticks
function second_tick() {
	ACH_FUNC.perSec()
	if (RESOURCES.chronite.amt > 0) player.chronics.unl = true

	//HTML
	switchEl("div_chronics", player.chronics.unl)
	switchEl("unl_chronics", !player.chronics.unl)
}