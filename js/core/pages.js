let PAGES = {
	//Memory
	opened: {},

	//Functions
	open(id, page) {
		PAGES.opened[id] = PAGES.opened[id] == page ? undefined : page

		if (PAGES.opened[id] == undefined) hideEl(id)
		else {
			showEl(id)
			setHTML(id + "_div", PAGES[id][page])
		}
	},
	close(id) {
		this.open(id, undefined)
	},

	//Storage
	footer_box: {
		help: `
			<h2>Uh oh!</h2>
			Your points are shattering! But don't worry!<br><br>

			You can spend Point Fragments to upgrade. You gain at least 2 Point Fragments per point.
		`,
		changelog: `
			<h2>
				<u>November 29th, 2024</u><br>
				v0.0.2 • Build 9
			</h2>
			- 🌈 Flavors! (Unlocks at Plane 2)<br>
			- 💥 Rebalancing!<br>
			Endgame: ??? points!<br>

			<h2>
				<u>November 29th, 2024</u><br>
				v0.0.2 • Build 8
			</h2>
			- ⏰ Chronics!<br>
			- 🏆 Achievements!<br>
			- 💾 Saving!<br>
			- 👁️ New UI!<br>
			Endgame: 11 points!<br>

			<h2>
				<u>November 4th, 2024</u><br>
				v0.0.1 • Build 6
			</h2>
			- 💱 Point Exchange!<br>
			- 💥 Shatter Luck Rework!<br>
			- 🖼️ Revamp!<br>
			- 🎮 Game Icon!<br>
			- ℹ️ Information!<br>
			Endgame: 5 points!<br>

			<h2>
				<u>November 3rd, 2024</u><br>
				v0.0.1 • Build 5
			</h2>
			- ⬆️ Production!<br>
			- 💥 Fragmentation!<br>
			- ❓ Hints for new features...<br>
			Endgame: 5 points!<br>

			<h2>
				<u>November 3rd, 2024</u><br>
				v0.0.0 • Build 4
			</h2>
			- 👁️ Black theme!<br>
			- 🖼️ Icons!<br>
			- 📖 Tabs!<br>
			- ⏳ Loading screen!<br>
			- 📁 Organized!<br>

			<h2>
				<u>November 3rd, 2024</u><br>
				v0.0.0 • Build 3
			</h2>
			- 💰 Points!<br>
			- 👁️ Revamps!<br>
			- 📖 Help menu!<br>

			<h2>
				<u>November 2nd, 2024</u><br>
				v0.0.0 • Build 2
			</h2>
			- 🤔 A line...?<br>

			<h2>
				<u>November 1st, 2024</u><br>
				v0.0.0 • Build 1
			</h2>
			- 📝 Changelog!<br>
			- 👁️ Footer!<br>
			- ⚙️ Technical changes!<br>
		`,
	}
}