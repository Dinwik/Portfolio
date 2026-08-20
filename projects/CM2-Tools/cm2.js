let blocks_ = [];
let connections_ = [];

let offset = {x: 0, y: 0, z: 0};
let offsetStack = [];

function clear() {
    blocks_ = [];
    connections_ = [];

    offsetStack = [];
    offset = {x: 0, y: 0, z: 0};
}

function offsetCall(x, y, z) {
    offsetStack.push({...offset});

    offset.x += x;
    offset.y += y;
    offset.z += z;
}

function offsetReturn() {
    offset = offsetStack.pop();
}

function round(num) {
    return Math.round((num + Number.EPSILON) * 1e12) / 1e12;
}

function format(template, input=[]) {

    if (!Array.isArray(input))
        input = [input];

    while (input.length > template.length)
        input.pop();

    for (let i = 0; i < input.length; i++) {
        if (input[i] == template[i] || isNaN(input[i]))
            input[i] = "";
    }

    let i = input.length - 1;

    while (i >= 0 && (input[i] === template[i] || input[i] === "")) {
        input.pop();        
        i--;
    }

    input = input.join("+");

    return input
}

function add(type, state, x, y, z, data, id) {

    if (!Array.isArray(data))
        data = [data];
    
    if (typeof type === "string")
        type = type.toLowerCase();

    switch(type) {
        case 0: case "nor": case "not": type = 0; data = ""; break;
        case 1: case "and": type = 1; data = ""; break;
        case 2: case "or": type = 2; data = ""; break;
        case 3: case "xor": type = 3; data = ""; break;
        case 4: case "button": type = 4; data = ""; break;
        case 5: case "tff": type = 5;

            data = data.map(Math.floor);
            
            data[0] = data[0]%2;
            data[1] = data[1]%2;

            data = format([0, 0], data);

            break;

        case 6: case "led": type = 6; //data = [r, g, b, opacityOn, opacityOff, analog]. opacityOn, opacityOff are int 5-100, analog is 0/1. idk what it does

            data = data.map(Math.floor);

            data[0] = Math.max(Math.min(data[0], 255), 0);
            data[1] = Math.max(Math.min(data[1], 255), 0);
            data[2] = Math.max(Math.min(data[2], 255), 0);
            data[3] = Math.max(Math.min(data[3], 100), 5);
            data[4] = Math.max(Math.min(data[4], 100), 5);
            data[5] = Math.max(Math.min(data[5], 1), 0);

            data = format([175, 175, 175, 100, 25, 0], data);

            break;

        case 7: case "note": type = 7; //data = [frequency, type]. frequency is float, type 0: sine, 1: square, 2: triangle, 3: sawtooth, 4: meow, 5: snare

            data[1] = Math.floor(data[1]);

            data[0] = Math.max(Math.min(data[0], 16000), 0);
            data[1] = Math.max(Math.min(data[1], 5), 0);

            data = format([329.63, 0], data);
            
            break;

        case 8: case "conductor": type = 8; data = []; break;
        case 9: case "custom": type = 9; data = []; break;
        case 10: case "nand": type = 10; data = []; break;
        case 11: case "xnor": type = 11; data = []; break;
        case 12: case "random": type = 12; //data = [chance]. chance is float

            data[0] = Math.max(Math.min(data[0], 1), 0);

            data = format([0.5], data);
        
            break;

        case 13: case "text": type = 13; //data = [charcode].

            if (typeof data[0] === "string") {
                data[0] = data[0].normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ł/g, "l").replace(/Ł/g, "L").charCodeAt();
            }

            data = data.map(Math.floor);

            data[0] = Math.max(Math.min(data[0], 126), 32);

            data = format([65], data);


            break;
        
        case 14: case "tile": type = 14;    //data = [r, g, b, material, collision]. material 1: plastic, 2: smoothPlastic, 3: foil, 4: neon, 5: forcefield,
                                            //6: glass, 7: grass, 8: wood, 9: slate, 10: sand, 11: pebble, 12: metal, 13: diamondPlate.
                                            //collision 0: normal, 1: no collision when powered.
                                        

            data = data.map(Math.floor);

            data[0] = Math.max(Math.min(data[0], 255), 0);
            data[1] = Math.max(Math.min(data[1], 255), 0);
            data[2] = Math.max(Math.min(data[2], 255), 0);

            data[3] = Math.max(Math.min(data[3], 13), 1);
            data[4] = Math.max(Math.min(data[4], 1), 0);

            data = format([75, 75, 75, 1, 0], data);

            break;

        case 15: case "node": type = 15; break;
        case 16: case "delay": type = 16;   //data = [delay]. delay = int 1-1000. unit = 1/20s by default.

            if (data == 0) {
                type = 15;
                data = "";
                break;
            }

            data = data.map(Math.floor);

            data[0] = Math.max(Math.min(data[0], 1000), 1);

            data = format([20], data);

            break;

        case 17: case "antenna": type = 17; //data = [channel, global]. channel = int 0-65535. 
                                            //global 0: interacts only with player's antennas, 1: interacts with all global antennas.

            switch(data[1]) {
                case "local": data[1] = 0; break;
                case "global": data[1] = 1; break;
            }

            data = data.map(Math.floor);

            data[0] = Math.max(Math.min(data[0], 65535), 0);
            data[1] = Math.max(Math.min(data[1], 1), 0);

            data = format([0, 0], data);

            break;

        case 18: case "conductor2": type = 18; break;
        case 19: case "ledmixer": type = 19;    //idfk what it does

            data = data.map(Math.floor);

            data[0] = Math.max(Math.min(data[0], 1), 0);

            data = format([0], data);

            break;
    }

    x += offset.x;
    y += offset.y;
    z += offset.z;

    x = round(x);
    y = round(y);
    z = round(z);

    if (state == 0)
        state = "";
    if (x == 0)
        x = "";
    if (y == 0)
        y = "";
    if (z == 0)
        z = "";

    blocks_.push({
        type,
        state,
        x, y, z,
        data,
        id
    });

    if (blocks_.length >= 150000) {
        alert("Cannot place more than 150k blocks!");
        throw new Error("Cannot place more than 150k blocks!");
    }

    return blocks_.length;
}

