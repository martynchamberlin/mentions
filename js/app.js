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
	$('textarea').autosize();
	$('textarea').bind('keyup', function(e) 
	{
		var value = $(this).val();
		var pos = parseInt($(this).getCursorPosition());

		if (isValidMention(value, pos))
		{
			// Do some Ajax
		}
	});

	function isWhiteSpace(space)
	{
		return (space === " " || space == "\n" || space == "\t");
	}

	function isValidMention(value, pos)
	{
		var output = "";

		var start = end = pos -1;

		while ( start > 0 && ! isWhiteSpace(value[start - 1]) && ! isWhiteSpace(value[start]))
		{
			start--;
		}

		while ( end < (value.length -1) && !isWhiteSpace(value[end + 1]))
		{
			end++;
		}

		$('#output').html(start + " " + end);

		if (end - start >= 1 && value[start] == '@')
		{
			for (var i = start; i <= end; i++)
			{
				output += value[i];
			}
			$('#output').append(" " + output);
		}

		if (true)
		{
			return true;
		}
		return false;
	}

	function showDropdown()
	{
		$('#dropdown').show();
		var top = $('textarea').outerHeight() + $('textarea').offset().top;
		var width = $('textarea').outerWidth();
		var ul = '<ul><li><input type="hidden" value="@martynchamberlin">Martyn Chamberlin @martynchamberlin</li><li><input type="hidden" value="@markmedian"> Mark Median @markmedian</li><li><input type="hidden" value="@Mitchel"> Mark Median @markmedian</li></ul>';
		$('#dropdown').html(ul).css('width', width -2);
		makeDropdownPretty();
	}

	function makeDropdownPretty()
	{
		$('#dropdown li').first().addClass('first');
		$('#dropdown li').last().addClass('last');
	}

	showDropdown();
});


