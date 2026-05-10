import { DESKTOP, LAPTOP, SWIPE_THRESHOLD } from "./constants.js";

export class StagesSlider {
	currentIndex = 0;
	resizeObserver = null;
	xDownStart = null;

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
		this.dotsContainer = this.container.querySelector("[data-slider-dots]");

		this.slides = Array.from(this.track.children);
		this.totalSlides = this.slides.length;
	}

	getSlidesPerView() {
		const viewportWidth = window.innerWidth;

		if (viewportWidth >= LAPTOP) {
			return 2;
		}

		return 1;
	}

	init() {
		if (!this.container) {
			return;
		}

		this.resizeObserver = new ResizeObserver(() => {
			this.renderDots();
			this.activeDot();
			this.update();
		});

		this.resizeObserver.observe(this.container);

		this.prevBtn.addEventListener("click", this.prev.bind(this));
		this.nextBtn.addEventListener("click", this.next.bind(this));

		this.track.addEventListener("touchstart", (e) => this.touchStart(e), false);
		this.track.addEventListener("touchend", (e) => this.touchEnd(e), false);
	}

	touchStart(e) {
		this.xDownStart = e.touches[0].clientX;
	}

	touchEnd(e) {
		if (!this.xDownStart) return;

		const xUp = e.changedTouches[0].clientX;
		const diff = this.xDownStart - xUp;

		if (Math.abs(diff) > SWIPE_THRESHOLD) {
			if (diff > 0) {
				this.next();
			} else {
				this.prev();
			}
		}

		this.xDownStart = null;
	}

	renderDots() {
		if (!this.dotsContainer) return;

		this.dotsContainer.innerHTML = "";
		const perView = this.getSlidesPerView();
		const totalSteps = this.totalSlides - perView + 1;

		if (totalSteps <= 1) {
			return;
		}

		for (let i = 0; i < totalSteps; i++) {
			const dot = document.createElement("button");

			dot.classList.add("button__dot");
			dot.setAttribute("aria-label", `Перейти к слайду ${i + 1}`);

			dot.addEventListener("click", () => {
				this.currentIndex = i;
				this.update();
			});
			this.dotsContainer.appendChild(dot);
		}
	}

	activeDot() {
		if (!this.dotsContainer) return;

		this.dotsContainer.childNodes.forEach((dot, index) => {
			if (this.currentIndex === index) {
				dot.classList.add("active");
			} else {
				dot.classList.remove("active");
			}
		});
	}

	update() {
		const perView = this.getSlidesPerView();
		const maxIndex = this.totalSlides - perView;

		if (window.innerWidth >= DESKTOP) {
			this.track.style.transform = "none";
			return;
		}

		if (this.currentIndex >= maxIndex) {
			this.currentIndex = maxIndex;
			this.nextBtn.disabled = true;
		} else {
			this.nextBtn.disabled = false;
		}

		if (this.currentIndex <= 0) {
			this.currentIndex = 0;
			this.prevBtn.disabled = true;
		} else {
			this.prevBtn.disabled = false;
		}

		const slideWidth = this.slides[0].offsetWidth;
		const gap = parseInt(window.getComputedStyle(this.track).gap) || 0;
		const moveAmount = (slideWidth + gap) * this.currentIndex;
		this.track.style.transform = `translateX(-${moveAmount}px)`;

		this.activeDot();
	}

	next() {
		this.currentIndex++;
		this.update();
	}

	prev() {
		this.currentIndex--;
		this.update();
	}
}
