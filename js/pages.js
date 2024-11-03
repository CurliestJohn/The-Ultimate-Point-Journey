let PAGES = {
	//Memory
	opened: {},

	//Functions
	open(id, page) {
		PAGES.opened[id] = PAGES.opened[id] == page ? undefined : page

		if (PAGES.opened[id] == undefined) hideEl(id)
		else {
			showEl(id)
			setHTML(id, PAGES[id][page])
		}
	},

	//Storage
	footer_box: {
		help: `
			<h2 style='color: red'>No features are implemented yet!</h2>
			Come back soon!
		`,
		changelog: `
			<h2>
				<u>November 3rd, 2024</u><br>
				v0.0.0 • Build 3
			</h2>
			- 💰 Points!<br>
			- 👁️ Footer revamps!<br>
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