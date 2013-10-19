var register, commandCounter, commandRegistry, carryBit, count;
register[0] = "0000000000000000";
register[1] = "0000000000000000";
register[2] = "0000000000000000";
register[3] = "0000000000000000";


function toBinary(value){
    return parseInt(value, 10).toString(2);
}

function CLR(register){
    register[register] = "0000000000000000";
    carryBit = 0;
}