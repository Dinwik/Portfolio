//ai used to generate these 2 tables

const alphanumericTable = { // from table 5
  '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
  'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15, 'G': 16, 'H': 17, 'I': 18, 
  'J': 19, 'K': 20, 'L': 21, 'M': 22, 'N': 23, 'O': 24, 'P': 25, 'Q': 26, 'R': 27, 
  'S': 28, 'T': 29, 'U': 30, 'V': 31, 'W': 32, 'X': 33, 'Y': 34, 'Z': 35,
  ' ': 36, '$': 37, '%': 38, '*': 39, '+': 40, '-': 41, '.': 42, '/': 43, ':': 44
};

const dataCapacity = { //from table 7
  '1-L-numeric': 41, '1-L-alphanumeric': 25, '1-L-byte': 17,
  '1-M-numeric': 34, '1-M-alphanumeric': 20, '1-M-byte': 14,
  '1-Q-numeric': 27, '1-Q-alphanumeric': 16, '1-Q-byte': 11,
  '1-H-numeric': 17, '1-H-alphanumeric': 10, '1-H-byte': 7,
  '2-L-numeric': 77, '2-L-alphanumeric': 47, '2-L-byte': 32,
  '2-M-numeric': 63, '2-M-alphanumeric': 38, '2-M-byte': 26,
  '2-Q-numeric': 48, '2-Q-alphanumeric': 29, '2-Q-byte': 20,
  '2-H-numeric': 34, '2-H-alphanumeric': 20, '2-H-byte': 14,
  '3-L-numeric': 127, '3-L-alphanumeric': 77, '3-L-byte': 53,
  '3-M-numeric': 101, '3-M-alphanumeric': 61, '3-M-byte': 42,
  '3-Q-numeric': 77, '3-Q-alphanumeric': 47, '3-Q-byte': 32,
  '3-H-numeric': 58, '3-H-alphanumeric': 35, '3-H-byte': 24,
  '4-L-numeric': 187, '4-L-alphanumeric': 114, '4-L-byte': 78,
  '4-M-numeric': 149, '4-M-alphanumeric': 90, '4-M-byte': 62,
  '4-Q-numeric': 111, '4-Q-alphanumeric': 67, '4-Q-byte': 46,
  '4-H-numeric': 82, '4-H-alphanumeric': 50, '4-H-byte': 34,
  '5-L-numeric': 255, '5-L-alphanumeric': 154, '5-L-byte': 106,
  '5-M-numeric': 202, '5-M-alphanumeric': 122, '5-M-byte': 84,
  '5-Q-numeric': 144, '5-Q-alphanumeric': 87, '5-Q-byte': 60,
  '5-H-numeric': 106, '5-H-alphanumeric': 64, '5-H-byte': 44,
  '6-L-numeric': 322, '6-L-alphanumeric': 195, '6-L-byte': 134,
  '6-M-numeric': 255, '6-M-alphanumeric': 154, '6-M-byte': 106,
  '6-Q-numeric': 178, '6-Q-alphanumeric': 108, '6-Q-byte': 74,
  '6-H-numeric': 139, '6-H-alphanumeric': 84, '6-H-byte': 58,
  '7-L-numeric': 370, '7-L-alphanumeric': 224, '7-L-byte': 154,
  '7-M-numeric': 293, '7-M-alphanumeric': 178, '7-M-byte': 122,
  '7-Q-numeric': 207, '7-Q-alphanumeric': 125, '7-Q-byte': 86,
  '7-H-numeric': 154, '7-H-alphanumeric': 93, '7-H-byte': 64,
  '8-L-numeric': 461, '8-L-alphanumeric': 279, '8-L-byte': 192,
  '8-M-numeric': 365, '8-M-alphanumeric': 221, '8-M-byte': 152,
  '8-Q-numeric': 259, '8-Q-alphanumeric': 157, '8-Q-byte': 108,
  '8-H-numeric': 202, '8-H-alphanumeric': 122, '8-H-byte': 84,
  '9-L-numeric': 552, '9-L-alphanumeric': 335, '9-L-byte': 230,
  '9-M-numeric': 432, '9-M-alphanumeric': 262, '9-M-byte': 180,
  '9-Q-numeric': 312, '9-Q-alphanumeric': 189, '9-Q-byte': 130,
  '9-H-numeric': 235, '9-H-alphanumeric': 143, '9-H-byte': 98,
  '10-L-numeric': 652, '10-L-alphanumeric': 395, '10-L-byte': 271,
  '10-M-numeric': 513, '10-M-alphanumeric': 311, '10-M-byte': 213,
  '10-Q-numeric': 364, '10-Q-alphanumeric': 221, '10-Q-byte': 151,
  '10-H-numeric': 288, '10-H-alphanumeric': 174, '10-H-byte': 119,
  '11-L-numeric': 772, '11-L-alphanumeric': 468, '11-L-byte': 321,
  '11-M-numeric': 604, '11-M-alphanumeric': 366, '11-M-byte': 251,
  '11-Q-numeric': 427, '11-Q-alphanumeric': 259, '11-Q-byte': 177,
  '11-H-numeric': 331, '11-H-alphanumeric': 200, '11-H-byte': 137,
  '12-L-numeric': 883, '12-L-alphanumeric': 535, '12-L-byte': 367,
  '12-M-numeric': 691, '12-M-alphanumeric': 419, '12-M-byte': 287,
  '12-Q-numeric': 489, '12-Q-alphanumeric': 296, '12-Q-byte': 203,
  '12-H-numeric': 374, '12-H-alphanumeric': 227, '12-H-byte': 155,
  '13-L-numeric': 1022, '13-L-alphanumeric': 619, '13-L-byte': 425,
  '13-M-numeric': 796, '13-M-alphanumeric': 483, '13-M-byte': 331,
  '13-Q-numeric': 580, '13-Q-alphanumeric': 352, '13-Q-byte': 241,
  '13-H-numeric': 427, '13-H-alphanumeric': 259, '13-H-byte': 177,
  '14-L-numeric': 1101, '14-L-alphanumeric': 667, '14-L-byte': 458,
  '14-M-numeric': 871, '14-M-alphanumeric': 528, '14-M-byte': 362,
  '14-Q-numeric': 621, '14-Q-alphanumeric': 376, '14-Q-byte': 258,
  '14-H-numeric': 468, '14-H-alphanumeric': 283, '14-H-byte': 194,
  '15-L-numeric': 1250, '15-L-alphanumeric': 758, '15-L-byte': 520,
  '15-M-numeric': 991, '15-M-alphanumeric': 600, '15-M-byte': 412,
  '15-Q-numeric': 703, '15-Q-alphanumeric': 426, '15-Q-byte': 292,
  '15-H-numeric': 530, '15-H-alphanumeric': 321, '15-H-byte': 220,
  '16-L-numeric': 1408, '16-L-alphanumeric': 854, '16-L-byte': 586,
  '16-M-numeric': 1082, '16-M-alphanumeric': 656, '16-M-byte': 450,
  '16-Q-numeric': 775, '16-Q-alphanumeric': 470, '16-Q-byte': 322,
  '16-H-numeric': 602, '16-H-alphanumeric': 365, '16-H-byte': 250,
  '17-L-numeric': 1548, '17-L-alphanumeric': 938, '17-L-byte': 644,
  '17-M-numeric': 1212, '17-M-alphanumeric': 734, '17-M-byte': 504,
  '17-Q-numeric': 876, '17-Q-alphanumeric': 531, '17-Q-byte': 364,
  '17-H-numeric': 641, '17-H-alphanumeric': 388, '17-H-byte': 266,
  '18-L-numeric': 1725, '18-L-alphanumeric': 1046, '18-L-byte': 718,
  '18-M-numeric': 1346, '18-M-alphanumeric': 816, '18-M-byte': 560,
  '18-Q-numeric': 948, '18-Q-alphanumeric': 574, '18-Q-byte': 394,
  '18-H-numeric': 700, '18-H-alphanumeric': 424, '18-H-byte': 291,
  '19-L-numeric': 1903, '19-L-alphanumeric': 1153, '19-L-byte': 792,
  '19-M-numeric': 1500, '19-M-alphanumeric': 909, '19-M-byte': 624,
  '19-Q-numeric': 1063, '19-Q-alphanumeric': 644, '19-Q-byte': 442,
  '19-H-numeric': 784, '19-H-alphanumeric': 475, '19-H-byte': 326,
  '20-L-numeric': 2061, '20-L-alphanumeric': 1249, '20-L-byte': 858,
  '20-M-numeric': 1600, '20-M-alphanumeric': 970, '20-M-byte': 666,
  '20-Q-numeric': 1159, '20-Q-alphanumeric': 702, '20-Q-byte': 482,
  '20-H-numeric': 847, '20-H-alphanumeric': 513, '20-H-byte': 352,
  '21-L-numeric': 2232, '21-L-alphanumeric': 1353, '21-L-byte': 929,
  '21-M-numeric': 1746, '21-M-alphanumeric': 1058, '21-M-byte': 726,
  '21-Q-numeric': 1224, '21-Q-alphanumeric': 742, '21-Q-byte': 509,
  '21-H-numeric': 921, '21-H-alphanumeric': 558, '21-H-byte': 383,
  '22-L-numeric': 2409, '22-L-alphanumeric': 1460, '22-L-byte': 1003,
  '22-M-numeric': 1867, '22-M-alphanumeric': 1132, '22-M-byte': 777,
  '22-Q-numeric': 1358, '22-Q-alphanumeric': 823, '22-Q-byte': 565,
  '22-H-numeric': 991, '22-H-alphanumeric': 600, '22-H-byte': 412,
  '23-L-numeric': 2620, '23-L-alphanumeric': 1588, '23-L-byte': 1091,
  '23-M-numeric': 2028, '23-M-alphanumeric': 1229, '23-M-byte': 844,
  '23-Q-numeric': 1468, '23-Q-alphanumeric': 890, '23-Q-byte': 611,
  '23-H-numeric': 1082, '23-H-alphanumeric': 656, '23-H-byte': 450,
  '24-L-numeric': 2812, '24-L-alphanumeric': 1704, '24-L-byte': 1171,
  '24-M-numeric': 2161, '24-M-alphanumeric': 1310, '24-M-byte': 899,
  '24-Q-numeric': 1588, '24-Q-alphanumeric': 963, '24-Q-byte': 661,
  '24-H-numeric': 1171, '24-H-alphanumeric': 710, '24-H-byte': 488,
  '25-L-numeric': 3057, '25-L-alphanumeric': 1853, '25-L-byte': 1273,
  '25-M-numeric': 2361, '25-M-alphanumeric': 1431, '25-M-byte': 982,
  '25-Q-numeric': 1718, '25-Q-alphanumeric': 1041, '25-Q-byte': 715,
  '25-H-numeric': 1273, '25-H-alphanumeric': 771, '25-H-byte': 530,
  '26-L-numeric': 3283, '26-L-alphanumeric': 1990, '26-L-byte': 1367,
  '26-M-numeric': 2524, '26-M-alphanumeric': 1530, '26-M-byte': 1050,
  '26-Q-numeric': 1851, '26-Q-alphanumeric': 1122, '26-Q-byte': 771,
  '26-H-numeric': 1370, '26-H-alphanumeric': 830, '26-H-byte': 570,
  '27-L-numeric': 3517, '27-L-alphanumeric': 2132, '27-L-byte': 1465,
  '27-M-numeric': 2725, '27-M-alphanumeric': 1652, '27-M-byte': 1134,
  '27-Q-numeric': 2003, '27-Q-alphanumeric': 1214, '27-Q-byte': 834,
  '27-H-numeric': 1465, '27-H-alphanumeric': 888, '27-H-byte': 610,
  '28-L-numeric': 3669, '28-L-alphanumeric': 2223, '28-L-byte': 1528,
  '28-M-numeric': 2821, '28-M-alphanumeric': 1710, '28-M-byte': 1174,
  '28-Q-numeric': 2042, '28-Q-alphanumeric': 1237, '28-Q-byte': 850,
  '28-H-numeric': 1502, '28-H-alphanumeric': 910, '28-H-byte': 625,
  '29-L-numeric': 3909, '29-L-alphanumeric': 2369, '29-L-byte': 1628,
  '29-M-numeric': 3008, '29-M-alphanumeric': 1823, '29-M-byte': 1252,
  '29-Q-numeric': 2181, '29-Q-alphanumeric': 1322, '29-Q-byte': 908,
  '29-H-numeric': 1598, '29-H-alphanumeric': 968, '29-H-byte': 665,
  '30-L-numeric': 4158, '30-L-alphanumeric': 2520, '30-L-byte': 1732,
  '30-M-numeric': 3197, '30-M-alphanumeric': 1937, '30-M-byte': 1330,
  '30-Q-numeric': 2315, '30-Q-alphanumeric': 1403, '30-Q-byte': 964,
  '30-H-numeric': 1696, '30-H-alphanumeric': 1028, '30-H-byte': 706,
  '31-L-numeric': 4417, '31-L-alphanumeric': 2677, '31-L-byte': 1840,
  '31-M-numeric': 3391, '31-M-alphanumeric': 2055, '31-M-byte': 1412,
  '31-Q-numeric': 2459, '31-Q-alphanumeric': 1490, '31-Q-byte': 1024,
  '31-H-numeric': 1811, '31-H-alphanumeric': 1098, '31-H-byte': 754,
  '32-L-numeric': 4686, '32-L-alphanumeric': 2840, '32-L-byte': 1952,
  '32-M-numeric': 3590, '32-M-alphanumeric': 2176, '32-M-byte': 1494,
  '32-Q-numeric': 2603, '32-Q-alphanumeric': 1577, '32-Q-byte': 1084,
  '32-H-numeric': 1911, '32-H-alphanumeric': 1158, '32-H-byte': 796,
  '33-L-numeric': 4965, '33-L-alphanumeric': 3009, '33-L-byte': 2068,
  '33-M-numeric': 3791, '33-M-alphanumeric': 2297, '33-M-byte': 1578,
  '33-Q-numeric': 2755, '33-Q-alphanumeric': 1670, '33-Q-byte': 1148,
  '33-H-numeric': 2026, '33-H-alphanumeric': 1228, '33-H-byte': 844,
  '34-L-numeric': 5253, '34-L-alphanumeric': 3183, '34-L-byte': 2188,
  '34-M-numeric': 4011, '34-M-alphanumeric': 2431, '34-M-byte': 1670,
  '34-Q-numeric': 2909, '34-Q-alphanumeric': 1763, '34-Q-byte': 1212,
  '34-H-numeric': 2134, '34-H-alphanumeric': 1293, '34-H-byte': 888,
  '35-L-numeric': 5529, '35-L-alphanumeric': 3351, '35-L-byte': 2303,
  '35-M-numeric': 4233, '35-M-alphanumeric': 2565, '35-M-byte': 1763,
  '35-Q-numeric': 3069, '35-Q-alphanumeric': 1860, '35-Q-byte': 1278,
  '35-H-numeric': 2261, '35-H-alphanumeric': 1370, '35-H-byte': 941,
  '36-L-numeric': 5836, '36-L-alphanumeric': 3537, '36-L-byte': 2431,
  '36-M-numeric': 4459, '36-M-alphanumeric': 2702, '36-M-byte': 1857,
  '36-Q-numeric': 3241, '36-Q-alphanumeric': 1964, '36-Q-byte': 1350,
  '36-H-numeric': 2383, '36-H-alphanumeric': 1444, '36-H-byte': 992,
  '37-L-numeric': 6153, '37-L-alphanumeric': 3729, '37-L-byte': 2563,
  '37-M-numeric': 4693, '37-M-alphanumeric': 2844, '37-M-byte': 1955,
  '37-Q-numeric': 3417, '37-Q-alphanumeric': 2071, '37-Q-byte': 1423,
  '37-H-numeric': 2514, '37-H-alphanumeric': 1524, '37-H-byte': 1047,
  '38-L-numeric': 6479, '38-L-alphanumeric': 3927, '38-L-byte': 2699,
  '38-M-numeric': 4931, '38-M-alphanumeric': 2988, '38-M-byte': 2054,
  '38-Q-numeric': 3599, '38-Q-alphanumeric': 2181, '38-Q-byte': 1499,
  '38-H-numeric': 2657, '38-H-alphanumeric': 1610, '38-H-byte': 1107,
  '39-L-numeric': 6743, '39-L-alphanumeric': 4087, '39-L-byte': 2809,
  '39-M-numeric': 5119, '39-M-alphanumeric': 3102, '39-M-byte': 2132,
  '39-Q-numeric': 3791, '39-Q-alphanumeric': 2297, '39-Q-byte': 1579,
  '39-H-numeric': 2788, '39-H-alphanumeric': 1690, '39-H-byte': 1161,
  '40-L-numeric': 7089, '40-L-alphanumeric': 4296, '40-L-byte': 2953,
  '40-M-numeric': 5383, '40-M-alphanumeric': 3262, '40-M-byte': 2242,
  '40-Q-numeric': 3993, '40-Q-alphanumeric': 2420, '40-Q-byte': 1663,
  '40-H-numeric': 2953, '40-H-alphanumeric': 1790, '40-H-byte': 1232
};


