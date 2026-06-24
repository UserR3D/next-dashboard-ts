export class scrollAdjust {
	containerRef?: React.RefObject<HTMLElement | null>;
	reactElement?: React.UIEvent<HTMLElement | null>;
	constructor(
		containerRef?: React.RefObject<HTMLElement | null>,
		reactElement?: React.UIEvent<HTMLElement | null>,
	) {
		this.containerRef = containerRef;
		this.reactElement = reactElement;
	}

	scrollToBottom() {
		if (this.containerRef?.current) {
			const container = this.containerRef.current;
			return container.scroll({
				top: container.scrollHeight,
				behavior: 'smooth',
			});
		}
	}

	halvedScroll() {
		if (this.reactElement) {
			const scrollElement = this.reactElement?.currentTarget.scrollTop;
			const scrollHeightHalved =
				this.reactElement?.currentTarget.clientHeight * 0.5;
			if (scrollElement < scrollHeightHalved) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}
