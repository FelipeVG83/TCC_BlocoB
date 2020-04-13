import { Component, OnInit, Output, EventEmitter } from '@angular/core';
declare var $: any;

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

	@Output() mudaComponente = new EventEmitter();
	componenteSelecionado = 'dashboard';

	constructor() { }

	ngOnInit() {
		$('#sidebarToggle, #sidebarToggleTop').on('click', (e) => {
			$('body').toggleClass('sidebar-toggled');
			$('.sidebar').toggleClass('toggled');
			if ($('.sidebar').hasClass('toggled')) {
				$('.sidebar .collapse').collapse('hide');
			}
		});

		// Close any open menu accordions when window is resized below 768px
		$(window).resize(() => {
			if ($(window).width() < 768) {
				$('.sidebar .collapse').collapse('hide');
			}
		});

		// Prevent the content wrapper from scrolling when the fixed side navigation hovered over
		$('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', (e) => {
			if ($(window).width() > 768) {
				const e0 = e.originalEvent;
				const delta = e0.wheelDelta || -e0.detail;
				// this.scrollTop += (delta < 0 ? 1 : -1) * 30;
				e.preventDefault();
			}
		});

		// Scroll to top button appear
		$(document).on('scroll', () => {
			const scrollDistance = $(this).scrollTop();
			if (scrollDistance > 100) {
				$('.scroll-to-top').fadeIn();
			} else {
				$('.scroll-to-top').fadeOut();
			}
		});

		// Smooth scrolling using jQuery easing
		$(document).on('click', 'a.scroll-to-top', (e) => {
			const $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: ($($anchor.attr('href')).offset().top)
			}, 1000, 'easeInOutExpo');
			e.preventDefault();
		});
	}

	mudarComponente(componente) {
		this.componenteSelecionado = componente;
		this.mudaComponente.emit(componente);
	}
}
