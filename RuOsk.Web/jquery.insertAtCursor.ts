/// <reference path="jquery.cursor.ts" />

jQuery.fn.extend({
    insertAtCursor: function (value) {
        return this.each(function () {
            if (document.selection) {
                this.focus();
                var selection = document.selection.createRange();
                selection.text = value;
                this.focus();
            }
            else if (this.selectionStart || this.selectionStart == "0") {
                var selectionStart = this.selectionStart;
                var selectionEnd = this.selectionEnd;
                var scrollTop = this.scrollTop;
                this.value = this.value.substring(0, selectionStart) + value + this.value.substring(selectionEnd, this.value.length);
                $(this).setCursorPosition(selectionStart + value.length);
                this.scrollTop = scrollTop;
            }
            else {
                this.value += value;
                this.focus();
            }
        });
    }
});  