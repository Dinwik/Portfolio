function ddModule(x, z, id) {
    add("NODE", 0, x, 0, z, 0, `DDMODULE-${id}-INPUT-0`);
    add("NODE", 0, x-1, 0, z, 0, `DDMODULE-${id}-INPUT-1`);
    add("NODE", 0, x-2, 0, z, 0, `DDMODULE-${id}-INPUT-2`);
    add("NODE", 0, x-3, 0, z, 0, `DDMODULE-${id}-INPUT-3`);

    let da0 = add("delay", 0, x, 1, z, 1);
    let da1 = add("delay", 0, x-1, 1, z, 1);
    let da2 = add("delay", 0, x-2, 1, z, 1);
    let da3 = add("delay", 0, x-3, 1, z, 1);

    connect(`DDMODULE-${id}-INPUT-0`, da0);
    connect(`DDMODULE-${id}-INPUT-1`, da1);
    connect(`DDMODULE-${id}-INPUT-2`, da2);
    connect(`DDMODULE-${id}-INPUT-3`, da3);

    let n0 = add("AND", 0, x, 2, z);
    let n1 = add("AND", 0, x-1, 2, z);
    let n2 = add("AND", 0, x-2, 2, z);

    connect(`DDMODULE-${id}-INPUT-0`, n0);
    connect(`DDMODULE-${id}-INPUT-2`, n0);

    connect(`DDMODULE-${id}-INPUT-1`, n1);
    connect(`DDMODULE-${id}-INPUT-2`, n1);

    connect(`DDMODULE-${id}-INPUT-3`, n2);
    connect(`DDMODULE-${id}-INPUT-0`, n2);

    let or = add("NODE", 0, x-3, 2, z);

    connect(n0, or);
    connect(n1, or);
    connect(da3, or);

    add("XOR", 0, x, 3, z, 0, `DDMODULE-${id}-OUTPUT-0`);
    add("XOR", 0, x-1, 3, z, 0, `DDMODULE-${id}-OUTPUT-1`);
    add("XOR", 0, x-2, 3, z, 0, `DDMODULE-${id}-OUTPUT-2`);
    add("XOR", 0, x-3, 3, z, 0, `DDMODULE-${id}-OUTPUT-3`);

    connect(or, `DDMODULE-${id}-OUTPUT-0`);
    connect(da0, `DDMODULE-${id}-OUTPUT-0`);

    connect(da1, `DDMODULE-${id}-OUTPUT-1`);
    connect(n0, `DDMODULE-${id}-OUTPUT-1`);
    connect(n2, `DDMODULE-${id}-OUTPUT-1`);
    connect(or, `DDMODULE-${id}-OUTPUT-1`);

    connect(da3, `DDMODULE-${id}-OUTPUT-2`);
    connect(or, `DDMODULE-${id}-OUTPUT-2`);
    connect(da2, `DDMODULE-${id}-OUTPUT-2`);
    connect(n2, `DDMODULE-${id}-OUTPUT-2`);

    connect(or, `DDMODULE-${id}-OUTPUT-3`);
}

function dd(bits, id="") {
    for (let i = 0; i < bits; i++) {
        add("NODE", 0, i-2, 0, 2, 0, `DD-${id}-INPUT-${bits-i}`);
    }

    let layers = 1;
    let pad = 0;

    let x = 0;
    let z = 0;

    for (let i = 0; i < bits-3; i++) {
        for (let j = 0; j < layers; j++) {

            ddModule(x - 4*j, z, `${id}-${i}-${j}`);

            if (j == 0) {
                if (i > 0) {
                    connect(`DD-${id}-DELAY-${i-1}-${x+2}`, `DDMODULE-${id}-${i}-${j}-INPUT-0`);
                } else {
                    connect(`DD-${id}-INPUT-${bits}`, `DDMODULE-${id}-0-0-INPUT-2`);
                    connect(`DD-${id}-INPUT-${bits-1}`, `DDMODULE-${id}-0-0-INPUT-1`);
                    connect(`DD-${id}-INPUT-${bits-2}`, `DDMODULE-${id}-0-0-INPUT-0`);
                }
            }
        }

        for (let j = 0; j < pad; j++) {
            add("DELAY", 0, x - 4*layers - j, 0, z, 2, `DD-${id}-PADDING-${i}-${j}`);
        }

        if (pad == 2) {
            connect(`DD-${id}-PADDING-${i-1}-0`, `DD-${id}-PADDING-${i}-1`);
        }

        for (let j = 0; j < layers; j++) {
            if (i > 0) {
                if (i < 3 || !(j+1 >= layers && pad == 0)) {
                    connect(`DDMODULE-${id}-${i-1}-${j}-OUTPUT-0`, `DDMODULE-${id}-${i}-${j}-INPUT-1`);
                    connect(`DDMODULE-${id}-${i-1}-${j}-OUTPUT-1`, `DDMODULE-${id}-${i}-${j}-INPUT-2`);
                    connect(`DDMODULE-${id}-${i-1}-${j}-OUTPUT-2`, `DDMODULE-${id}-${i}-${j}-INPUT-3`);

                    if (j + 1 < layers) {
                        connect(`DDMODULE-${id}-${i-1}-${j}-OUTPUT-3`, `DDMODULE-${id}-${i}-${j+1}-INPUT-0`);
                    } else {
                        connect(`DDMODULE-${id}-${i-1}-${j}-OUTPUT-3`, `DD-${id}-PADDING-${i}-0`);
                    }
                } else if (pad === 0) {
                    connect(`DD-${id}-PADDING-${i-1}-0`, `DDMODULE-${id}-${i}-${j}-INPUT-1`);
                    connect(`DD-${id}-PADDING-${i-1}-1`, `DDMODULE-${id}-${i}-${j}-INPUT-2`);
                }
            }
        }

        for (let j = x+3; j < bits; j++) {

            let did = `${i}-${j}`;

            add("DELAY", 0, j-2, 0, z, 2, `DD-${id}-DELAY-${did}`);

            if (i > 0) {
                if (j > 0) {
                    connect(`DD-${id}-DELAY-${i-1}-${j}`, `DD-${id}-DELAY-${did}`);
                }
            } else {
                connect(`DD-${id}-INPUT-${bits-j}`, `DD-${id}-DELAY-${did}`);
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

    let node = add("NODE", 0, x, 0, z, 0, `DD-${id}-OUTPUT-${Math.floor(offset/4)}-${offset%4}`);
    connect(`DD-${id}-DELAY-${bits-4}-${bits-1}`, node);

    x--; 

    for (let i = 0; i < 4*layers; i++) {
        offset++;
        let node = add("NODE", 0, x, 0, z - (offset%8 > 3 ? 1 : 0), 0,`DD-${id}-OUTPUT-${Math.floor(offset/4)}-${offset%4}`);
        connect(`DDMODULE-${id}-${bits-4}-${Math.floor(i/4)}-OUTPUT-${i%4}`, node);
        x--;
    }

    for (let i = 0; i < pad; i++) {
        offset++;
        let node = add("NODE", 0, x, 0, z - (offset%8 > 3 ? 1 : 0), 0, `DD-${id}-OUTPUT-${Math.floor(offset/4)}-${offset%4}`);
        connect(`DD-${id}-PADDING-${bits-4}-${i}`, node);
        x--;
    }
}