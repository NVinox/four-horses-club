export class SmoothScroll {
	topOffset = 20;

	constructor(targetId) {
		this.target = document.getElementById(targetId);
		this.links = document.querySelectorAll(`a[href^="#${targetId}"]`);
	}

	init() {
		if (!this.target || !this.links?.length) {
			return;
		}

		this.links.forEach((link) => {
			link.addEventListener("click", (e) => {
				e.preventDefault();
				this.scrollTo();
			});
		});
	}

	scrollTo() {
		const elementPosition = this.target.getBoundingClientRect().top;
		const offsetPosition = elementPosition - this.topOffset;

		window.scrollBy({
			top: offsetPosition,
			behavior: "smooth",
		});
	}
}
