100 CLR 0  // Akku auf 0 setzen
102 SWDD 0 #504
104 CLR 3
106 DEC // -1
108 SWDD 0 #508  // Speicher 508 auf -1 setzen
110 LWDD 0 #500  // 1.Zahl wird in Akku geladen
112 SWDD 0 #506
114 BZD #246  // Falls Akku 0 (1.Zahl) ist zum Schluss springen
116 CLR 1  // R1 wird auf 0 gesetzt
118 SLL
120 BCD #214
122 LWDD 0 #502  // 2.Zahl wird in Akku geladen
124 BZD #246  // Falls Akku (2.Zahl) 0 ist zum Schluss springen 
126 DEC  // Zweite Zahl wird Decrementiert
128 BZD #190 // Falls die letzte Zahl eine 1 war ist die Multiplikation abgeschlossen
130 INC // Sonst wird die Zahl wieder Inkrementiert
132 INC // Nochmals inkrementieren um festzustellen ob =-1
134 BZD #252 // Falls die letzte Zahl -1 war ist die Multiplikation abgeschlossen
136 DEC
138 SLL
140 BCD #230   
142 LWDD #202
144 SRA  // Akku wird durch 2 geteilt Carryflag gibt an, ob rest oder nicht
146 SWDD 0 #502  // Dividierte Zahl wird in 502 und 503 geschrieben
148 LWDD 0 #506  // Zahl 1 wird geladen
150 BCD #210 // Falls das carryflag gesetzt ist springe zu 184
152 SLL  // Zahl 1 wird mit 2 multipliziert, Carryflag speichert abgeschnittene zahl
154 SWDD 0 #506  // Multiplizierte Zahl wird gespeichert in 506
156 BCD #200 // Falls das carryfalg gesetz ist gehts bei 158 weiter (Clear ändert das carryflag, drum schon hier)
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
184 BCD #192
186 LWDD 0 #508
188 BZD #252
190 STOP

192 LWDD 0 #504  // Lade vorderen Teil des ergebnisses in Akku
194 INC  // Inkrementieren
196 SWDD 0 #504  // Zurückschreiben
198 BD #186  // Fertig

200 CLR 0  // Akku wird auf 0 gesetzt
202 ADD 1  // Akku wird auf den wert von R1 gesetzt
204 SLL  // Multiplikation
206 INC  // überlauf von der ersten multiplikation hier addiert
208 BD #164

210 LWDD 3 #506  // Wird später gebraucht falls zu dividierende Zahl ungerade war
212 BD #152

214 LWDD 0 #508
216 INC
218 SWDD 0 #508
220 LWDD 0 #506
222 DEC
224 NOT
226 SWDD 0 #506
228 BD #122

230 LWDD 0 #508
232 INC
234 SWDD 0 #508
236 LWDD 0 #502
238 DEC
240 NOT
242 SWDD 0 #502
244 BD #142

246 CLR 0
248 SWDD #506
250 STOP

252 LWDD #506
254 NOT
256 INC
258 SWDD #506
260 LWDD #504
262 NOT
264 BCD #270
266 SWDD #504
268 STOP

270 INC
272 BD #266