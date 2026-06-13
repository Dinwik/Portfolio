function decoder(bits, id="", cut=Math.pow(2, bits)) {
    
    for (let i = 0; i < bits; i++) {
        let a = add("node", 0, -i, 0, 0, 0, `DECODER-${id}-INPUT-${i}`);

        let negated = add("not", 0, -i, 0, -1, 0, `DECODER-${id}-INPUT-${i}-NEGATED`);
        let delayed = add("delay", 0, -i, 0, -2, 1, `DECODER-${id}-INPUT-${i}-DELAYED`);

        connect(a, negated);
        connect(a, delayed);
    }

    for (let i = 0; i < cut; i++) {

        let bin = i.toString(2).padStart(bits, "0");

        let and = add("and", 0, -bits, 0, -i-3, 0, `DECODER-${id}-OUTPUT-${i}`);
        for (let j = 0; j < bits; j++) {
            if (bin[bits-j-1] == 1)
                connect(`DECODER-${id}-INPUT-${j}-DELAYED`, and);
            else
                connect(`DECODER-${id}-INPUT-${j}-NEGATED`, and);
        }
    }
}