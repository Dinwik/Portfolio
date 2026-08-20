function memory(bits, size, id="") {

    let log2size = Math.ceil(Math.log2(size));

    for (let i = 0; i < bits; i++) {
        let inp = add("node", 0, -i, 0, 0, 0, `MEMORY-${id}-INPUT-${i}`);
        let ind = add("delay", 0, -i, 0, -2, 1, `MEMORY-${id}-DINPUT-${i}`);
        connect(inp, ind);
        add("node", 0, -i, 0, -size-4, 0, `MEMORY-${id}-OUTPUT-${i}`);
    }
    offsetCall(2+log2size, 0, 0);
        decoder(log2size, `MEMORY-${id}-ADDRESS`, size);
        offsetCall(1, 0, 0);
            text("Address");
        offsetReturn();
    offsetReturn();
    offsetCall(-6-bits, 0, 0);
        text("Write");
        let writeEarly = add("node", 0, 5, 0, 0, 0, `MEMORY-${id}-WRITE`);
        let write = add("delay", 0, 5, 0, -2, 2);
        connect(writeEarly, write);
    offsetReturn();

    for (let i = 0; i < size; i++) {
        offsetCall(0, 0, -i-3);
            let dRead = add("delay", 0, 2, 1, 0, 2);
            connect(`DECODER-MEMORY-${id}-ADDRESS-OUTPUT-${i}`, dRead);
            for (let j = 0; j < bits; j++) {
                offsetCall(-j, 0, 0);
                    let xor = add("xor", 0, 0, 0, 0);
                    let writeBit = add("and", 0, 0, 1, 0);
                    let read = add("and", 0, 0, 2, 0);
                    let tff = add("tff", 0, 0, 3, 0);
                    connect(`MEMORY-${id}-DINPUT-${j}`, xor);
                    connect(xor, writeBit);
                    connect(`DECODER-MEMORY-${id}-ADDRESS-OUTPUT-${i}`, writeBit);
                    connect(dRead, read);
                    connect(tff, xor);
                    connect(writeBit, tff);
                    connect(tff, read);
                    connect(write, writeBit)
                    connect(read, `MEMORY-${id}-OUTPUT-${j}`);
                offsetReturn();
            }
        offsetReturn();
    }
}

function dualMemory(bits, size, id="") {

    let log2size = Math.ceil(Math.log2(size));

    decoder(log2size, `MEMORY-${id}-READ-A-ADRESS`, size);
    offsetCall(1, 0, 0);
        text("A");
    offsetReturn();

    offsetCall(log2size+2, 0, 0);
        add("and", 0, 0, 0, 0);
        decoder(log2size, `MEMORY-${id}-READ-B-ADRESS`, size);
        offsetCall(1, 0, 0);
            text("B");
        offsetReturn();
    offsetReturn();

    offsetCall(2*log2size+4, 0, 0);
        decoder(log2size, `MEMORY-${id}-SAVE-ADRESS`, size);
        offsetCall(1, 0, 0);
            text("Dest");
        offsetReturn();
    offsetReturn();

    offsetCall(-2-log2size, 0, 0);
        offsetCall(-6-bits, 0, 0);
            let writeEarly = add("node", 0, 5, 0, 0, 0, `MEMORY-${id}-SAVE`);
            let write = add("delay", 0, 5, 0, -2, 1);
            connect(writeEarly, write);
            text("Write");
        offsetReturn();
        
        add("text", 0, 1, 0, -size-3, "A");
        add("text", 0, -2*bits-1, 0, -size-3, "B");
        for (let i = 0; i < bits; i++) {
            let input = add("node", 0, -i, 0, 0, 0, `MEMORY-${id}-INPUT-${i}`);
            let dInput = add("delay", 0, -i, 0, -1, 1);
            connect(input, dInput);
            let a = add("node", 0, -i, 0, -size-3, 0, `MEMORY-${id}-OUTPUT-A-${i}`);
            let b = add("node", 0, -i-bits-1, 0, -size-3, 0, `MEMORY-${id}-OUTPUT-B-${i}`);
            for (let j = 0; j < size; j++) {
                if (i == 0) {
                    let DA = add("delay", 0, 2, 1, -j-3, 1, `DECODER-MEMORY-${id}-READ-A-ADRESS-OUTPUT-${j}-DELAYED`);
                    connect(`DECODER-MEMORY-${id}-READ-A-ADRESS-OUTPUT-${j}`, DA);
                    let DB = add("delay", 0, log2size+4, 1, -j-3, 1, `DECODER-MEMORY-${id}-READ-B-ADRESS-OUTPUT-${j}-DELAYED`);
                    connect(`DECODER-MEMORY-${id}-READ-B-ADRESS-OUTPUT-${j}`, DB);
                    connect(write, `DECODER-MEMORY-${id}-SAVE-ADRESS-OUTPUT-${j}`);
                }
                let tff = add("tff", 0, -i, 4, -j-3);
                let xor = add("xor", 0, -i, 0, -j-3);
                let writeBit = add("and", 0, -i, 1, -j-3);
                let readA = add("and", 0, -i, 2, -j-3);
                let readB = add("and", 0, -i, 3, -j-3);

                connect(dInput, xor);
                connect(tff, xor);
                connect(xor, writeBit);
                connect(`DECODER-MEMORY-${id}-SAVE-ADRESS-OUTPUT-${j}`, writeBit);
                connect(writeBit, tff);
                connect(tff, readA);
                connect(tff, readB);
                connect(`DECODER-MEMORY-${id}-READ-A-ADRESS-OUTPUT-${j}-DELAYED`, readA);
                connect(`DECODER-MEMORY-${id}-READ-B-ADRESS-OUTPUT-${j}-DELAYED`, readB);
                connect(readA, a);
                connect(readB, b);
            }
        }
    offsetReturn();
}