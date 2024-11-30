let ACH = [
	{
		title: "Oops! All Points!",
		disp: "Reach 1 Point Fragment.",
		req: () => RESOURCES.point_fragments.amt >= 1
	}, {
		title: "It's fragile...",
		disp: "Reach 1 Glasskite.",
		req: () => RESOURCES.glass_fragments.amt >= 1
	}, {
		title: "All Balanced Out.",
		disp: "Reach more than 5 Points.",
		req: () => RESOURCES.points.amt > 5
	}, {
		title: "Chronicle Capsules",
		disp: "Reach Chronites.",
		req: () => RESOURCES.chronite.amt >= 1
	}, {
		title: "Lights, Camera, Action!",
		disp: "Reach Part 2.",
		req: () => temp.upgs.new_part >= 1
	}, {
		title: "Basics of Craziness",
		disp: "Reach Plane 2.",
		req: () => temp.upgs.new_part >= 2
	}
]

let ACH_FUNC = {
	init() {
		let h = ``
		for (var [i, j] of Object.entries(ACH)) h += `
			<tr id="ach_${i}">
				<td><img src="img/placeholder.png"></img></td>
				<td>
					<b><u style='font-size: 24px'>${j.title}</u></b><br>
					${j.disp}
				</td>
			</tr>
		`
		setHTML("achs", h)
	},
	perSec() {
		for (var [i, j] of Object.entries(ACH)) {
			if (!player.achs.includes(i) && j.req()) player.achs.push(i)
			setEl("ach_"+i, player.achs.includes(i) ? "clear" : "")
		}
	},
}