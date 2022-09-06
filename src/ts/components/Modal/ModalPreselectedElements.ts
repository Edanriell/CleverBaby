import { Modal, ModalTimeout } from "./Modal";

export class ModalPreselectedElements extends Modal {
	targetElements: NodeListOf<Element>;

	selectMultiple: boolean;

	constructor({
		triggerSelector,
		timeout,
		scrollTriggerPoint,
		modalSelector,
		modalUnderlaySelector,
		closeModalButtonSelector,
		targetElementsSelector,
		selectMultipleElements
	}: {
		triggerSelector: string;
		modalSelector: string;
		modalUnderlaySelector: string;
		closeModalButtonSelector: string;
		timeout?: ModalTimeout | null;
		scrollTriggerPoint?: number | null;
		targetElementsSelector: string;
		selectMultipleElements?: boolean | null;
	}) {
		super({
			triggerSelector,
			modalSelector,
			modalUnderlaySelector,
			closeModalButtonSelector,
			timeout,
			scrollTriggerPoint
		});
		this.triggerButton = document.querySelectorAll(triggerSelector);
		this.targetElements = document.querySelectorAll(targetElementsSelector);
		this.selectMultiple = selectMultipleElements || false;
	}

	initPreselect(): void {
		this.triggerButton.forEach(button => {
			button.addEventListener("click", event => {
				const targetElement = button.getAttribute("data-target-group");
				this.#unselectElements(this.selectMultiple, event);
				this.#selectElement(Number(targetElement));
			});
		});
		this.targetElements.forEach(element => {
			element.addEventListener("click", event => {
				this.#unselectElements(this.selectMultiple, event);
			});
		});
	}

	#selectElement(targetElement: number): void {
		this.targetElements.forEach((element, index) => {
			if (index === targetElement) {
				(element as unknown as HTMLInputElement).checked = true;
			}
		});
	}

	#unselectElements(selectMultiple: boolean, selectedElement: Event): void {
		const element: EventTarget | null = selectedElement.target;
		if (!selectMultiple || !element) return;
		const selectedElementIndex: number = [...this.targetElements].indexOf(
			element as HTMLElement
		);
		this.targetElements.forEach((targetElement, targetElementIndex) => {
			if (
				selectedElementIndex === targetElementIndex &&
				!(targetElement as HTMLInputElement).checked
			) {
				(targetElement as unknown as HTMLInputElement).checked = true;
				return;
			}
			if (selectedElementIndex === targetElementIndex) return;
			(targetElement as unknown as HTMLInputElement).checked = false;
		});
	}
}
