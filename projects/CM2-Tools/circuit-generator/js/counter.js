function counter(bits, id="") {

    let incEarly = add("node", 0, 1, 0, 0, 0, `COUNTER-${id}-INCREMENT`);
    let inc = add("delay", 0, -bits, 0, 0, 1);
    add("text", 0, 2, 0, 0, "+");
    connect(incEarly, inc);

    let decNegated = add("node", 0, 1, 0, 1, 0, `COUNTER-${id}-DECREMENT`);
    let dec = add("nor", 1, -bits, 0, 1);
    add("text", 0, 2, 0, 1, "-");
    connect(decNegated, dec);

    let setEarly = add("node", 0, 1, 0, 2, 0, `COUNTER-${id}-SET`);
    let set = add("delay", 0, -bits, 0, 2, 1);
    connect(setEarly, set);
    offsetCall(2, 0, 2);
        text("Set");
    offsetReturn();
    offsetCall(1, 0, 4);
        text("Value");
    offsetReturn();

    for (let i = 0; i < bits; i++) {

        let tff = add("tff", 0, -i, 0, -1, 0, `COUNTER-${id}-OUTPUT-${i}`);

        let nor = add("nor", 0, -i, 0, 1);
        let and = add("and", 0, -i, 0, 0);
        for (let j = 0; j < i; j++) {
            connect(`COUNTER-${id}-OUTPUT-${j}`, and);
            connect(`COUNTER-${id}-OUTPUT-${j}`, nor);
        }
        connect(dec, nor);
        connect(nor, tff);
        connect(inc, and);
        connect(and, tff);

        let val = add("node", 0, -i, 0, 4);
        let xor = add("xor", 0, -i, 0, 3);
        and = add("and", 0, -i, 0, 2);
        connect(val, xor);
        connect(tff, xor);
        connect(xor, and);
        connect(set, and);
        connect(and, tff);
    }
}