const codewordsCount = { //from table 7
  '1-L': 19, '1-M': 16, '1-Q': 13, '1-H': 9,
  '2-L': 34, '2-M': 28, '2-Q': 22, '2-H': 16,
  '3-L': 55, '3-M': 44, '3-Q': 34, '3-H': 26,
  '4-L': 80, '4-M': 64, '4-Q': 48, '4-H': 36,
  '5-L': 108, '5-M': 86, '5-Q': 62, '5-H': 46,
  '6-L': 136, '6-M': 108, '6-Q': 76, '6-H': 60,
  '7-L': 156, '7-M': 124, '7-Q': 88, '7-H': 66,
  '8-L': 194, '8-M': 154, '8-Q': 110, '8-H': 86,
  '9-L': 232, '9-M': 182, '9-Q': 132, '9-H': 100,
  '10-L': 274, '10-M': 216, '10-Q': 154, '10-H': 122,
  '11-L': 324, '11-M': 254, '11-Q': 180, '11-H': 140,
  '12-L': 370, '12-M': 290, '12-Q': 206, '12-H': 158,
  '13-L': 428, '13-M': 334, '13-Q': 244, '13-H': 180,
  '14-L': 461, '14-M': 365, '14-Q': 261, '14-H': 197,
  '15-L': 523, '15-M': 415, '15-Q': 295, '15-H': 223,
  '16-L': 589, '16-M': 453, '16-Q': 325, '16-H': 253,
  '17-L': 647, '17-M': 507, '17-Q': 367, '17-H': 283,
  '18-L': 721, '18-M': 563, '18-Q': 397, '18-H': 313,
  '19-L': 795, '19-M': 627, '19-Q': 445, '19-H': 341,
  '20-L': 861, '20-M': 669, '20-Q': 485, '20-H': 385,
  '21-L': 932, '21-M': 714, '21-Q': 512, '21-H': 406,
  '22-L': 1006, '22-M': 782, '22-Q': 568, '22-H': 442,
  '23-L': 1094, '23-M': 860, '23-Q': 614, '23-H': 464,
  '24-L': 1174, '24-M': 914, '24-Q': 664, '24-H': 514,
  '25-L': 1276, '25-M': 1000, '25-Q': 718, '25-H': 538,
  '26-L': 1370, '26-M': 1062, '26-Q': 754, '26-H': 596,
  '27-L': 1468, '27-M': 1128, '27-Q': 808, '27-H': 628,
  '28-L': 1531, '28-M': 1193, '28-Q': 871, '28-H': 661,
  '29-L': 1631, '29-M': 1267, '29-Q': 911, '29-H': 701,
  '30-L': 1735, '30-M': 1373, '30-Q': 985, '30-H': 745,
  '31-L': 1843, '31-M': 1455, '31-Q': 1033, '31-H': 793,
  '32-L': 1955, '32-M': 1541, '32-Q': 1115, '32-H': 845,
  '33-L': 2071, '33-M': 1631, '33-Q': 1171, '33-H': 901,
  '34-L': 2191, '34-M': 1725, '34-Q': 1231, '34-H': 961,
  '35-L': 2306, '35-M': 1812, '35-Q': 1286, '35-H': 986,
  '36-L': 2434, '36-M': 1914, '36-Q': 1354, '36-H': 1054,
  '37-L': 2566, '37-M': 1992, '37-Q': 1426, '37-H': 1096,
  '38-L': 2702, '38-M': 2102, '38-Q': 1502, '38-H': 1142,
  '39-L': 2812, '39-M': 2216, '39-Q': 1582, '39-H': 1222,
  '40-L': 2956, '40-M': 2334, '40-Q': 1666, '40-H': 1276 
};

