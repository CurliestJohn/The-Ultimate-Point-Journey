let TABS = {
	init() {
		let h = ``
		for (let [i, j] of Object.entries(TABS.tabs)) h += `<button id='tab_btn_${i}' onclick='TABS.click("${i}")' ${j.unl !== undefined ? "style='display: none'" : ""}>${j.name}</button> `
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
			name: "💥 Fragment",
			update: () => FRAGMENT.html()
		},
		chronics: {
			name: "⏰ Chronics",
			update: () => CHRONICS.html()
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

		//Misc
		achs: {
			name: "🏆 Achievements",
			update() {
			}
		},
		stats: {
			name: "📊 Statistics",
			update() {
				setHTML("tab_stats", `
					You played for ${player.stats.time.toFixed(1)} seconds.<br>
					You made a best of ${player.stats.best.toFixed(1)} Points.<br>
					Points will passively shatter every ${(FRAGMENT.reqToShatter() / temp.production.points).toFixed(1)} seconds.<br><br>

					If every Point Fragment was the size of a glass fragment, you could have enough fragments to make ${(RESOURCES.point_fragments.amt / 1e3).toFixed(2)} Windows.
				`)
			}
		},
		opt: {
			name: "⚙️ Options",
			update() {
			}
		}
	}
}