function connect(start, end) {

    if (start == "first")
        start = 1;
    if (end == "first")
        end = 1;
    if (start == "last")
        start = blocks_.length;
    if (end == "last")
        end = blocks_.length;

    if (!Number.isInteger(start))
        start = 1 + blocks_.findIndex(block => block.id === start);
    if (!Number.isInteger(end))
        end = 1 + blocks_.findIndex(block => block.id === end);

    if (start <= 0)
        throw new Error(`${start} is not a valid connection index`);
    if (end <= 0)
        throw new Error(`${end} is not a valid connection index`);

    connections_.push({
        start, end
    });

    if (connections_.length >= 75000) {
        alert("Cannot place more than 75k connections!");
        throw new Error("Cannot place more than 75k connections!");
    }
}

async function getString() {

    const copyfail = document.getElementById("copyfail");
    copyfail.innerHTML = "";

    let string = "";

    for (let i = 0; i < blocks_.length; i++) {
        let block = blocks_[i];
        string += `${block.type},${block.state},${block.x},${block.y},${block.z},${block.data}`;

        if (i + 1 < blocks_.length)
            string += ";";
    }

    string += "?";

    for (let i = 0; i < connections_.length; i++) {
        let connection = connections_[i];
        string += `${connection.start},${connection.end}`;

        if (i + 1 < connections_.length)
            string += ";";
    }

    try {
        await navigator.clipboard.writeText(string);
    } catch {

        const p = document.createElement("p");
        p.textContent = "Couldn't automatically copy to clipboard. Instead, copy it manually from here:";

        const text = document.createElement("textarea");
        text.value = string;
        text.readOnly = true;

        copyfail.appendChild(p);
        copyfail.appendChild(text);
    }
}