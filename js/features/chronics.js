let CHRONICS = {
	// Casting
	cast(i) {
		if (i == 0 && !player.chronics.onUse.includes(0) && RESOURCES.chronite.amt >= 1) {
			player.chronics.onUse.push(0)
			RESOURCES.chronite.amt -= 1
			FRAGMENT.shatter(1, true)
		}
		if (i == 1 && !player.chronics.onUse.includes(1) && RESOURCES.chronite.amt >= 2) {
			player.chronics.onUse.push(1)
			RESOURCES.chronite.amt -= 2
			player.last_update -= Math.max((FRAGMENT.reqToShatter() - RESOURCES.points.amt) / temp.production.points * 1000, 0)
		}
		if (i == 2 && !player.chronics.onUse.includes(2) && RESOURCES.chronite.amt >= 3) {
			player.chronics.onUse.push(2)
			RESOURCES.chronite.amt -= 3
		}
	},

	// Chronology
	effects: [
		{
			desc: "+0.5 Number Threshold per Part",
			eff: p => p / 2,
			eff_disp: i => `+${i.toFixed(1)}`,
		}, {
			desc: "+0.1 Shatter Luck/s per Part",
			eff: p => 0.1 * p,
			eff_disp: i => `+${i.toFixed(1)}/s`,
		}
	],

	// In order: Part -> Episode, Season
	// Rebirth moves on to Season 2.

	// Calculation
	updateTemp() {
		temp.passive = {}
		for (var [i, j] of Object.entries(this.effects)) temp.passive[i] = j.eff(temp.upgs.new_part)
	},
	updateHTML() {
		if (!player.chronics.unl) return

		RES_DISP.update("chronite")

		setEl("ch_ability_0", player.chronics.onUse.includes(0) ? "upg bought" : RESOURCES.chronite.amt < 1 ? "upg locked" : "upg")
		setEl("ch_ability_1", player.chronics.onUse.includes(1) ? "upg bought" : RESOURCES.chronite.amt < 2 ? "upg locked" : "upg")
		setEl("ch_ability_2", player.chronics.onUse.includes(2) ? "upg bought" : RESOURCES.chronite.amt < 3 ? "upg locked" : "upg")

		//Chronology
		UPG_FEATURE.dispGroup("new_part")
		setHTML("ch_part", "Part " + (temp.upgs.new_part + 1))

		let h = ``
		for (var [i, j] of Object.entries(this.effects)) h += `- ${j.desc} (${j.eff_disp(temp.passive[i])})<br>`
		setHTML("ch_passive", h)

		//Episodes
		setHTML("ch_episode", "Plane " + Math.floor((temp.upgs.new_part + 1) / 3 + 1))
		RES_DISP.update("asc_perk")
		UPG_FEATURE.dispGroup("asc")
	}
}