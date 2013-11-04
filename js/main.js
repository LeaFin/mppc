var finalState = true;
var speed = 500;
var carryBit = 0;
var counter = 0;
var memory = new Array();
var register = new Array();
var mnemonics = new Array();
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
    mnemonics = new Array();
    commandCounter = 100;
    register[0] = "0000000000000000";
    register[1] = "0000000000000000";
    register[2] = "0000000000000000";
    register[3] = "0000000000000000";
    updateView();
}

String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
};

function loadProgrammAndDataToMemory() {
    var programm = $("#programmAndDataInput").val();
    var lines = programm.replace(/\r\n/g, "\n").split("\n");
    for (var i = 0; i < lines.length; i++) {
        var splittedLine = lines[i].split(" ");
        memory[splittedLine[0]] = splittedLine[1];
        mnemonics[splittedLine[0]] = getMnemonics(splittedLine[1]);
    }
    updateView();
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
    updateProgrammMnemonics();
    updateDataBinaryAndInt();   
}

function updateDataBinaryAndInt(){
    var contentDataBinary = "";
    var contentDataInt = "";
    for (var i = 0; i <= 30; i = i + 2){
        contentDataBinary += '<div><span class="rowNumber">'+ (500 + i) +'</span><span>' + memory[500 + i] + '</span></div>';
        if (i===4){
            contentDataInt += '<div><span>NaN</span></div>';
        }else{
            if (i===6){
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

function updateProgrammMnemonics() {
    var content = "";
    for (var i = 10; i >= 2; i = i - 2) {
        content += '<div><span>' + mnemonics[commandCounter - i] + '</span></div>';
    }
    content += '<div id="currentCommand"><span>' + mnemonics[commandCounter] + '</span></div>';
    for (var i = 2; i <= 20; i = i + 2) {
        content += '<div><span>' + mnemonics[commandCounter + i] + '</span></div>';
    }
    $("#programmMnemonics").html(content);
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