function getCountIndicatorLength(mode, version) {
    switch (mode) {
            case 'numeric':
                if (version < 10)
                    return 10;
                else if (version < 27)
                    return 12;
                else
                    return 14;

            case 'alphanumeric':
                if (version < 10)
                    return 9;
                else if (version < 27)
                    return 11;
                else
                    return 13;

            case 'byte':
                if (version < 10)
                    return 8;
                else
                    return 16;
        }
}


function getEncodingMode(msg) {

    let mode = 'numeric';

    for (let i = 0; i < msg.length; i++) {

        let char = msg[i];

        if (!isFinite(char) || char == ' ')
            if (alphanumericTable[char] == undefined)
                return 'byte';
            else
                mode = 'alphanumeric';
    }

    return mode;
}


function getCodeVersion(version, mode, length, ecl) {
    
    for (let i = 1; i <= 40; i++) {
        if (dataCapacity[`${i}-${ecl}-${mode}`] >= length)
            return Math.max(version, i);
    }

   alert('Message is too long for QR code. Try lowering error correction level or shortening the message.');
   throw('Message is too long for QR code.');
}


function encodeNumeric(msg, version) {

    let string = '0001';

    let countIndicatorLength = getCountIndicatorLength('numeric', version);
    string += ' '+ msg.length.toString(2).padStart(countIndicatorLength, '0');


    for (let i = 0; i+2 < msg.length; i += 3)
        string += ' '+ Number(msg.substring(i, i+3)).toString(2).padStart(10, '0');

    if (msg.length % 3 == 2)
        string += ' '+ Number(msg.slice(-2)).toString(2).padStart(7, '0');
    else if (msg.length % 3 == 1)
        string += ' '+ Number(msg.slice(-1)).toString(2).padStart(4, '0');

    string += ' 0000';

    return string;
}

