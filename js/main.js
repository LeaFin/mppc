var commandCounter, carryBit, count;
var memory = new Array();
var register = new Array();
register[0] = "0000000000000000";
register[1] = "0000000000000000";
register[2] = "0000000000000000";
register[3] = "0000000000000000";


function toBinary(value) {
    return parseInt(value, 10).toString(2);
}

function CLR(index) {
    register[index] = "0000000000000000";
    carryBit = 0;
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
}


function test() {
    DEC();
}

function loadProgramm() {
    //loadProgrammandDataToMemory();
    test();
}

function SLA() {
    var akku = register[0];
    carryBit = parseInt(akku[0]);
    akku = akku.substr(1, 15) + "0";
    register[0] = akku;
}

function SRA() {
    var akku = register[0];
    var msb = akku[0];
    carryBit = parseInt(akku[15]);
    akku = msb + akku.substr(0, 15);
    register[0] = akku;
}

String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
};

function INC() {
    var akku = register[0];
    var last = akku.lastIndexOf("0");
    if (last === -1) {
        carryBit = 1;
        register[0] = "0000000000000000";
        return;
    } else {
        akku = akku.replaceAt(last, "1");
        var replaceString = "0000000000000000".substr(0, 15 - last);
        akku = akku.substr(0, last + 1) + replaceString;
        carryBit = 0;
        register[0] = akku;
    }
}

function LWDD(index, befehl){
    register[index] = memory[parseInt(befehl.substring(6, 15), 2)];
}

function SWDD(index, befehl){
    memory[parseInt(befehl.substring(6, 15), 2)] = register[index];
}

function DEC() {
    var akku = register[0];
    var dec = "1111111111111111";
    if (akku === "0000000000000000") {
        carryBit = 1;
        register[0] = "1111111111111111";
        return;
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
}

function loadProgrammAndDataToMemory() {
    var programm = $("#programmAndDataInput").val();
    var lines = programm.replace(/\r\n/g, "\n").split("\n");
    for (var i = 0; i < lines.length; i++) {
        var splittedLine = lines[i].split(" ");
        memory[splittedLine[0]] = splittedLine[1];
    }
}