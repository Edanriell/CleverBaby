import { gsap } from "gsap";

type ElementOptions = {
	scrollYposition: number;
	headerColor: string;
};

interface IColorSwitcher {
	header: Element | null;
	headerOptions: Array<ElementOptions>;
	threshold: number;
	init(): void;
	changeHeaderColor(header: HTMLElement, color: string): void;
}

export class ColorSwitcher implements IColorSwitcher {
	public header: Element | null;

	public headerOptions: Array<ElementOptions>;

	public threshold: number;

	#initialColorApplied: boolean;

	constructor({
		headerSelector,
		headerOptionsObject,
		animationThreshold
	}: {
		headerSelector: string;
		headerOptionsObject: Array<ElementOptions>;
		animationThreshold?: number;
	}) {
		this.header = document.querySelector(headerSelector);
		this.headerOptions = headerOptionsObject;
		this.threshold = animationThreshold || 100;
		this.#initialColorApplied = false;
	}

	public get isInitialColorApplied() {
		return this.#initialColorApplied;
	}

	set #isInitialColorApplied(isColorApplied: boolean) {
		this.#initialColorApplied = isColorApplied;
	}

	public init(): void {
		document.addEventListener("scroll", () => {
			for (const option of this.headerOptions) {
				if (
					window.scrollY >= option.scrollYposition &&
					window.scrollY <= option.scrollYposition + this.threshold
				) {
					this.changeHeaderColor(this.header as HTMLElement, option.headerColor);
				} else if (
					!this.isInitialColorApplied &&
					window.scrollY >= option.scrollYposition &&
					option.scrollYposition !== 0
				) {
					this.changeHeaderColor(this.header as HTMLElement, option.headerColor);
					this.#isInitialColorApplied = true;
				}
			}
		});
	}

	public changeHeaderColor(header: HTMLElement, color: string): void {
		gsap.to(header, {
			backgroundColor: color,
			duration: 0.6,
			ease: "power2.out"
		});
	}
}
