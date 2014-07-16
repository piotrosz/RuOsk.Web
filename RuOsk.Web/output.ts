class Output {

    constructor(public textbox: JQuery) { }

    append(char: string) {
        this.textbox.insertAtCursor(char);
    }
}
 