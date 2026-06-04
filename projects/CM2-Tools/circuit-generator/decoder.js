function decoder(bits) {

    clear();

    for (let i = 0; i < bits; i++) {
        add("NODE", 0, -i, 0, 0, 0, `input-${i}`);
        add("DELAY", 0, -i, 0, 1, 1, `input-${i}-delayed`);
        add("NOR", 0, -i, 0, 2, 1, `input-${i}-negated`);
    }

    for (let i = 0; i < bits; i++) {
        connect(`input-${i}`, `input-${i}-delayed`)
        connect(`input-${i}`, `input-${i}-negated`)
    }

    for (let i = 0; i < Math.pow(2, bits); i++) {

        add("AND", 0, 1, 0, 3+i, 0, 0);

        let binary = i.toString(2).padStart(bits, "0");

        for (let j = 0; j < bits; j++) {
            if (binary[j] == 1) {
                connect(`input-${j}-delayed`, "last");
            } else {
                connect(`input-${j}-negated`, "last");
            }
        }
    }

    return getString();
}