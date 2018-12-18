# Contributing

Rått at du vil være med å prøve å lage noe morsomt med kode til [Variants nyttårskalas](https://www.facebook.com/events/496245590871569/)! Her er en liten guide til hvordan du kan gå frem.

1. Bruk sandbox til å eksperimentere og leke deg frem til et kult resultat. Du kan også [clone dette repoet](https://github.com/varianter/variant-live) om du vil ha mer kontroll og vi kan hjelpe legge til rette for at alt funker.
2. Sørg for at du har rettigheter til alt du bruker (kode, eventuelle ressurser, osv)
3. Når du er fornøyd, kan du gjøre en av to ting:
    1. *Manuelt*: Forke dette repoet, legge til koden din under `visuals/<ET_NAVN_HER>.js` og send en PR.
    2. *Automatisk*: Trykk `Send PR` lenken i sandbox til å automatisk opprette en PR med filens innhold.
4. Vent på at Now.sh er ferdig bygget (står info om det i PR-en). Når det er gjort kan du gå på URL-en `https://https://variant.live/previewer/?visual=<ET_NAVN_HER>` hvor `<ET_NAVN_HER>` er det filen ble kalt fra steg 3 (uten `.js`). Her vil du se en live preview av hvordan det vil se ut på skjermen.

Om du har trøbbel, ønsker noen utvidelser eller endring i den eksisterende koden, gjøre bug fix eller lignende, er vi også veldig mottakelig for bidrag. Send en issue, eller en PR så tar vi kommunikasjonen derfra.

## Guide p5.

Om du ser i [sandboxen](https://variant.live/sandbox) ser du at den starter med et eksempel. Dette kan du ta utgangspunkt i å gjøre ditt eget, eller du kan fjerne det totalt. Men der ser du uansett hvordan det kan brukes. Vi eksponerer[p5 biblioteket](https://p5js.org) og lydinformasjon til en funksjon som du kan bruke.

For å prøve deg frem med P5 er referansedokumentasjonen nyttig å bruke: https://p5js.org/reference/. Aller fleste av disse funksjonene er tilgjengelig i sandboxen, bare under `p5.`-objektet.

Det er viktig å tenke over at denne funksjonen blir kalt ca 60 ganger i sekundet. Hver gang den blir kalt blir den kalt med oppdatert musikkinformasjon slik det er akkurat nå. F.eks frekvensverdien til bassen akkurat i dette sekundet. Du kan også bruke dette til å ha dine egne animasjoner. F.eks om du vil ha en ball som glir over skjermen kan du ha en variabel <code>x</code> utenfor funksjonen og hver gang funksjonen kalles gange opp <code>x</code> med en hastighet. Disse basepri
nsippene er det du kan bruke til å lage fantastiske visualiseringer.

Nå får vi det kanskje til å høres enkelt ut, men om du er ny til visualiseringer på denne måten kan det være litt vanskelig. Men det viktigste her er å utforske. Man kan få veldig interessante effekter og grafikk bare med å justere verdier og rote med kode i sanntidseditoren. Og selv om man ikke blir å sende inn sin visualisering, kan det være ufattelig morsomt. Prøv deg frem! Ha det litt morsomt med kode og kreativitet. Og gjerne send inn så får vi med din visualisering under Kubbis konsert på nyttårskalaset!

### Det er i 3D!

Sandboxen er satt opp i WEBGL/3D modus. For det meste har det ikke så mye å si om du er helt fersk, men det kan potensielt bety at du kan animere ting i 3 dimensjoner og må ta høyde for Z-akse.
