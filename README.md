jQuery.DateSelect
=================

There are a lot of date pickers out there, but why have an old and boring calendar when you can have a modern and slick date selector?

Meet DateSelect, a new way to select dates on your forms.

##Installing

Just grab the JS and CSS files, include them on your HTML file and you're set.

	<link rel="stylesheet" href="css/jquery.dateselect.css">

	<script type="text/javascript" src="js/jquery.dateselect.js"></script>

##Basic usage

This awesome plugin has two operation modes: automatic or manual.

###Automatic mode

In automatic mode you'll just have to add a `data-*` attribute and the plugin will do all thee work (but for this to work, you must have also a valid HTML 5 DOCTYPE).

If you can't (or don't want to) add a DOCTYPE you can still use the good old `$('#input').dateSelect()` to bind your input fields.

**HTML**

	<input type="text" name="date1" id="date1" class="form-control" data-select="date">
	<span class="input-group-btn">
		<button class="btn btn-primary" type="button" data-toggle="select"><i class="fa fa-calendar"></i></button>
	</span>


###Manual mode

In manual mode, you'll have to call the `$.dateSelect.show()` method to open the date picker.

**HTML**

	<input type="text" name="date2" id="date2" class="form-control">
	<span class="input-group-btn">
		<button class="btn btn-primary btn-date" type="button"><i class="fa fa-calendar"></i></button>
	</span>

**JS**

	$('.btn-date').on('click', function(e) {
		e.preventDefault();
		$.dateSelect.show({
			element: 'input[name="date2"]'
		});
	});

###It's customizable

You may use the included stylesheet or style it to fit your page design. It's up to you!

###And it works with your mouse wheel too!

Just include the [jQuery MouseWheel](https://github.com/brandonaaron/jquery-mousewheel) plugin and it will automagically make it work.

###So what do you need?

 - [jQuery](http://jquery.com/) 1.8+
 - [jQuery MouseWheel](https://github.com/brandonaaron/jquery-mousewheel) plugin (optional)
 - [FontAwesome](http://fontawesome.io) (for the OK/Cancel icons)
 - A fairly modern web browser (Firefox, Chrome or Opera suggested. It should work on IE8+, but please stop supporting that crap)
 - A valid HTML 5 DOCTYPE (strongly recommended)

##Licensing

This software is released under the MIT license.

Copyright © 2014 biohzrdmx

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

###Contributing

Fork the repo, add an interesting feature or fix a bug and send a pull request.

###Troubleshooting

As was said earlier, this works on Chrome, Firefox and Opera. IE8+ should work too, but we aren't officially supporting it (maybe IE10, but it's still a buggy, crappy browser; please let them die alone).

Safari shouldn't have any problem, after all it's just another webkit flavor.

##Credits

**Lead coder:** biohzrdmx [github.com/biohzrdmx](http://github.com/biohzrdmx
)
