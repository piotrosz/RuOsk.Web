/// <reference path="scripts/typings/jquery/jquery.d.ts" />
/// <reference path="scripts/typings/jqueryui/jqueryui.d.ts" />
/// <reference path="app.d.ts" />
jQuery.fn.extend({
    insertAtCursor: function (myValue) {
        return this.each(function (i) {
            if (document.selection) {
                this.focus();
                var sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
            } else if (this.selectionStart || this.selectionStart == "0") {
                var startPos = this.selectionStart;
                var endPos = this.selectionEnd;
                var scrollTop = this.scrollTop;
                this.value = this.value.substring(0, startPos) + myValue + this.value.substring(endPos, this.value.length);
                this.focus();
                this.selectionStart = startPos + myValue.length;
                this.selectionEnd = startPos + myValue.length;
                this.scrollTop = scrollTop;
            } else {
                this.value += myValue;
                this.focus();
            }
        });
    }
});

var Button = (function () {
    function Button(rowIndex, character) {
        this.character = character;
        var row = $('.row').get(rowIndex);
        this.element = $("<input />", { class: "button info", type: "button" });
        $(row).append(this.element).append("&nbsp;");
    }
    Button.prototype.setStyle = function (style) {
        this.element.attr("style", style);
    };

    Button.prototype.click = function (f) {
        this.element.click(f);
    };

    Button.prototype.val = function (value) {
        this.element.val(value);
    };

    Button.prototype.toLower = function () {
        if (this.character != undefined) {
            this.element.val(this.character.lower);
        }
    };

    Button.prototype.toUpper = function () {
        if (this.character != undefined) {
            this.element.val(this.character.upper);
        }
    };
    return Button;
})();

var Output = (function () {
    function Output(textbox) {
        this.textbox = textbox;
    }
    Output.prototype.append = function (char) {
        this.textbox.insertAtCursor(char);
    };

    Output.prototype.clear = function () {
        this.textbox.val("");
    };

    Output.prototype.isEmpty = function () {
        this.textbox.val() == "";
    };
    return Output;
})();

var Character = (function () {
    function Character(lower, upper) {
        this.lower = lower;
        this.upper = upper;
    }
    return Character;
})();

