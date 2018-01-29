// Place universal JS here
var scrollSpeed = 20;
var $ = require('./vendor/jquery-3.3.1.min.js');

document.addEventListener("DOMContentLoaded", function() {
	var isi = new IsiComponent;
	isi.init();
});

function IsiComponent() {
	this.isiContainer = document.getElementById('isi-container');
	this.isi = document.getElementById('isi');
	this.customScrollbar = document.getElementById('custom-scrollbar');
	this.thumb = document.getElementById('thumb');

	this.containerHeight = this.isiContainer.offsetHeight;
	this.isiHeight = this.isi.scrollHeight;
	this.scrollableHeight = this.isiHeight - this.containerHeight;
	this.scrollbarWidth = this.isiContainer.offsetWidth - this.isi.offsetWidth;

	this.isiAnimation = null;

	this.init = function() {
		this.setStyles();
		this.startAutoScroll();
		this.isiContainer.addEventListener("scroll", this.scrollThumb.bind(this));
		this.isiContainer.addEventListener("mouseenter", this.pauseAutoScroll.bind(this));
		this.isiContainer.addEventListener("mouseleave", this.startAutoScroll.bind(this));
	}

	this.setStyles = function() {
		this.isi.style.height = this.isiHeight;
		this.customScrollbar.style.width = this.scrollbarWidth + "px";
	}

	this.scrollThumb = function() {
		this.thumb.style.top = this.isiContainer.scrollTop / this.scrollableHeight * 100 + "%";
	}

	this.startAutoScroll = function() {
		this.isiAnimation = $('#isi-container').animate({
			scrollTop: this.scrollableHeight
		}, (this.scrollableHeight - this.isiContainer.scrollTop) * 10, 'linear');
	}

	this.pauseAutoScroll = function() {
		this.isiAnimation.stop();
	}
}