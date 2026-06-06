function counter(bits) {

    let inc = add("NODE", 0, 1, 0, 1);
    add("TEXT", 0, 2, 0, 1, "+");

    let decNegated = add("NODE", 0, 1, 0, 2);
    let dec = add("NOR", 1, -bits, 0, 2);
    connect(decNegated, dec);
    add("TEXT", 0, 2, 0, 2, "-");

    let set = add("NODE", 0,  1, 0, 3);
    add("TEXT", 0, 2, 0, 3, "S");
    add("TEXT", 0, 3, 0, 3, "E");
    add("TEXT", 0, 4, 0, 3, "T");
    add("TEXT", 0, 1, 0, 5, "V");
    add("TEXT", 0, 2, 0, 5, "A");
    add("TEXT", 0, 3, 0, 5, "L");

    for (let i = 0; i < bits; i++) {

        let tff = add("tff", 0, -i, 0, 0, 0, `TFF-${i}`);
        let and = add("AND", 0, -i, 0, 1);
        connect(inc, and);
        connect(and, tff);

        let nor = add("NOR", 0, -i, 0, 2);
        connect(dec, nor);
        connect(nor, tff);

        for (let j = 0; j < i; j++) {
            connect(`TFF-${j}`, and);
            connect(`TFF-${j}`, nor);
        }

        and = add("AND", 0, -i, 0, 3);
        let xor = add("XOR", 0, -i, 0, 4);
        let input = add("NODE", 0, -i, 0, 5);
        
        connect(set, and);
        connect(input, xor);
        connect(tff, xor);
        connect(xor, and);
        connect(and, tff)
    }

    return getString();
}