var Translit = (function () {
    function Translit(textbox, translitArrays) {
        this.textbox = textbox;
        this.prevLetter = "";
        this.prevPrevLetter = "";
        this.ctrlPressed = false;
        this.translitArrays = translitArrays;
    }
    Translit.prototype.tryCode = function (letter, prev) {
        var translitIndex = (prev == undefined) ? this.translitArrays.translitArray.indexOf(letter) : this.translitArrays.translitArray.indexOf(prev.join("") + letter);

        if (translitIndex != -1) {
            var russian = this.translitArrays.alphabetArray[translitIndex];

            if (prev != undefined) {
                this.deleteCharacterBeforeCursor();
            }

            this.textbox.insertAtCursor(russian);

            return true;
        }

        return false;
    };

    Translit.prototype.deleteCharacterBeforeCursor = function () {
        var selectionStart = this.textbox.getSelectionStart();

        this.textbox.val(function (index, val) {
            return val.substr(0, selectionStart - 1) + val.substr(selectionStart, val.length);
        });

        this.textbox.setCursorPosition(selectionStart - 1);
    };

    Translit.prototype.init = function () {
        var _this = this;
        this.textbox.keypress(function (event) {
            return _this.keyPress(event);
        });
    };

    Translit.prototype.keyPress = function (event) {
        var letter = String.fromCharCode(event.charCode);

        if (this.tryCode(letter, [this.prevPrevLetter, this.prevLetter]) || this.tryCode(letter, [this.prevLetter]) || this.tryCode(letter)) {
            event.preventDefault();
            this.prevPrevLetter = this.prevLetter;
            this.prevLetter = letter;
        }
    };
    return Translit;
})();
//# sourceMappingURL=translit.js.map
