import { DESKTOP, LAPTOP } from "./constants.js";

export class Slider {
	currentIndex = 0;
	autoPlayInterval = null;

	timeout = 4000;

	constructor(containerId) {
		if (typeof containerId != "string") {
			return;
		}

		this.container = document.getElementById(containerId);

		if (!this.container) {
			return;
		}

		this.track = this.container.querySelector("[data-slider-track]");
		this.prevBtn = this.container.querySelector("[data-slider-prev]");
		this.nextBtn = this.container.querySelector("[data-slider-next]");
		this.currentCounter = this.container.querySelector(
			"[data-slider-current-counter]",
		);
		this.totalCounter = this.container.querySelector(
			"[data-slider-total-counter]",
		);

		this.slides = Array.from(this.track.children);
		this.totalSlides = this.slides.length;
	}

	init() {
		if (!this.container) return;

		this.update();
		this.startAutoPlay();

		this.prevBtn.addEventListener("click", () => {
			this.prev();
			this.resetAutoPlay();
		});

		this.nextBtn.addEventListener("click", () => {
			this.next();
			this.resetAutoPlay();
		});
	}

	getSlidesPerView() {
		const viewportWidth = window.innerWidth;

		if (viewportWidth >= DESKTOP) {
			return 3;
		}

		if (viewportWidth >= LAPTOP) {
			return 2;
		}

		return 1;
	}

	update() {
		const perView = this.getSlidesPerView();
		const maxIndex = this.totalSlides - perView;

		if (this.currentIndex > maxIndex) {
			this.currentIndex = 0;
		}

		if (this.currentIndex < 0) {
			this.currentIndex = maxIndex;
		}

		const offset = this.currentIndex * (100 / perView);
		this.track.style.transform = `translateX(-${offset}%)`;

		const currentNum = this.currentIndex + perView;
		this.currentCounter.textContent = currentNum;
		this.totalCounter.textContent = this.totalSlides;
	}

	next() {
		this.currentIndex++;
		this.update();
	}

	prev() {
		this.currentIndex--;
		this.update();
	}

	startAutoPlay() {
		this.autoPlayInterval = setInterval(() => this.next(), this.timeout);
	}

	resetAutoPlay() {
		clearInterval(this.autoPlayInterval);
		this.startAutoPlay();
	}
}
