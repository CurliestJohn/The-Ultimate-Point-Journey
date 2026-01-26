let ACH = [
	{
		title: "Oops! All Points!",
		disp: "Gain a Point Fragment.",
		req: () => RESOURCES.point_fragments.amt >= 1
	}, {
		title: "Not forgotten.",
		disp: "Gain a Remnant.",
		req: () => RESOURCES.glass_fragments.amt >= 1
	}, {
		title: "All balanced out.",
		disp: "Reach 2 Points.",
		req: () => RESOURCES.points.amt > 2
	}, {
		title: "Chronicle Capsules",
		disp: "Reach Chronites.",
		req: () => RESOURCES.chronite.amt >= 1
	}, {
		title: "Basics of Craziness",
		disp: `Reach Plane 2.<br>
		Reward: Unlock 'Shiny' Flavor in 'Fragments' tab.`,
		req: () => player.chronics.plane >= 2
	}, {
		title: "Planes of Trinity",
		disp: "Reach Plane 5.",
		req: () => player.chronics.plane >= 5
	}, {
		title: "Breaking the Fourth Wall",
		disp: "Reach Plane 10.",
		req: () => player.chronics.plane >= 10
	}
]

let ACH_FUNC = {
	init() {
		let h = ``
		for (let [i, j] of Object.entries(ACH)) h += `
			<tr id="ach_${i}">
				<td><img src="img/ach/${i}.png"></img></td>
				<td>
					<b><u style='font-size: 24px'>${j.title}</u></b><br>
					${j.disp}
				</td>
			</tr>
		`
		setHTML("achs", h)
	},
	perSec() {
		for (let [i, j] of Object.entries(ACH)) {
			if (!player.achs.includes(i) && j.req()) {
				player.achs.push(i)
				NOTIFY.add({ msg: j.title + "<hr>" + j.disp, duration: 10, title: "Achievement attained!" })
			}
			setEl("ach_"+i, player.achs.includes(i) ? "clear" : "")
		}
	},
}