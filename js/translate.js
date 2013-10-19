function getOpCode(mnemoncis){
    return trans[mnemoncis];
}

var trans = new Array();
trans["CLR 0"] = "000000101";
trans["CLR 1"] = "000001101";
trans["CLR 2"] = "000010101";
trans["CLR 3"] = "000011101";

trans["ADD 0"] = "000000111";
trans["ADD 1"] = "000001111";
trans["ADD 2"] = "000010111";
trans["ADD 3"] = "000011111";

trans["ADDD"] = "1";

trans["INC"] = "00000001";
trans["DEC"] = "00000100";

trans["LWDD 0"] = "010000";
trans["LWDD 1"] = "010001";
trans["LWDD 2"] = "010010";
trans["LWDD 3"] = "010011";

trans["SWDD 0"] = "011000";
trans["SWDD 1"] = "011001";
trans["SWDD 2"] = "011010";
trans["SWDD 3"] = "011011";

trans["SRA"] = "00000101";
trans["SLA"] = "00001000";
trans["SRL"] = "00001001";
trans["SLL"] = "00001100";

trans["AND 0"] = "000000100";
trans["AND 1"] = "000001100";
trans["AND 2"] = "000010100";
trans["AND 3"] = "000011100";

trans["OR 0"] = "000000110";
trans["OR 1"] = "000001110";
trans["OR 2"] = "000010110";
trans["OR 3"] = "000011110";

trans["NOT"] = "000000001";

trans["BZ 0"] = "00010010";
trans["BZ 1"] = "00010110";
trans["BZ 2"] = "00011010";
trans["BZ 3"] = "00011110";

trans["BNZ 0"] = "00010001";
trans["BNZ 1"] = "00010101";
trans["BNZ 2"] = "00011001";
trans["BNZ 3"] = "00011101";

trans["BC 0"] = "00010011";
trans["BC 1"] = "00010111";
trans["BC 2"] = "00011011";
trans["BC 3"] = "00011111";

trans["B 0"] = "00010000";
trans["B 1"] = "00010100";
trans["B 2"] = "00011000";
trans["B 3"] = "00011100";

trans["BZD"] = "00110";
trans["BNZD"] = "00101";
trans["BCD"] = "00111";
trans["BD"] = "00100";

trans["END"] = "0000000000000000";