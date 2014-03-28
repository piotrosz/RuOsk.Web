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

    Button.prototype.val = function (value) {
        $('#' + this.id).val(value);
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
        this.row1letters = "";
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
        var upperCase = upper == undefined ? lower.toUpperCase() : upper;

        this[id] = new Button(id, new Character(lower, upperCase));
        this[id].click(function () {
            _this.pressButton(_this[id]);
        });
        this[id].val(lower);
    };

    Keyboard.prototype.init = function () {
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
        this.bindLetter("btn_shorti", "й");
        this.bindLetter("btn_tse", "ц");
        this.bindLetter("btn_u", "у");
        this.bindLetter("btn_ka", "к");
        this.bindLetter("btn_ie", "е");
        this.bindLetter("btn_en", "н");
        this.bindLetter("btn_ghe", "г");
        this.bindLetter("btn_sha", "ш");
        this.bindLetter("btn_shcha", "щ");
        this.bindLetter("btn_ze", "з");
        this.bindLetter("btn_ha", "х");
        this.bindLetter("btn_hard_sign", "ъ");

        // row #3
        this.btn_capsLock = new Button("btn_caps_lock");
        this.btn_capsLock.click(function () {
            _this.capsLockPressed = !_this.capsLockPressed;
            _this.changeKeyboardCase();
        });
        this.bindLetter("btn_ef", "ф");
        this.bindLetter("btn_y", "ы");
        this.bindLetter("btn_ve", "в");
        this.bindLetter("btn_a", "а");
        this.bindLetter("btn_pe", "п");
        this.bindLetter("btn_er", "р");
        this.bindLetter("btn_o", "о");
        this.bindLetter("btn_el", "л");
        this.bindLetter("btn_de", "д");
        this.bindLetter("btn_zhe", "ж");
        this.bindLetter("btn_e", "э");

        // row #4
        this.bindLetter("btn_ya", "я");
        this.bindLetter("btn_che", "ч");
        this.bindLetter("btn_es", "с");
        this.bindLetter("btn_em", "м");
        this.bindLetter("btn_i", "и");
        this.bindLetter("btn_te", "т");
        this.bindLetter("btn_soft_sign", "ь");
        this.bindLetter("btn_be", "б");
        this.bindLetter("btn_yu", "ю");
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
        this.bindLetter("btn_sja", "ся");
        this.bindLetter("btn_t_soft", "ть");
        this.bindLetter("btn_l_soft", "ль");
        this.bindLetter("btn_n_soft", "нь");
        this.bindLetter("btn_yj", "ый");
        this.bindLetter("btn_iye", "ие");

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
        this.textbox = $("#" + this.id);
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

var Translit = (function () {
    function Translit() {
        this.alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
        this.translit = "a,b,v,g,d,e,jo,zh,z,i,j,k,l,m,n,o,p,r,s,t,u,f,h,c,ch,sh,shh,#,y,',je,ju,ja";
        this.prevLetter = "";
        this.prevPrevLetter = "";
    }
    Translit.prototype.createLegend = function () {
        var _this = this;
        $.each(this.alphabet.split(""), function (index, value) {
            $("#legend1").append("<span class='label default' style='width: 28px;'>" + _this.translitArray[index] + "</span>");
            $("#legend2").append("<span class='label default' style='width: 28px;'><strong>" + _this.alphabetArray[index] + "</strong></span>");
        });
    };

    Translit.prototype.tryCode = function (letter, element, prev) {
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
                element.val(function (index, val) {
                    return val.substr(0, val.length - 1);
                });
            }

            element.insertAtCursor(russian);

            return true;
        }
        return false;
    };

    Translit.prototype.init = function () {
        this.alphabetArray = this.alphabet.split("").concat(this.alphabet.toUpperCase().split(""));
        this.translitArray = this.translit.split(",").concat(this.translit.toUpperCase().split(","));

        this.createLegend();

        var _self = this;

        $("#output").keypress(function (event) {
            var letter = String.fromCharCode(event.charCode);

            if (_self.tryCode(letter, $(this), [_self.prevPrevLetter, _self.prevLetter]) || _self.tryCode(letter, $(this), [_self.prevLetter]) || _self.tryCode(letter, $(this))) {
                event.preventDefault();
                _self.prevPrevLetter = _self.prevLetter;
                _self.prevLetter = letter;
            }
        });
    };
    return Translit;
})();

$(function () {
    var output = new Output("output");
    var keyboard = new Keyboard(output);
    keyboard.init();

    var translit = new Translit();
    translit.init();
});
//# sourceMappingURL=app.js.map
