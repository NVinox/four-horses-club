import { RunningLine } from "./RunningLine.js";
import { Slider } from "./Slider.js";
import { StagesSlider } from "./StagesSlider.js";

document.addEventListener("DOMContentLoaded", () => {
	const runningLine = new RunningLine();
	const membersSlider = new Slider("members");
	const stagesSlider = new StagesSlider("stages");

	runningLine.init();
	membersSlider.init();
	stagesSlider.init();
});
