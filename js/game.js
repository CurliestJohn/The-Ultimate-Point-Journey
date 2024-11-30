/* DATA */
let temp = {}
let player = SAVING.get_new_save()

/* TICKS */
function game_tick(dt) {
	//Gain all currencies
	for (var [i, j] of Object.entries(RESOURCES)) j.amt += temp.production[i] * dt
	FRAGMENT.tick()
}

function html_tick() {
	RES_DISP.update("points")
	setHTML("shatter_req", `Need ${FRAGMENT.reqToShatter()} points to shatter.`)

	TABS.tabs[TABS.in].update()
}

function temp_tick() {
	UPG_FEATURE.update()
	CHRONICS.updateTemp()

	temp.production = {}
	for (var [i, j] of Object.entries(RESOURCES)) temp.production[i] = j.production !== undefined ? j.production() : 0

	temp.frag_mult = {}
	for (var [i, j] of Object.entries(FRAGMENT.mult)) temp.frag_mult[i] = j()
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