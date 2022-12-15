const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

// configure .env files for JWT creation and MongoDb connection
const dotenv = require("dotenv");
dotenv.config();

// Enable cors support
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

// Enable express body parser
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

// Use fallback route
app.get("*", (req, res) => {
  res.json({
    artists: [
      {
        name: "Ude af Kontrol",
        identifier: "ude-af-kontrol",
        socials: {
          instagram: "https://www.instagram.com/udeafkontrol",
          facebook: "https://www.facebook.com/udeafkontrol",
          website: "https://udeafkontrol.dk",
          spotify: "2ZbyyCS8KLKsuoNlxc76Ev",
        },
        type: "concert",
        date: 2675296000,
        location: "Pitstop",
        image: "https://i.ibb.co/80fVmJy/ude-af-kontrol.jpg",
        header: "https://i.ibb.co/80fVmJy/ude-af-kontrol.jpg",
        body: "<div> <h2>Om Ude af Kontrol</h2> <p>Englando, Balken og Munken har i et halvt årti skabt en bølge af hits og opnået mere end 260.000.000 (!) streams, alene på Spotify, hvor drengene i den grad er vokset med opgaven i takt med deres stigende popularitet. På trods af meget begrænset kommerciel support har Ude Af Kontrol formået at vokse sig til et af de største artister herhjemme, både målt på antal af streams samt tilslutningen til deres koncerter.</p> <br> <p>Drengene er, som navnet lægger op til, kendte for at skubbe til grænsen og det er ikke unormalt at en UAK koncert bliver stoppet undervejs grundet et for vildt publikum. Senest på Stjernescenen, Smukfest 2019, blev Ude Af Kontrol’s koncert sat på pause (af to omgange) inden drengene fik lov til at gennemføre festen</p> <br> <p>Ude Af Kontrol’s farverige energi blev også forløst på Plænen i Tivoli, som i øvrigt var den mest besøgte Fredags Rock koncert i 2019 med over 22.000 gæster, kun overgået af Tom Jones!</p> </div>",
      },
      {
        name: "Chopper",
        identifier: "chopper",
        socials: {
          instagram: "",
          facebook: "",
          website: "",
          spotify: "5Gh6G0svQss9izo01sYHCs",
        },
        type: "concert",
        date: 1675276000,
        location: "Pitstop",
        image: "https://i.ibb.co/1TMgPp8/chopper.jpg",
        header: "https://i.ibb.co/1TMgPp8/chopper.jpg",
        body: "<div> <h2>Om Chopper</h2> <p>Based in Copenhagen, Denmark, Chopper is a dark, danceable and playful solo-project by Jonatan K. Magnussen (The Love Coffin) feeding on anything from eurodance to glam rock, harsh industrial to disco (Chopper himself prefers the term “shock pop”). Already receiving attention for his intense live shows, enigmatic music videos and flamboyant expressive attitude, Chopper is all about a fine line between tragedy and comedy. Although reminiscent of oldschool horror flicks and synthetic bubblegum pastiche, don’t fool yourself - underneath lies an undeniable gut- wrenching personal force. Imagine a carnival from hell, a fun, haunting and amusing little nightmare, the sound of untamed youth and the longing for love; all somehow elegantly yet forcefully contrasting the bleakest personal observations. With great charm, diversity and somewhat diabolic undertones, Chopper demands to be included among the unholy (and unwritten) canon of weird, haunting, homeless, lost pop figures of the past and present. Chopper lives well and free in a strange but captivating world. Long live the wicked!</p> </div>",
      },
      {
        name: "Agnes Hartwich",
        identifier: "agnes-hartwich",
        socials: {
          instagram: "https://www.instagram.com/agneshartwich/",
          facebook: "https://www.facebook.com/agneshartwichmusic",
          website: "",
          spotify: "5dannHlHirCopWH6vT2DpX",
        },
        type: "concert",
        date: 1675296000,
        location: "Pitstop",
        image: "https://i.ibb.co/VwJncGH/agnes-hartwich.jpg",
        header: "https://i.ibb.co/VwJncGH/agnes-hartwich.jpg",
        body: "<div> <h2>Om Agnes Hartwich</h2> <p>Den unge, ambitiøse sanger og sangskriver Agnes Hartwich har tidligere i år udgivet sin debut - EP, ’ Into the Deep Dark Blue’, hvor singlerne ’Deep Dark Blue’ og ’Black Shiny Car’ markerede sig som Top Tracks hos Soundvenue og gik til tops på P3’s Upcoming Listen. Efteråret sidste år brugte Hartwich som support for Scarlet Pleasure på deres DK - tour, og live musikken spillede videre i selskab med Alex Vargas, da de sammen besøgte over 20 danske spillesteder i det tidlige forår.</p> <br> <p>Agnes Hartwich tager udgangspunkt i sit eget liv som ung kvinde med rødder i provinsen og de store følelser, der overskygger alt, når man skal finde sit fundament. Det er sangskrivning om vrede og følelsen af at føle sig anderledes. Men det er også håb, rå energi og den stormende og altoverskyggende forelskelse, der kan ramme et teenagehjerte – og bliver serveret i et elegant mix af pop, rock og grunge.</p> </div>",
      },
      {
        name: "Elektrisk Ål",
        identifier: "elektrisk-al",
        socials: {
          instagram: "https://www.instagram.com/elektriskal/",
          facebook: "https://www.facebook.com/profile.php?id=100067103446502",
          website: "",
          spotify: "73UbTOKS7e146PBWxFQrff",
        },
        type: "concert",
        date: 1675296000,
        location: "Pitstop",
        image: "https://i.ibb.co/S61H4N0/elektrisk-aal.jpg",
        header: "https://i.ibb.co/S61H4N0/elektrisk-aal.jpg",
        body: "<div> <h2>Om Elektrisk Ål</h2> <p>Hvordan vil det lyde, hvis du tager tropiske/ latin vibes, afro - caribiske rytmer, Reggaetonsmag og afro - beat - grooves og blander det med Cumbia, Dub, Funk og Steppers?! Det er Københavns specielle cocktail, når du bestiller en fest ... På blot to års eksistens overraskede Elektrisk Ål den skandinaviske scene med et elektrificerende show, der inviterede alle til at tage deres bedste dansetrin.. de har allerede spillet koncerter på Christianias Jazzclub, Operaen, Steel House, Himmelstorm F estival, Vadested Festival, Copenhagen Jazz Festival, Knejpe Festival Helsingør, Gloråb Ræs Festival Fyn, Jesusbaren Malmø mm.</p> <br> <p>Bandet er allerede blevet spillet to gange på Danmarks Radio P3.</p> </div>",
      },
      {
        name: "Evil House Party",
        identifier: "evil-house-party",
        socials: {
          instagram: "https://www.instagram.com/evilhouseparty/",
          facebook: "",
          website: "",
          spotify: "4dcXQW2aINb1lAMHKQa2hB",
        },
        type: "concert",
        date: 1675296000,
        location: "Pitstop",
        image: "https://i.ibb.co/bgNK3Wf/evil-house-party.jpg",
        header: "https://i.ibb.co/bgNK3Wf/evil-house-party.jpg",
        body: "<div> <h2>Om Evil House Party</h2> <p>Evil House Party is the Copenhagen based band of Jacob Formann and Emma Acs. The twisted duo know each other from the Copenhagen music scene and the friend groups around it.</p> <br> <p>One summer they spend most sunny days in a dark basement in a poison base area in the industrial harbor side of Copenhagen, making what later became their debut EP and the beginning of a new band.</p> <br> <p>EHP can be described as depressive eurodance or dank EDM, but Emma & Jacob who both grew up playing rock music simply describes it as car music.</p> <br> <p>Jacob is the former guitar player in rock band Communions (Fat Possum, Big Love) and are now releasing music under the name Mini Esco (Posh Isolation). Emma Acs is known for her dark pop music released in her own name.</p> <br> </div>",
      },
      {
        name: "Djämes Braun",
        identifier: "djames-braun",
        socials: {
          instagram: "https://www.instagram.com/djamesbraun/",
          facebook: "https://www.facebook.com/DjamesBraun/",
          website: "",
          spotify: "3kI2qtr3zCuB4YbDl5yvkh",
        },
        type: "concert",
        date: 1675296000,
        location: "Pitstop",
        image: "https://i.ibb.co/vL6jnWg/djames-braun.jpg",
        header: "https://i.ibb.co/vL6jnWg/djames-braun.jpg",
        body: "<div> <h2>Om Djämes Braun</h2> <p>P3’s “KarriereKanonen” blev kickstarteren i Djämes Braun karriereforløb, og med vindernummeret ”Duft Af Ba - cone” blev der lagt en solid grundsten til et langt forløb med det ene hit efter det andet, hvor der siden 2012 ikke er blevet set sig tilbage.</p> <br> <p>Djämes Braun er indbegrebet af fest og god stemning og har kunne opleves på alle de danske festivaler igennem de seneste år hvor man har kunne synge med og få gang i danse fødderne til sange som ”Traktor”, ”Kom Og Giv Mig Alle Dine Penge”, ”Kvinder Og Kanoner”, ”Inficeret”, ”Lytter Ikk’ Til Dem”, ”Geronimo”, ”Ild Til Blokken”, ”Dem Vi Var” og ikke mindst mega hittet ”Fugle”.</p> <br> <p>Djämes Braun har imponerende mere end 35 millioner views på Youtube, over 60 millioner streams på Spotify alene som har affødt den ene guld og platin certificering efter den anden.</p> </div>",
      },
      {
        name: "Danser Med Piger",
        identifier: "danser-med-piger",
        socials: {
          instagram: "https://www.instagram.com/dansermedpiger/",
          facebook: "https://www.facebook.com/profile.php?id=100075755391006",
          website: "",
          spotify: "05oyT11e8BU40gtvrI6sU5",
        },
        type: "concert",
        date: 1675296000,
        location: "Pitstop",
        image: "https://i.ibb.co/tBr7r6g/danser-med-piger.jpg",
        header: "https://i.ibb.co/tBr7r6g/danser-med-piger.jpg",
        body: "<div> <h2>Om Danser Med Piger</h2> <p>Danser Med Piger er lyden af venskab og musikalsk talent. Et vaskeægte band, bestående af fem bedste venner, som elsker at spille musik sammen.</p> <br> <p>'Vi har det for fedt, når vi spiller og skriver sange sammen! Vi kunne sagtens have spillet musik hver for sig, men sammen er det bare meget sjovere. Når vi laver musik, er vi fem bedste venner, der hænger ud, samtidig med at vi laver musik lige præcis på denne måde, som vi elsker.' –Danser Med Piger.</p> <br> <p>Danser Med Piger er rendyrket pop og disco anno 2022, som trækker tråde fra 80’erne: 'Det er helt klart pop, det kan vi ikke løbe fra! Og så er det 80’er inspireret. Men vi prøver at lave en ny era inden for disco. Vores generations form for disco med inspiration fra den gamle skole, såsom Earth, Wind & Fire og Michael Jackson.' –Danser Med Piger . Disco - referencerne kan især mærkes på det helt store hit ’Danser Med Piger’ som har ligget på hitlister hele sommeren</p> <br> <p>Danser Med Piger har allerede spillet på SPOT, til Cheff Records Festival og opvarmet til Cheff Records koncerter i K.B. Hallen og i Århus kongrescenter samt head linet Hotel Cecil, TRAIN og snart VEGA.</p> </div>",
      },
      {
        name: "Astrid Engberg",
        identifier: "astrid-engberg",
        socials: {
          instagram: "https://www.instagram.com/astridengberg___/",
          facebook: "https://www.facebook.com/AstridEngberg",
          website: "https://www.astridengberg.com/",
          spotify: "1aCZzByicOHcS6WpNPwqXV",
        },
        type: "concert",
        date: 1675276000,
        location: "Pitstop",
        image: "https://i.ibb.co/2gY3fpD/astrid-engberg.jpg",
        header: "https://i.ibb.co/2gY3fpD/astrid-engberg.jpg",
        body: "<div> <h2>Om Astrid Engberg</h2> <p>Sangerinden og produceren Astrid Engberg er indbegrebet af moderne jazz anno 2023. For hun bygger de smukkeste broer mellem alverdens musikgenrer. Hendes musik er arkitektoniske mesterværker, der kombinerer jazz, moderne soul, klassisk musik, elektroniske beats. Musikken emmer på en gang af blødhed og uhyre groovy og sprudlende alvorstung danseglæde. Det er organisk og elektronisk, stærkt og sart og ikke mindst grænseløst og lækkert. Som musiker har hun sine fødder solidt begravet i den danske muld, men er samtid stærkt præget af hendes mange rejser til verdens musikalske afkroge.</p> <br> <p>Anmelderne og publikum elsker det. Hendes debutalbum Tulpa høstede 5 af 6 stjerner i både Politiken og Gaffa. De kalder det for 'overbevisende original brobygning' og et album af internationalt tilsnit. Meget større end lille Danmark.' For sit grænseløst nyskabende album modtog hun desuden Steppeulvs - prisen i 2021 for 'Årets producer' og en nominering som 'Årets eksperimenterende udgivelse' ved Danish Music Award Jazz i 2021. Astrid Engberg har optrådt på bl.a. SPOT Festival. Heartland Festival, STRØM Festival, Lille Vega, Radar, Jayide Jazz Festival, DMA Jazz, Statens Museum for kunst og P8 Jazz Alive i DR Koncerthuset.</p> </div>",
      },
      {
        name: "Cumbian Colors",
        identifier: "cumbian-colors",
        socials: {
          instagram: "https://www.instagram.com/cumbian_colors/",
          facebook: "https://www.facebook.com/profile.php?id=100064413376302",
          website: "",
          spotify: "4MLdFWfIzk10DTDnTti05e",
        },
        type: "concert",
        date: 1675276000,
        location: "Pitstop",
        image: "https://i.ibb.co/sqM5CdY/cumbian-colors.jpg",
        header: "https://i.ibb.co/sqM5CdY/cumbian-colors.jpg",
        body: "<div> <h2>Om Cumbian Colors</h2> <p>'Cumbian Colors is the new ensemble from the oldest constellation of Cumbia in Copenhagen, but with a new sound and original songs that keep up with the spirit and tradition of Cumbia bands from 60 - 70 in Colombia where the rich clarinete melodies will match the wildness of the african tradition in Latinamerica... a fine balance between popular folk music with tropical dance orchestra. you can look forward to a super party like in the old days but in new times'</p> <br> <p>Recently nominated for the Danish World Music Award 2022.</p> </div>",
      },
      {
        name: "Dillistone",
        identifier: "dillistone",
        socials: {
          instagram: "https://www.instagram.com/dillistoned/",
          facebook: "https://www.facebook.com/DillistoneMusic",
          website: "",
          spotify: "7ypPN35cJ9wfF2Zs7aYS33",
        },
        type: "concert",
        date: 1675276000,
        location: "Pitstop",
        image: "https://i.ibb.co/W3WFhcJ/dillistone.jpg",
        header: "https://i.ibb.co/W3WFhcJ/dillistone.jpg",
        body: "<div> <h2>Om Dillistone</h2> <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi recusandae animi id ut nobis? Distinctio earum vitae itaque quia. Quia recusandae ipsa possimus sed cum esse, alias illo obcaecati maxime?</p> </div>",
      },
      {
        name: "Emma Holten",
        identifier: "emma-holten-talk",
        socials: {
          instagram: "https://www.instagram.com/emma.holten/",
          facebook: "https://www.facebook.com/emmamarieholten",
          website: "https://www.emmaholten.com/",
        },
        type: "talk",
        date: 1275276000,
        location: "Pitstop",
        image: "https://i.ibb.co/YtfRwBt/emma-holten.jpg",
        header: "https://i.ibb.co/YtfRwBt/emma-holten.jpg",
        body: "<div> <h2>Om Emma Holten</h2> <p>Vi får fremlagt økonomi som en uangribelig sandhed. Man fortæller os, at de penge, der står på et menneskes bankkonto, afspejler den værdi, de har for samfundet. Men hvem bestemmer, hvad vi er værd? Og hvad vi som samfund har råd til?</p> <br> <p>Feministisk økonomi vender vores traditionelle økonomier på hovedet og spørger: hvad er alt det gratis egentlig værd? Naturen, fritiden, familien og vennerne? Og hvorfor føles det som om, de gratis ting er de sværeste at få tid til?</p> <br> <p>Kom med på en rejse gennem økonomiens historie, og måske ind i en fremtid, hvor vi får mere af alt det, der faktisk gør livet værd at leve!</p> </div>",
      },
      {
        name: "Ipek Yulo",
        identifier: "ipek-yulo",
        socials: {
          instagram: "",
          facebook: "",
          website: "",
          spotify: "5TIy4svVCpewV2guElzwB7",
        },
        type: "concert",
        date: 1675276000,
        location: "Pitstop",
        image: "https://i.ibb.co/RTcZX9W/ipek-yulo.jpg",
        header: "https://i.ibb.co/RTcZX9W/ipek-yulo.jpg",
        body: "<div> <h2>Om Ipek Yulo</h2> <p>En intens of velspillet blanding af musik fra alle verdenshjørner</p> <br> <p>Ipek Yolu er det tyrkiske navn for Silkevejen, som forbandt Østen og Vesten.</p> <br> <p>Bandet spiller en dynamisk og musikalsk velkrydret gryderet med ingredienser som Afro, Jazz, Hiphop og psykedelisk musik fra Anatolien. Lyden er mere funky og svingende end nogensinde før, hvilket gør denne live oplevelse til noget helt usædvanligt, som du absolut ikke må gå glip af! Musikken indeholder noget til både krop og hjerne, og sætter med garanti gang i dansegulvet, når tromme og bas grooves blandes med catchy Saz melodier og brændende synthesizer soloer</p> <br> <p>Ipek Yolu har gjort sig bemærket på den dans ke musikscene med koncerter på spillesteder og festivaler i Danmark og udlandet. Fx SPOT Festival, Alice Cph, Atlas & Radar i Aarhus, Altonale i Hamborg, Foire du Valais festival i Schweiz, og ikke mindst en ekstremt vellykket koncert på Roskilde Festival med top anmeldelser. Bandet blev i 2020 nomineret til årets roots live navn ved Danish Music Awards Roots. Rolling Stone gav desuden bandets debutalbum 4 ud af 5 stjerner.</p> <br> <p>Ipek Yolu består af Orhan Özgur på Saz, Olaf Brinch på bas, Frederik Emil Bülow på trommer og Malthe Jepsen på keys. Disse musikere har spillet i så forskellige bands som Hudna, Sorten Muld, Junglelyd, Abekejser, Clapper Music og AddisAbabaBand, og det kan høres!</p> </div>",
      },
      {
        name: "Kamma",
        identifier: "kamma",
        socials: {
          instagram: "https://www.instagram.com/kammaishere/",
          facebook: "https://www.facebook.com/kammaishere",
          website: "",
          spotify: "5pUS7wijCmJYhSLasDlLLj",
        },
        type: "concert",
        date: 1675276000,
        location: "Pitstop",
        image: "https://i.ibb.co/HXwYpwT/kamma.jpg",
        header: "https://i.ibb.co/HXwYpwT/kamma.jpg",
        body: "<div> <h2>Om Kamma</h2> <p>D. 11. November udgiver Kamma sit imødesete debutalbum 'Diary', og med de foreløbige fire singler har hun allerede slået fast, at 'Diary' i den grad er et lyt værd - en sårbar dagbog, der indeholder tusinde skatte, hvis man tør åbne op.</p> <br> <p>På sin debut-EP 'Momentary Emotions lukkede Kamma os alle ind i sing egen sorgproces. EP'en afspejlede Kammas inderste og var overskygget af et mørke, der kredsede om hendes mors kroniske sygdom, alzheimers. Kammas debut-album 'Diary' begæver sig stadig i det skrøbelige og intime univers, der tager udgangspunkt i Kammas egen historie om at være datter til en kronisk syg forælder, som at sætte grænser over for andre og om at indse sit eget værd som menneske. Men på mange måder markerer albummet starten på et nyt kapitel for den 28-årige musiker.</p> <br> <p>Lyden af 'Diary' er poppet, men udfordrende og rå. Det hørte man allerede på førstesinglen 'Good Daughter', som viste en ny side af Kamma med en minimalistisk pop-produktion, og en vokallinje med flere spring og emotionelle detaljer end før. Den udvikling blev også underbygget af de efterfølgende singler 'Crying Again', 'Lonely Girl' og 'Open Your Eyes'. Albummet byder på mange flere smukke og edgy popsange fra Kamma.</p> <br> <p>Kamma har det seneste år optrådt på SPOT festival, varmet op for Jung i Royal Arena, spillet i Store Vega som support for Lydmor og hendes singler 'Good Daughter' og 'Crying Again' har været i krafitg rotation på både P3 og P4. 'Good Daughter' blev også P3's uundgåelige.</p> </div>",
      },
      {
        name: "Krydsfelt 2.0",
        identifier: "krydsfelt-20",
        socials: {
          instagram: "",
          facebook: "",
          website: "",
        },
        type: "concert",
        date: 1675276000,
        location: "Pitstop",
        image: "https://i.ibb.co/MNFnYfm/krydsfelt-20.jpg",
        header: "https://i.ibb.co/MNFnYfm/krydsfelt-20.jpg",
        body: "<div> <h2>Om Krydsfelt 2.0</h2> <p>To musikere. To vidt forskellige musikkulturer. Musik på tværs.</p> <br> <p>Krydsfelt er et musikalsk eksperiment, der undersøg er hvad der kan ske, når man sætter to musikere fra to vidt forskellige musikkulturer sammen for at skabe ny musik og fortolke eksisterende musik.</p> <br> <p>I Krydsfelt mødes komponist og musiker Mathias Heise som normalt spiller funk, fusionsjazz, med elektronisk musiker Joakim Moesgaard. De spiller og fortolker sammen kompositioner skrevet til Krydsfelt af Mathias Heise.</p> <br> <p>Sammen vil de på scenen spille indøvende numre og improvisere sig frem til helt nye numre. Vi lover det bliver festligt, energisk og en absolut kæmpeoplevelse.</p> <br> <p>Krydsfelt blev gennemført første gang i 2018 og vandt JazzDanmarkprisen 2018 for 'årets nytænkende koncertoplevelse.'</p> </div>",
      },
      {
        name: "Selvforsynende Villahave",
        identifier: "selvforsynende-villahave-talk",
        socials: {
          instagram: "",
          facebook: "https://www.facebook.com/groups/1032030250236543",
          website: "",
        },
        type: "talk",
        date: 1675276000,
        location: "Pitstop",
        image: "https://i.ibb.co/gSfxYqB/selvforsynende-villahave.jpg",
        header: "https://i.ibb.co/gSfxYqB/selvforsynende-villahave.jpg",
        body: "<div> <h2>Om Selvforsynende Villahave - Talk</h2> <p>Line Øskov Knudsen, der står bag Facebook - gruppen ’Den selvforsynende have’ med knap 10.000 følgere, holder foredrag om sin have.</p> <br> <p>Line bor i et helt almindeligt parcelhus med have i Kolding. Haven har hun omdannet fra at være en have med græs og blomster til et gigantisk spisekammer, der forsyner familien på fem med grøntsager og frugter året rundt.</p> <br> <p>Til foredraget vil Line fortælle om sit arbejde med at udvikle sin have, og hun videregiver sine bedste tips og tricks om selvforsyning. Der bliver god lejlighed til at stille spørgsmål.</p> </div>",
      },
      {
        name: "Sulka",
        identifier: "sulka",
        socials: {
          instagram: "https://www.instagram.com/ungehundemund/",
          facebook: "https://www.facebook.com/sulka.dk",
          website: "https://sulka.dk/",
          spotify: "467BSFPrqZP3HT6dXzsBqv",
        },
        type: "concert",
        date: 1675276000,
        location: "Pitstop",
        image: "https://i.ibb.co/R201J6s/sulka.jpg",
        header: "https://i.ibb.co/R201J6s/sulka.jpg",
        body: "<div> <h2>Om Sulka</h2> <p>SULKA er rapper mere end noget andet. Med et stålsat fokus på teknisk raffineret tekstskrivning og et ubesværet, legende flow, formår hun at sætte spørgsmålstegn ved standarden for de allerede etablerede rap-giganter.</p> <br> <p>SULKA kom ind fra siden på den danske rapscene og spiste den til morgenmad. Hendes debutalbum Epoker, produceret og udgivet af Tue Track, er et de bedste danske rap - album i nyere tid. Selvom SULKAs tunge og selvsikre stemmeføring lægger direkte op til klas sisk ’her kommer jeg’-rap, kan hun såvel som at uddele verbale lussinger, ligeledes invitere lytteren dybere ind, i det de mere sårbare emner. Tonelejet svinger fra det smukke til det benhårde, og man er som lytter ikke i tvivl om, at man er i møde med en form for autodidakt musikalitet og intuitiv sangskrivning.</p> <br> <p>Talent man ikke kan lære via andet end at leve livet.</p> </div>",
      },
      {
        name: "Suni",
        identifier: "suni",
        socials: {
          instagram: "https://www.instagram.com/suniwillbefree/",
          facebook: "https://www.facebook.com/Suniwillbefree",
          website: "",
          spotify: "2KHa9hXUmX3jfm5YWm7LwC",
        },
        type: "concert",
        date: 1675276000,
        location: "Pitstop",
        image: "https://i.ibb.co/RpqxKVh/suni.jpg",
        header: "https://i.ibb.co/RpqxKVh/suni.jpg",
        body: "<div> <h2>Om SUNI</h2> <p>SUNIs musik placerer sig mellem kunsten og poppen og har med sit poetiske danske tekstunivers og fængende melodier fundet sin egen plads på den danske musikscene. Suni fik publikummet og mediernes opmærksomhed, da han i 2020 udgav singlerne Allernærmest og Tirsdagsstemning. Begge sange er blevet spillet flittigt på DR, og skabte efterfølgende vejen til scenen på blandt andet Train og Lillle Vega.</p> </div>",
      },
      {
        name: "Szim",
        identifier: "szim",
        socials: {
          instagram: "https://www.instagram.com/szim__/",
          facebook: "https://www.facebook.com/szimszimmer",
          website: "",
          spotify: "41x4mjrHp3B0fLf7rFktcT",
        },
        type: "concert",
        date: 1675276000,
        location: "Pitstop",
        image: "https://i.ibb.co/3yhzzdT/szim.jpg",
        header: "https://i.ibb.co/3yhzzdT/szim.jpg",
        body: "<div> <h2>Om Szim</h2> <p>Med sin nye single ”Bambi”, har Szim fået understreget at der er en ny fremadstormende artist, som har noget at tilbyde til den danske musik scene.</p> <br> <p>Szim er 25 år og opvokset i Søborg. Som 6-årig fik hun sin første guitar, men det var først som 17-årig, at hun for alvor begyndte at skrive tekster og rappe. I starten var det noget hun kun gjorde for sig selv, indtil hun gennem en fætter hørte om et kommunalt hip hop studie i Gladsaxe. Der kom hun så en gang om ugen igennem en længere periode, hvor hun arbejdede mere med sine tekster og rap. Men det var først i 2020 at hendes musikalske rejse for alvor tog fart og debut - singlen ’Pokus’ udkom.</p> <br> <p>Szim fulgte hurtigt op med nummeret ’Dårlig Til At Svare’ der røg direkte fra Bobler på P3 listen ind på en 2. plads og lå på listen i 5 uger. Soundvenue skrev flot om nummeret: 'Szim serverer en lækker omgang klubbet poprap på sin blot anden single, ‘Dårlig til at svare’. Hun veksler problemfrit mellem at synge og rappe, mens Arto Eriksens (red. Yo Johnny) følsomme housebeat flot understøtter hendes flow.'</p> <br> <p>Siden har Szim udgivet flere singler og spillet utallige koncerter både i eget navn og som opvarmning for flere prominente navne. Senest har Szim Distortion og LiveCamp på Smukfest.</p> </div>",
      },
      {
        name: "Tettix Hexer",
        identifier: "tettix-hexer",
        socials: {
          instagram: "https://www.instagram.com/megastorhest/",
          facebook: "",
          website: "",
          spotify: "3CPIQ7xQ4flFItDS8f7wqa",
        },
        type: "concert",
        date: 1675276000,
        location: "Pitstop",
        image: "https://i.ibb.co/F7ySrY2/tettix-hexer.jpg",
        header: "https://i.ibb.co/F7ySrY2/tettix-hexer.jpg",
        body: "<div> <h2>Om Tettix Hexer</h2> <p>Tettix Hexer is a well-known face on the Danish underground scene of Copenhagen, known for altering the medium of live music by using biometric and environmental augments to create intensely hard - hitting live shows, resulting in the creation of a sensoric hub in harmonic chaos. Behind the moniker is the eccentric Danish sound sculptor, radio host, composer and producer, Jens Leonhard Aagaard, working in the intersections of technology, digital gardening, chaos magick and beauty. In recent years, the project has been operating within the framework of using musical language as a theological approach to erase the divide between human and emergent AI. What sets Tettix Hexer apart might also be his love for dif ferent devotional music - studying ragas in India, a love for cosmic jazz and new age - and his rock background playing dreampop/shoegaze. Being a multi-instrumentalist, his compositions are never confined to his laptop (using EWI, various sensors, electri c guitars, live drums and more in his electronic compositions). Tettix Hexer just released his sophomore album 'Aero'.</p> </div>",
      },
      {
        name: "The Physics House Band",
        identifier: "the-physics-house-band",
        socials: {
          instagram: "https://www.instagram.com/thephysicshouseband/",
          facebook: "https://www.facebook.com/thephysicshouseband",
          website: "https://unearthly-vision.bandcamp.com/",
          spotify: "30EilmonVXftR1pWoALezP",
        },
        type: "concert",
        date: 1675276000,
        location: "Pitstop",
        image: "https://i.ibb.co/9VQsLgN/the-physics-house-band.jpg",
        header: "https://i.ibb.co/9VQsLgN/the-physics-house-band.jpg",
        body: "<div> <h2>Om The Physics House Band</h2> <p>Formed in 2012, the band comprises multi-instrumentalists Sam Organ and Adam Hutchinson and drummer Dave Morgan, who met while studying at University in Brighton, and were initially members of a five-piece band. They initially gained a following from their video for 'Titan' on YouTube. The band's debut album, Horizons/Rapture, was released in 2013. Comedian Stewart Lee, in a Sunday Times review of Horizons/Rapture wrote: 'This youthful Brighton trio’s debut offers ugly-beautiful instrumental progressive rock that ageing King Crimson fans think no-one can play anymore.' The band's second album, Mercury Fountain, was released in 2017.[4] The title of this album references an Alexander Calder sculpture of the same name that Hutchinson saw in Madrid. The album was described in The Independent as 'a cataclysmic, cyclical odyssey that spirals in and out of kaleidoscopic pockets, serene ambience and frenetic, apoplectic wig-outs'.</p> <br> <p>The band's music has been described as 'psychedelic experimental rock', 'psych-rock', and 'psychedelic, experimental math-rock'. Paul Lister, writing for The Guardian, described them as a 'perfect storm of rock, prog, psych, cosmic, tech metal and jazz fusion', stating that the band members played 'about 33 instruments' between them</p> </div>",
      },
      {
        name: "Ung Scene",
        identifier: "ung-scene",
        socials: {
          instagram: "https://www.instagram.com/ung.scene/",
          facebook: "",
          website: "https://tobbers.nu/",
        },
        type: "concert",
        date: 1675276000,
        location: "Pitstop",
        image: "https://i.ibb.co/6vP7tCB/ung-scene.jpg",
        header: "https://i.ibb.co/6vP7tCB/ung-scene.jpg",
        body: "<div> <h2>Om Unge Scene</h2> <p>Gik du glip af Ung Scene - eller har du bare glædet dig til at det sker igen? Så har vi rigtig gode nyheder! Ung Scene vender stærkt tilbage på 27B i Klostergade fredag d. 3. februar som en del af Kold Festival 2023.</p> <br> <p>Ung Scene er en aften fyldt med lækker musik spillet af unge. I mellem de forskellige acts kan du høre sprøde plader vendt af vinyl - DJ’s. Der bliver mulighed for at købe lækker mad og drikkevarer, som man kan nyde gennem aftenen. Denne gang kommer Ung Scene til at fungere som en musikalsk oase som du kan gå til og fra, når du ikke er til nogen af de andre fede koncerter der finder sted rundt i byen til Kold Festival. Du er selvfølgelig også velkommen til bare at blive hængende. Første band går på kl. 17.30 og vi regner med at runde af omkring kl. 20.30. Så hvis du er til hygge blandet med sprød, ny ung musik og mulighed for lækker mad, så ses vi på 27B d. 3. februar.</p> </div>",
      },
    ],
  });
});

const port = process.env.PORT || 3000;

// Enable server
server.listen(port, () => {
  console.log(`Time: ${Math.round(Date.now() / 1000)}`);
  console.log(`Package: ${require("./package.json").name}`);
  console.log(`Version: ${require("./package.json").version}`);
  console.log(`Description: ${require("./package.json").description}`);
  console.log(`Running server on port ${port}`);
});
