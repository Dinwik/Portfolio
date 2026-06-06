function rca(bits) {

    clear();

    for (let i = 0; i < bits; i++) {

        let aTff = add("TFF", 0, 0, i, -2);
        let bTff = add("TFF", 0, 2, i, -2);
        let a = add("NODE", 0, 0, i, 0);
        let b = add("NODE", 0, 2, i, 0);
        connect(aTff, a);
        connect(bTff, b);

        let xor1 = add("XOR", 0, 2, i, 1);
        let and1 = add("AND", 0, 1, i, 0);
        connect(a, xor1);
        connect(a, and1);
        connect(b, xor1);
        connect(b, and1);

        let xor2 = add("XOR", 0, 1, i, 2, 0, `XOR2-${i}`);
        let and2 = add("AND", 0, 0, i, 1, 0, `AND2-${i}`);
        connect(xor1, xor2);
        connect(xor1, and2);
        
        add("NODE", 0, 1, i, 1, 0, `OUT-${i}`);
        if (i > 0) {
            connect(`OUT-${i-1}`, xor2);
            connect(`OUT-${i-1}`, and2);
        }
        connect(and1, `OUT-${i}`);
        connect(and2, `OUT-${i}`);

        let out = add("NODE", 0, 1, i, 4);
        connect(xor2, out);
    }

    let cTff = add("tff", 0, -2, 0, -2);
    let c = add("NODE", 0, -2, 0, 1);
    connect(cTff, c);
    connect(c, `XOR2-0`);
    connect(c, `AND2-0`);

    return getString();
}