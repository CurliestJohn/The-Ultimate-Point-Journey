let SAVING = {
	// NEW SAVE
	get_new_save() {
		return {
			points: 0,
			upgs: {},
			achs: [],

			fragments: {
				amt: 0,
				luck: 0,
				glass: 0
			},
			chronics: {
				// Currencies
				flux: 0,
				onUse: [],

				// Currencies
				part: 1,
				episode: 1,
				upgs: {}
			}
		}
	},

	// SAVE
	get_save() {
		return btoa(JSON.stringify(player))
	},
	save() {
		console.log("Game saved!")
		localStorage.setItem("tupj_save", SAVING.get_save())
	},

	// LOAD
	load(i) {
		temp = {}
		player = JSON.parse(atob(i))
		player = deepUndefined(player, SAVING.get_new_save())
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

		alert("Save exported to your clipboard!")
	},

	// RESET
	reset() {
		if (prompt("This will hard reset your save. You will not gain rewards. To reset, type 'I understood the consequences.'") != "I understood the consequences.") return

		temp = {}
		player = SAVING.get_new_save()
		SAVING.save()
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