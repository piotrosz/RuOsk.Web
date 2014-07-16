// Keyboard button
var Button = (function () {
    function Button(rowIndex, cyrillic, latin, cssClass) {
        if (typeof cssClass === "undefined") { cssClass = "button info"; }
        this.cyrillic = cyrillic;
        this.latin = latin;
        var row = $('.row').get(rowIndex);
        this.element = $("<input />", { class: cssClass, type: "button" });
        $(row).append(this.element).append("&nbsp;");

        if (cyrillic != undefined) {
            this.currentCharacter = cyrillic;
        }
    }
    Button.prototype.setClass = function (cssClass) {
        this.element.removeClass("success warning danger info primary");
        this.element.addClass(cssClass);
    };

    Button.prototype.setStyle = function (style) {
        this.element.attr("style", style);
    };

    Button.prototype.click = function (f) {
        this.element.click(f);
    };

    Button.prototype.val = function (value) {
        this.element.val(value);
    };

    Button.prototype.getVal = function () {
        return this.element.val();
    };

    Button.prototype.toLower = function () {
        if (this.currentCharacter != undefined) {
            this.element.val(this.currentCharacter.lower);
        }
    };

    Button.prototype.toUpper = function () {
        if (this.currentCharacter != undefined) {
            this.element.val(this.currentCharacter.upper);
        }
    };

    Button.prototype.toggleLatinCyrillic = function () {
        if (this.currentCharacter === this.cyrillic) {
            this.currentCharacter = this.latin;
        } else {
            this.currentCharacter = this.cyrillic;
        }
    };
    return Button;
})();
//# sourceMappingURL=button.js.map
