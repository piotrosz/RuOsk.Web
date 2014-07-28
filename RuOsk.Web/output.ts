class Output {

    constructor(public textbox: JQuery) { }

    append(value: string) {
        this.textbox.insertAtCursor(value);
    }
}
 