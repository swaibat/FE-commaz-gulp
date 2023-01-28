// NOTIFICATIONS
$(() => {
	const notificationsOptions = {
		valueNames: ['name', 'subject', 'body', 'read', 'status'],
		page: 5,
		pagination: true,
	};

	const notifications = new List('notifications-list', notificationsOptions);
	$('.notifications-sidenav .read-filter').click(({ target }) => {
		console.log(target);
		const queryId = $(target).closest('li').attr('id');
		notifications.filter((item) => {
			console.log(item.values().read, queryId);
			if (item.values().read == queryId) {
				return true;
			} else {
				return false;
			}
		});
	});

	$('.notifications-sidenav .status-filter').click(({ target }) => {
		const queryId = $(target).closest('li').attr('id');
		notifications.filter((item) => {
			if (item.values().status == queryId) {
				return true;
			} else {
				return false;
			}
		});
	});

	$('.jTablePageNext').on('click', function () {
		var list = $('.pagination').find('li');
		$.each(list, function (position, element) {
			if ($(element).is('.active')) {
				$(list[position + 1]).trigger('click');
			}
		});
	});

	$('.jTablePagePrev').on('click', function () {
		console.log('hello');
		var list = $('.pagination').find('li');
		$.each(list, function (position, element) {
			if ($(element).is('.active')) {
				$(list[position - 1]).trigger('click');
			}
		});
	});
});

// STAR RATING
$('.read-only').starRating({
	starShape: 'rounded',
	readOnly: true,
	starSize: 17,
	activeColor: 'orange',
	useGradient: false,
});

// SHOPPING CART
$(() => {
	const cartOptions = { valueNames: ['title', 'price'] };
	const notFound = () => {
		$('#tax, #shipping').text(0);
		$(`<h4 id="notfound" class="m-auto">No Items in Cart</h4>`).appendTo('.cart-wrapper');
	};
	$('.btn-up').click(({ target }) => {
		const id = $(target).attr('id').split('-')[2];
		const basePrice = parseInt($(`#form-control-${id}`).val()) + 1;
		const currentInput = parseInt($(`#price-${id}`).text()) * basePrice;
		const totalPrice = $('.cart-wrapper .price')
			.not(`#price-${id}`)
			.map((a, e) => parseInt($(e).text()))
			.get();
		const subTotal = [...totalPrice, currentInput].reduce((a, b) => a + b);
		$('#s-total').text(subTotal);
		$('#g-total').text(subTotal + parseInt($('#shipping').text()) + parseInt($('#tax').text()));
		console.log(subTotal);
	});

	$('.btn-down').click(({ target }) => {
		const id = $(target).attr('id').split('-')[2];

		const basePrice = parseInt($(`#form-control-${id}`).val()) - 1;
		const currentInput = parseInt($(`#price-${id}`).text()) * basePrice;
		const totalPrice = $('.cart-wrapper .price')
			.not(`#price-${id}`)
			.map((a, e) => parseInt($(e).text()))
			.get();
		const subTotal = [...totalPrice, currentInput].reduce((a, b) => a + b);
		$('#s-total').text(subTotal);
		$('#g-total').text(subTotal + parseFloat($('#shipping').text()) + parseFloat($('#tax').text()));
		console.log(subTotal);
	});

	const cart = new List('shopping-cart', cartOptions);
	// update total

	$('.btn-up').click(({ target }) => {
		const id = target.id.split('-')[2];
		const input = $(`#form-control-${id}`);
		input.val(JSON.parse(input.val()) + 1);
		$(`#price-${id}`).text(JSON.parse(input.val()) * JSON.parse($(`#price-${id}`).text()));
		// updateTotal(cart)
	});

	$('.btn-down').click(({ target }) => {
		const id = target.id.split('-')[2];
		const input = $(`#form-control-${id}`);
		if (input.val() >= 1) {
			$(`#price-${id}`).text(JSON.parse($(`#price-${id}`).text()) / JSON.parse(input.val()));
			input.val(JSON.parse(input.val()) - 1);
		}
		// updateTotal(cart)
	});

	$('#shopping-cart .btn').click(({ target }) => {
		cart.remove('title', $(`#${target.id}`).parent().find('.title').text());
	});
	// clear cart
	$('#clear-cart').click(() => {
		cart.clear();
		$('.badge-cart, #g-total, #s-total, #shipping').text(0);
		notFound();
	});

	// remove one item
	$('#shopping-cart .btn-cancel').click(() => {
		// reduce the counter price
		const prices = cart.visibleItems.map((e) => (count = +JSON.parse(e.values().price)));
		const sum = prices.reduce(function (a, b) {
			return a + b;
		}, 0);
		// add to sub total
		$('#s-total').text(sum);
		// add to total (sub-total + shipping + tax)
		$('#g-total').text(sum + JSON.parse($('#shipping').text()) + JSON.parse($('#tax').text()));
		$('.badge-cart').text(cart.visibleItems.length);
		if (!cart.visibleItems.length) {
			notFound();
		}
	});

	// add to cart
	$('.product-card .cart').change(() => {
		$('.badge-cart').text(JSON.parse($('.badge-cart').text()) + 1);
	});
});

// GLOBAL SCRIPT
$(() => {
	$('[data-toggle="tooltip"]').tooltip();
});

$(document).ready(() => {
	$('.select2').select2();
});

$('#d-mode').change(() => {
	$('body').toggleClass('dark-mode');
	!localStorage.getItem('theme') ? localStorage.setItem('theme', 'dark-mode') : localStorage.removeItem('theme');
});

$('body').addClass(localStorage.getItem('theme'));

$('#toggle-filter').click(() => {
	$('#products-list').toggleClass('ml-0');
	$('.grid-view').toggleClass('grid-view-sm');
	$('#filter-Sidenav').toggleClass('toggle-filter');
});

$('.sidebar-close-icon').click(() => {
	$('.grid-view').toggleClass('grid-view-sm');
	$('#filter-Sidenav').toggleClass('toggle-filter');
});
// carousel
$('#carousel').owlCarousel({
	autoplay: false,
	lazyLoad: true,
	loop: true,
	margin: 20,
	responsiveClass: true,
	autoHeight: true,
	autoplayTimeout: 7000,
	smartSpeed: 800,
	nav: true,
	responsive: {
		0: {
			items: 1,
		},

		600: {
			items: 3,
		},

		1024: {
			items: 4,
		},

		1366: {
			items: 4,
		},
	},
});

// FLASH SALE TIMER
function flashSale(params) {
	function getTimeRemaining(endtime) {
		var t = Date.parse(endtime) - Date.parse(new Date());
		var seconds = Math.floor((t / 1000) % 60);
		var minutes = Math.floor((t / 1000 / 60) % 60);
		var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
		var days = Math.floor(t / (1000 * 60 * 60 * 60 * 24));
		return {
			total: t,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		};
	}

	function initializeClock(endtime) {
		var timeinterval = setInterval(function () {
			var t = getTimeRemaining(endtime);
			document.querySelector('.days > .value').innerText = t.days;
			document.querySelector('.hours > .value').innerText = t.hours;
			document.querySelector('.minutes > .value').innerText = t.minutes;
			document.querySelector('.seconds > .value').innerText = t.seconds;
			if (t.total <= 0) {
				clearInterval(timeinterval);
			}
		}, 1000);
	}
	initializeClock(new Date().getFullYear() + 1 + '/1/1');
};

$(document).ready(()=>{
	$('body').removeClass('loader');
})
