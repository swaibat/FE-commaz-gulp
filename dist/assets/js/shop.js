var shopOptions = {
	valueNames: ['title', 'description', 'price', 'category', 'discount', 'rating'],
	page: 16,
	pagination: true,
};

let products = new List('products-list', shopOptions);
// $(document).ready(() => $('.products-count').text(products.matchingItems.length));
$('input').change(() => {
	console.log(products.matchingItems.length);
	if (!products.matchingItems.length) {
		console.log('hello');
		$(`<h4 class="m-auto">No Items in Cart</h4>`).appendTo('.grid-view');
	}
});

(function () {
	var parent = document.querySelector('#rangeSlider');
	if (!parent) return;

	var rangeS = parent.querySelectorAll('input[type=range]'),
		numberS = parent.querySelectorAll('input[type=number]');

	rangeS.forEach(function (el) {
		el.oninput = function () {
			var slide1 = parseFloat(rangeS[0].value),
				slide2 = parseFloat(rangeS[1].value);

			if (slide1 > slide2) {
				[slide1, slide2] = [slide2, slide1];
			}

			numberS[0].value = slide1;
			numberS[1].value = slide2;

			products.filter(function (item) {
				const itemPrice = parseInt(item.values().price);
				if (itemPrice > slide1 && itemPrice < slide2) {
					return true;
				} else {
					return false;
				}
			});
		};
	});

	numberS.forEach(function (el) {
		el.oninput = function () {
			var number1 = parseFloat(numberS[0].value),
				number2 = parseFloat(numberS[1].value);

			if (number1 > number2) {
				var tmp = number1;
				numberS[0].value = number2;
				numberS[1].value = tmp;
			}

			rangeS[0].value = number1;
			rangeS[1].value = number2;

			products.filter(function (item) {
				const itemPrice = parseInt(item.values().price);
				if (itemPrice > number1 && itemPrice < number2) {
					return true;
				} else {
					return false;
				}
			});
		};
	});
})();

$('#product-categories input').change(({ target }) => {
	products.add(
		products.filter(function (item) {
			if (item.values().category == target.id) {
				// console.log(filters)
				return true;
			} else {
				return false;
			}
		}),
	);
});

$('#discounts input').change(({ target }) => {
	products.filter(function (item) {
		if (item.values().discount >= target.id) {
			return true;
		} else {
			return false;
		}
	});
});

$('#ratings input').change(({ target }) => {
	products.filter(function (item) {
		if (item.values().discount >= target.id) {
			return true;
		} else {
			return false;
		}
	});
});

var categoryOptions = {
	valueNames: ['name'],
};

const categories = new List('product-categories', categoryOptions);
