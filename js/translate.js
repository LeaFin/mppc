var trans = {};
trans["000000101"] = function (){CLR(0);};
trans["000001101"] = function (){CLR(1);};
trans["000010101"] = function (){CLR(2);};
trans["000011101"] = function (){CLR(3);};

trans["000000111"] = function (){ADD(0);};
trans["000001111"] = function (){ADD(1);};
trans["000010111"] = function (){ADD(2);};
trans["000011111"] = function (){ADD(3);};

trans["00000001"] = function (){INC();};
trans["00000100"] = function (){DEC();};

trans["010000"] = function (){LWDD(0);};
trans["010001"] = function (){LWDD(1);};
trans["010010"] = function (){LWDD(2);};
trans["010011"] = function (){LWDD(3);};

trans["011000"] = function (){SWDD(0);};
trans["011001"] = function (){SWDD(1);};
trans["011010"] = function (){SWDD(2);};
trans["011011"] = function (){SWDD(3);};

trans["00000101"] = function (){SRA();};
trans["00001100"] = function (){SLL();};

trans["000000001"] = function (){NOT();};

trans["00110"] = function (){BZD();};
trans["00111"] = function (){BCD();};
trans["00100"] = function (){BD();};

trans["0000000000000000"] = function (){STOP();};


function getFunction(binary){
    for(var i = 1; i<16; i++){
        var code = binary.substr(0, i);
        if(trans[code] !== undefined){
           return trans[code]();
        }
    }
}