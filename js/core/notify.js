let NOTIFY = {
	add(data = {}) {
		clearTimeout(NOTIFY.timeout)

		let h = `<h2>${ data.title ?? "Notification" }</h2>`
		h += data.msg ?? "Empty notification"

		showEl("notify_box")
		setHTML("notify_box", h)
		NOTIFY.timeout = setTimeout(() => hideEl("notify_box"), (data.duration ?? 3) * 1000)
	}
}