var commandCounter, commandRegistry, carryBit, count;
var register = new Array();
register[0] = "0000000000000000";
register[1] = "0000000000000000";
register[2] = "0000000000000000";
register[3] = "0000000000000000";


function toBinary(value){
    return parseInt(value, 10).toString(2);
}

function CLR(index){
    register[index] = "0000000000000000";
    carryBit = 0;
}

function test(){
    
}