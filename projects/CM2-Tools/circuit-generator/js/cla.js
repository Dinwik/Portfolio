function cla(bits, id="") {

    let cin = add("node", 0, 3, 0, 0, 0, `CLA-${id}-CIN`);
    let cout = add("node", 0, -bits-1, 0, -bits-5, 0, `CLA-${id}-COUT`);
    offsetCall(4, 0, 0);
        text("Cin");
    offsetReturn();
    offsetCall(-bits-5, 0, -bits-5);
        text("Cout");
    offsetReturn();
    add("text", 0, 1, 0, 0, "A");
    add("text", 0, 1, 0, -1, "B");

    offsetCall(1, 0, -bits-5);
        text("Output");
    offsetReturn();

    let cinD = add("delay", 0, 0, 0, -4, 1);
    connect(cin, cinD);

    for (let i = 0; i < bits; i++) {

        let a = add("node", 0, -i, 0, 0, 0, `CLA-${id}-INPUT-A-${i}`);
        let b = add("node", 0, -i, 0, -1, 0, `CLA-${id}-INPUT-B-${i}`);

        let out = add("xor", 0, -i, 0, -bits-5, 0, `CLA-${id}-OUTPUT-${i}`);
        connect(a, out);
        connect(b, out);

        let cout = add("node", 0, -i, 0, -bits-4, 0, `CLA-${id}-COUT-${i}`);
        if (i == 0) {
            connect(cinD, out);
        } else {
            connect(`CLA-${id}-COUT-${i-1}`, out);
        }

        let or = add("node", 0, -i, 0, -bits-3, 0, `CLA-${id}-OR-${i}`);
        connect(a, or);
        connect(b, or);
    }
    connect(`CLA-${id}-COUT-${bits-1}`, cout);

    for (let i = 0; i < bits; i++) {
        for (let j = 0; j <= i+1; j++) {

            let and = add("and", 0, -i, 0, -2-j);

            for (let k = i; k >= j; k--) {
                if (k == j) {
                    connect(`CLA-${id}-INPUT-A-${k}`, and);
                    connect(`CLA-${id}-INPUT-B-${k}`, and);
                } else {
                    connect(`CLA-${id}-OR-${k}`, and);
                }
            }

            if (j == i+1) {
                connect(cin, and);

                for (let k = i; k >= 0; k--) {
                    connect(`CLA-${id}-OR-${k}`, and);
                }
            }

            connect(and, `CLA-${id}-COUT-${i}`);
        }
    }
}