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

    private element: JQuery;

    constructor(rowIndex: number, public character?: Character) {
        var row = $('.row').get(rowIndex);
        this.element = $("<input />", { class: "button info", type: "button" });
        $(row).append(this.element).append("&nbsp;");

    }

    setStyle(style: string) {
        this.element.attr("style", style);
    }

    click(f: Function): void {
        this.element.click(f);
    }

    val(value: string): void {
        this.element.val(value);
    }

    toLower() {
        if (this.character != undefined) {
            this.element.val(this.character.lower);
        }
    }

    toUpper() {
        if (this.character != undefined) {
            this.element.val(this.character.upper);
        }
    }
}

class Output {

    constructor(public textbox: JQuery) { }

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

class Character {
    constructor(public lower: string, public upper: string) {}
}

class Keyboard {

    private capsLockPressed = false;
    private shiftPressed = false;

    private buttons: Button[] = [];

    constructor(public output: Output) {
    }

    pressButton(button: Button) {

        this.output.append(this.isShiftOrCapsLockPressed() ? button.character.upper : button.character.lower);

        if (this.shiftPressed) {
            this.shiftPressed = false;
            this.changeKeyboardCase();
        }
    }

    bindLetter(rowIndex: number, lower: string, upper?: string, style?: string) {

        var upperCase = upper == undefined ? lower.toUpperCase() : upper;
        var button = new Button(rowIndex, new Character(lower, upperCase));
        button.click(() => { this.pressButton(button); });
        button.val(lower);

        if (style != undefined && style != null) {
            button.setStyle(style);
        }

        this.buttons.push(button);
    }

    init() {

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
        button.click(() => { this.capsLockPressed = !this.capsLockPressed; this.changeKeyboardCase(); })
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
        button.click(() => { this.shiftPressed = !this.shiftPressed; this.changeKeyboardCase(); })
        button.setStyle("width: 60px;");
        button.val("Shift");
        this.buttons.push(button);

        this.bindLetter(4, " ", " ", "width: 220px;");
       
        button = new Button(4);
        button.click(() => { this.shiftPressed = !this.shiftPressed; this.changeKeyboardCase(); })
        button.setStyle("width:60px;");
        button.val("Shift");
        this.buttons.push(button);

        this.bindLetter(5, "ся", null, "width: 60px;");
        this.bindLetter(5, "ть", null, "width: 60px;");
        this.bindLetter(5, "ль", null, "width: 60px;");
        this.bindLetter(5, "нь", null, "width: 60px;");
        this.bindLetter(5, "ый", null, "width: 60px;");
        this.bindLetter(5, "ие", null, "width: 60px;");
    }

    isShiftOrCapsLockPressed() {
        return this.shiftPressed || this.capsLockPressed;
    }

    changeKeyboardCase(): void {
        $.each(this.buttons, (index, value: Button) => {
            this.isShiftOrCapsLockPressed() ? value.toUpper() : value.toLower();
        });
    }
}

class Translit {

    constructor(public textbox: JQuery) { }

    private alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
    private translit = "a,b,v,g,d,e,jo,zh,z,i,j,k,l,m,n,o,p,r,s,t,u,f,h,c,ch,sh,shh,#,y,@,je,ju,ja";

    private alphabetArray: string[];
    private translitArray: string[];

    private prevLetter = "";
    private prevPrevLetter = "";
    private ctrlPressed = false;

    private createLegend() {
        $.each(this.alphabet.split(""), (index, value) => {

            var hint = encodeURI(this.translitArray[index]) + " &raquo; " + this.alphabetArray[index];

            var labelStyle = index % 2 == 0 ? "default" : "success";

            $("#legend1").append("<span class='label " + labelStyle + "' style='width: 28px;' data-hint='" + hint + "' data-hint-position='top'>" + this.translitArray[index] + "</span>")
            $("#legend2").append("<span class='label " + labelStyle + "' style='width: 28px;' data-hint='" + hint + "'><strong>" + this.alphabetArray[index] + "</strong></span>");
        });
    }

    private tryCode(letter: string, prev?: string[]) {
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
                this.textbox.val((index, val) => { return val.substr(0, val.length - 1); });
            }

            this.textbox.insertAtCursor(russian);

            return true;
        }
        return false;
    }

    init() {
        this.alphabetArray = this.alphabet.split("").concat(this.alphabet.toUpperCase().split(""));
        this.translitArray = this.translit.split(",").concat(this.translit.toUpperCase().split(","));

        this.createLegend();

        this.textbox.keypress(event => this.keyPress(event));
    }

    private keyPress(event: JQueryKeyEventObject) {

        var letter = String.fromCharCode(event.charCode);

        if (this.tryCode(letter, [this.prevPrevLetter, this.prevLetter]) ||
            this.tryCode(letter, [this.prevLetter]) ||
            this.tryCode(letter) // Make use of short circut evaluation
            ) {
            event.preventDefault();
            this.prevPrevLetter = this.prevLetter;
            this.prevLetter = letter;
        }
    }
}

$(() => {
    var textbox = $("#output");

    var output = new Output(textbox);
    var keyboard = new Keyboard(output);
    keyboard.init();

    var translit = new Translit(textbox);
    translit.init();
});




