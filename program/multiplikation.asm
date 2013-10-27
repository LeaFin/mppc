100 CLR 0  // Akku auf 0 setzen
102 DEC // -1
104 SWDD 0 #508  // Speicher 508 auf -1 setzen
106 LWDD 0 #500  // 1.Zahl wird in Akku geladen
108 CLR 1  // R1 wird auf 0 gesetzt
110 BZD #266  // Falls Akku 0 (1.Zahl) ist zum Schluss springen
112 LWDD 0 #502  // 2.Zahl wird in Akku geladen
114 BZD #266  // Falls Akku (2.Zahl) 0 ist zum Schluss springen 
116 CLR 3  // R3 wird auf 0 gesetzt
118 DEC  // Zweite Zahl wird Decrementiert
120 BZD #222 // Falls die letzte Zahl eine 1 war ist die Multiplikation abgeschlossen
122 INC // Sonst wird die Zahl wieder Inkrementiert
124 INC // Nochmals inkrementieren um festzustellen ob =-1
126 BZD #206 // Falls die letzte Zahl -1 war ist die Multiplikation abgeschlossen
128 DEC 

130 SRA  // Akku wird durch 2 geteilt Carryflag gibt an, ob rest oder nicht
132 SWDD 0 #502  // Dividierte Zahl wird in 502 und 503 geschrieben
134 LWDD 0 #500  // Zahl 1 wird geladen
136 BCD #202 // Falls das carryflag gesetzt ist springe zu 184
138 SLL  // Zahl 1 wird mit 2 multipliziert, Carryflag speichert abgeschnittene zahl
140 SWDD 0 #506  // Multiplizierte Zahl wird gespeichert in 506
142 BCD #172 // Falls das carryfalg gesetz ist gehts bei 158 weiter (Clear ändert das carryflag, drum schon hier)
144 CLR 0  // Akku wird auf 0 gesetzt
146 ADD 1  // Akku wird auf den wert von R1 gesetzt
148 SLL  // Multiplikation
150 SWDD 0 #504  // Vorderer Teil der Zahl wird in 504 geschrieben
152 LWDD 1 #504  // Laden der geschriebenen Zahl in R1
154 LWDD 0 #502  // Lade zweite Zahl in Akku
156 DEC  // Zweite Zahl wird Decrementiert
158 BZD #222 // Falls die letzte Zahl eine 1 war ist die Multiplikation abgeschlossen
160 INC // Sonst wird die Zahl wieder Inkrementiert
162 INC // Nochmals inkrementieren um festzustellen ob =-1
164 BZD #206 // Falls die letzte Zahl -1 war ist die Multiplikation abgeschlossen
166 DEC 
168 SWDD 0 #502  // Zurückschreiben
170 BD #130 //... und bei 112 weitergemacht

172 CLR 0  // Akku wird auf 0 gesetzt
174 ADD 1  // Akku wird auf den wert von R1 gesetzt
176 SLL  // Multiplikation
178 INC  // überlauf von der ersten multiplikation hier addiert
180 SWDD 0 #504  // Vorderer Teil der Zahl wird in 504 geschrieben
182 LWDD 0 #508  // Zahl aus 508 wird geladen
184 BZD #192  // Falls negativer multiplikator
186 INC 
188 BZD #248  // Falls Akku = 0 erster Durchlauf
190 BD #152 

192 LWDD 0 #504  // Laden der vorherigen zahl
194 DEC  // Inkrementierung rückgängig
196 DEC  // Dekrementieren
198 SWDD 0 #504  // Vorderer Teil der Zahl wird in 504 geschrieben
200 BD #152 // Sprung nach 144

202 LWDD 3 #500  // Wird später gebraucht falls zu dividierende Zahl ungerade war
204 BD #138  // Oben weitermachen

206 LWDD 0 #506
208 NOT  // Negieren vom hinteren teil
210 INC  // Negieren vom hinteren teil
212 SWDD 0 #506 
214 LWDD 0 #504
216 NOT  // Negieren vom vorderen Teil
218 BCD #260  // overflow handling
220 SWDD 0 #504
222 LWDD 0 #506  // Lade hinteren Teil vom ergebnisses in Akku
224 ADD 3  // Addiere Register 3 zu Akku, Bei überlauf wird carryflag gesetzt (Wird benötigt, wenn die 2. Zahl der Eingabe ungerade ist)
226 SWDD 0 #506  // Zurück schreiben
228 BCD #232  // Falls überlauf zu 198 Springen
230 STOP  // Fertig

232 LWDD 0 #504  // Lade vorderen Teil des ergebnisses in Akku
234 INC  // Inkrementieren
236 SWDD 0 #504  // Zurückschreiben
238 STOP  // Fertig

240 LWDD 0 #504  // Lade vorderen Teil des ergebnisses in Akku
242 DEC  // Dekrementieren
244 SWDD 0 #506  // Zurückschreiben
246 STOP  // Fertig

248 BCD #256  // Falls Multiplikator Negativ
250 INC // Falls Positiv auf 1 Setzen
252 SWDD #504
254 BD #152

256 SWDD 0 #508  //Setz 508 auf 0 falls der 32Bit wert Negativ ist
258 BD #192

260 INC  // Handlet overflow im fall von negierung
262 SWDD 0 #504
264 BD #222

266 SWDD 0 #504  // Akku wird in 504 und 505 geschrieben
268 SWDD 0 #506  // Akku wird in 506 und 507 geschrieben
270 STOP  // Programm Ende