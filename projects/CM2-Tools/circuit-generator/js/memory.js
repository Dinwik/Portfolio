function memory(bits, size, id="") {

    let log2size = Math.ceil(Math.log2(size));

    offsetCall(2+log2size, 0, 0)
        decoder(log2size, `MEMORY-${id}-ADRESS`, size);
        
        offsetCall(1, 0, 0);
            text("Adress");
        offsetReturn();
    offsetReturn();

    offsetCall(-bits-4, 0, 0);
        text("Value");
    offsetReturn();

    let write = add("node", 0, -bits-6, 0, 0);
    offsetCall(-bits-11, 0, 0);
        text("Write");
    offsetReturn();

    offsetCall(1, 0, -size-4);
        text("Output");
    offsetReturn();

    for (let i = 0; i < bits; i++) {
        add("node", 0, -i, 0, 0, 0, `MEMORY-${id}-INPUT-VALUE-${i}`);
        add("node", 0, -i, 0, -size-4, 0, `MEMORY-${id}-OUTPUT-${i}`);
    }

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < bits; j++) {

            let xor = add("xor", 0, -j, 0, -i-3);
            let writeBit = add("and", 0, -j, 1, -i-3);
            let tff = add("tff", 0, -j, 2, -i-3);

            connect(`MEMORY-${id}-INPUT-VALUE-${j}`, xor);
            connect(tff, xor)
            
            connect(`DECODER-MEMORY-${id}-ADRESS-OUTPUT-${i}`, writeBit);
            connect(write, writeBit);
            connect(writeBit, tff);
            connect(xor, writeBit)

            let read = add("and", 0, -j, 3, -i-3);
            connect(tff, read);
            connect(`DECODER-MEMORY-${id}-ADRESS-OUTPUT-${i}`, read);
            connect(read, `MEMORY-${id}-OUTPUT-${j}`);
        }
    }
}

function dualMemory(bits, size, id="") {

    let log2size = Math.ceil(Math.log2(size));

    offsetCall(0, 0, 0)
        decoder(log2size, `MEMORY-${id}-READ-A-ADRESS`, size);
        
        offsetCall(1, 0, 0);
            text("A");
        offsetReturn();
    offsetReturn();

    offsetCall(2+log2size, 0, 0)
        decoder(log2size, `MEMORY-${id}-READ-B-ADRESS`, size);
        
        offsetCall(1, 0, 0);
            text("B");
        offsetReturn();
    offsetReturn();

    offsetCall(2*(2+log2size), 0, 0)
        decoder(log2size, `MEMORY-${id}-WRITE-ADRESS`, size);
        
        offsetCall(1, 0, 0);
            text("Write adress");
        offsetReturn();
    offsetReturn();

    for (let i = 0; i < bits; i++) {
        add("node", 0, -i-5, 0, 0, 0, `MEMORY-${id}-INPUT-VALUE-${i}`);
        add("node", 0, -i-5, 0, -size-4, 0, `MEMORY-${id}-OUTPUT-A-${i}`);
        add("node", 0, -i-6-bits, 0, -size-4, 0, `MEMORY-${id}-OUTPUT-B-${i}`);
    }

    add("text", 0, -4, 0, -size-4, "A");
    add("text", 0, -10-bits, 0, -size-4, "B");

    offsetCall(-bits-11, 0, 0);
        let write = add("node", 0, 5, 0, 0, `MEMORY-${id}-WRITE`);
        text("Write");
    offsetReturn();

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < bits; j++) {
            
            let xor = add("xor", 0, -j-5, 0, -i-3);
            let writeBit = add("and", 0, -j-5, 1, -i-3);
            let tff = add("tff", 0, -j-5, 2, -i-3);
            let readA = add("and", 0, -j-5, 3, -i-3);
            let readB = add("and", 0, -j-5, 4, -i-3);

            connect(`MEMORY-${id}-INPUT-VALUE-${j}`, xor);
            connect(tff, xor);
            connect(`DECODER-MEMORY-${id}-WRITE-ADRESS-OUTPUT-${i}`, writeBit);
            connect(write, writeBit);
            connect(writeBit, tff);
            connect(xor, writeBit);

            connect(tff, readA);
            connect(tff, readB);
            connect(`DECODER-MEMORY-${id}-READ-A-ADRESS-OUTPUT-${i}`, readA);
            connect(`DECODER-MEMORY-${id}-READ-B-ADRESS-OUTPUT-${i}`, readB);
            connect(readA, `MEMORY-${id}-OUTPUT-A-${j}`);
            connect(readB, `MEMORY-${id}-OUTPUT-B-${j}`);
        }
    }
}