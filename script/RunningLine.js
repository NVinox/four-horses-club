export class RunningLine {
	containers = document.querySelectorAll("[data-running-container]");

	init() {
		if (!this.containers) {
			return;
		}

		this.containers.forEach((container) => {
			const list = container.querySelector("[data-running-list]");

			if (list) {
				this.cloneList(container, list);
			}
		});
	}

	cloneList(container, list) {
		const listClone = list.cloneNode(true);
		const speed = list.dataset.speed;

		listClone.setAttribute("aria-hidden", "true");
		container.appendChild(listClone);

		if (speed) {
			list.style.animationDuration = speed;
			listClone.style.animationDuration = speed;
		}
	}
}
