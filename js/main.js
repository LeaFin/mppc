var commandCounter, carryBit, count;
var commandRegistry = new Array();
var register = new Array();
register[0] = 0;
register[1] = 0;
register[2] = 0;
register[3] = 0;


function toBinary(value) {
    return parseInt(value, 10).toString(2);
}

function CLR(index) {
    register[index] = 0;
    carryBit = 0;
}

function ADD(index) {
    addToAkk(register[index]);
}

function ADDD(value) {
    addToAkku(value);
}

function addToAkku(value) {
    akku = register[0];
    register = value;
    value = akku + register;
    if (value < -32768 || value > 32767) {
        carryBit = 1;
    } else {
        carryBit = 0;
        register[0] = value;
    }
}

function test() {
    alert(" ");
    alert(commandRegistry.join('\n'));
}

function loadProgramm(){
    loadProgrammToCommandRegistry();
    loadDataToCommandRegistry();
    test();
}

function loadProgrammToCommandRegistry() {
    var programm = $("#programmInput").val();
    var lines = programm.replace(/\r\n/g, "\n").split("\n");
    for (var i = 0; i < lines.length; i++) {
        var splittedLine = lines[i].split(" ");
        commandRegistry[splittedLine[0]] = splittedLine[1];
        commandRegistry[splittedLine[0] + 1] = splittedLine[2];
    }
}

function loadDataToCommandRegistry(){
    var data = $("#dataInput").val();
    var lines = data.replace(/\r\n/g, "\n").split("\n");
    for (var i = 0; i < lines.length; i++) {
        var splittedLine = lines[i].split(" ");
        commandRegistry[splittedLine[0]] = splittedLine[1];
        commandRegistry[splittedLine[0] + 1] = splittedLine[2];
    }
}