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
    currentCharacter: Character;

    constructor(rowIndex: number,
        public cyrillic?: Character,
        public latin?: Character,
        cssClass: string = "button info") {
        var row = $('.row').get(rowIndex);
        this.element = $("<input />", { class: cssClass, type: "button" });
        $(row).append(this.element).append("&nbsp;");

        if (cyrillic != undefined) {
            this.currentCharacter = cyrillic;
        }
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

    getVal(): string {
        return this.element.val();
    }

    toLower() {
        if (this.currentCharacter != undefined) {
            this.element.val(this.currentCharacter.lower);
        }
    }

    toUpper() {
        if (this.currentCharacter != undefined) {
            this.element.val(this.currentCharacter.upper);
        }
    }

    toggleLatinCyrillic() {
        if (this.currentCharacter === this.cyrillic) {
            this.currentCharacter = this.latin;
        }
        else {
            this.currentCharacter = this.cyrillic;
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
    constructor(public lower: string, public upper: string) { }
}

class Keyboard {

    private capsLockPressed = false;
    private shiftPressed = false;

    private buttons: Button[] = [];

    constructor(public output: Output) {
    }

    pressButton(button: Button) {

        this.output.append(this.isShiftOrCapsLockPressed() ? button.currentCharacter.upper : button.currentCharacter.lower);

        if (this.shiftPressed) {
            this.shiftPressed = false;
            this.changeKeyboardCase();
        }
    }

    addKey(rowIndex: number, cyrillicLower: string, cyrillicUpper?: string, latinLower?: string, latinUpper?: string, style?: string) {

        var cyrillicUpperChar = cyrillicUpper == undefined ? cyrillicLower.toUpperCase() : cyrillicUpper;
        var button = new Button(rowIndex, new Character(cyrillicLower, cyrillicUpperChar));

        if (latinLower != undefined) {
            var latinUpperChar = latinUpper == undefined ? latinLower.toUpperCase() : latinUpper;
            button.latin = new Character(latinLower, latinUpperChar);
        }

        button.click(() => { this.pressButton(button); });
        button.val(cyrillicLower);

        if (style != undefined && style != null) {
            button.setStyle(style);
        }

        this.buttons.push(button);
    }

    addKeyLetter(rowIndex: number, cyrillicLower: string, latinLower: string, style?: string) {
        this.addKey(rowIndex, cyrillicLower, cyrillicLower.toUpperCase(), latinLower, latinLower.toUpperCase(), style);
    }

    init() {
        this.addLatinCyrillicButton();
        this.addFirstRowButtons();
        this.addSecondRowButtons();
        this.addThirdRowButtons();
        this.addFourthRowButtons();
        this.addFifthRowButtons();
    }

    addLatinCyrillicButton() {
        var button = new Button(0, undefined, undefined, "button success");
        button.val("To latin");
        button.click(() => {

            button.val(button.getVal() === "To latin" ? "To cyrillic" : "To latin");

            $.each(this.buttons, (index, btn: Button) => {

                btn.toggleLatinCyrillic();

                if (btn.currentCharacter == undefined) {
                    return;
                }

                if (this.isShiftOrCapsLockPressed()) {
                    btn.val(btn.currentCharacter.upper);
                }
                else {
                    btn.val(btn.currentCharacter.lower);
                }
            });
        });
    }

    addFirstRowButtons() {
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
    }

    addSecondRowButtons() {
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
    }

    addThirdRowButtons() {
        var button = new Button(2);
        button.val("Caps Lock");
        button.click(() => { this.capsLockPressed = !this.capsLockPressed; this.changeKeyboardCase(); })
        this.buttons.push(button);

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
    }

    addFourthRowButtons() {
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
    }

    addFifthRowButtons() {
        var button = new Button(4);
        button.click(() => { this.shiftPressed = !this.shiftPressed; this.changeKeyboardCase(); })
        button.setStyle("width: 60px;");
        button.val("Shift");
        this.buttons.push(button);

        this.addKeyLetter(4, " ", " ", "width: 220px;");

        button = new Button(4);
        button.click(() => { this.shiftPressed = !this.shiftPressed; this.changeKeyboardCase(); })
        button.setStyle("width:60px;");
        button.val("Shift");
        this.buttons.push(button);
    }

    isShiftOrCapsLockPressed() {
        return this.shiftPressed || this.capsLockPressed;
    }

    changeKeyboardCase(): void {
        $.each(this.buttons, (index, button: Button) => {
            this.isShiftOrCapsLockPressed() ? button.toUpper() : button.toLower();
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




