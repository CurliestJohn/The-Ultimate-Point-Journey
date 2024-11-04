function init() {
	TABS.init()
	RES_DISP.init()

	hideEl("loading")
	showEl("game")

	general_tick()
	setInterval(general_tick, 100)
}