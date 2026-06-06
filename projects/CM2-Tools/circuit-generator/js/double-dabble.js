function ddModule(id, x, z) {

    let a0 = add("NODE", 0, x, 1, z, 0, `INPUT-0-${id}`);
    let a1 = add("NODE", 0, x-1, 1, z, 0, `INPUT-1-${id}`);
    let a2 = add("NODE", 0, x-2, 1, z, 0, `INPUT-2-${id}`);
    let a3 = add("NODE", 0, x-3, 1, z, 0, `INPUT-3-${id}`);

    let da0 = add("OR", 0, x, 0, z);
    let da1 = add("OR", 0, x-1, 0, z);
    let da2 = add("OR", 0, x-2, 0, z);
    let da3 = add("OR", 0, x-3, 0, z);

    connect(a0, da0);
    connect(a1, da1);
    connect(a2, da2);
    connect(a3, da3);


    let n0 = add("AND", 0, x, 0, z-1);
    let n1 = add("AND", 0, x-1, 0, z-1);
    let n2 = add("AND", 0, x-2, 0, z-1);

    connect(`INPUT-0-${id}`, n0);
    connect(`INPUT-2-${id}`, n0);

    connect(`INPUT-1-${id}`, n1);
    connect(`INPUT-2-${id}`, n1);

    connect(`INPUT-3-${id}`, n2);
    connect(`INPUT-0-${id}`, n2);


    let or = add("NODE", 0, x-3, 0, z-1);

    connect(n0, or);
    connect(n1, or);
    connect(da3, or);


    let s0 = add("XOR", 0, x, 1, z-1, 0, `OUTPUT-0-${id}`);
    let s1 = add("XOR", 0, x-1, 1, z-1, 0, `OUTPUT-1-${id}`);
    let s2 = add("XOR", 0, x-2, 1, z-1, 0, `OUTPUT-2-${id}`);
    let s3 = add("XOR", 0, x-3, 1, z-1, 0, `OUTPUT-3-${id}`);

    connect(or, s0);
    connect(da0, s0);

    connect(da1, s1);
    connect(n0, s1);
    connect(n2, s1);
    connect(or, s1);

    connect(da3, s2);
    connect(or, s2);
    connect(da2, s2);
    connect(n2, s2);

    connect(or, s3);
}

function dd(bits) {

    clear();

    for (let i = 0; i < bits; i++)
        add("NODE", 0, i-2, 0, 2, 0, `INPUT-${bits-i}`);

    let layers = 1;
    let pad = 0;

    let x = 0;
    let z = 0;

    for (let i = 0; i < bits-3; i++) {

        for (let j = 0; j < layers; j++) {
            ddModule(`${i}-${j}`, x-4*j, z);

            if (j == 0) {
                if (i > 0)
                    connect(`DELAY-${i-1}-${x+2}`, `INPUT-0-${i}-0`);
                else {
                    connect(`INPUT-${bits}`, `INPUT-2-0-0`);
                    connect(`INPUT-${bits-1}`, `INPUT-1-0-0`);
                    connect(`INPUT-${bits-2}`, `INPUT-0-0-0`);
                }
            }
        }

        for (let j = 0; j < pad; j++) {

            add("DELAY", 0, x-4*layers-j, 0, z, 2, `PAD-${i}-${j}`);
        }

        if (pad == 2) {
            connect( `PAD-${i-1}-0`, `PAD-${i}-1`);
        }

        for (let j = 0; j < layers; j++) {

            if (i > 0) {

                if (i < 3 || !(j+1 >= layers && pad == 0)) {

                    connect(`OUTPUT-0-${i-1}-${j}`, `INPUT-1-${i}-${j}`);
                    connect(`OUTPUT-1-${i-1}-${j}`, `INPUT-2-${i}-${j}`);
                    connect(`OUTPUT-2-${i-1}-${j}`, `INPUT-3-${i}-${j}`);

                    if (j+1 < layers) {
                        connect(`OUTPUT-3-${i-1}-${j}`, `INPUT-0-${i}-${j+1}`);
                    } else {
                        connect(`OUTPUT-3-${i-1}-${j}`, `PAD-${i}-0`);
                    }
                } else if (pad == 0) {
                    connect(`PAD-${i-1}-0`, `INPUT-1-${i}-${j}`);
                    connect(`PAD-${i-1}-1`, `INPUT-2-${i}-${j}`);
                }
            }
        }

        for (let j = x+3; j < bits; j++) {

            add("DELAY", 0, j-2, 0, z, 2, `DELAY-${i}-${j}`);

            if (i > 0) {
                if (j > 0)
                    connect(`DELAY-${i-1}-${j}`, `DELAY-${i}-${j}`);
            } else {
                connect(`INPUT-${bits-j}`, `DELAY-${i}-${j}`);
            }
        }


        pad++;
        if (pad >= 3) {
            pad = 0;
            layers++;
        }

        x += 1;
        z -= 2;
    }

    pad--;

    let offset = 0;

    let final = add("NODE", 0, x, 0, z);
    connect(`DELAY-${bits-4}-${bits-1}`, final);

    x--;

    for (let i = 0; i < 4*layers; i++) {

        offset++;

        let final = add("NODE", 0, x, 0, z - (offset % 8 > 3 ? 1 : 0));
        connect(`OUTPUT-${i%4}-${bits-4}-${Math.floor(i/4)}`, final);
        x--;
    }

    for (let i = 0; i < pad; i++) {

        offset++;

        let final = add("NODE", 0, x, 0, z - (offset % 8 > 3 ? 1 : 0));
        connect(`PAD-${bits-4}-${i}`, final);
        x--;
    }

    return getString();
}