const selectors = [
	"articles",
	"videos",
	"trash",
	"rr",
]

selectors.forEach(s => {
	const category = document.getElementById(s)
	if (category == null) return
	// only one connector per category
	const connector = category.getElementsByClassName("connect")[0]
	let height = 0

	// only last post's height matters
	if (s == "videos") {
		// only one last element
		const lastvideo = category.getElementsByClassName("last")[0]
		height = lastvideo.getBoundingClientRect().height + lastvideo.nextElementSibling.getBoundingClientRect().height
	} else
		height = category.getElementsByClassName("last")[0].getBoundingClientRect().height

	connector.style.height = `${connector.getBoundingClientRect().height - height}px`
})

document.getElementById("back").remove()