let expression = "A &B";
let vars = ['A', 'B'];
let tokens = ["A", "&", "B"];

function setInSet(original, subset) {
    for (let i = 0; i < subset.length; i++) {
        if (!original.includes(subset[i]))
            return false;
    }
    return true;
}

function tokenize(src) {
    function addToken(token) {
        if (token.length == 0) return;

        if (token == "TRUE" || token == "1") tokens.push("TRUE");
        else if (token == "FALSE" || token == "0") tokens.push("FALSE");
        else if (token == "(") tokens.push("(");
        else if (token == ")") tokens.push(")");
        else if (token == "!" || token == "NOT" || token == "~") tokens.push("NOT");
        else if (token == "&" || token == "*" || token == "AND") tokens.push("AND");
        else if (token == "NAND") tokens.push("NAND")
        else if (token == "^" || token == "XOR") tokens.push("XOR");
        else if (token == "XNOR") tokens.push("XNOR");
        else if (token == "|" || token == "+" || token == "OR") tokens.push("OR");
        else if (token == "NOR") tokens.push("NOR");
        else {
            if (!vars.includes(token)) {
                vars.push(token);
            }
            tokens.push(token)
        };
    }
    function isNextToken(buffer, c) {
        switch (c) {
            case ' ':
            case '\n':
            case '\t':
            case '\f':
            case '\v':
            case '(':
            case ')':
            case '!':
            case '~':
            case '&':
            case '*':
            case '^':
            case '|':
            case '+':
                return true;
        }
        switch (buffer[0]) {
            case ' ':
            case '\n':
            case '\t':
            case '\f':
            case '\v':
            case '0':
            case '1':
            case '(':
            case ')':
            case '!':
            case '~':
            case '&':
            case '*':
            case '^':
            case '|':
            case '+':
                return true;
        }
        return false;
    }

    vars = [];
    tokens = [];

    let buffer = "";
    for (let i = 0; i < src.length; i++) {
        let c = src[i];

        if (/\s/.test(c)) {
            addToken(buffer);
            buffer = "";
            continue;
        }
        if (isNextToken(buffer, c)) {
            addToken(buffer);
            buffer = "";
        }
        buffer += c;
    }
    addToken(buffer);

    console.log("tokens:", tokens);
    console.log("variables:", vars);
}

function evaluate(values) {
    function evaluateSimple(expr) {
        while (expr.includes("NOT")) {
            let i = expr.indexOf("NOT");
            expr[i+1] = !expr[i+1];
            expr.splice(i, 1);
        }
        while (expr.includes("AND")) {
            let i = expr.indexOf("AND");
            expr[i-1] = expr[i-1] && expr[i+1];
            expr.splice(i, 2);
        }
        while (expr.includes("NAND")) {
            let i = expr.indexOf("NAND");
            expr[i-1] = !(expr[i-1] && expr[i+1]);
            expr.splice(i, 2);
        }
        while (expr.includes("XOR")) {
            let i = expr.indexOf("XOR");
            expr[i-1] = expr[i-1] != expr[i+1];
            expr.splice(i, 2);
        }
        while (expr.includes("XNOR")) {
            let i = expr.indexOf("XNOR");
            expr[i-1] = expr[i-1] == expr[i+1];
            expr.splice(i, 2);
        }
        while (expr.includes("OR")) {
            let i = expr.indexOf("OR");
            expr[i-1] = expr[i-1] || expr[i+1];
            expr.splice(i, 2);
        }
        while (expr.includes("NOR")) {
            let i = expr.indexOf("NOR");
            expr[i-1] = !(expr[i-1] || expr[i+1]);
            expr.splice(i, 2);
        }
        return (expr[0]);
    }

    let expr = tokens.map(token => token == "TRUE" ? 1 : (token == "FALSE" ? 0 : (vars.includes(token) ? values[vars.indexOf(token)] : token)));

    while (expr.includes("(")) {
        let opening = expr.lastIndexOf("(");
        let closing = expr.indexOf(")", opening);
        let evaluated = evaluateSimple(expr.splice(opening+1, closing-opening - 1));
        expr.splice(opening, 2, evaluated);
    }
    let evaluated = evaluateSimple(expr);
    return evaluated;
}

function generate() {

    //make all sets
        const sets = [];
        for (let i = 0; i < Math.pow(2, vars.length); i++) {
            sets.push([]);
            const binary = i.toString(2).padStart(vars.length, '0');

            for (let j = 0; j < binary.length; j++) {
                if (binary[j] == 1)
                    sets[i].push(vars[j]);
            }
        }
        sets.sort((a, b) => a.length - b.length);

    //filter sets
        let results = [];
        let groupCount = 0;
        let finalGroups = [];
        for (let i = 0; i < sets.length; i++) {
            let values = [];
            for (let j = 0; j < vars.length; j++)
                values.push(!sets[i].includes(vars[j]));
            let result = evaluate(values);
            for (let j = 0; j < results.length; j++) {
                if (setInSet(sets[i], sets[j]))
                    result ^= results[j];
            }
            results.push(result);
            if (sets[i].length > 0 && result) {
                groupCount++;
                finalGroups.push(sets[i]);
            }
        }
        let finalGate = (results[0] ^ (groupCount%2==0 ? false : true)) ? "xnor" : "xor";

    //make circuit
        offsetCall(0, 0, 2);
            text(input.value, false);
        offsetReturn();
        let inputs = [];
        for (let i = 0; i < vars.length; i++) {
            offsetCall(0, 0, -i*2);
                inputs.push(add("tff", 0, 0, 0, 0, 0));
                offsetCall(-vars[i].length, 0, 0);
                    text(vars[i])
                offsetReturn();
            offsetReturn();
        }
        let out = add(finalGate, 0, 4, 0, 0);
        let pos = 0;
        for (let i = 0; i < finalGroups.length; i++) {
            if (finalGroups[i].length == 1) {
                connect(inputs[vars.indexOf(finalGroups[i][0])], out);
                continue;
            }
            let node = add("node", 0, 2, 0, -pos++*2);
            for (let j = 0; j < finalGroups[i].length; j++) {
                connect(inputs[vars.indexOf(finalGroups[i][j])], node);
            }
            connect(node, out);
        }
}