class TranslitLegend {
    
    constructor(translitArrays: TranslitArrays) {
        this.translitArrays = translitArrays;
    }

    private translitArrays: TranslitArrays;

    create() {
        $.each(this.translitArrays.alphabetArray, (index, value) => {

            // TODO: Refactor
            if (index >= this.translitArrays.alphabetArray.length / 2) {
                return;
            }

            var hint = encodeURI(this.translitArrays.translitArray[index]) + " &raquo; " + value;

            var labelStyle = index % 2 == 0 ? "default" : "info";

            $("#legend1").append("<span class='label " + labelStyle + "' style='width: 28px;' data-hint='" + hint + "' data-hint-position='top'>" + this.translitArrays.translitArray[index] + "</span>");
            $("#legend2").append("<span class='label " + labelStyle + "' style='width: 28px;' data-hint='" + hint + "'><strong>" + value + "</strong></span>");
        });
    }
} 