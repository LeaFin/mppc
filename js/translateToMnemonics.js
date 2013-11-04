var transNemonics = new Array();
transNemonics["000000101"] = "CLR 0";
transNemonics["000001101"] = "CLR 1";
transNemonics["000010101"] = "CLR 2";
transNemonics["000011101"] = "CLR 3";

transNemonics["000000111"] = "ADD 0";
transNemonics["000001111"] = "ADD 1";
transNemonics["000010111"] = "ADD 2";
transNemonics["000011111"] = "ADD 3";

transNemonics["00000001"] = "INC";
transNemonics["00000100"] = "DEC";

transNemonics["010000"] = "LWDD 0";
transNemonics["010001"] = "LWDD 1";
transNemonics["010010"] = "LWDD 2";
transNemonics["010011"] = "LWDD 3";

transNemonics["011000"] = "SWDD 0";
transNemonics["011001"] = "SWDD 1";
transNemonics["011010"] = "SWDD 2";
transNemonics["011011"] = "SWDD 3";

transNemonics["00000101"] = "SRA";
transNemonics["00001100"] = "SLL";

transNemonics["000000001"] = "NOT";

transNemonics["00110"] = "BZD";
transNemonics["00111"] = "BCD";
transNemonics["00100"] = "BD";

transNemonics["0000000000000000"] = "END";

function getMnemonics(binary) {
    for (var i = 1; i <= 16; i++) {
        var code = binary.substr(0, i);
        if (transNemonics[code] !== undefined) {
            if (transNemonics[code].match(/LWDD.*/) || transNemonics[code].match(/SWDD.*/) || transNemonics[code] === "BZD" || transNemonics[code] === "BCD" || transNemonics[code] === "BD") {
                return transNemonics[code] + ", #" + parseInt(binary.substring(6, 16), 2);
            } else {
                return transNemonics[code];
            }
        }
    }
}