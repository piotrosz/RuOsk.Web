class Keyboard {

    private capsLockPressed = false;
    private shiftPressed = false;

    private buttons: Button[] = [];
    private shiftButtons: Button[] = [];

    constructor(public output: Output) {
    }

    pressButton(button: Button) {

        this.output.append(this.isShiftOrCapsLockPressed() ? button.currentCharacter.upper : button.currentCharacter.lower);

        if (this.shiftPressed) {
            this.shiftPressed = false;

            this.changeKeyboardCase();
            $.each(this.shiftButtons, (index: number, button: Button) => {
                button.setClass("info");
            });
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
        var button = new Button(0, undefined, undefined, "button primary");
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
        button.click(() => {
            this.capsLockPressed = !this.capsLockPressed; this.changeKeyboardCase();
            button.setClass(this.capsLockPressed ? "primary" : "info");
        })

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
        this.addShiftButton();
        this.addKeyLetter(4, " ", " ", "width: 220px;");
        this.addShiftButton();
    }

    addShiftButton() {
        var button = new Button(4);
        button.click(() => {
            this.shiftPressed = !this.shiftPressed;
            this.changeKeyboardCase();
            $.each(this.shiftButtons, (index, button: Button) => {
                button.setClass(this.shiftPressed ? "primary" : "info")
            });
        });
        button.setStyle("width: 60px;");
        button.val("Shift");
        this.shiftButtons.push(button);
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
 