let TABS = {
	init() {
		let h = ``
		for (var [i, j] of Object.entries(TABS.tabs)) h += `<button id='tab_btn_${i}' onclick='TABS.click("${i}")' ${j.unl !== undefined ? "style='display: none'" : ""}>${j.name}</button> `
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
			name: "Fragment",
			update() {
				RES_DISP.update("point_fragments")
				RES_DISP.update("glass_fragments")
				RES_DISP.update("shatter_luck")

				UPG_FEATURE.dispGroup("frag")
			}
		},
		chronics: {
			name: "Chronics",
			update: () => CHRONICS.updateHTML()
		},
		shop: {
			name: "Shop",
			unl: _ => false,
			update() {
			}
		},
		communal: {
			name: "Community",
			unl: _ => false,
			update() {
			}
		},
		achs: {
			name: "Achievements",
			update() {
			}
		},
		opt: {
			name: "Options",
			update() {
			}
		}
	}
}