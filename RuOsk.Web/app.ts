/// <reference path="scripts/typings/jquery/jquery.d.ts" />
/// <reference path="scripts/typings/jqueryui/jqueryui.d.ts" />
/// <reference path="app.d.ts" />
/// <reference path="insertAtCursor.ts" />
/// <reference path="button.ts" />
/// <reference path="output.ts" />
/// <reference path="character.ts" />
/// <reference path="keyboard.ts" />
/// <reference path="translit.ts" />

$(() => {
    var textbox = $("#output");
    new Keyboard(new Output(textbox)).init();
    new Translit(textbox).init();
});




