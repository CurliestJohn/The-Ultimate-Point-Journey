function el(id) {
	return document.getElementById(id)
}

function showEl(id) {
	el(id).style.display = ""
}

function isElShown(id) {
	return el(id).style.display != "none"
}

function toggleEl(id) {
	el(id).style.display = isElShown(id) ? "none" : ""
}