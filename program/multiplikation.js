100 CLR 0  // Akku auf 0 setzen
102 SWDD 0 #508  // Speicher 508 & 509 auf 0 setzen
104 LWDD 0 #500  // 1.Zahl wird in Akku geladen
106 CLR 1  // R1 wird auf 0 gesetzt
108 BZD #Schluss  // Falls Akku 0 (1.Zahl) ist zum Schluss springen
110 LWDD 0 #502  // 2.Zahl wird in Akku geladen
112 BZD #Schluss  // Falls Akku (2.Zahl) 0 ist zum Schluss springen
114 CLR 3  // R3 wird auf 0 gesetzt

116 SRA  // Akku wird durch 2 geteilt Carryflag gibt an, ob rest oder nicht
118 SWDD 0 #502  // Dividierte Zahl wird in 502 und 503 geschrieben
120 LWDD 0 #500  // Zahl 1 wird geladen
122 BCD #184 // Falls das carryflag gesetzt ist springe zu 184
124 SLL  // Zahl 1 wird mit 2 multipliziert, Carryflag speichert abgeschnittene zahl
126 SWDD 0 #506  // Multiplizierte Zahl wird gespeichert in 506
128 BCD #158 // Falls das carryfalg gesetz ist gehts bei 158 weiter (Clear ändert das carryflag, drum schon hier)
130 CLR 0  // Akku wird auf 0 gesetzt
132 ADD 1  // Akku wird auf den wert von R1 gesetzt
//TODO: Dekrementieren falls negativ. Feststellen ob Zahl negativ besser handeln.
134 SLL  // Multiplikation
136 SWDD 0 #504  // Vorderer Teil der Zahl wird in 504 geschrieben

/* Dieser Teil wird gebraucht um zu wissen ob wir mit einer negativen zahl rechnen */
138 CLR 0  // Clear Akku
140 INC // Increment Akku
142 SWDD 0 #508 // Schreibe in 508 (wird gebraucht um zu schauen ob 1.durchlauf oder nicht... überflauf bei negativen zahlen)

144 LWDD 1 #504  // Laden der geschriebenen Zahl in R1
146 LWDD 0 #502  // Lade zweite Zahl in Akku
148 DEC  // Zweite Zahl wird Decrementiert
150 BZD #188 // Falls die letzte Zahl eine 1 war ist die Multiplikation abgeschlossen
152 INC // Sonst wird die Zahl wieder Inkrementiert
// TODO: Checken ob letzte Zahl -1
154 SWDD 0 #502  // Zurückschreiben
156 BD #112 //... und bei 112 weitergemacht

158 CLR 0  // Akku wird auf 0 gesetzt
160 ADD 1  // Akku wird auf den wert von R1 gesetzt
162 SLL  // Multiplikation
164 INC  // Wenn das Flag gesetzt war wird hier der überlauf von der ersten multiplikation hier addiert
166 SWDD 0 #504  // Vorderer Teil der Zahl wird in 504 geschrieben
168 LWDD 0 #508  // Zahl aus 508 wird geladen
170 BZD #174 // Falls Zahl Negativ
172 BD #144 // Sprung nach 144

174 LWDD 0 #504  // Laden der vorherigen zahl
176 DEC  // Inkrementierung rückgängig
178 DEC  // Dekrementieren
180 SWDD 0 #504  // Vorderer Teil der Zahl wird in 504 geschrieben
182 BD #144 // Sprung nach 144

184 LWDD 3 #500  // Wird später gebraucht falls zu dividierende Zahl ungerade war
186 BD #124  // Oben weitermachen

188 LWDD 0 #506  // Lade hinteren Teil vom ergebnisses in Akku
190 ADD 3  // Addiere Register 3 zu Akku, Bei überlauf wird carryflag gesetzt (Wird benötigt, wenn die 2. Zahl der Eingabe ungerade ist)
192 SWDD 0 #506  // Zurück schreiben
194 BCD #198  // Falls überlauf zu 198 Springen
196 STOP  // Fertig

198 LWDD 0 #504  // Lade vorderen Teil des ergebnisses in Akku
200 INC  // Inkrementieren
// TODO: falls Zahl Negativ dekrementieren
202 SWDD 0 #506  // Zurückschreiben
204 STOP  // Fertig

Schluss-1 LWDD 0 #500  // 1.Zahl wird in Akku geladen
Schluss SWDD 1 #504  // Akku wird in 504 und 505 geschrieben
Schluss+1 SWDD 0 #506  // R1 wird in 506 und 507 geschrieben
Schluss+2 STOP  // Programm Ende