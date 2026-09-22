// Note: 1 tick is 0.05s (1/20s) by default.
// each block can have any amount of inputs and output

const Block = Object.freeze({
    NOR: 0,
    AND: 1,
    OR: 2,
    XOR: 3,

    // Creates a 1-tick pulse when clicked or touched by a player.
    BUTTON: 4,

    // Switches value when activated.
    TFF: 5,

    // Has a constant color. Lights up when at least one input is enabled.
    // Data: r (0-255), g (0 - 255), b (0 - 255),
    //       capacityOn (5 - 100), analog (0 / 1).
    LED: 6,

    // Plays a constant frequency when at least one input is enabled.
    // Data: frequency (0 - 16000),
    //       type (0: sine, 1: square, 2: triangle, 3: sawtooth, 4: meow, 5: snare).
    MUSIC: 7,

    // Enables when at least one input is enabled, or when it physically
    // touches another CONDUCTOR (not diagonally).
    CONDUCTOR: 8,

    // Used in buildings. Works as an OR gate.
    CUSTOM: 9,

    NAND: 10,
    XNOR: 11,

    // Each tick, randomly decides whether it's enabled. All inputs are ignored.
    // Data: probability (0 - 1).
    RANDOM: 12,

    // Works as an OR gate and displays a constant character.
    // Data: character (0 - 127).
    TEXT: 13,

    // Always disabled. has a constant color. When collision is 1 and at
    // least one input is enabled, the block has no collision (no visual indicator).
    // Data: r (0 - 255), g (0 - 255), b (0 - 255),
    //       material (1: plastic, 2: smoothPlastic, 3: foil, 4: neon,
    //                 5: forcefield, 6: glass, 7: grass, 8: wood, 9: slate,
    //                 10: sand, 11: pebble, 12: metal, 13: diamondPlate),
    //       collision (0 / 1).
    TILE: 14,

    // Behaves as an instant OR.
    NODE: 15,

    // Works as an OR gate. Output is delayed by a constant amount of ticks. 
    // Fully pipelined.
    // Data: delay (int 1 - 1000).
    DELAY: 16,

    // Works as an OR gate. Enables all antennas with the same channel when at least
    // one input is enabled. Local antennas interact only with player's antennas,
    // and global antennas interact with all global antennas.
    // Data: channel (int 0 - 65535),
    //      range (0: local, 1: global).
    ANTENNA: 17,

    // Enables when at least one input is enabled, or when it physically
    // touches another conductor (not diagonally). Unlike CONDUCTOR, CONDUCTOR2 enables
    // neighbouring CONDUCTOR2s instantly. CONDUCTORs and CONDUCTOR2s do not interact with
    // each other.
    CONDUCTOR2: 18,

    // Mixes colors of all inputs that are enabled LEDs. I don't know what the data does :(.
    // Data: additive (0 / 1).
    LEDMIXER: 19
});

function removeFloatingPointError(value) {
    if (Math.abs(value - Math.round(value)) < 0.001)
        return Math.round(value);
    return value;
}

function offsetVec3(vec3, offset) {
    return {x: vec3.x + offset.x, y: vec3.y + offset.y, z: vec3.z + offset.z};
}

function removeFloatingPointErrorVec3(vec3) {
    vec3.x = removeFloatingPointError(vec3.x);
    vec3.y = removeFloatingPointError(vec3.y);
    vec3.z = removeFloatingPointError(vec3.z);
    return vec3;
}

function zeroToEmptyString(value) {
    if (value == 0)
        return "";
    return value;
}

function zeroToEmptyStringVec3(vec3) {
    vec3.x = zeroToEmptyString(vec3.x);
    vec3.y = zeroToEmptyString(vec3.y);
    vec3.z = zeroToEmptyString(vec3.z);
    return vec3;
}


class Circuit {
    #blocks = [];
    #connections = [];

    #currentOffset = {x: 0, y: 0, z: 0};
    #offsetStack = [];

