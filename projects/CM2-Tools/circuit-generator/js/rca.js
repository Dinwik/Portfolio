function rca(bits, synch=true, vert=false, id="") {

    clear();

    let cin;
    if (vert) {
        cin = add("node", 0, 2, 0, 0, 0, `RCA-${id}-CIN`);
        offsetCall(3, 0, 0);
    } else {
        cin = add("node", 0, 3, 0, 0, 0, `RCA-${id}-CIN`);
        offsetCall(4, 0, 0);
    }
    text("CIN");
    offsetReturn();

    let cout; 

    if (vert) {
        if (synch) {
            offsetCall(-8, 0, -6);
                text("COUT");
                cout = add("node", 0, 4, 0, 0, 0, `RCA-${id}-COUT`);
            offsetReturn();
        } else {
            offsetCall(-7, 0, -5);
                text("COUT");
                cout = add("node", 0, 4, 0, 0, 0, `RCA-${id}-COUT`);
            offsetReturn();
        }
        offsetCall(-2, bits, 0);
            text("A");
        offsetReturn();
        offsetCall(0, bits, 0);
            text("B");
        offsetReturn();
    } else {
        if (synch) {
            offsetCall(-bits-5, 0, -11);
                text("COUT");
                cout = add("node", 0, 4, 0, 0, 0, `RCA-${id}-COUT`);
            offsetReturn();
            offsetCall(1, 0, -1);
                text("A\nB");
            offsetReturn();
        } else {
            offsetCall(-bits-5, 0, -8);
                text("COUT");
                cout = add("node", 0, 4, 0, 0, 0, `RCA-${id}-COUT`);
            offsetReturn();
            offsetCall(1, 0, -1);
                text("A\nB");
            offsetReturn();
        }
        
    }

    for (let i = 0; i < bits; i++) {

        let a, b, and1, and2, and3, or, xor, out;

        if (vert) {

            a = add("node", 0, -2, i, 0, 0, `RCA-${id}-INPUT-A-${i}`);
            b = add("node", 0, 0, i, 0, 0, `RCA-${id}-INPUT-B-${i}`);
            if (synch)
                out = add("node", 0, -1, i, -6, 0, `RCA-${id}-OUTPUT-${i}`);
            else
                out = add("node", 0, -1, i, -5, 0, `RCA-${id}-OUTPUT-${i}`);
            or = add("node", 0, 0, i, -3, 0, `RCA-${id}-COUT-${i}`);

            if (synch) {
                let da = add("delay", 0, -2, i, -2, i);
                let db = add("delay", 0, -1, i, -2, i);
                connect(a, da);
                connect(b, db);

                and1 = add("and", 0, 0, i, -2);
                and2 = add("and", 0, -2, i, -3);
                and3 = add("and", 0, -1, i, -3);
                
                connect(da, and1);
                connect(db, and1);
                connect(da, and2);
                connect(db, and3);

                xor = add("xor", 0, -2, i, -4);
                connect(da, xor);
                connect(db, xor);

                let dout = add("delay", 0, -1, i, -4, bits-i-1);
                connect(xor, dout);
                connect(dout, out);
            } else {
                and1 = add("and", 0, -2, i, -2);
                and2 = add("and", 0, -1, i, -2);
                and3 = add("and", 0, 0, i, -2);

                connect(a, and1);
                connect(b, and1);
                connect(a, and2);
                connect(b, and3);

                xor = add("xor", 0, -1, i, -3);
                connect(a, xor);
                connect(b, xor);

                connect(xor, out);
            }

        } else {

            a = add("node", 0, -i, 0, 0, 0, `RCA-${id}-INPUT-A-${i}`);
            b = add("node", 0, -i, 0, -1, 0, `RCA-${id}-INPUT-B-${i}`);
            if (synch)
                out = add("node", 0, -i, 0, -11, 0, `RCA-${id}-OUTPUT-${i}`);
            else
                out = add("node", 0, -i, 0, -8, 0, `RCA-${id}-OUTPUT-${i}`);
            or = add("node", 0, -i, 0, -4, 0, `RCA-${id}-COUT-${i}`);

            if (synch) {
                let da = add("delay", 0, -i, 0, -2, i);
                let db = add("delay", 0, -i, 0, -3, i);
                connect(a, da);
                connect(b, db);

                and1 = add("and", 0, -i, 0, -5);
                and2 = add("and", 0, -i, 0, -6);
                and3 = add("and", 0, -i, 0, -7);
                
                connect(da, and1);
                connect(db, and1);
                connect(da, and2);
                connect(db, and3);

                xor = add("xor", 0, -i, 0, -8);
                connect(da, xor);
                connect(db, xor);

                let dout = add("delay", 0, -i, 0, -9, bits-i-1);
                connect(xor, dout);
                connect(dout, out);
            } else {
                and1 = add("and", 0, -i, 0, -2);
                and2 = add("and", 0, -i, 0, -3);
                and3 = add("and", 0, -i, 0, -5);

                connect(a, and1);
                connect(b, and1);
                connect(a, and2);
                connect(b, and3);

                xor = add("xor", 0, -i, 0, -6);
                connect(a, xor);
                connect(b, xor);

                connect(xor, out);
            }
        }
        
        if (i == 0) {
            connect(cin, and2);
            connect(cin, and3);
            connect(cin, xor);
        } else {
            connect(`RCA-${id}-COUT-${i-1}`, and2);
            connect(`RCA-${id}-COUT-${i-1}`, and3);
            connect(`RCA-${id}-COUT-${i-1}`, xor);
        }
        connect(and1, or);
        connect(and2, or);
        connect(and3, or);
    }

    connect(`RCA-${id}-COUT-${bits-1}`, cout);
}