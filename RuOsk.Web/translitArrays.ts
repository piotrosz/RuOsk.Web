class TranslitArrays {
    alphabetArray: string[];
    translitArray: string[];

    constructor() {
        var alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
        var translit = "a,b,v,g,d,e,jo,zh,z,i,j,k,l,m,n,o,p,r,s,t,u,f,h,c,ch,sh,shh,#,y,@,je,ju,ja"; 

        this.alphabetArray = alphabet.split("").concat(alphabet.toUpperCase().split(""));
        this.translitArray = translit.split(",").concat(translit.toUpperCase().split(","));
    }
}



 