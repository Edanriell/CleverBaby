import "../scss/style.scss";
import "swiper/css";

import Swiper, { Navigation, Autoplay, Keyboard, Mousewheel } from "swiper";
import { ColorSwitcher } from "./components/ColorSwitcher";
import { BurgerMenu } from "./components/BurgerMenu";
import { TeachersSlider } from "./components/TeachersSlider";
import { Modal, ModalPreselectedElements } from "./components/Modal";
import { Forms } from "./components/Forms";
import { FormValidation } from "./components/FormValidation";
import { VideoPlayer } from "./components/VideoPlayer";

Swiper.use([Navigation, Autoplay, Keyboard, Mousewheel]);

window.addEventListener("DOMContentLoaded", () => {
	const headerColorSwitcher = new ColorSwitcher({
		headerSelector: ".header",
		headerOptionsObject: [
			{
				scrollYposition: 0,
				headerColor: "#FEFCFA"
			},
			{
				scrollYposition: 10,
				headerColor: "#E8F5F6"
			}
		]
	});

	const burgerMenuColorSwitcher = new ColorSwitcher({
		headerSelector: ".mobile-navigation__content",
		headerOptionsObject: [
			{
				scrollYposition: 0,
				headerColor: "#FEFCFA"
			},
			{
				scrollYposition: 10,
				headerColor: "#E8F5F6"
			}
		]
	});

	const burgerMenu = new BurgerMenu({
		triggerSelector: ".burger-navigation",
		burgerMenuContentSelector: ".mobile-navigation__content",
		burgerMenuElementSelectors: [
			".mobile-navigation__menu-item",
			".mobile-navigation__contact-phone"
		],
		burgerMenuUnderlaySelector: ".mobile-navigation__underlay",
		toggleOverflow: true
	});

	const freeLessonModal = new Modal({
		triggerSelector: "[data-free-lesson-modal-trigger]",
		modalSelector: "[data-free-lesson-modal]",
		modalUnderlaySelector: "[data-free-lesson-modal-underlay]",
		closeModalButtonSelector: "[data-free-lesson-modal-close]"
	});

	const freeLessonModalForm = new Forms({
		formSelector: "[data-free-lesson-form]",
		submitButtonSelector: "[data-free-lesson-submit-button]",
		databaseName: "freeLessonRequests"
	});

	const freeLessonModalFormValidation = new FormValidation({
		form: "[data-free-lesson-form]",
		inputs: [
			{
				uniqueName: "nameAndSurname",
				selector: "[data-free-lesson-form-input-name-surname]",
				testRegExp:
					// eslint-disable-next-line max-len
					/^[a-zа-яё\s]+$/iu,
				style: {
					valid: `
						border: 0.2rem solid darkgreen;
					`,
					unvalid: `
						border: 0.2rem solid darkred;
					`
				},
				errorMessage: {
					messageText: "Неверное имя или фамилия",
					messageStyle: `
						color: darkred;
						position: absolute;
						font-size: 1.1rem;
						bottom: -2rem;
						right: 4.5rem;
						z-index: 4;
						font-family: var(--ff-normal-500b);
					`
				}
			},
			{
				uniqueName: "phoneNumber",
				selector: "[data-free-lesson-form-input-number]",
				testRegExp:
					// eslint-disable-next-line max-len
					/^(\+)\d+$/,
				style: {
					valid: `
						border: 0.2rem solid darkgreen;
					`,
					unvalid: `
						border: 0.2rem solid darkred;
					`
				},
				errorMessage: {
					messageText: "Неверный номер телефона",
					messageStyle: `
						color: darkred;
						position: absolute;
						font-size: 1.1rem;
						top: 8.5rem;
						right: 4.5rem;
						z-index: 4;
						font-family: var(--ff-normal-500b);
					`
				}
			},
			{
				uniqueName: "email",
				selector: "[data-free-lesson-form-input-email]",
				testRegExp:
					// eslint-disable-next-line max-len
					/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
				style: {
					valid: `
						border: 0.2rem solid darkgreen;
					`,
					unvalid: `
						border: 0.2rem solid darkred;
					`
				},
				errorMessage: {
					messageText: "Неверный адрес электронной почты",
					messageStyle: `
						color: darkred;
						position: absolute;
						font-size: 1.1rem;
						bottom: -2rem;
						right: 4.5rem;
						z-index: 4;
						font-family: var(--ff-normal-500b);
					`
				}
			}
		],
		initialInputStyle: `
			border: 0.2rem solid var(--clr-accent-gray-blue);
		`,
		submitButton: "[data-free-lesson-submit-button]"
	});

	const groupListModal = new ModalPreselectedElements({
		triggerSelector: "[data-group-list-modal-trigger]",
		modalSelector: "[data-group-list-modal]",
		modalUnderlaySelector: "[data-group-list-modal-underlay]",
		closeModalButtonSelector: "[data-group-list-modal-close]",
		targetElementsSelector: "[data-modal-form-card-input]",
		selectMultipleElements: true
	});

	const groupListModalForm = new Forms({
		formSelector: "[data-group-list-form]",
		submitButtonSelector: "[data-group-list-submit-button]",
		databaseName: "groupRequests"
	});

	const groupListModalFormValidation = new FormValidation({
		form: "[data-group-list-form]",
		inputs: [
			{
				uniqueName: "nameAndSurname",
				selector: "[data-group-list-form-input-name-surname]",
				testRegExp:
					// eslint-disable-next-line max-len
					/^[a-zа-яё\s]+$/iu,
				style: {
					valid: `
						border: 0.2rem solid darkgreen;
					`,
					unvalid: `
						border: 0.2rem solid darkred;
					`
				},
				errorMessage: {
					messageText: "Неверное имя или фамилия",
					messageStyle: `
						color: darkred;
						position: absolute;
						font-size: 1.1rem;
						bottom: -2rem;
						right: 4.5rem;
						z-index: 4;
						font-family: var(--ff-normal-500b);
					`
				}
			},
			{
				uniqueName: "phoneNumber",
				selector: "[data-group-list-form-input-number]",
				testRegExp:
					// eslint-disable-next-line max-len
					/^(\+)\d+$/,
				style: {
					valid: `
						border: 0.2rem solid darkgreen;
					`,
					unvalid: `
						border: 0.2rem solid darkred;
					`
				},
				errorMessage: {
					messageText: "Неверный номер телефона",
					messageStyle: `
						color: darkred;
						position: absolute;
						font-size: 1.1rem;
						top: 8.5rem;
						right: 4.5rem;
						z-index: 4;
						font-family: var(--ff-normal-500b);
					`
				}
			},
			{
				uniqueName: "email",
				selector: "[data-group-list-form-input-email]",
				testRegExp:
					// eslint-disable-next-line max-len
					/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
				style: {
					valid: `
						border: 0.2rem solid darkgreen;
					`,
					unvalid: `
						border: 0.2rem solid darkred;
					`
				},
				errorMessage: {
					messageText: "Неверный адрес электронной почты",
					messageStyle: `
						color: darkred;
						position: absolute;
						font-size: 1.1rem;
						bottom: -2rem;
						right: 4.5rem;
						z-index: 4;
						font-family: var(--ff-normal-500b);
					`
				}
			}
		],
		initialInputStyle: `
			border: 0.2rem solid var(--clr-accent-gray-blue);
		`,
		submitButton: "[data-group-list-submit-button]"
	});

	headerColorSwitcher.init();
	burgerMenuColorSwitcher.init();
	burgerMenu.init();
	freeLessonModal.init();
	freeLessonModalForm.init();
	freeLessonModalFormValidation.init();
	groupListModal.init();
	groupListModal.initPreselect();
	groupListModalForm.init();
	groupListModalFormValidation.init();
});

window.addEventListener("load", () => {
	const reviewsSlider = new Swiper(".teachers-slider", TeachersSlider);
	const videoPlayer = new VideoPlayer({
		triggerSelector: ".video-player__play-button",
		posterSelector: ".video-player__image",
		playerSelector: ".video-player__player"
	});

	reviewsSlider.init();
	videoPlayer.init();
});
