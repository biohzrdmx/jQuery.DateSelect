/**
* jQuery DateSelect
* @author biohzrdmx <github.com/biohzrdmx>
* @version 1.0
* @requires jQuery 1.8+
* @license MIT
*/
(function($) {
	// Default options
	$.dateSelect = {
		templates: {
			selector:
				'<div class="date-select">' +
					'<div class="date-select popup">' +
						'<span class="tip"></span>' +
						'<div class="select day">' +
							'<a href="#" class="btn-arrow btn-up"><i class="icon icon-up"></i></a>' +
							'<div>' +
								'<span class="num">01</span>' +
								'<span class="text">Thursday</span>' +
							'</div>' +
							'<a href="#" class="btn-arrow btn-down"><i class="icon icon-down"></i></a>' +
						'</div>' +
						'<div class="select month">' +
							'<a href="#" class="btn-arrow btn-up"><i class="icon icon-up"></i></a>' +
							'<div>' +
								'<span class="num">01</span>' +
								'<span class="text">September</span>' +
							'</div>' +
							'<a href="#" class="btn-arrow btn-down"><i class="icon icon-down"></i></a>' +
						'</div>' +
						'<div class="select year">' +
							'<a href="#" class="btn-arrow btn-up"><i class="icon icon-up"></i></a>' +
							'<div>' +
								'<span class="num">2014</span>' +
							'</div>' +
							'<a href="#" class="btn-arrow btn-down"><i class="icon icon-down"></i></a>' +
						'</div>' +
						'<div class="buttons">' +
							'<a href="#" class="btn-cancel"><i class="fa fa-times"></i></a>' +
							'<a href="#" class="btn-ok"><i class="fa fa-check"></i></a>' +
						'</div>' +
					'</div>' +
				'</div>'
		},
		defaults: {
			formatDate: function(date) {
				var formatted = $.dateSelect.pad(date.getDate(), 2) + '/' + $.dateSelect.pad(date.getMonth() + 1, 2) + '/' + date.getFullYear();
				return formatted;
			},
			parseDate: function(string) {
				var date = new Date();
				var parts = string.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
				if (parts && parts.length == 4) {
					date = new Date(parts[3], parts[2] - 1, parts[1]);
				}
				return date;
			},
			callbacks: {
				onShow: function(widget) {
					// Do nothing
				},
				onHide: function(widget) {
					// Do nothing
				}
			},
			container: 'body',
			element: null,
			date: new Date().toDateString(),
			strings: {
				days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
				months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
			}
		},
		pad: function(num, size) {
			var s = num+"";
			while (s.length < size) s = "0" + s;
			return s;
		},
		update: function(el, date, opts) {
			var day = el.find('.day'),
				month = el.find('.month'),
				year = el.find('.year'),
				dayNum = day.find('.num'),
				monthNum = month.find('.num'),
				yearNum = year.find('.num'),
				dayText = day.find('.text'),
				monthText = month.find('.text'),
				curDay = date.getDate(),
				curWeekday = date.getDay(),
				curMonth = date.getMonth(),
				curYear = date.getFullYear();
			//
			dayNum.text( curDay );
			monthNum.text( curMonth + 1 );
			yearNum.text( curYear );
			dayText.text( opts.strings.days[curWeekday] );
			monthText.text( opts.strings.months[curMonth] );
		},
		show: function(options) {
			var obj = this,
				opts = $.extend(true, {}, $.dateSelect.defaults, options),
				markup = $(obj.templates.selector),
				date = new Date(opts.date);
			// Get rid of another popups
			obj.hide(true);
			// Initialize value
			if (opts.element) {
				if ( typeof opts.element == 'string' ) {
					opts.element = $(opts.element);
				}
				date = opts.parseDate(opts.element.val());
			}
			// Update current selection
			obj.update(markup, date, opts);
			// Bind events
			markup.on('click', '.day .btn-up', function(e) {
				date.setDate( date.getDate() + 1 );
				obj.update(markup, date, opts);
				e.preventDefault();
			});
			markup.on('click', '.day .btn-down', function(e) {
				date.setDate( date.getDate() - 1 );
				obj.update(markup, date, opts);
				e.preventDefault();
			});
			markup.on('click', '.month .btn-up', function(e) {
				date.setMonth( date.getMonth() + 1 );
				obj.update(markup, date, opts);
				e.preventDefault();
			});
			markup.on('click', '.month .btn-down', function(e) {
				date.setMonth( date.getMonth() - 1 );
				obj.update(markup, date, opts);
				e.preventDefault();
			});
			markup.on('click', '.year .btn-up', function(e) {
				date.setFullYear( date.getFullYear() + 1 );
				obj.update(markup, date, opts);
				e.preventDefault();
			});
			markup.on('click', '.year .btn-down', function(e) {
				date.setFullYear( date.getFullYear() - 1 );
				obj.update(markup, date, opts);
				e.preventDefault();
			});
			markup.on('click', '.btn-ok', function(e) {
				e.preventDefault();
				var formatted = opts.formatDate(date);
				$(opts.element).val(formatted);
				$(opts.element).trigger("change");
				obj.hide();
			});
			markup.on('click', '.btn-cancel', function(e) {
				e.preventDefault();
				obj.hide();
			});
			markup.on('mousewheel', '.day', function(e) {
				if (e.deltaY > 0) {
					$('.day .btn-up').trigger('click');
				} else if (e.deltaY < 0) {
					$('.day .btn-down').trigger('click');
				}
			});
			markup.on('mousewheel', '.month', function(e) {
				if (e.deltaY > 0) {
					$('.month .btn-up').trigger('click');
				} else if (e.deltaY < 0) {
					$('.month .btn-down').trigger('click');
				}
			});
			markup.on('mousewheel', '.year', function(e) {
				if (e.deltaY > 0) {
					$('.year .btn-up').trigger('click');
				} else if (e.deltaY < 0) {
					$('.year .btn-down').trigger('click');
				}
			});
			// Add element to DOM
			markup.hide();
			$(opts.container).append(markup);
			// Position
			if (opts.element) {
				var offset = opts.element.offset();
				//
				markup.css({
					left: offset.left + 'px',
					top: offset.top + opts.element.outerHeight(true) + 15 + 'px'
				});
			}
			// Show
			markup.data('opts', opts);
			markup.fadeIn(150, function() {
				opts.callbacks.onShow(markup);
			});
		},
		hide: function(force) {
			var force = force || false,
				el = $('.date-select'),
				opts = el.data('opts' || {});
			if (el.length) {
				if (force) {
					opts.callbacks.onHide(el);
					el.remove();
				} else {
					el.fadeOut(150, function() {
						opts.callbacks.onHide(el);
						el.remove();
					});
				}
			}
		}
	};
	// Manual binding
	$.fn.dateSelect = function(options) {
		if (!this.length) { return this; }
		var opts = $.extend(true, {}, $.dateSelect.defaults, options);
		this.each(function() {
			var el = $(this),
				parent = el.parent();
			// Bind to the element itself
			el.on('click', function() {
				$.dateSelect.show({
					element: el
				});
			});
			// Does it have a button?
			parent.find('[data-toggle=select]').on('click', function(e) {
				e.preventDefault();
				if ( $('.date-select:visible').length ) {
					$.dateSelect.hide();
				} else {
					$.dateSelect.show({
						element: el
					});
				}
			});
		});
		return this;
	};
	// Data support
	$('[data-select=date]').each(function() {
		var el = $(this);
		el.dateSelect();
	});
})(jQuery);
