function cla(bits) {

    const tidy = 1; //1 or 0

    clear();

    for (let i = 0; i < bits; i++) {
        add("NODE", 0, -i, 0, 0, 0, `input-A-${i}`);
        add("NODE", 0, -i, 0, -1, 0, `input-B-${i}`);

        if (i+1 < bits)
            add("NODE", 0, -i, 0, tidy-3-bits, 0, `COUT-${i}`);
        else
            add("NODE", 0, -i-2, 0, -4-bits, 0, `COUT-${i}`);

        add("XOR", 0, -i, 0, tidy-5-bits, 0, `XOR-${i}`);

        add("NODE", 0, -i, 0, tidy-4-bits, 0, `OR-${i}`);
        connect(`input-A-${i}`, `OR-${i}`);
        connect(`input-B-${i}`, `OR-${i}`);

        connect(`input-A-${i}`, `XOR-${i}`);
        connect(`input-B-${i}`, `XOR-${i}`);
    }

    add("TEXT", 0, -bits-5, 0, -4-bits, "C");
    add("TEXT", 0, -bits-4, 0, -4-bits, "O");
    add("TEXT", 0, -bits-3, 0, -4-bits, "U");
    add("TEXT", 0, -bits-2, 0, -4-bits, "T");

    add("TEXT", 0, 1, 0, 0, "A");
    add("TEXT", 0, 1, 0, -1, "B");

    add("NODE", 0, 3, 0, 0, 0, "COUT--1");
    add("TEXT", 0, 4, 0, 0, "C");
    add("TEXT", 0, 5, 0, 0, "I");
    add("TEXT", 0, 6, 0, 0, "N");


    for (let i = 0; i < bits; i++) {
        connect(`COUT-${i-1}`, `XOR-${i}`);
    }


    for (let i = 0; i < bits; i++) {

        for (j = 0; j <= i; j++) {

            add("AND", 0, -i, 0, -2-j, 0, `AND-${i}-${j}`);

            for (let k = i; k >= j; k--) {
                
                connect(`OR-${k}`, `AND-${i}-${j}`);
            }

            if (j == 0) {
                connect(`COUT--1`, `AND-${i}-${j}`);
            } else {
                connect(`input-A-${j-1}`, `AND-${i}-${j}`);
                connect(`input-B-${j-1}`, `AND-${i}-${j}`);
            }

            connect(`AND-${i}-${j}`, `COUT-${i}`);
        }

        add("AND", 0, -i, 0, -3-i, 0, `AND-${i}-${i+1}`);

        connect(`input-A-${i}`, `AND-${i}-${i+1}`)
        connect(`input-B-${i}`, `AND-${i}-${i+1}`)

        connect(`AND-${i}-${i+1}`, `COUT-${i}`);
    }

    getString();
}