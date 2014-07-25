/**
* Cursor Functions
*
* Used for setting and getting text cursor position within an input
* and textarea field. Also used to get and set selection range.
* 
* @author Branden Cash
* @email brandencash@crutzdesigns.com
*/

(function ($) {
    jQuery.fn.getCursorPosition = function () {
        if (this.lengh == 0) return -1;
        return $(this).getSelectionStart();
    }

    jQuery.fn.setCursorPosition = function (position) {
        if (this.lengh == 0) return this;
        return $(this).setSelection(position, position);
    }

    jQuery.fn.getSelection = function () {
        if (this.lengh == 0) return -1;
        var selectionStart = $(this).getSelectionStart();
        var selectionEnd = $(this).getSelectionEnd();
        return this[0].value.substring(selectionStart, selectionEnd);
    }

    jQuery.fn.getSelectionStart = function () {
        if (this.lengh == 0) return -1;
        var input = this[0];

        var pos = input.value.length;

        if (input.createTextRange) {
            var range = document.selection.createRange().duplicate();
            range.moveEnd('character', input.value.length);
            pos = input.value.lastIndexOf(range.text);
        } else if (typeof (input.selectionStart) != "undefined")
            pos = input.selectionStart;

        return pos;
    }

    jQuery.fn.getSelectionEnd = function () {
        if (this.lengh == 0) return -1;
        var input = this[0];

        var position = input.value.length;

        if (input.createTextRange) {
            var range = document.selection.createRange().duplicate();
            range.moveStart('character', -input.value.length);
            position = input.value.lastIndexOf(range.text);
        } else if (typeof (input.selectionEnd) != "undefined")
            position = input.selectionEnd;

        return position;
    }

    jQuery.fn.setSelection = function (selectionStart, selectionEnd) {
        if (this.lengh == 0) return this;
        var input = this[0];

        if (input.createTextRange) {
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', selectionEnd);
            range.moveStart('character', selectionStart);
            range.select();
        } else if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(selectionStart, selectionEnd);
        }

        return this;
    }
})(jQuery);