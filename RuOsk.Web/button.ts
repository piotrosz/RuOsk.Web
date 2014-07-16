// Keyboard button
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

    setClass(cssClass: string) {
        this.element.removeClass("success warning danger info primary");
        this.element.addClass(cssClass);
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
 