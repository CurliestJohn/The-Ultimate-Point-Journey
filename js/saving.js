let SAVING = {
	// NEW SAVE
	get_new_save() {
		return {
			save_build: 10,

			points: 0,
			upgs: {},
			achs: [],

			stats: {
				time: 0,
				best: 0
			},

			fragments: {
				flavor_charge: "",
				amt: 0,
				luck: 0
			},
			chronics: {
				flux: 0,
				onUse: [],

				plane: 1,
				ascends: 0
			}
		}
	},

	// SAVE
	get_save() {
		return btoa(JSON.stringify(player))
	},
	save(notify) {
		localStorage.setItem("tupj_save", SAVING.get_save())

		console.log("Game saved!")
		if (notify) NOTIFY.add({ title: "Saving", msg: "Game saved!" })
	},

	// LOAD
	load(i) {
		temp = {}

		let new_save = SAVING.get_new_save()
		player = JSON.parse(atob(i))
		player = deepUndefined(player, new_save)

		let save_build = player.save_build ?? 0
		if (save_build < 10) {
			player.chronics = new_save.chronics
			delete player.upgs.a1
			delete player.upgs.a2
		}

		player.save_build = new_save.save_build
		NOTIFY.add({ title: "Welcome back!", msg: `You were away for ${((Date.now() - player.last_update) / 1e3).toFixed(1)} seconds...` })
	},
	import_save() {
		let x = prompt("Enter your save.")
		if (x != "") SAVING.load(x)
		SAVING.save()
	},
	export_save() {
		let copyText = el('copy')
		copyText.value = SAVING.get_save()
		copyText.style.visibility = "visible"
		copyText.select();
		document.execCommand("copy");
		copyText.style.visibility = "hidden"

		NOTIFY.add({ title: "Saving", msg: "Save exported to your clipboard!" })
	},

	// RESET
	reset() {
		if (prompt("This will hard reset your save. You will not gain rewards. To reset, type 'I understood the consequences.'") != "I understood the consequences.") return

		temp = {}
		player = SAVING.get_new_save()
		SAVING.save()

		NOTIFY.add({ title: "Saving", msg: "Game reset!" })
	}
}

//Credits to MrRedShark77
function deepUndefined(obj, data) {
    if (obj == null) return data
    for (let k in data) {
        if (obj[k] === null) continue
        if (obj[k] === undefined) obj[k] = data[k]
        else if (typeof obj[k] == 'object') deepUndefined(obj[k], data[k])
    }
    return obj
}