function encodeAlphanumeric(msg, version) {

    let string = '0010';

    let countIndicatorLength = getCountIndicatorLength('alphanumeric', version);
    string += ' '+ msg.length.toString(2).padStart(countIndicatorLength, '0');


    for (let i = 0; i+1 < msg.length; i += 2)
        string += ' '+ Number(alphanumericTable[msg[i]]*45 + alphanumericTable[msg[i+1]]).toString(2).padStart(11, '0');

    if (msg.length % 2 == 1)
        string += ' '+ Number(alphanumericTable[msg.slice(-1)]).toString(2).padStart(6, '0');

    string += ' 0000';

    return string;
}

function encodeByte(msg, version) {
    let string = '0100';

    let countIndicatorLength = getCountIndicatorLength('byte', version);
    string += ' '+ msg.length.toString(2).padStart(countIndicatorLength, '0');

    for (let i = 0; i < msg.length; i++)
        try {
            string += ' '+ msg.charCodeAt(i).toString(2).padStart(8, '0');
        } catch {
            alert(`The character '${msg[i]}' is not supported in byte mode.`);
            throw('Invalid character');
        }
    
    string += ' 0000';

    return string;
}

function getPadding(string, version, ecl) {

    let padding = '';

    let length = 0;
    for (let i = 0; i < string.length; i++)
        if (string[i] != ' ')
            length++;

    string += ' ';

    while (length % 8 != 0) {
        padding += '0';
        length++;
    }

    let desiredLength = 8*codewordsCount[`${version}-${ecl}`];

    let chose = true;
    while (length < desiredLength) {
        if (chose)
            padding += ' 11101100';
        else
            padding += ' 00010001';

        length += 8;
        chose = !chose;
    }
    
    return padding;
}