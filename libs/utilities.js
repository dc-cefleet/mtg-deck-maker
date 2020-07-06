export const uuid = (htmlSafe  = false) =>{
    let dec2hex = [];
    for (let i=0; i<=15; i++) {
        dec2hex[i] = i.toString(16);
    }

    let uuid = '';
    for (let i=1; i<=36; i++) {
        if (i===9 || i===14 || i===19 || i===24) {
            uuid += '-';
        } else if (i===15) {
            uuid += 4;
        } else if (i===20) {
            uuid += dec2hex[(Math.random()*4|0 + 8)];
        } else {
            uuid += dec2hex[(Math.random()*16|0)];
        }
    }
    return htmlSafe ? 'id'+uuid : uuid;
} 

export const randomNumber = (mi,ma, whole = true) => {
    if(!mi) throw Error("You need to have at least a max")
    let min = mi;
    let max = ma;
    if(!max) {
        min = 0;
        max = mi;
    }
    
    let out = (Math.random()+min)*max;
    return whole ? Math.floor(out) : out;

}