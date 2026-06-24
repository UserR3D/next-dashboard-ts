export class scrollAdjust {
	containerRef: React.RefObject<HTMLElement | null>;
	constructor(containerRef: React.RefObject<HTMLElement | null>) {
		this.containerRef = containerRef;
	}

	scrollToBottom() {
		const container = this.containerRef.current;
		if (container) {
			return container.scroll({
				top: container.scrollHeight,
				behavior: 'smooth',
			});
		}
	}
}
