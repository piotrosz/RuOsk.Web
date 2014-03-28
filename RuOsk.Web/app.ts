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
            }
            else if (this.selectionStart || this.selectionStart == "0") {
                var startPos = this.selectionStart;
                var endPos = this.selectionEnd;
                var scrollTop = this.scrollTop;
                this.value = this.value.substring(0, startPos) + myValue + this.value.substring(endPos, this.value.length);
                this.focus();
                this.selectionStart = startPos + myValue.length;
                this.selectionEnd = startPos + myValue.length;
                this.scrollTop = scrollTop;
            }
            else {
                this.value += myValue;
                this.focus();
            }
        });
    }
});

class Button {
    constructor(public id: string, public character?: Character) {
    }

    click(f: Function): void {
        $('#' + this.id).click(f);
    }

    val(value: string): void {
        $('#' + this.id).val(value);
    }

    toLower() {
        if (this.character != undefined) {
            $('#' + this.id).val(this.character.lower);
        }
    }

    toUpper() {
        if (this.character != undefined) {
            $('#' + this.id).val(this.character.upper);
        }
    }
}

class Character {
    constructor(public lower: string, public upper: string) {
    }
}

class Keyboard {

    private capsLockPressed = false;
    private shiftPressed = false;

    private row1letters = "";

    // row #1
    private btn_jo: Button;
    private btn_1: Button;
    private btn_2: Button;
    private btn_3: Button;
    private btn_4: Button;
    private btn_5: Button;
    private btn_6: Button;
    private btn_7: Button;
    private btn_8: Button;
    private btn_9: Button;
    private btn_0: Button;
    private btn_equal: Button;
    private btn_minus: Button;

    // row #2
    private btn_shorti: Button;
    private btn_tse: Button;
    private btn_u: Button;
    private btn_ka: Button;
    private btn_ie: Button;
    private btn_en: Button;
    private btn_ghe: Button;
    private btn_sha: Button;
    private btn_shcha: Button;
    private btn_ze: Button;
    private btn_ha: Button;
    private btn_hard_sign: Button
    
    // row #3
    private btn_capsLock: Button;
    private btn_ef: Button;
    private btn_y: Button;
    private btn_ve: Button;
    private btn_a: Button;
    private btn_pe: Button; 
    private btn_er: Button;
    private btn_o: Button; 
    private btn_el: Button;
    private btn_de: Button;
    private btn_zhe: Button;
    private btn_e: Button; 

    // row #4
    private btn_ya: Button;
    private btn_che: Button;
    private btn_es: Button;
    private btn_em: Button;
    private btn_i: Button;
    private btn_te: Button;
    private btn_soft_sign: Button;
    private btn_be: Button;
    private btn_yu: Button;
    private btn_dot: Button;
    
    // row #5
    private btn_shift_left: Button;
    private btn_space: Button;
    private btn_shift_right: Button;

    // row #6
    private btn_sja: Button;
    private btn_t_soft: Button;
    private btn_l_soft: Button;
    private btn_n_soft: Button;
    private btn_yj: Button;
    private btn_iye: Button;   
    
    constructor(public output: Output) {
    }

    pressButton(button: Button) {

        this.output.append(this.isShiftOrCapsLockPressed() ? button.character.upper : button.character.lower);

        if (this.shiftPressed) {
            this.shiftPressed = false;
            this.changeKeyboardCase();
        }
    }

    bindLetter(id: string, lower: string, upper?: string) {

        var upperCase = upper == undefined ? lower.toUpperCase() : upper;

        this[id] = new Button(id, new Character(lower, upperCase));
        this[id].click(() => { this.pressButton(this[id]); });
        this[id].val(lower);
    }

    init() {

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
        this.btn_capsLock.click(() => { this.capsLockPressed = !this.capsLockPressed; this.changeKeyboardCase(); })
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
        this.btn_shift_left.click(() => { this.shiftPressed = !this.shiftPressed; this.changeKeyboardCase(); })
        this.btn_shift_right = new Button("btn_shift_right");
        this.btn_shift_right.click(() => { this.shiftPressed = !this.shiftPressed; this.changeKeyboardCase(); })
        this.bindLetter("btn_space", " ", " ");

        // row #6
        this.bindLetter("btn_sja", "ся");
        this.bindLetter("btn_t_soft", "ть");
        this.bindLetter("btn_l_soft", "ль")
        this.bindLetter("btn_n_soft", "нь");
        this.bindLetter("btn_yj", "ый");
        this.bindLetter("btn_iye", "ие");

        $("#eraser").click(() => { this.output.clear();})
    }

    isShiftOrCapsLockPressed() {
        return this.shiftPressed || this.capsLockPressed;
    }

    changeKeyboardCase(): void {
        if (this.isShiftOrCapsLockPressed()) {
            for (var name in this) {
                if (name.indexOf("btn_") == 0) {
                    this[name].toUpper();
                }
            }
        }
        else {
            for (var name in this) {
                if (name.indexOf("btn_") == 0) {
                    this[name].toLower();
                }
            }
        }
    }
}

class Output {

    textbox: JQuery;

    constructor(public id: string) {
        this.textbox = $("#" + this.id);
    }

    append(char: string) {
        this.textbox.insertAtCursor(char);
    }

    clear() {
        this.textbox.val("");
    }

    isEmpty() {
        this.textbox.val() == "";
    }
}

class Translit {
    private alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
    private translit = "a,b,v,g,d,e,jo,zh,z,i,j,k,l,m,n,o,p,r,s,t,u,f,h,c,ch,sh,shh,#,y,',je,ju,ja";

    private alphabetArray: string[];
    private translitArray: string[];

    private prevLetter = "";
    private prevPrevLetter = "";

    private createLegend() {
        $.each(this.alphabet.split(""), (index, value) => {
            $("#legend1").append("<span class='label default' style='width: 28px;'>" + this.translitArray[index] + "</span>")
            $("#legend2").append("<span class='label default' style='width: 28px;'><strong>" + this.alphabetArray[index] + "</strong></span>");
        });
    }

    private tryCode(letter: string, element: JQuery, prev?: string[]) {
        var index = -1;

        if (prev == undefined) {
            index = this.translitArray.indexOf(letter);
        }
        else {
            index = this.translitArray.indexOf(prev.join("") + letter);
        }

        if (index != -1) {
            var russian = this.alphabetArray[index];

            if (prev != undefined) {
                // Delete last character
                element.val((index, val) => { return val.substr(0, val.length - 1); });
            }

            element.insertAtCursor(russian);

            return true;
        }
        return false;
    }

    init() {
        this.alphabetArray = this.alphabet.split("").concat(this.alphabet.toUpperCase().split(""));
        this.translitArray = this.translit.split(",").concat(this.translit.toUpperCase().split(","));

        this.createLegend();

        var _self = this;

        $("#output")
            .keypress(function (event) {

                var letter = String.fromCharCode(event.charCode);

                if (_self.tryCode(letter, $(this), [_self.prevPrevLetter, _self.prevLetter]) ||
                    _self.tryCode(letter, $(this), [_self.prevLetter]) ||
                    _self.tryCode(letter, $(this)) // Make use of short circut evaluation
                    ) {
                    event.preventDefault();
                    _self.prevPrevLetter = _self.prevLetter;
                    _self.prevLetter = letter;
                }
            });
    }
}

$(() => {
    var output = new Output("output");
    var keyboard = new Keyboard(output);
    keyboard.init();

    var translit = new Translit();
    translit.init();
});