var Keyboard = (function () {
    function Keyboard(output) {
        this.output = output;
        this.capsLockPressed = false;
        this.shiftPressed = false;
        this.buttons = [];
    }
    Keyboard.prototype.pressButton = function (button) {
        this.output.append(this.isShiftOrCapsLockPressed() ? button.character.upper : button.character.lower);

        if (this.shiftPressed) {
            this.shiftPressed = false;
            this.changeKeyboardCase();
        }
    };

    Keyboard.prototype.bindLetter = function (rowIndex, lower, upper, style) {
        var _this = this;
        var upperCase = upper == undefined ? lower.toUpperCase() : upper;
        var button = new Button(rowIndex, new Character(lower, upperCase));
        button.click(function () {
            _this.pressButton(button);
        });
        button.val(lower);

        if (style != undefined && style != null) {
            button.setStyle(style);
        }

        this.buttons.push(button);
    };

    Keyboard.prototype.init = function () {
        var _this = this;
        this.bindLetter(0, "ё");
        this.bindLetter(0, "1", "!");
        this.bindLetter(0, "2", '"');
        this.bindLetter(0, "3", "№");
        this.bindLetter(0, "4", ";");
        this.bindLetter(0, "5", "%");
        this.bindLetter(0, "6", ":");
        this.bindLetter(0, "7", "?");
        this.bindLetter(0, "8", "*");
        this.bindLetter(0, "9", "(");
        this.bindLetter(0, "0", ")");
        this.bindLetter(0, "-", "_");
        this.bindLetter(0, "=", "+");

        this.bindLetter(1, "й");
        this.bindLetter(1, "ц");
        this.bindLetter(1, "у");
        this.bindLetter(1, "к");
        this.bindLetter(1, "е");
        this.bindLetter(1, "н");
        this.bindLetter(1, "г");
        this.bindLetter(1, "ш");
        this.bindLetter(1, "щ");
        this.bindLetter(1, "з");
        this.bindLetter(1, "х");
        this.bindLetter(1, "ъ");

        var button = new Button(2);
        button.val("Caps Lock");
        button.click(function () {
            _this.capsLockPressed = !_this.capsLockPressed;
            _this.changeKeyboardCase();
        });
        this.buttons.push(button);

        this.bindLetter(2, "ф");
        this.bindLetter(2, "ы");
        this.bindLetter(2, "в");
        this.bindLetter(2, "а");
        this.bindLetter(2, "п");
        this.bindLetter(2, "р");
        this.bindLetter(2, "о");
        this.bindLetter(2, "л");
        this.bindLetter(2, "д");
        this.bindLetter(2, "ж");
        this.bindLetter(2, "э");

        this.bindLetter(3, "я");
        this.bindLetter(3, "ч");
        this.bindLetter(3, "с");
        this.bindLetter(3, "м");
        this.bindLetter(3, "и");
        this.bindLetter(3, "т");
        this.bindLetter(3, "ь");
        this.bindLetter(3, "б");
        this.bindLetter(3, "ю");
        this.bindLetter(3, ".", ",");

        button = new Button(4);
        button.click(function () {
            _this.shiftPressed = !_this.shiftPressed;
            _this.changeKeyboardCase();
        });
        button.setStyle("width: 60px;");
        button.val("Shift");
        this.buttons.push(button);

        this.bindLetter(4, " ", " ", "width: 220px;");

        button = new Button(4);
        button.click(function () {
            _this.shiftPressed = !_this.shiftPressed;
            _this.changeKeyboardCase();
        });
        button.setStyle("width:60px;");
        button.val("Shift");
        this.buttons.push(button);

        this.bindLetter(5, "ся", null, "width: 60px;");
        this.bindLetter(5, "ть", null, "width: 60px;");
        this.bindLetter(5, "ль", null, "width: 60px;");
        this.bindLetter(5, "нь", null, "width: 60px;");
        this.bindLetter(5, "ый", null, "width: 60px;");
        this.bindLetter(5, "ие", null, "width: 60px;");
    };

    Keyboard.prototype.isShiftOrCapsLockPressed = function () {
        return this.shiftPressed || this.capsLockPressed;
    };

    Keyboard.prototype.changeKeyboardCase = function () {
        var _this = this;
        $.each(this.buttons, function (index, value) {
            _this.isShiftOrCapsLockPressed() ? value.toUpper() : value.toLower();
        });
    };
    return Keyboard;
})();

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

            var labelStyle = index % 2 == 0 ? "default" : "success";

            $("#legend1").append("<span class='label " + labelStyle + "' style='width: 28px;' data-hint='" + hint + "' data-hint-position='top'>" + _this.translitArray[index] + "</span>");
            $("#legend2").append("<span class='label " + labelStyle + "' style='width: 28px;' data-hint='" + hint + "'><strong>" + _this.alphabetArray[index] + "</strong></span>");
        });
    };

    Translit.prototype.tryCode = function (letter, prev) {
        var index = -1;

        if (prev == undefined) {
            index = this.translitArray.indexOf(letter);
        } else {
            index = this.translitArray.indexOf(prev.join("") + letter);
        }

        if (index != -1) {
            var russian = this.alphabetArray[index];

            if (prev != undefined) {
                // Delete last character
                this.textbox.val(function (index, val) {
                    return val.substr(0, val.length - 1);
                });
            }

            this.textbox.insertAtCursor(russian);

            return true;
        }
        return false;
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

$(function () {
    var textbox = $("#output");

    var output = new Output(textbox);
    var keyboard = new Keyboard(output);
    keyboard.init();

    var translit = new Translit(textbox);
    translit.init();
});
//# sourceMappingURL=app.js.map
