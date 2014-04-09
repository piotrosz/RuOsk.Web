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

// Keyboard button
var Button = (function () {
    function Button(rowIndex, cyrillic, latin, cssClass) {
        if (typeof cssClass === "undefined") { cssClass = "button info"; }
        this.cyrillic = cyrillic;
        this.latin = latin;
        var row = $('.row').get(rowIndex);
        this.element = $("<input />", { class: cssClass, type: "button" });
        $(row).append(this.element).append("&nbsp;");

        if (cyrillic != undefined) {
            this.currentCharacter = cyrillic;
        }
    }
    Button.prototype.setClass = function (cssClass) {
        this.element.removeClass("success warning danger info primary");
        this.element.addClass(cssClass);
    };

    Button.prototype.setStyle = function (style) {
        this.element.attr("style", style);
    };

    Button.prototype.click = function (f) {
        this.element.click(f);
    };

    Button.prototype.val = function (value) {
        this.element.val(value);
    };

    Button.prototype.getVal = function () {
        return this.element.val();
    };

    Button.prototype.toLower = function () {
        if (this.currentCharacter != undefined) {
            this.element.val(this.currentCharacter.lower);
        }
    };

    Button.prototype.toUpper = function () {
        if (this.currentCharacter != undefined) {
            this.element.val(this.currentCharacter.upper);
        }
    };

    Button.prototype.toggleLatinCyrillic = function () {
        if (this.currentCharacter === this.cyrillic) {
            this.currentCharacter = this.latin;
        } else {
            this.currentCharacter = this.cyrillic;
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
        this.shiftButtons = [];
    }
    Keyboard.prototype.pressButton = function (button) {
        this.output.append(this.isShiftOrCapsLockPressed() ? button.currentCharacter.upper : button.currentCharacter.lower);

        if (this.shiftPressed) {
            this.shiftPressed = false;

            this.changeKeyboardCase();
            $.each(this.shiftButtons, function (index, button) {
                button.setClass("info");
            });
        }
    };

    Keyboard.prototype.addKey = function (rowIndex, cyrillicLower, cyrillicUpper, latinLower, latinUpper, style) {
        var _this = this;
        var cyrillicUpperChar = cyrillicUpper == undefined ? cyrillicLower.toUpperCase() : cyrillicUpper;
        var button = new Button(rowIndex, new Character(cyrillicLower, cyrillicUpperChar));

        if (latinLower != undefined) {
            var latinUpperChar = latinUpper == undefined ? latinLower.toUpperCase() : latinUpper;
            button.latin = new Character(latinLower, latinUpperChar);
        }

        button.click(function () {
            _this.pressButton(button);
        });
        button.val(cyrillicLower);

        if (style != undefined && style != null) {
            button.setStyle(style);
        }

        this.buttons.push(button);
    };

    Keyboard.prototype.addKeyLetter = function (rowIndex, cyrillicLower, latinLower, style) {
        this.addKey(rowIndex, cyrillicLower, cyrillicLower.toUpperCase(), latinLower, latinLower.toUpperCase(), style);
    };

    Keyboard.prototype.init = function () {
        this.addLatinCyrillicButton();
        this.addFirstRowButtons();
        this.addSecondRowButtons();
        this.addThirdRowButtons();
        this.addFourthRowButtons();
        this.addFifthRowButtons();
    };

    Keyboard.prototype.addLatinCyrillicButton = function () {
        var _this = this;
        var button = new Button(0, undefined, undefined, "button primary");
        button.val("To latin");
        button.click(function () {
            button.val(button.getVal() === "To latin" ? "To cyrillic" : "To latin");

            $.each(_this.buttons, function (index, btn) {
                btn.toggleLatinCyrillic();

                if (btn.currentCharacter == undefined) {
                    return;
                }

                if (_this.isShiftOrCapsLockPressed()) {
                    btn.val(btn.currentCharacter.upper);
                } else {
                    btn.val(btn.currentCharacter.lower);
                }
            });
        });
    };

    Keyboard.prototype.addFirstRowButtons = function () {
        this.addKey(0, "ё", "Ё", "`", "~");
        this.addKey(0, "1", "!", "1", "!");
        this.addKey(0, "2", '"', "2", "@");
        this.addKey(0, "3", "№", "3", "#");
        this.addKey(0, "4", ";", "4", "$");
        this.addKey(0, "5", "%", "5", "%");
        this.addKey(0, "6", ":", "6", "^");
        this.addKey(0, "7", "?", "7", "&");
        this.addKey(0, "8", "*", "8", "*");
        this.addKey(0, "9", "(", "9", "(");
        this.addKey(0, "0", ")", "0", ")");
        this.addKey(0, "-", "_", "-", "_");
        this.addKey(0, "=", "+", "=", "+");
    };

    Keyboard.prototype.addSecondRowButtons = function () {
        this.addKeyLetter(1, "й", "q");
        this.addKeyLetter(1, "ц", "w");
        this.addKeyLetter(1, "у", "e");
        this.addKeyLetter(1, "к", "r");
        this.addKeyLetter(1, "е", "t");
        this.addKeyLetter(1, "н", "y");
        this.addKeyLetter(1, "г", "u");
        this.addKeyLetter(1, "ш", "i");
        this.addKeyLetter(1, "щ", "o");
        this.addKeyLetter(1, "з", "p");
        this.addKey(1, "х", "Х", "[", "{");
        this.addKey(1, "ъ", "Ъ", "]", "}");
    };

    Keyboard.prototype.addThirdRowButtons = function () {
        var _this = this;
        var button = new Button(2);
        button.val("Caps Lock");
        button.click(function () {
            _this.capsLockPressed = !_this.capsLockPressed;
            _this.changeKeyboardCase();
            button.setClass(_this.capsLockPressed ? "primary" : "info");
        });

        this.addKeyLetter(2, "ф", "a");
        this.addKeyLetter(2, "ы", "s");
        this.addKeyLetter(2, "в", "d");
        this.addKeyLetter(2, "а", "f");
        this.addKeyLetter(2, "п", "g");
        this.addKeyLetter(2, "р", "h");
        this.addKeyLetter(2, "о", "j");
        this.addKeyLetter(2, "л", "k");
        this.addKeyLetter(2, "д", "l");
        this.addKey(2, "ж", "Ж", ";", ":");
        this.addKey(2, "э", "Э", "'", "\"");
    };

    Keyboard.prototype.addFourthRowButtons = function () {
        this.addKeyLetter(3, "я", "z");
        this.addKeyLetter(3, "ч", "x");
        this.addKeyLetter(3, "с", "c");
        this.addKeyLetter(3, "м", "v");
        this.addKeyLetter(3, "и", "b");
        this.addKeyLetter(3, "т", "n");
        this.addKeyLetter(3, "ь", "m");
        this.addKey(3, "б", "Б", ",", "<");
        this.addKey(3, "ю", "Ю", ".", ">");
        this.addKey(3, ".", ",", "/", "?");
    };

    Keyboard.prototype.addFifthRowButtons = function () {
        this.addShiftButton();
        this.addKeyLetter(4, " ", " ", "width: 220px;");
        this.addShiftButton();
    };

    Keyboard.prototype.addShiftButton = function () {
        var _this = this;
        var button = new Button(4);
        button.click(function () {
            _this.shiftPressed = !_this.shiftPressed;
            _this.changeKeyboardCase();
            $.each(_this.shiftButtons, function (index, button) {
                button.setClass(_this.shiftPressed ? "primary" : "info");
            });
        });
        button.setStyle("width: 60px;");
        button.val("Shift");
        this.shiftButtons.push(button);
    };

    Keyboard.prototype.isShiftOrCapsLockPressed = function () {
        return this.shiftPressed || this.capsLockPressed;
    };

    Keyboard.prototype.changeKeyboardCase = function () {
        var _this = this;
        $.each(this.buttons, function (index, button) {
            _this.isShiftOrCapsLockPressed() ? button.toUpper() : button.toLower();
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

            var labelStyle = index % 2 == 0 ? "default" : "info";

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
    new Keyboard(new Output(textbox)).init();
    new Translit(textbox).init();
});
//# sourceMappingURL=app.js.map
