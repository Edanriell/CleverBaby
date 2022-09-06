import { SwiperOptions } from "swiper";

export const TeachersSlider: SwiperOptions = {
	slidesPerView: 1,
	spaceBetween: 30,
	loop: true,
	autoplay: {
		delay: 60000,
		disableOnInteraction: false,
		pauseOnMouseEnter: true
	},
	keyboard: {
		enabled: true
	},
	navigation: {
		nextEl: ".teachers-slider__button-next",
		prevEl: ".teachers-slider__button-prev"
	},
	grabCursor: false,
	breakpoints: {
		768: {
			slidesPerView: 3,
			spaceBetween: 30,
			grabCursor: true
		},
		1366: {
			slidesPerView: 4,
			spaceBetween: 30,
			grabCursor: true
		}
	},
	mousewheel: true
};
