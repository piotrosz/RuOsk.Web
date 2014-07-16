var Output = (function () {
    function Output(textbox) {
        this.textbox = textbox;
    }
    Output.prototype.append = function (char) {
        this.textbox.insertAtCursor(char);
    };
    return Output;
})();
//# sourceMappingURL=output.js.map
