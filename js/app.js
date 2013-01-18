/* This function complements of
 * http://stackoverflow.com/questions/1064089/inserting-a-text-where-cursor-is-using-javascript-jquery
 */

(function ($, undefined) {
    $.fn.getCursorPosition = function() {
        var el = $(this).get(0);
        var pos = 0;
        if('selectionStart' in el) {
            pos = el.selectionStart;
        } else if('selection' in document) {
            el.focus();
            var Sel = document.selection.createRange();
            var SelLength = document.selection.createRange().text.length;
            Sel.moveStart('character', -el.value.length);
            pos = Sel.text.length - SelLength;
        }
        return pos;
    }
})(jQuery);

jQuery(document).ready(function($)
{

	/* I wish Javascript were OOP. Here I'm declaring global variables. There
	 * are many functions that need to access `start` and `end`, and we don't
	 * like hardcoding DOM elements (`textarea` and `dropdown`) because your 
	 * choice of ideal HTML IDs might be totally different from mine.
	 */
	var mention = {
		showing: false,
		start: 0,
		end: 0,
		handle: "",
		options: ""
	};

	var textarea = $('textarea');
	var dropdown = $('#dropdown');

	var usable = new Array();
	var i;
	// A - Z
	for (i = 65; i <= 90; i++)
	{
		usable[usable.length] = String.fromCharCode(i);
	}
	// a - z
	for (i = 97; i <= 122; i++)
	{
		usable[usable.length] = String.fromCharCode(i);
	}
	// 0 - 9
	for (i = 0; i <= 9; i++)
	{
		usable[usable.length] = i;
	}

	// This external plugin isn't necessary, I just love using it everywhere
	$(textarea).autosize();

	/* All DOM events are shown here, followed by my custom functions.
	 *
	 * Starting with this function, the assumption is that the selected 
	 * `<li>` is based on a class on that persons's `<li>` element. It's not
	 * necessary for a simple click event, but it's paramount for arrowing
	 * functionality.
	 */
	$(dropdown).find('li').live("click", function()
	{
		$(this).addClass('selected');
		updateTextarea();
	});

	$(textarea).keydown(function(event)
	{
		var evnt = window.event ? window.event : event;
		evnt = evnt.keyCode;
		if (evnt == 40 || evnt == 38) // hitting enter
		{
			event.preventDefault();
			return false;
		}
	});

	$(textarea).bind('keyup', function(event) 
	{
		/* As soon as they type '@', we're doing a DB query on every keystroke.
		 * This could potentially mean that a viable return set is no longer in
		 * existence, meaning the dropdown menu no longer shows. If such is the
		 * case, we want this bool property to be false.
		 */

		var evnt = window.event ? window.event : event;
		evnt = evnt.keyCode;
		if (evnt == 13 && mention.showing) // hitting enter
		{
			//updateTextarea();
		
		}
		else if (evnt == 40 || evnt == 38 && mention.showing)
		{
		
			//arrow(evnt);
						event.preventDefault();
			return false;

		}
		$('#output').html(evnt);

		mention.showing = false;

		var value = $(this).val();
		var pos = parseInt($(this).getCursorPosition());

		if (isValidMention(value, pos))
		{
			// Do some Ajax
			var ajax = $.ajax({
				url: "ajax.php",
				type: "POST",
				data: { handle : mention.handle.substring(1, mention.handle.length)},
				dataType: 'json',
				success: function( data )
				{
					var output = "<ul>";
					for (var i = 0; i < data.length; i++)
					{
						output += "<li>" + data[i][0] + " " + data[i][1] + " "
						+ "<span class=\"handle\">@"
						+ data[i][2] + "</span><input type=\"hidden\" value=\"@"
						+ data[i][2] + "\"></li>";
					}
					if (data.length > 0)
					{
						mention.showing = true;
						mention.options = output;
						showDropdown(mention.options);
					}
					// We made a DB query, but nothing was returned
					else
					{
						hideDropdown();
					}
				}
			});
		}
		// 99% of the time, this will be the code that executes.
		else
		{
			hideDropdown();
		}

	});

	function arrow(direction)
	{
		if (direction == 40) // going down
		{
			if ($('li.selected').length < 1)
			{
				$(dropdown).find('li').first().addClass('selected');
			}
		}
	}

	function isWhiteSpace(space)
	{
		return (space === " " || space == "\n" || space == "\t");
	}

	function isNumberOrLetter(space)
	{
		var good = false;

		for (var i = 0; i < usable.length; i++)
		{
			if (usable[i] == space && ! isWhiteSpace(space))
			{
				good = true;
			}

		}
		return good;
	}


	function isValidMention(value, pos)
	{
		var output = "";

		mention.start = mention.end = pos - 1;

		while ( mention.start > 0 && isNumberOrLetter(value[mention.start]))
		{
			mention.start--;
		}
		while ( mention.end < (value.length -1) && isNumberOrLetter(value[mention.end + 1]))
		{
			mention.end++;
		}

		if (mention.end - mention.start >= 1 && value[mention.start] == '@')
		{
			for (var i = mention.start; i <= mention.end; i++)
			{
				output += value[i];
			}
			mention.handle = output;
			return true;
		}
		return false;
	}
	
	function updateTextarea()
	{
		var handle = $(dropdown).find('li.selected').find('input').val();
		var output = "";
		val = $(textarea).val();
		for (var i = 0; i < val.length; i++)
		{
			if ( i == mention.start )
			{
				output += handle;
				i = mention.end;
				continue;
			}
			output += val[i];
		}

		if (val.lenth - 1 == mention.end)
		{
			output += "";
		}
		$(textarea).val(output);
		hideDropdown();
	}

	function showDropdown(data)
	{
		$(dropdown).show();
		var top = $(textarea).outerHeight() + $(textarea).offset().top;
		var width = $(textarea).outerWidth();
		$(dropdown).html(data).css('width', width -2);
		//$(dropdown).find('li').first().addClass('selected');
		makeDropdownPretty();
	}

	function hideDropdown()
	{
		$(dropdown).html('').hide();
	}

	function makeDropdownPretty()
	{
		$(dropdown).find('li').first().addClass('first');
		$(dropdown).find('li').last().addClass('last');
	}

});


