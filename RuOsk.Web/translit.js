var Translit = (function () {
    function Translit(textbox) {
        this.textbox = textbox;
        this.alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
        this.translit = "a,b,v,g,d,e,jo,zh,z,i,j,k,l,m,n,o,p,r,s,t,u,f,h,c,ch,sh,shh,#,y,@,je,ju,ja";
        this.prevLetter = "";
        this.prevPrevLetter = "";
        this.ctrlPressed = false;
    }
    Translit.prototype.createLegend = function () {
        var _this = this;
        $.each(this.alphabet.split(""), function (index, value) {
            var hint = encodeURI(_this.translitArray[index]) + " &raquo; " + _this.alphabetArray[index];

            var labelStyle = index % 2 == 0 ? "default" : "info";

            $("#legend1").append("<span class='label " + labelStyle + "' style='width: 28px;' data-hint='" + hint + "' data-hint-position='top'>" + _this.translitArray[index] + "</span>");
            $("#legend2").append("<span class='label " + labelStyle + "' style='width: 28px;' data-hint='" + hint + "'><strong>" + _this.alphabetArray[index] + "</strong></span>");
        });
    };

    Translit.prototype.tryCode = function (letter, prev) {
        var translitIndex = (prev == undefined) ? this.translitArray.indexOf(letter) : this.translitArray.indexOf(prev.join("") + letter);

        if (translitIndex != -1) {
            var russian = this.alphabetArray[translitIndex];

            if (prev != undefined) {
                this.deleteCharacterBeforeCursor();
            }

            this.textbox.insertAtCursor(russian);

            return true;
        }

        return false;
    };

    // TODO: Refactor
    Translit.prototype.deleteCharacterBeforeCursor = function () {
        var textArea = document.getElementById(this.textbox.attr("id"));

        var selectionStart = textArea.selectionStart;
        var selectionEnd = textArea.selectionEnd;

        this.textbox.val(function (index, val) {
            return val.substr(0, textArea.selectionStart - 1) + val.substr(textArea.selectionStart, val.length);
        });

        textArea.focus();
        textArea.selectionStart = selectionStart - 1;
        textArea.selectionEnd = selectionEnd - 1;
    };

    Translit.prototype.init = function () {
        var _this = this;
        this.alphabetArray = this.alphabet.split("").concat(this.alphabet.toUpperCase().split(""));
        this.translitArray = this.translit.split(",").concat(this.translit.toUpperCase().split(","));

        this.createLegend();

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
