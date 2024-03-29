import { gsap } from "gsap";

enum ModalState {
	Hidden = "hidden",
	Shown = "shown"
}

enum ModalTimeoutAction {
	Show = "show",
	Hide = "hide"
}

export type ModalTimeout = {
	action: ModalTimeoutAction;
	delay: number;
};

interface IModal {
	triggerButton: NodeListOf<Element>;
	modal: HTMLElement | null;
	modalUnderlay: HTMLElement | null;
	closeModalButton: HTMLElement | null;
	timeout: ModalTimeout | null;
	scrollTrigger: number | null;
	timeline: gsap.core.Timeline;
	isShowed: boolean;
	modalState: ModalState;
	init(): void;
}

export class Modal implements IModal {
	triggerButton: NodeListOf<Element>;

	modal: HTMLElement | null;

	modalUnderlay: HTMLElement | null;

	closeModalButton: HTMLElement | null;

	timeout: ModalTimeout | null;

	scrollTrigger: number | null;

	timeline: gsap.core.Timeline = gsap.timeline({ deleay: 0.4, ease: "power2.out" });

	isShowed = false;

	modalState = ModalState.Hidden;

	constructor({
		triggerSelector,
		timeout = null,
		scrollTriggerPoint = null,
		modalSelector,
		modalUnderlaySelector,
		closeModalButtonSelector
	}: {
		triggerSelector: string;
		modalSelector: string;
		modalUnderlaySelector: string;
		closeModalButtonSelector: string;
		timeout?: ModalTimeout | null;
		scrollTriggerPoint?: number | null;
	}) {
		this.triggerButton = document.querySelectorAll(triggerSelector);
		this.modal = document.querySelector(modalSelector);
		this.modalUnderlay = document.querySelector(modalUnderlaySelector);
		this.closeModalButton = document.querySelector(closeModalButtonSelector);
		this.timeout = timeout;
		this.scrollTrigger = scrollTriggerPoint;
	}

	init(): void {
		this.triggerButton.forEach(button => {
			button.addEventListener("click", event => {
				event.preventDefault();
				this.#showModal();
			});
		});
		this.modalUnderlay?.addEventListener("click", event => {
			if (this.modalUnderlay === event.target) {
				this.#hideModal();
			} else if (this.closeModalButton === event.target) {
				this.#hideModal();
			}
		});
		if (this.timeout && this.timeout.action === ModalTimeoutAction.Show && !this.isShowed)
			this.#modalTimeout({ action: this.timeout.action, timeout: this.timeout.delay });
		window.addEventListener("scroll", () => {
			if (this.scrollTrigger && window.scrollY >= this.scrollTrigger) {
				this.#scrollModal();
			}
		});
	}

	#showModal(): void {
		this.isShowed = true;
		this.modalState = ModalState.Shown;
		this.#toggleBodyOverflow({ modalState: this.modalState });
		gsap.set(this.modalUnderlay, { display: "block" });
		this.timeline.fromTo(this.modalUnderlay, { opacity: 0 }, { opacity: 1, duration: 0.3 });
		this.timeline.fromTo(
			this.modal,
			{ opacity: 0, scale: 0.8 },
			{ opacity: 1, scale: 1, duration: 1.5, ease: "elastic.out(2.5, 0.75)" }
		);
		if (this.timeout && this.timeout.action === ModalTimeoutAction.Hide)
			this.#modalTimeout({ action: this.timeout.action, timeout: this.timeout.delay });
	}

	#hideModal(): void {
		this.modalState = ModalState.Hidden;
		this.timeline.fromTo(
			this.modal,
			{ opacity: 1, scale: 1 },
			{ opacity: 0, scale: 0.8, duration: 0.2 }
		);
		this.timeline.fromTo(this.modalUnderlay, { opacity: 1 }, { opacity: 0, duration: 0.3 });
		this.timeline.set(this.modalUnderlay, {
			display: "none",
			onComplete: () => {
				this.#toggleBodyOverflow({ modalState: this.modalState });
			}
		});
	}

	#modalTimeout({ action, timeout }: { action: ModalTimeoutAction; timeout: number }): void {
		switch (action) {
			case "hide":
				setTimeout(() => {
					this.#hideModal();
				}, timeout);
				break;
			case "show":
				setTimeout(() => {
					if (this.isShowed) return;
					this.#showModal();
				}, timeout);
				break;
			default:
				break;
		}
	}

	#scrollModal(): void {
		if (!this.isShowed) this.#showModal();
	}

	#toggleBodyOverflow({ modalState }: { modalState: ModalState }): void {
		const body = document.querySelector("body");
		const scrollbarWidth = this.#calculateScrollBarWidth();

		switch (modalState) {
			case "hidden":
				(body as HTMLElement).style.cssText = `
					overflow: auto;
					padding-right: 0px;
				`;
				break;
			case "shown":
				(body as HTMLElement).style.cssText = `
					overflow: hidden;
					padding-right: ${scrollbarWidth}px;
				`;
				break;
			default:
				break;
		}
	}

	#calculateScrollBarWidth(): number {
		const outerDiv = document.createElement("div");
		outerDiv.style.visibility = "hidden";
		outerDiv.style.overflow = "scroll";
		document.body.appendChild(outerDiv);

		const innerDiv = document.createElement("div");
		outerDiv.appendChild(innerDiv);

		const scrollbarWidth = outerDiv.offsetWidth - innerDiv.offsetWidth;

		outerDiv.parentNode?.removeChild(outerDiv);

		return scrollbarWidth;
	}
}
