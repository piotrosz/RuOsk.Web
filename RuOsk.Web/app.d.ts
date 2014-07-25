interface JQuery {
    insertAtCursor(char: string): void;

    getCursorPosition(): number;
    setCursorPosition(position: number): void;
    getSelection(): string;
    getSelectionStart(): number;
    getSelectionEnd(): number;
    setSelection(selectionStart: number, selectionEnd: number);
} 