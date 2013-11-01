var finalState = true;
var speed = 500;
var carryBit = 0;
var counter = 0;
var memory = new Array();
var register = new Array();
var commandCounter = 100;
register[0] = "0000000000000000";
register[1] = "0000000000000000";
register[2] = "0000000000000000";
register[3] = "0000000000000000";

function reset() {
    finalState = true;
    speed = 50;
    carryBit = 0;
    counter = 0;
    memory = new Array();
    register = new Array();
    commandCounter = 100;
    register[0] = "0000000000000000";
    register[1] = "0000000000000000";
    register[2] = "0000000000000000";
    register[3] = "0000000000000000";
    updateView();
}


function toBinary(value) {
    return parseInt(value, 10).toString(2);
}

function CLR(index) {
    register[index] = "0000000000000000";
    carryBit = 0;
    commandCounter = commandCounter + 2;
}
;

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

function callFunction(func) {

}

function test() {

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

String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
};

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

function loadProgrammAndDataToMemory() {
    var programm = $("#programmAndDataInput").val();
    var lines = programm.replace(/\r\n/g, "\n").split("\n");
    for (var i = 0; i < lines.length; i++) {
        var splittedLine = lines[i].split(" ");
        memory[splittedLine[0]] = splittedLine[1];
    }
    updateView();
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

function init() {
    loadSlider();
    updateView();
}

function updateView() {
    $("#commandCounter").html(commandCounter);
    $("#counter").html(counter);
    $("#akku").html(register[0]);
    $("#carryBit").html(carryBit);
    $("#register1").html(register[1]);
    $("#register2").html(register[2]);
    $("#register3").html(register[3]);
    updateProgrammBinary();
    updateDataBinary();
}

function updateDataBinary(){
    var contentDataBinary = "";
    var contentDataInt = "";
    for (var i = 0; i <= 28; i = i + 2){
        contentDataBinary += '<div><span class="rowNumber">'+ (500 + i) +'</span><span>' + memory[500 + i] + '</span></div>';
        if (i==4){
            contentDataInt += '<div><span>&nbsp;</span></div>';
        }else{
            if (i==6){
                dec = parseInt(memory[504]+memory[506], 2);
                if (dec > 2147483647){
                    dec = -2*2147483648 + dec;
                }
                contentDataInt += '<div><span>' + dec + '</span></div>';
            }
            else {
                dec = parseInt(memory[500 + i], 2);
                if (dec > 32767){
                    dec = -2*32768 + dec;
                }
                contentDataInt += '<div><span>' + dec + '</span></div>';
            }
        }
    }
    $("#dataBinary").html(contentDataBinary);
    $("#dataInt").html(contentDataInt);
}

function updateProgrammBinary() {
    var content = "";
    for (var i = 10; i >= 2; i = i - 2) {
        content += '<div><span class="rowNumber">'+ (commandCounter-i) +'</span><span>' + memory[commandCounter - i] + '</span></div>';
    }
    content += '<div id="currentCommand"><span class="rowNumber">'+ commandCounter +'</span><span>' + memory[commandCounter] + '</span></div>';
    for (var i = 2; i <= 20; i = i + 2) {
        content += '<div><span class="rowNumber">'+ (commandCounter+i) +'</span><span>' + memory[commandCounter + i] + '</span></div>';
    }
    $("#programmBinary").html(content);
}

function clearProgrammAndDataInput(){
    $("#programmAndDataInput").val("");
}

function step() {
    getFunction(memory[commandCounter]);
    counter++;
    updateView();
}

function run() {
    setTimeout(function() {
        if (!finalState) {
            step();
            run();
        }
    }, speed);
}

function pause() {
    finalState = true;
}

function play() {
    finalState = false;
}

function loadSlider() {
    $("#slider").slider({
        min: 0,
        max: 5000,
        value: speed,
        change: function(event, ui) {
            speed = ui.value;
        }
    });
}

function textAreaAdjust(o) {
    o.style.height = "1px";
    o.style.height = (25+o.scrollHeight)+"px";
}