var shopOptions = {
	valueNames: ['id', 'title', 'description', 'price', 'category', 'discount', 'rating','shipping-fee','shipping-from'],
	page: 20,
	pagination: true,
};

let products = new List('products-list', shopOptions);
console.log(products);

$('.products-list input').keyup(() => {
	notFoundText()
});

const notFoundText = () => {
	if (!$('.grid-view').children().length) {
		$('.grid-view').addClass('d-none');
		$('#not-found-text').removeClass('d-none');
	} else {
		$('.grid-view').removeClass('d-none');
		$('#not-found-text').addClass('d-none');
	}
};

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
			notFoundText()
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
			notFoundText()
		};
	});
})();

$('#product-categories input').change(({ target }) => {
	products.add(
		products.filter(function (item) {
			if (item.values().category == target.id) {
				return true;
			} else {
				return false;
			}
		}),
	);
	notFoundText()
});

$('#discounts input').change(({ target }) => {
	products.filter(function (item) {
		if (item.values().discount >= target.id) {
			return true;
		} else {
			return false;
		}
	});
	notFoundText()
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

// Checkout page
$('.btn-edit-checkout').click((e)=>{
	$(`.${e.target.id}`).next().toggleClass('show')
})
// steps
// personal
$('.btn-edit-checkout').click((e) => {
	$(`#form-${e.target.id}`).addClass('show')
	$(`#show-${e.target.id}`).addClass('d-none')
})

let errors = []

$('input').keydown(({ target }) => {
	errors = []
	$(".form-text").remove();
	getFields({ name: target.name, value: target.value })
	if (!errors.length) {
		console.log('hello');
		$(target).closest('form').find(':submit').removeAttr('disabled')
	} else {
		$(target).closest('form').find(':submit').attr('disabled')
	}
})

$('input').focusout(({ target }) => {
	errors = []
	$(".form-text").remove();
	getFields({ name: target.name, value: target.value })
	if (!errors.length) {
		$(target).closest('form').find(':submit').prop('disabled', false)
	} else {
		$(target).closest('form').find(':submit').prop('disabled', true)
	}
})

$('form').submit((e) => {
	e.preventDefault();
	$(".form-text").remove();
	$(e.target).serializeArray().map((el) => {
		getFields({ name: el.name, value: el.value })
	})
})


function showError(error) {
	errors.push(error);
	return `<small class="form-text text-danger">${error}</small>`;
};

function getFields(target) {
	console.log(target);
	const field = $(`#${target.name}`);
	const minLen = field.attr('minlength') && parseInt(field.attr('minlength'));
	const maxLen = field.attr('maxlength') && parseInt(field.attr('maxlength'));
	// const min = field.attr('min') && parseInt(field.attr('min').trim());
	const max = field.attr('max') && parseInt(field.attr('max'));
	field.attr('required') && !target.value && $(`#${target.name}`).after(showError(`${target.name} is required`));
	target.value && minLen > target.value.length && $(`#${target.name}`).after(showError(`${target.name} is too short (${minLen} minimum)`));
	target.value && maxLen < target.value.length && $(`#${target.name}`).after(showError(`${target.name} is too long (${maxLen} maximum)`));
	// value && min > value && $(`#${target.name}`).after(showError(`${target.name} is less (${min} minimum)`));
	target.value && max < target.value && $(`#${target.name}`).after(showError(`${target.name} is much try (${max} maximum)`));
}