    placeBlock(type, x, y, z, data=[], id="", powered="") {
        if (powered != "")
            powered = "1";
        this.#blocks.push({
            type: type,
            powered: powered,
            position: this.#offsetBlockPositionAndReduceLength({x: x, y: y, z: z}),
            data: this.#reduceDataLength(type, data),
            id: id
        });
        return this.#blocks.length;
    }

    offsetCall(x, y, z) {
        this.#offsetStack.push({...this.#currentOffset});

        this.#currentOffset.x += x;
        this.#currentOffset.y += y;
        this.#currentOffset.z += z;
    }

    offsetReturn() {
        this.#currentOffset = this.#offsetStack.pop();
    }

    connect(start, end) {
        let startIdx = this.#findIndexOfBlock(start);
        let endIdx = this.#findIndexOfBlock(end);

        this.#connections.push({
            start: startIdx,
            end: endIdx
        });
    }

    getString() {
        let string = "";

        for (let i = 0; i < this.#blocks.length; i++) {
            let block = this.#blocks[i];
            string += `${block.type},${block.powered},${block.position.x},${block.position.y},${block.position.z},${block.data}`;

            if (i+1 < this.#blocks.length)
                string += ";";
        }

        string += "?";

        for (let i = 0; i < this.#connections.length; i++) {
            let connection = this.#connections[i];
            string += `${connection.start},${connection.end}`;

            if (i+1 < this.#connections.length)
                string += ";";
        }

        return string;
    }

    addCircuit(circuit) {
        const connectionIdxOffset = this.#blocks.length;

        const circuitBlocks = circuit.getBlocks();
        const circuitConnections = circuit.getConnections();

        for (let i = 0; i < circuitBlocks.length; i++) {
            let block = circuitBlocks[i];
            block.position = offsetVec3(block.position, this.#currentOffset);
            this.#blocks.push(block);
        }
        for (let i = 0; i < circuitConnections.length; i++) {
            this.#connections.push({start: circuitConnections[i].start + connectionIdxOffset, end: circuitConnections[i].end + connectionIdxOffset});
        }
    }

    getBlocks() {
        return this.#blocks;
    }

    getConnections() {
        return this.#connections;
    }

    #findIndexOfBlock(id) {
        if (id == "first")
            return 1;
        if (id == "last")
            return this.#blocks.length;
        if (Number.isInteger(id))
            return id;
        return this.#blocks.findIndex(block => block.id == id) + 1;
    }

    #offsetBlockPositionAndReduceLength(position) {
        let blockPosition = offsetVec3(position, this.#currentOffset);
        blockPosition = removeFloatingPointErrorVec3(blockPosition);
        blockPosition = zeroToEmptyStringVec3(blockPosition);
        return blockPosition;
    }

    #removeValuesFromDataIfDefaultAndJoin(data, defaultValues) {
        if (data.length > defaultValues.length) {
            data.length = defaultValues.length;
            console.warn("Too many data values given.");
        }

        let isLast = true;
        for (let i = data.length-1; i >= 0; i--) {
            if (data[i] == defaultValues[i]) {
                if (isLast)
                    data.pop();
                else
                    data[i] = "";
            } else
                isLast = false;
        }

        return data.join("+");
    }

    #reduceDataLength(type, data) {
        if (!Array.isArray(data))
            data = [data];
        switch(type) {
            case Block.TFF:
                return this.#removeValuesFromDataIfDefaultAndJoin(data, [0, 0]);
            case Block.LED:
                return this.#removeValuesFromDataIfDefaultAndJoin(data, [175, 175, 175, 100, 25, 0]);
            case Block.MUSIC:
                return this.#removeValuesFromDataIfDefaultAndJoin(data, [329.63, 0]);
            case Block.RANDOM:
                return this.#removeValuesFromDataIfDefaultAndJoin(data, [0.5]);
            case Block.TEXT:
                data[0] = this.#toAsciiCharCode(data[0]);
                return this.#removeValuesFromDataIfDefaultAndJoin(data, [65]);
            case Block.TILE:
                return this.#removeValuesFromDataIfDefaultAndJoin(data, [75, 75, 75, 1, 0]);
            case Block.DELAY:
                return this.#removeValuesFromDataIfDefaultAndJoin(data, [20]);
            case Block.ANTENNA:
                return this.#removeValuesFromDataIfDefaultAndJoin(data, [0, 0]);
            case Block.LEDMIXER:
                return this.#removeValuesFromDataIfDefaultAndJoin(data, [0]);
            default:
                return "";
        }
    }

    #toAsciiCharCode(char) {
        return char.replace(/ł/g, 'l').replace(/Ł/g, 'L').normalize('NFD').charCodeAt();
    }
};