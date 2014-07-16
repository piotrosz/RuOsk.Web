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

            var labelStyle = index % 2 == 0 ? "default" : "info";

            $("#legend1").append("<span class='label " + labelStyle + "' style='width: 28px;' data-hint='" + hint + "' data-hint-position='top'>" + this.translitArray[index] + "</span>")
            $("#legend2").append("<span class='label " + labelStyle + "' style='width: 28px;' data-hint='" + hint + "'><strong>" + this.alphabetArray[index] + "</strong></span>");
        });
    }

    private tryCode(letter: string, prev?: string[]) {

        var translitIndex = (prev == undefined) ? this.translitArray.indexOf(letter) : this.translitArray.indexOf(prev.join("") + letter)

        if (translitIndex != -1) {
            var russian = this.alphabetArray[translitIndex];

            if (prev != undefined) {
                this.deleteCharacterBeforeCursor();
            }

            this.textbox.insertAtCursor(russian);

            return true;
        }

        return false;
    }

    // TODO: Refactor 
    private deleteCharacterBeforeCursor() {
        var textArea = <HTMLTextAreaElement>document.getElementById(this.textbox.attr("id"));
        
        var selectionStart = textArea.selectionStart;
        var selectionEnd = textArea.selectionEnd;

        this.textbox.val((index, val) => { 
            return val.substr(0, textArea.selectionStart - 1) +
                val.substr(textArea.selectionStart, val.length);
        });

        textArea.focus();
        textArea.selectionStart = selectionStart - 1;
        textArea.selectionEnd = selectionEnd - 1;
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
            this.tryCode(letter)) { // Make use of short circut evaluation
            event.preventDefault();
            this.prevPrevLetter = this.prevLetter;
            this.prevLetter = letter;
        }
    }
}
 