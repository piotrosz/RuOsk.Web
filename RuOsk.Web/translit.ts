class Translit {

    constructor(public textbox: JQuery, translitArrays: TranslitArrays) {
        this.translitArrays = translitArrays;
    }

    private translitArrays: TranslitArrays;

    private prevLetter = "";
    private prevPrevLetter = "";
    private ctrlPressed = false;

    private tryCode(letter: string, prev?: string[]) {

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
    }

    private deleteCharacterBeforeCursor() {

        var selectionStart = this.textbox.getSelectionStart();

        this.textbox.val((index, val) => { 
            return val.substr(0, selectionStart - 1) +
                val.substr(selectionStart, val.length);
        });

        this.textbox.setCursorPosition(selectionStart - 1);
    }

    init() {
        this.textbox.keypress(event => this.keyPress(event));
    }

    private keyPress(event: JQueryKeyEventObject) {

        var letter = String.fromCharCode(event.charCode);

        if (this.tryCode(letter, [this.prevPrevLetter, this.prevLetter]) ||
            this.tryCode(letter, [this.prevLetter]) ||
            this.tryCode(letter)) { // Make use of short circut evaluation
            event.preventDefault();
            this.prevPrevLetter = this.prevLetter;
            this.prevLetter = letter;
        }
    }
}
 