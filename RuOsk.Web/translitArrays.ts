class TranslitArrays {
    alphabet: string[];
    translit: string[];

    constructor() {
        var alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
        var translit = "a,b,v,g,d,e,jo,zh,z,i,j,k,l,m,n,o,p,r,s,t,u,f,h,c,ch,sh,shh,#,y,@,je,ju,ja"; 

        this.alphabet = alphabet.split("").concat(alphabet.toUpperCase().split(""));
        this.translit = translit.split(",").concat(translit.toUpperCase().split(","));
    }
}



 