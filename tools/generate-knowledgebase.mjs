import fs from "fs";

const topics = [
  ["hoofdhonger-vs-buikhonger-na-maagverkleining", "Hoofdhonger vs buikhonger na maagverkleining"],
  ["dumping-vroeg-en-laat-zo-herken-je-het-na-maagverkleining", "Dumping, vroeg en laat, zo herken je het na maagverkleining"],
  ["altijd-koud-na-afvallen-wat-gebeurt-er", "Altijd koud na afvallen, wat gebeurt er"],
  ["eten-zit-vast-stappenplan-zonder-paniek", "Eten zit vast, stappenplan zonder paniek"],
  ["eten-en-drinken-scheiden-zo-maak-je-het-haalbaar", "Eten en drinken scheiden, zo maak je het haalbaar"],
  ["eiwit-doelen-per-dag-simpele-richtlijn-na-maagverkleining", "Eiwit doelen per dag, simpele richtlijn na maagverkleining"],
  ["plateaus-wat-is-het-en-wanneer-is-het-echt-een-plateau", "Plateaus, wat is het en wanneer is het echt een plateau"],
  ["volheidssignalen-waarom-je-lichaam-anders-praat", "Volheidssignalen, waarom je lichaam anders praat"],
  ["uit-eten-na-maagverkleining-zo-hou-je-regie", "Uit eten na maagverkleining, zo hou je regie"],
  ["boodschappen-na-maagverkleining-snelle-keuzes-in-de-supermarkt", "Boodschappen na maagverkleining, snelle keuzes in de supermarkt"],
  ["alcohol-na-maagverkleining-waarom-het-harder-aankomt", "Alcohol na maagverkleining, waarom het harder aankomt"],
  ["emotie-eten-na-operatie-wat-helpt-wel", "Emotie eten na operatie, wat helpt wel"],
  ["darmgeluiden-en-rommel-normaal-of-niet", "Darmgeluiden en rommel, normaal of niet"],
  ["vezels-na-maagverkleining-hoe-bouw-je-op", "Vezels na maagverkleining, hoe bouw je op"],
  ["eiwitrepen-waar-let-je-op", "Eiwitrepen, waar let je op"],
  ["proteine-pudding-en-kwark-zo-vergelijk-je-labels", "Proteïne pudding en kwark, zo vergelijk je labels"],
  ["voeding-op-werk-meal-prep-zonder-gedoe", "Voeding op werk, meal prep zonder gedoe"],
  ["slaap-en-afvallen-waarom-het-uitmaakt", "Slaap en afvallen, waarom het uitmaakt"],
  ["bewegen-zonder-sportschool-neat-in-je-dag", "Bewegen zonder sportschool, NEAT in je dag"],
  ["losse-huid-wat-kun-je-doen-en-wat-niet", "Losse huid, wat kun je doen en wat niet"],
  ["complimenten-en-zelfbeeld-waarom-het-dubbel-kan-voelen", "Complimenten en zelfbeeld, waarom het dubbel kan voelen"],
  ["social-life-en-grenzen-omgaan-met-mensen-die-raar-doen", "Social life en grenzen, omgaan met mensen die raar doen"],
  ["reisdag-na-maagverkleining-eten-en-drinken-onderweg", "Reisdag na maagverkleining, eten en drinken onderweg"],
  ["supplementen-en-bloedwaarden-hoe-je-uitslagen-leest-na-maagverkleining", "Supplementen en bloedwaarden, hoe je uitslagen leest na maagverkleining"]
];

