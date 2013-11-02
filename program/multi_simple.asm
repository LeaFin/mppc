100 CLR 0  // Akku auf 0 setzen
102 SWDD 0 #504
104 CLR 3
106 DEC // -1
108 SWDD 0 #508  // Speicher 508 auf -1 setzen
110 LWDD 0 #500  // 1.Zahl wird in Akku geladen
112 SWDD 0 #506
114 BZD #266  // Falls Akku 0 (1.Zahl) ist zum Schluss springen
116 CLR 1  // R1 wird auf 0 gesetzt
118 SLL
120 BCD #234
122 LWDD 0 #502  // 2.Zahl wird in Akku geladen
124 BZD #266  // Falls Akku (2.Zahl) 0 ist zum Schluss springen 
126 DEC  // Zweite Zahl wird Decrementiert
128 BZD #190 // Falls die letzte Zahl eine 1 war ist die Multiplikation abgeschlossen
130 INC // Sonst wird die Zahl wieder Inkrementiert
132 INC // Nochmals inkrementieren um festzustellen ob =-1
134 BZD #272 // Falls die letzte Zahl -1 war ist die Multiplikation abgeschlossen
136 DEC
138 SLL
140 BCD #250   
142 LWDD 0 #502
144 SRA  // Akku wird durch 2 geteilt Carryflag gibt an, ob rest oder nicht
146 SWDD 0 #502  // Dividierte Zahl wird in 502 und 503 geschrieben
148 LWDD 0 #506  // Zahl 1 wird geladen
150 BCD #212 // Falls das carryflag gesetzt ist springe zu 184
152 SLL  // Zahl 1 wird mit 2 multipliziert, Carryflag speichert abgeschnittene zahl
154 SWDD 0 #506  // Multiplizierte Zahl wird gespeichert in 506
156 BCD #202 // Falls das carryfalg gesetz ist gehts bei 158 weiter (Clear ändert das carryflag, drum schon hier)
158 CLR 0  // Akku wird auf 0 gesetzt
160 ADD 1  // Akku wird auf den wert von R1 gesetzt
162 SLL  // Multiplikation
164 SWDD 0 #504  // Vorderer Teil der Zahl wird in 504 geschrieben
166 LWDD 1 #504  // Laden der geschriebenen Zahl in R1
168 LWDD 0 #502  // Lade zweite Zahl in Akku
170 DEC  // Zweite Zahl wird Decrementiert
172 BZD #178 // Falls die letzte Zahl eine 1 war ist die Multiplikation abgeschlossen
174 INC // Sonst wird die Zahl wieder Inkrementiert
176 BD #144 //... und bei 112 weitergemacht

178 LWDD 0 #506
180 ADD 3
182 SWDD 0 #506
184 LWDD 0 #504
186 BCD #192
188 ADD 2
190 SWDD 0 #504
192 LWDD 0 #508
194 BZD #272
196 STOP

198 INC  // Inkrementieren
200 BD #188  // Fertig

202 CLR 0  // Akku wird auf 0 gesetzt
204 ADD 1  // Akku wird auf den wert von R1 gesetzt
206 SLL  // Multiplikation
208 INC  // überlauf von der ersten multiplikation hier addiert
210 BD #164

212 LWDD 0 #506  // Wird später gebraucht falls zu dividierende Zahl ungerade war
214 ADD 3
216 SWDD 0 #512
218 LWDD 0 #504
220 BCD #294
222 ADD 2
224 SWDD 0 #510
226 LWDD 2 #510
228 LWDD 3 #512
230 LWDD 0 #506
232 BD #152

234 LWDD 0 #508
236 INC
238 SWDD 0 #508
240 LWDD 0 #506
242 DEC
244 NOT
246 SWDD 0 #506
248 BD #122

250 LWDD 0 #508
252 INC
254 SWDD 0 #508
256 LWDD 0 #502
258 DEC
260 NOT
262 SWDD 0 #502
264 BD #142

266 CLR 0
268 SWDD #506
270 STOP

272 LWDD #506
274 NOT
276 INC
278 SWDD #506
280 LWDD #504
282 NOT
284 BCD #290
286 SWDD #504
288 STOP

290 INC
292 BD #286

294 INC
296 BD #222