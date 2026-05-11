export class HeaderScroll {
	header = document.getElementById("header");
	sentinel = document.getElementById("header-sentinel");

	isSDASupported = CSS.supports("animation-timeline", "scroll()");

	scrolledClass = "header--scrolled";

	init() {
		if (!this.header || !this.sentinel || this.isSDASupported) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) {
						this.header.classList.add(this.scrolledClass);
					} else {
						this.header.classList.remove(this.scrolledClass);
					}
				});
			},
			{
				threshold: [1.0],
			},
		);

		observer.observe(this.sentinel);
	}
}
