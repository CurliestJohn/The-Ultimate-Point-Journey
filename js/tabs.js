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
			name: "Fragment",
			unl: () => true,
			update() {
				RES_DISP.update("point_fragments")
				RES_DISP.update("glass_fragments")
				RES_DISP.update("glass_flux")
				RES_DISP.update("shatter_luck")

				UPG_FEATURE.disp("f1")
				UPG_FEATURE.disp("f2")
				UPG_FEATURE.disp("f3")
			}
		},
		flux: {
			name: "Timeflux",
			unl: () => true,
			update() {
			}
		},
		opt: {
			name: "Options",
			unl: () => true,
			update() {
			}
		}
	}
}