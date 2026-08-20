function clafast(bits, id="") {
    function getSets(bits) {
        let order = [{type: "C", idx: 0, value: 1}];
        for (let i = 0; i < bits; i++) {
            order.unshift({type: "A", idx: i, value: Math.pow(2, i)}, {type: "B", idx: i, value: Math.pow(2, i)});
        }

        let sets = [];
        let size = order.length
        for (let i = 1; i < Math.pow(2, size); i++) {
            sets.push([]);
            const binary = i.toString(2).padStart(size, '0');

            let sum = 0;
            for (let j = 0; j < size; j++) {
                if (binary[j] == 1) {
                    sets[sets.length-1].push(order[j]);
                    sum += order[j].value;
                }
            }
            if (sum != Math.pow(2, bits)) {
                sets.pop();
            }
        }

        return sets;
    }


    let nodes = Math.pow(2, bits+1) - bits - 3;
    let size =  Math.floor((nodes++)/bits)+4
    let inA = [];
    let inB = [];
    let c = add("node", 0, 3, 0, 0);
    let out = [];

    let pinIdx = 0;
    for (let i = 0; i < bits; i++) {
        let a = add("node", 0, -i, 0, 0);
        inA.push(a)
        let b = add("node", 0, -i, 0, -1);
        inB.push(b)
        let xor = add("xor", 0, -i, 0, -size);
        out.push(xor);
        connect(a, xor);
        connect(b, xor);
        if (i == 0)
            connect(c, xor);
        else {
            const sets = getSets(i);

            for (let j = 0; j < sets.length; j++) {
                let node = add("node", 0, -pinIdx%bits, 0, -Math.floor((pinIdx++)/bits)-3);
                for (let k = 0; k < sets[j].length; k++) {
                    const pin = sets[j][k];
                    switch (pin.type) {
                        case "A":
                            connect(inA[pin.idx], node);
                            break;
                        case "B":
                            connect(inB[pin.idx], node);
                            break;
                        case "C":
                            connect(c, node);
                            break;
                    }
                    connect(node, xor);
                }
            }
        }
    }
}