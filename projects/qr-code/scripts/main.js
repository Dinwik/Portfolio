function thread() {

    let string = "";
    let msg = message.value;
    let minVer = minVersion.value;
    let mask = maskPattern.value;
    if (!forceMaskPattern.checked) {
        mask = -1;
    }
    let ecl = errorCorrectionLevel.value;
    switch (ecl) {
        case '1': ecl = 'L'; break;
        case '2': ecl = 'M'; break;
        case '3': ecl = 'Q'; break;
        case '4': ecl = 'H'; break;
    }

    //data encoding mode
    let mode = getEncodingMode(msg);

    //choosing version (size) of qr code
    let version = getCodeVersion(minVer, mode, msg.length, ecl);

    switch(mode) {
        case 'numeric':
            string += encodeNumeric(msg, version);
            break;
        case 'alphanumeric':
            string += encodeAlphanumeric(msg, version);
            break;
        case 'byte':
            string += encodeByte(msg, version);
    }

    string += getPadding(string, version, ecl);

    infoOutput.textContent = `Encoding mode chosen: ${mode}\nVersion chosen: ${version}\n\nBit string:\n${string}`;
}