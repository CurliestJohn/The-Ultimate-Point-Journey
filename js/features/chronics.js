let CHRONICS = {
	cast(i) {
		if (i == 0 && !player.chronics.onUse.includes(0) && RESOURCES.chronite.amt >= 3) {
			player.chronics.onUse.push(0)
			RESOURCES.chronite.amt -= 3
			FRAGMENT.shatter(1, false)
		}
		if (i == 1 && !player.chronics.onUse.includes(1) && RESOURCES.chronite.amt >= 4) {
			player.chronics.onUse.push(1)
			RESOURCES.chronite.amt -= 4
		}
		if (i == 2 && !player.chronics.onUse.includes(2) && RESOURCES.chronite.amt >= 5) {
			player.chronics.onUse.push(2)
			player.chronics.plane++
			RESOURCES.asc_perk.amt++
			RESOURCES.chronite.amt -= 5
		}
	},

	html() {
		RES_DISP.update("chronite")
		if (!player.chronics.unl) return

		//Abilities
		setEl("ch_ability_0",  player.chronics.onUse.includes(0) ? "upg bought" : RESOURCES.chronite.amt < 3 ? "upg locked" : "upg")
		setEl("ch_ability_1",  player.chronics.onUse.includes(1) ? "upg bought" : RESOURCES.chronite.amt < 4 ? "upg locked" : "upg")
		setEl("ch_ability_2",  player.chronics.onUse.includes(2) ? "upg bought" : RESOURCES.chronite.amt < 5 ? "upg locked" : "upg")

		//Chronology
		setHTML("ch_episode", "Plane " + player.chronics.plane)

		RES_DISP.update("asc_perk")
		UPG_FEATURE.dispGroup("asc")
	}
}