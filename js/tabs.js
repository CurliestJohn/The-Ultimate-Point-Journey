let TABS = {
	init() {
		let h = ``
		for (var [i, j] of Object.entries(TABS.tabs)) h += `<button id='tab_btn_${i}' onclick='TABS.click("${i}")'>${j.name}</button> `
		h += `<hr>`

		setHTML("tab_btns", h)
		TABS.click(Object.keys(TABS.tabs)[0])
	},
	click(i) {
		if (TABS.in) {
			hideEl("tab_" + TABS.in)
			setEl("tab_btn_" + TABS.in, "")
		}

		showEl("tab_" + i)
		setEl("tab_btn_" + i, "active")
		TABS.in = i
	},

	tabs: {
		frag: {
			name: "Fragmentation",
			unl: () => true,
			update() {
			}
		},
		test: {
			name: "???",
			unl: () => true,
			update() {
			}
		}
	}
}