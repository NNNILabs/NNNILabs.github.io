const selectors = [
	"#articles",
	"#trash",
	"#videos",
	"#rr",
]

// heightmap must be floored
let heightmap = [22, 43, 64, 85, 106]

heightmap = [
	heightmap,
	heightmap,
	heightmap.slice(1),
	heightmap.map(v => { return v - 2 })
]

let heights = []

for (const post of document.getElementsByClassName("last"))
	heights.push(parseFloat(post.getBoundingClientRect().height))

let css = document.createElement("style")

// h: height
// i: selector
heights.forEach((h, i) => {
	// no. lines
	let j = 0
	while (h > heightmap[i][j]) j++

	css.textContent += `${selectors[i]} .posts .border {
	height: calc(100% - ${heightmap[i][j - 1]}px + 10.5px)
} `
})

document.head.appendChild(css)