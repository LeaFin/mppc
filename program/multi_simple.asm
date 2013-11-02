100 CLR 0  // Akku auf 0 setzen
102 SWDD 0 #504
104 CLR 3
106 DEC // -1
108 SWDD 0 #508  // Speicher 508 auf -1 setzen
110 LWDD 0 #500  // 1.Zahl wird in Akku geladen
112 SWDD 0 #506
114 BZD #ENDZERO  // Falls Akku 0 (1.Zahl) ist zum Schluss springen
116 CLR 1  // R1 wird auf 0 gesetzt
118 SLL
120 BCD #NEGFLAG1
122/BACK1  LWDD 0 #502  // 2.Zahl wird in Akku geladen
124 BZD #ENDZERO  // Falls Akku (2.Zahl) 0 ist zum Schluss springen 
126 DEC  // Zweite Zahl wird Decrementiert
128 BZD #ENDPOS // Falls die letzte Zahl eine 1 war ist die Multiplikation abgeschlossen
130 INC // Sonst wird die Zahl wieder Inkrementiert
132 INC // Nochmals inkrementieren um festzustellen ob =-1
134 BZD #ENDNEG // Falls die letzte Zahl -1 war ist die Multiplikation abgeschlossen
136 DEC
138 SLL
140 BCD #NEGFLAG2
142/BACK2  LWDD #202
144/LOOP SRA  // Akku wird durch 2 geteilt Carryflag gibt an, ob rest oder nicht
146 SWDD 0 #502  // Dividierte Zahl wird in 502 und 503 geschrieben
148 LWDD 0 #506  // Zahl 1 wird geladen
150 BCD #UNEVEN // Falls das carryflag gesetzt ist springe zu 184
152/BACK3 SLL  // Zahl 1 wird mit 2 multipliziert, Carryflag speichert abgeschnittene zahl
154 SWDD 0 #506  // Multiplizierte Zahl wird gespeichert in 506
156 BCD #OFMULT // Falls das carryfalg gesetz ist gehts bei 158 weiter (Clear ändert das carryflag, drum schon hier)
158 CLR 0  // Akku wird auf 0 gesetzt
160 ADD 1  // Akku wird auf den wert von R1 gesetzt
162 SLL  // Multiplikation
164/BACK4 SWDD 0 #504  // Vorderer Teil der Zahl wird in 504 geschrieben
166 LWDD 1 #504  // Laden der geschriebenen Zahl in R1
168 LWDD 0 #502  // Lade zweite Zahl in Akku
170 DEC  // Zweite Zahl wird Decrementiert
172 BZD #ALMOSTEND // Falls die letzte Zahl eine 1 war ist die Multiplikation abgeschlossen
174 INC // Sonst wird die Zahl wieder Inkrementiert
176 BD #LOOP //... und bei 112 weitergemacht

ALMOSTEND LWDD 0 #506
ALMOSTEND ADD 3
ALMOSTEND SWDD 0 #506
ALMOSTEND BCD #LASTOF
ALMOSTEND/BACKAL LWDD 0 #508
ALMOSTEND BZD ENDNEG
ENDPOS STOP

LASTOF LWDD 0 #504  // Lade vorderen Teil des ergebnisses in Akku
LASTOF INC  // Inkrementieren
LASTOF SWDD 0 #504  // Zurückschreiben
LASTOF BD BACKAL  // Fertig

OFMULT CLR 0  // Akku wird auf 0 gesetzt
OFMULT ADD 1  // Akku wird auf den wert von R1 gesetzt
OFMULT SLL  // Multiplikation
OFMULT INC  // überlauf von der ersten multiplikation hier addiert
OFMULT BD BACK4

UNEVEN LWDD 3 #506  // Wird später gebraucht falls zu dividierende Zahl ungerade war
UNEVEN BD #BACK3

NEGFLAG1 LWDD 0 #508
NEGFLAG1 INC
NEGFLAG1 SWDD 0 #508
NEGFLAG1 LWDD 0 #506
NEGFLAG1 DEC
NEGFLAG1 NOT
NEGFLAG1 SWDD 0 #506
NEGFLAG1 BD #BACK1

NEGFLAG2 LWDD 0 #508
NEGFLAG2 INC
NEGFLAG2 SWDD 0 #508
NEGFLAG2 LWDD 0 #502
NEGFLAG2 DEC
NEGFLAG2 NOT
NEGFLAG2 SWDD 0 #502
NEGFLAG2 BD #BACK2

ENDZERO CLR 0
ENDZERO SWDD #506
ENDZERO STOP

ENDNEG LWDD #506
ENDNEG NOT
ENDNEG INC
ENDNEG SWDD #506
ENDNEG LWDD #504
ENDNEG NOT
ENDNEG BCD #OFENDNEG
ENDNEG/BACKENDNEG SWDD #504
ENDNEG STOP

OFENDNEG INC
OFENDNEG BD #BACKENDNEG