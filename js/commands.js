function CLR(index) {
    register[index] = "0000000000000000";
    carryBit = 0;
    commandCounter = commandCounter + 2;
}

function INC() {
    var akku = register[0];
    var last = akku.lastIndexOf("0");
    if (last === -1) {
        carryBit = 1;
        register[0] = "0000000000000000";
    } else {
        akku = akku.replaceAt(last, "1");
        var replaceString = "0000000000000000".substr(0, 15 - last);
        akku = akku.substr(0, last + 1) + replaceString;
        carryBit = 0;
        register[0] = akku;
    }
    commandCounter = commandCounter + 2;
}

function LWDD(index) {
    var befehl = memory[commandCounter];
    register[index] = memory[parseInt(befehl.substring(6, 16), 2)];
    commandCounter = commandCounter + 2;
}

function SWDD(index) {
    var befehl = memory[commandCounter];
    memory[parseInt(befehl.substring(6, 16), 2)] = register[index];
    commandCounter = commandCounter + 2;
}

function DEC() {
    var akku = register[0];
    var dec = "1111111111111111";
    if (akku === "0000000000000000") {
        carryBit = 1;
        register[0] = "1111111111111111";
    } else {
        var overflow = 0;
        var result = new Array();
        for (var i = 15; i >= 0; i--) {
            switch (parseInt(akku[i]) + parseInt(dec[i]) + overflow) {
                case 0:
                    result[i] = "0";
                    overflow = 0;
                    break;
                case 1:
                    result[i] = "1";
                    overflow = 0;
                    break;
                case 2:
                    result[i] = "0";
                    overflow = 1;
                    break;
                case 3:
                    result[i] = "1";
                    overflow = 1;
                    break;
            }
        }
        register[0] = result.join("");
    }
    commandCounter = commandCounter + 2;
}

function ADD(index) {
    var akku = register[0];
    var reg = register[index];
    var overflow = 0;
    var result = new Array();
    for (var i = 15; i >= 0; i--) {
        switch (parseInt(akku[i]) + parseInt(reg[i]) + overflow) {
            case 0:
                result[i] = "0";
                overflow = 0;
                break;
            case 1:
                result[i] = "1";
                overflow = 0;
                break;
            case 2:
                result[i] = "0";
                overflow = 1;
                break;
            case 3:
                result[i] = "1";
                overflow = 1;
                break;
        }
    }
    register[0] = result.join("");
    carryBit = overflow;
    commandCounter = commandCounter + 2;
}

function BZD() {
    var befehl = memory[commandCounter];
    if (register[0] === "0000000000000000") {
        commandCounter = parseInt(befehl.substring(6, 16), 2);
    } else {
        commandCounter = commandCounter + 2;
    }
}

function BCD() {
    var befehl = memory[commandCounter];
    if (carryBit === 1) {
        commandCounter = parseInt(befehl.substring(6, 16), 2);
    } else {
        commandCounter = commandCounter + 2;
    }
}

function BD() {
    var befehl = memory[commandCounter];
    commandCounter = parseInt(befehl.substring(6, 16), 2);
}

function SLL() {
    var akku = register[0];
    carryBit = parseInt(akku[0]);
    akku = akku.substr(1, 15) + "0";
    register[0] = akku;
    commandCounter = commandCounter + 2;
}

function SRA() {
    var akku = register[0];
    var msb = akku[0];
    carryBit = parseInt(akku[15]);
    akku = msb + akku.substr(0, 15);
    register[0] = akku;
    commandCounter = commandCounter + 2;
}

function NOT() {
    var akku = register[0];
    for (var i = 0; i < 16; i++) {
        if (akku[i] === "0") {
            akku = akku.replaceAt(i, "1");
        } else {
            akku = akku.replaceAt(i, "0");
        }
    }
    register[0] = akku;
    commandCounter = commandCounter + 2;
}

function STOP() {
    finalState = true;
    result = parseInt(memory[504]+memory[506], 2);
    if (result > 2147483647){
        result = -2*2147483648 + result;
    }
    alert('Resultat: ' + result);
}