const sectionTemplates = [
  "Na een operatie verandert niet alleen je maag, maar ook je ritme, je keuzes en je hoofd. Bij {title} helpt het om het simpel te houden: kleine stappen, korte checks en een plan dat je ook op een drukke dag volhoudt. Jij hoeft niet perfect te zijn. Jij hebt baat bij herhaalbare routines die passen bij werk, gezin en energie. Daarom werken we met praktische regels die je direct kunt testen. Denk aan vaste eetmomenten, een korte voorbereiding in de avond en een snelle check in de ochtend. Zo voorkom je paniekbeslissingen en bouw je vertrouwen op.",
  "Wat vaak misgaat, is dat mensen te laat bijsturen. Je merkt pas na een paar dagen dat je ritme weg is, en dan voelt alles meteen zwaar. Bij {title} wil je sneller signalen pakken. Dat kan met een mini logboek: noteer twee weken lang je eetmomenten, drinken, energie en eventuele klachten. Niet om streng te zijn, maar om patronen te zien. Zodra je patroon zichtbaar wordt, kun je gericht aanpassen. Die aanpak is rustiger dan telkens opnieuw beginnen. Het geeft grip en maakt gesprekken met je behandelteam ook concreter.",
  "Kies bij dit onderwerp één kernactie voor de komende zeven dagen. Bijvoorbeeld: elke ochtend je dagdoel noteren, elke middag een proteïnemoment inplannen, of elke avond een snackmoment voorbereiden. Te veel veranderingen tegelijk lijken slim, maar houden zelden lang stand. Met één kernactie merk je sneller effect en groeit je vertrouwen. Daarna voeg je stap twee toe. Dit is precies hoe duurzame gewoontes ontstaan: klein, helder en zonder drama. Je mag streng zijn op structuur, maar mild op jezelf als het een keer schuurt.",
  "Ook je omgeving speelt mee. Familie, vrienden of collega’s snappen niet altijd wat jij nodig hebt. Leg daarom kort uit wat voor jou werkt. Zeg bijvoorbeeld dat jij beter gaat op kleine porties, dat jij drinken en eten scheidt, of dat jij eerst wil proeven voordat je iets bestelt. Je hoeft geen heel verhaal te geven. Een duidelijke zin is genoeg. Door dat vooraf te doen, voorkom je druk aan tafel. Je houdt regie zonder strijd. Dat maakt {title} in het echte leven veel beter vol te houden.",
  "Gebruik tools om het simpel te maken. De timer voor eten en drinken helpt met ritme, de eiwitcalculator geeft inzicht in je dagtotaal en de voorraadteller voorkomt dat je zonder basis zit. Tools vervangen geen medische begeleiding, maar ze geven je wel dagelijkse steun. Dat is precies wat veel mensen missen tussen afspraken door. Als jij consequent een paar minuten per dag investeert in overzicht, scheelt dat veel twijfel. Bij {title} is die rust vaak het verschil tussen ad hoc reageren en slim vooruit plannen.",
  "Bij klachten is timing belangrijk. Als iets vaker terugkomt, kijk dan naar je volgorde: wat at je, hoe snel at je, wat dronk je erbij, en hoe voelde je je vooraf. Vaak zit de sleutel in combinatie en tempo, niet in één product. Door die volgorde te checken, kun je veilig experimenteren. Verander één ding tegelijk en geef het een paar dagen. Zo zie je wat echt werkt voor jouw lijf. Deze aanpak helpt je ook om minder te piekeren, omdat je werkt met feiten in plaats van aannames.",
  "Voeding na maagverkleining blijft maatwerk. Toch zijn er basisregels die voor bijna iedereen helpen: genoeg eiwit, rustige opbouw van vezels, goede hydratatie en herhaalbare eetmomenten. Bij {title} gelden die principes ook. Maak het jezelf makkelijk met een vaste boodschappenlijst en een korte weekplanning. Als je basis op orde is, heb je meer ruimte voor flexibiliteit. Dat betekent niet dat alles altijd volgens plan gaat. Het betekent dat je sneller terugkomt in je ritme als het even misloopt.",
  "Mentale belasting is vaak onderschat. Je bent bezig met je lichaam, maar ook met identiteit, verwachtingen en reacties van anderen. Dat kost energie. Bouw daarom bewust herstelruimte in je week. Een wandeling, een rustige lunch zonder scherm, of een check-in met iemand uit de community kan al genoeg zijn. Door dit serieus te nemen, voorkom je dat stress je keuzes overneemt. Bij {title} is mentale rust geen luxe, maar een praktisch onderdeel van je resultaat op de lange termijn.",
  "Maak je plan concreet voor moeilijke momenten. Wat doe je op feestjes, bij lange werkdagen of op reisdagen? Schrijf drie scenario’s uit met een simpele back-up. Bijvoorbeeld: neem altijd een proteïneoptie mee, kies eerst water en bestel later, of splits een maaltijd direct in twee delen. Als je plan vooraf klaarstaat, hoef je ter plekke minder te onderhandelen met jezelf. Dat scheelt wilskracht. En wilskracht is beperkt, zeker als je moe bent. Structuur wint het dan van motivatie.",
  "Tot slot: bespreek signalen op tijd met je eigen ziekenhuis of behandelteam. Zeker bij terugkerende klachten, sterke vermoeidheid of twijfel over supplementen. Dutch Goose is er voor praktische steun, niet om medische zorg te vervangen. Gebruik deze gids als routekaart: test klein, meet eerlijk, stuur bij en houd het haalbaar. Bij {title} is consistentie belangrijker dan perfectie. Elke rustige herhaling telt. Zo bouw je aan een leven dat niet draait om regels, maar om regie."
];

const out = topics.map(([slug, title], i) => {
  const body = sectionTemplates.map((s) => s.replaceAll("{title}", title));
  return {
    slug,
    title,
    description: `${title}. Praktische uitleg in duidelijke taal, speciaal voor je leven na maagverkleining.`,
    keywords: [
      "maagverkleining",
      title.toLowerCase(),
      "dutch goose",
      "baribuddies",
      "leven na operatie"
    ],
    updatedAt: "2026-02-21",
    readingMinutes: 8,
    body,
    faqs: [
      {
        question: `Is ${title.toLowerCase()} voor iedereen hetzelfde?`,
        answer:
          "Nee. Je basis kan vergelijkbaar zijn, maar je reactie en tempo verschillen per persoon. Kijk naar je eigen signalen en overleg bij twijfel met je team."
      },
      {
        question: "Wanneer moet ik medische hulp vragen?",
        answer:
          "Bij heftige of terugkerende klachten, uitdroging, aanhoudende pijn of onzekerheid over medicatie en supplementen neem je contact op met je ziekenhuis."
      },
      {
        question: "Welke Dutch Goose tool past hierbij?",
        answer:
          i % 2 === 0
            ? "Start met de eten-drinken timer voor ritme, en gebruik daarna de eiwitcalculator voor dagoverzicht."
            : "Start met de eiwitcalculator voor je basis, en gebruik de voorraadteller zodat je geen gaten in je routine krijgt."
      }
    ]
  };
});

fs.writeFileSync("data/knowledgebase.json", `${JSON.stringify(out, null, 2)}\n`);
console.log(`Generated ${out.length} artikelen`);
