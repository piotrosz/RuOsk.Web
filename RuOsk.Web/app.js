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
    function Button(id, character) {
        this.id = id;
        this.character = character;
    }
    Button.prototype.click = function (f) {
        $('#' + this.id).click(f);
    };

    Button.prototype.toLower = function () {
        if (this.character != undefined) {
            $('#' + this.id).val(this.character.lower);
        }
    };

    Button.prototype.toUpper = function () {
        if (this.character != undefined) {
            $('#' + this.id).val(this.character.upper);
        }
    };
    return Button;
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
    }
    Keyboard.prototype.pressButton = function (button) {
        this.output.append(this.isShiftOrCapsLockPressed() ? button.character.upper : button.character.lower);

        if (this.shiftPressed) {
            this.shiftPressed = false;
            this.changeKeyboardCase();
        }
    };

    Keyboard.prototype.bindLetter = function (id, lower, upper) {
        var _this = this;
        this[id] = new Button(id, new Character(lower, upper));
        this[id].click(function () {
            _this.pressButton(_this[id]);
        });
    };

    Keyboard.prototype.initialize = function () {
        var _this = this;
        // row #1
        this.bindLetter("btn_jo", "ё", "Ё");
        this.bindLetter("btn_1", "1", "!");
        this.bindLetter("btn_2", "2", '"');
        this.bindLetter("btn_3", "3", "№");
        this.bindLetter("btn_4", "4", ";");
        this.bindLetter("btn_5", "5", "%");
        this.bindLetter("btn_6", "6", ":");
        this.bindLetter("btn_7", "7", "?");
        this.bindLetter("btn_8", "8", "*");
        this.bindLetter("btn_9", "9", "(");
        this.bindLetter("btn_0", "0", ")");
        this.bindLetter("btn_minus", "-", "_");
        this.bindLetter("btn_equal", "=", "+");

        // row #2
        this.bindLetter("btn_shorti", "й", "Й");
        this.bindLetter("btn_tse", "ц", "Ц");
        this.bindLetter("btn_u", "у", "У");
        this.bindLetter("btn_ka", "к", "К");
        this.bindLetter("btn_ie", "е", "Е");
        this.bindLetter("btn_en", "н", "Н");
        this.bindLetter("btn_ghe", "г", "Г");
        this.bindLetter("btn_sha", "ш", "Ш");
        this.bindLetter("btn_shcha", "щ", "Щ");
        this.bindLetter("btn_ze", "з", "З");
        this.bindLetter("btn_ha", "х", "Х");
        this.bindLetter("btn_hard_sign", "ъ", "Ъ");

        // row #3
        this.btn_capsLock = new Button("btn_caps_lock");
        this.btn_capsLock.click(function () {
            _this.capsLockPressed = !_this.capsLockPressed;
            _this.changeKeyboardCase();
        });
        this.bindLetter("btn_ef", "ф", "Ф");
        this.bindLetter("btn_y", "ы", "Ы");
        this.bindLetter("btn_ve", "в", "В");
        this.bindLetter("btn_a", "а", "А");
        this.bindLetter("btn_pe", "п", "П");
        this.bindLetter("btn_er", "р", "Р");
        this.bindLetter("btn_o", "о", "О");
        this.bindLetter("btn_el", "л", "Л");
        this.bindLetter("btn_de", "д", "Д");
        this.bindLetter("btn_zhe", "ж", "Ж");
        this.bindLetter("btn_e", "э", "Э");

        // row #4
        this.bindLetter("btn_ya", "я", "Я");
        this.bindLetter("btn_che", "ч", "Ч");
        this.bindLetter("btn_es", "с", "С");
        this.bindLetter("btn_em", "м", "М");
        this.bindLetter("btn_i", "и", "И");
        this.bindLetter("btn_te", "т", "Т");
        this.bindLetter("btn_soft_sign", "ь", "Ь");
        this.bindLetter("btn_be", "б", "Б");
        this.bindLetter("btn_yu", "ю", "Ю");
        this.bindLetter("btn_dot", ".", ",");

        // row #5
        this.btn_shift_left = new Button("btn_shift_left");
        this.btn_shift_left.click(function () {
            _this.shiftPressed = !_this.shiftPressed;
            _this.changeKeyboardCase();
        });
        this.btn_shift_right = new Button("btn_shift_right");
        this.btn_shift_right.click(function () {
            _this.shiftPressed = !_this.shiftPressed;
            _this.changeKeyboardCase();
        });
        this.bindLetter("btn_space", " ", " ");

        // row #6
        this.bindLetter("btn_sja", "ся", "СЯ");
        this.bindLetter("btn_t_soft", "ть", "ТЬ");
        this.bindLetter("btn_l_soft", "ль", "ЛЬ");
        this.bindLetter("btn_yj", "ый", "ЫЙ");
        this.bindLetter("btn_iye", "ие", "ИЕ");

        $("#eraser").click(function () {
            _this.output.clear();
        });
    };

    Keyboard.prototype.isShiftOrCapsLockPressed = function () {
        return this.shiftPressed || this.capsLockPressed;
    };

    Keyboard.prototype.changeKeyboardCase = function () {
        if (this.isShiftOrCapsLockPressed()) {
            for (var name in this) {
                if (name.indexOf("btn_") == 0) {
                    this[name].toUpper();
                }
            }
        } else {
            for (var name in this) {
                if (name.indexOf("btn_") == 0) {
                    this[name].toLower();
                }
            }
        }
    };
    return Keyboard;
})();

var Output = (function () {
    function Output(id) {
        this.id = id;
    }
    Output.prototype.append = function (char) {
        $("#" + this.id).insertAtCursor(char);
        //$("#" + this.id).val($("#" + this.id).val() + char);
    };

    Output.prototype.clear = function () {
        $("#" + this.id).val("");
    };

    Output.prototype.isEmpty = function () {
        return $("#" + this.id).val() == "";
    };
    return Output;
})();

$(function () {
    var output = new Output("output");
    var keyboard = new Keyboard(output);

    keyboard.initialize();
});
//# sourceMappingURL=app.js.map
