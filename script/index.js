import { RunningLine } from "./RunningLine.js";
import { Slider } from "./Slider.js";

document.addEventListener("DOMContentLoaded", () => {
	const runningLine = new RunningLine();
	const slider = new Slider("members");

	runningLine.init();
	slider.init();
});
