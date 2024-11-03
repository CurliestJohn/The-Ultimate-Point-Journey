function el(id) {
	return document.getElementById(id)
}

function setHTML(id, html) {
	el(id).innerHTML = html
}

// Displays
function switchEl(id, bool) {
	el(id).style.display = bool ? "" : "none"
}

function showEl(id) {
	switchEl(id, true)
}

function hideEl(id) {
	switchEl(id, false)
}

function toggleEl(id) {
	switchEl(id, !isElShown(id))
}

function isElShown(id) {
	return el(id).style.display != "none"
}