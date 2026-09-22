//TODO:
// - unspaghettify (in progress)
// - nodes using other nodes

const keyWordsByPriority = ["=", ":", "NOR", "OR", "XNOR", "XOR", "NAND", "AND", "NOT"];

function isNextToken(buffer, char) {
    const keywords = ["(", ")", "!", "~", "&", "*", "^", "|", "+", "=", ";", "#", ":"];
    if (keywords.includes(char))
        return true;
    if (buffer.length == 1 && keywords.includes(buffer[0]))
        return true;
    return false;
}

function normalizeToken(string) {
    const upper = string.toUpperCase();
    switch(string) {
        case "TRUE":
        case "1":
            return "TRUE";
        case "FALSE":
        case "0":
            return "FALSE";
        case "(":
            return "(";
        case ")":
            return ")";
        case "!":
        case "NOT":
        case "~":
            return "NOT";
        case "&":
        case "*":
        case "AND":
            return "AND";
        case "NAND":
            return "NAND";
        case "^":
        case "XOR":
            return "XOR";
        case "XNOR":
            return "XNOR";
        case "|":
        case "+":
        case "OR":
            return "OR";
        case "NOR":
            return "NOR";
        case "=":
            return "=";
        case ":":
            return ":";
        case ";":
            return ";";
        default:
            return "_"+string;
    }
}

function getLinesOfTokensFromTokens(tokens) {
    let linesOfTokens = [];
    let buffer = [];
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        if (token == ";") {
            linesOfTokens.push(buffer);
            buffer = [];
            continue;
        }
        buffer.push(token);
    }
    return linesOfTokens;
}

function getTokensAndVariables(expression) {
    let tokens = [];
    let variables = [];

    let buffer = "";
    function nextToken() {
        if (buffer.length > 0) {
            let token = normalizeToken(buffer)
            if (token[0] == "_") {
                token = token.slice(1)
                if (!variables.includes(buffer))
                    variables.push(token);
            }
            tokens.push(token);
        }
        buffer = "";
    }

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        if (/\s/.test(char)) {
            nextToken();
            continue;
        }
        
        if (char == "#") {
            const commentEnding = expression.indexOf("#", i+1);
            if (commentEnding == -1)
                break;
            i = commentEnding;
            buffer = "";
            continue;
        }

        if (isNextToken(buffer, char))
            nextToken();

        buffer += char;
    }
    nextToken();
    return [tokens, variables];
}

function classifyVariables(tokens, variables) {
    let outputs = [];
    for (let i = 0; i < tokens.length-1; i++) {
        const token = tokens[i];
        const nextToken = tokens[i+1];
        const idx = variables.indexOf(token);
        if (idx != -1) {
            if (nextToken == "=") {
                variables.splice(idx, 1);
                outputs.push(token);
            } else if (nextToken == ":") {
                variables.splice(idx, 1);
            }
        }
    }
    return [variables, outputs];
}

function findFirstKeywordOutsideBrackets(tokens, keyword) {
    let depth = 0;
    for (let i = 0; i < tokens.length; i++) {
        switch(tokens[i]) {
            case "(":
                depth++;
                continue;
            case ")":
                depth--;
                continue;
            case keyword:
                if (depth == 0)
                    return i;
                continue;
            default:
                continue;
        }
    }
    return -1;
}

function findClosingBracketIdx(tokens, opening) {
    let depth = 0;
    for (let i = opening+1; i < tokens.length; i++) {
        switch(tokens[i]) {
            case "(":
                depth++;
                continue;
            case ")":
                if (depth == 0)
                    return i;
                depth--;
                continue;
            default:
                continue;
        }
    }
    throw new Error("Bracket was opened, but not closed.");
}

function getParseTreeBranchFromTokens(tokens) {
    while (tokens[0] == "(" && findClosingBracketIdx(tokens, 0) == tokens.length-1)
        tokens = tokens.slice(1, tokens.length-1);
    if (tokens.length == 1)
        return tokens[0];
    
    for (let i = 0; i < keyWordsByPriority.length; i++) {
        const keyword = keyWordsByPriority[i];
        const idx = findFirstKeywordOutsideBrackets(tokens, keyword);
        if (idx == -1)
            continue;

        const result = [
            keyword,
            getParseTreeBranchFromTokens(tokens.slice(0, idx)),
            getParseTreeBranchFromTokens(tokens.slice(idx+1, tokens.length))
        ];

        if (keyword == "NOT")
            result.splice(1, 1);

        return result;
    }
    return "You messed up";
}

function growAParseTreeFromLinesOfTokens(linesOfTokens) {
    let parseTree = [];

    for (let i = 0; i < linesOfTokens.length; i++)
        parseTree.push(getParseTreeBranchFromTokens([...linesOfTokens[i]]));

    return parseTree;
}

function getAllSets(inputs) {
    let sets = [];
    for (let i = 0; i < Math.pow(2, inputs.length); i++) {
        sets.push([]);
        const binary = i.toString(2).padStart(inputs.length, "0");
        for (let j = 0; j < binary.length; j++) {
            if (binary[j] == 1)
                sets[i].push(inputs[j]);
        }
    }
    sets.sort((a, b) => a.length - b.length);
    return sets;
}

