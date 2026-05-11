import { HeaderScroll } from "./HeaderScroll.js";
import { RunningLine } from "./RunningLine.js";
import { Slider } from "./Slider.js";
import { SmoothScroll } from "./SmoothScroll.js";
import { StagesSlider } from "./StagesSlider.js";

document.addEventListener("DOMContentLoaded", () => {
	const runningLine = new RunningLine();
	const membersSlider = new Slider("members");
	const stagesSlider = new StagesSlider("stages");
	const playersScroll = new SmoothScroll("players");
	const gamesSessionScroll = new SmoothScroll("gamesSession");
	const headerScroll = new HeaderScroll();

	runningLine.init();
	membersSlider.init();
	stagesSlider.init();
	playersScroll.init();
	gamesSessionScroll.init();
	headerScroll.init();
});
