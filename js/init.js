function init() {
	FRAGMENT.init()
	TABS.init()
	UPG_FEATURE.init()
	ACH_FUNC.init()
	RES_DISP.init()

	//Load game
	let save = localStorage.getItem("tupj_save")
	if (save != null) SAVING.load(save)

	hideEl("loading")
	showEl("game")
	general_tick()

	setInterval(general_tick, 100)
	setInterval(second_tick, 1000)
	setInterval(SAVING.save, 3e4)
}