function evaluateBranch(branch, values) {
    if (!Array.isArray(branch)) {
        if (branch == "TRUE") return true;
        if (branch == "FALSE") return false;
        if (!(branch in values))
            throw new Error(`Variable '${branch}' is undefined.`)
        return values[branch];
    }

    let opperrand = branch[0];
    if (opperrand == "NOT") {
        return !evaluateBranch(branch[1], values);
    }
    if (opperrand == "=") {
        values[branch[1]] = evaluateBranch(branch[2], values);
        return;
    }
    if (opperrand == ":") {
        values[branch[1]] = evaluateBranch(branch[2], values);
        return;
    }

    let arg1 = evaluateBranch(branch[1], values);
    let arg2 = evaluateBranch(branch[2], values);
    switch(opperrand) {
        case "NOR":
            return !(arg1 || arg2);
        case "OR":
            return arg1 || arg2;
        case "XNOR":
            return arg1 == arg2;
        case "XOR":
            return arg1 != arg2;
        case "NAND":
            return !(arg1 && arg2);
        case "AND":
            return arg1 && arg2;
        default:
            throw new Error(`Unknown opperrand '${opperrand}'`);
    }
}

function evaluate(parseTree, values, outputs) {
    for (let i = 0; i < parseTree.length; i++) {
        evaluateBranch(parseTree[i], values);
    }
    
    let results = [];
    for (let i = 0; i < outputs.length; i++) {
        results[i] = values[outputs[i]];
    }
    return results;
}

class XAND {
    #expression = "";

    #inputs = [];
    #outputs = [];

    #allGroups = [];
    #groups = [];
    #gates = [];

    constructor(expression) {
        this.#expression = expression;
    }

    generateAndGetCircuit() {
        const [tokens, variables] = getTokensAndVariables(this.#expression.replace(/\s+/g, ' ').trim());
        console.log("Tokens:", tokens);
        console.log("Vars:", variables);
        
        const [inputs, outputs] = classifyVariables(tokens, variables);
        [this.#inputs, this.#outputs] = [inputs, outputs];
        console.log("Inputs:", inputs);
        console.log("Outputs:", outputs);
        
        const linesOfTokens = getLinesOfTokensFromTokens(tokens);
        console.log("Lines of tokens:", linesOfTokens);

        const parseTree = growAParseTreeFromLinesOfTokens(linesOfTokens);
        console.log("Parse tree:", parseTree);

        this.#generateSets(inputs, parseTree, outputs);
        return this.#getCircuit();
    }

    #generateSets(inputs, parseTree, outputs) {
        this.#allGroups = getAllSets(inputs);

        let results = {};
        let finalGroups = {};
        let groupCount = [];
        this.#gates = {};
        for (let i = 0; i < this.#outputs.length; i++) {
            results[this.#outputs[i]] = [];
            finalGroups[i] = [];
            groupCount[i] = 0;
        }

        for (let i = 0; i < this.#allGroups.length; i++) {
            let values = {};
            for (let j = 0; j < this.#inputs.length; j++)
                values[this.#inputs[j]] = !this.#allGroups[i].includes(this.#inputs[j]);

            let result = evaluate(parseTree, values, outputs);

            for (let k = 0; k < this.#outputs.length; k++) {
                for (let j = 0; j < results[this.#outputs[k]].length; j++) {
                    if (this.#isSetInSet(this.#allGroups[i], this.#allGroups[j])) {
                        result[k] ^= results[this.#outputs[k]][j];
                    }
                }
                results[this.#outputs[k]].push(result[k]);

                if (this.#allGroups[i].length > 0 && result[k]) {
                    finalGroups[k].push(i);
                    groupCount[k]++;
                }
            }
        }

        for (let i = 0; i < this.#outputs.length; i++)
            this.#gates[i] = (results[this.#outputs[i]][0] ^ (groupCount[i]%2 == 1)) ? Block.XNOR : Block.XOR;

        this.#groups = finalGroups;
        console.log(this.#allGroups);
        console.log(this.#groups);
    }

    #isSetInSet(original, subset) {
        for (let i = 0; i < subset.length; i++) {
            if (!original.includes(subset[i]))
                return false;
        }
        return true;
    }

    #getCircuit() {
        let inputs = [];
        let circuit = new Circuit;
        let allGroups = this.#allGroups;
        let nodes = [];

        function getNodeIndexFromSet(inputSet) {
            let group = allGroups[inputSet];
            console.log(inputSet);
            if (group.length == 1)
                return group[0];

            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].set == inputSet)
                    return nodes[i].idx;
            }

            let node = circuit.placeBlock(Block.NODE, 1, 0, -nodes.length);
            nodes.push({set: inputSet, idx: node});
            for (let i = 0; i < group.length; i++) {
                circuit.connect(group[i], node);
            }
            return node;
        }

        for (let i = 0; i < this.#inputs.length; i++) {
            inputs.push(circuit.placeBlock(Block.TFF, 0, 0, -i));
            circuit.offsetCall(-this.#inputs[i].length, 0, -i);
                circuit.addCircuit(text(this.#inputs[i]));
            circuit.offsetReturn();
        }

        for (let i = 0; i < allGroups.length; i++)
            for (let j = 0; j < allGroups[i].length; j++) {
                allGroups[i][j] = inputs[this.#inputs.indexOf(allGroups[i][j])];
            }

        for (let i = 0; i < this.#outputs.length; i++) {
            let output = circuit.placeBlock(this.#gates[i], 2, 0, -i);
            circuit.offsetCall(3, 0, -i);
                circuit.addCircuit(text(this.#outputs[i]));
            circuit.offsetReturn();

            console.log(this.#outputs[i]);
            for (let j = 0; j < this.#groups[i].length; j++) {
                const inputSet = this.#groups[i][j];
                
                let node = getNodeIndexFromSet(inputSet);
                circuit.connect(node, output);
            }
        }

        circuit.offsetCall(0, 0, 2);
            circuit.addCircuit(text(this.#expression, false, 100));
        circuit.offsetReturn();

        return circuit;
    }
};