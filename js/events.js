function getTicketDomain(url) {
  if (!url) return '';
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch(e) { return ''; }
}
const CAT_COLORS = {festival:'#5b8ff9',volksfest:'#c8974e',afterwork:'#a78bfa',sonstige:'#34d399',family:'#34d399',russian:'#f472b6',strand:'#06b6d4',beachparty:'#fbbf24',messe:'#64748b',flohmarkt:'#84cc16',weinfest:'#a855f7',privat:'#c9a227',zoo:'#10b981',freizeit:'#f97316',kinder:'#ec4899',stadtfest:'#8b5cf6',sport:'#ef4444'};
const CAT_LABELS = {festival:'Festival',volksfest:'Volksfest',afterwork:'After Work / Club Night',sonstige:'Sonstiges',family:'Familie',russian:'🇷🇺 Russian Event',strand:'🏖️ Stadtstrand',beachparty:'🏝️ Beach Party',messe:'🏛️ Messe',flohmarkt:'🛍️ Flohmärkte',weinfest:'Weinfest',privat:'🔒 Privat',zoo:'🦁 Zoo & Tiere',freizeit:'🎡 Freizeit & Outdoor',kinder:'🎠 Kinder & Familie',stadtfest:'🎪 Stadt- & Kulturfeste',sport:'🏃 Sport & Action'};
const MONTHS = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']
const MONTHS_S = ['Jan','Feb','Mrz','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];
const DAYS = ['So','Mo','Di','Mi','Do','Fr','Sa'];
const COORDS = {
  // ── Kernstädte ──
  'Nürnberg':[49.452,11.077],'Erlangen':[49.598,11.004],'Fürth':[49.478,10.989],
  'Schwabach':[49.328,11.021],'Zirndorf':[49.444,10.955],'Oberasbach':[49.430,10.965],
  'Stein':[49.418,10.973],'Herzogenaurach':[49.567,10.882],'Pyrbaum':[49.267,11.183],'Burg Rabenstein':[49.883,11.467],'Freystadt':[49.200,11.333],'Cadolzburg':[49.502,10.860],
  'Roth':[49.245,11.091],'Pleinfeld':[49.102,10.958],'Feucht':[49.378,11.213],
  'Lauf':[49.512,11.278],'Schwaig':[49.484,11.213],
  // ── Viana Events Locations ──
  'Viana Дача Party':[49.38481,11.10000],
  // ── Nürnberg Stadtteile ──
  'Nürnberg-Gostenhof':[49.458,11.059],'Nürnberg-Schweinau':[49.440,11.055],
  'Nürnberg-Mögeldorf':[49.452,11.121],'Nürnberg-Laufamholz':[49.454,11.173],
  'Nürnberg-Zerzabelshof':[49.448,11.130],'Nürnberg-Eibach':[49.418,11.058],
  'Nürnberg-St. Johannis':[49.467,11.059],'Nürnberg-Kleinreuth':[49.439,11.048],
  'Nürnberg-Großreuth':[49.441,11.063],'Nürnberg-Lohe':[49.437,11.073],
  'Nürnberg-Gebersdorf':[49.434,11.020],'Nürnberg-Schniegling':[49.469,11.030],
  'Nürnberg-Wetzendorf':[49.471,11.019],'Nürnberg-Almoshof':[49.483,11.017],
  'Nürnberg-Altenfurt':[49.400,11.148],'Nürnberg-Buch':[49.413,11.162],
  'Nürnberg-Gartenstadt':[49.448,11.140],'Nürnberg-Ziegelstein':[49.471,11.138],
  'Nürnberg-Kornburg':[49.380,11.095],'Nürnberg-Worzeldorf':[49.378,11.068],
  'Nürnberg-Reichelsdorf':[49.394,11.034],'Nürnberg-Katzwang':[49.368,11.035],
  'Nürnberg-Langwasser':[49.418,11.121],'Nürnberg-Buchenbühl':[49.433,11.147],
  'Nürnberg-Boxdorf':[49.478,11.054],'Nürnberg-Großgründlach':[49.490,11.033],
  'Nürnberg-Schnepfenreuth':[49.432,11.001],'Nürnberg-Mühlhof':[49.445,11.157],
  'Nürnberg-Fischbach':[49.416,11.192],'Nürnberg-Brunn':[49.391,11.181],
  'Nürnberg-Höfles':[49.496,11.158],'Nürnberg-Klaragasse':[49.458,11.073],
  'Nürnberg-Neunhof':[49.505,11.085],'Nürnberg-Weiherhof':[49.461,11.038],
  'Nürnberg-Schoppershof':[49.465,11.105],'Nürnberg-Wöhrd':[49.455,11.087],
  'Nürnberg-Kraftshof':[49.494,11.074],'Nürnberg-Lohe':[49.437,11.073],
  'Nürnberg-Reichelsdorf':[49.394,11.034],'Nürnberg-Ziegelstein':[49.471,11.138],
  // ── Fürth Stadtteile ──
  'Fürth-Sack':[49.463,10.994],'Fürth-Vach':[49.523,10.965],
  'Fürth-Stadeln':[49.509,10.958],'Fürth-Burgfarrnbach':[49.496,10.920],
  'Fürth-Hardhöhe':[49.453,10.973],'Fürth-Eigenes Heim':[49.476,11.000],
  'Fürth-Poppenreuth':[49.495,11.004],'Fürth-Ronhof':[49.467,10.985],
  'Fürth-Fürberg':[49.509,10.978],'Fürth-Unterfarrnbach':[49.484,10.937],
  'Fürth-Atzenhof':[49.447,10.942],
  // ── Oberasbach Ortsteile ──
  'Oberasbach-Altenberg':[49.418,10.952],'Oberasbach-Rehdorf':[49.410,10.982],
  'Oberasbach-Unterasbach':[49.427,10.956],
  // ── Schwabach Ortsteile ──
  'Schwabach-Dietersdorf':[49.311,11.022],'Schwabach-Limbach':[49.342,11.049],
  'Schwabach-Unterreichenbach':[49.314,11.060],'Schwabach-Wolkersdorf':[49.315,11.050],
  // ── Roth Ortsteile ──
  'Roth-Eckersmühlen':[49.263,11.044],'Roth-Leerstetten':[49.310,11.059],
  'Roth-Mosbach':[49.231,11.078],'Roth-Pfaffenhofen':[49.287,11.111],
  'Roth-Ruppmannsburg':[49.275,11.096],
  // ── Cadolzburg / Wachendorf ──
  'Cadolzburg-Wachendorf':[49.495,10.847],
  // ── Region ──
  'Würzburg':[49.787,9.936],'Augsburg':[48.370,10.897],'Bamberg':[49.900,10.902],
  'Regensburg':[49.013,12.101],'Regensburg – Jahninsel':[49.015,12.096],'Bayreuth':[49.945,11.578],'Ansbach':[49.298,10.572],'Ansbach – Altstadt':[49.300,10.574],
  'Nördlingen':[48.851,10.489],'Forchheim':[49.719,11.058],
  'Kitzingen':[49.735,10.167],'Volkach':[49.865,10.222],'Sommerhausen':[49.729,10.004],
  'Rödelsee':[49.714,10.248],'Obernbreit':[49.672,10.143],'Röttingen':[49.508,9.974],
  'Großlangheim':[49.749,10.245],'Kleinlangheim':[49.753,10.272],'Ipsheim':[49.519,10.481],
  'Wipfeld':[49.979,10.151],'Zeil am Main':[50.009,10.583],'Miltenberg':[49.704,9.263],
  'Birkenfeld':[48.907,8.660],'Kulmbach':[50.100,11.444],'Wasserburg am Inn':[48.062,12.236],
  'Lalling':[48.879,13.148],'Landau an der Isar':[48.667,12.692],'Fürstenfeldbruck':[48.178,11.235],
  'Bad Reichenhall':[47.730,12.876],'Schwabmünchen':[48.179,10.757],'Oberstdorf':[47.408,10.279],
  'Dinkelsbühl':[49.071,10.318],'Rothenburg':[49.378,10.186],'Rothenburg ob der Tauber':[49.378,10.186],
  'Geiselwind':[49.770,10.510],'Lichtenfels':[50.143,11.061],'Hirschaid':[49.929,10.993],
  'Ellingen':[49.068,10.971],'Eschenfelden':[49.493,11.771],'Kronach':[50.236,11.330],
  'Lauda-Königshofen':[49.569,9.706],'Andorf':[49.362,10.537],
  'Röttenbach':[49.607,10.941],'Langensendelbach':[49.627,11.039],
  'Langensendelbach bei Erlangen':[49.627,11.039],
  'Andorf bei Ansbach':[49.362,10.537],
  'Obernzenner See':[49.319,10.499],'Pilsach':[49.314,11.427],
  'Meier Hilzhof, Pilsach':[49.314,11.427],
  'Brombachsee':[49.112,10.847],'Brombachsee, Pleinfeld':[49.112,10.847],
  'Poppenhofer Weiher, Herzogenaurach':[49.556,10.879],
  // ── Nürnberg Locations (ohne Stadtteil) ──
  'Airport Nürnberg':[49.497,11.078],'Hafen Nürnberg-Süd':[49.408,11.059],
  'Nürnberger Altstadt':[49.455,11.078],'Katharinenruine, Nürnberg':[49.454,11.078],
  'Marienbergpark, Nürnberg':[49.461,11.017],'Stadionpark Nürnberg':[49.427,11.122],
  'Zeppelinfeld, Nürnberg':[49.423,11.122],'Pegnitzwiesen, Theodor-Heuss-Brücke':[49.453,11.063],
  'Bootshaus Nürnberg, Dutzendteich':[49.422,11.118],
  'Große Straße, Nürnberg':[49.426,11.126],
  'Kristall Palm Beach, Stein':[49.403,11.003],
  'Therme Erding':[48.310,11.920],
  'Design Offices, Königstorgraben 11, 5. OG':[49.447,11.078],
  'Nachtkind, Nürnberg':[49.446,11.080],
  'Nachtkind Nürnberg':[49.446,11.080],
  'Stadtpark Pavillon, Schwabach':[49.330,11.021],
  'Schwabach – Stadtpark':[49.330,11.021],
  'Forchheim – Kellerwald':[49.720,11.063],
  'Forchheim Kellerwald':[49.720,11.063],
  'Waldbad Neustadt/Aisch':[49.582,10.610],
  'Neustadt an der Aisch':[49.582,10.610],
  'Neustadt/Aisch':[49.582,10.610],
  'Cineplex Fürth':[49.477,10.988],
  'Fürth – Cineplex':[49.477,10.988],
  'PARKS Nürnberg':[49.460,11.090],
  'PARKS Nürnberg (Stadtpark, Berliner Platz 9)':[49.460,11.090],
  'Nürnberg – PARKS Stadtpark':[49.460,11.090],
  // ── München ──
  'München':[48.135,11.582],
  'München – Traumhänger Open Air':[48.135,11.582],
  // ── Weiter entfernt (Russian Events etc.) ──
  'Stuttgart':[48.776,9.182],'Stuttgart-Stammheim':[48.834,9.180],
  'Club Vivally, Stuttgart':[48.834,9.180],'Club Vivally Stuttgart':[48.834,9.180],
  'Dornstadt':[48.450,9.943],'Dornstadt bei Ulm':[48.450,9.943],
  'Club MEDUZA, Dornstadt':[48.450,9.943],'Club Meduza Dornstadt':[48.450,9.943],
  'Ulm':[48.401,9.987],
  'Straubing':[48.884,12.575],'Deggendorf':[48.840,12.961],'Büren':[51.551,8.561],'Veitsbronn':[49.476,10.847],'Tuchenbach':[49.476,10.891],'Großhabersdorf':[49.443,10.793],'Obermichelbach':[49.464,10.930],'Ammerndorf':[49.416,10.939],'Roßtal':[49.397,10.875],'Seukendorf':[49.493,10.904],'Puschendorf':[49.507,10.842],'Seckendorf':[49.466,10.867],
  'Gießen':[50.584,8.678],'Kassel':[51.312,9.481],
  'Amberg':[49.445,11.852],'Berlin':[52.520,13.405],
  'Osnabrück':[52.279,8.047],'Kiel':[54.323,10.123],
  'Leipzig':[51.340,12.373],'Cleebronn':[49.066,9.108],
  'Kaisersbach':[48.868,9.663],'Rammingen':[47.979,10.591],
  'Rust':[48.262,7.733],'Plohn':[50.540,12.342],
  'Lohr':[49.989,9.578],'Cham':[49.220,12.659],
  'Reisbach':[48.611,12.645],'Günzburg':[48.454,10.278],
  // ── Neu hinzugefügt KW 18 2026 ──
  'Abenberg':[49.253,10.907],'Pegnitz':[49.752,11.543],
  'Feuchtwangen':[49.168,10.322],'Eggolsheim':[49.757,10.963],
  // ── Neu hinzugefügt KW 19 2026 ──
  'Thalmässing':[49.077,11.212],'Höchstadt an der Aisch':[49.699,10.805],
  'Bad Windsheim':[49.500,10.416],'Ebern':[50.106,10.797],
  'Selb':[50.170,12.133],'Spalt':[49.171,10.929],
  // ── Neu hinzugefügt KW 20 2026 ──
  'Georgensgmünd':[49.203,11.013],'Am Bruckespan, Georgensgmünd':[49.203,11.013],
  'Meistersingerhalle Nürnberg':[49.428,11.092],
  'Orpheum Nürnberg':[49.455,11.064],
  'Stadthalle Fürth':[49.475,10.988],
  'Nürnberg – Meistersingerhalle':[49.428,11.092],
  'Fürth – Stadthalle':[49.475,10.988],
  // ── Neu hinzugefügt KW 21 2026 ──
  'Ottensoos':[49.524,11.328],
  'Behringersdorf':[49.476,11.218],
  'Schwarzenbruck':[49.370,11.225],
  'Hersbruck':[49.511,11.432],
  'Hersbruck – Altstadt':[49.511,11.432],
  'Volkach – Stadtallee':[49.865,10.222],
  'Würzburg – Weinberg am Stein':[49.796,9.915],
  'Würzburg – Marktplatz':[49.795,9.929],
  // ── Neu hinzugefügt KW 23 2026 ──
  'Scherleithen':[49.145,11.075],
  'Fürth – Grüner Baum':[49.479,10.987],
  'Erlangen – Villa Kunterbums':[49.621,10.934],
  // ── Neu hinzugefügt KW 30 2026 ──
  'Abtswind':[49.746,10.406],'Abtswind – Marktplatz':[49.746,10.406],
  // ── Neu hinzugefügt KW 34 2026 ──
  'Eckental':[49.601,11.222],
  'Altdorf bei Nürnberg':[49.385,11.360],
  'Willanzheim':[49.673,10.216],
  'Michelau i. Steigerwald':[49.826,10.415],
  'Dettelbach':[49.799,10.163],
  'Tauberbischofsheim':[49.622,9.663],
  'Iphofen':[49.702,10.264],
  'Heroldsbach':[49.762,10.951],
  'Karlsfeld':[48.226,11.474],
  // ── Neu KW 35 (2026-08-24) ──
  'Ingolstadt':[48.766,11.425],
  'Erding':[48.306,11.907],
  'Lappersdorf':[49.049,12.087],
  'Regenstauf':[49.121,12.128],
  'Veitshöchheim':[49.833,9.883],
  'Taufkirchen':[48.049,11.617],
  'Rothenburg ob der Tauber':[49.377,10.179],
  // ── Neu KW 36 (2026-08-31) ──
  'Coburg':[50.259,10.965],
  'Leinburg':[49.510,11.320],
  'Schnaittach':[49.556,11.345],
  'Happurg':[49.507,11.499],
  'Rückersdorf':[49.492,11.196],
  'Lauf a.d. Pegnitz':[49.512,11.278],
  'Geyer Grounds':[49.441,11.054],
};

const familyEvents = [
  // ─── NEU HINZUGEFÜGT (KW 37 · 2026-09-07) ────────────────────────────────
  {
    cat: 'stadtfest',
    name: 'Weihnachtsmarkt Amberg',
    loc: 'Amberg – Marktplatz',
    start: '2026-11-26',
    end: '2026-12-23',
    free: true,
    desc: 'Traditioneller Weihnachtsmarkt (39. Ausgabe) mit Kutschfahrten und historischem Karussell.',
  },
  {
    cat: 'stadtfest',
    name: 'Romantischer Weihnachtsmarkt Nördlingen',
    loc: 'Nördlingen – Innenstadt',
    start: '2026-11-27',
    end: '2026-12-23',
    free: true,
    desc: 'Über 70 Stände, Kinderkarussell und Krippenweg in der historischen Altstadt.',
  },
  {
    cat: 'stadtfest',
    name: 'Weihnachtsmarkt Dinkelsbühl',
    loc: 'Dinkelsbühl – Spitalhof/Konzertsaal',
    start: '2026-11-23',
    end: '2026-12-21',
    free: true,
    desc: 'Weihnachtsmarkt „Ihr Kinderlein kommet" mit Kunsthandwerk.',
  },
  {
    cat: 'stadtfest',
    name: 'Rother Christkindlesmarkt',
    loc: 'Roth – Marktplatz',
    start: '2026-11-19',
    end: '2026-12-06',
    free: true,
    desc: 'Christkindlesmarkt Donnerstag bis Sonntag in der Rother Innenstadt.',
  },
  {
    cat: 'stadtfest',
    name: 'Oberasbacher Weihnachtsmarkt',
    loc: 'Oberasbach – Rathausplatz',
    start: '2026-12-05',
    end: '2026-12-06',
    free: true,
    desc: 'Weihnachtsmarkt am 2. Adventswochenende auf dem Rathausplatz.',
  },
  {
    cat: 'stadtfest',
    name: 'Weihnachtsmarkt Forchheim',
    loc: 'Forchheim – Kaiserpfalz',
    start: '2026-11-27',
    end: '2026-12-24',
    free: true,
    desc: 'Weihnachtsmarkt rund um die Kaiserpfalz Forchheim.',
  },
  {
    cat: 'stadtfest',
    name: 'Altdorfer Christkindlmarkt',
    loc: 'Altdorf bei Nürnberg – Alte Ziegelei',
    start: '2026-12-03',
    end: '2026-12-06',
    free: true,
    desc: 'Über 30 Aussteller im Innenhof der Alten Ziegelei.',
  },
  {
    cat: 'stadtfest',
    name: 'Steiner Weihnachtsmarkt',
    loc: 'Stein – Mecklenburger Platz',
    start: '2026-11-27',
    end: '2026-11-29',
    free: true,
    desc: 'Weihnachtsmarkt mit Laternenzug vom Rathaus zum Mecklenburger Platz.',
  },
  {
    cat: 'messe',
    name: 'Winterträume Stein (Wintermesse)',
    loc: 'Stein – Schloss Faber-Castell',
    start: '2026-11-13',
    end: '2026-11-15',
    free: false,
    desc: 'Private Winter- und Weihnachtsmesse mit Ausstellern im Schloss Faber-Castell.',
  },
  {
    cat: 'stadtfest',
    name: 'Cadolzburger Adventsmarkt',
    loc: 'Cadolzburg – Burg Cadolzburg',
    start: '2026-11-28',
    end: '2026-11-29',
    free: false,
    desc: 'Advents- und Kunsthandwerkermarkt an der Cadolzburg, Innenhof teils ab 16:15 Uhr frei zugänglich (Termin über Drittquelle, nicht auf cadolzburg.de selbst verifiziert).',
  },
  {
    cat: 'messe',
    name: 'Heimtier Messe',
    loc: 'Nürnberg – Messe Nürnberg',
    start: '2026-10-31',
    end: '2026-11-01',
    free: false,
    desc: 'Haustiermesse parallel zur Consumenta.',
  },
  {
    cat: 'family',
    name: 'Familienmesse „Vom ersten Tritt bis zum ersten Schritt"',
    loc: 'Regensburg – RT-Halle',
    start: '2026-09-13',
    end: '2026-09-13',
    free: false,
    desc: 'Familien- und Babymesse in Regensburg.',
  },
  // ─── NEU HINZUGEFÜGT (KW 36 · 2026-08-31) ────────────────────────────────
  {cat:'freizeit', name:'Schulanfängertag im PLAYMOBIL-FunPark', loc:'Zirndorf – PLAYMOBIL-FunPark', start:'2026-09-15', end:'2026-09-15', free:false, desc:'Erstklässler erhalten am ersten Schultag freien Eintritt in den PLAYMOBIL-FunPark – Begleitpersonen zahlen den regulären Eintritt.', genre:'Aktionstag / Familie', ticket:'https://www.playmobil-funpark.de/aktuelles/veranstaltungen/back-to-school-26', outdoor:true, ageMin:0, price:'Erstklässler frei, Begleitung regulär', oepnv:'Bus 151/113 bis Zirndorf FunPark', parking:'Großer Parkplatz am FunPark'},
  {cat:'stadtfest', name:'Kirchweihmarkt Schwabach', loc:'Schwabach – Altstadt', start:'2026-09-21', end:'2026-09-23', free:true, desc:'Marktstände in der Schwabacher Altstadt begleitend zur Herbstkirchweih – Handwerk, Kulinarik und Kinderprogramm.', genre:'Markt / Stadtfest', ticket:'https://www.schwabach.de/de/schwabach-erleben/veranstaltungen1/jahresueberblick.html', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'S-Bahn S2 bis Schwabach', parking:'Parkhäuser Innenstadt Schwabach'},
  {cat:'kinder', name:'Dschungelbuch – das Musical', loc:'Nürnberg – Meistersingerhalle', start:'2026-10-18', end:'2026-10-18', free:false, desc:'Familienmusical nach dem Klassiker von Rudyard Kipling – Mowgli, Balu und Shir Khan live auf der Bühne.', genre:'Kindermusical', ticket:'https://www.regioactive.de/musical/dschungelbuch-das-musical-nuernberg-meistersingerhalle-2026-10-18-tickets-ptrrnd9KxH', outdoor:false, ageMin:4, price:'Tickets im Vorverkauf', oepnv:'Bus 45/65 bis Meistersingerhalle', parking:'Parkplätze an der Meistersingerhalle'},
  {cat:'flohmarkt', name:'Schwabach trempelt', loc:'Schwabach – Altstadt', start:'2026-10-18', end:'2026-10-18', free:true, desc:'Großer Trempel- und Flohmarkt in der Schwabacher Altstadt, kombiniert mit verkaufsoffenem Sonntag.', genre:'Flohmarkt / Trempelmarkt', ticket:'https://www.schwabach.de/de/schwabach-erleben/veranstaltungen1/jahresueberblick.html', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'S-Bahn S2 bis Schwabach', parking:'Parkhäuser Innenstadt Schwabach'},
  {cat:'stadtfest', name:'Zirndorfer Herbstmarkt', loc:'Zirndorf – Innenstadt', start:'2026-10-18', end:'2026-10-18', free:true, desc:'Herbstmarkt von 13 bis 18 Uhr in der Zirndorfer Innenstadt mit verkaufsoffenem Sonntag.', genre:'Markt / Stadtfest', ticket:'https://www.zirndorf-marketing.de/zirndorfer-veranstaltungshoehepunkte-2026', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'S-Bahn S4 bis Zirndorf', parking:'Parkplätze Innenstadt Zirndorf'},
  {cat:'stadtfest', name:'Judäimarkt Schwabach', loc:'Schwabach – Altstadt', start:'2026-10-31', end:'2026-10-31', free:true, desc:'Traditioneller Herbst-Jahrmarkt in der Schwabacher Altstadt mit Buden, Fahrgeschäften und Kulinarik.', genre:'Jahrmarkt / Tradition', ticket:'https://www.schwabach.de/de/schwabach-erleben/veranstaltungen1/jahresueberblick.html', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'S-Bahn S2 bis Schwabach', parking:'Parkhäuser Innenstadt Schwabach'},
  {cat:'kinder', name:'Dinotastic Live! Die Reise zum Feuervulkan', loc:'Nürnberg – Meistersingerhalle', start:'2026-11-06', end:'2026-11-06', free:false, desc:'Interaktive Dinosaurier-Show mit lebensgroßen Dinos für Kinder und Familien.', genre:'Kindershow', ticket:'https://www.regioactive.de/kinder/dinotastic-live-die-reise-zum-feuervulkan-nuernberg-meistersingerhalle-2026-11-06-tickets-DFy1JlXYF5', outdoor:false, ageMin:3, price:'Tickets im Vorverkauf', oepnv:'Bus 45/65 bis Meistersingerhalle', parking:'Parkplätze an der Meistersingerhalle'},
  {cat:'messe', name:'RETRO CLASSICS BAVARIA', loc:'Nürnberg – Messe Nürnberg', start:'2026-11-06', end:'2026-11-08', free:false, desc:'Oldtimer- und Mobilitätsmesse mit Fahrzeugschau, Teilemarkt und Lifestyle-Programm.', genre:'Publikumsmesse / Oldtimer', ticket:'https://www.messen.de/de/17603/nuernberg/retro-classics-bavaria/info', outdoor:false, ageMin:0, price:'Tagesticket', oepnv:'U1 bis Messe', parking:'Messegelände'},
  {cat:'stadtfest', name:'Bayreuther Christkindlesmarkt', loc:'Bayreuth – Marktplatz', start:'2026-11-23', end:'2026-12-22', free:true, desc:'Rund 40 Holzbuden mit Handwerk und fränkischer Kulinarik auf dem zentralen Bayreuther Marktplatz.', genre:'Weihnachtsmarkt', ticket:'https://www.deutsche-weihnachtsmaerkte.de/weihnachtsmarkt/in/bayern/christkindlesmarkt-bayreuth-1459.html', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn bis Bayreuth Hbf, kurzer Fußweg', parking:'Parkhäuser Innenstadt Bayreuth'},
  {cat:'stadtfest', name:'Augsburger Christkindlesmarkt', loc:'Augsburg – Rathausplatz', start:'2026-11-23', end:'2026-12-24', free:true, desc:'Über 500 Jahre alter Christkindlesmarkt am Rathausplatz mit dem berühmten Augsburger Engelesspiel.', genre:'Weihnachtsmarkt', ticket:'https://www.augsburg.de/freizeit/feste-und-maerkte/christkindlesmarkt', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn bis Augsburg Hbf, Tram bis Rathausplatz', parking:'Parkhäuser Innenstadt Augsburg'},
  {cat:'stadtfest', name:'Weihnachtsmarkt Hersbruck', loc:'Hersbruck – Oberer Markt', start:'2026-11-26', end:'2026-12-23', free:true, desc:'Stimmungsvoller Weihnachtsmarkt in der historischen Altstadt von Hersbruck im Nürnberger Land.', genre:'Weihnachtsmarkt', ticket:'https://n-land.de/kirchweihen-feste/weihnachtsmarkt-hersbruck-2026-11-26', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'S-Bahn S1 bis Hersbruck', parking:'Parkplätze Innenstadt Hersbruck'},
  {cat:'stadtfest', name:'Coburger Weihnachtsmarkt', loc:'Coburg – Marktplatz', start:'2026-11-27', end:'2026-12-23', free:true, desc:'Weihnachtsmarkt vor dem historischen Coburger Rathaus – bekannt für die größte Weihnachtskerze der Welt am Rathausturm.', genre:'Weihnachtsmarkt', ticket:'https://erlebe.bayern/listicles/weihnachtsmaerkte/', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn bis Coburg Bahnhof, dann Bus/Fußweg', parking:'Parkhäuser Innenstadt Coburg'},
  {cat:'stadtfest', name:'Weihnachtsmarkt im Zimmermannspark Zirndorf (1. Wochenende)', loc:'Zirndorf – Zimmermannspark', start:'2026-11-27', end:'2026-11-29', free:true, desc:'Weihnachtsmarkt im Zirndorfer Zimmermannspark zum ersten Advent mit Buden, Musik und Kinderprogramm.', genre:'Weihnachtsmarkt', ticket:'https://www.zirndorf-marketing.de/zirndorfer-veranstaltungshoehepunkte-2026', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'S-Bahn S4 bis Zirndorf', parking:'Parkplätze Innenstadt Zirndorf'},
  {cat:'kinder', name:'Sternenhaus – Kinderkulturprogramm zum Christkindlesmarkt', loc:'Nürnberg – Sternenhaus (Kongresshalle)', start:'2026-11-28', end:'2026-12-23', free:false, desc:'Theater, Musik, Zirkus und Mitmachaktionen für Kinder und Familien während der Nürnberger Christkindlesmarkt-Zeit.', genre:'Kindertheater / Kinderkultur', ticket:'https://www.nuernberg.de/internet/kuf_kultur/sternenhaus.html', outdoor:false, ageMin:0, price:'Tickets je Vorstellung', oepnv:'Tram 6/8 bis Bayernstraße', parking:'Parkplätze am Dutzendteich'},
  {cat:'stadtfest', name:'Weihnachtsmarkt Schwabach (1. Wochenende)', loc:'Schwabach – Königsplatz', start:'2026-12-04', end:'2026-12-06', free:true, desc:'Weihnachtsmarkt am Königsplatz vor der Kulisse der Goldschlägerstadt Schwabach.', genre:'Weihnachtsmarkt', ticket:'https://www.schwabach.de/de/schwabach-erleben/veranstaltungen1/jahresueberblick.html', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'S-Bahn S2 bis Schwabach', parking:'Parkhäuser Innenstadt Schwabach'},
  {cat:'stadtfest', name:'Weihnachtsmarkt im Zimmermannspark Zirndorf (2. Wochenende)', loc:'Zirndorf – Zimmermannspark', start:'2026-12-04', end:'2026-12-06', free:true, desc:'Zweiter Termin des Zirndorfer Weihnachtsmarkts im Zimmermannspark.', genre:'Weihnachtsmarkt', ticket:'https://www.zirndorf-marketing.de/zirndorfer-veranstaltungshoehepunkte-2026', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'S-Bahn S4 bis Zirndorf', parking:'Parkplätze Innenstadt Zirndorf'},
  {cat:'stadtfest', name:'Weihnachtsmarkt Schwabach (2. Wochenende)', loc:'Schwabach – Königsplatz', start:'2026-12-10', end:'2026-12-13', free:true, desc:'Zweiter Durchgang des Schwabacher Weihnachtsmarkts am Königsplatz.', genre:'Weihnachtsmarkt', ticket:'https://www.schwabach.de/de/schwabach-erleben/veranstaltungen1/jahresueberblick.html', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'S-Bahn S2 bis Schwabach', parking:'Parkhäuser Innenstadt Schwabach'},
  {cat:'sport', name:'Feuerwerk der Turnkunst – hope (Bamberg)', loc:'Bamberg – brose Arena', start:'2027-01-17', end:'2027-01-17', free:false, desc:'Artistik, Turnkunst und Live-Musik in einer großen Bühnenshow für die ganze Familie – Bamberger Tourtermin.', genre:'Show / Artistik', ticket:'', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bahn bis Bamberg Hbf, dann Bus zur Arena', parking:'Parkplätze an der brose Arena'},
  {cat:'family', name:'Chinesischer Nationalcircus', loc:'Bamberg – brose Arena', start:'2027-02-25', end:'2027-02-25', free:false, desc:'Akrobatik-Ensemble aus China mit Hochseil, Kontorsion und Jonglage – Show für die ganze Familie.', genre:'Circus / Artistik', ticket:'', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bahn bis Bamberg Hbf, dann Bus zur Arena', parking:'Parkplätze an der brose Arena'},
  {cat:'messe', name:'akustika 2027 – Die Messe für Musik', loc:'Nürnberg – Messe Nürnberg', start:'2027-04-09', end:'2027-04-11', free:false, desc:'Publikumsmesse rund um Instrumente, Musizieren und Musikkultur mit Bühnenprogramm und Workshops.', genre:'Publikumsmesse / Musik', ticket:'https://www.messen.de/de/22203/nuernberg/akustika/info', outdoor:false, ageMin:0, price:'Tagesticket', oepnv:'U1 bis Messe', parking:'Messegelände'},
  // ─── NEU HINZUGEFÜGT (KW 30 · 2026-07-20) ────────────────────────────────
  {cat:'sport', name:'B2Run Firmenlauf Nürnberg', loc:'Nürnberg – Volksfestplatz / Dutzendteich', start:'2026-07-23', end:'2026-07-23', free:false, desc:'Deutschlands größte Firmenlauf-Serie – rund 6 km Laufstrecke rund um den Dutzendteich mit anschließender After-Run-Party. Teamerlebnis für Unternehmen und Kolleginnen und Kollegen.', genre:'Laufen / Firmenlauf', ticket:'https://www.b2run.de/run/de/de/nuernberg/index.html', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'U-Bahn U1 bis Messe / Bahnhof Dutzendteich', parking:'Begrenzt – ÖPNV empfohlen'},
  {cat:'sport', name:'Triathlon Nürnberg', loc:'Nürnberg – Wöhrder See', start:'2026-08-09', end:'2026-08-09', free:true, desc:'Triathlon-Wettkämpfe u.a. mit Bundesliga-Rennen am Wöhrder See. Schwimmen, Radfahren und Laufen mitten in der Stadt – für Zuschauer kostenlos.', genre:'Triathlon / Sport', ticket:'https://www.nuernberg-triathlon.de/', outdoor:true, ageMin:0, price:'Zuschauer kostenlos', oepnv:'S-Bahn Wöhrd / Innenstadt', parking:'Begrenzt'},
  {cat:'stadtfest', name:'Tag des offenen Denkmals Nürnberg', loc:'Nürnberg – verschiedene Orte', start:'2026-09-13', end:'2026-09-13', free:true, desc:'Bundesweiter Aktionstag mit Führungen und Öffnungen sonst nicht zugänglicher Baudenkmäler in Nürnberg. Familienfreundliches Kulturprogramm bei freiem Eintritt.', genre:'Kultur / Denkmal', ticket:'https://www.nuernberg.de/internet/stadtportal/tag_des_offenen_denkmals.html', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Innenstadt ÖPNV', parking:'Parkhäuser Altstadt'},
  {cat:'stadtfest', name:'Nürnberger Herbstmarkt', loc:'Nürnberg – Hauptmarkt', start:'2026-09-17', end:'2026-10-04', free:true, desc:'Traditioneller Herbstmarkt auf dem Hauptmarkt mit regionalen Erzeugnissen, Herbstdekoration, Blumen und Marktständen. Stimmungsvoller Übergang in die kühle Jahreszeit.', genre:'Markt / Stadtfest', ticket:'https://www.nuernberg.de/internet/stadtportal/herbstmarkt.html', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'U-Bahn Lorenzkirche', parking:'Parkhäuser Altstadt'},
  {cat:'stadtfest', name:'Stadt(ver)führungen Nürnberg', loc:'Nürnberg – Stadtgebiet', start:'2026-09-18', end:'2026-09-20', free:false, desc:'Beliebtes Themenwochenende mit hunderten außergewöhnlichen Führungen quer durch Nürnberg – von Hinterhöfen bis zu Friedhöfen. Für Neugierige und Einheimische.', genre:'Führungen / Kultur', ticket:'https://www.nuernberg.de/internet/stadtportal/stadtverfuehrungen.html', outdoor:true, ageMin:0, price:'Führungen ticketpflichtig', oepnv:'Innenstadt ÖPNV', parking:'Parkhäuser Altstadt'},
  {cat:'family', name:'Tage der offenen Tür – SÖR Nürnberg', loc:'Nürnberg – Innenstadt / Hauptmarkt', start:'2026-10-16', end:'2026-10-18', free:true, desc:'Der Servicebetrieb Öffentlicher Raum (SÖR) präsentiert Fahrzeuge, Technik und Mitmachaktionen. Beliebtes Familienevent mit dem berühmten SÖR-Ballett der Räumfahrzeuge.', genre:'Familie / Aktionstag', ticket:'https://www.nuernberg.de/internet/stadtportal/tag_der_offenen_tuer.html', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn Lorenzkirche', parking:'Parkhäuser Altstadt'},
  {cat:'kinder', name:'Internationales Figurentheaterfestival 2027', loc:'Nürnberg / Fürth / Erlangen – verschiedene Spielstätten', start:'2027-04-30', end:'2027-05-09', free:false, desc:'Alle zwei Jahre verwandelt das renommierte Figurentheaterfestival die Region in eine Bühne für Puppen-, Objekt- und Figurentheater aus aller Welt. Für Familien und Erwachsene.', genre:'Figurentheater / Kultur', ticket:'https://www.figurentheaterfestival.de/', outdoor:false, ageMin:0, price:'Tickets je Vorstellung', oepnv:'ÖPNV je Spielstätte', parking:'Je nach Spielstätte'},
  {cat:'stadtfest', name:'Die Blaue Nacht 2027', loc:'Nürnberg – Altstadt', start:'2027-04-24', end:'2027-04-24', free:false, desc:'Nürnbergs große Kunst- und Kulturnacht: Museen, Kirchen und Plätze werden illuminiert und bespielt. Highlight sind die Lichtprojektionen auf der Kaiserburg.', genre:'Kunst / Lichtkunst', ticket:'https://www.nuernberg.de/internet/stadtportal/blaue_nacht.html', outdoor:true, ageMin:0, price:'Blaue-Nacht-Button erforderlich', oepnv:'Innenstadt ÖPNV', parking:'Parkhäuser Altstadt'},
  // ─── NEU HINZUGEFÜGT (KW 27 · 2026-06-29) ────────────────────────────────
  {cat:'family', name:'Disney in Concert', loc:'Nürnberg – PSD Bank Nürnberg ARENA', start:'2026-10-27', end:'2026-10-27', free:false, desc:'Die schönsten Disney-Melodien live von einem großen Orchester gespielt, mit Filmszenen auf Großleinwand. Ein Erlebnis für die ganze Familie. Einlass 18:00, Beginn 19:30 Uhr.', genre:'Filmmusik / Familie', ticket:'https://www.eventim.de/', outdoor:false, ageMin:0, price:'Tickets bei eventim.de', oepnv:'U-Bahn U1 bis Messe, dann kurzer Fußweg', parking:'Begrenzt – ÖPNV empfohlen'},
  {cat:'sport', name:'NIGHT of the JUMPs', loc:'Nürnberg – PSD Bank Nürnberg ARENA', start:'2026-10-17', end:'2026-10-17', free:false, desc:'Freestyle-Motocross-Weltmeisterschaft – spektakuläre Sprünge und Stunts der besten FMX-Fahrer der Welt. Einlass 17:45, Beginn 19:00 Uhr.', genre:'FMX / Action-Sport', ticket:'https://www.eventim.de/', outdoor:false, ageMin:8, price:'Tickets bei eventim.de', oepnv:'U-Bahn U1 bis Messe, dann kurzer Fußweg', parking:'Begrenzt – ÖPNV empfohlen'},
  {cat:'freizeit', name:'Playmobil FunPark Saison', loc:'Zirndorf – Playmobil Funpark', start:'2026-04-01', end:'2026-10-31', free:false, desc:'Der riesige Playmobil Spielpark für Kinder! Piratenschiff, Ritterburg, Wasserpark, Bauernhof in Lebensgröße. Perfekter Familienausflug direkt bei Nürnberg.', genre:'Freizeitpark / Kinder', ticket:'https://www.playmobil-funpark.de', outdoor:true, ageMin:0, price:'Kinder ab 3J: 14,90€, Erw: 5,50€', oepnv:'S-Bahn S1 nach Zirndorf', parking:'Vorhanden kostenlos'},
  {cat:'zoo', name:'Tiergarten Nürnberg – Sommersaison', loc:'Nürnberg – Tiergarten', start:'2026-04-01', end:'2026-10-31', free:false, desc:'Einer der schönsten Tiergärten Europas! Manatihaus, Delfine, Bauernhof, Wasserspielplatz, Riesenrutsche und Minibahn. Besondere Familienangebote das ganze Jahr.', genre:'Zoo / Familie', ticket:'https://tiergarten.nuernberg.de', outdoor:true, ageMin:0, price:'Kinder (4-13J): 7€, Erw: 16€', oepnv:'U2 bis Tiergarten', parking:'Vorhanden'},
  {cat:'zoo', name:'Tiergarten – Nacht der Tiere', loc:'Nürnberg – Tiergarten', start:'2026-07-11', end:'2026-07-11', free:false, desc:'Spannende Abendführung durch den beleuchteten Tiergarten. Tiere in der Dämmerung erleben – ein unvergessliches Erlebnis für die ganze Familie.', genre:'Zoo / Abendführung', ticket:'https://tiergarten.nuernberg.de', outdoor:true, ageMin:0, price:'Kinder: 5€, Erw: 12€', oepnv:'U2 bis Tiergarten', parking:'Vorhanden'},
  {cat:'zoo', name:'Tiergarten – Langer Zooabend', loc:'Nürnberg – Tiergarten', start:'2026-08-08', end:'2026-08-08', free:false, desc:'Verlängerter Öffnungsbetrieb mit Musik, Liveacts und besonderen Führungen am Abend. Sommerstimmung im Tiergarten für die ganze Familie.', genre:'Zoo / Familienevent', ticket:'https://tiergarten.nuernberg.de', outdoor:true, ageMin:0, price:'Normaler Eintrittspreis', oepnv:'U2 bis Tiergarten', parking:'Vorhanden'},
  {cat:'kinder', name:'Kinderkirchweih Schwabach', loc:'Schwabach – Innenstadt', start:'2026-07-10', end:'2026-07-12', free:true, desc:'Die Kinderkirchweih in Schwabach ist ein Kinderfest mit Fahrgeschäften, Spielen und Programm speziell für die Kleinen. Eintritt frei.', genre:'Kirchweih / Kinder', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn nach Schwabach', parking:'Innenstadt Parkhäuser'},
  {cat:'stadtfest', name:'Klassik Open Air – Familienkonzert', loc:'Nürnberg – Luitpoldhain', start:'2026-07-03', end:'2026-07-05', free:false, desc:'Das Klassik Open Air zählt zu den größten Freiluftkonzerten Europas. Familienfreundlich, mit großer Leinwand und Picknick-Atmosphäre. Staatsphilharmonie und Gäste.', genre:'Klassik / Open Air', ticket:'https://www.staatstheater-nuernberg.de', outdoor:true, ageMin:0, price:'Kostenlos (Picknickwiese) oder Tribüne ab 15€', oepnv:'U1 nach Messe', parking:'Messegelände'},
  {cat:'family', name:'Nürnberger Frühlingsfest', loc:'Nürnberg – Volksfestplatz (Dutzendteich)', start:'2026-04-04', end:'2026-04-26', free:true, desc:'Das Nürnberger Frühlingsfest mit Fahrgeschäften, Bierzelten und Familienangeboten. Auftakt der Volksfest-Saison in Nürnberg.', genre:'Volksfest', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei, Fahrgeschäfte kostenpflichtig', oepnv:'Tram/Bus zum Volksfestplatz', parking:'Vorhanden'},
  {cat:'family', name:'Nürnberger Herbstvolksfest', loc:'Nürnberg – Volksfestplatz', start:'2026-08-28', end:'2026-09-13', free:true, desc:'Das große Herbstvolksfest in Nürnberg mit Riesenrad, Fahrgeschäften, Bierzelten und Familienangeboten. Einer der Sommer-Abschluss-Highlights.', genre:'Volksfest', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei, Fahrgeschäfte kostenpflichtig', oepnv:'Tram/Bus zum Volksfestplatz', parking:'Vorhanden'},
  {cat:'family', name:'Augsburger Plärrer (Frühling)', loc:'Augsburg – Plärrergelände', start:'2026-04-05', end:'2026-04-19', free:true, desc:'Das größte Volksfest Schwabens! Der Augsburger Plärrer bietet Fahrgeschäfte, Festzelte und Familienangebote für alle. Zweimal jährlich.', genre:'Volksfest / Familie', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Straßenbahn nach Plärrer-Gelände', parking:'Vorhanden'},
  {cat:'kinder', name:'Kindertheater-Festival Nürnberg', loc:'Nürnberg – Stadttheater / Tafelhalle', start:'2026-06-06', end:'2026-06-21', free:false, desc:'Renommiertes Kindertheater-Festival mit nationalen und internationalen Produktionen für Kinder ab 3 Jahren. Workshops, Mitmachtheater und Aufführungen.', genre:'Theater / Kinder', ticket:'https://www.staatstheater-nuernberg.de', outdoor:false, ageMin:0, price:'Tickets ab 8€', oepnv:'U1 Hauptbahnhof', parking:'Innenstadt Parkhäuser'},
  {cat:'stadtfest', name:'Stadtparkfest Nürnberg', loc:'Nürnberg – Stadtpark', start:'2026-07-19', end:'2026-07-26', free:true, desc:'Wochenlang Musik, Kultur und Familienunterhaltung im Nürnberger Stadtpark. Konzerte auf der Open-Air-Bühne, Kinderprogramm und Gastronomie.', genre:'Stadtfest / Familie', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U2 bis Aufseßplatz oder Tram 4', parking:'Begrenzt'},
  {cat:'family', name:'Regensburger Herbstdult', loc:'Regensburg – Dultplatz', start:'2026-08-28', end:'2026-09-13', free:true, desc:'Traditionsreiche Dult in Regensburg – eines der ältesten Volksfeste Bayerns mit Fahrgeschäften, Biergarten und Händlermarkt.', genre:'Volksfest / Tradition', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn nach Regensburg Hbf', parking:'Vorhanden'},
  {cat:'kinder', name:'Frankenkids Familienfest', loc:'Nürnberg – Stadtgebiet (wechselnder Ort)', start:'2026-05-09', end:'2026-05-10', free:false, desc:'Das jährliche Familienfest von Frankenkids mit Mitmachaktionen, Kinderprogramm, Workshops und Spaß für die ganze Familie in der Metropolregion.', genre:'Familie / Kinder', ticket:'https://www.frankenkids.de', outdoor:true, ageMin:0, price:'Familienticket ca. 20€', oepnv:'Nürnberg ÖPNV je nach Ort', parking:'Je nach Ort'},
  {cat:'stadtfest', name:'Fürth feiert Vielfalt', loc:'Fürth – Stadtgebiet', start:'2026-04-24', end:'2026-05-10', free:true, desc:'Festival für alle in Fürth mit Vereinen und Einrichtungen. Buntes Stadtfest, Konzerte, Ausstellungen und Familienaktionen.', genre:'Stadtfest / Familie', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn nach Fürth Hauptbahnhof', parking:'Innenstadt Parkplätze'},

  {cat:'kinder', name:'Schwabacher Kinderkirchweih', loc:'Schwabach – Königsplatz', start:'2026-04-24', end:'2026-04-28', free:false, desc:'Fahrgeschäfte, Karussells und Programm für Kinder und Familien am Königsplatz. Freier Eintritt, Fahrpreise kostenpflichtig.', genre:'Kinderkirchweih / Familie', ticket:'', outdoor:true, ageMin:0, price:'Freier Eintritt, Fahrpreise kostenpflichtig', oepnv:'S-Bahn S1 bis Schwabach', parking:'Parkhäuser Innenstadt'},
  {cat:'freizeit', name:'Familien-Erlebnistag „Entdecke den Brombachsee"', loc:'Großer Brombachsee – Seezentren (Langlau & Zweiseenplatz Enderndorf)', start:'2026-04-26', end:'2026-04-26', free:true, desc:'Saisonstart am Brombachsee! Von 11:00–17:00 Uhr verwandeln sich die Seezentren in einen großen Abenteuerspielplatz. Aktivitäten: Bogenschießen, Stand Up Paddling, Schatzsuche, Erlebnis-Schatzkarte, Piratenschiff-Hüpfburg, Goldwäschestation und mehr. Das gesamte Freizeitangebot (Radeln, Wandern) ist an diesem Tag ideal nutzbar.', genre:'Familie / Outdoor', ticket:'https://www.brombachsee.de', outdoor:true, ageMin:0, price:'Kostenlos (Erlebnisstationen)', oepnv:'Mit dem Auto – Parkplätze an den Seezentren vorhanden', parking:'Vorhanden an Langlau & Enderndorf'},

  // ─── SPORT & ACTION ──────────────────────────────────────────────────────────
  {cat:'sport', name:'Spartan Race Munich', loc:'München', start:'2026-04-17', end:'2026-04-18', free:false, desc:'Spartan Race Trifecta Weekend in München – drei Distanzen (Sprint, Super, Beast) auf einer Strecke. Schlamm, Hindernisse, Teamspirit. Einer der härtesten OCR-Wettkämpfe der Welt.', genre:'OCR / Hindernislauf', ticket:'https://de.spartan.com', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'München ÖPNV', parking:'Vor Ort'},
  {cat:'sport', name:'Rats-Runners Emskirchen', loc:'Emskirchen', start:'2026-05-17', end:'2026-05-17', free:false, desc:'Hindernislauf der Rats-Runners Rennserie in Emskirchen. Schlamm, Wasser, Spaß für Einsteiger und Profis.', genre:'Hindernislauf / OCR', ticket:'https://rats-runners.de', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'Bahn nach Emskirchen', parking:'Vor Ort'},
  {cat:'sport', name:'Spartan Trifecta Weekend Kulmbach', loc:'Kulmbach', start:'2026-06-12', end:'2026-06-14', free:false, desc:'Spartan Trifecta Weekend in Kulmbach – alle drei Renndistanzen an einem Wochenende. Für alle, die die härteste Herausforderung suchen.', genre:'OCR / Hindernislauf', ticket:'https://de.spartan.com', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'Bahn nach Kulmbach', parking:'Vor Ort'},
  {cat:'sport', name:'Rats-Runners Sulzbach-Rosenberg', loc:'Sulzbach-Rosenberg', start:'2026-06-21', end:'2026-06-21', free:false, desc:'Hindernislauf der Rats-Runners Rennserie in Sulzbach-Rosenberg.', genre:'Hindernislauf / OCR', ticket:'https://rats-runners.de', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'Bahn nach Sulzbach-Rosenberg', parking:'Vor Ort'},
  {cat:'sport', name:'INN Run – OCR Hindernislauf', loc:'Passau', start:'2026-06-20', end:'2026-06-20', free:false, desc:'Der INN Run in Passau – Hindernislauf am Fluss Inn. Schlamm, Wasser und Action für die ganze Familie in schöner Landschaft.', genre:'Hindernislauf / OCR', ticket:'https://www.innrun.de', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'Bahn nach Passau Hbf', parking:'Vor Ort'},
  {cat:'sport', name:'XLETIX Challenge München-Erding', loc:'Erding (bei München)', start:'2026-07-18', end:'2026-07-18', free:false, desc:'XLETIX Challenge – einer der bekanntesten deutschen Hindernisläufe. Spaßbetonte Hindernisse, Team-Atmosphäre, für alle Fitnesslevel.', genre:'Hindernislauf / OCR', ticket:'https://www.xletix.com/events/muenchen-erding-2026', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'Bahn nach Erding', parking:'Vor Ort'},
  {cat:'sport', name:'XLETIX Kids Challenge München', loc:'Erding (bei München)', start:'2026-07-18', end:'2026-07-18', free:false, desc:'XLETIX Kids Challenge – der Hindernislauf speziell für Kinder! Spaßige, kindgerechte Hindernisse für kleine Abenteurer. Parallel zum XLETIX Challenge für Erwachsene.', genre:'Hindernislauf / Kinder / Sport', ticket:'https://www.xletix.com/events/muenchen-erding-2026', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'Bahn nach Erding', parking:'Vor Ort'},
  {cat:'sport', name:'Rock the Race', loc:'Würzburg', start:'2026-07-26', end:'2026-07-26', free:false, desc:'Rock the Race Würzburg – actionreicher Hindernislauf mit Musik und Partyatmosphäre. Für Einzelläufer und Teams.', genre:'Hindernislauf / Fun-Run', ticket:'https://rocktherace.de', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'Bahn nach Würzburg Hbf', parking:'Vor Ort'},
  {cat:'sport', name:'Rats-Runners Auhausen', loc:'Auhausen', start:'2026-08-02', end:'2026-08-02', free:false, desc:'Hindernislauf der Rats-Runners Rennserie in Auhausen.', genre:'Hindernislauf / OCR', ticket:'https://rats-runners.de', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'Mit dem Auto', parking:'Vor Ort'},
  {cat:'sport', name:'Muddy Angel Run München', loc:'Haar (bei München)', start:'2026-08-01', end:'2026-08-01', free:false, desc:'Der Muddy Angel Run – Europas größter Ladies Run! Spaß, Schlamm und Gemeinschaft für Frauen. Auch für Männer geöffnet als Supporter.', genre:'Hindernislauf / Ladies Run', ticket:'https://www.muddyangelrun.com', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'S-Bahn nach Haar', parking:'Vor Ort'},
  {cat:'sport', name:'Rats-Runners Weißenburg', loc:'Weißenburg i. Bay.', start:'2026-08-16', end:'2026-08-16', free:false, desc:'Hindernislauf der Rats-Runners Rennserie in Weißenburg i. Bay.', genre:'Hindernislauf / OCR', ticket:'https://rats-runners.de', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'Bahn nach Weißenburg', parking:'Vor Ort'},
  {cat:'sport', name:'Runterra – Im Zeichen des Phönix', loc:'Zirndorf', start:'2026-09-19', end:'2026-09-19', free:false, desc:'Runterra Hindernislauf in Zirndorf – Im Zeichen des Phönix. Mythenreiche Hindernisse und Teamgeist auf dem Parcours in Mittelfranken.', genre:'Hindernislauf / OCR', ticket:'https://www.runterra.de', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'S-Bahn S1 nach Zirndorf', parking:'Vor Ort'},

  // ─── MESSEN ──────────────────────────────────────────────────────────────────
  {cat:'messe', name:'IFH Intherm – Sanitär, Heizung, Gebäudetechnik', loc:'Nürnberg – Messe Nürnberg', start:'2026-04-14', end:'2026-04-17', free:false, desc:'Internationale Fachmesse für Sanitär, Heizung und Gebäudetechnik. Eine der wichtigsten Branchenmessen Deutschlands.', genre:'Fachmesse / SHK-Branche', ticket:'https://www.intherm.de', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U1 bis Messe', parking:'Messe Nürnberg'},
  {cat:'messe', name:'heise Jobs IT-Tag – IT & Karriere', loc:'München', start:'2026-04-15', end:'2026-04-15', free:false, desc:'IT- und Karrieremesse von heise: Direktkontakt zu Tech-Unternehmen, Vorträge und Networking für IT-Fachkräfte.', genre:'Karrieremesse / IT', ticket:'https://www.heisejobs.de', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'München ÖPNV', parking:'Vor Ort'},
  {cat:'messe', name:'ARCHITECT@WORK – Architektur & Design', loc:'München', start:'2026-04-15', end:'2026-04-16', free:false, desc:'Fachmesse für Architekten und Planer mit innovativen Produkten und Materialien. Kompaktes Format mit persönlicher Beratung.', genre:'Fachmesse / Architektur', ticket:'https://www.architectatwork.de', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'München ÖPNV', parking:'Vor Ort'},
  {cat:'messe', name:'AGRARSCHAU Allgäu – Landwirtschaft & Technik', loc:'Dietmannsried – Allgäu', start:'2026-04-16', end:'2026-04-20', free:false, desc:'Regionale Agrarmesse im Allgäu mit Landtechnik, Tierschau und Ausstellern aus der Landwirtschaft.', genre:'Fachmesse / Landwirtschaft', ticket:'', outdoor:true, ageMin:0, price:'Tagesticket', oepnv:'Bahn nach Dietmannsried', parking:'Messegelände'},
  {cat:'messe', name:'Bildungsmesse Inn-Salzach – Ausbildung & Beruf', loc:'Mühldorf a. Inn', start:'2026-04-17', end:'2026-04-18', free:true, desc:'Regionale Bildungs- und Karrieremesse für Ausbildungssuchende, Schüler und Berufswechsler in der Region Inn-Salzach.', genre:'Bildungsmesse / Karriere', ticket:'', outdoor:false, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Mühldorf', parking:'Vor Ort'},
  {cat:'messe', name:'Tattoo Convention Simbach', loc:'Simbach a. Inn', start:'2026-04-18', end:'2026-04-19', free:false, desc:'Tattoo-Convention mit nationalen und internationalen Künstlern. Live-Tätowierungen, Ausstellungen und Wettbewerbe.', genre:'Convention / Tattoo', ticket:'', outdoor:false, ageMin:18, price:'Tagesticket', oepnv:'Bahn nach Simbach', parking:'Vor Ort'},
  {cat:'messe', name:'LMU KarriereGipfel – Hochschul-Karrieremesse', loc:'München – LMU', start:'2026-04-21', end:'2026-04-21', free:true, desc:'Hochschul-Karrieremesse der LMU München: Arbeitgeber treffen Studierende und Absolventen. Networking, Bewerbungsgespräche, Vorträge.', genre:'Karrieremesse / Hochschule', ticket:'', outdoor:false, ageMin:0, price:'Kostenlos', oepnv:'U3/U6 bis Universität', parking:'Begrenzt'},
  {cat:'messe', name:'MMM-Messe – Versicherungen & Finanzdienstleistung', loc:'München – MOC', start:'2026-04-21', end:'2026-04-21', free:false, desc:'Fachmesse für Versicherungen und Finanzdienstleistungen im MOC München. Networking und Produktvorstellungen für Branchenprofis.', genre:'Fachmesse / Finance', ticket:'', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U2 bis Scheidplatz', parking:'MOC Parkhaus'},
  {cat:'messe', name:'vocatium Oberbayern – Ausbildung & Studium', loc:'Fürstenfeldbruck', start:'2026-04-21', end:'2026-04-22', free:true, desc:'Vertiefende Berufsorientierungsmesse mit Voranmeldung. Schüler treffen gezielt passende Aussteller für Ausbildung und Studium.', genre:'Bildungsmesse / Ausbildung', ticket:'', outdoor:false, ageMin:0, price:'Kostenlos', oepnv:'S4 bis Fürstenfeldbruck', parking:'Vor Ort'},
  {cat:'messe', name:'CONTACT – Recruitingmesse TH Ingolstadt', loc:'Ingolstadt', start:'2026-04-21', end:'2026-04-22', free:true, desc:'Karrieremesse der Technischen Hochschule Ingolstadt: Direktkontakt zu Unternehmen aus Technik, Wirtschaft und Informatik.', genre:'Karrieremesse / Technik', ticket:'', outdoor:false, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Ingolstadt Hbf', parking:'TH Ingolstadt'},
  {cat:'messe', name:'vocatium Mittelfranken', loc:'Erlangen', start:'2026-04-22', end:'2026-04-23', free:true, desc:'Vertiefende Berufsorientierungsmesse für Schüler in Mittelfranken. Persönliche Gesprächstermine mit regionalen Ausbildungsbetrieben.', genre:'Bildungsmesse / Ausbildung', ticket:'', outdoor:false, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Erlangen', parking:'Vor Ort'},
  {cat:'messe', name:'AZUBISpot – Azubi- & Karrieremesse', loc:'Aichach', start:'2026-04-22', end:'2026-04-22', free:true, desc:'Regionale Azubi- und Karrieremesse in Aichach: Unternehmen aus der Region stellen Ausbildungsplätze und duale Studienplätze vor.', genre:'Bildungsmesse / Ausbildung', ticket:'', outdoor:false, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Aichach', parking:'Vor Ort'},
  {cat:'messe', name:'akustika – Musik & Akustik', loc:'Nürnberg – Messe Nürnberg', start:'2026-04-24', end:'2026-04-26', free:false, desc:'Fachmesse für Musikinstrumente, HiFi, Akustik und professionelle Audiotechnik in Nürnberg.', genre:'Fachmesse / Musik & Audio', ticket:'https://www.akustika.de', outdoor:false, ageMin:0, price:'Tagesticket', oepnv:'U1 bis Messe', parking:'Messe Nürnberg'},
  {cat:'messe', name:'E-BIKE DAYS München', loc:'München – Olympiapark', start:'2026-04-24', end:'2026-04-26', free:false, desc:'Die E-Bike-Messe im Olympiapark München: Neuheiten testen, Hersteller treffen, Teststrecken und Rahmenprogramm.', genre:'Messe / E-Mobilität', ticket:'', outdoor:true, ageMin:0, price:'Tagesticket', oepnv:'U3 bis Olympiazentrum', parking:'Olympiapark'},
  {cat:'messe', name:'Ceramitec – Keramik-Industrie (international)', loc:'München – Messe München', start:'2026-04-24', end:'2026-04-26', free:false, desc:'Internationale Leitmesse der keramischen Industrie: Maschinen, Anlagen und Rohstoffe für die Keramik-Produktion weltweit.', genre:'Fachmesse / Industrie', ticket:'https://www.ceramitec.com', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U2 bis Messestadt West', parking:'Messe München'},
  {cat:'messe', name:'IFAT Munich – Umwelttechnologien (Weltleitmesse)', loc:'München – Messe München', start:'2026-05-04', end:'2026-05-08', free:false, desc:'Weltleitmesse für Wasser-, Abwasser-, Abfall- und Rohstoffwirtschaft. Über 3.000 Aussteller aus 60+ Ländern.', genre:'Weltleitmesse / Umwelttechnik', ticket:'https://www.ifat.de', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U2 bis Messestadt West', parking:'Messe München'},
  {cat:'messe', name:'Interzoo – Heimtierbranche (Weltleitmesse)', loc:'Nürnberg – Messe Nürnberg', start:'2026-05-12', end:'2026-05-15', free:false, desc:'Weltleitmesse der Heimtierbranche: Futter, Zubehör, Tierbedarf und Innovationen aus aller Welt. Nur für Fachbesucher.', genre:'Weltleitmesse / Heimtiere', ticket:'https://www.interzoo.com', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U1 bis Messe', parking:'Messe Nürnberg'},
  {cat:'messe', name:'Stone+tec – Naturstein & Technologien', loc:'Nürnberg – Messe Nürnberg', start:'2026-06-17', end:'2026-06-20', free:false, desc:'Internationale Fachmesse für Naturstein, Steintechnik und Steindesign. Bearbeitungsmaschinen, Werkzeuge und Designinspirationen.', genre:'Fachmesse / Bau & Design', ticket:'https://www.stone-tec.com', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U1 bis Messe', parking:'Messe Nürnberg'},
  {cat:'messe', name:'Intersolar Europe – Solar & Energie', loc:'München – Messe München', start:'2026-06-23', end:'2026-06-25', free:false, desc:'Weltweit führende Fachmesse für die Solarwirtschaft und Energiewende. Photovoltaik, Batteriespeicher, Solarwärme.', genre:'Fachmesse / Energie', ticket:'https://www.intersolar.de', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U2 bis Messestadt West', parking:'Messe München'},
  {cat:'messe', name:'GaLaBau – Garten-, Landschafts- & Sportplatzbau', loc:'Nürnberg – Messe Nürnberg', start:'2026-09-15', end:'2026-09-18', free:false, desc:'Internationale Fachmesse für Garten-, Landschafts- und Sportplatzbau. Maschinen, Pflanzen, Outdoor-Design.', genre:'Fachmesse / Garten & Landschaft', ticket:'https://www.galabau-messe.com', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U1 bis Messe', parking:'Messe Nürnberg'},
  {cat:'messe', name:'EXPO REAL – Internationale Immobilienmesse', loc:'München – Messe München', start:'2026-10-05', end:'2026-10-07', free:false, desc:'Europas größte Immobilienmesse: Investment, Stadtentwicklung, PropTech. 40.000+ Fachbesucher aus 70 Ländern.', genre:'Fachmesse / Immobilien', ticket:'https://www.exporeal.net', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U2 bis Messestadt West', parking:'Messe München'},
  {cat:'messe', name:'electronica – Elektronik (Weltleitmesse)', loc:'München – Messe München', start:'2026-11-10', end:'2026-11-13', free:false, desc:'Weltleitmesse der Elektronik: Halbleiter, Embedded Systems, Sensorik, KI-Hardware. Größte Elektronik-Messe der Welt.', genre:'Weltleitmesse / Elektronik', ticket:'https://www.electronica.de', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U2 bis Messestadt West', parking:'Messe München'},

  {cat:'kinder', name:'Kooles Kidz Kino (3K) – Cineplex Fürth', loc:'Fürth – Cineplex', start:'2026-06-07', end:'2026-06-07', free:false, desc:'Kooles Kidz Kino (3K) im Cineplex Fürth – immer am letzten Sonntag in den Ferien. Sonntag, 7. Juni, ab 10:00 Uhr. Kein 3D, reduzierte Lautstärke, ohne Werbung – perfekt für die Kleinsten. Filme: „Meine Freundin Conni – Abenteuer mit Kranich Klaus", „Jazzy – Chaos im Regenwald", „Tom & Jerry – Der verlorene Kompass" u.v.m. Tolles Rahmenprogramm: Glücksrad, Kinderschminken, Kinoquiz und vieles mehr.', genre:'Kinderkino / Familie', ticket:'https://www.cineplex.de', new:true, outdoor:false, ageMin:0, price:'5€ Onlineticket / 6€ Kinokasse', oepnv:'U1 Fürth Hauptbahnhof, kurzer Fußweg', parking:'Parkhaus City-Center Fürth'},

  // ── KW 20 2026 – Russische Kulturevents (Family) ──
  {cat:'family', name:'Spektakl „Skameika" – Russisches Theater', loc:'Nürnberg – Meistersingerhalle', start:'2026-05-29', end:'2026-05-29', free:false, desc:'„Skameika" (Die Bank) von Alexander Gelmann – legendäres Kammerstück auf der deutschen Bühne. Über Liebe, Einsamkeit und Sehnsucht nach menschlicher Nähe. Russischsprachige Aufführung. 19:30 Uhr, Meistersingerhalle Nürnberg.', genre:'Russisches Theater / Drama', ticket:'https://nuernberg24.ru/en/event', outdoor:false, ageMin:14, price:'Tickets via nuernberg24.ru', oepnv:'U2 bis Messe/Stadion oder Tram 9', parking:'Parkplatz Meistersingerhalle'},
  {cat:'family', name:'Irina Prikhodko – Stand-up „Mein Tag"', loc:'Orpheum Nürnberg', start:'2026-05-29', end:'2026-05-29', free:false, desc:'Irina Prikhodko auf Europatournee mit der Premiere ihres deutschen Stand-up-Programms „Mein Tag" – über das Leben im Ausland, Sprachen und Kulturunterschiede. 20:00 Uhr, Orpheum Nürnberg.', genre:'Russischer Stand-up / Comedy', ticket:'https://nuernberg24.ru/en/event/9531', outdoor:false, ageMin:16, price:'Tickets via nuernberg24.ru', oepnv:'U1 Hauptbahnhof oder Tram 4', parking:'Parkhaus Hauptbahnhof'},
  {cat:'family', name:'„Abendessen für Idioten" – Russisches Theater', loc:'Fürth – Stadthalle', start:'2026-06-01', end:'2026-06-01', free:false, desc:'Komödie „Abendessen für Idioten" nach Francis Véber – kultige russische Comedy-Aufführung mit internationalem Ensemble. 19:00 Uhr, Stadthalle Fürth.', genre:'Russisches Theater / Komödie', ticket:'https://nuernberg24.ru/en/event/9423', outdoor:false, ageMin:14, price:'Tickets via nuernberg24.ru', oepnv:'U1 Fürth Hauptbahnhof, 5 min Fußweg', parking:'Parkhaus Fürth Innenstadt'},
  {cat:'family', name:'„Dinner für Spinner" – Russisches Theater (Herbst)', loc:'Fürth – Stadthalle', start:'2026-09-14', end:'2026-09-14', free:false, desc:'Zweite Vorstellung der Kultkömödie „Dinner für Spinner" nach Francis Véber – brillante russischsprachige Aufführung mit feinem Humor und internationalem Ensemble. 19:00 Uhr, Stadthalle Fürth.', genre:'Russisches Theater / Komödie', ticket:'https://nuernberg24.ru/de/event/9423', outdoor:false, ageMin:14, price:'Tickets via nuernberg24.ru', oepnv:'U1 Fürth Hauptbahnhof, 5 min Fußweg', parking:'Parkhaus Fürth Innenstadt'},
  {cat:'family', name:'Лучшие песни группы „КИНО" – Symphonic Concert', loc:'Fürth – Stadthalle', start:'2026-12-03', end:'2026-12-03', free:false, desc:'Die besten Songs der Kultband „KINO" (Viktor Tsoi) mit dem Tschechischen Symphonieorchester (Czech Live Symphony Orchestra). Ein unvergesslicher Abend für alle Fans russischer Rockmusik. 20:00 Uhr, Stadthalle Fürth.', genre:'Russische Rockmusik / Symphoniekonzert', ticket:'https://nuernberg24.ru/en/event/9187', outdoor:false, ageMin:0, price:'Tickets via nuernberg24.ru', oepnv:'U1 Fürth Hauptbahnhof, 5 min Fußweg', parking:'Parkhaus Fürth Innenstadt'},
  {cat:'family', name:'Theatre The Chaika – Festliches Programm', loc:'Fürth – Stadthalle', start:'2026-12-14', end:'2026-12-14', free:false, desc:'Theatre THE CHAIKA lädt ein zu einer lebhaften Aufführung mit festlicher Atmosphäre – ein wunderbarer Abend für die ganze Familie vor den Feiertagen. 19:30 Uhr, Stadthalle Fürth.', genre:'Russisches Theater / Familie', ticket:'https://nuernberg24.ru/en/event/9442', outdoor:false, ageMin:0, price:'Tickets via nuernberg24.ru', oepnv:'U1 Fürth Hauptbahnhof, 5 min Fußweg', parking:'Parkhaus Fürth Innenstadt'},

  {cat:'flohmarkt', name:'Trempelmarkt Nürnberg (Frühjahr)', loc:'Nürnberg – Altstadt', start:'2026-05-08', end:'2026-05-09', free:true, desc:'Nürnbergs größter Flohmarkt in der Altstadt – Tausende Stände, Raritäten, Vintage und Trödelschätze. Zweimal im Jahr, Eintritt frei!', genre:'Markt / Flohmarkt', ticket:'https://www.nuernberg.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1/U2 Hauptbahnhof', parking:'Altstadt Parkhäuser'},
  {cat:'sport', name:'Norisring DTM-Rennen', loc:'Nürnberg – Norisring', start:'2026-07-03', end:'2026-07-05', free:false, desc:'Das Norisring-Rennen – Deutschlands einziges innerstädtisches Motorsportevent. DTM auf historischer Strecke am Dutzendteich direkt in der Stadt.', genre:'Motorsport / DTM', ticket:'https://www.norisring.de', outdoor:true, ageMin:0, price:'ab ca. 25€ Tagesticket', oepnv:'U1 bis Frankenstraße', parking:'Begrenzt, ÖPNV empfohlen'},
  {cat:'stadtfest', name:'CSD Nürnberg – Pride Weeks', loc:'Nürnberg – Innenstadt', start:'2026-07-22', end:'2026-08-09', free:true, desc:'Nürnbergs Christopher Street Day – 3 Wochen Pride-Programm, Partys, Kultur und Demo-Umzug durch die Innenstadt. Eintritt frei!', genre:'CSD / Pride / Kultur', ticket:'https://www.csd-nuernberg.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1/U2 Hauptbahnhof', parking:'Altstadt Parkhäuser'},
  {cat:'flohmarkt', name:'Trempelmarkt Nürnberg (Herbst)', loc:'Nürnberg – Altstadt', start:'2026-09-11', end:'2026-09-12', free:true, desc:'Zweiter Trempelmarkt des Jahres – Nürnbergs großer Herbst-Flohmarkt in der Altstadt mit Tausenden Ständen. Eintritt frei!', genre:'Markt / Flohmarkt', ticket:'https://www.nuernberg.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1/U2 Hauptbahnhof', parking:'Altstadt Parkhäuser'},
  {cat:'stadtfest', name:'Nürnberg Digital Festival – Recode the Future', loc:'Nürnberg – Metropolregion (100+ Locations)', start:'2026-06-22', end:'2026-07-02', free:true, desc:'14. Ausgabe des NUEDIGITAL Festivals – 11 Tage KI, Cybersecurity, New Work, Digital Health und Start-ups in über 100 Locations in der Metropolregion Nürnberg. Viele Events kostenlos und offen für alle.', genre:'Digital / Tech / Innovation', ticket:'https://nuernberg.digital', outdoor:false, ageMin:0, price:'Viele Events kostenlos', oepnv:'ÖPNV Nürnberg Innenstadt', parking:'Altstadt-Parkhäuser'},
  {cat:'sport', name:'Sparkassen Metropolmarathon', loc:'Fürth → Nürnberg (Hauptmarkt)', start:'2026-06-13', end:'2026-06-14', free:true, desc:'Lauffestival von Fürth nach Nürnberg! Sa: Pillenstein KidsMarathon. So (14.6.): Marathon, Halbmarathon, AEG 10K-Run und Nordic Walking – Ziel am Nürnberger Hauptmarkt. Anmeldung auf metropolmarathon.de.', genre:'Sport / Marathon', ticket:'https://metropolmarathon.de', outdoor:true, ageMin:0, price:'Anmeldung erforderlich (Zuschauer kostenlos)', oepnv:'U1/U2 bis Hauptmarkt', parking:'Innenstadt Parkhäuser'},
  {cat:'freizeit', name:'Autokino Roßtal', loc:'Roßtal', start:'2026-06-03', end:'2026-06-06', free:false, desc:'Frankens größtes Drive-in-Kino – 4 Tage Open-Air-Kinoerlebnis vom Auto aus mit aktuellem Filmprogramm.', genre:'Kino / Open Air / Familie', ticket:'https://www.autokino-rosstal.de', outdoor:true, ageMin:0, price:'Infos auf Website', oepnv:'PKW erforderlich', parking:'Vorhanden (Autokino)'},
  {cat:'sport', name:'Womens and Girls Run Erlangen', loc:'Erlangen', start:'2026-06-02', end:'2026-06-02', free:false, desc:'Laufevent exklusiv für Frauen und Mädchen in Erlangen – verschiedene Distanzen, Spaß und Community im Vordergrund.', genre:'Laufen / Frauensport / Community', ticket:'https://www.instagram.com/inspiradu', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'Bahn bis Erlangen Hbf', parking:'Innenstadt Erlangen'},
  {cat:'sport', name:'Puma Herzoman Herzogenaurach', loc:'Herzogenaurach', start:'2026-06-28', end:'2026-06-28', free:false, desc:'Laufevent von Puma in Herzogenaurach – Sport, Community und Brand-Experience an einem Tag.', genre:'Laufen / Sport / Community', ticket:'https://www.instagram.com/inspiradu', outdoor:true, ageMin:0, price:'Infos via Instagram', oepnv:'Bus ab Erlangen oder Nürnberg', parking:'Vorhanden in Herzogenaurach'},
  {cat:'kinder', name:'Festival Kinder lieben Comics', loc:'Erlangen – kubic / Comic-Salon', start:'2026-06-05', end:'2026-06-06', free:false, desc:'Festival „Kinder lieben Comics" im Rahmen des Comic-Salons Erlangen – Workshops, Lesungen, Zeichenkurse und mehr für Kinder und Jugendliche.', genre:'Kinder / Comics / Kultur', ticket:'https://www.comic-salon.de', outdoor:false, ageMin:0, price:'Infos auf comic-salon.de', oepnv:'Bahn bis Erlangen Hbf', parking:'Innenstadt Erlangen'},
  {cat:'freizeit', name:'Mittelaltermarkt Burg Rabenstein', loc:'Burg Rabenstein', start:'2026-06-04', end:'2026-06-06', free:false, desc:'Mittelalterlicher Markt auf der historischen Burg Rabenstein in der Fränkischen Schweiz – Ritter, Händler, Schauvorführungen und mittelalterliches Treiben. Do bis Sa.', genre:'Mittelalter / Kultur / Familie', ticket:'', outdoor:true, ageMin:0, price:'Eintritt ca. 5 Euro', oepnv:'PKW empfohlen (ca. 50 km von Nürnberg)', parking:'Vorhanden an der Burg'},
  // ─── WEIHNACHTSMÄRKTE & WINTER 2026 ───────────────────────────────────────
  {cat:'stadtfest', name:'Nürnberger Christkindlesmarkt', loc:'Nürnberg – Hauptmarkt', start:'2026-11-27', end:'2026-12-24', free:true, desc:'Einer der berühmtesten Weihnachtsmärkte der Welt auf dem Hauptmarkt. Eröffnung am Fr, 27.11.2026 um 17:30 Uhr durch das Christkind Nora Falk. Original Nürnberger Lebkuchen, Bratwürste, Glühwein und Kunsthandwerk.', genre:'Weihnachtsmarkt / Tradition', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'U1 Lorenzkirche, S-Bahn Hauptbahnhof', parking:'Parkhäuser Altstadt (begrenzt)'},
  {cat:'stadtfest', name:'Erlanger Waldweihnacht', loc:'Erlangen – Schlossplatz', start:'2026-11-23', end:'2026-12-24', free:true, desc:'Stimmungsvolle Waldweihnacht am Schlossplatz Erlangen mit echten Tannen, Buden und Kunsthandwerk. Mo–Do 10–21 Uhr, Fr/Sa 10–21:30 Uhr, So 11–21 Uhr, Heiligabend 10–14 Uhr.', genre:'Weihnachtsmarkt / Tradition', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn bis Erlangen Hbf', parking:'Parkhäuser Innenstadt Erlangen'},
  {cat:'stadtfest', name:'Fürther Weihnachtsmarkt', loc:'Fürth – Fürther Freiheit', start:'2026-11-26', end:'2026-12-23', free:true, desc:'Weihnachtsmarkt auf der Fürther Freiheit mit festlicher Beleuchtung, Glühwein und regionalen Spezialitäten. Täglich 10–21 Uhr.', genre:'Weihnachtsmarkt / Tradition', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'U1 Fürth Rathaus', parking:'Parkhäuser Fürth Innenstadt'},
  {cat:'stadtfest', name:'Fürther Altstadtweihnacht', loc:'Fürth – Altstadt (Waagplatz)', start:'2026-12-04', end:'2026-12-13', free:true, desc:'Romantische Altstadtweihnacht in der Fürther Gustavstraße/Altstadt mit historischem Flair, Handwerk und Kulturprogramm. Veranstaltet vom Altstadtverein Fürth.', genre:'Weihnachtsmarkt / Tradition', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'U1 Fürth Rathaus', parking:'Parkhäuser Fürth Innenstadt'},
  {cat:'stadtfest', name:'Bamberger Weihnachtsmarkt', loc:'Bamberg – Maxplatz', start:'2026-11-24', end:'2026-12-23', free:true, desc:'Weihnachtsmarkt am Maxplatz im UNESCO-Welterbe Bamberg. Mo–Do 9:30–20 Uhr, Fr/Sa 9:30–21 Uhr, So 11–20 Uhr.', genre:'Weihnachtsmarkt / Tradition', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn bis Bamberg Hbf', parking:'Parkhäuser Innenstadt Bamberg'},
  {cat:'stadtfest', name:'Würzburger Weihnachtsmarkt', loc:'Würzburg – Marktplatz', start:'2026-11-27', end:'2026-12-23', free:true, desc:'Weihnachtsmarkt auf dem Unteren Markt/Marktplatz Würzburg vor der Marienkapelle. Mo–Sa 10–20:30 Uhr, So 11–20:30 Uhr.', genre:'Weihnachtsmarkt / Tradition', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Straßenbahn bis Dom/Marktplatz', parking:'Parkhäuser Innenstadt Würzburg'},
  {cat:'stadtfest', name:'Tollwood Winterfestival München', loc:'München – Theresienwiese', start:'2026-11-24', end:'2026-12-31', free:true, desc:'Großes Kultur- und Winterfestival auf der Theresienwiese mit Markt der Ideen, Bio-Gastronomie, Live-Musik, Theater und Kinderprogramm. Eintritt frei (Konzerte teils ticketpflichtig). Silvesterparty am 31.12.', genre:'Kulturfestival / Markt / Musik', ticket:'https://www.tollwood.de', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'U4/U5 Theresienwiese', parking:'Sehr begrenzt – ÖPNV empfohlen'},
  // ─── NEU HINZUGEFÜGT KW 26 2026 ──────────────────────────────────────────
  {cat:'sport', name:'16. Nürnberger Seifenkistenrennen', loc:'Nürnberg – Burggraben (Tiergärtner Tor – Hallertor)', start:'2026-09-19', end:'2026-09-19', free:true, desc:'Tradition trifft Fantasie: Das Nürnberger Seifenkistenrennen im Burggraben zwischen Tiergärtner Tor und Hallertor. Spannendes Familien-Spektakel mit selbstgebauten Seifenkisten. Eintritt frei.', genre:'Seifenkistenrennen / Familie', ticket:'https://www.seifenkistenrennen-nbg.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1 Lorenzkirche, Fußweg zur Burg', parking:'Parkhäuser Altstadt'},
  {cat:'sport', name:'SportScheck RUN Nürnberg (Stadtlauf)', loc:'Nürnberg – Hauptmarkt', start:'2026-10-25', end:'2026-10-25', free:false, desc:'Größte Breitensport-Veranstaltung Nordbayerns mit rund 7.000 Teilnehmern. Start und Ziel am Hauptmarkt. Halbmarathon, 10-km- und 6-km-Lauf.', genre:'Laufen / Sport', ticket:'https://www.sportscheck.com/laufen', outdoor:true, ageMin:0, price:'Startgebühr je nach Distanz', oepnv:'U1 Lorenzkirche / Hauptmarkt', parking:'Parkhäuser Altstadt'},
  {cat:'messe', name:'Consumenta 2026', loc:'Nürnberg – Messe Nürnberg', start:'2026-10-31', end:'2026-11-08', free:false, desc:'Eine der größten Konsumgütermessen Deutschlands (seit 1952) mit großer Shoppingmeile, Beratung und Erlebnisbereichen auf rund 90.000 m². Veranstalter: AFAG.', genre:'Verbrauchermesse', ticket:'https://www.consumenta.de', outdoor:false, ageMin:0, price:'Tagesticket', oepnv:'U1 Messe', parking:'Messegelände'},

  // ── KW 33 Update 2026-08-10 ──────────────────────────────────────────────
  {cat:'freizeit', name:'GRUSEL-LAND – Halloween-Event', loc:'Geiselwind – Freizeit-Land Geiselwind', start:'2026-10-09', end:'2026-11-07', free:false, desc:'Größtes Halloweenfest Bayerns im Freizeit-Land Geiselwind – dekorierter Park mit tausenden Kürbissen und familienfreundlichem Halloween-Programm am Tag.', genre:'Freizeitpark / Halloween', ticket:'https://grusel-land.de', outdoor:true, ageMin:0, price:'Parkeintritt', oepnv:'PKW empfohlen', parking:'Vorhanden'},
  {cat:'family', name:'Собачье сердце – Russisches Theater', loc:'Ingolstadt', start:'2026-11-06', end:'2026-11-06', free:false, desc:'Theaterproduktion nach Michail Bulgakows Satire „Собачье сердце" (Hundeherz), mit Ivars Kalniņš, Igor Chalizow u.a.', genre:'Russisches Theater / Satire', ticket:'https://afishamira.com/event/spektakl-sobache-serdtse-v-ingolshtadte/', outdoor:false, ageMin:14, price:'Tickets im Vorverkauf', oepnv:'Bahn nach Ingolstadt Hbf', parking:'Vor Ort'},
  {cat:'family', name:'Балет «Лебединое озеро» – Solenne Ballet Classique', loc:'Fürth – Stadthalle', start:'2026-11-15', end:'2026-11-15', free:false, desc:'Klassisches Ballett „Schwanensee" zu Tschaikowskys Musik mit rund 30 Tänzern der internationalen Compagnie Solenne Ballet Classique.', genre:'Ballett', ticket:'https://www.kontramarka.de/tour/classique-ballet-solenne-schwanensee/', outdoor:false, ageMin:0, price:'ca. 29–79 €', oepnv:'U1 Fürth Hauptbahnhof, 5 min Fußweg', parking:'Parkhaus Fürth Innenstadt'},
  {cat:'kinder', name:'Nürnberger Kinderweihnacht', loc:'Nürnberg – Hans-Sachs-Platz', start:'2026-11-27', end:'2026-12-30', free:true, desc:'Kinderweihnachtsmarkt am Hans-Sachs-Platz mit Nostalgiekarussell, Dampfeisenbahn, Mitmachbuden und eigener Kinder-Weihnachtsbäckerei. Heiligabend verkürzt 10–14 Uhr, 25.12. geschlossen.', genre:'Weihnachtsmarkt / Familie', ticket:'https://www.christkindlesmarkt.de/fuer-kinder/kinderweihnacht/', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'U1/U2 Hauptbahnhof', parking:'Altstadt Parkhäuser'},
  {cat:'freizeit', name:'Erlangen like on Ice', loc:'Erlangen – Marktplatz', start:'2026-11-20', end:'2027-01-06', free:false, desc:'Eisbahn auf dem Erlanger Marktplatz mit Kinderkarussell und versteckten Wichteln zum Entdecken.', genre:'Eisbahn / Familie', ticket:'https://www.visit-erlangen.de/veranstaltungen/', outdoor:true, ageMin:0, price:'Eisbahn-Gebühr', oepnv:'Bahn bis Erlangen Hbf', parking:'Parkhäuser Innenstadt Erlangen'},
  {cat:'kinder', name:'Детский балет «Щелкунчик»', loc:'Nürnberg – Meistersingerhalle', start:'2026-12-12', end:'2026-12-12', free:false, desc:'Weihnachtliches Kinderballett „Der Nussknacker" zu Tschaikowskys Musik für die ganze Familie.', genre:'Ballett / Kinder', ticket:'https://www.kontramarka.de/tour/kinderballet-der-nussknacker/plan/2255/12946/', outdoor:false, ageMin:0, price:'ca. 57–79 €', oepnv:'U2 Messe/Stadion oder Tram 9', parking:'Parkplatz Meistersingerhalle'},
  {cat:'kinder', name:'Weihnachtscircus Regensburg – 10-jähriges Jubiläum', loc:'Regensburg – Dultplatz am Europakanal', start:'2026-12-16', end:'2027-01-06', free:false, desc:'Jubiläumsprogramm des Weihnachtscircus Regensburg mit internationalen Artisten – seit 10 Jahren rund 30.000 Besucher pro Saison.', genre:'Zirkus / Familie', ticket:'https://www.weihnachtscircus-regensburg.com/tickets-und-infos/', outdoor:false, ageMin:0, price:'Ermäßigung für Kinder 3–14 Jahre', oepnv:'Bahn bis Regensburg Hbf', parking:'Parkplätze Dultplatz'},
  {cat:'stadtfest', name:'Ansbacher Weihnachtsmarkt', loc:'Ansbach – Innenstadt', start:'2026-11-26', end:'2026-12-23', free:true, desc:'Weihnachtsmarkt in der Ansbacher Innenstadt mit weihnachtlichen Köstlichkeiten und Budenstadt.', genre:'Weihnachtsmarkt', ticket:'https://www.tourismus-ansbach.de/veranstaltungskalender/feste-maerkte/weihnachtsmarkt', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn nach Ansbach', parking:'Innenstadt Parkhäuser'},
  {cat:'stadtfest', name:'Schmiedeweihnacht Ansbach', loc:'Ansbach', start:'2026-12-04', end:'2026-12-06', free:true, desc:'Sonderevent zum Ansbacher Weihnachtsmarkt mit historischem Schmiedehandwerk und weihnachtlichem Rahmenprogramm.', genre:'Weihnachtsmarkt / Handwerk', ticket:'https://www.tourismus-ansbach.de/veranstaltungskalender/feste-maerkte/weihnachtsmarkt', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn nach Ansbach', parking:'Innenstadt Parkhäuser'},
  {cat:'stadtfest', name:'Alt-Rothenburger Reiterlesmarkt', loc:'Rothenburg ob der Tauber', start:'2026-11-20', end:'2026-12-23', free:true, desc:'Einer der beliebtesten Adventsmärkte Deutschlands mit 61 Buden in der historischen Altstadt und täglicher Bläsermusik. Geschlossen am 22.11. (Totensonntag).', genre:'Weihnachtsmarkt / Tradition', ticket:'https://www.rothenburg.de/erleben/veranstaltungen/weihnachtsmarkt-/-reiterlesmarkt', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn nach Rothenburg ob der Tauber', parking:'Parkplätze vor der Altstadt'},
  {cat:'family', name:'Балетные истории при свечах – „Зимнее волшебство"', loc:'Nürnberg – Meistersingerhalle', start:'2026-12-18', end:'2026-12-18', free:false, desc:'Ballett-Gala bei Kerzenschein mit Kammerorchester – Ausschnitte aus „Der Nussknacker", „Schwanensee" und „Carmen".', genre:'Ballett / Musik', ticket:'https://www.kontramarka.de/tour/winterzauber-ballettgeschichten-im-kerzenschein/plan/2170/12523/', outdoor:false, ageMin:0, price:'ca. 29–75 €', oepnv:'U2 Messe/Stadion oder Tram 9', parking:'Parkplatz Meistersingerhalle'},
  {cat:'kinder', name:'Балет «Щелкунчик»', loc:'Fürth – Stadthalle', start:'2026-12-18', end:'2026-12-18', free:false, desc:'Weihnachtliches Nussknacker-Ballett in der Stadthalle Fürth für die ganze Familie.', genre:'Ballett / Kinder', ticket:'https://afishamira.com/event/balet-shhelkunchik-v-fyurte-nyurnberg/', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'U1 Fürth Hauptbahnhof, 5 min Fußweg', parking:'Parkhaus Fürth Innenstadt'},
  {cat:'kinder', name:'Детский балет «Щелкунчик» (2. Termin)', loc:'Nürnberg – Meistersingerhalle', start:'2026-12-22', end:'2026-12-22', free:false, desc:'Zweiter Termin des weihnachtlichen Kinderballetts „Der Nussknacker" für die ganze Familie.', genre:'Ballett / Kinder', ticket:'https://www.kontramarka.de/tour/kinderballet-der-nussknacker/plan/2255/12946/', outdoor:false, ageMin:0, price:'ca. 57–79 €', oepnv:'U2 Messe/Stadion oder Tram 9', parking:'Parkplatz Meistersingerhalle'},
  {cat:'kinder', name:'Новогодние приключения Деда Мороза и Снегурочки', loc:'Nürnberg – Meistersingerhalle', start:'2026-12-20', end:'2026-12-20', free:false, desc:'Interaktives Neujahrsmärchen für Kinder mit Väterchen Frost, Snegurotschka und Baba Jaga, inkl. Disko und Fotos am Weihnachtsbaum.', genre:'Kindershow / Theater', ticket:'https://biletkartina.tv/ru/hall?event_id=1284822451', outdoor:false, ageMin:0, price:'ca. 39–55 €', oepnv:'U2 Messe/Stadion oder Tram 9', parking:'Parkplatz Meistersingerhalle'},
  {cat:'kinder', name:'Circus Flic Flac – Die X-Mas Show (Silvester-Sondershows)', loc:'Nürnberg – Ausweichplatz am Zeppelinfeld', start:'2026-12-31', end:'2026-12-31', free:false, desc:'Weihnachtszirkus Flic Flac mit drei Silvester-Sondervorstellungen ab ca. 11 Uhr – Action und Artistik für die ganze Familie. Wegen Bauarbeiten am Ausweichplatz Zeppelinfeld statt Volksfestplatz.', genre:'Zirkus / Familie', ticket:'https://www.adticket.de/Flic-Flac-Nurnberg-Die-X-Mas-Show.html', outdoor:false, ageMin:0, price:'ab ca. 35 €', oepnv:'Tram 8/9 bis Doku-Zentrum', parking:'Parkplätze Zeppelinfeld'},
  {cat:'family', name:'Балет «Лебединое озеро»', loc:'Amberg', start:'2026-12-28', end:'2026-12-28', free:false, desc:'Ballett „Schwanensee" in Amberg – klassisches Ballett zu Tschaikowskys Musik.', genre:'Ballett', ticket:'https://afishamira.com/event/balet-lebedinoe-ozero-v-amberge-nyurnberg/', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bahn nach Amberg', parking:'Innenstadt Parkhäuser'},
  {cat:'family', name:'Балет «Лебединое озеро» (weiterer Termin)', loc:'Fürth – Stadthalle', start:'2027-01-28', end:'2027-01-28', free:false, desc:'Weiterer Termin des Balletts „Schwanensee" in der Stadthalle Fürth.', genre:'Ballett', ticket:'https://afishamira.com/event/balet-lebedinoe-ozero-v-fyurte-2027/', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'U1 Fürth Hauptbahnhof, 5 min Fußweg', parking:'Parkhaus Fürth Innenstadt'},

  // ─── NEU HINZUGEFÜGT (KW 34 · 2026-08-20) ────────────────────────────────
  {cat:'zoo', name:'Herbstfest im Tiergarten Nürnberg', loc:'Nürnberg – Tiergarten', start:'2026-09-27', end:'2026-09-27', free:false, desc:'Aktionstag rund um die Wintervorbereitung im Tierreich: Mitmachstationen für Kinder, Infostände und Tierpfleger-Gespräche im Tiergarten am Schmausenbuck.', genre:'Familienaktionstag / Zoo', ticket:'https://tiergarten.nuernberg.de', outdoor:true, ageMin:0, price:'Tiergarten-Eintritt', oepnv:'Tram 5 bis Tiergarten', parking:'Parkplatz am Tiergarten'},
  {cat:'zoo', name:'Halloween im Tiergarten Nürnberg – Halloween trifft Biologie', loc:'Nürnberg – Tiergarten', start:'2026-10-31', end:'2026-10-31', free:false, desc:'Ausstellung zu Tieren mit Gruselfaktor plus Kürbisrallye durch den Tiergarten. Halloween-Spaß mit biologischem Hintergrundwissen für die ganze Familie.', genre:'Halloween / Zoo', ticket:'https://tiergarten.nuernberg.de', outdoor:true, ageMin:0, price:'Tiergarten-Eintritt', oepnv:'Tram 5 bis Tiergarten', parking:'Parkplatz am Tiergarten'},
  {cat:'freizeit', name:'Scary Nights Schloss Thurn 2026', loc:'Heroldsbach – Erlebnispark Schloss Thurn', start:'2026-10-23', end:'2026-11-07', free:false, desc:'Halloween-Nachtevent mit Horror-Mazes, Live-Erschreckern und Showprogramm, 18–01 Uhr. Termine: 23./24.10., 30./31.10. und 06./07.11. Empfohlen ab 16 Jahren.', genre:'Horror / Halloween', ticket:'https://www.schloss-thurn.de/tickets/', outdoor:true, ageMin:16, price:'Tickets über schloss-thurn.de', oepnv:'Auto empfohlen – Bahn bis Forchheim, dann Bus', parking:'Großer Parkplatz am Park'},
  {cat:'freizeit', name:'Familien-Halloweentage Schloss Thurn (1. Wochenende)', loc:'Heroldsbach – Erlebnispark Schloss Thurn', start:'2026-10-24', end:'2026-10-25', free:false, desc:'Halloween-Shows, Kindergrusellabyrinthe und Halloween-Attraktionen in der Westernstadt, 11–18 Uhr. Der gesamte Park ist geöffnet.', genre:'Halloween / Freizeitpark', ticket:'https://www.schloss-thurn.de/tickets/', outdoor:true, ageMin:0, price:'Tickets über schloss-thurn.de', oepnv:'Auto empfohlen – Bahn bis Forchheim, dann Bus', parking:'Großer Parkplatz am Park'},
  {cat:'freizeit', name:'Familien-Halloweentage Schloss Thurn (Hauptblock)', loc:'Heroldsbach – Erlebnispark Schloss Thurn', start:'2026-10-31', end:'2026-11-08', free:false, desc:'Neuntägiger Familien-Halloweenblock mit Shows, Kindergrusellabyrinthen und tausenden Kürbissen, täglich 11–18 Uhr.', genre:'Halloween / Freizeitpark', ticket:'https://www.schloss-thurn.de/tickets/', outdoor:true, ageMin:0, price:'Tickets über schloss-thurn.de', oepnv:'Auto empfohlen – Bahn bis Forchheim, dann Bus', parking:'Großer Parkplatz am Park'},
  {cat:'family', name:'Kulturterrasse Fürth 2026', loc:'Fürth – Uferterrasse der Stadthalle', start:'2026-08-28', end:'2026-09-06', free:true, desc:'Lokales Kulturfest auf der Uferterrasse der Stadthalle mit Livekonzerten von Rock über Indie bis Singer-Songwriter und eigenem Kinderkultur-Programm. Eintritt nach dem Prinzip „Zahle was du kannst", bei schlechtem Wetter in der Stadthalle.', genre:'Musik / Kinderkultur', ticket:'https://www.stadthalle-fuerth.de', outdoor:true, ageMin:0, price:'Zahle was du kannst', oepnv:'U1 Stadthalle Fürth', parking:'Parkhaus Stadthalle'},
  {cat:'family', name:'Apfelmarkt Fürth', loc:'Fürth – Stadtpark-Allee', start:'2026-10-18', end:'2026-10-18', free:true, desc:'Regionalmarkt mit großer Apfelsortenauswahl, Imkereiprodukten und Kunsthandwerk. Infostände zu Streuobst und Artenvielfalt mit Mitmachaktionen für Kinder.', genre:'Regionalmarkt / Familie', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'U1 Stadthalle Fürth', parking:'Parkhaus Stadthalle'},
  {cat:'family', name:'Fürther Glanzlichter 2026', loc:'Fürth – Innenstadt', start:'2026-11-06', end:'2026-11-07', free:true, desc:'Lichtkunst-Festival: Künstlerinnen und Künstler illuminieren zahlreiche Gebäude in Fürth. Abendlicher Spaziergang entlang der farbenfroh beleuchteten Fassaden.', genre:'Lichtkunst / Familie', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'U1 Fürth Rathaus', parking:'Parkhäuser Fürth Innenstadt'},
  {cat:'stadtfest', name:'Reichsstadt-Festtage Rothenburg 2026', loc:'Rothenburg ob der Tauber – Altstadt', start:'2026-09-04', end:'2026-09-06', free:false, desc:'Die gesamte Altstadt wird zum historischen Lager: Zeitreise durch über 700 Jahre Rothenburger Geschichte mit Lagerleben, Umzügen und Handwerk. Fr ab 18 Uhr, Sa/So ab 10 Uhr.', genre:'Historienfest / Stadtfest', ticket:'https://stadt.rothenburg.de', outdoor:true, ageMin:0, price:'Festabzeichen erforderlich', oepnv:'Bahn nach Rothenburg ob der Tauber', parking:'Parkplätze vor der Altstadt'},
  {cat:'stadtfest', name:'Regensburger Christkindlmarkt', loc:'Regensburg – Neupfarrplatz', start:'2026-11-19', end:'2026-12-20', free:true, desc:'Traditioneller Christkindlmarkt in mittelalterlicher Kulisse mit großem Weihnachtsbaum, Bühnenprogramm und der Adventskalenderfassade am Rathaus.', genre:'Weihnachtsmarkt / Tradition', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn nach Regensburg Hbf', parking:'Parkhäuser Altstadt Regensburg'},
  {cat:'stadtfest', name:'Romantischer Weihnachtsmarkt Schloss Thurn und Taxis', loc:'Regensburg – Schloss St. Emmeram', start:'2026-11-20', end:'2026-12-23', free:false, desc:'34 Tage romantischer Weihnachtsmarkt im Schlosshof mit Feuerstellen, Kunsthandwerk und Konzerten. Am Totensonntag (22.11.) geschlossen.', genre:'Weihnachtsmarkt / Tradition', ticket:'https://www.regensburg-bayern.de', outdoor:true, ageMin:0, price:'Ticket erforderlich', oepnv:'Bahn nach Regensburg Hbf', parking:'Parkhäuser Altstadt Regensburg'},
  {cat:'stadtfest', name:'Adventsmarkt Spitalgarten Regensburg', loc:'Regensburg – Spitalgarten an der Steinernen Brücke', start:'2026-11-23', end:'2026-12-23', free:true, desc:'Gemütlicher Adventsmarkt am Donauufer beim Spitalgarten mit Blick auf die Steinerne Brücke.', genre:'Weihnachtsmarkt / Tradition', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn nach Regensburg Hbf', parking:'Parkhäuser Altstadt Regensburg'},
  {cat:'stadtfest', name:'Lucreziamarkt Regensburg', loc:'Regensburg – Haidplatz & Kohlenmarkt', start:'2026-11-27', end:'2026-12-23', free:true, desc:'Kunsthandwerklicher Weihnachtsmarkt mit kreativen Einzelstücken und veganem Angebot am Haidplatz und Kohlenmarkt.', genre:'Weihnachtsmarkt / Kunsthandwerk', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn nach Regensburg Hbf', parking:'Parkhäuser Altstadt Regensburg'},
  {cat:'kinder', name:'Новогодние приключения Деда Мороза и Снегурочки (München)', loc:'München', start:'2026-12-23', end:'2026-12-23', free:false, desc:'Russischsprachige Kinder-Neujahrsvorstellung mit Väterchen Frost und Snegurotschka, 17 Uhr. München-Pendant zum Nürnberger Termin am 20.12.', genre:'Kindershow / Theater', ticket:'https://afishamira.com/event/novogodnie-priklyucheniya-deda-moroza-i-snegurochki-v-myunhene-2026/', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  // ─── NEU HINZUGEFÜGT (KW 35 · 2026-08-24) ───────────────────────────────
  {cat:'messe', name:'Chillventa 2026', loc:'Nürnberg – Messe Nürnberg', start:'2026-10-13', end:'2026-10-15', free:false, desc:'Weltleitmesse für Kälte-, Klima-, Lüftungs- und Wärmepumpentechnik, Kongress ab 12.10.', genre:'Fachmesse / Kältetechnik', ticket:'https://www.chillventa.de/de-de', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U1 bis Messe', parking:'Messegelände'},
  {cat:'messe', name:'it-sa Expo&Congress 2026', loc:'Nürnberg – Messe Nürnberg', start:'2026-10-27', end:'2026-10-29', free:false, desc:'Europas führende Fachmesse für IT-Sicherheit mit begleitendem Kongress.', genre:'Fachmesse / IT-Sicherheit', ticket:'https://www.itsa365.de/de-de/it-sa-expo-congress', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U1 bis Messe', parking:'Messegelände'},
  {cat:'messe', name:'BrauBeviale 2026', loc:'Nürnberg – Messe Nürnberg', start:'2026-11-10', end:'2026-11-12', free:false, desc:'Fachmesse für die Getränkewirtschaft entlang der gesamten Prozesskette.', genre:'Fachmesse / Getränke', ticket:'https://www.braubeviale.de/', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U1 bis Messe', parking:'Messegelände'},
  {cat:'messe', name:'Spielwarenmesse 2027', loc:'Nürnberg – Messe Nürnberg', start:'2027-02-02', end:'2027-02-06', free:false, desc:'Weltgrößte Fachmesse für Spielwaren – Neuheiten und Trends der Spielzeugbranche.', genre:'Fachmesse / Spielwaren', ticket:'https://www.spielwarenmesse.de/de/', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U1 bis Messe', parking:'Messegelände'},
  {cat:'messe', name:'BIOFACH 2027', loc:'Nürnberg – Messe Nürnberg', start:'2027-02-16', end:'2027-02-19', free:false, desc:'Weltleitmesse für Bio-Lebensmittel, parallel zur Naturkosmetikmesse VIVANESS.', genre:'Fachmesse / Bio-Lebensmittel', ticket:'https://www.biofach.de/de-de', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U1 bis Messe', parking:'Messegelände'},
  {cat:'messe', name:'IWA OutdoorClassics 2027', loc:'Nürnberg – Messe Nürnberg', start:'2027-03-04', end:'2027-03-07', free:false, desc:'Weltleitmesse für Jagd-, Schießsport-, Outdoor- und Sicherheitsausrüstung.', genre:'Fachmesse / Outdoor', ticket:'https://www.iwa.info/de-de', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U1 bis Messe', parking:'Messegelände'},
  {cat:'messe', name:'Freizeit Messe Nürnberg 2027', loc:'Nürnberg – Messe Nürnberg', start:'2027-03-10', end:'2027-03-14', free:false, desc:'Nordbayerns größte Urlaubs-, Reise-, Garten- und Freizeitmesse – auch für Familien.', genre:'Publikumsmesse / Freizeit', ticket:'https://www.freizeitmesse.de/', outdoor:false, ageMin:0, price:'Tagesticket', oepnv:'U1 bis Messe', parking:'Messegelände'},
  {cat:'messe', name:'embedded world 2027', loc:'Nürnberg – Messe Nürnberg', start:'2027-03-16', end:'2027-03-18', free:false, desc:'Weltleitmesse und Konferenz für Embedded-System-Technologien.', genre:'Weltleitmesse / Embedded', ticket:'https://www.embedded-world.de/de-de', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U1 bis Messe', parking:'Messegelände'},
  {cat:'stadtfest', name:'Erntedankfestzug zur Michaelis-Kirchweih', loc:'Fürth – Innenstadt', start:'2026-10-11', end:'2026-10-11', free:true, desc:'Großer Festzug mit rund 3.000 Mitwirkenden, Spielmannszügen und geschmückten Wagen ab 11 Uhr.', genre:'Festzug / Tradition', ticket:'https://www.fuerth.de/kultur-freizeit/veranstaltungen-termine/michaelis-kirchweih/erntedankfestzug/', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'U1 bis Fürth Rathaus', parking:'Parkhäuser Fürth Innenstadt'},
  {cat:'sport', name:'Start der Eislaufsaison 2026/27', loc:'Nürnberg – PSD Bank Nürnberg ARENA', start:'2026-10-03', end:'2026-10-03', free:false, desc:'Auftakt der öffentlichen Eislaufsaison mit Publikumslauf und Eisdisco in der Arena.', genre:'Eislaufen / Familie', ticket:'https://www.psd-nuernberg-arena.de/eislauf/preise-oeffnungszeiten/', outdoor:false, ageMin:0, price:'Tageskarte', oepnv:'U1 bis Messe', parking:'Parkplätze am Arena-Gelände'},
  {cat:'stadtfest', name:'Historischer Weihnachtsmarkt Neustädter Kirchenplatz', loc:'Erlangen – Neustädter Kirchenplatz', start:'2026-11-23', end:'2026-12-23', free:true, desc:'Mittelalterlich-historischer Weihnachtsmarkt als Teil des Erlanger Winterzaubers.', genre:'Weihnachtsmarkt / Historisch', ticket:'https://www.visit-erlangen.de/winterzauber/', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn nach Erlangen / Bus Innenstadt', parking:'Parkhäuser Erlangen Innenstadt'},
  {cat:'stadtfest', name:'Christkindlmarkt Ingolstadt', loc:'Ingolstadt – Theaterplatz', start:'2026-11-25', end:'2026-12-22', free:true, desc:'Budenstadt am Theaterplatz mit Märchenweg, Weihnachtsbahn und Kunsthandwerkermarkt.', genre:'Weihnachtsmarkt / Tradition', ticket:'https://www.christkindlmarkt-ingolstadt.de/', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn nach Ingolstadt Hbf', parking:'Parkhäuser Ingolstadt Innenstadt'},
  {cat:'freizeit', name:'Winterzauber im PLAYMOBIL-FunPark', loc:'Zirndorf – PLAYMOBIL-FunPark', start:'2026-11-28', end:'2027-02-14', free:false, desc:'Beleuchteter Zauberweg, Echteis-Schlittschuhbahn und Indoor-Spielstadt. Vom 24.–26.12. sowie 31.12. und 01.01. geschlossen.', genre:'Freizeitpark / Winter', ticket:'https://www.playmobil-funpark.de/funpark-entdecken/winterzauber', outdoor:true, ageMin:0, price:'Eintritt kostenpflichtig', oepnv:'Bus ab Zirndorf Bahnhof', parking:'Parkplätze am FunPark'},
  {cat:'freizeit', name:'Winter Wunderland Freizeit-Land Geiselwind', loc:'Geiselwind – Freizeit-Land Geiselwind', start:'2026-11-28', end:'2027-01-10', free:false, desc:'Winterpark mit Rollschuhbahn, 100.000 Lichtern und Weihnachtsmann, an ausgewählten Tagen 13–20 Uhr.', genre:'Freizeitpark / Winter', ticket:'https://freizeit-land.de/veranstaltungen/winter-wunderland-2026/', outdoor:true, ageMin:0, price:'Eintritt kostenpflichtig', oepnv:'Eingeschränkt – Anreise mit Auto empfohlen', parking:'Große Parkplätze vor Ort'},
  {cat:'family', name:'Holiday on Ice – MIRAGE', loc:'Nürnberg – Kia Metropol Arena', start:'2026-12-17', end:'2026-12-20', free:false, desc:'Neue Eisshow der Saison 2026/27 mit vier Vorstellungen in Nürnberg.', genre:'Eisshow / Familie', ticket:'https://holidayonice.com/de/', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'U1 bis Messe', parking:'Parkplätze am Arena-Gelände'},
  {cat:'sport', name:'Feuerwerk der Turnkunst – hope', loc:'Nürnberg – PSD Bank Nürnberg ARENA', start:'2027-01-15', end:'2027-01-15', free:false, desc:'Europas erfolgreichste Turnshow mit Akrobatik, Musik und Licht, Beginn 19 Uhr.', genre:'Turnshow / Akrobatik', ticket:'https://www.psd-nuernberg-arena.de/events/202700115-feuerwerk-der-turnkunst-1/', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'U1 bis Messe', parking:'Parkplätze am Arena-Gelände'},
  {cat:'family', name:'CAVALLUNA – Die Farben des Lebens', loc:'Nürnberg – PSD Bank Nürnberg ARENA', start:'2027-01-23', end:'2027-01-24', free:false, desc:'Große Pferdeshow mit rund 60 Pferden, Tanz und Live-Musik für die ganze Familie.', genre:'Pferdeshow / Familie', ticket:'https://www.cavalluna.com/de/tickets/nuernberg', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'U1 bis Messe', parking:'Parkplätze am Arena-Gelände'},
  {cat:'kinder', name:'Heavysaurus – Mission Dino Power Tour 2027', loc:'Nürnberg – Löwensaal', start:'2027-04-04', end:'2027-04-04', free:false, desc:'Dino-Metal für Kinder: Heavysaurus mit der Mission-Dino-Power-Tour, Beginn 14 Uhr.', genre:'Kinderkonzert / Rock', ticket:'https://www.loewensaal.com/konzert-details/heavysaurus-2027-04-04.html', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'kinder', name:'Новогодние приключения Деда Мороза и Снегурочки (Regensburg)', loc:'Regensburg – Kolpinghaus St. Erhard', start:'2026-12-06', end:'2026-12-06', free:false, desc:'Russischsprachige Väterchen-Frost-Kindershow im Kolpinghaus St. Erhard.', genre:'Kindershow / Neujahr', ticket:'https://biletkartina.tv/ru/hall?event_id=1284808649', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bahn nach Regensburg Hbf', parking:'Parkhäuser Altstadt Regensburg'},
  {cat:'kinder', name:'Новогодняя ёлка «Приключения в стране мыльных пузырей» (München)', loc:'München – Kulturzentrum Trudering', start:'2026-12-07', end:'2026-12-07', free:false, desc:'Russischsprachige Seifenblasen-Neujahrsshow für Kinder.', genre:'Kindershow / Neujahr', ticket:'https://biletkartina.tv/ru/hall?event_id=1285386436', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'kinder', name:'Детский балет «Щелкунчик» (Lappersdorf)', loc:'Lappersdorf – AURELIUM', start:'2026-12-11', end:'2026-12-11', free:false, desc:'Nussknacker als Kinderballett im AURELIUM bei Regensburg.', genre:'Kindershow / Neujahr', ticket:'https://www.kontramarka.de/tour/kinderballet-der-nussknacker/plan/2255/12936/', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bus ab Regensburg', parking:'Parkplätze am AURELIUM'},
  {cat:'kinder', name:'Детская ёлка «Щелкунчик — Время Волшебства!»', loc:'München – Kulturzentrum Trudering', start:'2026-12-14', end:'2026-12-14', free:false, desc:'Russischsprachige Nussknacker-Weihnachtsshow für Kinder.', genre:'Kindershow / Neujahr', ticket:'https://biletkartina.tv/ru/hall?event_id=1285443053', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'kinder', name:'Детский балет «Щелкунчик» (Ingolstadt)', loc:'Ingolstadt – Stadttheater', start:'2026-12-16', end:'2026-12-16', free:false, desc:'Nussknacker als Kinderballett im Ingolstädter Stadttheater.', genre:'Kindershow / Neujahr', ticket:'https://www.kontramarka.de/tour/kinderballet-der-nussknacker/plan/2255/12954/', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bahn nach Ingolstadt Hbf', parking:'Parkplätze am Stadttheater'},
  {cat:'kinder', name:'Детский балет «Щелкунчик» (München)', loc:'München – Alte Kongresshalle', start:'2026-12-20', end:'2026-12-20', free:false, desc:'Nussknacker als Kinderballett in der Alten Kongresshalle München.', genre:'Kindershow / Neujahr', ticket:'https://www.kontramarka.de/tour/kinderballet-der-nussknacker/plan/2255/12937/', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'kinder', name:'Новогодняя ёлка «Приключения в стране мыльных пузырей» (Ingolstadt)', loc:'Ingolstadt – Stadttheater', start:'2026-12-26', end:'2026-12-26', free:false, desc:'Russischsprachige Seifenblasen-Neujahrsshow für Kinder in Ingolstadt.', genre:'Kindershow / Neujahr', ticket:'https://biletkartina.tv/ru/hall?event_id=1285399425', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bahn nach Ingolstadt Hbf', parking:'Parkplätze am Stadttheater'},
];


const events = [
  // ─── NEU HINZUGEFÜGT (KW 37 · 2026-09-07) ────────────────────────────────
  {
    cat: 'afterwork',
    name: 'OLD SCHOOL – 80s • 90s • 2000s',
    loc: 'Nürnberg – Club SOCIETY',
    start: '2026-09-25',
    end: '2026-09-25',
    free: true,
    desc: 'Old-School-Party mit DJ Zimbo, Eintritt frei, Start 22 Uhr.',
    genre: '80er / 90er / 2000er',
    ticket: 'https://www.society-nuernberg.com/',
    outdoor: false,
    ageMin: 18,
    price: 'Eintritt frei',
    oepnv: 'U-Bahn Lorenzkirche / Weißer Turm',
    parking: 'Innenstadt Parkhäuser',
  },
  {
    cat: 'volksfest',
    name: 'Rock im Park 2027',
    loc: 'Nürnberg – Zeppelinfeld',
    start: '2027-06-04',
    end: '2027-06-06',
    free: false,
    desc: 'Großfestival mit Rock/Metal/Alternative-Line-up, u.a. Blink-182 als erster bestätigter Act (weitere Namen folgen).',
    genre: 'Rock / Metal / Alternative',
    ticket: 'https://www.rock-im-park.com/',
    outdoor: true,
    ageMin: 0,
    price: 'Preis noch offen',
    oepnv: 'S-Bahn/Tram Richtung Dutzendteich',
    parking: 'Ausgewiesene Parkflächen',
  },
  {
    cat: 'volksfest',
    name: 'Burning Beach Festival 2027',
    loc: 'Pleinfeld – Brombachsee',
    start: '2027-06-18',
    end: '2027-06-20',
    free: false,
    desc: 'Electronic-Festival am Brombachsee, u.a. mit Nina Kraviz, Kevin de Vries, Pan-Pot angekündigt.',
    genre: 'Electronic / Techno',
    ticket: 'https://burningbeach.de/',
    outdoor: true,
    ageMin: 16,
    price: 'Preis noch offen',
    oepnv: 'Bahn Richtung Pleinfeld, dann Shuttle',
    parking: 'Vorhanden am Brombachsee',
  },
  {
    cat: 'volksfest',
    name: 'Open Beatz Festival 2027',
    loc: 'Herzogenaurach – Poppenhofer Weiher',
    start: '2027-07-23',
    end: '2027-07-25',
    free: false,
    desc: 'Electronic/EDM-Festival mit über 200 Artists, Line-up folgt.',
    genre: 'Electronic / EDM',
    ticket: 'https://openbeatz.de/',
    outdoor: true,
    ageMin: 16,
    price: 'Preis noch offen',
    oepnv: 'Bahn nach Herzogenaurach, dann Shuttle',
    parking: 'Vorhanden',
  },
  {
    cat: 'volksfest',
    name: 'Erlanger Bergkirchweih 2027 (272.)',
    loc: 'Erlangen – An den Kellern',
    start: '2027-05-13',
    end: '2027-05-24',
    free: true,
    desc: '272. Ausgabe der traditionsreichen Erlanger Bergkirchweih, Anstich Donnerstag 17 Uhr.',
    genre: 'Volksfest',
    outdoor: true,
    ageMin: 0,
    oepnv: 'Fußweg von Erlangen Hbf',
    parking: 'Park&Ride ausgeschildert',
  },
  {
    cat: 'volksfest',
    name: '76. Bamberger Sandkerwa 2027',
    loc: 'Bamberg – Sandgebiet (Sandstraße)',
    start: '2027-08-19',
    end: '2027-08-23',
    free: true,
    desc: 'Eines der größten Volksfeste Bayerns rund um die Regnitz, mit Fischerstechen.',
    genre: 'Volksfest',
    outdoor: true,
    ageMin: 0,
    oepnv: 'Fußweg von Bamberg Innenstadt',
    parking: 'Park&Ride ausgeschildert',
  },
  {
    cat: 'volksfest',
    name: 'Würzburger Kiliani-Volksfest 2027',
    loc: 'Würzburg – Talavera',
    start: '2027-07-02',
    end: '2027-07-18',
    free: true,
    desc: 'Größtes Volksfest Unterfrankens (Termin laut Quellen ggf. ±1 Tag abweichend, vor Ort prüfen).',
    genre: 'Volksfest',
    outdoor: true,
    ageMin: 0,
    oepnv: 'Fußweg von Würzburg Hbf',
    parking: 'Ausgewiesene Parkflächen',
  },
  {
    cat: 'russian',
    name: '"Ужин с дураком" – Komödie mit Alexey Klimushkin',
    loc: 'Fürth – Stadthalle Fürth',
    start: '2026-09-14',
    end: '2026-09-14',
    free: false,
    desc: 'Russischsprachige Aufführung der französischen Kultkomödie, Beginn 19 Uhr.',
    genre: 'Theater / Komödie',
    ticket: 'https://nuernberg24.ru/ru/event/9423',
    outdoor: false,
    ageMin: 0,
    oepnv: 'Fußweg von Fürth Hauptbahnhof',
    parking: 'Parkhäuser Innenstadt Fürth',
  },
  {
    cat: 'russian',
    name: 'Армен Захарян – "30 секунд до Ренессанса" (Vortrag)',
    loc: 'Nürnberg',
    start: '2026-09-14',
    end: '2026-09-14',
    free: false,
    desc: 'Kunsthistorischer Vortrag auf Russisch, Beginn 19 Uhr. Genauer Veranstaltungsort noch zu klären.',
    genre: 'Vortrag / Kultur',
    ticket: 'https://afishamira.com/event/armen-zaharyan-v-nyurnberge-30-sekund-do-renessansa/',
    outdoor: false,
    ageMin: 0,
  },
  {
    cat: 'russian',
    name: 'Ирина Приходько – Stand-up',
    loc: 'Nürnberg – Orpheum',
    start: '2026-10-22',
    end: '2026-10-22',
    free: false,
    desc: 'Russischsprachiges Solo-Comedy-Programm.',
    genre: 'Comedy',
    ticket: 'https://afishamira.com/event/komik-irina-prihodko-v-nyurnberge/',
    outdoor: false,
    ageMin: 16,
    price: 'ab 45 €',
    oepnv: 'Fußweg von Nürnberg Hauptmarkt',
    parking: 'Innenstadt Parkhäuser',
  },
  {
    cat: 'russian',
    name: 'Балет "Лебединое озеро" (Solenne Ballet Classique)',
    loc: 'Fürth – Stadthalle Fürth',
    start: '2026-11-15',
    end: '2026-11-15',
    free: false,
    desc: 'Klassisches Ballett Schwanensee, russischsprachig vermarktet.',
    genre: 'Ballett',
    ticket: 'https://afishamira.com/event/balet-lebedinoe-ozero-v-fyurte/',
    outdoor: false,
    ageMin: 0,
    price: '29–79 €',
  },
  {
    cat: 'russian',
    name: 'Илья Аксельрод – Stand-up-Tour 2026',
    loc: 'Nürnberg – Orpheum',
    start: '2026-11-29',
    end: '2026-11-29',
    free: false,
    desc: 'Russischsprachiges Comedy-Programm, Beginn 20 Uhr.',
    genre: 'Comedy',
    ticket: 'https://nuernberg24.ru/ru/event/9436',
    outdoor: false,
    ageMin: 16,
  },
  {
    cat: 'russian',
    name: '"Звезда по имени Солнце" – Symphonic-Tribute an Kino',
    loc: 'Fürth – Stadthalle Fürth',
    start: '2026-12-03',
    end: '2026-12-03',
    free: false,
    desc: 'Czech Live Symphony Orchestra mit symphonischem Tribute an die Kult-Band Kino, Beginn 20 Uhr.',
    genre: 'Symphonic / Tribute',
    ticket: 'https://nuernberg24.ru/ru/event/9187',
    outdoor: false,
    ageMin: 0,
  },
  {
    cat: 'russian',
    name: 'Детский балет "Щелкунчик" (1. Termin)',
    loc: 'Nürnberg',
    start: '2026-12-12',
    end: '2026-12-12',
    free: false,
    desc: 'Kinderballett Nussknacker auf Russisch, Beginn 11 Uhr. Veranstaltungsort noch zu klären.',
    genre: 'Ballett / Kinder',
    ticket: 'https://afishamira.com/event/detskij-balet-shhelkunchik-v-nyurnberge/',
    outdoor: false,
    ageMin: 0,
  },
  {
    cat: 'russian',
    name: 'Theater The Chaika – "Как-нибудь выкрутимся!"',
    loc: 'Fürth – Stadthalle Fürth',
    start: '2026-12-14',
    end: '2026-12-14',
    free: false,
    desc: 'Russischsprachiges Theaterstück, Beginn 19:30 Uhr.',
    genre: 'Theater',
    ticket: 'https://nuernberg24.ru/ru/event/9442',
    outdoor: false,
    ageMin: 0,
  },
  {
    cat: 'russian',
    name: 'Балетные истории при свечах – "Зимнее волшебство"',
    loc: 'Nürnberg',
    start: '2026-12-18',
    end: '2026-12-18',
    free: false,
    desc: 'Ballettabend mit Live-Kammerorchester bei Kerzenschein, Beginn 19 Uhr. Veranstaltungsort noch zu klären.',
    genre: 'Ballett',
    ticket: 'https://afishamira.com/event/baletnye-istorii-pri-svechah-s-zhivym-kamernym-orkestrom-v-nyurnberge-zimnee-volshebstvo/',
    outdoor: false,
    ageMin: 0,
  },
  {
    cat: 'russian',
    name: 'Балет "Щелкунчик"',
    loc: 'Fürth – Stadthalle Fürth (vermutlich)',
    start: '2026-12-18',
    end: '2026-12-18',
    free: false,
    desc: 'Nussknacker-Ballett auf Russisch, Beginn 19 Uhr.',
    genre: 'Ballett / Kinder',
    ticket: 'https://afishamira.com/event/balet-shhelkunchik-v-fyurte-nyurnberg/',
    outdoor: false,
    ageMin: 0,
  },
  {
    cat: 'russian',
    name: 'Новогодние приключения Деда Мороза и Снегурочки',
    loc: 'Nürnberg',
    start: '2026-12-20',
    end: '2026-12-20',
    free: false,
    desc: 'Russische Neujahrs-Kindershow mit Väterchen Frost und Schneewittchen, Beginn 17 Uhr. Veranstaltungsort noch zu klären.',
    genre: 'Kindershow',
    ticket: 'https://afishamira.com/event/novogodnie-priklyucheniya-deda-moroza-i-snegurochki-v-nyurnberge/',
    outdoor: false,
    ageMin: 0,
  },
  {
    cat: 'russian',
    name: 'Детский балет "Щелкунчик" (2. Termin)',
    loc: 'Nürnberg',
    start: '2026-12-22',
    end: '2026-12-22',
    free: false,
    desc: 'Zweite Nussknacker-Vorstellung auf Russisch, Beginn 18:30 Uhr.',
    genre: 'Ballett / Kinder',
    ticket: 'https://afishamira.com/event/detskij-balet-shhelkunchik-v-nyurnberge-2026/',
    outdoor: false,
    ageMin: 0,
  },
  {
    cat: 'russian',
    name: 'Балет "Лебединое озеро"',
    loc: 'Amberg',
    start: '2026-12-28',
    end: '2026-12-28',
    free: false,
    desc: 'Klassisches Ballett Schwanensee, Beginn 19 Uhr. Veranstaltungsort in Amberg noch zu klären.',
    genre: 'Ballett',
    ticket: 'https://afishamira.com/event/balet-lebedinoe-ozero-v-amberge-nyurnberg/',
    outdoor: false,
    ageMin: 0,
  },
  {
    cat: 'russian',
    name: 'Балет "Лебединое озеро"',
    loc: 'Fürth – Stadthalle Fürth (vermutlich)',
    start: '2027-01-28',
    end: '2027-01-28',
    free: false,
    desc: 'Klassisches Ballett Schwanensee, Beginn 19 Uhr.',
    genre: 'Ballett',
    ticket: 'https://afishamira.com/event/balet-lebedinoe-ozero-v-fyurte-2027/',
    outdoor: false,
    ageMin: 0,
  },
  {
    cat: 'russian',
    name: 'Валерий Меладзе – Konzerttour 2026/2027',
    loc: 'Würzburg – Congress Centrum',
    start: '2027-02-23',
    end: '2027-02-23',
    free: false,
    desc: 'Konzert des russischen Popstars, Beginn 20 Uhr.',
    genre: 'Russian Pop',
    ticket: 'https://nuernberg24.ru/ru/event/9339',
    outdoor: false,
    ageMin: 0,
  },
  {
    cat: 'russian',
    name: 'Спектакль "Вий или Страшная тайна Гоголя"',
    loc: 'Fürth – Stadthalle Fürth (vermutlich)',
    start: '2027-04-14',
    end: '2027-04-14',
    free: false,
    desc: 'Russischsprachiges Theaterstück nach Gogol, Beginn 19:30 Uhr.',
    genre: 'Theater',
    ticket: 'https://afishamira.com/event/spektakl-vij-ili-strashnaya-tajna-gogolya-v-fyurte-nyurnberg/',
    outdoor: false,
    ageMin: 0,
  },
  {
    cat: 'festival',
    name: 'Studio Ghibli in Concert – Tribute to Joe Hisaishi',
    loc: 'Nürnberg – Meistersingerhalle',
    start: '2026-10-08',
    end: '2026-10-08',
    free: false,
    desc: 'Sinfonisches Tribute-Konzert zu den Filmmusiken von Joe Hisaishi (Studio Ghibli), Einlass 18:30 Uhr.',
    genre: 'Klassik / Filmmusik',
    ticket: 'https://semmel.de/',
    outdoor: false,
    ageMin: 0,
    price: 'ab 59,50 €',
  },
  {
    cat: 'festival',
    name: 'Mireille Mathieu',
    loc: 'Nürnberg – Meistersingerhalle',
    start: '2026-11-08',
    end: '2026-11-08',
    free: false,
    desc: 'Chanson-Konzert der französischen Sängerin.',
    genre: 'Chanson',
  },
  {
    cat: 'festival',
    name: 'Bamberger Symphoniker & Vladimir Jurowski (3. Meisterkonzert)',
    loc: 'Nürnberg – Meistersingerhalle',
    start: '2026-12-05',
    end: '2026-12-05',
    free: false,
    desc: 'Klassik-Konzert im Rahmen der Meisterkonzert-Reihe.',
    genre: 'Klassik',
  },
  {
    cat: 'festival',
    name: 'Pink Martini',
    loc: 'Nürnberg – Meistersingerhalle',
    start: '2027-04-10',
    end: '2027-04-10',
    free: false,
    desc: 'Konzert des internationalen Ensembles Pink Martini.',
    genre: 'World / Jazz',
  },
  {
    cat: 'festival',
    name: 'BAP – "Fünfzig Jahre – Die Zielgerade"',
    loc: 'Nürnberg – Kia Metropol Arena',
    start: '2026-12-09',
    end: '2026-12-09',
    free: false,
    desc: 'Abschiedstournee der Kölner Band BAP.',
    genre: 'Rock / Deutschrock',
  },
  {
    cat: 'festival',
    name: 'Riverdance 30 – Die neue Generation',
    loc: 'Nürnberg – Kia Metropol Arena',
    start: '2027-02-25',
    end: '2027-02-25',
    free: false,
    desc: 'Irische Tanzshow zum 30-jährigen Jubiläum.',
    genre: 'Tanzshow',
  },
  {
    cat: 'festival',
    name: 'Musikparade – Europas größte Tournee der Militär- und Blasmusik',
    loc: 'Nürnberg – Kia Metropol Arena',
    start: '2027-02-12',
    end: '2027-02-12',
    free: false,
    desc: 'Große Blasmusik-Show mit internationalen Ensembles.',
    genre: 'Blasmusik',
  },
  {
    cat: 'festival',
    name: 'Ehrlich Brothers – "Wonderworld – Aufbruch ins Unmögliche"',
    loc: 'Nürnberg – Frankenhalle',
    start: '2027-05-07',
    end: '2027-05-08',
    free: false,
    desc: 'Große Magic-Show der Ehrlich Brothers, zwei Vorstellungen.',
    genre: 'Magic / Show',
  },
  {
    cat: 'festival',
    name: 'Wincent Weiss – Arenatour 2027',
    loc: 'Nürnberg – Frankenhalle',
    start: '2027-01-14',
    end: '2027-01-14',
    free: false,
    desc: 'Konzert im Rahmen der Arenatour 2027.',
    genre: 'Pop',
  },
  {
    cat: 'festival',
    name: 'Asp',
    loc: 'Nürnberg – Löwensaal',
    start: '2026-10-10',
    end: '2026-10-10',
    free: false,
    desc: 'Konzert im Löwensaal.',
    genre: 'Wave / Gothic',
  },
  {
    cat: 'festival',
    name: 'Napalm Death',
    loc: 'Nürnberg – Löwensaal',
    start: '2026-11-06',
    end: '2026-11-06',
    free: false,
    desc: 'Konzert im Löwensaal.',
    genre: 'Grindcore',
  },
  {
    cat: 'festival',
    name: 'Strangelove – The Depeche Mode Experience "Black Celebration"',
    loc: 'Nürnberg – Löwensaal',
    start: '2026-11-27',
    end: '2026-11-27',
    free: false,
    desc: 'Tribute-Show für Depeche Mode.',
    genre: 'Tribute',
  },
  {
    cat: 'festival',
    name: 'Sondaschule',
    loc: 'Nürnberg – Löwensaal',
    start: '2026-12-08',
    end: '2026-12-08',
    free: false,
    desc: 'Konzert im Löwensaal.',
    genre: 'Rock',
  },
  {
    cat: 'festival',
    name: 'Tim Peters',
    loc: 'Nürnberg – Arena Nürnberger Versicherung',
    start: '2026-09-26',
    end: '2026-09-26',
    free: false,
    desc: 'Konzert in der Arena Nürnberger Versicherung.',
    genre: 'Pop',
  },
  {
    cat: 'festival',
    name: 'Bryan Adams',
    loc: 'Nürnberg – Arena Nürnberger Versicherung',
    start: '2026-10-06',
    end: '2026-10-06',
    free: false,
    desc: 'Konzert in der Arena Nürnberger Versicherung.',
    genre: 'Rock',
  },
  {
    cat: 'festival',
    name: 'Night of the JUMPs',
    loc: 'Nürnberg – Arena Nürnberger Versicherung',
    start: '2026-10-17',
    end: '2026-10-17',
    free: false,
    desc: 'Freestyle-Motocross-Show.',
    genre: 'Show / Sport',
  },
  {
    cat: 'festival',
    name: 'Disney in Concert',
    loc: 'Nürnberg – Arena Nürnberger Versicherung',
    start: '2026-10-27',
    end: '2026-10-27',
    free: false,
    desc: 'Filmmusik-Konzert mit Disney-Klassikern.',
    genre: 'Filmmusik',
  },
  {
    cat: 'russian',
    name: 'Deep Purple – "MAD IN EUROPE"',
    loc: 'Nürnberg – Arena Nürnberger Versicherung',
    start: '2026-11-07',
    end: '2026-11-07',
    free: false,
    desc: 'Rockkonzert, auch stark von der russischsprachigen Community nachgefragt.',
    genre: 'Rock',
  },
  {
    cat: 'festival',
    name: 'Tokio Hotel',
    loc: 'Nürnberg – Arena Nürnberger Versicherung',
    start: '2026-11-08',
    end: '2026-11-08',
    free: false,
    desc: 'Konzert in der Arena Nürnberger Versicherung.',
    genre: 'Pop / Rock',
  },
  {
    cat: 'festival',
    name: 'André Rieu',
    loc: 'Nürnberg – Arena Nürnberger Versicherung',
    start: '2027-01-14',
    end: '2027-01-14',
    free: false,
    desc: 'Konzert in der Arena Nürnberger Versicherung.',
    genre: 'Klassik / Walzer',
  },
  {
    cat: 'festival',
    name: 'Electric Callboy',
    loc: 'Nürnberg – Arena Nürnberger Versicherung',
    start: '2027-02-28',
    end: '2027-02-28',
    free: false,
    desc: 'Konzert in der Arena Nürnberger Versicherung.',
    genre: 'Metal / Electro',
  },
  {
    cat: 'festival',
    name: 'Sabaton',
    loc: 'Nürnberg – Arena Nürnberger Versicherung',
    start: '2027-04-22',
    end: '2027-04-22',
    free: false,
    desc: 'Konzert in der Arena Nürnberger Versicherung.',
    genre: 'Metal',
  },
  // ─── NEU HINZUGEFÜGT (KW 36 · 2026-08-31) ────────────────────────────────
  // Clubs, Rooftops & Afterwork
  {cat:'afterwork', name:'oneMore Rooftop Closing Party', loc:'Nürnberg – CineCittà Rooftop (Gewerbemuseumsplatz 3)', start:'2026-09-05', end:'2026-09-05', free:false, desc:'Letzte Rooftop-Party der oneMore-Saison auf der CineCittà-Dachterrasse – House Music, Pizza Slices und Spritz ab 16 Uhr.', genre:'House / Rooftop / Sundowner', ticket:'https://onemore.ticket.io/q2dYYWSu/', outdoor:true, ageMin:18, price:'7–12 €', oepnv:'U2/U3 Hauptbahnhof, 3 min Fußweg', parking:'Tiefgarage CineCittà'},
  {cat:'afterwork', name:'KISS KLUB pres. FIEDEL (Berghain)', loc:'Nürnberg – Die Rakete', start:'2026-09-12', end:'2026-09-12', free:false, desc:'Der KISS KLUB holt Berghain-Resident Fiedel für eine lange Techno-Nacht in die Rakete.', genre:'Techno', ticket:'https://dierakete.stagedates.com/', outdoor:false, ageMin:18, price:'Tickets im Vorverkauf', oepnv:'U1 Bärenschanze / Nachtbus', parking:'Parkhäuser Innenstadt Nürnberg'},
  {cat:'afterwork', name:'NOIR Rooftop', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-09-12', end:'2026-09-12', free:false, desc:'Rooftop-Event auf der 400 m² Dachterrasse des GATE mit Blick aufs Rollfeld, 17–23 Uhr.', genre:'House / Rooftop', ticket:'https://gate-nuernberg.de/Events/Show/199/', outdoor:true, ageMin:18, price:'Tickets im Vorverkauf', oepnv:'S-Bahn S2 bis Flughafen, Terminal 2', parking:'Flughafen Parkhaus P2/P3'},
  {cat:'afterwork', name:'oneMore Season Closing – the biggest ever', loc:'Nürnberg – Geyer Grounds (Nimrodstraße)', start:'2026-09-19', end:'2026-09-19', free:false, desc:'Großes Saison-Closing von oneMore mit zwei Bühnen und acht Artists, in- und outdoor ab 16 Uhr.', genre:'House / Electronic', ticket:'https://onemore.ticket.io/0Lbn2ezo/', outdoor:true, ageMin:18, price:'ab 12 €', oepnv:'U1 Bärenschanze / Bus Nimrodstraße', parking:'Begrenzt – ÖPNV empfohlen'},
  {cat:'afterwork', name:'ELEKTRISCH pres. TOMMAHAWK', loc:'Nürnberg – Die Rakete', start:'2026-09-26', end:'2026-09-26', free:false, desc:'Die Reihe ELEKTRISCH präsentiert Tommahawk in der Rakete.', genre:'Techno', ticket:'https://dierakete.stagedates.com/', outdoor:false, ageMin:18, price:'Tickets im Vorverkauf', oepnv:'U1 Bärenschanze / Nachtbus', parking:'Parkhäuser Innenstadt Nürnberg'},
  {cat:'afterwork', name:'High in the Sky – AfterWork Rooftop Party (Feiertag)', loc:'Design Offices, Königstorgraben 11, 5. OG', start:'2026-10-03', end:'2026-10-03', free:false, desc:'Feiertags-Rooftop-Party über den Dächern Nürnbergs von 15 bis 22 Uhr mit DJs, Welcome Drink und Special Act.', genre:'House / Charts / Rooftop', ticket:'https://skyeventsmore.ticket.io/YQaXm2yL/', outdoor:true, ageMin:18, price:'15 € VVK / 22 € AK', oepnv:'U-Bahn U1 bis Hauptbahnhof, 5 min Fußweg', parking:'Parkhäuser Altstadt'},
  {cat:'afterwork', name:'Puro Latino – GATE Club', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-10-09', end:'2026-10-09', free:false, desc:'Latino-Nacht im GATE Club am Flughafen mit Reggaetón, Salsa und Bachata ab 22 Uhr.', genre:'Latin / Reggaetón / Salsa', ticket:'https://veranstaltungen.meinestadt.de/nuernberg/event-detail/42499690/156095874', outdoor:false, ageMin:18, price:'ab 12,34 €', oepnv:'S-Bahn S2 bis Flughafen, Terminal 2', parking:'Flughafen Parkhaus P2/P3'},
  {cat:'afterwork', name:'DARK DISCO', loc:'Nürnberg – Club Stereo', start:'2026-11-20', end:'2026-11-20', free:false, desc:'Von Cold Wave über Electro-Pop bis Electroclash – die dunkle Seite der Discokugel im Club Stereo.', genre:'Wave / Electro / Postpunk', ticket:'https://club-stereo.net/party/', outdoor:false, ageMin:18, price:'Tickets an der Abendkasse', oepnv:'U1 Lorenzkirche, kurzer Fußweg', parking:'Parkhäuser Altstadt'},
  {cat:'afterwork', name:'Retro – Erwachsen durch die Nacht (Dezember)', loc:'Nürnberg – PARKS Stadtpark', start:'2026-12-12', end:'2026-12-12', free:false, desc:'Retro-Party ab 21 Uhr mit Best of 80er bis heute im PARKS am Stadtpark.', genre:'80er / Best of', ticket:'https://www.regioactive.de/party/retro-erwachsen-durch-die-nacht-nuernberg-parks-2026-12-12-Nz0CkX57V8', outdoor:false, ageMin:18, price:'10 € VVK / 12 € AK', oepnv:'Tram 8 bis Berliner Platz', parking:'Parkplätze am Stadtpark'},
  // Konzerte, Shows & Comedy
  {cat:'festival', name:'Lotte – Wenn du tanzen willst Tour 2026', loc:'Erlangen – E-Werk (Saal)', start:'2026-09-20', end:'2026-09-20', free:false, desc:'Popsängerin Lotte präsentiert ihr neues Album live im Erlanger E-Werk.', genre:'Pop', ticket:'https://www.regioactive.de/konzert/lotte-wenn-du-tanzen-willst-tour-2026-erlangen-kulturzentrum-e-werk-2026-09-20-tickets-ZG0lDRtKWT', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus bis Erlangen Zentrum / Bahn Erlangen', parking:'Parkhaus Großparkplatz Erlangen'},
  {cat:'festival', name:'BAROCK – Power Surge Tour', loc:'Nürnberg – Hirsch', start:'2026-09-26', end:'2026-09-26', free:false, desc:'Europas größte AC/DC-Tributeband spielt die Klassiker von Highway to Hell bis Thunderstruck live im Hirsch.', genre:'Rock / Tribute', ticket:'https://www.concertbuero-franken.de/konzert-details/barock-2026-09-26.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'U1 Frankenstraße, dann Fußweg', parking:'Parkplätze Vogelweiherstraße'},
  {cat:'festival', name:'Klavierabend Krystian Zimerman', loc:'Nürnberg – Meistersingerhalle', start:'2026-10-03', end:'2026-10-03', free:false, desc:'Solorezital des weltberühmten polnischen Pianisten Krystian Zimerman in der Meistersingerhalle.', genre:'Klassik', ticket:'https://www.regioactive.de/konzert/klavierabend-krystian-zimerman-nuernberg-meistersingerhalle-2026-10-03-tickets-MRkQ2X3nbY', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bus 45/65 bis Meistersingerhalle', parking:'Parkplätze an der Meistersingerhalle'},
  {cat:'festival', name:'Studio Ghibli in Concert', loc:'Nürnberg – Meistersingerhalle', start:'2026-10-08', end:'2026-10-08', free:false, desc:'Symphonische Hommage an die Filmmusik der japanischen Anime-Klassiker von Chihiro bis Totoro.', genre:'Filmmusik / Klassik', ticket:'https://www.regioactive.de/konzert/studio-ghibli-in-concert-a-symphonic-homage-to-the-best-of-japanese-anime-nuernberg-meistersingerhalle-2026-10-08-tickets-2FgFFRG0Kv', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bus 45/65 bis Meistersingerhalle', parking:'Parkplätze an der Meistersingerhalle'},
  {cat:'sonstige', name:'Dieter Nuhr – Nuhr auf Tour 2026 (Bamberg)', loc:'Bamberg – brose Arena', start:'2026-10-09', end:'2026-10-09', free:false, desc:'Dieter Nuhr seziert mit neuem Programm die Absurditäten der Gegenwart – Tourtermin in Bamberg.', genre:'Kabarett', ticket:'https://www.regioactive.de/comedy/dieter-nuhr-auf-tour-2026-neues-programm-bamberg-brose-arena-2026-10-09-tickets-scG5ZqmDP1', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bahn bis Bamberg Hbf, dann Bus zur Arena', parking:'Parkplätze an der brose Arena'},
  {cat:'sonstige', name:'Torsten Sträter – Live 2026', loc:'Würzburg – tectake Arena', start:'2026-10-09', end:'2026-10-09', free:false, desc:'Der Mann mit der Mütze mit neuem Programm in der Würzburger Arena. (Ticket-Link noch zu ergänzen.)', genre:'Comedy / Lesung', ticket:'', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bahn bis Würzburg Hbf, Tram Richtung Arena', parking:'Parkplätze an der tectake Arena'},
  {cat:'festival', name:'Beatrice Egli – Live 2026', loc:'Nürnberg – Kia Metropol Arena', start:'2026-10-22', end:'2026-10-22', free:false, desc:'Schlagerstar Beatrice Egli mit großer Bühnenshow in der Kia Metropol Arena. (Ticket-Link noch zu ergänzen.)', genre:'Schlager / Pop', ticket:'', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'U1 bis Messe', parking:'Parkplätze am Arena-Gelände'},
  {cat:'festival', name:'Olli Schulz – Allein in Deiner Stadt Tour 2026', loc:'Nürnberg – Meistersingerhalle', start:'2026-11-02', end:'2026-11-02', free:false, desc:'Olli Schulz zwischen Liedermacher-Abend und One-Man-Show – solo in der Meistersingerhalle.', genre:'Pop / Comedy', ticket:'https://www.regioactive.de/konzert/olli-schulz-allein-in-deiner-stadt-tour-2026-nuernberg-meistersingerhalle-2026-11-02-tickets-QwR7LDnc9X', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus 45/65 bis Meistersingerhalle', parking:'Parkplätze an der Meistersingerhalle'},
  {cat:'sonstige', name:'Quatsch Comedy Club – Die Live Show', loc:'Fürth – Comödie Fürth', start:'2026-11-04', end:'2026-11-04', free:false, desc:'Die legendäre Stand-up-Show mit wechselnden Comedians gastiert in der Comödie Fürth.', genre:'Comedy / Stand-up', ticket:'https://www.regioactive.de/comedy/quatsch-comedy-club-die-live-show-zu-gast-in-fuerth-comoedie-2026-11-04-tickets-rFNLyXdBsV', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'U1 bis Fürth Rathaus', parking:'Parkhäuser Innenstadt Fürth'},
  {cat:'festival', name:'Mireille Mathieu – Goodbye my Love Goodbye', loc:'Nürnberg – Meistersingerhalle', start:'2026-11-08', end:'2026-11-08', free:false, desc:'Das Finale der Welt-Abschiedstournee der französischen Chanson-Ikone.', genre:'Chanson', ticket:'https://www.regioactive.de/konzert/mireille-mathieu-goodbye-my-love-das-finale-der-welt-abschiedstournee-nuernberg-meistersingerhalle-2026-11-08-tickets-jQgfjw1lHD', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bus 45/65 bis Meistersingerhalle', parking:'Parkplätze an der Meistersingerhalle'},
  {cat:'festival', name:'Apsilon – Glanz Null Tour', loc:'Nürnberg – Z-Bau', start:'2026-11-10', end:'2026-11-10', free:false, desc:'Deutschrap-Konzert von Apsilon im Saal des Z-Bau.', genre:'Hip-Hop / Deutschrap', ticket:'https://www.regioactive.de/konzert/apsilon-glanz-null-tour-nuernberg-z-bau-2026-11-10-tickets-2ZnfygNtfq', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'U1 Frankenstraße + 10 min Fußweg', parking:'170 Parkplätze am Z-Bau'},
  {cat:'festival', name:'In Extremo – Tranquilo II Akustik Tour 2026', loc:'Nürnberg – Meistersingerhalle', start:'2026-11-12', end:'2026-11-12', free:false, desc:'Die Mittelalter-Rocker in ungewohnt akustischer Besetzung mit Dudelsack und Drehleier.', genre:'Folk-Rock / Mittelalter', ticket:'https://www.regioactive.de/konzert/in-extremo-tranquilo-ii-akustik-tour-2026-nuernberg-meistersingerhalle-2026-11-12-tickets-yTrMRFKcQz', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bus 45/65 bis Meistersingerhalle', parking:'Parkplätze an der Meistersingerhalle'},
  {cat:'sonstige', name:'ABBA on Stage – The Tribute Show', loc:'Fürth – Stadthalle', start:'2026-11-13', end:'2026-11-13', free:false, desc:'Tribute-Show mit den größten Hits der schwedischen Kultband ABBA in der Stadthalle Fürth.', genre:'Pop / Tribute', ticket:'https://www.regioactive.de/show/abba-on-stage-the-tribute-show-fuerth-stadthalle-2026-11-13-tickets-wGnVnV1g1Z', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'U1 Stadthalle Fürth', parking:'Parkhaus Stadthalle'},
  {cat:'sonstige', name:'LET’S DANCE – Die Live-Tour 2026', loc:'Nürnberg – PSD Bank Nürnberg ARENA', start:'2026-11-23', end:'2026-11-23', free:false, desc:'Die RTL-Tanzshow geht mit ihren Profitänzern und Promis in die nächste Live-Tour-Runde.', genre:'Tanz / Show', ticket:'https://www.regioactive.de/show/let-s-dance-die-live-tour-2026-nuernberg-psd-bank-arena-2026-11-23-tickets-NPcBkHZmF1', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'U1 bis Messe', parking:'Parkplätze am Arena-Gelände'},
  {cat:'sonstige', name:'Schwanensee – Grand Classic Ballet', loc:'Nürnberg – Meistersingerhalle', start:'2026-11-24', end:'2026-11-24', free:false, desc:'Tschaikowskys Ballettklassiker auf der traditionellen Wintertournee des Grand Classic Ballet.', genre:'Ballett / Klassik', ticket:'https://www.regioactive.de/theater/schwanensee-grand-classic-ballet-die-traditionelle-wintertournee-nuernberg-meistersingerhalle-2026-11-24-tickets-g88DK1SSY3', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bus 45/65 bis Meistersingerhalle', parking:'Parkplätze an der Meistersingerhalle'},
  {cat:'festival', name:'GREGORIAN – The Magical Christmas Tour 2026', loc:'Nürnberg – Meistersingerhalle', start:'2026-11-26', end:'2026-11-26', free:false, desc:'Gregorianische Choralgesänge treffen Pop-Hits im weihnachtlichen Gewand.', genre:'Choral / Pop', ticket:'https://www.regioactive.de/konzert/gregorian-the-magical-christmas-tour-2026-nuernberg-meistersingerhalle-2026-11-26-tickets-jd2xScrFld', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bus 45/65 bis Meistersingerhalle', parking:'Parkplätze an der Meistersingerhalle'},
  {cat:'sonstige', name:'Mario Barth – Männer sind nichts ohne die Frauen', loc:'Würzburg – tectake Arena', start:'2026-12-04', end:'2026-12-04', free:false, desc:'Mario Barth erzählt neue Geschichten aus dem Beziehungsalltag in der Würzburger Arena.', genre:'Comedy', ticket:'https://www.regioactive.de/comedy/mario-barth-maenner-sind-nichts-ohne-die-frauen-wuerzburg-tectake-arena-2026-12-04-tickets-FJSvFt2pVh', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bahn bis Würzburg Hbf, Tram Richtung Arena', parking:'Parkplätze an der tectake Arena'},
  {cat:'sonstige', name:'Fack Ju Göhte – Das Musical', loc:'Nürnberg – Meistersingerhalle', start:'2026-12-07', end:'2026-12-08', free:false, desc:'Die Musical-Fassung des Kinohits an zwei Abenden in der Meistersingerhalle.', genre:'Musical', ticket:'https://www.regioactive.de/musical/fack-ju-goehte-nuernberg-meistersingerhalle-2026-12-07-tickets-Xp6GjWF5DX', outdoor:false, ageMin:12, price:'Tickets im Vorverkauf', oepnv:'Bus 45/65 bis Meistersingerhalle', parking:'Parkplätze an der Meistersingerhalle'},
  {cat:'festival', name:'BAP – Live 2026', loc:'Nürnberg – Kia Metropol Arena', start:'2026-12-09', end:'2026-12-09', free:false, desc:'Wolfgang Niedecken und BAP mit Kölschrock-Klassikern in der Kia Metropol Arena. (Ticket-Link noch zu ergänzen.)', genre:'Rock', ticket:'', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'U1 bis Messe', parking:'Parkplätze am Arena-Gelände'},
  {cat:'festival', name:'J.B.O. – Blast Christmas 2026', loc:'Erlangen – E-Werk (Saal)', start:'2026-12-29', end:'2026-12-29', free:false, desc:'Die fränkische Comedy-Metal-Band lädt zum traditionellen Weihnachtskonzert ins E-Werk.', genre:'Comedy Metal', ticket:'https://www.regioactive.de/konzert/j-b-o-blast-christmas-2026-erlangen-kulturzentrum-e-werk-2026-12-29-tickets-lJmW5cqxqm', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bahn Erlangen, dann Bus Zentrum', parking:'Parkhaus Großparkplatz Erlangen'},
  {cat:'festival', name:'André Rieu – Tour 2027', loc:'Nürnberg – PSD Bank Nürnberg ARENA', start:'2027-01-14', end:'2027-01-14', free:false, desc:'Der Walzerkönig gastiert mit seinem Johann Strauss Orchester in Nürnberg.', genre:'Klassik / Walzer', ticket:'https://www.regioactive.de/konzert/andre-rieu-tour-2027-nuernberg-psd-bank-arena-2027-01-14-tickets-gQflDnL7vb', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'U1 bis Messe', parking:'Parkplätze am Arena-Gelände'},
  {cat:'sonstige', name:'Martin Rütter – SCHLUSS! AUS!', loc:'Bamberg – brose Arena', start:'2027-01-23', end:'2027-01-23', free:false, desc:'Der Hundeprofi nimmt nach 30 Jahren Bühne Abschied – Tourtermin in Bamberg.', genre:'Comedy', ticket:'https://www.regioactive.de/comedy/martin-ruetter-schluss-aus-bamberg-brose-arena-2027-01-23-tickets-vhghpJSP6w', outdoor:false, ageMin:12, price:'Tickets im Vorverkauf', oepnv:'Bahn bis Bamberg Hbf, dann Bus zur Arena', parking:'Parkplätze an der brose Arena'},
  {cat:'festival', name:'Ina Müller und Band – Die 6.0 Tour (Nürnberg)', loc:'Nürnberg – Kia Metropol Arena', start:'2027-01-30', end:'2027-01-30', free:false, desc:'Ina Müller mit Band, Liedern und Ansagen in der Kia Metropol Arena. (Ticket-Link noch zu ergänzen.)', genre:'Pop / Comedy', ticket:'', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'U1 bis Messe', parking:'Parkplätze am Arena-Gelände'},
  {cat:'festival', name:'Manowar – Kings Of Metal / Fighting The World Tour 2027', loc:'Regensburg – Donau-Arena', start:'2027-02-01', end:'2027-02-01', free:false, desc:'Die Metal-Legenden Manowar auf Jubiläumstour in der Donau-Arena Regensburg.', genre:'Metal', ticket:'https://www.regioactive.de/konzert/manowar-kings-of-metal-fighting-the-world-tour-2027-regensburg-donau-arena-2027-02-01-tickets-fTxSqk5rWJ', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bahn bis Regensburg Hbf, dann Bus', parking:'Parkplätze an der Donau-Arena'},
  {cat:'festival', name:'Die Fantastischen Vier – Der letzte Bus (Final Tour)', loc:'Nürnberg – PSD Bank Nürnberg ARENA', start:'2027-02-04', end:'2027-02-04', free:false, desc:'Die HipHop-Pioniere verabschieden sich nach über drei Jahrzehnten mit ihrer Abschiedstour.', genre:'HipHop', ticket:'https://www.regioactive.de/konzert/die-fantastischen-vier-der-letzte-bus-final-tour-26-28-nuernberg-psd-bank-arena-2027-02-04-7P2znHk7Hv', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'U1 bis Messe', parking:'Parkplätze am Arena-Gelände'},
  {cat:'sonstige', name:'Özcan Cosar – VIP', loc:'Nürnberg – PSD Bank Nürnberg ARENA', start:'2027-02-14', end:'2027-02-14', free:false, desc:'Özcan Cosar fragt in seiner neuen Show, wer hier eigentlich wichtig ist.', genre:'Comedy', ticket:'https://www.regioactive.de/comedy/oezcan-cosar-vip-nuernberg-psd-bank-arena-2027-02-14-tickets-VtJhQ08VBf', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'U1 bis Messe', parking:'Parkplätze am Arena-Gelände'},
  {cat:'sonstige', name:'Riverdance – 30 Jahre', loc:'Nürnberg – Kia Metropol Arena', start:'2027-02-25', end:'2027-02-25', free:false, desc:'Das irische Tanz-Original feiert 30 Jahre mit einer neuen Produktion.', genre:'Tanz / Show', ticket:'https://www.regioactive.de/tanz/riverdance-30-jahre-nuernberg-kia-metropol-arena-2027-02-25-tickets-2GwRjVGPT3', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'U1 bis Messe', parking:'Parkplätze am Arena-Gelände'},
  {cat:'sonstige', name:'Bülent Ceylan – Diktatürk', loc:'Bamberg – brose Arena', start:'2027-02-26', end:'2027-02-26', free:false, desc:'Bülent Ceylan mit seinem neuen Bühnenprogramm Diktatürk in Bamberg.', genre:'Comedy', ticket:'https://www.regioactive.de/comedy/buelent-ceylan-diktatuerk-bamberg-brose-arena-2027-02-26-tickets-rkvgYRcqVz', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bahn bis Bamberg Hbf, dann Bus zur Arena', parking:'Parkplätze an der brose Arena'},
  {cat:'festival', name:'Electric Callboy – Tanzneid World Tour', loc:'Nürnberg – PSD Bank Nürnberg ARENA', start:'2027-02-28', end:'2027-02-28', free:false, desc:'Die deutsche Party-Metal-Macht bringt ihre neue Welttournee nach Nürnberg.', genre:'Rock / Metal / Elektro', ticket:'https://www.regioactive.de/konzert/electric-callboy-tanzneid-world-tour-nuernberg-psd-bank-arena-2027-02-28-DGMzwGzpvK', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'U1 bis Messe', parking:'Parkplätze am Arena-Gelände'},
  {cat:'festival', name:'Max Raabe & Palast Orchester – Neues Programm 2027', loc:'Regensburg – Donau-Arena', start:'2027-03-04', end:'2027-03-04', free:false, desc:'Max Raabe präsentiert mit dem Palast Orchester sein neues Programm in Regensburg.', genre:'Klassik / Schlager', ticket:'https://www.regioactive.de/konzert/max-raabe-palast-orchester-neues-programm-2027-regensburg-donau-arena-2027-03-04-tickets-30bPH9mPz9', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bahn bis Regensburg Hbf, dann Bus', parking:'Parkplätze an der Donau-Arena'},
  {cat:'sonstige', name:'Die besten Comedians Deutschlands LIVE', loc:'Nürnberg – PSD Bank Nürnberg ARENA', start:'2027-03-18', end:'2027-03-18', free:false, desc:'Das TV-Erfolgsformat geht mit einem Staraufgebot auf große Arena-Tour.', genre:'Comedy', ticket:'https://www.regioactive.de/comedy/die-besten-comedians-deutschlands-live-nuernberg-psd-bank-arena-2027-03-18-tickets-QkxLF5PmZ0', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'U1 bis Messe', parking:'Parkplätze am Arena-Gelände'},
  {cat:'festival', name:'In Extremo & Feuerschwanz – Heute wird der Himmel brennen', loc:'Nürnberg – Kia Metropol Arena', start:'2027-04-23', end:'2027-04-23', free:false, desc:'Zwei Größen des Mittelalter-Rock gehen erstmals gemeinsam auf Tour.', genre:'Rock / Metal / Folk', ticket:'https://www.regioactive.de/konzert/in-extremo-feuerschwanz-heute-wird-der-himmel-brennen-tour-2027-nuernberg-kia-metropol-arena-2027-04-23-PTP0b89gdL', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'U1 bis Messe', parking:'Parkplätze am Arena-Gelände'},
  {cat:'festival', name:'In Flames + Trivium', loc:'Bamberg – brose Arena', start:'2027-04-25', end:'2027-04-25', free:false, desc:'Doppelheadliner-Show zweier Metal-Schwergewichte in der brose Arena. (Ticket-Link noch zu ergänzen.)', genre:'Metal', ticket:'', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bahn bis Bamberg Hbf, dann Bus zur Arena', parking:'Parkplätze an der brose Arena'},
  {cat:'sonstige', name:'Ehrlich Brothers – Wonderworld', loc:'Nürnberg – PSD Bank Nürnberg ARENA', start:'2027-05-07', end:'2027-05-08', free:false, desc:'Die Magier feiern ihr Jubiläum mit einer neuen Illusionsshow an zwei Terminen.', genre:'Magie / Show', ticket:'https://www.regioactive.de/show/ehrlich-brothers-wonderworld-aufbruch-ins-unmoegliche-nuernberg-psd-bank-arena-2027-05-07-tickets-1SgGFpDB1g', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'U1 bis Messe', parking:'Parkplätze am Arena-Gelände'},
  {cat:'festival', name:'Kastelruther Spatzen – Live 2027', loc:'Bamberg – brose Arena', start:'2027-05-22', end:'2027-05-22', free:false, desc:'Volksmusik-Erfolgsband aus Südtirol in der brose Arena Bamberg. (Ticket-Link noch zu ergänzen.)', genre:'Volksmusik / Schlager', ticket:'', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bahn bis Bamberg Hbf, dann Bus zur Arena', parking:'Parkplätze an der brose Arena'},
  // Kirchweihen, Volksfeste & Weinfeste
  {cat:'volksfest', name:'Kirchweih Weigenhofen', loc:'Leinburg – Weigenhofen', start:'2026-09-03', end:'2026-09-07', free:true, desc:'Fünftägige Dorfkirchweih im Nürnberger Land mit Kärwabaum, Festbetrieb und fränkischer Blasmusik.', genre:'Kirchweih / Tradition', ticket:'https://n-land.de/kirchweihen-feste', outdoor:true, ageMin:0, price:'Eintritt frei, Verzehr kostenpflichtig', oepnv:'S-Bahn S1 bis Lauf, dann Bus', parking:'Parkplätze im Ort'},
  {cat:'volksfest', name:'Kirchweih Simonshofen', loc:'Lauf a.d. Pegnitz – Simonshofen', start:'2026-09-11', end:'2026-09-13', free:true, desc:'Ortsteilkirchweih im Laufer Umland mit Bierausschank, Musik und Kärwabaum.', genre:'Kirchweih / Tradition', ticket:'https://n-land.de/kirchweihen-feste', outdoor:true, ageMin:0, price:'Eintritt frei, Verzehr kostenpflichtig', oepnv:'S-Bahn S1 bis Lauf, dann Bus', parking:'Parkplätze im Ort'},
  {cat:'weinfest', name:'Weinfest des Lions Club Zirndorf', loc:'Zirndorf – Zimmermannspark', start:'2026-09-11', end:'2026-09-12', free:true, desc:'Weinfest im Zimmermannspark mit fränkischen Weinen und Musik – Erlös geht an soziale Projekte des Lions Club.', genre:'Weinfest / Benefiz', ticket:'https://www.zirndorf-marketing.de/zirndorfer-veranstaltungshoehepunkte-2026', outdoor:true, ageMin:16, price:'Eintritt frei, Verzehr kostenpflichtig', oepnv:'S-Bahn S4 bis Zirndorf', parking:'Parkplätze am Zimmermannspark'},
  {cat:'volksfest', name:'Brunnenfest & Hämmernkirchweih mit „Rußigem Aid“', loc:'Lauf a.d. Pegnitz – Altstadt/Marktplatz', start:'2026-09-26', end:'2026-09-27', free:true, desc:'Historische Kirchweih mit Aufmarsch der „Rußigen“, Brunnenfest auf dem Marktplatz und verkaufsoffenem Sonntag.', genre:'Kirchweih / Tradition', ticket:'https://lauf.de/haemmernkirchweih', outdoor:true, ageMin:0, price:'Eintritt frei, Verzehr kostenpflichtig', oepnv:'S-Bahn S1 bis Lauf (links/rechts Pegnitz)', parking:'Parkplätze Innenstadt Lauf'},
  {cat:'volksfest', name:'Kirchweih Kirchröttenbach', loc:'Schnaittach – Kirchröttenbach', start:'2026-09-26', end:'2026-09-29', free:true, desc:'Viertägige Kirchweih am Festplatz Kirchröttenbach mit Livemusik und Kärwa-Frühschoppen.', genre:'Kirchweih / Tradition', ticket:'https://n-land.de/kirchweihen-feste', outdoor:true, ageMin:0, price:'Eintritt frei, Verzehr kostenpflichtig', oepnv:'S-Bahn S1 bis Schnaittach-Markt, dann Bus', parking:'Parkplätze am Festplatz'},
  {cat:'volksfest', name:'Kirchweih Kainsbach', loc:'Happurg – Kainsbach', start:'2026-09-27', end:'2026-09-27', free:true, desc:'Eintägige Dorfkirchweih im Nürnberger Land mit Frühschoppen und fränkischer Küche.', genre:'Kirchweih / Tradition', ticket:'https://n-land.de/kirchweihen-feste/kirchweih-kainsbach-2026-09-27', outdoor:true, ageMin:0, price:'Eintritt frei, Verzehr kostenpflichtig', oepnv:'S-Bahn S1 bis Hersbruck, dann Bus', parking:'Parkplätze im Ort'},
  {cat:'volksfest', name:'Kirchweih Günthersbühl', loc:'Rückersdorf – Günthersbühl', start:'2026-10-16', end:'2026-10-18', free:true, desc:'Herbstkärwa im Ortsteil Günthersbühl mit Bierausschank und Livemusik.', genre:'Kirchweih / Tradition', ticket:'https://n-land.de/kirchweihen-feste', outdoor:true, ageMin:0, price:'Eintritt frei, Verzehr kostenpflichtig', oepnv:'S-Bahn S1 bis Rückersdorf', parking:'Parkplätze im Ort'},
  {cat:'volksfest', name:'Kirchweih Hersbruck', loc:'Hersbruck – Altstadt', start:'2026-10-16', end:'2026-10-19', free:true, desc:'Traditionelle Herbstkirchweih in der Hersbrucker Altstadt mit Fahrgeschäften und Marktständen.', genre:'Kirchweih / Tradition', ticket:'https://n-land.de/kirchweihen-feste/kirchweih-hersbruck-2026-10-16', outdoor:true, ageMin:0, price:'Eintritt frei, Verzehr kostenpflichtig', oepnv:'S-Bahn S1 bis Hersbruck', parking:'Parkplätze Innenstadt Hersbruck'},
  {cat:'volksfest', name:'Martinikirchweih Herzogenaurach', loc:'Herzogenaurach – Innenstadt', start:'2026-11-06', end:'2026-11-09', free:true, desc:'Späte Kirchweih rund um den Martinstag mit Fahrgeschäften und Budenmeile in der Herzogenauracher Innenstadt.', genre:'Kirchweih / Tradition', ticket:'https://www.herzogenaurach.de/entdecken/feste-maerkte-und-messen/martinikirchweih', outdoor:true, ageMin:0, price:'Eintritt frei, Verzehr kostenpflichtig', oepnv:'Bus 205 ab Erlangen / Fürth', parking:'Parkplätze Innenstadt Herzogenaurach'},
  // ─── NEU HINZUGEFÜGT (KW 32 · 2026-08-03) ────────────────────────────────
  {cat:'afterwork', name:'Single Party – GATE Club', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-08-08', end:'2026-08-08', free:false, desc:'Single Party im GATE Club am Flughafen Nürnberg – 2 Areas und große Open-Air-Terrasse. DJ Alien mit Hits aus 90ern, 2000ern, 2010ern und Charts in Gate 1, DJ MAD mit Housemusic in der zweiten Area. Sa 8. August, ab 21 Uhr.', genre:'Party / Single / House', ticket:'https://feierliste.de/orte/2026-08-08/gate-airport-nuernberg', outdoor:false, ageMin:18, price:'VVK-Tickets auf feierliste.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen (5 € pauschal)'},
  {cat:'afterwork', name:'Formidable – Rooftop Edition', loc:'Nürnberg – Adina Rooftop, Dr.-Kurt-Schumacher-Str. 1', start:'2026-08-17', end:'2026-08-17', free:false, desc:'Formidable lädt wieder auf die Dachterrasse des Adina Apartment Hotels in Nürnberg – mit Julien Roger b2b Momi all day long. Limitiert auf 120 Tickets.', genre:'House / Rooftop / Deep', ticket:'https://tickets.infield.live/event/formidable-rooftop-edition-reg42k', outdoor:true, ageMin:18, price:'Tickets via infield.live', oepnv:'U-Bahn/S-Bahn Hauptbahnhof, kurzer Fußweg', parking:'Parkhäuser Hauptbahnhof'},
  {cat:'volksfest', name:'Sandkerwa Bamberg', loc:'Bamberg – Sandgebiet (Sandstraße)', start:'2026-08-20', end:'2026-08-24', free:true, desc:'76. Auflage der Bamberger Sandkerwa – Bambergs größtes Volksfest verwandelt die historische Altstadt rund um die Sandstraße in ein Festgebiet. Höhepunkte: Fischerstechen auf der Regnitz vor Klein Venedig und großes Abschlussfeuerwerk. Festgottesdienst bereits am 19. August.', genre:'Volksfest / Tradition', ticket:'https://www.sandkerwa.de', outdoor:true, ageMin:0, price:'Eintritt frei, Verzehr kostenpflichtig', oepnv:'Bahn bis Bamberg Hbf, dann Fußweg/Bus zur Altstadt', parking:'Parkhäuser Innenstadt Bamberg (begrenzt)'},
  {cat:'afterwork', name:'SOUL ROOFTOP – Rooftop Closing', loc:'Nürnberg – Adina Rooftop, Dr.-Kurt-Schumacher-Str. 1', start:'2026-08-29', end:'2026-08-29', free:false, desc:'Saisonabschluss der SOUL ROOFTOP-Reihe auf der Dachterrasse des Adina Apartment Hotels – mit Freunden von Studio Wolny und Jens. 17–22 Uhr, danach Einlass in den Club Stereo (ab 23 Uhr) im Ticketpreis enthalten. Limitiert auf 120 Tickets.', genre:'House / Rooftop / Deep', ticket:'https://tickets.infield.live/event/soul-rooftop-rooftop-closing-9o1zql', outdoor:true, ageMin:18, price:'Tickets via infield.live', oepnv:'U-Bahn/S-Bahn Hauptbahnhof, kurzer Fußweg', parking:'Parkhäuser Hauptbahnhof'},
  {cat:'volksfest', name:'Annafest Forchheim', loc:'Forchheim – Kellerwald', start:'2026-07-24', end:'2026-08-03', free:true, desc:'186. Annafest – eines der schönsten Kellerfeste Deutschlands im Forchheimer Kellerwald. Sechs Bühnen mit Musik, traditioneller Bieranstich, Annafestzug am 25. Juli und Festgottesdienst am 2. August. Bierkeller täglich ab 11 Uhr geöffnet, Ausschank bis 23:30 Uhr.', genre:'Bier / Kellerfest / Tradition', ticket:'https://www.annafest.bayern', outdoor:true, ageMin:0, price:'Eintritt frei, Verzehr kostenpflichtig', oepnv:'Bahn bis Forchheim Bahnhof, dann Fußweg zum Kellerwald', parking:'Begrenzt – ÖPNV empfohlen'},
  // ─── NEU HINZUGEFÜGT (KW 30 · 2026-07-20) ────────────────────────────────
  {cat:'sonstige', name:'Texttage Nürnberg 2026', loc:'Nürnberg – Katharinenruine & Innenstadt', start:'2026-07-16', end:'2026-07-19', free:false, desc:'Literaturfestival mit Meisterklassen, Lesungen, text.talk-Gesprächen, Comic-Workshops und dem kostenfreien textualienmarkt. Gastland Tschechien. Am Samstagabend Konzert der Nürnberger Musikerin Vronsy in der Katharinenruine.', genre:'Literatur / Kultur', ticket:'https://texttage.nuernberg.de/', outdoor:true, ageMin:0, price:'Teils kostenlos, Lesungen ticketpflichtig', oepnv:'U-Bahn Lorenzkirche / Innenstadt', parking:'Parkhäuser Altstadt'},
  {cat:'weinfest', name:'Abtswinder Weinfest', loc:'Abtswind – Marktplatz', start:'2026-10-04', end:'2026-10-25', free:true, desc:'Herbstliches Weinfest im Weinort Abtswind am Steigerwald. An mehreren Wochenenden im Oktober fränkische Weine, regionale Spezialitäten und gesellige Atmosphäre.', genre:'Weinfest', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bus/Bahn über Kitzingen', parking:'Vorhanden'},
  // ─── NEU HINZUGEFÜGT (KW 29 · 2026-07-13) ────────────────────────────────
  {cat:'festival', name:'Nena – Live 2026', loc:'Nürnberg – Kia Metropol Arena', start:'2026-10-19', end:'2026-10-19', free:false, desc:'Nena kehrt für eine über zweistündige Live-Show in die Kia Metropol Arena zurück – mit Hits und Perlen aus ihrem riesigen Repertoire. Einlass 18:30, Beginn 20:00 Uhr.', genre:'Pop / NDW', ticket:'https://kia-metropol-arena.de/event/nena-live-2026', outdoor:false, ageMin:0, price:'Tickets bei eventim.de', oepnv:'U1 bis Messe / Kia Metropol Arena', parking:'Vorhanden am Arena-Gelände'},
  {cat:'sonstige', name:'Dieter Nuhr – Nuhr auf Tour 2026', loc:'Nürnberg – Meistersingerhalle', start:'2026-09-25', end:'2026-09-25', free:false, desc:'Kabarettist Dieter Nuhr präsentiert sein neues Programm „Nuhr auf Tour 2026" – kluge, komische Zeitanalyse. Beginn 20:00 Uhr. Veranstaltung ausverkauft.', genre:'Comedy / Kabarett', ticket:'https://nuhr.de/index.php/shop/eintrittskarten/neues-programm-nuhr-auf-tour-2026-25092026-meistersingerhalle-nuernberg', outdoor:false, ageMin:0, price:'ausverkauft', oepnv:'U-Bahn Innenstadt, dann Bus zur Meistersingerhalle', parking:'Parkplätze am Luitpoldhain'},
  {cat:'festival', name:'Lords of the Sound – Musik von Hans Zimmer', loc:'Nürnberg – Meistersingerhalle', start:'2026-11-09', end:'2026-11-09', free:false, desc:'Das Orchester Lords of the Sound spielt die großen Filmmusiken von Hans Zimmer – u.a. aus Dune, Interstellar, Gladiator, Pirates of the Caribbean und The Dark Knight. Beginn 20:00 Uhr.', genre:'Filmmusik / Orchester', ticket:'https://www.eventim.de/event/musik-von-hans-zimmer-gespielt-von-lords-of-the-sound-meistersingerhalle-nuernberg-21433901/', outdoor:false, ageMin:0, price:'49–89 €', oepnv:'U-Bahn Innenstadt, dann Bus zur Meistersingerhalle', parking:'Parkplätze am Luitpoldhain'},
  {cat:'festival', name:'Sabaton – The Legendary Tour (mit Legendary Orchestra)', loc:'Nürnberg – PSD Bank Nürnberg ARENA', start:'2027-04-22', end:'2027-04-22', free:false, desc:'Die schwedische Power-Metal-Band Sabaton kommt mit der „Legendary Tour Part 2" und dem Legendary Orchestra nach Nürnberg – eine von nur fünf Deutschland-Shows. Beginn 19:00 Uhr.', genre:'Power Metal', ticket:'https://www.eventim.de/artist/sabaton/', outdoor:false, ageMin:0, price:'Tickets bei eventim.de', oepnv:'U-Bahn U1 bis Messe, dann kurzer Fußweg', parking:'Begrenzt – ÖPNV empfohlen'},
  // ─── NEU HINZUGEFÜGT (KW 28 · 2026-07-07) ────────────────────────────────
  {cat:'festival', name:'Hollywood Vampires – UK & European Tour 2026', loc:'Nürnberg – PSD Bank Nürnberg ARENA', start:'2026-08-25', end:'2026-08-25', free:false, desc:'Rock-Supergroup um Johnny Depp, Alice Cooper, Joe Perry (Aerosmith) und Tommy Henriksen live in Nürnberg – eine von nur drei exklusiven Deutschland-Shows der Tour 2026.', genre:'Rock', ticket:'https://www.psd-nuernberg-arena.de/events/veranstaltungskalender/', outdoor:false, ageMin:0, price:'Tickets bei eventim.de', oepnv:'U-Bahn U1 bis Messe, dann kurzer Fußweg', parking:'Begrenzt – ÖPNV empfohlen'},
  {cat:'sonstige', name:'Hazel Brugger – Good Evening Europe', loc:'Nürnberg – Meistersingerhalle', start:'2026-09-19', end:'2026-09-19', free:false, desc:'Comedy-Star Hazel Brugger präsentiert ihr fünftes Bühnenprogramm „Good Evening Europe" in der Meistersingerhalle. Beginn 20:00 Uhr. Veranstaltung ausverkauft.', genre:'Comedy / Kabarett', ticket:'https://www.concertbuero-franken.de/konzert-details/hazel-brugger-2026-09-19.html', outdoor:false, ageMin:0, price:'ausverkauft', oepnv:'U-Bahn Innenstadt, dann Bus zur Meistersingerhalle', parking:'Parkplätze am Luitpoldhain'},
  {cat:'festival', name:'Andreas Gabalier – Unplugged Tour 2026', loc:'Nürnberg – Meistersingerhalle', start:'2026-10-24', end:'2026-10-24', free:false, desc:'Andreas Gabalier feiert 10 Jahre Volks-Rock-n-Roll mit seiner großen Unplugged-Tour im Herbst 2026 – live in der Meistersingerhalle Nürnberg. Beginn 20:00 Uhr.', genre:'Volks-Rock / Pop', ticket:'https://www.ticketmaster.de/artist/andreas-gabalier-tickets/909615', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'U-Bahn Innenstadt, dann Bus zur Meistersingerhalle', parking:'Parkplätze am Luitpoldhain'},
  // ─── NEU HINZUGEFÜGT (KW 27 · 2026-06-29) ────────────────────────────────
  {cat:'festival', name:'AnnenMayKantereit – Live 2026', loc:'Nürnberg – PSD Bank Nürnberg ARENA', start:'2026-07-01', end:'2026-07-01', free:false, desc:'Die Kölner Band live in Nürnberg im Rahmen ihrer Tour 2026. Indie-/Pop-Rock mit der unverkennbaren Stimme von Henning May.', genre:'Indie / Pop-Rock', ticket:'https://www.eventim.de/event/annenmaykantereit-live-2026-psd-bank-nuernberg-arena-20406634/', outdoor:false, ageMin:0, price:'ab 61,95 €', oepnv:'U-Bahn U1 bis Messe, dann kurzer Fußweg', parking:'Begrenzt – ÖPNV empfohlen'},
  {cat:'festival', name:'Bryan Adams – Roll With The Punches Tour', loc:'Nürnberg – PSD Bank Nürnberg ARENA', start:'2026-10-06', end:'2026-10-06', free:false, desc:'Rock-Legende Bryan Adams live mit allen Hits aus über vier Jahrzehnten – „Summer of 69", „Run To You", „(Everything I Do) I Do It For You". Konzert ausverkauft.', genre:'Rock', ticket:'https://www.eventim.de/', outdoor:false, ageMin:0, price:'ausverkauft', oepnv:'U-Bahn U1 bis Messe, dann kurzer Fußweg', parking:'Begrenzt – ÖPNV empfohlen'},
  {cat:'festival', name:'K-POP FOREVER!', loc:'Nürnberg – PSD Bank Nürnberg ARENA', start:'2026-10-20', end:'2026-10-20', free:false, desc:'Die größte K-Pop-Tribute-Show der Welt – Megahits von BLACKPINK, BTS, TWICE u.v.m. live mit aufwendiger Bühnenproduktion.', genre:'K-Pop', ticket:'https://www.eventim.de/', outdoor:false, ageMin:0, price:'Tickets bei eventim.de', oepnv:'U-Bahn U1 bis Messe, dann kurzer Fußweg', parking:'Begrenzt – ÖPNV empfohlen'},
  {cat:'festival', name:'Deep Purple', loc:'Nürnberg – PSD Bank Nürnberg ARENA', start:'2026-11-07', end:'2026-11-07', free:false, desc:'Hardrock-Legende Deep Purple live in der PSD Bank Nürnberg ARENA. Beginn 19:00 Uhr.', genre:'Hard Rock', ticket:'https://www.eventim.de/', outdoor:false, ageMin:0, price:'Tickets bei eventim.de', oepnv:'U-Bahn U1 bis Messe, dann kurzer Fußweg', parking:'Begrenzt – ÖPNV empfohlen'},

  // ─── BIERFESTE ───────────────────────────────────────────────────────────
  {cat:'volksfest', name:'Erlanger Bergkirchweih', loc:'Erlangen – An den Kellern', start:'2026-05-21', end:'2026-06-01', free:true, desc:'Das älteste Bierfest der Welt – 12 Tage unter den Linden, ~1 Mio. Besucher. Eintritt frei!', genre:'Bier / Tradition', ticket:'https://www.erlangen.de/themenseite/thema/bergkirchweih', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus & Bahn bis Erlangen Hbf, dann 10 min Fußweg', parking:'Begrenzt – ÖPNV empfohlen'},
  {cat:'volksfest', name:'Fränkisches Bierfest', loc:'Nürnberg – Burggraben', start:'2026-06-03', end:'2026-06-07', free:true, desc:'Über 40 Brauereien, 100+ Biersorten im längsten Biergarten Europas. Eintritt frei! 5 Bühnen.', genre:'Bierfest', ticket:'https://www.bierfest-franken.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1 bis Lorenzkirche, dann 10 min Fußweg über Hauptmarkt', parking:'Altstadt Parkhäuser in der Nähe'},
  {cat:'volksfest', name:'Feuchter Kirchweih', loc:'Feucht (Nürnberger Land)', start:'2026-07-17', end:'2026-07-22', free:false, desc:'6 Tage Bierzelt, Blasmusik & Fahrgeschäfte. Bieranstich durch Bgm. Kotzur.', genre:'Bier / Kirchweih', ticket:'', outdoor:true, ageMin:0, price:'Freier Eintritt, Verzehr kostenpflichtig', oepnv:'S-Bahn S2 bis Feucht', parking:'Vorhanden am Festplatz'},
  {cat:'volksfest', name:'Rother Kirchweih', loc:'Roth', start:'2026-08-07', end:'2026-08-11', free:false, desc:'Erstmals 1531 erwähnt – 5 Tage Festzelt mit Feuerwerk am Ende.', genre:'Bier / Tradition', ticket:'', outdoor:true, ageMin:0, price:'Freier Eintritt, Verzehr kostenpflichtig', oepnv:'S-Bahn S1 bis Roth Bahnhof', parking:'Parkplätze am Festgelände'},

  // ─── GROSSE VOLKSSEFTE ───────────────────────────────────────────────────
  {cat:'volksfest', name:'Michaelis-Kirchweih Fürth', loc:'Fürth – Innenstadt', start:'2026-10-03', end:'2026-10-14', free:true, desc:'Königin der fränkischen Kirchweihen – 900+ Jahre, Süddeutschlands größte Straßenkirchweih. Erntedankfestzug 11. Oktober. Eintritt frei!', genre:'Volksfest', ticket:'https://www.fuerth.de/kultur-freizeit/veranstaltungen-termine/michaelis-kirchweih/', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U1 bis Fürth Hauptbahnhof', parking:'Kärwa-Ticket gilt als VGN-Ticket'},

  // ─── NÜRNBERG STADTTEIL-KÄRWAS ───────────────────────────────────────────
  {cat:'volksfest', name:'Schweinau Kirchweih', loc:'Nürnberg-Schweinau', start:'2026-05-14', end:'2026-05-18', free:true, desc:'Traditionelle Stadtteil-Kärwa.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U2/U3 Richtung Schweinau', parking:'Straße'},
  {cat:'volksfest', name:'Kleinreuth h.d.V. Kirchweih', loc:'Nürnberg-Kleinreuth', start:'2026-05-14', end:'2026-05-17', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg Hbf', parking:'Straße'},
  {cat:'volksfest', name:'Mögeldorf Kirchweih', loc:'Nürnberg-Mögeldorf', start:'2026-05-21', end:'2026-05-25', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Tram 8 bis Mögeldorf', parking:'Straße'},
  {cat:'volksfest', name:'Laufamholz Kirchweih', loc:'Nürnberg-Laufamholz', start:'2026-05-22', end:'2026-05-26', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S3 bis Laufamholz', parking:'Straße'},
  {cat:'volksfest', name:'Gostenhof Kirchweih', loc:'Nürnberg-Gostenhof', start:'2026-05-29', end:'2026-06-02', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U3 bis Gostenhof', parking:'Begrenzt'},
  {cat:'volksfest', name:'Kirchweih Wachendorf', loc:'Cadolzburg-Wachendorf', start:'2026-05-29', end:'2026-06-01', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Cadolzburg', parking:'Vorhanden'},
  {cat:'volksfest', name:'Nordostbahnhof Kirchweih', loc:'Nürnberg-Schoppershof', start:'2026-06-04', end:'2026-06-08', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U1 bis Schoppershof', parking:'Straße'},
  {cat:'volksfest', name:'Kirchweih Röttenbach', loc:'Röttenbach (Lkr. Roth)', start:'2026-06-12', end:'2026-06-15', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S1 Richtung Roth', parking:'Vorhanden'},
  {cat:'volksfest', name:'Kirchweih Pfaffenhofen', loc:'Roth-Pfaffenhofen', start:'2026-06-12', end:'2026-06-15', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Roth Bahnhof', parking:'Vorhanden'},
  {cat:'volksfest', name:'Großreuth h.d.V. Kirchweih', loc:'Nürnberg-Großreuth', start:'2026-06-12', end:'2026-06-15', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U2 Richtung Röthenbach', parking:'Straße'},
  {cat:'volksfest', name:'Cadolzburger Kirchweih', loc:'Cadolzburg', start:'2026-06-18', end:'2026-06-24', free:true, desc:'Betzntanz, Brühtrogrennen am Bauhofweiher, Bieranstich.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Cadolzburg', parking:'Parkplätze im Ort'},
  {cat:'volksfest', name:'Eibach Kirchweih', loc:'Nürnberg-Eibach', start:'2026-06-19', end:'2026-06-23', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U2 bis Eibach', parking:'Straße'},
  {cat:'volksfest', name:'St. Johannis Kirchweih', loc:'Nürnberg-St. Johannis', start:'2026-06-19', end:'2026-06-23', free:true, desc:'21. Juni: Führungen & Ausstellungen im Barockgarten.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U1 bis Gostenhof', parking:'Begrenzt'},
  {cat:'volksfest', name:'Großreuth b. Schweinau Kirchweih', loc:'Nürnberg', start:'2026-06-19', end:'2026-06-22', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U2/U3', parking:'Straße'},
  {cat:'volksfest', name:'Lohe Kirchweih', loc:'Nürnberg-Lohe', start:'2026-06-19', end:'2026-06-22', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg', parking:'Straße'},
  {cat:'volksfest', name:'Kirchweih Wolkersdorf', loc:'Schwabach-Wolkersdorf', start:'2026-06-26', end:'2026-06-29', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn bis Schwabach, dann Bus', parking:'Vorhanden'},
  {cat:'volksfest', name:'Gebersdorf Kirchweih', loc:'Nürnberg-Gebersdorf', start:'2026-06-25', end:'2026-06-29', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U2 bis Gebersdorf', parking:'Straße'},
  {cat:'volksfest', name:'Gartenstadt Kirchweih', loc:'Nürnberg-Gartenstadt', start:'2026-06-26', end:'2026-06-30', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U3 bis Gartenstadt', parking:'Straße'},
  {cat:'volksfest', name:'Kirchweih Sack', loc:'Fürth-Sack', start:'2026-06-27', end:'2026-06-30', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U1 Richtung Fürth', parking:'Straße'},
  {cat:'volksfest', name:'Kornburg Kärwa', loc:'Nürnberg-Kornburg', start:'2026-07-03', end:'2026-07-06', free:true, desc:'Großer Umzug, Bieranstich mit OB, Trembalesmarkt.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus 60 ab Langwasser Süd', parking:'Vorhanden'},
  {cat:'volksfest', name:'Kirchweih Dietersdorf', loc:'Schwabach-Dietersdorf', start:'2026-07-03', end:'2026-07-06', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Schwabach', parking:'Vorhanden'},
  {cat:'volksfest', name:'Schniegling Kirchweih', loc:'Nürnberg-Schniegling', start:'2026-07-03', end:'2026-07-06', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg Hbf', parking:'Straße'},
  {cat:'volksfest', name:'Wetzendorf Kirchweih', loc:'Nürnberg-Wetzendorf', start:'2026-07-03', end:'2026-07-07', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U3 bis Wetzendorf', parking:'Straße'},
  {cat:'volksfest', name:'Sommerfest Hardhöhe', loc:'Fürth-Hardhöhe', start:'2026-07-04', end:'2026-07-08', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Fürth Hbf', parking:'Straße'},
  {cat:'volksfest', name:'Almoshof Kirchweih', loc:'Nürnberg-Almoshof', start:'2026-07-10', end:'2026-07-14', free:true, desc:'Bekannt für Umzüge mit geschmückten Pferdekutschen.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg Hbf', parking:'Vorhanden'},
  {cat:'volksfest', name:'Altenfurt Kirchweih', loc:'Nürnberg-Altenfurt', start:'2026-07-10', end:'2026-07-14', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U1 bis Langwasser Süd', parking:'Straße'},
  {cat:'volksfest', name:'Buch Kirchweih', loc:'Nürnberg-Buch', start:'2026-07-10', end:'2026-07-15', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Tram 9 Richtung Buch', parking:'Straße'},
  {cat:'volksfest', name:'Oberasbacher Kirchweih', loc:'Oberasbach', start:'2026-07-10', end:'2026-07-13', free:true, desc:'Kein Mitbringen von Alkohol erlaubt (städtische Verordnung).', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus 96 ab Zirndorf', parking:'Vorhanden'},
  {cat:'volksfest', name:'Kirchweih Ruppmannsburg', loc:'Roth-Ruppmannsburg', start:'2026-07-10', end:'2026-07-13', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S1 bis Roth, dann Bus', parking:'Vorhanden'},
  {cat:'volksfest', name:'Steiner Kirchweih', loc:'Stein', start:'2026-07-10', end:'2026-07-13', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Stein', parking:'Vorhanden'},
  {cat:'volksfest', name:'Brunn Kirchweih', loc:'Nürnberg-Brunn', start:'2026-07-24', end:'2026-07-27', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg', parking:'Straße'},
  {cat:'volksfest', name:'Kirchweih Unterreichenbach', loc:'Schwabach-Unterreichenbach', start:'2026-07-17', end:'2026-07-20', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Schwabach Bahnhof', parking:'Vorhanden'},
  {cat:'volksfest', name:'Altenberger Kirchweih', loc:'Oberasbach-Altenberg', start:'2026-07-17', end:'2026-07-21', free:true, desc:'Kein Mitbringen von Alkohol erlaubt.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Zirndorf', parking:'Vorhanden'},
  {cat:'volksfest', name:'Boxdorf Kirchweih', loc:'Nürnberg-Boxdorf', start:'2026-07-17', end:'2026-07-21', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg Nord', parking:'Vorhanden'},
  {cat:'volksfest', name:'Buchenbühl Kirchweih', loc:'Nürnberg-Buchenbühl', start:'2026-07-17', end:'2026-07-20', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Tram 9 Richtung Buch', parking:'Straße'},
  {cat:'volksfest', name:'Mühlhof Kirchweih', loc:'Nürnberg-Mühlhof', start:'2026-07-17', end:'2026-07-21', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U3 Richtung Gebersdorf', parking:'Straße'},
  {cat:'volksfest', name:'Kirchweih Eigenes Heim', loc:'Fürth-Eigenes Heim', start:'2026-07-17', end:'2026-07-20', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Fürth Hbf', parking:'Straße'},
  {cat:'volksfest', name:'Kirchweih Mosbach', loc:'Roth-Mosbach', start:'2026-07-24', end:'2026-07-26', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S1 bis Roth, dann Bus', parking:'Vorhanden'},
  {cat:'volksfest', name:'Unterasbacher Kirchweih', loc:'Oberasbach-Unterasbach', start:'2026-07-24', end:'2026-07-27', free:true, desc:'Kein Mitbringen von Alkohol erlaubt.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Zirndorf', parking:'Vorhanden'},
  {cat:'volksfest', name:'Reichelsdorf Kirchweih', loc:'Nürnberg-Reichelsdorf', start:'2026-07-24', end:'2026-07-28', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U2 bis Eibach', parking:'Straße'},
  {cat:'volksfest', name:'Ziegelstein Kirchweih', loc:'Nürnberg-Ziegelstein', start:'2026-07-24', end:'2026-08-02', free:true, desc:'Zwei Festwochenenden.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U1 bis Ziegelstein', parking:'Straße'},
  {cat:'volksfest', name:'Kirchweih Ronhof', loc:'Fürth-Ronhof', start:'2026-07-25', end:'2026-07-28', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U1 Richtung Fürth', parking:'Straße'},
  {cat:'volksfest', name:'Kirchweih Burgfarrnbach', loc:'Fürth-Burgfarrnbach', start:'2026-07-25', end:'2026-07-29', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Fürth Hbf', parking:'Vorhanden'},
  {cat:'volksfest', name:'Kirchweih Limbach', loc:'Schwabach-Limbach', start:'2026-07-31', end:'2026-08-03', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Schwabach Bahnhof', parking:'Vorhanden'},
  {cat:'volksfest', name:'Fischbach Kirchweih', loc:'Nürnberg-Fischbach', start:'2026-07-31', end:'2026-08-03', free:true, desc:'30-Meter-Kärwabaum per Muskelkraft aufgestellt!', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Tram 9 Richtung Fischbach', parking:'Straße'},
  {cat:'volksfest', name:'Worzeldorf Kirchweih', loc:'Nürnberg-Worzeldorf', start:'2026-07-31', end:'2026-08-04', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U2 bis Eibach, dann Bus', parking:'Straße'},
  {cat:'volksfest', name:'Katzwang Kirchweih', loc:'Nürnberg-Katzwang', start:'2026-08-06', end:'2026-08-10', free:true, desc:'Berühmt für das Sautrogrennen auf der Rednitz.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S1 bis Katzwang', parking:'Vorhanden'},
  {cat:'volksfest', name:'Großgründlach Kirchweih', loc:'Nürnberg-Großgründlach', start:'2026-08-07', end:'2026-08-11', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg Nord', parking:'Vorhanden'},
  {cat:'volksfest', name:'Langwasser Kirchweih', loc:'Nürnberg-Langwasser', start:'2026-08-07', end:'2026-08-10', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U1 bis Langwasser Süd', parking:'Vorhanden'},
  {cat:'volksfest', name:'Höfles Kirchweih', loc:'Nürnberg-Höfles', start:'2026-08-07', end:'2026-08-10', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg', parking:'Straße'},
  {cat:'volksfest', name:'Kirchweih Unterfarrnbach', loc:'Fürth-Unterfarrnbach', start:'2026-08-08', end:'2026-08-12', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Fürth Hbf', parking:'Straße'},
  {cat:'volksfest', name:'Kirchweih Leerstetten', loc:'Roth-Leerstetten', start:'2026-08-21', end:'2026-08-24', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn bis Roth, dann Bus', parking:'Vorhanden'},
  {cat:'volksfest', name:'Wöhrd Kirchweih', loc:'Nürnberg-Wöhrd', start:'2026-08-21', end:'2026-08-25', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Tram 8 bis Wöhrd', parking:'Begrenzt'},
  {cat:'volksfest', name:'Zirndorfer Kirchweih', loc:'Zirndorf', start:'2026-08-21', end:'2026-08-25', free:true, desc:'5 Tage – Festzug Sa. 14 Uhr, Feuerwerk Di. 22 Uhr. 10. Jubiläum!', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Zirndorf', parking:'Innenstadt-Parkhäuser'},
  {cat:'volksfest', name:'Rehdorfer Kirchweih', loc:'Oberasbach-Rehdorf', start:'2026-08-28', end:'2026-08-31', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Zirndorf', parking:'Vorhanden'},
  {cat:'volksfest', name:'Kirchweih Fürberg', loc:'Fürth-Fürberg', start:'2026-08-29', end:'2026-09-01', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Fürth Hbf', parking:'Straße'},
  {cat:'volksfest', name:'Kirchweih Stadeln', loc:'Fürth-Stadeln', start:'2026-08-29', end:'2026-09-02', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Fürth Hbf', parking:'Vorhanden'},
  {cat:'volksfest', name:'Schwabacher Herbstkirchweih', loc:'Schwabach – Altstadt', start:'2026-09-18', end:'2026-09-27', free:false, desc:'10 Tage Volksfest in der Innenstadt. Kirchweihmarkt 21.–23. Sept.', genre:'Kärwa / Volksfest', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S1 bis Schwabach Bahnhof', parking:'Parkhäuser Innenstadt'},
  {cat:'volksfest', name:'Schnepfenreuth Kirchweih', loc:'Nürnberg-Schnepfenreuth', start:'2026-09-04', end:'2026-09-08', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg', parking:'Straße'},
  {cat:'volksfest', name:'Kirchweih Poppenreuth', loc:'Fürth-Poppenreuth', start:'2026-09-04', end:'2026-09-07', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Fürth Hbf', parking:'Straße'},
  {cat:'volksfest', name:'Klaragasse Kirchweih', loc:'Nürnberg-Klaragasse', start:'2026-09-11', end:'2026-09-13', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U1', parking:'Straße'},
  {cat:'volksfest', name:'Neunhof Kirchweih', loc:'Nürnberg-Neunhof', start:'2026-09-11', end:'2026-09-14', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg Nord', parking:'Vorhanden'},
  {cat:'volksfest', name:'Kirchweih Atzenhof', loc:'Fürth-Atzenhof', start:'2026-09-12', end:'2026-09-15', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Fürth Hbf', parking:'Straße'},
  {cat:'volksfest', name:'Kraftshof Kärwa', loc:'Nürnberg-Kraftshof', start:'2026-09-18', end:'2026-09-21', free:true, desc:'Die letzte Kirchweih im Nürnberger Norden.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg Nord', parking:'Vorhanden'},
  {cat:'volksfest', name:'Kirchweih Vach', loc:'Fürth-Vach', start:'2026-09-19', end:'2026-09-22', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Fürth Hbf', parking:'Vorhanden'},

  // ─── FESTIVALS ────────────────────────────────────────────────────────────
  {cat:'festival', name:'Metropolink Warm Up (Indoor)', loc:'Nürnberg (Location TBC)', start:'2026-04-18', end:'2026-04-18', free:false, desc:'Indoor-Auftakt des Metropolink Festivals · Szene-Avantgarde & Club-Energie.', genre:'Multi-Genre', ticket:'', outdoor:false, ageMin:18, price:'TBC', oepnv:'ÖPNV Nürnberg', parking:'TBC'},
  {cat:'festival', name:'Rock im Park', loc:'Zeppelinfeld, Nürnberg', start:'2026-06-05', end:'2026-06-07', free:false, desc:'50+ Bands, 4 Tage Camping. Headliner: Linkin Park, Iron Maiden u.v.m. ~60.000 Besucher. AUSVERKAUFT!', genre:'Rock/Metal', ticket:'https://www.rock-im-park.com/', new:true, outdoor:true, ageMin:16, price:'ab 141 € (Tagesticket) / ausverkauft', oepnv:'VGN-Nutzung im Ticket enthalten! U1 bis Frankenstraße', parking:'Im Ticket enthalten'},
  {cat:'festival', name:'Happy Life Open Air 2026', loc:'Airport Nürnberg', start:'2026-06-13', end:'2026-06-13', free:false, desc:'Premiere am Airport Nürnberg – die größten Hits der 90er & 2000er auf zwei Stages! Sunny Moments Stage: No Angels, Atomic Kitten, Culture Beat, La Bouche, Alex Christensen. Wonderful Days Stage (Classic Rave & Trance): Aquagen, Da Hool, DJ Quicksilver, Dune, Future Breeze u.v.m. 🎟️ 15% Rabatt mit Code CB2026 im Onlineshop!', genre:'90er / 2000er / Pop / Rave / Trance', ticket:'https://festivalsummer-nuernberg.de/happylife', new:true, outdoor:true, ageMin:16, price:'ab 29 € (15% Rabatt mit Code CB2026)', oepnv:'S-Bahn S2 bis Flughafen, dann Shuttle', parking:'Parkhaus P2, 10 €/Tag', promo:'CB2026'},
  {cat:'festival', name:'St. Katharina Open Air', loc:'Katharinenruine, Nürnberg', start:'2026-06-19', end:'2026-07-04', free:false, desc:'Konzertreihe in der histor. Klosterruine – Blues, Rock, Indie, Hip-Hop. Curtis Harding, Blackout Problems u.a.', genre:'Multi-Genre', ticket:'https://www.kunstkulturquartier.de/', outdoor:true, ageMin:0, price:'ab 15 – 35 € pro Konzert', oepnv:'U-Bahn U1 bis Lorenzkirche', parking:'Parkhäuser Altstadt'},
  {cat:'festival', name:'Garlic Land Festival 2026', loc:'Airport Nürnberg', start:'2026-06-20', end:'2026-06-20', free:false, desc:'Das Garlic Land Festival kehrt am Airport Nürnberg zurück! Zwei Areas: Garlic Fields (EDM, elektronische Sounds, internationale Mainstage-Vibes) & Garlic Garden (Hip-Hop, RnB, Urban Sounds). Headliner: KSHMR, FAST BOY, Disarstar, Chefket u.v.m. 🎟️ 17% Rabatt auf Stehplatztickets mit Code CB2026 im Onlineshop!', genre:'EDM / Hip-Hop / RnB / Electronic', ticket:'https://festivalsummer-nuernberg.de/', outdoor:true, ageMin:16, price:'ab 29 € (17% Rabatt mit Code CB2026)', oepnv:'S-Bahn S2 bis Flughafen, dann Shuttle', parking:'Parkhaus P2, 10 €/Tag', promo:'CB2026'},
  {cat:'festival', name:'Super Sommer Sause', loc:'Airport Nürnberg', start:'2026-06-27', end:'2026-06-27', free:false, desc:'Nürnberg meets Mallorca – Pietro Lombardi, Mia Julia, Isi Glück, Ikke Hüftgold u.a. ~15.000 Gäste.', genre:'Schlager / Malle', ticket:'https://festivalsummer-nuernberg.de/', outdoor:true, ageMin:16, price:'ab 35 €', oepnv:'S-Bahn S2 bis Flughafen, dann Shuttle', parking:'Parkhaus P2, 10 €/Tag'},
  {cat:'festival', name:'Open Air Sommer – Stadionpark', loc:'Stadionpark Nürnberg', start:'2026-06-28', end:'2026-07-11', free:false, desc:'Konzertreihe. Ski Aggu, Sarah Connor, Provinz, Dream Theater u.a.', genre:'Multi-Genre', ticket:'https://www.stadionpark.com/', outdoor:true, ageMin:0, price:'ab 39 – 79 € pro Konzert', oepnv:'Tram 6/10 bis Dutzendteich', parking:'Parkplatz Zeppelinfeld'},
  {cat:'festival', name:'Burning Beach Festival', loc:'Brombachsee, Pleinfeld (~30 min)', start:'2026-06-19', end:'2026-06-21', free:false, desc:'10. Jubiläum! 3 Tage Techno, House & Goa direkt am Sandstrand – 5 Floors, ~10.000 Besucher. Camping ab 18.6.', genre:'Techno / House / Goa', ticket:'https://burningbeach.de/', outdoor:true, ageMin:18, price:'ab 71,50 € (Weekend)', oepnv:'S-Bahn S1 bis Pleinfeld (30 min), dann Shuttle', parking:'Begrenzt am Gelände'},
  {cat:'festival', name:'Latin Airport Festival 2026', loc:'Airport Nürnberg', start:'2026-07-04', end:'2026-07-04', free:false, desc:'Deutschlands größtes Latin Festival am Airport Nürnberg! Reggaeton, Latin Pop & Salsa unter freiem Himmel. Headliner: Myke Towers (puerto-ricanischer Megastar, 1. Live-Performance in Deutschland!) & Tito Nieves (Salsa-Legende, „I Like It Like That"). Weitere hochkarätige Acts folgen. Modernste Produktion, internationale Atmosphäre. 🎟️ 15% Rabatt mit Code CB2026 im Onlineshop!', genre:'Reggaeton / Latin Pop / Salsa', ticket:'https://festivalsummer-nuernberg.de/', outdoor:true, ageMin:16, price:'ab 39 € (15% Rabatt mit Code CB2026)', oepnv:'S-Bahn S2 bis Flughafen, dann Shuttle', parking:'Parkhaus P2, 10 €/Tag', promo:'CB2026'},
  {cat:'festival', name:'Save The Core', loc:'Stadionpark Nürnberg', start:'2026-07-04', end:'2026-07-04', free:false, desc:'Punk & Hardcore – Sex Pistols feat. Frank Carter, Biohazard, Agnostic Front u.a. Mit Stadionbad-Zugang gratis!', genre:'Punk/Hardcore', ticket:'https://www.save-the-core.de/', outdoor:true, ageMin:8, price:'101 €', oepnv:'Tram 6/10 bis Dutzendteich', parking:'Parkplatz Zeppelinfeld'},
  {cat:'festival', name:'Klassik Open Air I', loc:'Nürnberg – Luitpoldhain', start:'2026-07-26', end:'2026-07-26', free:true, desc:'Groß-Konzert der Staatsphilharmonie Nürnberg im Luitpoldhain – Bayerns größtes Klassik-Open-Air mit 80.000 Besuchern. Kostenlos, Picknick-Atmosphäre unter freiem Himmel.', genre:'Klassik / Open Air', ticket:'https://staatstheater-nuernberg.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1 bis Messe/Luitpoldhain', parking:'Begrenzt, ÖPNV empfohlen'},
  {cat:'festival', name:'Klassik Open Air II', loc:'Nürnberg – Luitpoldhain', start:'2026-08-08', end:'2026-08-08', free:true, desc:'Zweiter Abend des Klassik Open Air mit der Staatsphilharmonie Nürnberg. 160.000 Besucher über beide Abende – das Woodstock der Klassik.', genre:'Klassik / Open Air', ticket:'https://staatstheater-nuernberg.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1 bis Messe/Luitpoldhain', parking:'Begrenzt, ÖPNV empfohlen'},
  {cat:'festival', name:'Open Beatz Festival 2026', loc:'Poppenhofer Weiher, Herzogenaurach', start:'2026-07-24', end:'2026-07-26', free:false, desc:'Eines der größten Electronic Music Festivals Deutschlands direkt bei Nürnberg! 8 Stages, 200+ nationale & internationale Artists: Timmy Trumpet, Cascada, Ski Aggu, Kobosil, Klaudia Gawlas, Brennan Heart u.v.m. EDM, House, Techno, Trance, Hardstyle. Highlights: Riesenrad, Helikopterrundflüge, Wohlfühloase „Lunaria", große Food Area. 🎟️ 15% Rabatt auf alle Ticketkategorien (Weekend, Two Days, Day Ticket) mit Code 15CBENEFITS814317!', genre:'EDM / House / Techno / Trance / Hardstyle', ticket:'https://openbeatz.de/', outdoor:true, ageMin:16, price:'ab 81 € (15% Rabatt mit Code 15CBENEFITS814317)', oepnv:'Bahn bis Herzogenaurach + Shuttle', parking:'Vorhanden am Gelände', promo:'15CBENEFITS814317'},
  {cat:'festival', name:'Bardentreffen', loc:'Nürnberger Altstadt (9 Bühnen)', start:'2026-07-30', end:'2026-08-02', free:true, desc:'49. Ausgabe – Deutschlands größtes Umsonst & Draußen Festival. 90 Konzerte, ~200.000 Besucher. Weltmusik. EINTRITT FREI!', genre:'Weltmusik', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1/U2/U3 bis Hauptbahnhof oder Lorenzkirche', parking:'Parkhäuser Altstadt'},
  {cat:'festival', name:'Metropolink Festival', loc:'Nürnberg (Innenstadt)', start:'2026-08-05', end:'2026-08-08', free:false, desc:'Street-Art, Musik & Kultur – Indie, Alternative, Electronic. 4 Tage Stadtfestival.', genre:'Multi-Genre', ticket:'', outdoor:true, ageMin:0, price:'TBC', oepnv:'ÖPNV Nürnberg Innenstadt', parking:'Altstadt-Parkhäuser'},
  {cat:'festival', name:'Brückenfestival', loc:'Pegnitzwiesen, Theodor-Heuss-Brücke', start:'2026-08-07', end:'2026-08-08', free:true, desc:'Umsonst & Draußen – 2 Tage, 3 Bühnen, regionale & internationale Bands. Ehrenamtlich. EINTRITT FREI!', genre:'Multi-Genre', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U1 bis Gostenhof', parking:'Kein Parkplatz – ÖPNV nutzen'},
  {cat:'festival', name:'Container Love Festival', loc:'Hafen Nürnberg-Süd', start:'2026-08-14', end:'2026-08-14', free:false, desc:'Elektro-Festival im Hafen – 3 Stages, 20+ internationale Acts. (Termin TBC)', genre:'EDM / Electronic', ticket:'', outdoor:true, ageMin:18, price:'TBC', oepnv:'U-Bahn U2 bis Eibach, dann Bus', parking:'Begrenzt'},
  {cat:'festival', name:'Tanzen im Grünen', loc:'Marienbergpark, Nürnberg', start:'2026-08-29', end:'2026-08-29', free:false, desc:'Elektro-Festival – 10+ Stunden, 3 Bühnen. House, Techno, EDM. 999999999, AKA AKA, Lilly Palmer u.a.', genre:'Techno / House', ticket:'https://www.tanzen-im-gruenen.de/', outdoor:true, ageMin:18, price:'TBC (ca. 30–45 €)', oepnv:'U2 bis Ziegelstein, dann Bus 30/31 bis Tucherhof – kein Parken möglich!', parking:'❌ Kein Parkplatz! Nur ÖPNV'},
  
  // ─── AFTER WORK / CLUB ───────────────────────────────────────────────────
  {cat:'afterwork', name:'After Work Party mit DJ Werner', loc:'Nürnberg', start:'2026-04-16', end:'2026-04-17', free:false, desc:'After Work Party mit DJ Werner & Friends – Donnerstag beginnt das Wochenende! House Music an der Bar, Dancefloor-Ekstase im Anschluss. Für alle, die tagsüber im Job alles gegeben haben. Vorab Tisch ab 18 Uhr im Farang Thai PopUp Restaurant reservierbar. Teilnahme ab 18 Jahren, keine Ausnahmen.', genre:'House / After Work', ticket:'', outdoor:false, ageMin:18, price:'5€ Eintritt · Beginn 20 Uhr, Ende 01 Uhr', oepnv:'ÖPNV Nürnberg', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'Sundowner – Season Opening', loc:'Meier Hilzhof, Pilsach', start:'2026-04-18', end:'2026-04-18', free:false, desc:'Terrassenopening der Sundowner-Reihe. 12:00–20:00 Uhr.', genre:'House / Outdoor', ticket:'https://sundowner.ticket.io/', dresscode:'Summer Chic', outdoor:true, ageMin:18, price:'ab 25 €', oepnv:'Auto empfohlen – ländliche Lage bei Neumarkt', parking:'Vorhanden am Hilzhof'},
  {cat:'afterwork', name:'High in the Sky – Rooftop Party', loc:'Design Offices, Königstorgraben 11, 5. OG', start:'2026-04-17', end:'2026-04-17', free:false, desc:'19–01 Uhr. R&B, Hip Hop & House über den Dächern Nürnbergs. DJs + Special Acts.', genre:'R&B / House / Rooftop', ticket:'https://skyeventsmore.ticket.io/', dresscode:'', outdoor:false, ageMin:18, price:'ca. 15 €', oepnv:'U-Bahn U1 bis Hauptbahnhof, 5 min Fußweg', parking:'Parkhäuser Altstadt'},
  {cat:'afterwork', name:'Sundowner White Party im Bootshaus', loc:'Bootshaus Nürnberg, Dutzendteich', start:'2026-05-14', end:'2026-05-14', free:false, desc:'17–23 Uhr. White Party Edition – weißes Outfit Pflicht!', genre:'House / Outdoor', ticket:'https://sundowner.ticket.io/', dresscode:'Alles in Weiß!', outdoor:true, ageMin:18, price:'ab 20 €', oepnv:'U1 bis Frankenstraße, dann Bus 55', parking:'Parkplatz Zeppelinfeld (kostenlos)'},
  {cat:'afterwork', name:'Sundowner im Bootshaus', loc:'Bootshaus Nürnberg, Dutzendteich', start:'2026-04-23', end:'2026-04-23', free:false, desc:'17–23 Uhr. Seeterrasse am Dutzendteich · House & Club Sounds · DJ Lee Allen.', genre:'House / Outdoor', ticket:'https://sundowner.ticket.io/', dresscode:'Summer Chic', outdoor:true, ageMin:18, price:'ab 20 €', oepnv:'U1 bis Frankenstraße, dann Bus 55', parking:'Parkplatz Zeppelinfeld (kostenlos)', musicYt:'ATXO17ztWVc', musicTitle:'YouNotUs x Mi Casa – Chucks'},
  {cat:'afterwork', name:'Sundowner im Bootshaus', loc:'Bootshaus Nürnberg, Dutzendteich', start:'2026-06-04', end:'2026-06-04', free:false, desc:'17–23 Uhr. House & Club Sounds auf der Seeterrasse.', genre:'House / Outdoor', ticket:'https://sundowner.ticket.io/', dresscode:'Summer Chic', outdoor:true, ageMin:18, price:'ab 20 €', oepnv:'U1 bis Frankenstraße, dann Bus 55', parking:'Parkplatz Zeppelinfeld (kostenlos)'},
  {cat:'afterwork', name:'Sundowner White Party im Bootshaus', loc:'Bootshaus Nürnberg, Dutzendteich', start:'2026-07-30', end:'2026-07-30', free:false, desc:'17–23 Uhr. White Party Edition.', genre:'House / Outdoor', ticket:'https://sundowner.ticket.io/', dresscode:'Alles in Weiß!', outdoor:true, ageMin:18, price:'ab 20 €', oepnv:'U1 bis Frankenstraße, dann Bus 55', parking:'Parkplatz Zeppelinfeld (kostenlos)'},
  {cat:'afterwork', name:'Sundowner im Bootshaus', loc:'Bootshaus Nürnberg, Dutzendteich', start:'2026-08-27', end:'2026-08-27', free:false, desc:'17–23 Uhr. House & Club Sounds auf der Seeterrasse.', genre:'House / Outdoor', ticket:'https://sundowner.ticket.io/', dresscode:'Summer Chic', outdoor:true, ageMin:18, price:'ab 20 €', oepnv:'U1 bis Frankenstraße, dann Bus 55', parking:'Parkplatz Zeppelinfeld (kostenlos)'},
  {cat:'afterwork', name:'Sundowner im Bootshaus', loc:'Bootshaus Nürnberg, Dutzendteich', start:'2026-09-17', end:'2026-09-17', free:false, desc:'17–23 Uhr. Saison-Finale der Sundowner-Reihe.', genre:'House / Outdoor', ticket:'https://sundowner.ticket.io/', dresscode:'Summer Chic', outdoor:true, ageMin:18, price:'ab 20 €', oepnv:'U1 bis Frankenstraße, dann Bus 55', parking:'Parkplatz Zeppelinfeld (kostenlos)'},

  // ─── SONSTIGE ────────────────────────────────────────────────────────────
  {cat:'volksfest', name:'Kirchweih Eckersmühlen', loc:'Roth-Eckersmühlen', start:'2026-05-14', end:'2026-05-18', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S1 bis Roth, dann Bus', parking:'Vorhanden'},
  {cat:'volksfest', name:'Weiherhofer Kärwa', loc:'Nürnberg-Weiherhof', start:'2026-09-04', end:'2026-09-07', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg West', parking:'Straße'},
  // ─── 150KM UMKREIS – FESTIVALS & VOLKSFESTE ──────────────────────────────
  {cat:'volksfest', name:'Augsburger Osterplärrer', loc:'Augsburg – Plärrergelände', start:'2026-04-05', end:'2026-04-19', free:true, desc:'Größtes Volksfest Schwabens mit zwei großen Festzelten, Fahrgeschäften und Blasmusik. Eröffnung durch Böllerschützen, Abschlussfeuerwerk.', genre:'Volksfest', ticket:'https://www.augsburger-plaerrer.de', outdoor:true, ageMin:0, price:'Kostenlos (Verzehr kostenpflichtig)', oepnv:'Straßenbahn Linie 2 bis Plärrer', parking:'Begrenzt – ÖPNV empfohlen'},
  {cat:'volksfest', name:'Münchner Frühlingsfest', loc:'München – Theresienwiese', start:'2026-04-17', end:'2026-05-10', free:true, desc:'Das „kleine Wiesn" auf der Theresienwiese: Bierzelte, Fahrgeschäfte, bayerische Gemütlichkeit. Perfekt für Familien und Feiernde.', genre:'Volksfest', ticket:'https://www.fruehlingsfest-muenchen.de', outdoor:true, ageMin:0, price:'Kostenlos (Verzehr kostenpflichtig)', oepnv:'U4/U5 bis Theresienwiese', parking:'Nicht empfohlen – ÖPNV nutzen'},
  {cat:'festival', name:'Keep It True Festival', loc:'Lauda-Königshofen (bei Würzburg)', start:'2026-04-24', end:'2026-04-25', free:false, desc:'26. Ausgabe des Heavy-Metal-Festivals in der Tauberfrankenhalle. Headliner: Venom (45. Jubiläum) und Triumph Of Death. 20 Bands, restlos ausverkauft.', genre:'Heavy Metal', ticket:'https://www.keep-it-true.de', outdoor:false, ageMin:16, price:'Ausverkauft', oepnv:'Zug bis Lauda, dann Taxi', parking:'Vorhanden am Veranstaltungsort'},
  {cat:'festival', name:'Würzburg Umsonst & Draußen', loc:'Würzburg – Mainwiesen Talavera', start:'2026-06-18', end:'2026-06-21', free:true, desc:'Eines der größten Gratisopen-air-Festivals Deutschlands – seit über 30 Jahren. 60.000–80.000 Besucher, direkt am Main, diverse Musik.', genre:'Open Air / Indie / Folk', ticket:'https://www.uunddwuerzburg.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus bis Talavera, Würzburg Hbf dann 30 min zu Fuß', parking:'Begrenzt'},
  {cat:'volksfest', name:'76. Bamberger Sandkerwa', loc:'Bamberg – Altstadt (Sandviertel)', start:'2026-08-20', end:'2026-08-24', free:true, desc:'76. Bamberger Sandkerwa – Bambergs beliebteste Kirchweih und größtes Volksfest im Altstadtkern, direkt am Regnitzufer. 5 Tage Livemusik, Biergärten, Fischerstechen, Kahn-Schiffahrt und Illumination der Altstadt im UNESCO-Welterbe.', genre:'Kirchweih / Volksfest', ticket:'https://www.sandkerwa.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Zug bis Bamberg Hbf, dann 15 min zu Fuß', parking:'Altstadt-Parkhäuser'},
  {cat:'festival', name:'Kiliani Volksfest Würzburg', loc:'Würzburg – Talavera-Platz', start:'2026-07-03', end:'2026-07-19', free:true, desc:'Größtes Volksfest Unterfrankens – 2 Wochen Zelte, Fahrgeschäfte und Blasmusik. Eröffnung mit Festumzug in Tracht durch die Innenstadt.', genre:'Volksfest', ticket:'https://www.wuerzburg.de/kilianivolksfest', outdoor:true, ageMin:0, price:'Kostenlos (Verzehr kostenpflichtig)', oepnv:'Bus/Straßenbahn bis Talavera', parking:'Begrenzt'},
  {cat:'festival', name:'Heroes Festival Geiselwind', loc:'Geiselwind – Eventhalle Strohofer', start:'2026-06-19', end:'2026-06-20', free:false, desc:'Hip-Hop-Festival in Geiselwind mit Bones MC, SSIO, Rin, Kool Savas und Bausa. Tages- und Wochenendtickets verfügbar.', genre:'Hip-Hop / Rap', ticket:'https://www.heroes-festival.de', outdoor:true, ageMin:16, price:'ab 49 €', oepnv:'Shuttle ab Nürnberg', parking:'Vorhanden am Gelände'},
  {cat:'festival', name:'Keep It True Legions', loc:'Geiselwind – Eventhalle', start:'2026-08-08', end:'2026-08-09', free:false, desc:'Tochter-Festival von Keep It True in der Eventhalle Geiselwind. Headliner: Savatage und Pentagram. Metal der alten Schule.', genre:'Heavy Metal', ticket:'https://www.keep-it-true.de', outdoor:false, ageMin:16, price:'ab 65 €', oepnv:'Shuttle ab Nürnberg Hbf', parking:'Vorhanden'},
  {cat:'festival', name:'Superbloom Festival München', loc:'München – Olympiapark', start:'2026-08-31', end:'2026-09-04', free:false, desc:'Großes Pop- und Elektronik-Festival im Olympiapark München. Mehrtägiges Event mit internationalen Acts auf mehreren Bühnen.', genre:'Pop / Electronic / Live', ticket:'https://www.superbloom.de', outdoor:true, ageMin:16, price:'ab 89 €', oepnv:'U3 bis Olympiazentrum', parking:'Olympiapark P1/P2'},
  {cat:'afterwork', name:'Augsburger Herbstplärrer', loc:'Augsburg – Plärrergelände', start:'2026-08-28', end:'2026-09-13', free:true, desc:'Herbstausgabe des Augsburger Plärrer – 2 Wochen Volksfest mit Binswanger und Schaller Bierzelten, modernen Fahrgeschäften und nostalgischen Karussells.', genre:'Volksfest', ticket:'https://www.augsburger-plaerrer.de', outdoor:true, ageMin:0, price:'Kostenlos (Verzehr kostenpflichtig)', oepnv:'Straßenbahn Linie 2', parking:'Begrenzt'},
  {cat:'festival', name:'Nürnberg Pop Festival', loc:'Nürnberg – verschiedene Locations', start:'2026-10-08', end:'2026-10-10', free:false, desc:'Indie, Rock & Pop Showcase-Festival. 2026 mit Cari Cari und Orbit als Top-Acts. Award-prämiertes Festival für Booking-Qualität.', genre:'Indie / Pop / Rock', ticket:'https://www.nuernbergpop.de', outdoor:false, ageMin:16, price:'ab 25 €', oepnv:'U-Bahn Nürnberg Innenstadt', parking:'Innenstadtparkhäuser'},

  // ─── WHITE RABBIT NÜRNBERG (monatliche Events) ───────────────────────────

  // ─── WHITE RABBIT NBG (@white.rabbit.nbg) ───────────────────────────────
  {cat:'russian', name:'White Rabbit – БОЛЬШАЯ ВЕЧЕРИНКА 90X 00X', loc:'Nürnberg – Club SOCIETY', start:'2026-05-01', end:'2026-05-01', free:false, desc:'Große Party mit 90er & 2000er Hits im Club SOCIETY Nürnberg. Veranstaltet von White Rabbit NBG (@white.rabbit.nbg). Russisch-internationale Party-Atmosphäre.', genre:'90er / 2000er / Party', ticket:'https://www.instagram.com/white.rabbit.nbg', outdoor:false, ageMin:18, price:'Infos via Instagram', oepnv:'U-Bahn nach Lorenzkirche oder Weißer Turm', parking:'Innenstadt Parkhäuser'},

  // ─── RUSSISCHE / OSTEUROPÄISCHE FESTIVALS ────────────────────────────────
  {cat:'russian', name:'Russian Coco Open Air Festival', loc:'Gießen – WM Arena', start:'2026-05-09', end:'2026-05-09', free:false, desc:'Das größte russische Open Air Festival in Deutschland, Österreich & Schweiz! DJs, Live Acts aus der russischen Szene, u.a. Faktor-2 (Vladimir Panchenko). Fettes Line-up, einzigartige Atmosphäre.', genre:'Russian Pop / Party / Electronic', ticket:'https://www.russiancocofestival.de', outdoor:true, ageMin:16, price:'Tickets ab 80€', oepnv:'Bahn nach Gießen Hbf', parking:'Vorhanden am Veranstaltungsort'},
  {cat:'russian', name:'LIFEvKAIF OpenAir Festival', loc:'Lauda-Königshofen – Tauberfrankenhalle', start:'2026-07-11', end:'2026-07-11', free:false, desc:'Das größte kasachisch-russisch-ukrainisch-deutsche Open Air Festival! 4. Ausgabe mit starkem Line-up: MONA, MIA BOYKA, ELMAN, ANDRO und mehr. Ab 16 Jahren.', genre:'Russian / Kazakh / Ukrainian Pop', ticket:'https://lifevkaif.ticket.io', outdoor:true, ageMin:16, price:'Tickets ab 99€, Tageskasse 199€', oepnv:'Bahn nach Lauda-Königshofen', parking:'Vorhanden'},
  {cat:'russian', name:'Russian Vibe Open Air Festival', loc:'Büren – S. Imperial Restaurant', start:'2026-05-01', end:'2026-05-02', free:false, desc:'Drei Tage Musik, Sonne und Bass! Main Stage & Retro Stage (90s & 2000er Flashback), 10 Foodtrucks, 16 Getränkestände. Kultfestival der russischsprachigen Community in Deutschland.', genre:'Russian Pop / Retro / Electronic', ticket:'https://artist-production.de/de/russian-vibe-open-air-festival', outdoor:true, ageMin:0, price:'2-Tages-Ticket ab 52€', oepnv:'Bahn nach Paderborn, dann Shuttle', parking:'Vorhanden'},
  {cat:'russian', name:'Russian Vibe Open Air Festival (Sommer)', loc:'Büren – S. Imperial Restaurant', start:'2026-08-22', end:'2026-08-22', free:false, desc:'Sommertermin des Russian Vibe Open Air in Büren! Main Stage & Retro Stage – russische Musik, Party und unvergessliche Atmosphäre.', genre:'Russian Pop / Party', ticket:'https://artist-production.de/de/russian-vibe-open-air-festival', outdoor:true, ageMin:0, price:'Tickets ab 52€', oepnv:'Bahn nach Paderborn, dann Shuttle', parking:'Vorhanden'},




// ─── RUSSIAN SENSATION FESTIVAL ──────────────────────────────────────────

  // ─── SOYUZ EVENTS ─────────────────────────────────────────────────────────
  {cat:'russian', name:'SOYUZ – Russian Indoor Festival', loc:'Straubing', start:'2026-05-02', end:'2026-05-02', free:false, desc:'Russian Indoor Festival von SOYUZ Events in Straubing. Grosses russisches Partyfestival mit mehreren Acts und DJ-Sets. Infos auf @soyuz_events (Instagram).', genre:'Russian Festival / Indoor', ticket:'https://www.instagram.com/soyuz_events', outdoor:false, ageMin:18, price:'Infos via Instagram', oepnv:'Bahn nach Straubing Hbf', parking:'Vorhanden'},

  // ─── THE GARRISON EVENTS ─────────────────────────────────────────────────
  {cat:'russian', name:'The Garrison Events – Party Night', loc:'Osnabrück', start:'2026-04-18', end:'2026-04-18', free:false, desc:'The Garrison Events – russische Party-Reihe auf Deutschlandtour. Aktuelle Infos auf @the_garrison_events_ (Instagram).', genre:'Russian Party', ticket:'https://linktr.ee/the_garrison_events', outdoor:false, ageMin:18, price:'Infos via Instagram', oepnv:'Bahn nach Osnabrück Hbf', parking:'Vorhanden'},
  {cat:'privat', name:'Viana Дача Party', loc:'Viana Дача Party Nürnberg', music:'assets/music/viana-dacha-party.mp3', lat:49.38481, lng:11.10000, start:'2026-04-25', end:'2026-04-25', free:true, desc:'Die Viana Gartenparty – ein unvergesslicher Tag für die ganze Community! Shisha, Grillen, Cocktails, Spiele, Sonnen und Kinderbetreuung. Entspannte Atmosphäre im privaten Garten – organisiert von Viana Events.', genre:'Garden Party / Community', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos (Einladung)', oepnv:'Nürnberg ÖPNV', parking:'Vorhanden', viana:true, new:true},
  {cat:'russian', name:'The Garrison Events – Party Night', loc:'Kassel', start:'2026-04-25', end:'2026-04-25', free:false, desc:'The Garrison Events – russische Party-Reihe auf Deutschlandtour. Aktuelle Infos auf @the_garrison_events_ (Instagram).', genre:'Russian Party', ticket:'https://linktr.ee/the_garrison_events', outdoor:false, ageMin:18, price:'Infos via Instagram', oepnv:'Bahn nach Kassel Hbf', parking:'Vorhanden'},
  {cat:'russian', name:'The Garrison Events – Party Night', loc:'Kiel', start:'2026-05-02', end:'2026-05-02', free:false, desc:'The Garrison Events – russische Party-Reihe auf Deutschlandtour. Aktuelle Infos auf @the_garrison_events_ (Instagram).', genre:'Russian Party', ticket:'https://linktr.ee/the_garrison_events', outdoor:false, ageMin:18, price:'Infos via Instagram', oepnv:'Bahn nach Kiel Hbf', parking:'Vorhanden'},
  // ─── NEU APRIL 2026 UPDATE ────────────────────────────────────────────
  {cat:'russian', name:'Full House – Party Night', loc:'Speicher.28, Neumarkt i.d.OPf.', start:'2026-05-08', end:'2026-05-08', free:false, desc:'Full House – die Party-Reihe mit russischer und internationaler Musik in Neumarkt i.d.OPf. Tickets & Infos auf fullhouse.ticket.io.', genre:'Russian Party / Club', ticket:'https://fullhouse.ticket.io', outdoor:false, ageMin:18, price:'Infos auf fullhouse.ticket.io', oepnv:'Bahn nach Neumarkt i.d.OPf. Hbf', parking:'Vorhanden'},
  {cat:'festival', name:'Bierchen und Bühnchen', loc:'Nürnberg – Gostenhof', start:'2026-04-11', end:'2026-04-11', free:true, desc:'Das Musik- und Kneipenfestival in Gostenhof und Himpfelshof. Bands und DJs in Bars, Cafés und auf Open-Air-Bühnen – Festivalstart in die Saison. Eintritt frei!', genre:'Indie / Rock / Mix', ticket:'https://www.bierchenundbuechnchen.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U2 Gostenhof', parking:'Straße'},
  {cat:'festival', name:'Andorf Open Air (20 Jahre)', loc:'Andorf bei Ansbach', start:'2026-05-22', end:'2026-05-24', free:false, desc:'20-jähriges Jubiläum! Regionales Rockfestival in Andorf. Lineup: Gossenpoeten, ØL, Iron Maidness u.a. Kleines, familiäres Festival.', genre:'Rock / Metal / Mittelalter', ticket:'', outdoor:true, ageMin:0, price:'ab ca. 15€', oepnv:'Kein ÖPNV, Fahrgemeinschaft', parking:'Vorhanden'},
  {cat:'festival', name:'Vorstadt Sound Festival', loc:'Langensendelbach bei Erlangen', start:'2026-06-19', end:'2026-06-21', free:false, desc:'Festival für alle – seit 2016 von Jugendlichen für Jugendliche in Langensendelbach. Vielfältiges Lineup: Folk, Techno, Indie, Schlager.', genre:'Mixed / Indie / Folk', ticket:'', outdoor:true, ageMin:0, price:'ab ca. 20€', oepnv:'Bus ab Erlangen Hbf', parking:'Vorhanden'},
  {cat:'festival', name:'Wasted! Open Air', loc:'Obernzenner See (Obernzenn, ~60km)', start:'2026-06-11', end:'2026-06-13', free:false, desc:'Ehrenamtliches DIY-Festival am Obernzenner See – Punk, Rock & Roll und Stoner-Rock. Rund 900 Besucher, familiäre Atmosphäre. Bands: The Sensitives, Mothers Cake.', genre:'Punk / Rock / Stoner', ticket:'https://www.wasted-openair.de', outdoor:true, ageMin:0, price:'ab ca. 30€ Weekend', oepnv:'Kein ÖPNV, Fahrgemeinschaft empfohlen', parking:'Vorhanden'},
  {cat:'festival', name:'Stars im Luitpoldhain', loc:'Nürnberg – Luitpoldhain', start:'2026-08-09', end:'2026-08-09', free:false, desc:'Großes Konzert im Luitpoldhain mit nationalen und internationalen Popstars. Einer der Highlights des Nürnberger Festivalsommers.', genre:'Pop / Rock', ticket:'https://www.staatstheater-nuernberg.de', outdoor:true, ageMin:0, price:'ab ca. 35€', oepnv:'U1 bis Messe/Luitpoldhain', parking:'Begrenzt'},
  {cat:'festival', name:'Summer Breeze Open Air', loc:'Dinkelsbühl – Flugplatz Sinbronn', start:'2026-08-12', end:'2026-08-15', free:false, desc:'Eines der größten Metal-Festivals Europas! 4 Tage, 75+ Bands. Headliner 2026: Arch Enemy, Helloween, In Flames, Lamb of God, Testament u.v.m. Bereits ausverkauft!', genre:'Metal / Rock / Hardcore', ticket:'https://www.summer-breeze.de', outdoor:true, ageMin:0, price:'Weekend ausverkauft, Tagestickets limitiert', oepnv:'Shuttle ab Bahnhof Dinkelsbühl', parking:'Vorhanden'},
  {cat:'festival', name:'Taubertal Festival', loc:'Rothenburg ob der Tauber', start:'2026-08-06', end:'2026-08-08', free:false, desc:'Festival am malerischen Taubertal bei Rothenburg. Lineup: Sido, Hip-Hop, Indie und mehr. Idyllische Lage mit Camping direkt am Fluss.', genre:'Hip-Hop / Indie / Pop', ticket:'https://www.taubertal-festival.de', outdoor:true, ageMin:0, price:'ab ca. 55€ Weekend', oepnv:'Zug nach Rothenburg, Shuttle', parking:'Vorhanden'},
  {cat:'volksfest', name:'Nürnberger Altstadtfest', loc:'Nürnberg – Altstadt', start:'2026-09-16', end:'2026-09-28', free:true, desc:'Eines der größten innerstädtischen Feste Bayerns – Bühnen in der gesamten Altstadt, Musik, Kulinarik und Kunst über zwei Wochen. Eintritt frei!', genre:'Stadtfest / Kultur', ticket:'https://www.altstadtfest.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1/U2 Hauptbahnhof', parking:'Altstadt Parkhäuser'},

  {cat:'russian', name:'Russian City Beats – MAUR Live on Stage', loc:'Nürnberg – WON World of Nightlife', start:'2026-05-13', end:'2026-05-13', free:false, desc:'Russian City Beats kommt zum ersten Mal nach Nürnberg! MAUR live on stage – bekannt für "My Love", "It\'s my Life", "Политела" und viele weitere Hits. Vorfeiertag-Special im WON (ehemaliger Rascha), Regensburger Str. 334b.', genre:'Russian Live / Pop', ticket:'https://www.instagram.com/russian_city_beats', outdoor:false, ageMin:18, price:'Infos via Instagram', oepnv:'Bus/Tram Richtung Regensburger Str.', parking:'Vorhanden'},
  {cat:'russian', name:'Russian Sensation Festival × Nürnberg', loc:'Nürnberg – ONLY Club', start:'2026-05-13', end:'2026-05-14', free:false, desc:'Vorfeiertag-Mittwoch (vor Christi Himmelfahrt) im ONLY Club Nürnberg. DJ Insane präsentiert das Russian Sensation Festival – Best of Russian Music. Lineup: DJ S7VEN (Ulm) und DJ Marrakech (Dortmund). 23:00–05:00 Uhr. Bevorzugter Einlass mit Ticket bis 01:00 Uhr, danach nur nach Kapazität. Sponsored by Saebis.', genre:'Russian Party / Pop / Hits', ticket:'https://www.eventbrite.de/e/russian-sensation-festival-x-nurnberg-tickets-1986059809353', new:true, outdoor:false, ageMin:18, price:'Tickets via Eventbrite', oepnv:'U-Bahn Richtung ONLY Club Nürnberg', parking:'In Clubnähe'},
  {cat:'russian', name:'Hawaii Стаил – Russian Style Party', loc:'Dornstadt – Club MEDUZA', start:'2026-05-23', end:'2026-05-23', free:false, desc:'Russian Style Party im Club MEDUZA Dornstadt (bei Ulm) – der Club verwandelt sich in eine tropische Partyinsel. Heiße Beats von DJ Deen West, Hawaii-Deko, Terrasse & Shisha, frisches Schaschlik, Longdrinks bis 0:00 Uhr im Angebot, gratis Shots & Gratis Hawaii Captain am Eingang. „Russian Style Party des Monats."', genre:'Russian Style / Hawaii Theme / Party', ticket:'https://www.instagram.com/russianstyleparty_augsburg/', new:true, outdoor:false, ageMin:18, price:'Infos via Instagram', oepnv:'Bahn nach Ulm, dann Bus nach Dornstadt', parking:'Vorhanden am Club'},
  {cat:'russian', name:'WE LOVE RUSSIAN NIGHT Stuttgart (Pfingstsonntag)', loc:'Stuttgart – Club Vivally', start:'2026-05-24', end:'2026-05-25', free:false, desc:'Pfingstsonntag, 24. Mai im Club Vivally Stuttgart (Stammheimer Str. 45). Eine Nacht voller Energie mit den heißesten Russian & International Hits. Mainfloor: DJ LINKIN und DJ X-TREAM. Russian Hits, House, Hip-Hop, Party Classics. 23:00–05:00 Uhr. Dresscode: Elegant & Party Ready. Limitierte Kapazität – früh kommen empfohlen. VIP Lounge & Reservierungen: 0151 10664537.', genre:'Russian Hits / House / Hip-Hop / Party Classics', ticket:'https://www.instagram.com/we_love_russian_night/', new:true, outdoor:false, ageMin:18, price:'Tickets via Instagram-Link', oepnv:'U15 Salzwiesenstraße direkt vor dem Club', parking:'Vor Ort'},

  // ─── STADTSTRÄNDE & SOMMERFESTE ──────────────────────────────────────────
  {cat:'strand', name:'Lieblingsstrand – Sommerinsel Schütt', loc:'Nürnberg – Insel Schütt (Altstadt)', start:'2026-04-29', end:'2026-07-31', free:true, desc:'Nürnbergs Lieblingsstrand auf der Insel Schütt – 250t weißer Sand, Liegestühle, Palmen, Poolbar, Campari-Bar mit DJ-Pult, Aperol-Area und Schlemmermeile. Di–So geöffnet. Bargeldlos!', genre:'Stadtstrand / After Work / Party', ticket:'https://lieblingsstrand-nuernberg.de', outdoor:true, ageMin:0, price:'Kostenlos (Konsumation)', oepnv:'U1 bis Lorenzkirche oder Weißer Turm', parking:'Altstadt Parkhäuser'},
  {cat:'strand', name:'Sommergarten Schütt – Tucher Biergarten', loc:'Nürnberg – Insel Schütt (Altstadt)', start:'2026-04-29', end:'2026-08-23', free:true, desc:'Neuer Biergarten auf der Sommerinsel Schütt – weitläufig, schattig, mit viel Sitzfläche. Live-Podcasts, Workshops, Kneipen-Quiz, Salsa-Events und mehr bis Ende Juli. Bargeldlos!', genre:'Biergarten / Stadtstrand / Kultur', ticket:'https://lieblingsstrand-nuernberg.de', outdoor:true, ageMin:0, price:'Kostenlos (Konsumation)', oepnv:'U1 bis Lorenzkirche oder Weißer Turm', parking:'Altstadt Parkhäuser'},
  {cat:'strand', name:'La Festa Italiana – Sommerinsel Schütt', loc:'Nürnberg – Insel Schütt (Altstadt)', start:'2026-08-14', end:'2026-08-23', free:true, desc:'Zehn Tage Dolce Vita auf der Insel Schütt! Live-Musik, Genussmarkt, italienische Kulinarik – Nürnberg feiert seine Städtepartnerschaft mit Venedig (seit 1954). Eintritt frei!', genre:'Stadtfest / Kulinarik / Musik', ticket:'https://lieblingsstrand-nuernberg.de', outdoor:true, ageMin:0, price:'Kostenlos (Eintritt)', oepnv:'U1 bis Lorenzkirche oder Weißer Turm', parking:'Altstadt Parkhäuser'},
  {cat:'strand', name:'Sternla Schlossstrand Erlangen', loc:'Erlangen – Schlossplatz', start:'2026-06-25', end:'2026-08-09', free:true, desc:'Erlanger Stadtstrand im historischen Schlossgarten – Sand, Liegestühle, Cocktails und Musik direkt neben dem Markgrafenschloss. Entspanntes Sommerflair mitten in der Stadt.', genre:'Stadtstrand / Sommer / Lounge', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos (Konsumation)', oepnv:'Bahn bis Erlangen Hbf, 10 min Fußweg', parking:'Innenstadt Erlangen'},
  {cat:'strand', name:'Fürth Festival', loc:'Fürth – Innenstadt (mehrere Bühnen)', start:'2026-07-10', end:'2026-07-12', free:true, desc:'Das Fürth Festival seit 1998 – auf mehreren Bühnen in der Stadt spielen Bands aus allen Genres. Ausgelassen, kostenlos und mitten in Fürth. Eintritt frei!', genre:'Stadtfestival / Live-Musik', ticket:'https://www.fuerth.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1 Fürth Hbf', parking:'Innenstadt Fürth'},
  {cat:'strand', name:'Open Air am Lindenhain Fürth', loc:'Fürth – Lindenhain', start:'2026-07-17', end:'2026-07-19', free:true, desc:'Umsonst und draußen – ein Wochenende lang Live-Bands auf zwei Bühnen im Lindenhain. Fürths beliebtestes kostenloses Sommerevent.', genre:'Open Air / Live-Musik', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1 Fürth, dann Bus', parking:'Straße'},
  {cat:'strand', name:'Bunter Markt Fürth', loc:'Fürth – Adenauer-Anlage', start:'2026-06-12', end:'2026-06-14', free:true, desc:'Die Adenauer-Anlage wird zum Biergarten mit stimmungsvollem Ambiente und buntem Programm – Musik, Kulinarik und Sommeratmosphäre in Fürths Innenstadt. Eintritt frei!', genre:'Stadtfest / Biergarten / Markt', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1 Fürth Hbf', parking:'Innenstadt Fürth'},
  {cat:'strand', name:'Bunter Markt Fürth – Mai-Edition (Pop-Up Bar Altes Brathaus)', loc:'Fürth – Zentrum (Bunter Markt)', start:'2026-05-12', end:'2026-05-17', free:true, desc:'Wunderschön dekorierter Platz im Fürther Zentrum mit Pop-Up Bar vom Altes Brathaus. Programm bis 17. Mai: Di 12.05. Clownbesuch · Mi 13.05. Kindertag mit Star-Wars-Freunden (ab 13 Uhr) + LIVE Lenny SoulJah (ab 18 Uhr) · Do 14.05. Vatertagsparty (ab 15 Uhr) · Fr 15.05. LIVE Reggae Train (ab 18 Uhr) · Sa 16.05. LIVE Milk&Sugar + DJ Roy (ab 15 Uhr). Eintritt frei!', genre:'Stadtfest / Live-Musik / Familie', ticket:'https://www.instagram.com/inspiradu/', new:true, outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1 Fürth Hbf', parking:'Innenstadt Fürth'},
  {cat:'flohmarkt', name:'Grafflmarkt Fürth', loc:'Fürth – Altstadt', start:'2026-09-04', end:'2026-09-05', free:true, desc:'Fürths großer Trödelmarkt in der historischen Altstadt – Schmuckstücke, Graffl und nette Atmosphäre. Fr 16–22 Uhr, Sa 8–16 Uhr. Eintritt frei!', genre:'Markt / Flohmarkt / Stadtfest', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1 Fürth Hbf', parking:'Innenstadt Fürth'},
  {cat:'strand', name:'Wöhrder See Sommerfest', loc:'Nürnberg – Wöhrder See', start:'2026-07-24', end:'2026-07-26', free:true, desc:'Sommerfest am Wöhrder See mit Live-Musik, Cocktails und Strandflair direkt am Wasser. Einer der schönsten Sommertreffpunkte in Nürnberg.', genre:'Sommerfest / See / Open Air', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U2/U3 bis Wöhrder Wiese', parking:'Wöhrder See Parkplatz'},

  {cat:'afterwork', name:'Afterwork Party – Summer Vibes mit DJ MAD', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-05-07', end:'2026-05-07', free:true, desc:'Summer Vibes Afterwork Party mit DJ MAD im GATE Club am Flughafen Nürnberg. Melodic, Afro & Tech House, House Classics. 19–01 Uhr. Eintritt frei!', genre:'House / Afro House / Tech House', ticket:'', outdoor:false, ageMin:18, price:'Kostenlos', oepnv:'S-Bahn S2 bis Flughafen, Terminal 2', parking:'Flughafen Parkhaus'},
  {cat:'afterwork', name:'Tanz in den Mai – GATE Club', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-04-30', end:'2026-04-30', free:false, desc:'Tanz in den Mai im GATE Club! Gate 1: Disco Classics, 80er/90er/2000er mit Frank Sonique. Gate 2: House Music mit DJ MAD. Terrassenopening + Prosecco Empfang + Flower Deko. Terrasse die ganze Nacht geöffnet. Einlass 21 Uhr.', genre:'Disco / House / 80er 90er', ticket:'https://feierliste.ticket.io', outdoor:false, ageMin:18, price:'VVK 12,50€ + Geb.', oepnv:'S-Bahn S2 bis Flughafen, Terminal 2', parking:'Flughafen Parkhaus'},

  {cat:'afterwork', name:'Afterwork Party – Spring Vibes feat. DJane Nadiia', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-04-23', end:'2026-04-23', free:true, desc:'Spring Vibes Afterwork Party mit DJane Nadiia im GATE Club. Melodic, Tech & Afro House. Do. 23. April, 20–01 Uhr. Eintritt frei!', genre:'Melodic House / Tech House / Afro House', ticket:'', outdoor:false, ageMin:18, price:'Kostenlos', oepnv:'S-Bahn S2 bis Flughafen, Terminal 2', parking:'Flughafen Parkhaus'},

  // ─── ONEMMORE ROOFTOP – CINECITTA NÜRNBERG ──────────────────────────────
  {cat:'afterwork', name:'oneMore Rooftop Party – Season Opening', loc:'Nürnberg – CineCittà Rooftop (Gewerbemuseumsplatz 3)', start:'2026-04-18', end:'2026-04-18', free:false, desc:'oneMore summer is coming! Season Opening auf dem Rooftop des CineCittà Nürnberg – Aperol, Pizza, pure House Music von Unic, Aaron Miraku, Elision & AE97. Golden Hour trifft Skyline. 16–22 Uhr. 18+. Afterparty im mach1 inklusive!', genre:'House / Rooftop / Sundowner', ticket:'https://onemore.ticket.io/UDUcTMBi/', outdoor:true, ageMin:18, price:'Tickets ab 6€', oepnv:'U2/U3 Hauptbahnhof, 3 min Fußweg', parking:'Tiefgarage CineCittà'},
  {cat:'afterwork', name:'oneMore Rooftop Party – Round Two', loc:'Nürnberg – CineCittà Rooftop (Gewerbemuseumsplatz 3)', start:'2026-05-14', end:'2026-05-14', free:false, desc:'oneMore rooftop season continues! Die erste Party war komplett ausverkauft – jetzt Round Two. More sun, more rooftop vibes, more house music. Am stunning Rooftop des CineCittà Nürnberg: Cold Drinks, Pizza Slices, City Views und das besondere Rooftop-Feeling. Donnerstag (Christi Himmelfahrt), 16:00 Uhr.', genre:'House / Rooftop / Sundowner', ticket:'https://onemore.ticket.io', new:true, outdoor:true, ageMin:18, price:'Tickets via onemore.ticket.io', oepnv:'U2/U3 Hauptbahnhof, 3 min Fußweg', parking:'Tiefgarage CineCittà'},
  {cat:'afterwork', name:'WALDBAD – OFF.COURT × OneMore (Summer Opening)', loc:'Neustadt an der Aisch – Waldbad', start:'2026-05-09', end:'2026-05-09', free:false, desc:'off.court × oneMore – Summer Opening im Waldbad Neustadt/Aisch. Sa, 9. Mai, 15–23 Uhr. Open-Air-Vibes zwischen Natur, Wasser und elektronischen Sounds – einer der außergewöhnlichsten Spots der Region. Genres: House, Hip-Hop, Techno, 2000s, Afro, Electro. Gemeinsam mit OneMore aus Erlangen. Bei schlechtem Wetter behält dein Ticket Gültigkeit für das nächste Event – null Risiko, nur Vorfreude.', genre:'House / Hip-Hop / Techno / 2000s / Afro / Electro', ticket:'https://events.nocstar.de', new:true, outdoor:true, ageMin:18, price:'Tickets via Nocstar', oepnv:'Bahn nach Neustadt (Aisch) Bahnhof', parking:'Vorhanden am Waldbad'},

  // ─── SOUL ROOFTOP – CLUB STEREO × ADINA HOTEL NÜRNBERG ──────────────────
  {cat:'afterwork', name:'SOUL ROOFTOP – Opening Session', loc:'Nürnberg – Adina Hotel Rooftop (Dr.-Kurt-Schumacher-Str. 1)', start:'2026-05-30', end:'2026-05-30', free:false, desc:'SOUL ROOFTOP Opening! Club Stereo bespielt fünfmal das Rooftop des Hotel Adina. Auftakt mit Studio Wolny & Jens. 17–22 Uhr. Nur 120 Tickets. Club Stereo ab 23 Uhr im Ticketpreis inklusive!', genre:'Soul / House / Rooftop', ticket:'https://tickets.infield.live/event/soul-rooftop-okz1gz', outdoor:true, ageMin:18, price:'Tickets limitiert', oepnv:'U1/U2/U3 Hauptbahnhof, 5 min Fußweg', parking:'Tiefgarage HBF / Innenstadt'},
  {cat:'afterwork', name:'SOUL ROOFTOP – Adina Hotel', loc:'Nürnberg – Adina Hotel Rooftop (Dr.-Kurt-Schumacher-Str. 1)', start:'2026-07-11', end:'2026-07-11', free:false, desc:'SOUL ROOFTOP Session mit Tommy Yamaha & Marc Worm auf dem Adina Hotel Rooftop. 17–22 Uhr. Nur 120 Tickets. Club Stereo ab 23 Uhr inklusive!', genre:'Soul / House / Rooftop', ticket:'https://www.club-stereo.net/party/soul-rooftop/', outdoor:true, ageMin:18, price:'Tickets limitiert', oepnv:'U1/U2/U3 Hauptbahnhof, 5 min Fußweg', parking:'Tiefgarage HBF / Innenstadt'},

  // ─── SOLUNA ROOFTOP EVENTS – DÄCHLA FÜRTH ───────────────────────────────
  {cat:'afterwork', name:'SOLUNA Rooftop Edition – Season Opening (× Dächla)', loc:'Fürth – Dächla Rooftop (Friedrichstraße 6a)', start:'2026-05-09', end:'2026-05-09', free:false, desc:'SOLUNA × DÄCHLA – Season Opening Rooftop Edition über den Dächern von Fürth. Lineup: Aymen Rhalib (YE), Jan-Leon Weiss (Fever Dream) und O3 (Ibiza House). Afro-, Melodic- & Tech-House von 16–22 Uhr. Powered by Ramazzotti Aperitivo Arancia 0.0. Inkl. Afterparty im mach_eins.', genre:'Afro House / Melodic House / Tech House', ticket:'https://www.soluna-sunset.de', new:true, outdoor:true, ageMin:18, price:'Tickets via soluna-sunset.de', oepnv:'U1 Fürth Hbf, 5 min Fußweg', parking:'Innenstadt Fürth'},
  {cat:'afterwork', name:'SOLUNA Rooftop Event – Dächla Fürth', loc:'Fürth – Dächla Rooftop (Friedrichstraße 6a)', start:'2026-06-06', end:'2026-06-06', free:false, desc:'SOLUNA – der Sundowner Event über den Dächern von Fürth! Cocktails, Musik und Rooftop-Feeling auf dem Dächla in Fürth. Atemberaubende Aussicht, lässige Atmosphäre.', genre:'Sundowner / Rooftop / After Work', ticket:'https://daechla.de/events', outdoor:true, ageMin:18, price:'Eintritt (Tickets via daechla.de)', oepnv:'U1 Fürth Hbf, 5 min Fußweg', parking:'Innenstadt Fürth'},
  {cat:'afterwork', name:'SOLUNA Rooftop Event – Dächla Fürth', loc:'Fürth – Dächla Rooftop (Friedrichstraße 6a)', start:'2026-08-08', end:'2026-08-08', free:false, desc:'SOLUNA – der Sundowner Event über den Dächern von Fürth! Cocktails, Musik und Rooftop-Feeling auf dem Dächla in Fürth. Atemberaubende Aussicht, lässige Atmosphäre.', genre:'Sundowner / Rooftop / After Work', ticket:'https://daechla.de/events', outdoor:true, ageMin:18, price:'Eintritt (Tickets via daechla.de)', oepnv:'U1 Fürth Hbf, 5 min Fußweg', parking:'Innenstadt Fürth'},
  {cat:'afterwork', name:'SOLUNA Rooftop Event – Dächla Fürth', loc:'Fürth – Dächla Rooftop (Friedrichstraße 6a)', start:'2026-08-29', end:'2026-08-29', free:false, desc:'SOLUNA – der Sundowner Event über den Dächern von Fürth! Cocktails, Musik und Rooftop-Feeling auf dem Dächla in Fürth. Atemberaubende Aussicht, lässige Atmosphäre.', genre:'Sundowner / Rooftop / After Work', ticket:'https://daechla.de/events', outdoor:true, ageMin:18, price:'Eintritt (Tickets via daechla.de)', oepnv:'U1 Fürth Hbf, 5 min Fußweg', parking:'Innenstadt Fürth'},

  // ─── WEINFESTE ───────────────────────────────────────────────────────────
  // Bestätigte Termine
  {cat:'weinfest', name:'Würzburger Weindorf', loc:'Würzburg – Marktplatz & Innenstadt', start:'2026-05-29', end:'2026-06-10', free:true, desc:'Eines der ältesten und schönsten Weinfeste Deutschlands – 13 Tage Frankenwein, Kulinarik und Musik auf dem historischen Marktplatz in Würzburg. Eintritt frei!', genre:'Weinfest / Fränkischer Wein', ticket:'https://www.wuerzburger-weindorf.de', outdoor:true, ageMin:0, price:'Kostenlos (Konsumation)', oepnv:'Bahn nach Würzburg Hbf, 10 min Fußweg', parking:'Innenstadt Würzburg'},
  {cat:'weinfest', name:'Promenaden-Weinfest Kitzingen', loc:'Kitzingen – Stadtpromenade', start:'2026-06-26', end:'2026-07-06', free:true, desc:'Kitzingens großes Weinfest an der malerischen Stadtpromenade – 11 Tage Frankenwein, Live-Musik und Festzeltbetrieb direkt am Main.', genre:'Weinfest / Frankenwein', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos (Konsumation)', oepnv:'Bahn nach Kitzingen', parking:'Stadtmitte Kitzingen'},
  {cat:'weinfest', name:'Weinfest Wasserburg am Inn', loc:'Wasserburg am Inn', start:'2026-07-25', end:'2026-07-25', free:true, desc:'Gemütliches Weinfest in der historischen Altstadt von Wasserburg – Weine aus der Region, Live-Musik und Halbinsel-Flair am Inn. Immer am letzten Samstag im Juli, Wein unter freiem Sommerhimmel und in den Arkadengängen der Altstadt.', genre:'Weinfest / Sommer', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Wasserburg am Inn', parking:'Innenstadt Wasserburg'},
  {cat:'weinfest', name:'Traditionelles Mostfest Lalling (mit Töpfermarkt)', loc:'Lalling – Bayerischer Wald', start:'2026-05-30', end:'2026-05-31', free:true, desc:'Traditionsreiches Lallinger Mostfest mit Töpfermarkt im Bayerischen Wald – regionaler Most, Brotzeiten und gemütliches Beisammensein. Krönung der Deutschen Mostkönigin am Samstag.', genre:'Mostfest / Brauchtum / Töpfermarkt', ticket:'https://lalling.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Deggendorf, weiter Bus', parking:'Vor Ort'},
  {cat:'weinfest', name:'Pfälzer Weinfest Landau a.d. Isar', loc:'Landau an der Isar', start:'2026-05-29', end:'2026-05-31', free:true, desc:'Pfälzer Weine trifft bayerische Gastlichkeit – ein Wochenende Weinfestival in Landau an der Isar mit Winzern aus der Pfalz.', genre:'Weinfest / Pfälzer Wein', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Landau a.d. Isar', parking:'Vor Ort'},

  // Termin 2026 noch offen – typische Sommer-/Herbsttermine
  {cat:'weinfest', name:'Hofgarten-Weinfest Würzburg', loc:'Würzburg – Hofgarten der Residenz', start:'2026-06-26', end:'2026-07-05', free:true, desc:'Exklusives Weinfest im barocken Hofgarten der Würzburger Residenz – Frankenweine der Region in einzigartiger UNESCO-Welterbe-Kulisse. Veranstalter: Staatlicher Hofkeller Würzburg. So/Mo/Di 17–23 Uhr, Mi–Sa bis 24 Uhr.', genre:'Weinfest / Frankenwein', ticket:'https://www.hofkeller.de/Weinfest-im-Hofgarten', outdoor:true, ageMin:0, price:'Kostenlos (Konsumation)', oepnv:'Bahn nach Würzburg Hbf', parking:'Residenz Würzburg'},
  {cat:'weinfest', name:'Hofschoppenfest Würzburg (Bürgerspital)', loc:'Würzburg – Bürgerspital Innenhof', start:'2026-06-10', end:'2026-06-20', free:true, desc:'11 Tage gemütliches Schoppen-Fest im historischen Innenhof der Bürgerspital Weinstuben. Frankenweine aus dem Bürgerspital-Weingut, Brotzeiten und Sommeratmosphäre. Highlight: White Party am 15. Juni (alle in Weiß).', genre:'Weinfest / Schoppen', ticket:'https://www.buergerspital-weinstuben.de/feiern/unsere_feste/hofschoppenfest/', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Würzburg Hbf', parking:'Innenstadt Würzburg'},
  {cat:'weinfest', name:'Wein am Stein Festival Würzburg', loc:'Würzburg – Weingut am Stein', start:'2026-07-09', end:'2026-07-26', free:false, desc:'14 Tage / 14 Nächte Weinfest auf dem legendären Würzburger Stein – einer der berühmtesten Weinlagen Deutschlands. Täglich Live-Bands mitten in den Reben. Mo–Fr ab 16:30 Uhr, Sa/So ab 15 Uhr.', genre:'Weinfest / Würzburger Stein / Live-Musik', ticket:'https://weinamstein.ticket.io', outdoor:true, ageMin:0, price:'Tickets via wein-am-stein.de', oepnv:'Bahn nach Würzburg Hbf', parking:'Steinbachtal'},
  {cat:'weinfest', name:'76. Fränkisches Weinfest Volkach', loc:'Volkach – Festplatz', start:'2026-08-14', end:'2026-08-18', free:true, desc:'76. Fränkisches Weinfest – Frankens größtes Weinfest mit ~50.000 Besuchern. Über 60 Frankenweine der Volkacher Mainschleife, Festplatz-Kulisse unter Allee-Bäumen, kulinarische Spezialitäten und Live-Musik.', genre:'Weinfest / Frankenwein', ticket:'https://www.volkach.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Volkach', parking:'Festplatz Volkach'},
  {cat:'weinfest', name:'Straßenweinfest Sommerhausen (Burschenverein)', loc:'Sommerhausen – Weindorf', start:'2026-06-27', end:'2026-06-29', free:true, desc:'Charmantes Straßenweinfest des Historischen Burschenvereins im Winzerdorf Sommerhausen – Frankenweine, gemütliche Gassen und echte fränkische Gastlichkeit. Festbeginn Sa 27.06. um 16 Uhr.', genre:'Weinfest / Winzerdorf', ticket:'https://burschenverein.sommerhausen.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Würzburg', parking:'Vor Ort'},
  {cat:'weinfest', name:'55. Rödelseer Weinfest', loc:'Rödelsee – Schloss Crailsheim', start:'2026-07-03', end:'2026-07-06', free:true, desc:'55. Rödelseer Weinfest in romantischer Idylle rund um das Schloss Crailsheim. Immer am ersten Wochenende im Juli, fränkische Winzer und Mainfranken-Weingenuss.', genre:'Weinfest / Frankenwein', ticket:'https://www.weinfest-roedelsee.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Kitzingen', parking:'Vor Ort'},
  {cat:'weinfest', name:'Weinfest "Romantik & Wein" Obernbreit', loc:'Obernbreit – Historisches Rathaus', start:'2026-07-03', end:'2026-07-05', free:true, desc:'Traditionelles Weinfest "Romantik und Wein" am historischen Rathaus Obernbreit. Immer am ersten Wochenende im Juli – Frankenweine in Gassen, Höfen und Scheunen, dazu deftige Spezialitäten.', genre:'Weinfest / Tradition', ticket:'https://obernbreit.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Kitzingen', parking:'Vor Ort'},
  {cat:'weinfest', name:'Weinfest Röttingen (zu Pfingsten)', loc:'Röttingen – Liebliches Taubertal', start:'2026-05-22', end:'2026-05-25', free:true, desc:'Weinfest in der Weinstadt Röttingen im Lieblichen Taubertal – immer zu Pfingsten. Fränkische Weine vom Röttinger Feuerstein (Silvaner, Tauberschwarz), Live-Musik, Tanz, Flohmarkt und Kinderschminken am historischen Marktplatz.', genre:'Weinfest / Taubertal / Pfingsten', ticket:'https://www.roettingen.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Würzburg', parking:'Vor Ort'},
  {cat:'weinfest', name:'Wein|See|Lig Großlangheim', loc:'Großlangheim – Schlossruine am See', start:'2026-07-17', end:'2026-07-20', free:true, desc:'Weinfest "Wein|See|Lig" in Großlangheim direkt an der Schlossruine am See. Eröffnung durch die Weinprinzessin, Frankenweine, Live-Musik und Spezialitäten der Weinlounge.', genre:'Weinfest / Frankenwein', ticket:'https://www.grosslangheim.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Kitzingen', parking:'Vor Ort'},
  {cat:'weinfest', name:'Weinfestival Kleinlangheim', loc:'Kleinlangheim – Festival-Platz', start:'2026-06-19', end:'2026-06-22', free:false, desc:'Weinfestival Kleinlangheim – Frankenweine trifft Festival-Feeling. Festival-Platz mit vielen Lichtern, mitreißender Live-Musik und vielfältigem Speisenangebot. Eintrittspreise: Fr 18:30 Uhr 7€ (vorher frei), Sa 18:00 Uhr frei/3€/7€, So+Mo freier Eintritt.', genre:'Weinfestival / Frankenwein', ticket:'https://www.weinfestival-kleinlangheim.eu', outdoor:true, ageMin:0, price:'Tickets ab 7€', oepnv:'Bus ab Kitzingen', parking:'Vor Ort'},
  {cat:'weinfest', name:'Summer-Wine-Time Ipsheim', loc:'Ipsheim – Mittelfranken', start:'2026-07-31', end:'2026-08-02', free:true, desc:'Sommerliches Weinfest in Ipsheim im mittelfränkischen Weinland – Frankenweine, entspannte Sommeratmosphäre und regionale Spezialitäten. Termin 2026 noch nicht bestätigt.', genre:'Weinfest / Sommer', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Uffenheim', parking:'Vor Ort'},
  {cat:'weinfest', name:'Wipfelder Straßenweinfest', loc:'Wipfeld – Marktplatz am Main', start:'2026-08-14', end:'2026-08-16', free:true, desc:'Dreitägiges Straßenweinfest des Musikverein-Weinbauverein Wipfeld am Mainufer. Fränkische Weine im stilvollen Ambiente zwischen Fachwerkhäusern und dezenter Beleuchtung rund um den historischen Marktplatz. Mariä Himmelfahrt.', genre:'Weinfest / Mainufer', ticket:'https://www.wipfeld.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Schweinfurt', parking:'Vor Ort'},
  {cat:'weinfest', name:'40. Altstadt-Weinfest Zeil am Main (Jubiläum)', loc:'Zeil am Main – Altstadt', start:'2026-07-31', end:'2026-08-03', free:true, desc:'40. Altstadt-Weinfest in der historischen Altstadt von Zeil am Main – Jubiläumsausgabe. Erstmals startet das Fest bereits am Freitagabend ab 19 Uhr. Fränkische Weine, Blasmusik, Fachwerk-Ambiente und festliche Musik unter Lichtern.', genre:'Weinfest / Altstadt / Jubiläum', ticket:'https://www.zeil-am-main.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Haßfurt', parking:'Altstadt Zeil'},
  {cat:'weinfest', name:'Weinherbst Miltenberg', loc:'Miltenberg – Engelplatz', start:'2026-09-25', end:'2026-09-27', free:true, desc:'Weinherbst auf dem Engelplatz in Miltenberg – Frankenweine in romantischer mittelalterlicher Altstadt am Bayerischen Untermain. Regionale Winzer und fränkische Spezialitäten.', genre:'Weinherbst / Altstadt', ticket:'https://churfranken.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Miltenberg', parking:'Innenstadt Miltenberg'},
  {cat:'weinfest', name:'Weinherbst Birkenfeld', loc:'Birkenfeld – Württemberg', start:'2026-09-11', end:'2026-09-13', free:true, desc:'Herbstliches Weinfest in Birkenfeld – Württemberger und regionale Weine, gesellige Atmosphäre und Erntezeit-Stimmung. Termin 2026 noch nicht bestätigt.', genre:'Weinherbst / Herbst', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Pforzheim, weiter Bus', parking:'Vor Ort'},
  {cat:'weinfest', name:'15. Bamberger Weinfest', loc:'Bamberg – Maxplatz', start:'2026-05-21', end:'2026-05-25', free:true, desc:'15. Bamberger Weinfest auf dem Maxplatz (nicht Sandstraße!) – Frankenweine in der UNESCO-Welterbe-Stadt. Eröffnung Do 21. Mai 18:30 Uhr. Bierstadt Bamberg feiert den Wein in der Innenstadt.', genre:'Weinfest / Frankenwein', ticket:'https://kultur.bamberg.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Bamberg Hbf', parking:'Innenstadt Bamberg'},
  {cat:'weinfest', name:'13. Bayreuther Weinfest', loc:'Bayreuth – Marktplatz', start:'2026-08-06', end:'2026-08-10', free:true, desc:'13. Bayreuther Weinfest auf dem Marktplatz – Frankenweine und regionale Spezialitäten in der Stadt der Festspiele. Bayreuther Innenstadt wird zum Genussparadies.', genre:'Weinfest / Frankenwein', ticket:'https://weinfest-bayreuth.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Bayreuth Hbf', parking:'Innenstadt Bayreuth'},
  {cat:'weinfest', name:'Weinfest Kulmbach (Premiere)', loc:'Kulmbach – Marktplatz', start:'2026-05-22', end:'2026-05-25', free:true, desc:'PREMIERE: Erstes Weinfest in Kulmbach! Die bekannte Bierstadt feiert den Wein. 17 erlesene Weine – fruchtig-frische Weißweine, elegante Rosés, vollmundige Rotweine – Donnerstag bis Sonntag auf dem Marktplatz.', genre:'Weinfest / Premiere / Frankenwein', ticket:'https://www.kulmbach.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Kulmbach', parking:'Innenstadt Kulmbach'},
  {cat:'weinfest', name:'Weinfest Bad Reichenhall', loc:'Bad Reichenhall – Rathausplatz', start:'2026-08-12', end:'2026-08-15', free:true, desc:'Weinfest am Rathausplatz Bad Reichenhall – internationale Weine, Wein-Spezialitäten und Kurort-Ambiente. Termin Mitte August (genauer Termin 2026 in Bestätigung).', genre:'Weinfest / Kurbad', ticket:'https://www.stadt-bad-reichenhall.de', outdoor:true, ageMin:0, price:'Eintritt', oepnv:'Bahn nach Bad Reichenhall', parking:'Kurort Bad Reichenhall'},
  {cat:'weinfest', name:'Weinfest Schwabmünchen', loc:'Schwabmünchen – Marktplatz', start:'2026-10-25', end:'2026-10-25', free:true, desc:'Herbstliches Weinfest auf dem Marktplatz Schwabmünchen – immer am vierten Sonntag nach Michaeli (29.09.). Sonntagsweinfest Ende Oktober mit Weinen aus der Region.', genre:'Weinfest / Herbst', ticket:'https://schwabmuenchen.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Schwabmünchen', parking:'Marktplatz'},
  {cat:'weinfest', name:'Oberstdorfer Weinfest', loc:'Oberstdorf – Kurpark Prinzregenten-Platz', start:'2026-08-28', end:'2026-08-30', free:true, desc:'Oberstdorfer Weinfest im Kurpark – Winzer aus Rheinhessen präsentieren neueste Kreationen, Winzersekte und Destillate. Bei jedem Wetter, Eintritt frei. Live-Musik täglich ab 16 Uhr (Wildbock, The Rubberneckers, Musikkapelle Oberstdorf).', genre:'Weinfest / Alpen', ticket:'https://www.oberstdorf.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Oberstdorf', parking:'Kurort Oberstdorf'},
  {cat:'festival', name:'Black Coffee – Open Air', loc:'Große Straße, Nürnberg', start:'2026-04-30', end:'2026-04-30', free:false, desc:'17–23 Uhr. Grammy-Gewinner Black Coffee (Afro House / Electronic) live auf der Großen Straße am Dutzendteich. Erstes Nürnberg-Konzert der Ibiza-Legende – über 10.000 Besucher erwartet. Strikt ab 18 Jahren, keine Ausnahmen.', genre:'Afro House / Electronic', ticket:'https://blackcoffee.ticket.io/', new:true, outdoor:true, ageMin:18, price:'Tickets auf ticket.io', oepnv:'Tram 6/10 oder U1 bis Frankenstraße', parking:'Parkplatz Zeppelinfeld / Dutzendteich'},

  // ─── NEU KW17 2026 (Update 20. April 2026) ──────────────────────────────
  {cat:'russian', name:'ONLY Russian Open Air (Russian Sensation × Only)', loc:'Nürnberg – Serenadenhof', start:'2026-05-30', end:'2026-05-30', free:false, desc:'Erstes Russian Open Air dieses Jahr in Nürnberg – Russian Sensation × ONLY Club im Serenadenhof. Europas größte russische Eventreihe feiert Open-Air-Premiere unter freiem Himmel. 16–22 Uhr. Gute Vibes, starke Beats und beste Community. Lineup folgt in Kürze (u.a. DJ Insane, only.nuernberg, russianconnectionfestival.de).', genre:'Russian Party / Open Air', ticket:'https://www.eventbrite.de/e/russian-sensation-x-only-open-air-festival-nurnberg-tickets-1985050638897', new:true, outdoor:true, ageMin:16, price:'Infos auf Eventbrite', oepnv:'U1 bis Frankenstraße oder S-Bahn Richtung Langwasser', parking:'Parkplatz Serenadenhof'},
  {cat:'russian', name:'Russian White Night', loc:'Deggendorf – Club Chao Chao', start:'2026-06-06', end:'2026-06-06', free:false, desc:'White Night Edition (белая ночь) von SOYUZ Events – Dresscode: Weiß! 100 White Welcome Shots für die ersten Gäste, aufwändige weiße Deko, Professional Photographer, weiße Sonnenbrillen & elegante Fächer. Music by DJ IGUAN × DJ FAMOUS (Russian Dance Music). Einlass 23:00 Uhr.', genre:'Russian Dance Music', ticket:'https://www.instagram.com/soyuz_events', outdoor:false, ageMin:16, price:'10 €', oepnv:'Bahn nach Deggendorf Hbf', parking:'Vorhanden'},
  {cat:'festival', name:'Musikfest ION – 75. Jubiläum', loc:'Nürnberg (verschiedene Spielstätten)', start:'2026-06-19', end:'2026-07-05', free:false, desc:'75. Ausgabe des internationalen Festivals für Geistliche Musik in Nürnberg. Jubiläumswochenende 19.–21. Juni mit 9 Konzerten auf 3 Spielstätten. 30 Konzerte mit The King\'s Singers, Anna Prohaska, Cameron Carpenter, Windsbacher Knabenchor u.v.m.', genre:'Klassik / Geistliche Musik / Orgel', ticket:'https://musikfest-ion.de', outdoor:false, ageMin:0, price:'ab 15 €', oepnv:'U-Bahn Nürnberg Innenstadt', parking:'Altstadt-Parkhäuser'},
  {cat:'festival', name:'Zabbath Open Air', loc:'Nürnberg – Z-Bau', start:'2026-08-29', end:'2026-08-29', free:false, desc:'Underground Metal Festival im Z-Bau Nürnberg – Open-Air-Stage, zwei Indoor-Stages, 10 Bands, Kunstausstellung und Biergarten. 2026 u.a. mit Wolvennest (Atmospheric Black Doom), Imha Tarikat (Black Metal), Bedsore (Death Metal), Hexer (Sludge/Doom) u.v.m. No Racism. No Sexism. No Homophobia.', genre:'Black Metal / Doom / Sludge / Death Metal', ticket:'https://www.tixforgigs.com/Event/72697', outdoor:true, ageMin:16, price:'Infos auf tixforgigs.com', oepnv:'U1 bis Frankenstraße', parking:'Begrenzt'},
  {cat:'festival', name:'Incantation Rites Festival', loc:'Nürnberg – Z-Bau', start:'2026-12-05', end:'2026-12-05', free:false, desc:'Incantation Rites – Death & Doom Metal Festival im Z-Bau Nürnberg mit AHAB, Sulphur Aeon, Thronehammer und weiteren Bands. Atmosphärisches Underground-Festival in Nürnbergs renommiertem Club.', genre:'Death Metal / Doom Metal', ticket:'', outdoor:false, ageMin:16, price:'TBC', oepnv:'U1 bis Frankenstraße', parking:'Begrenzt'},

  // ─── 🏝️ BEACH PARTYS in Thermen & Erlebnisbädern (Update 20. April 2026) ──
  {cat:'beachparty', name:'Saunafest „Wir geben alles!"', loc:'Kristall Palm Beach, Stein', start:'2026-05-02', end:'2026-05-02', free:false, desc:'Ab 16 Uhr. Saunafest mit den besten Aufguss-Highlights aus über 20 Jahren. Showaufgüsse, Lagerfeuer, Live-Musik und stimmungsvolles Rahmenprogramm in der Saunalandschaft. Ab 16 Jahren (FKK-Saunabereich).', genre:'Saunafest / Show-Aufgüsse', ticket:'https://palm-beach.de/aktionen-events/', new:true, outdoor:false, ageMin:16, price:'Regulärer Eintritt Sauna', oepnv:'Bus 60/65 bis Stein, Palm Beach', parking:'Vorhanden kostenlos'},
  {cat:'beachparty', name:'Saunafest „Alle wollen Malle"', loc:'Kristall Palm Beach, Stein', start:'2026-06-06', end:'2026-06-06', free:false, desc:'Ab 16 Uhr. Mallorca-Feeling im Palm Beach: Partyaufgüsse, Palmen-Atmosphäre, Freibier und Urlaubsvibes im gesamten Saunabereich. Feiern, schwitzen und genießen wie im Urlaub. Ab 16 Jahren (FKK-Saunabereich).', genre:'Saunafest / Malle-Party', ticket:'https://palm-beach.de/aktionen-events/', new:true, outdoor:false, ageMin:16, price:'Regulärer Eintritt Sauna', oepnv:'Bus 60/65 bis Stein, Palm Beach', parking:'Vorhanden kostenlos'},
  {cat:'beachparty', name:'Herbarium Festival', loc:'Therme Erding', start:'2026-04-13', end:'2026-04-26', free:false, desc:'Frühlings-Wellness-Festival in der größten Therme der Welt. Kräuter-Aufgüsse, Live-Musik unter Palmen, besondere Massagen und botanisch inspiriertes Kulinarik-Programm über zwei Wochen. VitalOase & VitalTherme.', genre:'Wellness-Festival / Kräuter-Aufgüsse', ticket:'https://shop.therme-erding.de/spar-angebote/eventtickets', new:true, outdoor:true, ageMin:0, price:'ab 65,90 € Weekday / 70,90 € Weekend', oepnv:'S2 Erding, dann Bus', parking:'Vorhanden (gebührenpflichtig)'},
  {cat:'beachparty', name:'CineWave – Kino im Wellenbad', loc:'Therme Erding', start:'2026-04-25', end:'2026-04-25', free:false, desc:'Schwimmen und gleichzeitig Filme schauen: Das CineWave verwandelt das Wellenbad in ein schwimmendes Open-Air-Kino. Auf Schwimmreifen durch das Wasser treiben und gleichzeitig einen Film erleben.', genre:'Kino / Poolevent', ticket:'https://www.therme-erding.de/event-detail/cinewave/', new:true, outdoor:false, ageMin:0, price:'Ticket erforderlich', oepnv:'S2 Erding, dann Bus', parking:'Vorhanden (gebührenpflichtig)'},
  {cat:'beachparty', name:'Lange Nacht der Saunen', loc:'Therme Erding', start:'2026-05-08', end:'2026-05-08', free:false, desc:'Die längste Saunanacht des Jahres. Showaufgüsse, besondere Inszenierungen, Live-Musik und kulinarische Überraschungen bis tief in die Nacht. Ab 16 Jahren (textilfreier Saunabereich).', genre:'Saunanacht / Showaufgüsse', ticket:'https://www.therme-erding.de/event-detail/lange-nacht-der-saunen/', new:true, outdoor:false, ageMin:16, price:'Ticket erforderlich', oepnv:'S2 Erding, dann Bus', parking:'Vorhanden (gebührenpflichtig)'},
  {cat:'beachparty', name:'BAYERN 3 Beachparty', loc:'Therme Erding', start:'2026-06-05', end:'2026-06-07', free:false, desc:'3-tägige Beach-Party am Wellenbad-Außenpool. Große Showbühne mit Top-Acts von BAYERN 3, Beach-Cocktails, Palmen-Ambiente. Einer der Sommer-Höhepunkte der größten Therme der Welt.', genre:'Beachparty / Live-Musik', ticket:'https://shop.therme-erding.de/spar-angebote/eventtickets', new:true, outdoor:true, ageMin:16, price:'62,90 € pro Tag', oepnv:'S2 Erding, dann Bus', parking:'Vorhanden (gebührenpflichtig)'},
  {cat:'beachparty', name:'Summer Festival powered by Adelholzener', loc:'Therme Erding', start:'2026-07-10', end:'2026-07-12', free:false, desc:'3-tägiges Open-Air Sommer-Festival. Der Wellenbad-Außenpool verwandelt sich in einen riesigen Open-Air-Dancefloor mit Live-Acts, DJs und Palmen-Party-Atmosphäre.', genre:'Open-Air / House / Dance', ticket:'https://shop.therme-erding.de/spar-angebote/eventtickets', new:true, outdoor:true, ageMin:16, price:'57,90–62,90 € pro Tag', oepnv:'S2 Erding, dann Bus', parking:'Vorhanden (gebührenpflichtig)'},
  {cat:'beachparty', name:'90er Party', loc:'Therme Erding', start:'2026-07-24', end:'2026-07-24', free:false, desc:'Große 90er-Themenparty am Pool. Hits aus den Neunzigern, Retro-Outfits willkommen, Disco-Vibes unter Palmen. Nostalgische Sommernacht an der Therme.', genre:'90er / Retro / Pool', ticket:'https://shop.therme-erding.de/spar-angebote/eventtickets/90er-party', new:true, outdoor:true, ageMin:16, price:'57,90 €', oepnv:'S2 Erding, dann Bus', parking:'Vorhanden (gebührenpflichtig)'},
  {cat:'beachparty', name:'Dirndlflug Contest', loc:'Therme Erding', start:'2026-07-25', end:'2026-07-25', free:false, desc:'Kultiger Rutschen-Contest im Dirndl bzw. in der Lederhose. Jede Menge Spaß, bayerische Stimmung und Preise für die besten Flieger. Ein Highlight des Therme-Erding-Sommers.', genre:'Contest / Bayrische Party', ticket:'https://www.therme-erding.de/event-detail/dirndlflug-contest/', new:true, outdoor:true, ageMin:16, price:'Ticket erforderlich', oepnv:'S2 Erding, dann Bus', parking:'Vorhanden (gebührenpflichtig)'},
  {cat:'beachparty', name:'Brass Poolparty', loc:'Therme Erding', start:'2026-08-22', end:'2026-08-23', free:false, desc:'Zwei Tage bayerische Brass-Lebensfreude am Pool: Blasmusik trifft Party-Sound, Heimatklänge und echte bayerische Lifestyle-Vibes am Wellenbad-Außenpool.', genre:'Brass / Bayrische Beats', ticket:'https://shop.therme-erding.de/spar-angebote/eventtickets', new:true, outdoor:true, ageMin:16, price:'62,90 € pro Tag', oepnv:'S2 Erding, dann Bus', parking:'Vorhanden (gebührenpflichtig)'},
  {cat:'beachparty', name:'Summer Closing House Party', loc:'Therme Erding', start:'2026-09-12', end:'2026-09-12', free:false, desc:'Großes Sommer-Abschlussfest: Der Wellenbad-Außenpool wird zur pulsierenden Open-Air-Dance-Stage mit House-DJs und Beats bis in die Nacht. Saison-Finale unter Palmen.', genre:'House / Open-Air Closing', ticket:'https://www.therme-erding.de/event-detail/summer-closing-house-party/', new:true, outdoor:true, ageMin:16, price:'Ticket erforderlich', oepnv:'S2 Erding, dann Bus', parking:'Vorhanden (gebührenpflichtig)'},

  // ─── 🎉 AFTERWORK / PARTY + 🎵 FESTIVAL + 🎡 KÄRWA (Update 23. April 2026) ───
  {cat:'afterwork', name:'HAYDE! Grand Opening at Nachtkind', loc:'Nachtkind, Nürnberg', start:'2026-04-24', end:'2026-04-24', free:false, desc:'Grand Opening der neuen Event-Reihe HAYDE! im Nachtkind Nürnberg. Ägäis- und Orient-Club-Sounds von 23:00 bis 05:00 Uhr. Line-up: DJ Rasimcan (Köln) und DJ Nycos Benyc (Stuttgart). Einer der spannendsten Club-Abende im April.', genre:'Ägäis / Orient / Club Sounds', ticket:'https://www.instagram.com/nachtkind.nbg/', new:true, outdoor:false, ageMin:18, price:'Ticket erforderlich', oepnv:'U1 bis Hauptbahnhof', parking:'Parkhaus Hauptbahnhof'},
  {cat:'afterwork', name:'ORA Curated Aftershow at Nachtkind', loc:'Nachtkind, Nürnberg', start:'2026-04-30', end:'2026-05-01', free:false, desc:'ORA Curated Aftershow Party im Nachtkind Nürnberg. Von 23:00 bis late mit Chez Marie b2b Blankenheim, Nicole Da Silva, Marvin Aloys b2b Steve Hope und Backroom Session. Hochkarätige Electronic/House-Nacht direkt nach dem Black Coffee Open Air.', genre:'House / Electronic / Aftershow', ticket:'https://www.instagram.com/ora.curated/', new:true, outdoor:false, ageMin:18, price:'Ticket erforderlich', oepnv:'U1 bis Hauptbahnhof', parking:'Parkhaus Hauptbahnhof'},
  {cat:'afterwork', name:'NÜRNBERG FEIERT Vol. 7', loc:'Nürnberg – 8 Clubs Altstadt', start:'2026-05-08', end:'2026-05-08', free:false, desc:'Die größte Clubnacht Nürnbergs. 1 Ticket, 8 Clubs, 20 Acts: Nachtkind, Die Bombe, Hinz x Kunz, Mach 1, Resi, Die Box, Gemein und Gefährlich, Die Rosi. Top Acts u.a. Val (Nachtkind), Ely Oaks (Mach 1), DJ Viga (Hinz x Kunz), Anvee (Die Bombe), Honk! (Resi), Borja Solla (Die Box), Frizzo (Die Rosi), Phil Fuldner (Gemein & Gefährlich).', genre:'House / Techno / Hip-Hop / Mixed Club', ticket:'https://www.nuernberg-feiert.de', new:true, outdoor:false, ageMin:18, price:'1 Ticket für 8 Clubs', oepnv:'U-Bahn Lorenzkirche / Hauptbahnhof', parking:'Parkhaus Altstadt'},
  {cat:'afterwork', name:'LIMERENCE – Picknick & Beats', loc:'Stadtpark Pavillon, Schwabach', start:'2026-05-23', end:'2026-05-23', free:true, desc:'Picknick & Beats im Stadtpark Schwabach. Von 15:00 bis 21:00 Uhr, FREE ENTRY. House & Tech-House Open Air – Picknickdecke & Drinks mitbringen. Von limerence.evts (Ibiza meets Bunker).', genre:'House / Tech-House / Open Air', ticket:'https://www.instagram.com/limerence.evts/', new:true, outdoor:true, ageMin:18, price:'Kostenlos', oepnv:'S-Bahn S1 bis Schwabach', parking:'Vorhanden am Stadtpark'},
  {cat:'festival', name:'Traumhänger Day & Night Open Air 2026', loc:'München – Traumhänger Open Air', start:'2026-06-06', end:'2026-06-06', free:false, desc:'Electronic Music Open Air Festival in München – Day & Night. Mehrstufiger Ticketverkauf, Phase 4 (fast) ausverkauft. Einer der angesagtesten Open-Air-Events Süddeutschlands für Electronic/House-Fans. Details und Line-up laufend auf traumhaengerfestival.de.', genre:'Electronic / House / Techno', ticket:'https://traumhaengerfestival.de', new:true, outdoor:true, ageMin:18, price:'Phase 4 fast ausverkauft', oepnv:'MVV München', parking:'Begrenzt'},
  {cat:'volksfest', name:'Annafest Forchheim', loc:'Forchheim – Kellerwald', start:'2026-07-24', end:'2026-08-03', free:true, desc:'Eines der traditionsreichsten Volksfeste Frankens (seit 1840) im schattigen Eichenwald des Forchheimer Kellerwalds. 23 Bierkeller mit 17 Bieren von 15 Brauereien, 8 Musikbühnen mit Live-Bands und Musikkapellen, 60+ Schausteller und Imbissstände. Bieranstich und Eröffnung am Freitag, 24. Juli.', genre:'Kirchweih / Volksfest / Fränkisches Bier', ticket:'https://www.annafest.bayern', new:true, outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn bis Forchheim, dann Shuttle/Bus', parking:'P&R ausgewiesen'},
  {cat:'volksfest', name:'Oktoberfest München 2026 (191. Wiesn)', loc:'München – Theresienwiese', start:'2026-09-19', end:'2026-10-04', free:true, desc:'Das 191. Oktoberfest auf der Theresienwiese – größtes Volksfest der Welt. 16 Tage Bierzelte der sechs Münchner Brauereien, Fahrgeschäfte, Tradition und bayerische Lebensfreude. Eröffnung am Samstag, 19. September, um 12 Uhr mit dem „O\'zapft is!". Öffnungszeiten: Mo–Do 10–23:30, Fr 10–24, Sa 9–24, So/Feiertag 9–23:30 Uhr.', genre:'Volksfest / Wiesn', ticket:'https://www.oktoberfest.de', new:true, outdoor:true, ageMin:0, price:'Eintritt frei (Verzehr kostenpflichtig)', oepnv:'U4/U5 bis Theresienwiese', parking:'Nicht empfohlen – ÖPNV nutzen'},
  // ── KW 18 2026 Update ──
  {cat:'festival', name:'Trucker & Country Festival Deutschland', loc:'Geiselwind – Eventzentrum Strohofer', start:'2026-05-22', end:'2026-05-25', free:false, desc:'43. Ausgabe des größten Trucker & Country-Festivals in Deutschland. 4 Tage Country-Musik, imposante Trucks, Bikes und Western-Flair. ~40.000 Besucher. Mo (25.5.) freier Eintritt. Kinder unter 14 J. kostenlos.', genre:'Country / Western / Trucker', ticket:'https://www.truckerfestival-geiselwind.de', outdoor:true, ageMin:0, price:'Weekend-Ticket ab 65 €, Mo frei', oepnv:'Kein direkter ÖPNV – Fahrgemeinschaft / Shuttle', parking:'Vorhanden am Gelände'},
  {cat:'festival', name:'Feuertanz Festival', loc:'Abenberg – Burg Abenberg', start:'2026-06-12', end:'2026-06-13', free:false, desc:'Mittelalter-, Folk- und Metal-Festival auf der historischen Burg Abenberg bei Roth. 2 Tage mit Dartagnan, In Extremo, Subway To Sally, Corvus Corax u.v.m. Mittelaltermarkt, Feuerakrobatik und Nachtkonzerte. 2026 bereits AUSVERKAUFT.', genre:'Medieval / Folk / Metal', ticket:'https://www.feuertanz-festival.com/tickets.html', outdoor:true, ageMin:0, price:'ab 115 € (ausverkauft)', oepnv:'Bahn nach Roth, dann Bus/Taxi', parking:'Vorhanden am Gelände'},
  {cat:'festival', name:'Meadow Festival', loc:'Feuchtwangen – Stausee Dorfgütingen', start:'2026-06-24', end:'2026-06-27', free:false, desc:'Metal- und Hardcore-Festival am Stausee Dorfgütingen in Feuchtwangen. 4 Tage Open-Air in idyllischer Seelage, ca. 70 km südwestlich von Nürnberg.', genre:'Metal / Hardcore', ticket:'https://www.meadow-festival.de', outdoor:true, ageMin:0, price:'TBC', oepnv:'Kein direkter ÖPNV – Fahrgemeinschaft', parking:'Vorhanden'},
  {cat:'festival', name:'Shamrock Castle Festival', loc:'Eggolsheim – Schloss Jägersburg', start:'2026-07-03', end:'2026-07-04', free:false, desc:'15. Shamrock Castle Festival auf dem malerischen Schloss Jägersburg in der Fränkischen Schweiz. Folk, Irish-Punk und Rock mit Fiddler\'s Green, The Real McKenzies und weiteren 7 Acts. ~2.000 Besucher.', genre:'Folk / Irish / Punk / Rock', ticket:'https://www.shamrock-castle.de/tickets.html', outdoor:true, ageMin:0, price:'ab 93,95 €', oepnv:'Bahn nach Forchheim, dann Bus', parking:'Vorhanden am Gelände'},
  {cat:'festival', name:'Waldstock Festival Pegnitz', loc:'Pegnitz – Schlossberg', start:'2026-07-10', end:'2026-07-12', free:true, desc:'Eines der größten kostenlosen Umsonst-&-Draußen-Festivals Bayerns am Schlossberg in Pegnitz. 3 Tage Rock, Pop und Punk mit lokalen und regionalen Bands. EINTRITT FREI!', genre:'Pop / Punk / Rock', ticket:'https://waldstock.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Pegnitz', parking:'Vorhanden'},
  {cat:'festival', name:'Ansbach Open', loc:'Ansbach – Campus Hochschule Ansbach', start:'2026-07-24', end:'2026-07-26', free:false, desc:'Dreitägiges Open-Air-Festival auf dem Campus der Hochschule Ansbach. Fr: Tobi Krell (Sommershow) & Hannes Ringlstetter/Stephan Zinner (Kabarett). Sa: The BossHoss – „Back To The Boots"-Tour. So: KAMRAD & Special Guest Loi. Tickets über Reservix.', genre:'Pop / Kabarett / Country-Rock', ticket:'https://www.reservix.de/tickets-ansbach-open/', outdoor:true, ageMin:0, price:'ab ca. 25 € pro Abend', oepnv:'Bahn nach Ansbach Hbf, 15 min zu Fuß', parking:'Campus Hochschule Ansbach'},
  {cat:'festival', name:'Singoldsand Festival', loc:'Schwabmünchen', start:'2026-08-21', end:'2026-08-22', free:false, desc:'Zweitägiges Festival mit Electro, Hip-Hop, Pop und Rock in Schwabmünchen, ~100 km von Nürnberg. Rund 10.000 Besucher im Jahnstraße-Gelände.', genre:'Electro / Hip-Hop / Pop / Rock', ticket:'https://www.singoldsand-festival.de', outdoor:true, ageMin:0, price:'TBC', oepnv:'Bahn nach Schwabmünchen', parking:'Vorhanden'},

  // ── KW 19 2026 Update ──
  {cat:'festival', name:'Kontakt – Das Kulturfestival Bamberg', loc:'Bamberg – Metalluk-Gelände', start:'2026-05-21', end:'2026-05-24', free:true, desc:'20-jähriges Jubiläum des Kontakt-Kulturfestivals in Bamberg! 4 Tage Umsonst & Draußen mit Alternativ, Indie, Punk, Elektro, Hip-Hop, Workshops und Kunst auf dem Metalluk-Gelände. Vollständig ehrenamtlich organisiert, EINTRITT FREI.', genre:'Indie / Alternativ / Punk / Elektro / Hip-Hop', ticket:'https://kontakt-bamberg.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Bamberg Hbf, dann Bus/Rad', parking:'Begrenzt – ÖPNV empfohlen'},
  {cat:'afterwork', name:'SOUL ROOFTOP – Rooftop Closing', loc:'Nürnberg – Adina Hotel Rooftop', start:'2026-08-29', end:'2026-08-29', free:false, desc:'Die abschließende Rooftop-Session der Saison 2026 mit dem Studio Wolny auf dem Adina Hotel Nürnberg. House, Disco, Funk – 17:00 bis 22:00 Uhr. Der Eintritt in den Club Stereo ab 23:00 Uhr ist im Ticketpreis enthalten. Limitiert auf 120 Personen.', genre:'House / Disco / Funk', ticket:'https://tickets.infield.live/event/soul-rooftop-rooftop-closing-9o1zql', outdoor:true, ageMin:18, price:'VVK', oepnv:'U2/U3 Hauptbahnhof, 5 min Fußweg', parking:'Tiefgarage in der Nähe'},
  {cat:'festival', name:'Kulturinsel Wöhrmühle Erlangen', loc:'Erlangen – Wöhrmühlinsel', start:'2026-07-16', end:'2026-07-26', free:false, desc:'11-tägiges Open-Air-Festival auf der Wöhrmühlinsel in Erlangen direkt an der Regnitz. Vielfältiges Programm mit Haindling, Von Wegen Lisbeth, The Wombats, Labrassbanda und mehr. Organisiert vom E-Werk Erlangen.', genre:'Pop / Rock / Folk / Alternative', ticket:'https://www.e-werk.de/programm/kulturinsel-woehrmuehle/', outdoor:true, ageMin:0, price:'ab ca. 20 € pro Abend', oepnv:'Bahn nach Erlangen, dann Fahrrad/Fußweg', parking:'Begrenzt – ÖPNV empfohlen'},
  {cat:'festival', name:'Lieder am See – Konzert am Brombachsee', loc:'Spalt – Enderndorf am Brombachsee', start:'2026-07-18', end:'2026-07-18', free:false, desc:'Open-Air-Konzertabend am Segelhafen Enderndorf mit internationalen Rock/Hardrock-Größen: The Wailers, Uriah Heep, Magnum, The Stranglers und Ten Years After. Einmaliges Konzerterlebnis direkt am Großen Brombachsee.', genre:'Rock / Hardrock / Classic Rock', ticket:'https://www.liederamsee.com', outdoor:true, ageMin:0, price:'ab ca. 35 €', oepnv:'Kein direkter ÖPNV – Fahrgemeinschaft', parking:'Vorhanden am Segelhafen'},
  {cat:'festival', name:'Hafensommer-Festival Würzburg', loc:'Würzburg – Alter Hafen', start:'2026-07-24', end:'2026-08-09', free:false, desc:'Mehrwöchiges Open-Air-Festival im Alten Hafen Würzburg. Weltmusik, Rock, Pop, Indie und Experimental mit Gogol Bordello, Matti Klein Soul Trio meets Max Mutzke, Afrob & Ferris MC, Sona Jobarteh, Lena & Linus und mehr.', genre:'Rock / Pop / Indie / Weltmusik', ticket:'https://hafensommer-wuerzburg.de', outdoor:true, ageMin:0, price:'ab ca. 20 € pro Abend', oepnv:'Bahn nach Würzburg Hbf, dann Tram/Fahrrad', parking:'Vorhanden am Alten Hafen'},
  {cat:'festival', name:'Pyraser Classic Rock Night', loc:'Thalmässing – Pyraser Landbrauerei', start:'2026-07-25', end:'2026-07-25', free:false, desc:'Klassische Rocknacht auf dem Gelände der Pyraser Landbrauerei in Thalmässing (Kreis Roth). Hochkarätiges Line-up: Rose Tattoo, Dirkschneider, Axxis und Dynazty. Bier, Rock und bayerisches Flair.', genre:'Classic Rock / Hardrock / Heavy Metal', ticket:'https://www.pyraser-classic-rock.com', outdoor:true, ageMin:0, price:'TBC', oepnv:'Kein direkter ÖPNV – Fahrgemeinschaft', parking:'Vorhanden am Brauereigelände'},
  {cat:'festival', name:'Rösler Open Air – Schloss Eyrichshof', loc:'Ebern – Schloss Eyrichshof', start:'2026-07-30', end:'2026-08-04', free:false, desc:'Mehrtägiges Open-Air-Festival auf dem romantischen Schloss Eyrichshof bei Ebern in Oberfranken. Acts: Nena, In Extremo, Schmidbauer & Kälberer, Nino de Angelo und weitere. Musik unter Sternenhimmel im Schlosspark.', genre:'Pop / Rock / Deutschrock / Folk', ticket:'https://ticketshop-infranken.reservix.de/tickets-roesler-open-air-schloss-eyrichshof/t9993', outdoor:true, ageMin:0, price:'TBC', oepnv:'Kein direkter ÖPNV – Fahrgemeinschaft / Shuttle', parking:'Vorhanden am Gelände'},
  {cat:'festival', name:'Schloss-Festival Höchstadt', loc:'Höchstadt an der Aisch – Schlossberg', start:'2026-08-07', end:'2026-08-08', free:false, desc:'Mittelalter-, Folk- und Pirate-Festival auf dem Schlossberg Höchstadt an der Aisch. 2-tägiges Event mit Saltatio Mortis, Mr. Hurley & Die Pulveraffen, Tanzwut, Mythemia u.v.m. Mittelaltermarkt, Händler und Lagerleben.', genre:'Mittelalter / Folk / Pirate / Rock', ticket:'https://www.schlosshof-festival.de', outdoor:true, ageMin:0, price:'TBC', oepnv:'Bahn nach Höchstadt a.d. Aisch', parking:'Vorhanden am Schlossberg'},
  {cat:'festival', name:'Weinturm Open Air Bad Windsheim', loc:'Bad Windsheim – Weinturm-Plateau', start:'2026-08-07', end:'2026-08-09', free:false, desc:'Dreitägiges Open-Air auf dem Weinturm-Plateau in Bad Windsheim. Vielfältiges Programm mit Ferge X Fisherman, Hot 8 Brass Band, Simon & Jan, Deviltrain u.v.m. Entspannte Festivalatmosphäre in Frankens Kurstadt.', genre:'Pop / Indie / Alternative / Brass', ticket:'https://www.weinturm-open-air.de', outdoor:true, ageMin:0, price:'TBC', oepnv:'Bahn nach Bad Windsheim', parking:'Vorhanden in der Nähe'},
  {cat:'festival', name:'Bayreuther Seebühnenfestival', loc:'Bayreuth – Wilhelminenaue', start:'2026-08-07', end:'2026-08-16', free:false, desc:'10-tägiges Festival auf der Freilichtbühne am See in der Wilhelminenaue Bayreuth. Acts: Sportfreunde Stiller, Max Herre & Joy Denalane, Melissa Naschenweng, Heißmann & Rassau und mehr. Tolle Kulisse direkt am Wasser.', genre:'Pop / Rock / Comedy / Schlager', ticket:'https://www.motion-kommunikation.de/seebuehne/', outdoor:true, ageMin:0, price:'ab ca. 25 €', oepnv:'Bahn nach Bayreuth Hbf, dann Bus', parking:'Vorhanden an der Wilhelminenaue'},
  {cat:'festival', name:'Festival Mediaval', loc:'Selb – Goldberg', start:'2026-09-11', end:'2026-09-13', free:false, desc:'Das Festival Mediaval auf dem Goldberg in Selb – Mittelalter, Folk, Metal und Gothic über 3 Tage. Acts: In Extremo, Faun, Corvus Corax, Subway To Sally, Steve\'N\'Seagulls u.v.m. Händlermarkt, Lagerfeueratmosphäre und Darsteller.', genre:'Mittelalter / Folk / Metal / Gothic', ticket:'https://festival-mediaval.com', outdoor:true, ageMin:0, price:'TBC', oepnv:'Bahn nach Selb', parking:'Vorhanden am Gelände'},
  {cat:'afterwork', name:'Sundowner – XMAS Edition', loc:'Nürnberg – Bootshaus Dutzendteich', start:'2026-12-19', end:'2026-12-19', free:false, desc:'Die Wintersession der beliebten Sundowner-Reihe im Bootshaus Nürnberg – diesmal als festliche XMAS Edition! Von 17 bis 23 Uhr Christmas-Vibes, Club-Sounds und Glühwein-Atmosphäre direkt am Dutzendteich.', genre:'House / Lounge / Christmas Vibes', ticket:'https://sundowner.ticket.io', outdoor:false, ageMin:18, price:'VVK', oepnv:'Bus/Tram zum Dutzendteich', parking:'Vorhanden am Bootshaus'},

  // ─── 🍷 NEUE WEINFESTE & 🎡 VOLKSFESTE 2026 (Update KW19) ──
  {cat:'weinfest', name:'10. Erlanger Weinfest', loc:'Erlangen – Schlossplatz', start:'2026-05-13', end:'2026-05-17', free:true, desc:'10. Erlanger Weinfest auf dem Schlossplatz – Jubiläumsausgabe. Eröffnung am 13. Mai 18:30 Uhr durch Oberbürgermeister Jörg Volleth und die 68. Fränkische Weinkönigin Angelina Seiler. Weine renommierter fränkischer Weingüter mit passenden Speisen und täglicher Live-Musik.', genre:'Weinfest / Frankenwein / Jubiläum', ticket:'https://weinfest-erlangen.de', new:true, outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Erlangen Hbf, 5 min Fußweg', parking:'Innenstadt Erlangen'},
  {cat:'weinfest', name:'Schwabacher Weinfest', loc:'Schwabach – Martin-Luther-Platz', start:'2026-06-03', end:'2026-06-07', free:true, desc:'Schwabacher Weinfest auf dem Martin-Luther-Platz in der Innenstadt – fränkische Weine und gemütliche Sommerstimmung mitten in der Goldschlägerstadt.', genre:'Weinfest / Regional', ticket:'https://weinfest-schwabach.de', new:true, outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S1 bis Schwabach', parking:'Innenstadt Parkhäuser'},
  {cat:'weinfest', name:'12. Nürnberger Weinfest', loc:'Nürnberg – Jakobsplatz', start:'2026-07-09', end:'2026-07-19', free:true, desc:'12. Nürnberger Weinfest auf dem Jakobsplatz – 12 Tage genussvolle Mischung aus fränkischen Weinen, abwechslungsreicher Gastronomie und stimmungsvoller Live-Musik von der Weinfestbühne. Eintritt frei!', genre:'Weinfest / Frankenwein / Live-Musik', ticket:'https://nuernberg-weinfest.de', new:true, outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1 Weißer Turm', parking:'Altstadt Parkhäuser'},
  {cat:'weinfest', name:'3. Festa Italica Erlangen', loc:'Erlangen – Schlossplatz', start:'2026-06-12', end:'2026-06-15', free:true, desc:'3. Festa Italica auf dem Schlossplatz Erlangen – 4 Tage italienische Genusskultur. Mediterrane Piazza rund ums Markgrafendenkmal mit über zwei Dutzend italienischen Weinen, Pasta al dente, knuspriger Pizza und Dolci. Live-Musik mit italienischen Pop-Hits und Klassikern – Mitsingen ausdrücklich erwünscht.', genre:'Weinfest / Italienische Genusskultur', ticket:'https://festa-italica.de/erlangen/', new:true, outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Erlangen Hbf, 5 min Fußweg', parking:'Innenstadt Erlangen'},
  {cat:'volksfest', name:'175. Brucker Volksfest (Frühlingsfest)', loc:'Fürstenfeldbruck – Volksfestplatz', start:'2026-04-24', end:'2026-05-03', free:true, desc:'175. Brucker Volksfest auf dem Volksfestplatz Fürstenfeldbruck – 10 Tage Festsaisonauftakt, Bierzelte, Fahrgeschäfte, Tradition und Gemeinschaft.', genre:'Volksfest / Frühlingsfest', ticket:'https://www.fuerstenfeldbruck.de', new:true, outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'S4 bis Fürstenfeldbruck', parking:'Volksfestplatz FFB'},
  {cat:'volksfest', name:'Spalter Volksfest („O\'zapft is")', loc:'Spalt', start:'2026-05-13', end:'2026-05-17', free:true, desc:'Spalter Volksfest in der Hopfen- und Bierstadt Spalt – Mi 13. bis So 17. Mai 2026. Festlich geschmücktes Festzelt mit großem Barbereich, Live-Musik und attraktiven Fahrgeschäften.', genre:'Volksfest / Bier', ticket:'https://spalt-tourismus.de', new:true, outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bus ab Roth', parking:'Vor Ort'},
  {cat:'volksfest', name:'Spalter Wirtshauskirchweih', loc:'Spalt – Innenstadt', start:'2026-10-16', end:'2026-10-19', free:true, desc:'Traditionelle Spalter Wirtshauskirchweih in der Hopfen- und Bierstadt – 4 Tage Genuss, Kultur & Musik in den Spalter Wirtshäusern.', genre:'Kirchweih / Bier / Kultur', ticket:'https://spalt-tourismus.de', new:true, outdoor:false, ageMin:0, price:'Eintritt frei', oepnv:'Bus ab Roth', parking:'Vor Ort'},

  // ── KW 20 2026 Update ──
  {cat:'festival', name:'Thai Food Festival Georgensgmünd', loc:'Am Bruckespan, Georgensgmünd', start:'2026-07-18', end:'2026-07-19', free:true, desc:'Thai Food Festival am Gelände Am Bruckespan in Georgensgmünd – authentische Thai-Küche, Thai Street Food und kulturelle Darbietungen. Kulinarisches Wochenendfestival im Landkreis Roth, ca. 30 km südlich von Nürnberg.', genre:'Food Festival / Thai Kultur', ticket:'', outdoor:true, ageMin:0, price:'Eintritt voraussichtlich frei', oepnv:'S-Bahn S1 bis Roth, dann Bus Richtung Georgensgmünd', parking:'Vor Ort am Gelände'},

  // Fehlende Nürnberger Kärwa
  {cat:'volksfest', name:'Kleinreuth b. Schweinau Kirchweih', loc:'Nürnberg-Kleinreuth', start:'2026-07-03', end:'2026-07-06', free:true, desc:'Traditionelle Stadtteil-Kärwa in Kleinreuth bei Schweinau.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg Hbf', parking:'Straße'},

  // ── KW 21 2026 Update ──
  // Neue Kärwas Nürnberger Land (Quelle: n-land.de/kirchweihen-feste)
  {cat:'volksfest', name:'Kirchweih Ottensoos', loc:'Ottensoos', start:'2026-06-18', end:'2026-06-22', free:true, desc:'Traditionelle Kirchweih in Ottensoos im Nürnberger Land (ca. 40 km von Nürnberg). Do. bis Mo. – Festbetrieb im Dorf mit Musik, Tanz und fränkischen Schmankerln.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S3 nach Lauf a.d. Pegnitz, dann Bus', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Behringersdorf', loc:'Behringersdorf', start:'2026-06-19', end:'2026-06-22', free:true, desc:'Traditionelle Kirchweih in Behringersdorf (Gemeinde Schwaig bei Nürnberg) – Fr. bis Mo. Stimmungsvolle Kärwa im Nürnberger Land.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S2 bis Schwaig bei Nürnberg', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Schwarzenbruck', loc:'Schwarzenbruck', start:'2026-07-03', end:'2026-07-06', free:true, desc:'Traditionsreiche Kirchweih in Schwarzenbruck im Nürnberger Land – Fr. bis Mo. Festzelt, Blasmusik und fränkische Schmankerl. Eintritt frei.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg oder Feucht', parking:'Vor Ort'},
  // Altstadtfest Hersbruck
  {cat:'volksfest', name:'Altstadtfest Hersbruck', loc:'Hersbruck – Altstadt', start:'2026-07-31', end:'2026-08-02', free:true, desc:'Das Altstadtfest in der historischen Altstadt von Hersbruck – 3 Tage Musik, Kulinarik und gute Stimmung im Nürnberger Land. Fr. bis So., Eintritt frei.', genre:'Stadtfest / Volksfest', ticket:'https://www.hersbruck.de/', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S3 nach Hersbruck', parking:'Innenstadt Hersbruck'},
  // Neue Weinfeste
  {cat:'weinfest', name:'Würzburger Weinparade', loc:'Würzburg – Marktplatz', start:'2026-08-27', end:'2026-09-06', free:true, desc:'Die Würzburger Weinparade auf dem Unteren Marktplatz – 11 Tage mit über 100 Weinen und Sekten im offenen Ausschank. Gastronomisches Spitzenangebot, das sonst kein Weinfest bietet. Tägl. So–Do 11–23 Uhr, Fr–Sa 11–23:30 Uhr. Eintritt frei!', genre:'Weinfest / Frankenwein', ticket:'https://www.weinparade.de/', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Straßenbahn direkt am Marktplatz Würzburg', parking:'Innenstadt Parkhäuser Würzburg'},
  // Neue Russian Events
  {cat:'russian', name:'Ilya Akselrod – Stand-up Nürnberg', loc:'Orpheum Nürnberg', start:'2026-11-29', end:'2026-11-29', free:false, desc:'Ilya Akselrod auf Deutschlandtour mit neuem Stand-up-Programm. Humor, lebhafte Geschichten und einzigartige Energy – ein Abend, den man nicht verpassen sollte. 20:00 Uhr, Orpheum Nürnberg.', genre:'Russian Stand-up / Comedy', ticket:'https://nuernberg24.ru/en/event/9436', outdoor:false, ageMin:16, price:'Tickets via nuernberg24.ru', oepnv:'U1 Hauptbahnhof oder Tram 4', parking:'Parkhaus Hauptbahnhof'},

  // ─── 🎉 AFTER WORK PARTY – SUMMER EDITION 2026 @ PARKS NÜRNBERG ──
  {cat:'afterwork', name:'After Work Party – Summer Edition #1 (Season Opening)', loc:'PARKS Nürnberg (Stadtpark, Berliner Platz 9)', start:'2026-05-07', end:'2026-05-08', free:false, desc:'Saison-Opening der After Work Party Summer Edition im PARKS Nürnberg. House Musik mit DJ Werner & Marc Vuelta & Friends im Sommergarten. Donnerstag-Abend im Stadtpark. 18:00–01:00 Uhr.', genre:'House / After Work / Sommergarten', ticket:'https://www.parks-nuernberg.de/ticketshop/', new:true, outdoor:true, ageMin:18, price:'5€', oepnv:'U2/U3 Rathenauplatz · Bus zum Stadtpark', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'After Work Party – Summer Edition #2', loc:'PARKS Nürnberg (Stadtpark, Berliner Platz 9)', start:'2026-05-21', end:'2026-05-22', free:false, desc:'After Work Party Summer Edition im PARKS Nürnberg. House Musik mit DJ Werner im Sommergarten. Donnerstag (Vorabend Christi Himmelfahrt), 18:00–01:00 Uhr.', genre:'House / After Work / Sommergarten', ticket:'https://www.parks-nuernberg.de/events/after-work-party-summer-edition-2/', new:true, outdoor:true, ageMin:18, price:'5€', oepnv:'U2/U3 Rathenauplatz · Bus zum Stadtpark', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'After Work Party – Summer FESTIVAL Edition', loc:'PARKS Nürnberg (Stadtpark, Berliner Platz 9)', start:'2026-06-04', end:'2026-06-05', free:false, desc:'Festival Edition! Bereits ab 14:00 Uhr Programm, ab 18:00 Uhr Party-Bühne. House Musik mit DJ Werner, Marc Alexander Wirtz & Friends, dazu Streetbunny Crew x DJ Wombat Filistine. Bis 01:00 Uhr im PARKS Stadtpark.', genre:'House / Festival / Open Air', ticket:'https://www.parks-nuernberg.de/events/after-work-party-festival-edition/', new:true, outdoor:true, ageMin:18, price:'5€', oepnv:'U2/U3 Rathenauplatz · Bus zum Stadtpark', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'After Work Party – Summer Edition #4', loc:'PARKS Nürnberg (Stadtpark, Berliner Platz 9)', start:'2026-06-18', end:'2026-06-19', free:false, desc:'After Work Party Summer Edition im PARKS Nürnberg. House Musik mit DJ Werner im Sommergarten. 18:00–01:00 Uhr.', genre:'House / After Work / Sommergarten', ticket:'https://www.parks-nuernberg.de/events/after-work-party-summer-edition-3/', new:true, outdoor:true, ageMin:18, price:'5€', oepnv:'U2/U3 Rathenauplatz · Bus zum Stadtpark', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'After Work Party – Summer Edition #5', loc:'PARKS Nürnberg (Stadtpark, Berliner Platz 9)', start:'2026-07-09', end:'2026-07-10', free:false, desc:'After Work Party Summer Edition im PARKS Nürnberg. House Musik mit DJ Werner im Sommergarten. 18:00–01:00 Uhr.', genre:'House / After Work / Sommergarten', ticket:'https://www.parks-nuernberg.de/events/after-work-party-summer-edition-4/', new:true, outdoor:true, ageMin:18, price:'5€', oepnv:'U2/U3 Rathenauplatz · Bus zum Stadtpark', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'After Work Party – Summer Edition #6', loc:'PARKS Nürnberg (Stadtpark, Berliner Platz 9)', start:'2026-07-30', end:'2026-07-31', free:false, desc:'After Work Party Summer Edition im PARKS Nürnberg. House Musik mit DJ Werner im Sommergarten. 18:00–01:00 Uhr.', genre:'House / After Work / Sommergarten', ticket:'https://www.parks-nuernberg.de/events/after-work-party-summer-edition-5/', new:true, outdoor:true, ageMin:18, price:'5€', oepnv:'U2/U3 Rathenauplatz · Bus zum Stadtpark', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'After Work Party – Summer Edition SPECIAL', loc:'PARKS Nürnberg (Stadtpark, Berliner Platz 9)', start:'2026-08-13', end:'2026-08-14', free:false, desc:'After Work Party SPECIAL im PARKS Nürnberg. House Musik mit DJ Werner im Sommergarten. Vorabend Mariä Himmelfahrt – verlängertes Wochenende! 18:00–01:00 Uhr.', genre:'House / After Work / Sommergarten', ticket:'https://www.parks-nuernberg.de/events/after-work-party-summer-edition-special/', new:true, outdoor:true, ageMin:18, price:'5€', oepnv:'U2/U3 Rathenauplatz · Bus zum Stadtpark', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'After Work Party – Summer Edition #8', loc:'PARKS Nürnberg (Stadtpark, Berliner Platz 9)', start:'2026-08-27', end:'2026-08-28', free:false, desc:'After Work Party Summer Edition im PARKS Nürnberg. House Musik mit DJ Werner im Sommergarten. 18:00–01:00 Uhr.', genre:'House / After Work / Sommergarten', ticket:'https://www.parks-nuernberg.de/events/after-work-party-summer-edition-6/', new:true, outdoor:true, ageMin:18, price:'5€', oepnv:'U2/U3 Rathenauplatz · Bus zum Stadtpark', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'After Work Party – Summer Edition #9', loc:'PARKS Nürnberg (Stadtpark, Berliner Platz 9)', start:'2026-09-10', end:'2026-09-11', free:false, desc:'After Work Party Summer Edition im PARKS Nürnberg. House Musik mit DJ Werner im Sommergarten. 18:00–01:00 Uhr.', genre:'House / After Work / Sommergarten', ticket:'https://www.parks-nuernberg.de/events/after-work-party-summer-edition-7/', new:true, outdoor:true, ageMin:18, price:'5€', oepnv:'U2/U3 Rathenauplatz · Bus zum Stadtpark', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'After Work Party – Summer Edition #10 (Saison-Finale)', loc:'PARKS Nürnberg (Stadtpark, Berliner Platz 9)', start:'2026-09-24', end:'2026-09-25', free:false, desc:'Saison-Finale der After Work Party Summer Edition im PARKS Nürnberg. House Musik mit DJ Werner im Sommergarten. 18:00–01:00 Uhr.', genre:'House / After Work / Sommergarten', ticket:'https://www.parks-nuernberg.de/events/after-work-party-summer-edition-8/', new:true, outdoor:true, ageMin:18, price:'5€', oepnv:'U2/U3 Rathenauplatz · Bus zum Stadtpark', parking:'Parkhäuser Innenstadt'},

  {cat:'afterwork', name:'Schichtwechsel – After Work im Innenhof', loc:'Nürnberg – Leonardo Royal Hotel (Innenhof)', start:'2026-05-21', end:'2026-05-21', free:true, desc:'Schichtwechsel – der Geheimtipp für den entspannten Sommerabend im schicken Innenhof des Leonardo Royal Hotels. Drinks, leckeres Essen, DJ, Lillet Spritz Lounge und Happy Hour 16:00–18:00 Uhr (jeder 2. Lillet Spritz gratis). 16:00–21:00 Uhr.', genre:'After Work / Lounge / Sommergarten', ticket:'', outdoor:true, ageMin:18, price:'Kostenlos (Verzehr)', oepnv:'U1/U2/U3 Hauptbahnhof, 5 min Fußweg', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'Schichtwechsel – After Work im Innenhof', loc:'Nürnberg – Leonardo Royal Hotel (Innenhof)', start:'2026-06-25', end:'2026-06-25', free:true, desc:'Schichtwechsel – der Geheimtipp für den entspannten Sommerabend im schicken Innenhof des Leonardo Royal Hotels. Drinks, leckeres Essen, DJ, Lillet Spritz Lounge und Happy Hour 16:00–18:00 Uhr (jeder 2. Lillet Spritz gratis). 16:00–21:00 Uhr.', genre:'After Work / Lounge / Sommergarten', ticket:'', outdoor:true, ageMin:18, price:'Kostenlos (Verzehr)', oepnv:'U1/U2/U3 Hauptbahnhof, 5 min Fußweg', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'Schichtwechsel – After Work im Innenhof', loc:'Nürnberg – Leonardo Royal Hotel (Innenhof)', start:'2026-07-30', end:'2026-07-30', free:true, desc:'Schichtwechsel – der Geheimtipp für den entspannten Sommerabend im schicken Innenhof des Leonardo Royal Hotels. Drinks, leckeres Essen, DJ, Lillet Spritz Lounge und Happy Hour 16:00–18:00 Uhr (jeder 2. Lillet Spritz gratis). 16:00–21:00 Uhr.', genre:'After Work / Lounge / Sommergarten', ticket:'', outdoor:true, ageMin:18, price:'Kostenlos (Verzehr)', oepnv:'U1/U2/U3 Hauptbahnhof, 5 min Fußweg', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'Schichtwechsel – After Work im Innenhof', loc:'Nürnberg – Leonardo Royal Hotel (Innenhof)', start:'2026-08-27', end:'2026-08-27', free:true, desc:'Schichtwechsel – der Geheimtipp für den entspannten Sommerabend im schicken Innenhof des Leonardo Royal Hotels. Drinks, leckeres Essen, DJ, Lillet Spritz Lounge und Happy Hour 16:00–18:00 Uhr (jeder 2. Lillet Spritz gratis). 16:00–21:00 Uhr.', genre:'After Work / Lounge / Sommergarten', ticket:'', outdoor:true, ageMin:18, price:'Kostenlos (Verzehr)', oepnv:'U1/U2/U3 Hauptbahnhof, 5 min Fußweg', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'Schichtwechsel – After Work im Innenhof', loc:'Nürnberg – Leonardo Royal Hotel (Innenhof)', start:'2026-09-24', end:'2026-09-24', free:true, desc:'Schichtwechsel – der Geheimtipp für den entspannten Sommerabend im schicken Innenhof des Leonardo Royal Hotels. Drinks, leckeres Essen, DJ, Lillet Spritz Lounge und Happy Hour 16:00–18:00 Uhr (jeder 2. Lillet Spritz gratis). 16:00–21:00 Uhr.', genre:'After Work / Lounge / Sommergarten', ticket:'', outdoor:true, ageMin:18, price:'Kostenlos (Verzehr)', oepnv:'U1/U2/U3 Hauptbahnhof, 5 min Fußweg', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'AïR Rooftop Opening – Afro House & House', loc:'Nürnberg – AïR Rooftop (Welserstraße 88)', start:'2026-06-04', end:'2026-06-04', free:false, desc:'AïR Rooftop Opening auf dem Dach in der Welserstraße 88, Nürnberg. Kuratiertes House & Afro House Line-up, Signature Drinks und Sundowner über den Dächern Nürnbergs. Limitierte Tickets. 15:00–22:00 Uhr. Early Bird 12 €, Regular 14 €, Late Phase 16 €, VIP Lounge 179 € (4 Tickets + 100 € Freiverzehr).', genre:'Afro House / House / Rooftop', ticket:'https://air-venue.de/tickets.html', outdoor:true, ageMin:18, price:'ab 12 €', oepnv:'U3 Maxfeld oder Bus Richtung Welserstraße', parking:'Parkhäuser Nordstadt'},
  {cat:'festival', name:'20. Jubiläums-Sommernachtsball', loc:'Fürth – Stadtpark', start:'2026-07-18', end:'2026-07-18', free:false, desc:'Bayerns größter Open Air Ball feiert sein 20. Jubiläum im Stadtpark Fürth – „Jubiläum unterm Sternenhimmel". Balleröffnung 19:00 Uhr mit dem Bayerischen Ministerpräsidenten Dr. Markus Söder und Oberbürgermeister Dr. Thomas Jung.', genre:'Ball / Open Air / Klassik', ticket:'https://www.sommernachtsball.de', outdoor:true, ageMin:0, price:'Tickets siehe sommernachtsball.de', oepnv:'S-Bahn / U-Bahn nach Fürth, dann Bus zum Stadtpark', parking:'Parkhäuser Fürth Innenstadt'},
  // Landkreis Fürth – Kärwas aus Fürth Aktuell Kalender 2026
  {cat:'volksfest', name:'Kirchweih Veitsbronn Siegelsdorf', loc:'Veitsbronn', start:'2026-05-01', end:'2026-05-03', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Zirndorf', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Zirndorf Lind', loc:'Zirndorf', start:'2026-05-13', end:'2026-05-14', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Zirndorf', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Tuchenbach', loc:'Tuchenbach', start:'2026-05-14', end:'2026-05-17', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Zirndorf', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Großhabersdorf Unterschlauersbach', loc:'Großhabersdorf', start:'2026-05-15', end:'2026-05-18', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Zirndorf', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Cadolzburg (Hauptort)', loc:'Cadolzburg', start:'2026-06-05', end:'2026-06-08', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Cadolzburg', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Cadolzburg Steinbach', loc:'Cadolzburg', start:'2026-06-12', end:'2026-06-15', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Cadolzburg', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Cadolzburg Egersdorf', loc:'Cadolzburg', start:'2026-06-19', end:'2026-06-22', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Cadolzburg', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Langenzenn Kirchfembach', loc:'Langenzenn (ca. 25 km)', start:'2026-06-26', end:'2026-06-29', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Cadolzburg, dann Bus', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Stein Bertelsdorf & Eckershof', loc:'Stein', start:'2026-06-27', end:'2026-06-28', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Stein', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Cadolzburg Egersdorf (2. Termin)', loc:'Cadolzburg', start:'2026-07-02', end:'2026-07-04', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Cadolzburg', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Obermichelbach', loc:'Obermichelbach', start:'2026-07-03', end:'2026-07-06', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Zirndorf', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Ammerndorf', loc:'Ammerndorf', start:'2026-07-03', end:'2026-07-06', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Zirndorf', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Langenzenn Heinersdorf', loc:'Langenzenn (ca. 25 km)', start:'2026-07-03', end:'2026-07-05', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Langenzenn', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Veitsbronn Retzelfembach', loc:'Veitsbronn', start:'2026-07-10', end:'2026-07-13', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Zirndorf', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Cadolzburg Roßendorf', loc:'Cadolzburg', start:'2026-07-10', end:'2026-07-13', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Cadolzburg', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Zirndorf Wintersdorf', loc:'Zirndorf', start:'2026-07-10', end:'2026-07-13', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Zirndorf', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Cadolzburg Zautendorf', loc:'Cadolzburg', start:'2026-07-17', end:'2026-07-20', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Cadolzburg', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Cadolzburg Rütteldorf', loc:'Cadolzburg', start:'2026-07-31', end:'2026-08-03', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Cadolzburg', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Wilhermsdorf Meiersberg', loc:'Wilhermsdorf (ca. 35 km)', start:'2026-08-07', end:'2026-08-10', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Wilhermsdorf', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Zirndorf Weinzierlein', loc:'Zirndorf', start:'2026-08-07', end:'2026-08-10', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Zirndorf', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Langenzenn Burggrafenhof', loc:'Langenzenn (ca. 25 km)', start:'2026-08-07', end:'2026-08-10', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Langenzenn', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Großhabersdorf Vincenzenbronn', loc:'Großhabersdorf', start:'2026-08-07', end:'2026-08-09', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Zirndorf', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Veitsbronn', loc:'Veitsbronn', start:'2026-08-14', end:'2026-08-17', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Zirndorf', parking:'Vor Ort'},
  {cat:'volksfest', name:'Roßtaler Kirchweih', loc:'Roßtal', start:'2026-08-14', end:'2026-08-17', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Zirndorf, dann Bus', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Seckendorf', loc:'Seckendorf', start:'2026-08-21', end:'2026-08-24', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Zirndorf', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Stadt Stein', loc:'Stein', start:'2026-08-28', end:'2026-08-31', free:true, desc:'Kirchweih am Festplatz neben dem Palm Beach Stein.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Stein', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Wilhermsdorf Kirchfarrnbach', loc:'Wilhermsdorf (ca. 35 km)', start:'2026-08-28', end:'2026-08-31', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Wilhermsdorf', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Langenzenn Horbach', loc:'Langenzenn (ca. 25 km)', start:'2026-09-03', end:'2026-09-07', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Langenzenn', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Großhabersdorf', loc:'Großhabersdorf', start:'2026-09-11', end:'2026-09-14', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Zirndorf', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Puschendorf', loc:'Puschendorf', start:'2026-09-11', end:'2026-09-14', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Fürth Hbf', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Stein Deutenbach', loc:'Stein', start:'2026-09-18', end:'2026-09-21', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Stein', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Großhabersdorf Schwaighausen', loc:'Großhabersdorf', start:'2026-09-25', end:'2026-09-27', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Zirndorf', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Seukendorf', loc:'Seukendorf', start:'2026-09-25', end:'2026-09-28', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U3 bis Rothenburger Str., dann Bus', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Cadolzburg Deberndorf', loc:'Cadolzburg', start:'2026-10-09', end:'2026-10-12', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Cadolzburg', parking:'Vor Ort'},

  // Stadtfeste (Party-Pool)
  {cat:'stadtfest', name:'Altstadtfest Neumarkt i.d. OPf.', loc:'Neumarkt i.d. OPf. (ca. 45 km)', start:'2026-06-12', end:'2026-06-14', free:true, desc:'34. Neumarkter Altstadtfest – die gesamte Innenstadt wird zur Feiermeile. 65+ Bands auf 5 Bühnen, rund 100 Stände, Kulinarik und Vereine. Eintritt frei!', genre:'Stadtfest / Musik / Kultur', ticket:'https://neumarkt-altstadtfest.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Neumarkt i.d.OPf.', parking:'Innenstadt Parkhäuser'},
  {cat:'stadtfest', name:'Bürgerfest Gunzenhausen', loc:'Gunzenhausen – Marktplatz (ca. 50 km)', start:'2026-07-03', end:'2026-07-05', free:true, desc:'Open-Air-Stadtfest im Fränkischen Seenland direkt auf dem historischen Marktplatz. Live-Bands, Genussmeile und fränkische Gastlichkeit. Eintritt frei!', genre:'Stadtfest / Live-Musik', ticket:'https://www.dasbuergerfest.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Gunzenhausen', parking:'Innenstadt Gunzenhausen'},
  {cat:'stadtfest', name:'Hilpoltsteiner Burgfest', loc:'Hilpoltstein (ca. 35 km)', start:'2026-07-31', end:'2026-08-03', free:true, desc:'Historisches Spektakel im Landkreis Roth seit fast 100 Jahren. Höhepunkt: Sonntag mit prunkvollem Einzug der Pfalzgräfin im Gewand des 17. Jahrhunderts. Trödelmarkt, Sautrogrennen und Feuerwerk.', genre:'Historisches Stadtfest / Volksfest', ticket:'https://tourismus.hilpoltstein.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Hilpoltstein über Roth', parking:'Vorhanden am Festgelände'},
  {cat:'stadtfest', name:'Bürgerfest Schwabach', loc:'Schwabach – Königsplatz (ca. 18 km)', start:'2026-07-24', end:'2026-07-26', free:true, desc:'Die Goldschlägerstadt feiert auf dem Königsplatz und Martin-Luther-Platz mit Live-Bands, Kulinarik und Kultur. Verkaufsoffener Sonntag am 26. Juli.', genre:'Stadtfest / Live-Musik', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S1 bis Schwabach', parking:'Innenstadt Parkhäuser'},

  // Volksfeste außerhalb Nürnbergs (Family-Pool via FAMILY_ONLY_CATS)
  {cat:'volksfest', name:'Pfingstvolksfest Berching', loc:'Berching (ca. 65 km)', start:'2026-05-22', end:'2026-05-26', free:true, desc:'75-jähriges Jubiläum! Zünftiges Volksfest in der wunderschönen, mittelalterlich ummauerten Altstadt Berchings im Altmühltal. Festzelt, Fahrgeschäfte und fränkische Tradition.', genre:'Volksfest / Pfingsten / Jubiläum', ticket:'https://www.volksfest-berching.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Beilngries, dann Bus nach Berching', parking:'Vorhanden am Festplatz'},
  {cat:'volksfest', name:'Pfingstkirchweih Wilhermsdorf', loc:'Wilhermsdorf (ca. 35 km)', start:'2026-05-22', end:'2026-05-26', free:true, desc:'Eine der größten und längsten Marktplatz-Kirchweihen im Rangau. Festzelt am Bahnhof-Mitte mit Fahrgeschäften, Bieranstich und großem Feuerwerk am Dienstag 22:45 Uhr.', genre:'Kirchweih / Pfingsten', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Zirndorf, dann Bus nach Wilhermsdorf', parking:'Vorhanden am Festplatz'},
  {cat:'volksfest', name:'Langenzenner Kirchweih', loc:'Langenzenn (ca. 25 km)', start:'2026-05-29', end:'2026-06-02', free:true, desc:'Traditions-Kärwa acht Tage nach Pfingsten – zünftiges Brauchtum rund um den historischen Marktplatz. Fahrgeschäfte und Imbissbuden, wo sonst Verkehr pulsiert.', genre:'Kirchweih / Tradition', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Cadolzburg, dann Bus nach Langenzenn', parking:'Innenstadt Langenzenn'},
  {cat:'volksfest', name:'Bayreuther Volksfest', loc:'Bayreuth (ca. 85 km)', start:'2026-05-22', end:'2026-05-31', free:true, desc:'Größtes Volksfest Oberfrankens auf dem Volksfestplatz an der Äußeren Badstraße. Eröffnung mit großem Festumzug am Freitag 22. Mai um 17:30 Uhr durch die Innenstadt.', genre:'Volksfest / Franken', ticket:'https://www.bayreuth-tourismus.de', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn nach Bayreuth Hbf, Bus zum Volksfestplatz', parking:'Vorhanden am Volksfestplatz'},
  {cat:'volksfest', name:'Schweinfurter Volksfest', loc:'Schweinfurt (ca. 110 km)', start:'2026-06-05', end:'2026-06-14', free:true, desc:'Großes klassisches Volksfest mit weitläufigem Festplatz, modernen Fahrgeschäften, Festzelten und Comedy-Frühschoppen. Beginnt immer am Tag nach Fronleichnam.', genre:'Volksfest / Unterfranken', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn nach Schweinfurt Hbf', parking:'Vorhanden am Volksfestplatz'},
  {cat:'volksfest', name:'Neustädter Kirchweih', loc:'Neustadt a.d. Aisch (ca. 45 km)', start:'2026-06-06', end:'2026-06-14', free:true, desc:'Eine der traditionsreichsten, ältesten und größten Kirchweihen Westmittelfrankens (seit über 600 Jahren). 9 Tage Festbetrieb bei den Sommerkellerern.', genre:'Kirchweih / Tradition', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Neustadt a.d. Aisch', parking:'Vorhanden am Festplatz'},
  {cat:'volksfest', name:'Burgthanner Kärwa', loc:'Burgthann (ca. 25 km)', start:'2026-06-20', end:'2026-06-22', free:true, desc:'Gemütliche und stimmungsvolle Gemeinde-Kärwa im idyllischen Nürnberger Land mit starkem Dorfflair.', genre:'Kärwa / Tradition', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg Richtung Burgthann', parking:'Vorhanden im Ort'},
  {cat:'volksfest', name:'Peterlesboum-Kärwa', loc:'Nürnberg-Doos', start:'2026-06-19', end:'2026-06-23', free:true, desc:'Stadtteil-Kärwa im Nürnberger Osten zu Ehren des legendären Nürnberger Volksduos „Die Peterlesboum" – familiäre Kärwa-Atmosphäre mit fränkischem Brauchtum.', genre:'Kärwa / Tradition', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg Mitte', parking:'Straße'},
  {cat:'volksfest', name:'Gredinger Volksfest', loc:'Greding (ca. 60 km)', start:'2026-07-24', end:'2026-07-27', free:true, desc:'Gemütliches, bayerisch-fränkisches Volksfest im malerischen Altmühltal. Immer am 4. Wochenende im Juli mit Festzelt, Musik und Fahrgeschäften.', genre:'Volksfest / Altmühltal', ticket:'https://volksfest-greding.chayns.site', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn nach Greding', parking:'Vorhanden am Festplatz'},
  {cat:'volksfest', name:'Kulmbacher Bierwoche', loc:'Kulmbach (ca. 95 km)', start:'2026-07-25', end:'2026-08-02', free:true, desc:'75. Kulmbacher Bierwoche – 9 Tage reines Bierkultur-Festival im großen Feststadel auf dem EKU-Parkplatz. Ausschließlich das speziell eingebraute Festbier. Für Bierkenner ein Pflichttermin!', genre:'Bierfest / Bierkultur', ticket:'https://www.kulmbacher-bierwoche.de', outdoor:true, ageMin:0, price:'Eintritt frei, Verzehr kostenpflichtig', oepnv:'Bahn nach Kulmbach', parking:'Vorhanden am Festgelände'},
  {cat:'volksfest', name:'Neumarkter JURA-Volksfest', loc:'Neumarkt i.d. OPf. (ca. 45 km)', start:'2026-08-07', end:'2026-08-17', free:true, desc:'Riesiges Volksfest in der Oberpfalz mit über 300.000 Besuchern. Festzelten, Jura-Hallen, moderner Fahrgeschäfte und dem traditionellen Festzug am 9. August (14 Uhr). Maß Bier: 10,70 €.', genre:'Volksfest / Oberpfalz', ticket:'https://neumarkt-volksfest.de', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn nach Neumarkt i.d.OPf.', parking:'Vorhanden am Festplatz'},
  {cat:'volksfest', name:'Volksfest Beilngries', loc:'Beilngries (ca. 75 km)', start:'2026-09-04', end:'2026-09-13', free:true, desc:'Zünftiges Volksfest im Altmühltal mit bayerischem Charme. Traditioneller Volksfestzug am 6. September um 14 Uhr. 10 Tage Festbetrieb mit Fahrgeschäften und Festzelten.', genre:'Volksfest / Altmühltal', ticket:'https://www.beilngrieser-volksfest.de', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn nach Beilngries', parking:'Vorhanden am Festgelände'},
  {cat:'volksfest', name:'Gunzenhäuser Kirchweih', loc:'Gunzenhausen (ca. 50 km)', start:'2026-09-12', end:'2026-09-20', free:true, desc:'625-jährige Traditions-Kirchweih auf dem Schießwasen im Fränkischen Seenland. Höhepunkte: Kerwabaum-Aufstellen und großer Festzug am Montag. Eines der bedeutendsten Volksfeste Mittelfrankens.', genre:'Kirchweih / Volksfest / Tradition', ticket:'https://www.gunzenhausen.info/kirchweih', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Gunzenhausen', parking:'Vorhanden am Schießwasen'},

  // ── KW 22 2026 Update ──
  {cat:'festival', name:'25. Fürther New Orleans Festival', loc:'Fürth – Fürther Freiheit', start:'2026-05-23', end:'2026-05-24', free:true, desc:'Das 25. Fürther New Orleans Festival auf der Fürther Freiheit – ein Open-Air-Muss! Sa. 23. Mai ab 12 Uhr mit der New Orleans Rhythm Brass Band, So. 24. Mai 12–22 Uhr. Dixie-Frühschoppen, Kinderprogramm, Jazz, Blues, Gospel und Soul. Eintritt frei!', genre:'Jazz / Blues / New Orleans / Gospel', ticket:'https://www.new-orleans-festival.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1 Fürth Hauptbahnhof, 5 min Fußweg', parking:'Innenstadt Fürth Parkhäuser'},
  {cat:'volksfest', name:'Nördlinger Mess\'', loc:'Nördlingen – Kaiserwiese (ca. 80 km)', start:'2026-06-06', end:'2026-06-15', free:true, desc:'Die „Nördlinger Mess\'" – das größte Volksfest Nordschwabens mit 600-jähriger Tradition auf der Kaiserwiese. Eröffnungsumzug am 6. Juni um 14 Uhr durch die historische Altstadt. 10 Tage Festbetrieb mit Fahrgeschäften, Bierzelten und Markttreiben. Nördlingen liegt ca. 80 km von Nürnberg entfernt.', genre:'Volksfest / Markt / Tradition', ticket:'https://www.noerdlingen.de/events-in-noerdlingen/37747_2026-06-06_noerdlinger-mess/event.html', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn nach Nördlingen (1,5h)', parking:'Vorhanden am Festgelände'},

  // ── KW 23 2026 Update ──
  {cat:'stadtfest', name:'Altstadtfest Ansbach', loc:'Ansbach – Altstadt', start:'2026-06-03', end:'2026-06-07', free:true, desc:'Mittelfrankens großes Stadtfest in Ansbachs historischer Altstadt: 18 Bühnen, über 100 Bands und DJs. Live-Musik aller Genres, Straßenkunst, Theater und fränkische Kulinarik. Verkaufsoffener Sonntag 1–18 Uhr. Eintritt frei!', genre:'Stadtfest / Musik / Straßenkunst', ticket:'https://www.ansbach.de/altstadtfest', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Ansbach Hbf, dann 5 min Fußweg', parking:'Parkhäuser Ansbach Innenstadt'},
  {cat:'festival', name:'Jahninselfest Regensburg', loc:'Regensburg – Jahninsel', start:'2026-06-05', end:'2026-06-06', free:false, desc:'DIY Open-Air-Festival auf der malerischen Jahninsel in Regensburg. Freitag 17–22 Uhr, Samstag 14:30–22 Uhr. Live-Musik in Rock, Pop, Jazz und Folk. Viele freiwillige Helfer, familiäre Atmosphäre direkt an der Donau.', genre:'Rock / Pop / Jazz / Folk', ticket:'https://tickets.jahninselfest.de', outdoor:true, ageMin:0, price:'Vorverkauf', oepnv:'Bahn nach Regensburg Hbf, dann Bus', parking:'Begrenzt – ÖPNV empfohlen'},
  {cat:'russian', name:'Dmitri Bykov – Poesieabend „Kein Wort über die Liebe"', loc:'Orpheum Nürnberg', start:'2026-06-23', end:'2026-06-23', free:false, desc:'Дмитрий Быков präsentiert in Deutschland das Programm «Kein Wort über die Liebe» – ein poetischer Abend mit neuen Gedichten, lebendigem Gespräch über Zeit, Mensch und Sinnsuche. 19:00 Uhr, Orpheum Nürnberg.', genre:'Russische Poesie / Literatur', ticket:'https://nuernberg24.ru/de/event/9583', outdoor:false, ageMin:14, price:'Tickets via nuernberg24.ru', oepnv:'U1 Hauptbahnhof oder Tram 4', parking:'Parkhaus Hauptbahnhof'},
  {cat:'festival', name:'28. SommerNachtFilmFestival Nürnberg', loc:'Nürnberg – Katharinenruine u.a.', start:'2026-08-04', end:'2026-08-29', free:false, desc:'Das größte Open-Air-Kino der Metropolregion Nürnberg! 26 Tage Freiluftkino an außergewöhnlichen Spielorten: Katharinenruine, Tiergarten, Marienbergpark, Tucherschloss u.v.m. Aktuelle Kinohighlights, Klassiker, Dokumentarfilme – mit Musik und Regisseursgesprächen.', genre:'Open-Air-Kino / Film / Kultur', ticket:'https://www.sommernachtfilmfestival.de', outdoor:true, ageMin:0, price:'Tickets je nach Film', oepnv:'U1/U2 Hauptbahnhof oder je nach Spielort', parking:'Je nach Spielort'},

  // ── Juni 2026 – neue Events (Inspiradu) ────────────────────────────────
  {cat:'festival', name:'Frequency Beats Festival', loc:'Pyrbaum', start:'2026-06-13', end:'2026-06-13', free:false, desc:'Neues elektronisches Musikfestival in Pyrbaum (ca. 30 km südlich von Nürnberg). DJ-Sets und Live-Acts.', genre:'Electronic / Festival', ticket:'https://www.instagram.com/frequency_beats_festival', outdoor:true, ageMin:16, price:'Infos via Instagram', oepnv:'PKW empfohlen', parking:'Vorhanden'},
  {cat:'afterwork', name:'Feierabend @Villibald', loc:'Nürnberg – Villibald', start:'2026-06-11', end:'2026-06-11', free:true, desc:'Entspannter Feierabend-Treff mit neuen Leuten im Villibald Nürnberg – Afterwork-Gathering der Nürnberger Community.', genre:'Community / Social / Afterwork', ticket:'https://www.instagram.com/inspiradu', outdoor:false, ageMin:18, price:'Kostenlos', oepnv:'U-Bahn Innenstadt', parking:'Innenstadt Parkhäuser'},
  {cat:'stadtfest', name:'Africa Festival Nürnberg', loc:'Nürnberg – Theodor-Heuss-Brücke', start:'2026-06-11', end:'2026-06-14', free:true, desc:'Multikulturelles Festival an der Pegnitz – afrikanische Kultur, Essen, Musik und Kunst. Eintritt frei!', genre:'Weltmusik / Kultur / Afrika', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn Hauptbahnhof, 10 min Fußweg', parking:'Innenstadt Parkhäuser'},
  {cat:'stadtfest', name:'Lammlichtspiele Erlangen', loc:'Erlangen – Innenstadt', start:'2026-06-04', end:'2026-06-13', free:false, desc:'Open-Air-Kino im Herzen Erlangens – 10 Tage Filmgenuss unter freiem Himmel.', genre:'Open-Air-Kino / Film', ticket:'https://www.lammlichtspiele.de', outdoor:true, ageMin:0, price:'Tickets ab ca. 9 Euro', oepnv:'Bahn bis Erlangen Hbf', parking:'Innenstadt Erlangen'},
  {cat:'stadtfest', name:'Salsa im Park', loc:'Fürth – Freilichtbühne', start:'2026-06-05', end:'2026-06-05', free:true, desc:'Salsa tanzen an der Freilichtbühne Fürth – für alle Levels, Open Air, Eintritt frei.', genre:'Salsa / Tanz / Outdoor', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U1 Fürth', parking:'Parkhäuser Fürth'},
  {cat:'stadtfest', name:'Strick, Sip & Schnack', loc:'Nürnberg – KBH', start:'2026-06-14', end:'2026-06-14', free:true, desc:'Community-Treff im KBH: Bring dein Projekt mit, connect dich mit anderen – Stricken, Plaudern, Socializen.', genre:'Community / Social / DIY', ticket:'https://www.instagram.com/inspiradu', outdoor:false, ageMin:18, price:'Kostenlos', oepnv:'U-Bahn Innenstadt', parking:'Innenstadt Parkhäuser'},
  {cat:'stadtfest', name:'Matcha Sip & Paint', loc:'Nürnberg – Sommerinsel Schütt', start:'2026-06-14', end:'2026-06-14', free:false, desc:'Kreatives Community-Event rund um Matcha auf der Sommerinsel Schütt – Malen, Genießen, neue Leute kennenlernen.', genre:'Community / Kreativ / Kultur', ticket:'https://www.instagram.com/inspiradu', outdoor:true, ageMin:18, price:'Infos via Instagram', oepnv:'U-Bahn Lorenzkirche', parking:'Innenstadt Parkhäuser'},
  {cat:'stadtfest', name:'Sunset Note by Soundcouture', loc:'Nürnberg – Kulturgarten', start:'2026-06-19', end:'2026-06-19', free:true, desc:'Daytime Party im Kulturgarten – Menschen verbinden durch Musik. Open-Air, community-orientiert.', genre:'Community / Daytime Party / Social', ticket:'https://www.instagram.com/inspiradu', outdoor:true, ageMin:18, price:'Kostenlos', oepnv:'Bus/Tram Innenstadt', parking:'Innenstadt Parkhäuser'},
  {cat:'stadtfest', name:'Fete de la Musique Nuernberg', loc:'Nürnberg – Villa Leon', start:'2026-06-21', end:'2026-06-21', free:true, desc:'Der Deutsch-Französische Club lädt ein: Musik und französisches Essen in der Villa Leon. Eintritt frei – Weltmusiktag!', genre:'Weltmusik / Frankreich / Kultur', ticket:'', outdoor:false, ageMin:0, price:'Kostenlos', oepnv:'Bus/Tram Innenstadt', parking:'Innenstadt Parkhäuser'},
  {cat:'flohmarkt', name:'Second Soul Maedchenflohmarkt', loc:'Nürnberg – My Event World', start:'2026-06-07', end:'2026-06-07', free:false, desc:'Flohmarkt für Frauen – Second-Hand Mode und Accessoires im My Event World Nürnberg.', genre:'Flohmarkt / Mode / Secondhand', ticket:'https://www.instagram.com/inspiradu', outdoor:false, ageMin:0, price:'Infos via Instagram', oepnv:'ÖPNV Nürnberg', parking:'Innenstadt Parkhäuser'},
  {cat:'flohmarkt', name:'Kostümverkauf Staatstheater Nürnberg', loc:'Nürnberg – Staatstheater', start:'2026-06-27', end:'2026-06-27', free:true, desc:'Das Staatstheater Nürnberg verkauft originale Bühnenkostüme – seltene Gelegenheit für Theaterliebhaber.', genre:'Flohmarkt / Theater / Kultur', ticket:'', outdoor:false, ageMin:0, price:'Kostenlos (Eintritt)', oepnv:'U-Bahn Lorenzkirche', parking:'Innenstadt Parkhäuser'},
  {cat:'stadtfest', name:'Street Art Festival Betonliebe', loc:'Nürnberg-Langwasser – Gemeinschaftshaus', start:'2026-06-27', end:'2026-06-27', free:true, desc:'Graffiti-Art und Street Art im Gemeinschaftshaus Langwasser – lebendige Kunstszene, Eintritt frei.', genre:'Street Art / Graffiti / Kultur', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U1 Langwasser', parking:'Parkplatz Langwasser'},

  // ── Juni 2026 – Nürnbergspots KW 23 ────────────────────────────────────
  {cat:'festival', name:'Anthrax', loc:'Nürnberg – Löwensaal', start:'2026-06-02', end:'2026-06-02', free:false, desc:'Anthrax live im Löwensaal Nürnberg. Thrash Metal Legende live auf Tour. 20 Uhr Einlass.', genre:'Thrash Metal / Rock', ticket:'https://www.loewensaal.de', outdoor:false, ageMin:16, price:'Tickets auf Webseite', oepnv:'U-Bahn Maxfeld/Nordostbahnhof', parking:'Parkhäuser in der Nähe'},
  {cat:'festival', name:'Acid King (US)', loc:'Nürnberg – Z-Bau', start:'2026-06-04', end:'2026-06-04', free:false, desc:'Acid King aus San Francisco live im Z-Bau Nürnberg – Sludge/Doom Metal mit psychedelischen Vibes. 20 Uhr.', genre:'Doom Metal / Sludge / Psychedelic', ticket:'https://z-bau.com', outdoor:false, ageMin:16, price:'Tickets auf z-bau.com', oepnv:'U1 bis Frankenstraße', parking:'Begrenzt'},
  {cat:'afterwork', name:'Daytime Rave – Die Rakete', loc:'Nürnberg – Die Rakete', start:'2026-06-04', end:'2026-06-05', free:false, desc:'Daytime Rave in der Rakete Nürnberg – Techno & Electronic ab 23 Uhr.', genre:'Techno / Electronic', ticket:'https://www.die-rakete.de', outdoor:false, ageMin:18, price:'Infos auf Webseite', oepnv:'U1 bis Frankenstraße', parking:'Begrenzt'},
  {cat:'afterwork', name:'Kinky RAW', loc:'Nürnberg – Z-Bau', start:'2026-06-06', end:'2026-06-07', free:false, desc:'Kinky RAW im Z-Bau Nürnberg – queere Party-Nacht mit elektronischer Musik. 22 Uhr.', genre:'Electronic / Queer Party', ticket:'https://z-bau.com', outdoor:false, ageMin:18, price:'Infos auf z-bau.com', oepnv:'U1 bis Frankenstraße', parking:'Begrenzt'},
  {cat:'afterwork', name:'Malefiz Block Party Vol.2', loc:'Nürnberg – Z-Bau', start:'2026-06-06', end:'2026-06-07', free:false, desc:'Malefiz Block Party Vol.2 im Z-Bau Nürnberg – urbane Sounds, Beats und Party-Feeling. 21 Uhr.', genre:'Hip Hop / Electronic / Block Party', ticket:'https://z-bau.com', outdoor:false, ageMin:18, price:'Infos auf z-bau.com', oepnv:'U1 bis Frankenstraße', parking:'Begrenzt'},
  {cat:'stadtfest', name:'Food Truck Festival Fürth', loc:'Fürth – Südstadtpark', start:'2026-06-03', end:'2026-06-07', free:true, desc:'5 Tage Food Truck Festival in Fürth – internationale Street-Food-Küche, Live-Musik und Biergarten-Stimmung im Südstadtpark. Eintritt frei!', genre:'Street Food / Festival / Outdoor', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos (Verzehr)', oepnv:'U1 Fürth Hauptbahnhof', parking:'Innenstadt Parkhäuser Fürth'},
  {cat:'volksfest', name:'Volksfest Freystadt', loc:'Freystadt', start:'2026-06-05', end:'2026-06-06', free:true, desc:'Traditionelles Volksfest im Nürnberger Land – Fahrgeschäfte, Musik und fränkische Schmankerl.', genre:'Volksfest / Kärwa', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg Richtung Freystadt', parking:'Vorhanden im Ort'},

  // ── Juni / August 2026 – KW 23 Neuzugänge ───────────────────────────────
  {cat:'afterwork', name:'Latino Sunset', loc:'Fürth – Grüner Baum', start:'2026-06-03', end:'2026-06-03', free:false, desc:'Das große Sommerfest im Ballsaal des Grüner Baum Fürth – Salsa, Bachata, Kizomba, Reggaeton, Hip Hop & R\'n\'B auf 3 Areas mit 3 DJs und 800 qm Partyzone. Doors: 19:30 Uhr.', genre:'Salsa / Bachata / Reggaeton / Hip Hop', ticket:'https://www.gruenerbaumfuerth.de', outdoor:false, ageMin:18, price:'10 €', oepnv:'U1 bis Fürth Hauptbahnhof', parking:'Innenstadt Parkhäuser Fürth'},
  {cat:'festival', name:'House am See 2026 – Lost in Paradise', loc:'Erlangen – Villa Kunterbums', start:'2026-06-04', end:'2026-06-04', free:false, desc:'Open-Air-Festival an der Villa Kunterbums in Erlangen – Lost in Paradise Edition. Ab 14:00 Uhr direkt am See.', genre:'House / Electronic / Open Air', ticket:'https://karlito.ticket.io', outdoor:true, ageMin:18, price:'Tickets auf karlito.ticket.io', oepnv:'Bahn bis Erlangen Hbf', parking:'Parkplätze vor Ort'},
  {cat:'festival', name:'Geheimkonzert Nürnberg #6 – Open Air Edition', loc:'Nürnberg – Z-Bau', start:'2026-08-15', end:'2026-08-15', free:false, desc:'Geheimkonzert by Rausgegangen – wer auf der Bühne steht, bleibt bis zum ersten Ton geheim. Open-Air-Edition im Z-Bau Nürnberg. 19:00–22:15 Uhr.', genre:'Indie / Rock / Deutschpop / Überraschung', ticket:'https://rausgegangen.de', outdoor:true, ageMin:0, price:'21,90 – 29,90 €', oepnv:'U1 bis Frankenstraße', parking:'Begrenzt'},
  {cat:'festival', name:'Klangtherapie Festival 2026', loc:'Scherleithen', start:'2026-08-06', end:'2026-08-10', free:false, desc:'Vier Tage Techno, Liebe und Utopie in Nordbayern – Bass zwischen den Hügeln, Staub auf den Schuhen. Scherleithen, 6.–10. August 2026.', genre:'Techno / Electronic / Festival', ticket:'https://www.klangtherapie-festival.de', outdoor:true, ageMin:18, price:'Tickets auf klangtherapie-festival.de', oepnv:'PKW empfohlen', parking:'Festivalgelände'},

  // ── KW 24 Update 2026-06-08 ──────────────────────────────────────────────

  // ─── BÖHSE ONKELZ ────────────────────────────────────────────────────────
  {cat:'festival', name:'Böhse Onkelz – „Mitten unter euch"-Tour', loc:'Nürnberg – Max-Morlock-Stadion', start:'2026-06-27', end:'2026-06-27', free:false, desc:'Die Böhsen Onkelz rocken das Max-Morlock-Stadion! Weltneuheit: 360°-Center-Stage mitten im Stadion. Part der großen „Mitten unter euch"-Stadiontour 2026. Einlass 18:00 Uhr, Show 20:00 Uhr.', genre:'Rock / Punk / Deutschrock', ticket:'https://www.myticket.de', outdoor:false, ageMin:16, price:'ab ca. 70 €', oepnv:'U1 bis Frankenstraße oder Tram 6 bis Stadion', parking:'Begrenzt – ÖPNV empfohlen'},

  // ─── GATE CLUB – Sommer 2026 ──────────────────────────────────────────────
  {cat:'afterwork', name:'PINK AIR – GATE Club', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-06-13', end:'2026-06-13', free:false, desc:'PINK AIR im GATE Club am Flughafen Nürnberg – die pinke Party-Nacht auf zwei Areas und der Dachterrasse. Sa 13. Juni, ab 21 Uhr.', genre:'Pop / Dance / Party', ticket:'https://gate-nuernberg.ticket.io', outdoor:false, ageMin:18, price:'VVK-Tickets auf ticket.io', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen (5 € pauschal)'},
  {cat:'afterwork', name:'Bad Bunny Tribute Party – PreConcert Edition', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-06-19', end:'2026-06-19', free:false, desc:'Bad Bunny Tribute Party PreConcert Edition im GATE Club – Reggaeton, Latin Vibes, Urban Sounds. Fr 19. Juni, ab 21 Uhr. Perfekte Einstimmung!', genre:'Reggaeton / Latin / Bad Bunny Tribute', ticket:'https://gate-nuernberg.ticket.io', outdoor:false, ageMin:18, price:'VVK-Tickets auf ticket.io', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen (5 € pauschal)'},
  {cat:'afterwork', name:'Abflug 90 / 2000 / 10 – GATE Club', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-06-20', end:'2026-06-20', free:false, desc:'Abflug 90 / 2000 / 10 im GATE Club – die besten Hits aus drei Jahrzehnten auf zwei Areas. Sa 20. Juni, ab 21 Uhr.', genre:'90er / 2000er / 2010er', ticket:'https://gate-nuernberg.ticket.io', outdoor:false, ageMin:18, price:'VVK-Tickets auf ticket.io', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen (5 € pauschal)'},
  {cat:'afterwork', name:'80er 90er GATE Night', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-06-27', end:'2026-06-27', free:false, desc:'80er & 90er Hits im GATE Club am Flughafen. Sa 27. Juni, ab 21 Uhr. Kult-Sounds auf zwei Floors und Dachterrasse.', genre:'80er / 90er / Schlager', ticket:'https://gate-nuernberg.ticket.io', outdoor:false, ageMin:18, price:'VVK-Tickets auf ticket.io', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen (5 € pauschal)'},
  {cat:'afterwork', name:'FISTIK meets Ozan Doğulu – GATE Club', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-07-17', end:'2026-07-17', free:false, desc:'FISTIK meets Ozan Doğulu Night im GATE Club am Flughafen Nürnberg – Türk-Pop und Orient Beats auf der Dachterrasse. Fr 17. Juli, ab 21 Uhr.', genre:'Türk-Pop / Orient / Party', ticket:'https://gate-nuernberg.ticket.io', outdoor:false, ageMin:18, price:'VVK-Tickets auf ticket.io', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen (5 € pauschal)'},
  {cat:'afterwork', name:'White GATE – GATE Club', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-07-18', end:'2026-07-18', free:false, desc:'White GATE – die elegante All-White-Party im GATE Club am Flughafen. Sa 18. Juli, ab 21 Uhr. Dresscode: Alles in Weiß!', genre:'House / Pop / White Party', ticket:'https://gate-nuernberg.ticket.io', outdoor:false, ageMin:18, price:'VVK-Tickets auf ticket.io', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen (5 € pauschal)'},
  {cat:'afterwork', name:'BRAVO HITS SUMMER DAY DANCE – GATE Club', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-07-25', end:'2026-07-25', free:false, desc:'BRAVO HITS SUMMER DAY DANCE im GATE Club – Charts und Sommerhits pur! Sa 25. Juli, ab 14 Uhr (Tagesveranstaltung).', genre:'BRAVO Hits / Pop / Charts', ticket:'https://gate-nuernberg.ticket.io', outdoor:false, ageMin:16, price:'VVK-Tickets auf ticket.io', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen (5 € pauschal)'},
  {cat:'afterwork', name:'PINK GATE – Official CSD PRE PARTY', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-08-01', end:'2026-08-01', free:false, desc:'PINK GATE – die offizielle CSD PRE PARTY im GATE Club Nürnberg. Sa 1. August, ab 21 Uhr. Queere Feierlaune vor dem großen CSD-Umzug!', genre:'Pop / Dance / Queer / CSD', ticket:'https://gate-nuernberg.ticket.io', outdoor:false, ageMin:18, price:'VVK-Tickets auf ticket.io', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen (5 € pauschal)'},
  {cat:'afterwork', name:'BOARDING NIGHT – GATE Club', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-10-17', end:'2026-10-17', free:false, desc:'BOARDING NIGHT im GATE Club – die legendäre Saisonveranstaltung zurück am Flughafen. Sa 17. Oktober, ab 21 Uhr.', genre:'House / Pop / Club Night', ticket:'https://gate-nuernberg.ticket.io', outdoor:false, ageMin:18, price:'VVK-Tickets auf ticket.io', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen (5 € pauschal)'},

  // ─── TRUSSMEE @ MAXIM FÜRTH (monatlich, 3. Samstag) ─────────────────────
  {cat:'russian', name:'Trussmee – Russian Club Night', loc:'Fürth – Maxim Club', start:'2026-06-20', end:'2026-06-20', free:false, desc:'Trussmee – die monatliche russische Club Night im Maxim Fürth. Jeden 3. Samstag im Monat. Russian Hits, Electronic Beats, Community-Feeling. Details & Tickets via Instagram.', genre:'Russian Club / Electronic / Party', ticket:'https://www.instagram.com/trussmee', outdoor:false, ageMin:18, price:'Infos via Instagram', oepnv:'U1 bis Fürth Hauptbahnhof, dann Fußweg', parking:'Innenstadt Parkhäuser Fürth'},
  {cat:'russian', name:'Trussmee – Russian Club Night', loc:'Fürth – Maxim Club', start:'2026-07-18', end:'2026-07-18', free:false, desc:'Trussmee – die monatliche russische Club Night im Maxim Fürth. Jeden 3. Samstag im Monat. Russian Hits, Electronic Beats, Community-Feeling. Details & Tickets via Instagram.', genre:'Russian Club / Electronic / Party', ticket:'https://www.instagram.com/trussmee', outdoor:false, ageMin:18, price:'Infos via Instagram', oepnv:'U1 bis Fürth Hauptbahnhof, dann Fußweg', parking:'Innenstadt Parkhäuser Fürth'},
  {cat:'russian', name:'Trussmee – Russian Club Night', loc:'Fürth – Maxim Club', start:'2026-08-15', end:'2026-08-15', free:false, desc:'Trussmee – die monatliche russische Club Night im Maxim Fürth. Jeden 3. Samstag im Monat. Russian Hits, Electronic Beats, Community-Feeling. Details & Tickets via Instagram.', genre:'Russian Club / Electronic / Party', ticket:'https://www.instagram.com/trussmee', outdoor:false, ageMin:18, price:'Infos via Instagram', oepnv:'U1 bis Fürth Hauptbahnhof, dann Fußweg', parking:'Innenstadt Parkhäuser Fürth'},

  // ─── WHITE RABBIT NBG (@white.rabbit.nbg) – monatlich, letzter Samstag ──
  {cat:'russian', name:'White Rabbit – Russian Party Night', loc:'Nürnberg – Club SOCIETY', start:'2026-06-27', end:'2026-06-27', free:false, desc:'White Rabbit NBG – monatliche russisch-internationale Party im Club SOCIETY Nürnberg. Jeden letzten Samstag im Monat. Aktuelle Infos & Tickets via Instagram @white.rabbit.nbg.', genre:'Russian Hits / Party / Community', ticket:'https://www.instagram.com/white.rabbit.nbg', outdoor:false, ageMin:18, price:'Infos via Instagram', oepnv:'U-Bahn nach Lorenzkirche oder Weißer Turm', parking:'Innenstadt Parkhäuser'},
  {cat:'russian', name:'White Rabbit – Russian Party Night', loc:'Nürnberg – Club SOCIETY', start:'2026-07-25', end:'2026-07-25', free:false, desc:'White Rabbit NBG – monatliche russisch-internationale Party im Club SOCIETY Nürnberg. Jeden letzten Samstag im Monat. Aktuelle Infos & Tickets via Instagram @white.rabbit.nbg.', genre:'Russian Hits / Party / Community', ticket:'https://www.instagram.com/white.rabbit.nbg', outdoor:false, ageMin:18, price:'Infos via Instagram', oepnv:'U-Bahn nach Lorenzkirche oder Weißer Turm', parking:'Innenstadt Parkhäuser'},
  {cat:'russian', name:'White Rabbit – Karaoke Dance Night', loc:'Nürnberg – Club PLAZA', start:'2026-08-02', end:'2026-08-02', free:false, desc:'White Rabbit NBG präsentiert: KARAOKE DANCE NIGHT im Club PLAZA Nürnberg. 2. August 2026. Russische Hits zum Mitsingen und Tanzen. Details via Instagram @white.rabbit.nbg.', genre:'Karaoke / Russian Hits / Dance', ticket:'https://www.instagram.com/white.rabbit.nbg', outdoor:false, ageMin:18, price:'Infos via Instagram', oepnv:'U-Bahn Nürnberg Innenstadt', parking:'Innenstadt Parkhäuser'},
  {cat:'russian', name:'White Rabbit – Russian Party Night', loc:'Nürnberg – Club SOCIETY', start:'2026-08-29', end:'2026-08-29', free:false, desc:'White Rabbit NBG – monatliche russisch-internationale Party im Club SOCIETY Nürnberg. Jeden letzten Samstag im Monat. Aktuelle Infos & Tickets via Instagram @white.rabbit.nbg.', genre:'Russian Hits / Party / Community', ticket:'https://www.instagram.com/white.rabbit.nbg', outdoor:false, ageMin:18, price:'Infos via Instagram', oepnv:'U-Bahn nach Lorenzkirche oder Weißer Turm', parking:'Innenstadt Parkhäuser'},

  // ─── INDIE OPEN AIR 2026 ──────────────────────────────────────────────────
  {cat:'festival', name:'Indie Open Air 2026', loc:'Nürnberg – Kulturgarten', start:'2026-08-22', end:'2026-08-22', free:false, desc:'Das Indie Open Air ist wieder da! by Club Stereo & Kulturgarten, mitten in der Nürnberger Altstadt. Indie-Hits, tolle Deko, Drinks und Community-Flair. 16:00–22:00 Uhr. Aftershow ab 23:00 Uhr im Club Stereo (mit Bändchen gratis). Neue Location: Kulturgarten, Königstormauer 3a.', genre:'Indie / Pop / Rock', ticket:'https://www.universe.com/events/indie-open-air-tickets-58NQTG', outdoor:true, ageMin:0, price:'Tickets via universe.com', oepnv:'U1/U2 Hauptbahnhof, 10 min Fußweg', parking:'Altstadt Parkhäuser'},
  // ─── HERBST / WINTER 2026 KONZERTE & PARTYS ──────────────────────────────
  {cat:'festival', name:'Schlagernacht des Jahres 2026', loc:'Nürnberg – Arena Nürnberger Versicherung', start:'2026-09-26', end:'2026-09-26', free:false, desc:'Die große Schlagernacht des Jahres mit Live-Acts der Schlagerszene. Beginn 18:00 Uhr in der Arena Nürnberger Versicherung.', genre:'Schlager / Pop', ticket:'https://www.arena-nuernberg.de', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'U1 Langwasser/Messe', parking:'Parkplätze an der Arena'},
  {cat:'festival', name:'Tokio Hotel – Live 2026', loc:'Nürnberg – Arena Nürnberger Versicherung', start:'2026-11-08', end:'2026-11-08', free:false, desc:'Tokio Hotel kehren auf die Bühne der Arena Nürnberger Versicherung zurück – ihre Hits live in Nürnberg.', genre:'Pop / Rock', ticket:'https://www.arena-nuernberg.de', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'U1 Langwasser/Messe', parking:'Parkplätze an der Arena'},
  {cat:'afterwork', name:'Silvester Party im PARKS', loc:'Nürnberg – PARKS Stadtpark', start:'2026-12-31', end:'2026-12-31', free:false, desc:'Großer Jahreswechsel im PARKS: Einlass ab 22:00 Uhr, Feuershow und Feuerwerk um Mitternacht, mehrere Areas, Showacts und DJs. Early-Bird inkl. Garderobe und ausgewählten Getränken.', genre:'Party / DJ / Silvester', ticket:'https://www.parks-nuernberg.de/produkt/silvester-party', outdoor:false, ageMin:18, price:'ab 75 € (Early Bird)', oepnv:'U2/U3 Rathenauplatz, Stadtpark', parking:'Parkhäuser Innenstadt'},
  // ─── NEU HINZUGEFÜGT KW 26 2026 ──────────────────────────────────────────
  {cat:'afterwork', name:'Wein & Vinyl im Sommergarten', loc:'Nürnberg – PARKS Stadtpark', start:'2026-09-30', end:'2026-09-30', free:true, desc:'Entspannter Wein-Abend im Sommergarten des PARKS mit Vinyl-Sounds. 18:00–22:00 Uhr. Lockerer Ausklang der Sommersaison im Stadtpark.', genre:'Wein / Vinyl / Lounge', ticket:'https://www.parks-nuernberg.de/eventkalender/', outdoor:true, ageMin:18, price:'Eintritt frei', oepnv:'U2/U3 Rathenauplatz, Stadtpark', parking:'Parkhäuser Innenstadt'},
  {cat:'sonstige', name:'Nürnberg Nightmarket #105', loc:'Nürnberg – PARKS Stadtpark', start:'2026-10-16', end:'2026-10-16', free:true, desc:'Abendlicher Streetfood- und Designmarkt im PARKS mit Foodtrucks, Drinks und Musik. 18:00–23:00 Uhr.', genre:'Streetfood / Markt / Musik', ticket:'https://www.parks-nuernberg.de/eventkalender/', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'U2/U3 Rathenauplatz, Stadtpark', parking:'Parkhäuser Innenstadt'},
  {cat:'festival', name:'NUEJAZZ Festival 2026', loc:'Nürnberg – verschiedene Locations', start:'2026-10-23', end:'2026-11-15', free:false, desc:'Internationales Jazzfestival, 2024 als „Festival des Jahres" mit dem Deutschen Jazzpreis ausgezeichnet. Konzerte an verschiedenen Spielstätten in Nürnberg, einzelne Programmpunkte kostenlos.', genre:'Jazz', ticket:'https://www.nuejazz.de', outdoor:false, ageMin:0, price:'Tageskarte ca. 30–50 €', oepnv:'U-Bahn Innenstadt', parking:'Parkhäuser Innenstadt'},
  {cat:'sonstige', name:'Nürnberg Nightmarket #106', loc:'Nürnberg – PARKS Stadtpark', start:'2026-11-13', end:'2026-11-13', free:true, desc:'Abendlicher Streetfood- und Designmarkt im PARKS mit Foodtrucks, Drinks und Musik. 18:00–23:00 Uhr.', genre:'Streetfood / Markt / Musik', ticket:'https://www.parks-nuernberg.de/eventkalender/', outdoor:false, ageMin:0, price:'Eintritt frei', oepnv:'U2/U3 Rathenauplatz, Stadtpark', parking:'Parkhäuser Innenstadt'},

  // ── KW 33 Update 2026-08-10 ──────────────────────────────────────────────
  // ─── GATE CLUB – Herbst/Winter 2026 (weitere Termine) ────────────────────
  {cat:'afterwork', name:'pentHOUSE Terrassen Closing', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-08-15', end:'2026-08-15', free:false, desc:'pentHOUSE Terrassen Closing im GATE Club – letzte große Dachterrassen-Party der Sommersaison. Sa 15. August, ab 21 Uhr.', genre:'House / Open Air / Party', ticket:'https://gate-nuernberg.de', outdoor:true, ageMin:18, price:'VVK-Tickets auf gate-nuernberg.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen (5 € pauschal)'},
  {cat:'afterwork', name:'SUMMER NIGHTFLIGHT – Destination Summer 2026', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-08-15', end:'2026-08-15', free:false, desc:'SUMMER NIGHTFLIGHT im GATE Club – Charts, House und Sommerhits auf der Club-Area. Sa 15. August, ab 21 Uhr.', genre:'Charts / House / Party', ticket:'https://gate-nuernberg.de', outdoor:false, ageMin:18, price:'VVK-Tickets auf gate-nuernberg.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen (5 € pauschal)'},
  {cat:'afterwork', name:'SUNSET CLUB 02 – Sunset, Beats, Runway Views', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-08-20', end:'2026-08-20', free:false, desc:'SUNSET CLUB im GATE Club – Sonnenuntergang, Beats und Blick auf die Landebahn von der Dachterrasse. Do 20. August, ab 19 Uhr.', genre:'Sunset / Lounge / House', ticket:'https://gate-nuernberg.de', outdoor:true, ageMin:18, price:'VVK-Tickets auf gate-nuernberg.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen (5 € pauschal)'},
  {cat:'afterwork', name:'BOMBE OPEN AIR', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-08-22', end:'2026-08-22', free:false, desc:'BOMBE OPEN AIR im GATE Club – Open-Air-Party auf der Dachterrasse mit internationalen Sounds. Sa 22. August, ab 21 Uhr.', genre:'Open Air / Dance / Party', ticket:'https://gate-nuernberg.de', outdoor:true, ageMin:18, price:'VVK-Tickets auf gate-nuernberg.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen (5 € pauschal)'},
  {cat:'afterwork', name:'Ü30 GATE meets Ü20', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-08-22', end:'2026-08-22', free:false, desc:'Ü30 GATE meets Ü20 – zwei Areas, zwei Generationen, eine Nacht im GATE Club. Sa 22. August, ab 21 Uhr.', genre:'Mixed / Charts / Party', ticket:'https://gate-nuernberg.de', outdoor:false, ageMin:18, price:'VVK-Tickets auf gate-nuernberg.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen (5 € pauschal)'},
  {cat:'afterwork', name:'We love OLDSCHOOL', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-08-28', end:'2026-08-28', free:false, desc:'We love OLDSCHOOL im GATE Club – 90er- und 2000er-Hits auf zwei Floors. Fr 28. August, ab 21 Uhr.', genre:'90er / 2000er / Oldschool', ticket:'https://gate-nuernberg.de', outdoor:false, ageMin:18, price:'VVK-Tickets auf gate-nuernberg.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen (5 € pauschal)'},
  {cat:'afterwork', name:'SANDKASTENLIEBE – 90er/2000er Open Air Party', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-08-29', end:'2026-08-29', free:false, desc:'SANDKASTENLIEBE – Nürnbergs 90er/2000er Open-Air-Party auf der GATE-Dachterrasse. Sa 29. August, ab 21 Uhr.', genre:'90er / 2000er / Open Air', ticket:'https://gate-nuernberg.de', outdoor:true, ageMin:18, price:'VVK-Tickets auf gate-nuernberg.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen (5 € pauschal)'},
  {cat:'afterwork', name:'80er 90er GATE', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-08-29', end:'2026-08-29', free:false, desc:'80er & 90er GATE – Kult-Sounds parallel zur Dachterrassen-Party auf der Club-Area. Sa 29. August, ab 21 Uhr.', genre:'80er / 90er / Schlager', ticket:'https://gate-nuernberg.de', outdoor:false, ageMin:18, price:'VVK-Tickets auf gate-nuernberg.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen (5 € pauschal)'},
  {cat:'afterwork', name:'MILE HIGH CLUB – The Arrival', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-09-05', end:'2026-09-05', free:false, desc:'MILE HIGH CLUB – The Arrival: Saisonstart im GATE Club nach der Sommerpause. Sa 5. September, ab 21 Uhr.', genre:'House / Club / Season Opening', ticket:'https://gate-nuernberg.de', outdoor:false, ageMin:18, price:'VVK-Tickets auf gate-nuernberg.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen (5 € pauschal)'},
  {cat:'afterwork', name:'Singalong – Greatest Hits aller Zeiten', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-09-11', end:'2026-09-11', free:false, desc:'Singalong im GATE Club – Mitsing-Party mit den größten Hits aller Zeiten. Fr 11. September, ab 21 Uhr.', genre:'Mitsing-Party / Charts', ticket:'https://gate-nuernberg.de', outdoor:false, ageMin:18, price:'VVK-Tickets auf gate-nuernberg.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen (5 € pauschal)'},
  {cat:'afterwork', name:'Single Party – GATE Club (Herbst-Edition)', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-09-12', end:'2026-09-12', free:false, desc:'Single Party im GATE Club – neue Herbst-Ausgabe der beliebten Single-Nacht auf zwei Areas. Sa 12. September, ab 21 Uhr.', genre:'Party / Single / House', ticket:'https://gate-nuernberg.de', outdoor:false, ageMin:18, price:'VVK-Tickets auf gate-nuernberg.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen (5 € pauschal)'},
  {cat:'afterwork', name:'We love OLDSCHOOL – Terrassen Open Air', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-09-26', end:'2026-09-26', free:false, desc:'We love OLDSCHOOL – Terrassen Open Air im GATE Club, letzte Open-Air-Ausgabe der Reihe vor dem Winter. Sa 26. September, ab 21 Uhr.', genre:'90er / 2000er / Open Air', ticket:'https://gate-nuernberg.de', outdoor:true, ageMin:18, price:'VVK-Tickets auf gate-nuernberg.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen (5 € pauschal)'},
  {cat:'afterwork', name:'SILVESTER IM GATE', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-12-31', end:'2026-12-31', free:false, desc:'Große Silvesterparty im GATE Club am Flughafen – Club und Dachterrasse, Feuerwerksblick, DJs bis in den Morgen. Do 31. Dezember, ab 22 Uhr.', genre:'Silvester / House / Party', ticket:'https://gate-nuernberg.de', outdoor:false, ageMin:18, price:'VVK-Tickets auf gate-nuernberg.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen (5 € pauschal)'},

  // ─── ADINA ROOFTOP & CINECITTA – weitere Termine ─────────────────────────
  {cat:'afterwork', name:'HOUSE ROOFTOP', loc:'Nürnberg – Adina Rooftop, Dr.-Kurt-Schumacher-Str. 1', start:'2026-08-15', end:'2026-08-15', free:false, desc:'HOUSE ROOFTOP auf der Dachterrasse des Adina Apartment Hotels – DJs evoke443 & oπ mit House und UK Garage. Sa 15. August, ab 17 Uhr.', genre:'House / UK Garage', ticket:'https://www.universe.com/events/house-rooftop-tickets-NH1WB2', outdoor:true, ageMin:18, price:'Tickets via universe.com', oepnv:'U-Bahn/S-Bahn Hauptbahnhof, kurzer Fußweg', parking:'Parkhäuser Hauptbahnhof'},
  {cat:'afterwork', name:'Feierabend Sounds – After Work auf der Dachterrasse', loc:'Nürnberg – CINECITTA\' Dachterrasse, Gewerbemuseumsplatz 3', start:'2026-08-13', end:'2026-08-13', free:true, desc:'After Work mit Funk, Rock\'n\'Roll und mehr auf der Dachterrasse des CINECITTA\'. DJs KON&DOM, kostenloser Eintritt. Do 13. August, ab 18 Uhr (entfällt bei Regen).', genre:'Funk / Rock / After Work', ticket:'https://www.cinecitta.de/afterwork/', outdoor:true, ageMin:16, price:'Eintritt frei', oepnv:'U-Bahn/Bus Hauptbahnhof, kurzer Fußweg', parking:'Parkhäuser Innenstadt'},

  // ─── KONZERTE HERBST/WINTER 2026 ──────────────────────────────────────────
  {cat:'festival', name:'Salut Salon – „Heimat"', loc:'Nürnberg – Serenadenhof', start:'2026-09-05', end:'2026-09-05', free:false, desc:'Finale der Konzert-Trilogie von Salut Salon: vier Virtuosinnen (2 Geigen, Cello, Klavier) mit Programm „Heimat" im Open-Air-Hof.', genre:'Klassik-Crossover', ticket:'https://eventim.de/event/salut-salon-heimat-serenadenhof-nuernberg-20522013', outdoor:true, ageMin:0, price:'ab ca. 40–50 €', oepnv:'Bus/Tram Rathenauplatz, Nähe Stadtpark', parking:'Parkhäuser Innenstadt'},
  {cat:'festival', name:'Annett Louisan – „22 Jahre Bohème"', loc:'Nürnberg – Serenadenhof', start:'2026-09-10', end:'2026-09-10', free:false, desc:'Jubiläumskonzert „22 Jahre Bohème" von Annett Louisan im Serenadenhof.', genre:'Chanson / Pop', ticket:'https://www.eventim.de/event/annett-louisan-22-jahre-boheme-das-jubilaeumskonzert-serenadenhof-nuernberg-20665488/', outdoor:true, ageMin:0, price:'ab ca. 52 €', oepnv:'Bus/Tram Rathenauplatz, Nähe Stadtpark', parking:'Parkhäuser Innenstadt'},
  {cat:'festival', name:'Madsen', loc:'Nürnberg – Löwensaal', start:'2026-10-09', end:'2026-10-09', free:false, desc:'Madsen live im Löwensaal Nürnberg – Deutschrock-Konzert.', genre:'Rock / Deutschrock', ticket:'https://www.livegigs.de/venues/nuernberg-loewensaal', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'ASP', loc:'Nürnberg – Löwensaal', start:'2026-10-10', end:'2026-10-10', free:false, desc:'ASP live im Löwensaal Nürnberg – Dark-Rock-Konzert.', genre:'Dark Rock / Gothic', ticket:'https://www.livegigs.de/venues/nuernberg-loewensaal', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Marduk', loc:'Nürnberg – Löwensaal', start:'2026-10-11', end:'2026-10-11', free:false, desc:'Marduk live im Löwensaal Nürnberg – Black-Metal-Konzert.', genre:'Black Metal', ticket:'https://www.livegigs.de/venues/nuernberg-loewensaal', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Prinz Pi', loc:'Nürnberg – Löwensaal', start:'2026-10-18', end:'2026-10-18', free:false, desc:'Prinz Pi live im Löwensaal Nürnberg – Hip-Hop-Konzert.', genre:'Hip-Hop', ticket:'https://www.livegigs.de/venues/nuernberg-loewensaal', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Itchy', loc:'Nürnberg – Löwensaal', start:'2026-10-30', end:'2026-10-30', free:false, desc:'Itchy live im Löwensaal Nürnberg – Punkrock-Konzert.', genre:'Punkrock', ticket:'https://www.livegigs.de/venues/nuernberg-loewensaal', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Dubioza Kolektiv', loc:'Nürnberg – Löwensaal', start:'2026-10-31', end:'2026-10-31', free:false, desc:'Dubioza Kolektiv live im Löwensaal Nürnberg – Balkan-Reggae/Ska-Konzert.', genre:'Reggae / Ska / Balkan', ticket:'https://www.livegigs.de/venues/nuernberg-loewensaal', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Clawfinger', loc:'Nürnberg – Löwensaal', start:'2026-11-02', end:'2026-11-02', free:false, desc:'Clawfinger live im Löwensaal Nürnberg – Rap-Metal-Konzert.', genre:'Rap Metal', ticket:'https://www.livegigs.de/venues/nuernberg-loewensaal', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Gentleman', loc:'Nürnberg – Löwensaal', start:'2026-11-04', end:'2026-11-04', free:false, desc:'Gentleman live im Löwensaal Nürnberg – Reggae-Konzert.', genre:'Reggae', ticket:'https://www.livegigs.de/venues/nuernberg-loewensaal', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Long Distance Calling', loc:'Nürnberg – Löwensaal', start:'2026-11-05', end:'2026-11-05', free:false, desc:'Long Distance Calling live im Löwensaal Nürnberg – Instrumental-Postrock-Konzert.', genre:'Postrock / Instrumental', ticket:'https://www.livegigs.de/venues/nuernberg-loewensaal', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Amon Amarth – The Allfather Awakens Tour', loc:'Bamberg – Brose Arena', start:'2026-11-04', end:'2026-11-04', free:false, desc:'Amon Amarth mit der „The Allfather Awakens Tour" in der Brose Arena Bamberg – Death-Metal-Konzert.', genre:'Death Metal', ticket:'https://www.metaltix.com/amon-amarth-tickets-38333.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus ab Bamberg ZOB', parking:'Parkplätze an der Brose Arena'},
  {cat:'sonstige', name:'Bigband der Bundeswehr', loc:'Nürnberg – Meistersingerhalle', start:'2026-11-03', end:'2026-11-03', free:false, desc:'Konzert der Bigband der Bundeswehr in der Meistersingerhalle Nürnberg.', genre:'Bigband / Jazz', ticket:'https://www.nuernberg.de/internet/meistersingerhalle/veranstaltungskalender.html', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'U2 Messe/Stadion oder Tram 9', parking:'Parkplatz Meistersingerhalle'},
  {cat:'festival', name:'The Dark Tenor – Klassik-Rock-Crossover', loc:'Nürnberg – Meistersingerhalle', start:'2026-11-04', end:'2026-11-04', free:false, desc:'The Dark Tenor mit Klassik-Rock-Crossover in der Meistersingerhalle Nürnberg.', genre:'Klassik / Rock / Crossover', ticket:'https://www.nuernberg.de/internet/meistersingerhalle/veranstaltungskalender.html', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'U2 Messe/Stadion oder Tram 9', parking:'Parkplatz Meistersingerhalle'},
  {cat:'festival', name:'Santiano – Die große Arena Tour 2026', loc:'Würzburg – tectake Arena', start:'2026-11-21', end:'2026-11-21', free:false, desc:'Santiano mit der großen Arena Tour 2026 zum Album „Da braut sich was zusammen" in der tectake Arena Würzburg.', genre:'Folk-Rock / Shanty', ticket:'https://www.eventim.de/en/artist/santiano/santiano-die-grosse-arena-tour-2026-3737403/', outdoor:false, ageMin:0, price:'ab ca. 50 €', oepnv:'Bus/Straßenbahn Talavera', parking:'Parkplätze an der Arena'},
  {cat:'weinfest', name:'Nacht der offenen Weinkeller', loc:'Würzburg – Innenstadt (Hofkeller, Juliusspital, Bürgerspital, Weingut am Stein)', start:'2026-11-21', end:'2026-11-21', free:false, desc:'Tour durch vier Würzburger Weingüter und Weinkeller an einem Abend – Verkostung, Führungen und Weinkultur.', genre:'Weinverkostung', ticket:'https://wuerzburgerleben.de/2026/01/05/veranstaltungen-2026-in-wuerzburg-eine-uebersicht/', outdoor:false, ageMin:16, price:'Kombiticket erforderlich', oepnv:'Fußweg Innenstadt Würzburg', parking:'Parkhäuser Innenstadt'},
  {cat:'festival', name:'Eisheilige Nacht 2026 – Subway to Sally', loc:'Würzburg – Posthalle', start:'2026-12-27', end:'2026-12-27', free:false, desc:'Eisheilige Nacht – Subway to Sallys traditionelles Jahresausklang-Festival in der Posthalle Würzburg, mit Fiddler\'s Green, Manntra und Saint City Orchestra.', genre:'Folk-Rock / Festival', ticket:'https://www.posthalle.de/programm/eisheilige-nacht-26/', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Fußweg vom Hauptbahnhof Würzburg', parking:'Parkhäuser Innenstadt Würzburg'},

  // ─── RUSSIAN EVENTS – Herbst/Winter 2026 ─────────────────────────────────
  {cat:'russian', name:'Russian Coco Open Air Festival 2026 by TyRo', loc:'Gießen – WM Arena', start:'2026-08-15', end:'2026-08-15', free:false, desc:'Größtes russisches Open-Air-Festival Deutschlands mit DJs und Live-Acts der russischen Musikszene in der WM Arena Gießen.', genre:'Festival / Musik', ticket:'https://www.eventim.de/event/russian-coco-open-air-festival-2026-by-tyro-wm-arena-giessen-20511091/', outdoor:true, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bahn nach Gießen, dann Bus/Taxi', parking:'Parkplätze an der Arena'},
  {cat:'russian', name:'Армен Захарян – „30 секунд до Ренессанса"', loc:'Nürnberg – KUF im südpunkt', start:'2026-09-14', end:'2026-09-14', free:false, desc:'Literaturwissenschaftler und YouTuber Armen Sacharjan mit einem Vortrag über mittelalterliche Literatur, Chaucer und Thomas Malory.', genre:'Vortrag / Beseda', ticket:'https://potalonu.com/events/69679ebd-a513-4709-8315-0bd28896adcc', outdoor:false, ageMin:16, price:'ca. 35–45 €', oepnv:'Bus/Tram Aufseßplatz', parking:'Parkplätze begrenzt'},
  {cat:'russian', name:'Иван Ургант – „Живой Ургант"', loc:'Augsburg', start:'2026-10-12', end:'2026-10-12', free:false, desc:'Live-Bühnenversion der bekannten Abendshow von Ivan Urgant, eigenständiges Programm.', genre:'Comedy / Talk', ticket:'https://www.kontramarka.de/en/tour/ivan-urgant/', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Augsburg ÖPNV', parking:'Innenstadt Parkhäuser'},
  {cat:'russian', name:'Ирина Приходько – neue Solo-Show', loc:'Nürnberg', start:'2026-10-22', end:'2026-10-22', free:false, desc:'Irina Prikhodko mit einer neuen Solo-Stand-up-Show über mentale Gesundheit, Grenzen und Selbstironie.', genre:'Stand-up / Юмор', ticket:'https://afishamira.com/event/komik-irina-prihodko-v-nyurnberge/', outdoor:false, ageMin:16, price:'ca. 45 €', oepnv:'U-Bahn Nürnberg Innenstadt', parking:'Innenstadt Parkhäuser'},
  {cat:'russian', name:'Михаил Шац – Stand-up-Tour', loc:'München – Kulturzentrum Gorod', start:'2026-11-14', end:'2026-11-14', free:false, desc:'Mikhail Shatz mit neuem Solo-Stand-up-Programm über Leben, Zeit und Alltag.', genre:'Stand-up', ticket:'https://biletkartina.tv/ru/hall?event_id=1284373722', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'S-Bahn/U-Bahn Hauptbahnhof München', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'Гарик Оганисян – „Без негатива"', loc:'Berlin', start:'2026-11-18', end:'2026-11-18', free:false, desc:'Stand-up-Show „Без негатива" von Garik Oganisyan (Stand Up Club #1).', genre:'Stand-up', ticket:'https://afishamira.com/event/komik-garik-oganisyan-v-berline-bez-negativa/', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Berlin ÖPNV', parking:'Innenstadt Parkhäuser'},
  {cat:'russian', name:'Валерий Меладзе – Europatour 2027', loc:'Würzburg – Congress Centrum', start:'2027-02-23', end:'2027-02-23', free:false, desc:'Valeri Meladze mit neuem Konzertprogramm auf Europatour 2027 im Congress Centrum Würzburg.', genre:'Konzert / Pop', ticket:'https://www.kontramarka.de/tour/valeriy-meladze/', outdoor:false, ageMin:0, price:'ca. 79–179 €', oepnv:'Fußweg vom Hauptbahnhof Würzburg', parking:'Parkhäuser Innenstadt Würzburg'},

  // ─── NEU HINZUGEFÜGT (KW 34 · 2026-08-20) ────────────────────────────────
  // ── GATE Club Nürnberg (Prioritätsliste) ──
  {cat:'afterwork', name:'Salsa Bachata Kizomba Party – GATE Club', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-08-21', end:'2026-08-21', free:false, desc:'Latin-Nacht im GATE am Airport Nürnberg mit Salsa, Bachata und Kizomba auf zwei Areas plus Dachterrasse mit Rollfeldblick.', genre:'Latin / Salsa / Bachata', ticket:'https://gate-nuernberg.de/', outdoor:false, ageMin:18, price:'Tickets über gate-nuernberg.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen'},
  {cat:'afterwork', name:'SUNSET CLUB 03 – Sunset, Beats, Runway Views', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-09-03', end:'2026-09-03', free:false, desc:'Dritte Ausgabe der Sunset-Reihe auf der 400 qm großen Dachterrasse am Flughafen: House, Afro und Tech House sowie Latin-Sounds mit Blick auf das Rollfeld. Bei schlechtem Wetter auch indoor.', genre:'House / Afro / Tech House / Latin', ticket:'https://gate-nuernberg.de/', outdoor:true, ageMin:18, price:'Early Bird 5 €, regulär 7 €, AK 10 €', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen'},
  {cat:'afterwork', name:'Mamma Mia Open Air – GATE Club', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-09-04', end:'2026-09-04', free:false, desc:'Open-Air-Party auf der Terrasse des GATE mit Pop- und Schlagerhits zum Mitsingen.', genre:'Pop / Schlager', ticket:'https://gate-nuernberg.de/', outdoor:true, ageMin:18, price:'Tickets über gate-nuernberg.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen'},
  {cat:'afterwork', name:'Bad Bunny Tribute Party – GATE Club', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-09-11', end:'2026-09-11', free:false, desc:'Tribute-Nacht für Bad Bunny mit Reggaeton und Latin-Beats im GATE am Airport Nürnberg.', genre:'Reggaeton / Latin', ticket:'https://gate-nuernberg.de/', outdoor:false, ageMin:18, price:'Tickets über gate-nuernberg.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen'},
  {cat:'afterwork', name:'ABFLUG 9000/10 – GATE Club', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-09-19', end:'2026-09-19', free:false, desc:'Clubnacht der ABFLUG-Reihe im GATE am Flughafen Nürnberg auf zwei Areas plus Dachterrasse.', genre:'Club / Mixed', ticket:'https://gate-nuernberg.de/', outdoor:false, ageMin:18, price:'Tickets über gate-nuernberg.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen'},
  {cat:'afterwork', name:'80er 90er GATE (Herbst-Edition)', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-09-26', end:'2026-09-26', free:false, desc:'Die Hits der 80er und 90er im GATE am Airport Nürnberg – parallel zum Terrassen Open Air auf der zweiten Area.', genre:'80er / 90er', ticket:'https://gate-nuernberg.de/', outdoor:false, ageMin:18, price:'Tickets über gate-nuernberg.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen'},
  {cat:'afterwork', name:'Single Party – GATE Club (Oktober)', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-10-03', end:'2026-10-03', free:false, desc:'Single Party im GATE Club am Flughafen Nürnberg auf zwei Areas – Charts, 90er und House.', genre:'Party / Single / House', ticket:'https://gate-nuernberg.de/', outdoor:false, ageMin:18, price:'Tickets über gate-nuernberg.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen'},
  {cat:'afterwork', name:'Ü30 GATE – Die große Ü30 Party am Flughafen', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-10-10', end:'2026-10-10', free:false, desc:'Große Ü30-Party im GATE am Airport Nürnberg mit Partyhits aus vier Jahrzehnten auf zwei Areas.', genre:'Ü30 / Partyhits', ticket:'https://gate-nuernberg.de/', outdoor:false, ageMin:18, price:'Tickets über gate-nuernberg.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen'},
  {cat:'afterwork', name:'Happy Halloween im GATE', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-10-31', end:'2026-10-31', free:false, desc:'Große Halloween-Party am Airport Nürnberg mit Kostümen, Dekoration und Partyhits auf zwei Areas.', genre:'Halloween / Mixed', ticket:'https://gate-nuernberg.de/', outdoor:false, ageMin:18, price:'Tickets über gate-nuernberg.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen'},
  {cat:'afterwork', name:'Singalong – Hits der 90er & frühen 2000er', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-11-07', end:'2026-11-07', free:false, desc:'Mitsing-Party im GATE mit den größten Hits der 90er und frühen 2000er.', genre:'Singalong / 90er', ticket:'https://gate-nuernberg.de/', outdoor:false, ageMin:18, price:'Tickets über gate-nuernberg.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen'},
  {cat:'afterwork', name:'Single Party – GATE Club (November)', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-11-07', end:'2026-11-07', free:false, desc:'Single Party im GATE Club am Flughafen Nürnberg – parallel zur Singalong-Party auf der zweiten Area.', genre:'Party / Single', ticket:'https://gate-nuernberg.de/', outdoor:false, ageMin:18, price:'Tickets über gate-nuernberg.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen'},
  {cat:'afterwork', name:'Single Party – GATE Club (Dezember)', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-12-05', end:'2026-12-05', free:false, desc:'Single Party im GATE Club am Flughafen Nürnberg auf zwei Areas.', genre:'Party / Single', ticket:'https://gate-nuernberg.de/', outdoor:false, ageMin:18, price:'Tickets über gate-nuernberg.de', oepnv:'S-Bahn S2 bis Flughafen, dann Terminal 2', parking:'Parkhaus P2/P3 am Flughafen'},
  // ── Dächla Fürth (Prioritätsliste) ──
  {cat:'sonstige', name:'Barre, Brunch & Glow – Dächla Rooftop', loc:'Fürth – Dächla Rooftop (Friedrichstraße 6a)', start:'2026-08-23', end:'2026-08-23', free:false, desc:'45-minütige Barre-Pilates-Session mit Meditation und anschließendem Brunch auf der Rooftop-Terrasse des Dächla, ab 10 Uhr.', genre:'Wellness / Brunch / Rooftop', ticket:'https://theglowproject.ticket.io/DsYz6PaW/', outdoor:true, ageMin:0, price:'Tickets über theglowproject.ticket.io', oepnv:'U1 Fürth Hbf, 5 min Fußweg', parking:'Innenstadt Fürth'},
  {cat:'afterwork', name:'MACH AUF’M DACH – Dächla Rooftop', loc:'Fürth – Dächla Rooftop (Friedrichstraße 6a)', start:'2026-08-29', end:'2026-08-29', free:false, desc:'Rooftop-Party von 16 bis 22 Uhr mit House-, Afro- und Latin-House-Sets von Luis Buchmann, the_ae97 und o3.ofc. Eintritt zur Aftershowparty im Mach1 ist inklusive.', genre:'House / Afro House / Latin House', ticket:'https://daechla.de/events', outdoor:true, ageMin:18, price:'Tickets über daechla.de', oepnv:'U1 Fürth Hbf, 5 min Fußweg', parking:'Innenstadt Fürth'},
  {cat:'afterwork', name:'We ♥ RnB – Rooftop Edition (Season Closing)', loc:'Fürth – Dächla Rooftop (Friedrichstraße 6a)', start:'2026-09-12', end:'2026-09-12', free:false, desc:'Season Closing auf dem Dächla von 16 bis 22 Uhr mit DJ Left (HH), Dr. Rockwell und Live-Vocals von Lee Anthony.', genre:'RnB / Rooftop', ticket:'https://daechla.de/events', outdoor:true, ageMin:18, price:'Tickets über daechla.de', oepnv:'U1 Fürth Hbf, 5 min Fußweg', parking:'Innenstadt Fürth'},
  {cat:'afterwork', name:'DÄCHLA MEETS PUDEL – Chill & Grill', loc:'Fürth – Dächla Rooftop (Friedrichstraße 6a)', start:'2026-09-18', end:'2026-09-18', free:false, desc:'BBQ-Abend von 17 bis 22 Uhr mit Homemade Burgern vom Goldenen Pudel, BBQ Beats und Drinks über den Dächern von Fürth.', genre:'BBQ / Chill-out / Rooftop', ticket:'https://daechla.de/events', outdoor:true, ageMin:18, price:'Preis noch offen', oepnv:'U1 Fürth Hbf, 5 min Fußweg', parking:'Innenstadt Fürth'},
  // ── Stadtvilla Nürnberg (Prioritätsliste) ──
  {cat:'afterwork', name:'VILLA KUNTERBUNT – Die 80er, 90er & 2000er Party', loc:'Nürnberg – Stadtvilla (Rosenaupark)', start:'2026-09-26', end:'2026-09-26', free:false, desc:'„Feiern wie früher": 80er-, 90er- und 2000er-Party in der Jugendstilvilla am Rosenaupark, Garten geöffnet ab 18 Uhr.', genre:'80er / 90er / 2000er', ticket:'https://stadtvilla.ticket.io', outdoor:true, ageMin:18, price:'Tickets über stadtvilla.ticket.io', oepnv:'U1 Gostenhof / Tram 4', parking:'Innenstadt Parkhäuser'},
  {cat:'afterwork', name:'KLASSENTREFFEN – Stadtvilla Nürnberg', loc:'Nürnberg – Stadtvilla (Rosenaupark)', start:'2026-10-02', end:'2026-10-02', free:false, desc:'Partyabend in der Stadtvilla Nürnberg ab 21 Uhr.', genre:'Party / Mixed', ticket:'https://stadtvilla.ticket.io', outdoor:false, ageMin:18, price:'Tickets über stadtvilla.ticket.io', oepnv:'U1 Gostenhof / Tram 4', parking:'Innenstadt Parkhäuser'},
  // ── CineCittà Nürnberg (Prioritätsliste) ──
  {cat:'afterwork', name:'After Work auf der CineCittà Dachterrasse', loc:'Nürnberg – CineCittà Rooftop (Gewerbemuseumsplatz 3)', start:'2026-09-03', end:'2026-09-03', free:false, desc:'Feierabend-Sounds mit den DJs KON&DOM auf der Dachterrasse des CineCittà ab 18 Uhr, mit Drinks und Sonnenuntergang über der Stadt. Entfällt bei Regen.', genre:'Funk / Rocknroll / Rooftop', ticket:'https://www.cinecitta.de/afterwork/', outdoor:true, ageMin:18, price:'Preis noch offen', oepnv:'U2/U3 Hauptbahnhof, 3 min Fußweg', parking:'Tiefgarage CineCittà'},
  // ── Kirchweihen & Volksfeste ──
  {cat:'volksfest', name:'Kirchweih Kosbach', loc:'Erlangen – Kosbach', start:'2026-08-21', end:'2026-08-24', free:true, desc:'Stadtteilkirchweih im Erlanger Westen mit fränkischen Spezialitäten wie Schlachtschüssel und Schäuferla sowie Unterhaltungsprogramm.', genre:'Kirchweih / Volksfest', ticket:'https://erlangen.de/aktuelles/stadtteil-kirchweihen', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bus aus Erlangen Zentrum', parking:'Ortsparkplätze'},
  {cat:'volksfest', name:'Kirchweih Eschenau', loc:'Eckental – Eschenau', start:'2026-08-21', end:'2026-08-24', free:true, desc:'Eine von sieben Eckentaler Ortsteil-Kirchweihen mit Bewirtung durch die örtlichen Vereine.', genre:'Kirchweih / Volksfest', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'S-Bahn S1 bis Eschenau', parking:'Ortsparkplätze'},
  {cat:'volksfest', name:'Kirchweih Dettelbach', loc:'Dettelbach – Altstadt und Höfe', start:'2026-08-28', end:'2026-08-31', free:true, desc:'Wein-Kirchweih: Gastronomen und Winzer laden in ihre Höfe ein – heimeliges Ambiente mit Frankenwein, Kulinarik und Musik.', genre:'Kirchweih / Wein', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn bis Dettelbach Bahnhof', parking:'Parkplätze am Ortsrand'},
  {cat:'volksfest', name:'Kirchweih Eltersdorf', loc:'Erlangen – Eltersdorf, Egidienplatz', start:'2026-09-04', end:'2026-09-07', free:true, desc:'Kirchweih mit Fahrgeschäften und Festzelt. Höhepunkt ist der Kerwas-Umzug der Kerwasburschen am Sonntagmittag.', genre:'Kirchweih / Volksfest', ticket:'https://erlangen.de/aktuelles/stadtteil-kirchweihen', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'S-Bahn bis Eltersdorf', parking:'Ortsparkplätze'},
  {cat:'volksfest', name:'Kirchweih Dechsendorf', loc:'Erlangen – Dechsendorfer Platz', start:'2026-09-04', end:'2026-09-07', free:true, desc:'Dorfkirchweih am Dechsendorfer Platz mit Festzelt, Spicker-Stand und Kinderkarussell.', genre:'Kirchweih / Volksfest', ticket:'https://erlangen.de/aktuelles/stadtteil-kirchweihen', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bus aus Erlangen Zentrum', parking:'Ortsparkplätze'},
  {cat:'volksfest', name:'Kirchweih Benzendorf', loc:'Eckental – Benzendorf', start:'2026-09-04', end:'2026-09-08', free:true, desc:'Kleine, dörflich geprägte Wirtshaus-Kerwa im Markt Eckental.', genre:'Kirchweih / Volksfest', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'S-Bahn S1 Richtung Gräfenberg', parking:'Ortsparkplätze'},
  {cat:'volksfest', name:'Kirchweih Hüttendorf', loc:'Erlangen – Hüttendorf, Eichenlohe', start:'2026-09-11', end:'2026-09-14', free:true, desc:'Familiäre Stadtteilkirchweih mit Schießbude, Schaukel und Bewirtung im Gasthaus Krone.', genre:'Kirchweih / Volksfest', ticket:'https://erlangen.de/aktuelles/stadtteil-kirchweihen', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bus aus Erlangen Zentrum', parking:'Ortsparkplätze'},
  {cat:'volksfest', name:'Kirchweih Frauenaurach', loc:'Erlangen – Frauenaurach, Herdegenplatz', start:'2026-09-25', end:'2026-09-28', free:true, desc:'Kerwa im Herzen von Frauenaurach mit Kirchweihbaum-Aufstellen am Samstag sowie Gottesdienst und Frühschoppen am Sonntag.', genre:'Kirchweih / Volksfest', ticket:'https://erlangen.de/aktuelles/stadtteil-kirchweihen', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bus aus Erlangen Zentrum', parking:'Ortsparkplätze'},
  {cat:'volksfest', name:'Kirchweih Altdorf – Die Rußige Aidt', loc:'Altdorf bei Nürnberg', start:'2026-09-26', end:'2026-09-27', free:true, desc:'Traditionelle Nachkirchweih in Altdorf bei Nürnberg mit dem alten Brauch der „Rußigen Aidt".', genre:'Kirchweih / Volksfest', ticket:'https://urlaub.nuernberger-land.de', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'S-Bahn S1 bis Altdorf', parking:'Ortsparkplätze'},
  {cat:'volksfest', name:'Kirchweih Forth', loc:'Eckental – Forth', start:'2026-10-02', end:'2026-10-05', free:true, desc:'Eine der größeren Eckentaler Kirchweihen mit Festzelt und Tanzbühne.', genre:'Kirchweih / Volksfest', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'S-Bahn S1 bis Forth', parking:'Ortsparkplätze'},
  {cat:'volksfest', name:'Kirchweih Herpersdorf', loc:'Eckental – Herpersdorf', start:'2026-10-09', end:'2026-10-12', free:true, desc:'Abschluss des Eckentaler Kerwa-Reigens 2026 – dörfliche Wirtshaus-Kirchweih.', genre:'Kirchweih / Volksfest', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'S-Bahn S1 Richtung Gräfenberg', parking:'Ortsparkplätze'},
  // ── Weinfeste Franken ──
  {cat:'weinfest', name:'Kirchenburgweinfest Hüttenheim', loc:'Willanzheim – Hüttenheim, Kirchenburg', start:'2026-08-21', end:'2026-08-23', free:true, desc:'Eines der schönsten Weinfeste Frankens in der historischen Kirchenburganlage – Blasmusik und Frankenwein zwischen alten Burgmauern.', genre:'Weinfest', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Auto empfohlen – ländliche Lage bei Kitzingen', parking:'Ortsparkplätze'},
  {cat:'weinfest', name:'Hoffest Weingut Michael Fröhlich', loc:'Volkach – Escherndorf', start:'2026-08-21', end:'2026-08-23', free:true, desc:'Hofweinfest an der Mainschleife ab 15 Uhr mit eigenen Weinen und Livemusik von Cräcker Light, Melly & Clyde und Meeblech.', genre:'Weinfest / Livemusik', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Auto empfohlen – Mainschleife', parking:'Ortsparkplätze Escherndorf'},
  {cat:'weinfest', name:'Fränkisches Sommernachtsmärchen', loc:'Michelau i. Steigerwald', start:'2026-08-21', end:'2026-08-22', free:true, desc:'Stimmungsvolles Weinfest direkt in den Weinbergen im Steigerwald.', genre:'Weinfest', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Auto empfohlen – Steigerwald', parking:'Ortsparkplätze'},
  {cat:'weinfest', name:'51. Grombühler Straßenweinfest', loc:'Würzburg – Grombühl, Wagnerplatz', start:'2026-08-28', end:'2026-08-31', free:true, desc:'Ältestes Straßenweinfest Unterfrankens (seit 1973) unter alten Bäumen am Wagnerplatz – Frankenweine und Livemusik.', genre:'Weinfest / Straßenfest', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Straßenbahn Richtung Grombühl', parking:'Parkhäuser Innenstadt Würzburg'},
  {cat:'weinfest', name:'Wein am Schloss Tauberbischofsheim', loc:'Tauberbischofsheim – Kurmainzisches Schloss', start:'2026-09-04', end:'2026-09-05', free:true, desc:'Weinfest vor der Schlosskulisse mit regionalen und internationalen Weinen und Live-Musik.', genre:'Weinfest', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn bis Tauberbischofsheim', parking:'Innenstadt Parkplätze'},
  {cat:'weinfest', name:'Mainschleifen Weintasting Volkach', loc:'Volkach – Marktplatz', start:'2026-09-19', end:'2026-09-20', free:false, desc:'Freiluft-Vinothek mit knapp 100 Frankenweinen von rund 50 Winzern an Verkostungsstationen auf dem Marktplatz. Bei Regen im historischen Rathaus.', genre:'Weinfest / Verkostung', ticket:'', outdoor:true, ageMin:18, price:'Verkostungspaket erforderlich', oepnv:'Bus bis Volkach', parking:'Parkplätze am Ortsrand'},
  {cat:'weinfest', name:'51. Escherndorfer Weinherbst', loc:'Volkach – Festhalle Escherndorf', start:'2026-10-03', end:'2026-11-07', free:true, desc:'An fünf Samstagen in Folge (3./10./17./24./31.10. und 7.11.) Livemusik und Escherndorfer Spitzenweine. Für Tagesgäste ist der Eintritt frei.', genre:'Weinfest / Livemusik', ticket:'', outdoor:false, ageMin:0, price:'Eintritt frei für Tagesgäste', oepnv:'Auto empfohlen – Mainschleife', parking:'Ortsparkplätze Escherndorf'},
  {cat:'weinfest', name:'Einholen der Letzten Fuhre – Iphofen', loc:'Iphofen – Marktplatz', start:'2026-10-10', end:'2026-10-10', free:true, desc:'Winzerumzug mit festlich geschmückten Wägen und Musikverein zum Ende der Weinlese, danach Wein und fränkische Spezialitäten am Marktplatz.', genre:'Weinfest / Tradition', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn bis Iphofen', parking:'Parkplätze am Ortsrand'},
  {cat:'weinfest', name:'Einholen der Letzten Fuhre – Dettelbach', loc:'Dettelbach – vor der Stadtpfarrkirche', start:'2026-10-10', end:'2026-10-10', free:true, desc:'Traditionelles Fest zum Abschluss der Weinlese in der Dettelbacher Innenstadt.', genre:'Weinfest / Tradition', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn bis Dettelbach Bahnhof', parking:'Parkplätze am Ortsrand'},
  {cat:'weinfest', name:'Beats & Grapes im Staatlichen Hofkeller', loc:'Würzburg – Staatlicher Hofkeller (Residenz)', start:'2026-11-20', end:'2026-11-20', free:false, desc:'Weinparty im historischen Staatsweinkeller unter der Residenz am Vorabend der Nacht der offenen Weinkeller, mit DJ Tim Timsen und Club-Atmosphäre.', genre:'Weinfest / DJ / Club', ticket:'', outdoor:false, ageMin:18, price:'15 €', oepnv:'Straßenbahn bis Residenzplatz', parking:'Parkhäuser Innenstadt Würzburg'},
  // ── Konzerte, Festivals & Comedy ──
  {cat:'festival', name:'Beyond the Black', loc:'Nürnberg – Löwensaal', start:'2026-09-17', end:'2026-09-17', free:false, desc:'Die deutsche Symphonic-Metal-Band um Sängerin Jennifer Haben live im Löwensaal Nürnberg.', genre:'Symphonic Metal', ticket:'https://www.loewensaal.com/konzert-details/beyond-the-black-2026-09-17.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'sonstige', name:'Paula Lambert – Finde dich gut, sonst findet dich keiner', loc:'Fürth – Stadthalle', start:'2026-10-09', end:'2026-10-09', free:false, desc:'Comedy-Soloprogramm der Autorin und TV-Moderatorin Paula Lambert in der Stadthalle Fürth.', genre:'Comedy', ticket:'https://www.stadthalle-fuerth.de/veranstaltungsuebersicht', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'U1 Stadthalle Fürth', parking:'Parkhaus Stadthalle'},
  {cat:'festival', name:'Danko Jones', loc:'Nürnberg – Löwensaal', start:'2026-10-13', end:'2026-10-13', free:false, desc:'Das kanadische Hardrock-Trio mit energiegeladener Live-Show im Löwensaal Nürnberg.', genre:'Hard Rock', ticket:'https://www.loewensaal.com/konzert-details/danko-jones-2026-10-13.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Giant Rooks – If Heaven Exists, This Might Be It Tour 2026', loc:'Nürnberg – Kia Metropol Arena', start:'2026-10-14', end:'2026-10-14', free:false, desc:'Eine der erfolgreichsten deutschen Indie-Pop-Bands der letzten Jahre live (Korrektur KW 37: Location laut Universal Music, Eventim und E-Werk-eigener Programmseite Kia Metropol Arena Nürnberg, nicht E-Werk Erlangen).', genre:'Indie / Alternative Pop', ticket:'https://www.universal-music.de/giant-rooks/termine/14-10-2026-kia-metropol-arena-nuernberg-20-00-1162704', outdoor:false, ageMin:16, price:'ab 66,95 €', oepnv:'U-Bahn Frankenstadion/Messe', parking:'Vorhanden an der Kia Metropol Arena'},
  {cat:'festival', name:'badmómzjay', loc:'Nürnberg – Löwensaal', start:'2026-10-15', end:'2026-10-15', free:false, desc:'Eine der bekanntesten deutschen Rapperinnen live im Löwensaal Nürnberg.', genre:'Deutschrap / HipHop', ticket:'https://www.loewensaal.com/konzert-details/badmomzjay-2026-10-15.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Glenn Miller Orchestra – directed by Uli Plettendorff', loc:'Fürth – Stadthalle', start:'2026-10-15', end:'2026-10-15', free:false, desc:'Big-Band-Klassiker der Swing-Ära im Original-Sound in der Stadthalle Fürth.', genre:'Swing / Big Band', ticket:'https://www.stadthalle-fuerth.de/veranstaltungsuebersicht', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'U1 Stadthalle Fürth', parking:'Parkhaus Stadthalle'},
  {cat:'festival', name:'The Sweet', loc:'Nürnberg – Löwensaal', start:'2026-10-16', end:'2026-10-16', free:false, desc:'Glamrock-Legende mit Hits wie „Ballroom Blitz" und „Fox on the Run" live im Löwensaal.', genre:'Glam Rock', ticket:'https://www.loewensaal.com/konzert-details/the-sweet-2026-10-16.html', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Ina Müller und Band – Die 6.0 Tour', loc:'Bamberg – brose Arena', start:'2026-10-17', end:'2026-10-17', free:false, desc:'Die Entertainerin und Sängerin mit Band und viel norddeutschem Humor in der brose Arena Bamberg.', genre:'Pop / Chanson / Entertainment', ticket:'https://www.brose-arena.de/events/ina-mueller-und-band-die-6-0-tour/', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bahn bis Bamberg Hbf', parking:'Parkplätze an der Arena'},
  {cat:'festival', name:'WAHNSINN! Die Show – Die beste Wolfgang Petry Party', loc:'Bamberg – brose Arena', start:'2026-10-24', end:'2026-10-24', free:false, desc:'Mitsing-Show mit den größten Wolfgang-Petry-Hits in der brose Arena Bamberg.', genre:'Schlager / Party', ticket:'https://www.brose-arena.de/events/wahnsinn-die-show/', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bahn bis Bamberg Hbf', parking:'Parkplätze an der Arena'},
  {cat:'festival', name:'90s Super Show', loc:'Nürnberg – PSD Bank Nürnberg ARENA', start:'2026-10-31', end:'2026-10-31', free:false, desc:'Große Arena-Show mit Dance- und Eurodance-Hits der 90er.', genre:'90s / Dance', ticket:'https://www.psd-nuernberg-arena.de/events/90s-super-show/', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'U1 bis Messe', parking:'Parkplätze Messegelände'},
  {cat:'festival', name:'MINE – KILLER Tour 2026', loc:'Erlangen – E-Werk (Saal)', start:'2026-11-06', end:'2026-11-06', free:false, desc:'Die deutsche Pop-Künstlerin und Produzentin MINE mit neuem Album live im E-Werk Erlangen.', genre:'Pop / Electronic', ticket:'https://www.e-werk.de/programm/konzerte/', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bahn bis Erlangen Hbf', parking:'Parkhäuser Innenstadt Erlangen'},
  {cat:'festival', name:'Campaign for Musical Destruction (u. a. Napalm Death)', loc:'Nürnberg – Löwensaal', start:'2026-11-06', end:'2026-11-06', free:false, desc:'Extreme-Metal-Package-Tour mit den Grindcore-Pionieren Napalm Death im Löwensaal Nürnberg.', genre:'Grindcore / Death Metal', ticket:'https://www.loewensaal.com/konzert-details/campaign-for-musical-destruction-2026-11-06.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'The Sisters of Mercy', loc:'Nürnberg – Löwensaal', start:'2026-11-07', end:'2026-11-07', free:false, desc:'Die Gothic-Rock-Ikonen aus Leeds live im Löwensaal Nürnberg. Hinweis: laut Veranstalter ausverkauft.', genre:'Gothic Rock', ticket:'https://www.loewensaal.com/konzert-details/the-sisters-of-mercy-2026-11-07.html', outdoor:false, ageMin:16, price:'Ausverkauft', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'sonstige', name:'Helmut A. Binser', loc:'Nürnberg – Löwensaal', start:'2026-11-08', end:'2026-11-08', free:false, desc:'Bayerischer Kabarettist mit Quetschn und Mundart-Humor im Löwensaal Nürnberg. Hinweis: laut Veranstalter ausverkauft.', genre:'Kabarett', ticket:'https://www.loewensaal.com/konzert-details/helmut-a-binser-2026-11-08.html', outdoor:false, ageMin:0, price:'Ausverkauft', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Dicht & Ergreifend – Zweiländerdreieck Tour 2026/27', loc:'Nürnberg – Löwensaal', start:'2026-11-13', end:'2026-11-13', free:false, desc:'Das bayerische Mundart-Rap-Duo aus Niederbayern live im Löwensaal Nürnberg.', genre:'Mundart-Rap', ticket:'https://www.loewensaal.com/konzert-details/dicht-ergreifend-2026-11-13.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'sonstige', name:'Osan Yaran – Wollen wir beginnen?', loc:'Fürth – Stadthalle', start:'2026-11-19', end:'2026-11-19', free:false, desc:'Comedy-Programm des Berliner Stand-up-Comedians Osan Yaran in der Stadthalle Fürth.', genre:'Comedy', ticket:'https://www.stadthalle-fuerth.de/veranstaltungsuebersicht', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'U1 Stadthalle Fürth', parking:'Parkhaus Stadthalle'},
  {cat:'festival', name:'Fäaschtbänkler', loc:'Bamberg – brose Arena', start:'2026-11-20', end:'2026-11-20', free:false, desc:'Partyband aus Vorarlberg zwischen Blasmusik, Rock und Schlager in der brose Arena Bamberg.', genre:'Party / Volksmusik-Crossover', ticket:'https://www.brose-arena.de/events/faeaschtbaenkler/', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bahn bis Bamberg Hbf', parking:'Parkplätze an der Arena'},
  {cat:'festival', name:'Dominik Eulberg', loc:'Nürnberg – Löwensaal', start:'2026-11-20', end:'2026-11-20', free:false, desc:'Techno-Produzent und Diplom-Biologe mit naturinspiriertem Live-Set im Löwensaal Nürnberg.', genre:'Techno / Electronic', ticket:'https://www.loewensaal.com/konzert-details/dominik-eulberg-2026-11-20.html', outdoor:false, ageMin:18, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Unheilig + Alexander Eder – Liebe, Glaube, Monster Tour', loc:'Bamberg – brose Arena', start:'2026-11-21', end:'2026-11-21', free:false, desc:'Der Graf und Unheilig zurück auf großer Arena-Tour, Support: Alexander Eder.', genre:'Deutschrock / Pop', ticket:'https://www.brose-arena.de/events/unheilig/', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bahn bis Bamberg Hbf', parking:'Parkplätze an der Arena'},
  {cat:'sonstige', name:'Michael Hatzius – Echsklusiv', loc:'Fürth – Stadthalle', start:'2026-11-22', end:'2026-11-22', free:false, desc:'Puppenspiel-Comedy mit „Die Echse" und Ensemble in der Stadthalle Fürth.', genre:'Comedy / Kabarett', ticket:'https://www.stadthalle-fuerth.de/veranstaltungsuebersicht', outdoor:false, ageMin:8, price:'Tickets im Vorverkauf', oepnv:'U1 Stadthalle Fürth', parking:'Parkhaus Stadthalle'},
  {cat:'festival', name:'Ikkimel – Poppstar', loc:'Bamberg – brose Arena', start:'2026-11-24', end:'2026-11-24', free:false, desc:'Die Berliner Rapperin Ikkimel, einer der lautesten Newcomer-Acts der Szene, live in Bamberg.', genre:'Deutschrap / Hyperpop', ticket:'https://www.brose-arena.de/events/ikkimel/', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bahn bis Bamberg Hbf', parking:'Parkplätze an der Arena'},
  {cat:'festival', name:'dArtagnan', loc:'Nürnberg – Löwensaal', start:'2026-11-28', end:'2026-11-28', free:false, desc:'Die deutsche Musketier-Rockband mit Mantel-und-Degen-Show im Löwensaal Nürnberg.', genre:'Folk Rock', ticket:'https://www.loewensaal.com/konzert-details/dartagnan-2026-11-28.html', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  // ── Russian Events ──
  {cat:'russian', name:'Jony – Konzert München', loc:'München', start:'2026-09-17', end:'2026-09-17', free:false, desc:'Konzert des russischsprachigen Pop- und R&B-Sängers Jony in München, 20 Uhr.', genre:'Pop / R&B', ticket:'https://afishamira.com/event/pevets-jony-v-myunhene/', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'Шанель против Рубинштейн – Варнава & Устинова', loc:'München', start:'2026-09-20', end:'2026-09-20', free:false, desc:'Russischsprachiges Theaterstück über die Rivalität von Coco Chanel und Helena Rubinstein mit Ekaterina Varnava und Svetlana Ustinova, 18 Uhr.', genre:'Theater', ticket:'https://afishamira.com/event/ekaterina-varnava-i-svetlana-ustinova-v-myunhene-spektakl-shanel-protiv-rubinshtejn/', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'АИГЕЛ (AIGEL) – Konzert München', loc:'München', start:'2026-09-27', end:'2026-09-27', free:false, desc:'Konzert des russisch-tatarischen Elektro- und Poetry-Duos AIGEL in München, 20 Uhr.', genre:'Elektro / Indie', ticket:'https://afishamira.com/event/gruppa-aigel-v-myunhene/', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'Рита Дакота – Konzert München', loc:'München', start:'2026-10-13', end:'2026-10-13', free:false, desc:'Konzert der russischsprachigen Singer-Songwriterin Rita Dakota in München, 20 Uhr.', genre:'Pop / Singer-Songwriter', ticket:'https://afishamira.com/event/rita-dakota-v-myunhene/', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'Ирина Приходько – Stand-up München', loc:'München', start:'2026-10-23', end:'2026-10-23', free:false, desc:'Stand-up-Abend der Komikerin Irina Prichodko in München, 20 Uhr – einen Tag nach dem Nürnberger Auftritt.', genre:'Stand-up', ticket:'https://afishamira.com/event/komik-irina-prihodko-v-myunhene/', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'Моргенштерн – Mercury Tour', loc:'München', start:'2026-11-05', end:'2026-11-05', free:false, desc:'Konzert des russischsprachigen Rap-Stars Morgenshtern im Rahmen der Mercury Tour, 20 Uhr.', genre:'HipHop / Rap', ticket:'https://afishamira.com/event/morgenshtern-v-myunhene-mercury-tour/', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'FIRE of GEORGIA – Tanzshow', loc:'München', start:'2026-11-18', end:'2026-11-18', free:false, desc:'Georgisches Nationaltanz-Ensemble mit temporeicher Show aus traditionellen Tänzen, Kostümen und Live-Musik, 20 Uhr.', genre:'Tanzshow / Folklore', ticket:'https://afishamira.com/event/tantsevalnoe-shou-fire-of-georgia-v-myunhene/', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'Little Big – Konzert München', loc:'München', start:'2026-11-27', end:'2026-11-27', free:false, desc:'Konzert der russischen Rave- und Punk-Pop-Band Little Big in München, 20 Uhr.', genre:'Rave / Punk-Pop', ticket:'https://afishamira.com/event/gruppa-little-big-v-myunhene/', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'Ilya Akselrod – Stand-up München', loc:'München', start:'2026-11-28', end:'2026-11-28', free:false, desc:'Stand-up-Programm von Ilya Akselrod in München, 20 Uhr – am Tag nach dem Nürnberger Auftritt.', genre:'Stand-up', ticket:'https://afishamira.com/event/komik-ilya-akselrod-v-myunhene/', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'Балет «Лебединое озеро» (Karlsfeld)', loc:'Karlsfeld', start:'2026-12-11', end:'2026-12-11', free:false, desc:'Klassische Schwanensee-Aufführung im Großraum München, 19 Uhr.', genre:'Ballett', ticket:'https://afishamira.com/event/balet-lebedinoe-ozero-v-karlsfelde/', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'S-Bahn S2 bis Karlsfeld', parking:'Parkplätze vor Ort'},

  // ─── NEU HINZUGEFÜGT (KW 35 · 2026-08-24) ───────────────────────────────
  {cat:'sonstige', name:'Jan Preuß – Baueckenverbot', loc:'Nürnberg – Löwensaal', start:'2026-09-20', end:'2026-09-20', free:false, desc:'Der Kabarettist Jan Preuß mit seinem Programm „Baueckenverbot" im Löwensaal, 19 Uhr.', genre:'Kabarett / Comedy', ticket:'https://www.loewensaal.com/konzert-details/jan-preuss-3.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'sonstige', name:'Eva Karl Faltermeier – Ding Dong', loc:'Nürnberg – Löwensaal', start:'2026-10-01', end:'2026-10-01', free:false, desc:'Bayerisches Kabarett mit Eva Karl Faltermeier und ihrem Programm „Ding Dong", 19:30 Uhr.', genre:'Kabarett', ticket:'https://www.loewensaal.com/konzert-details/eva-karl-faltermeier-2026-10-01.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'DAME – Der Weg ist das Ziel 2.0', loc:'Nürnberg – Löwensaal', start:'2026-10-21', end:'2026-10-21', free:false, desc:'Der österreichische Rapper DAME live im Löwensaal, präsentiert von Cold Life Entertainment.', genre:'Deutschrap', ticket:'https://www.loewensaal.com/konzert-details/dame-2026-10-21.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'sonstige', name:'Manuel Rubey & Simon Schwarz – Das Restaurant', loc:'Nürnberg – Löwensaal', start:'2026-11-11', end:'2026-11-11', free:false, desc:'Österreichisches Kabarett-Duo mit dem gemeinsamen Programm „Das Restaurant".', genre:'Kabarett', ticket:'https://www.loewensaal.com/konzert-details/manuel-rubey-simon-schwarz.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Morpheuz – Leeres Herz Tour 2026', loc:'Nürnberg – Löwensaal', start:'2026-11-17', end:'2026-11-17', free:false, desc:'Morpheuz auf „Leeres Herz"-Tour – das Konzert wurde in den Löwensaal verlegt.', genre:'Deutschrap / Emo-Rap', ticket:'https://www.loewensaal.com/konzert-details/morpheuz-2026-11-17.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Swiss & Die Andern – Punk lebt Tour 2026', loc:'Nürnberg – Löwensaal', start:'2026-11-21', end:'2026-11-21', free:false, desc:'Punk-Rap-Krawall aus Hamburg, Support: Moonkid. Veranstaltung ist ausverkauft.', genre:'Punk / Rap', ticket:'https://www.loewensaal.com/konzert-details/swiss-die-andern-2026-11-21.html', outdoor:false, ageMin:16, price:'Ausverkauft', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'sonstige', name:'Der Physiopath – Machen Sie sich bitte frei!', loc:'Nürnberg – Löwensaal', start:'2026-11-29', end:'2026-11-29', free:false, desc:'Comedy-Programm rund um Praxisalltag und Patienten, 19 Uhr.', genre:'Comedy', ticket:'https://www.loewensaal.com/konzert-details/der-physiopath.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Glueboys', loc:'Nürnberg – Löwensaal', start:'2026-11-30', end:'2026-11-30', free:false, desc:'Die Glueboys live im Löwensaal, präsentiert von District Live.', genre:'Indie / Pop', ticket:'https://www.loewensaal.com/konzert-details/glueboys-2026-11-30.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Zebrahead', loc:'Nürnberg – Löwensaal', start:'2026-12-01', end:'2026-12-01', free:false, desc:'US-Punkrock-Institution Zebrahead auf Tour, special guest Punkrock Factory.', genre:'Punkrock', ticket:'https://www.loewensaal.com/konzert-details/zebrahead-2026-12-01.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'sonstige', name:'Magie der Travestie', loc:'Nürnberg – Löwensaal', start:'2026-12-04', end:'2026-12-04', free:false, desc:'Glamouröse Travestie-Show mit Gesang, Kostümen und Comedy.', genre:'Travestie / Show', ticket:'https://www.loewensaal.com/konzert-details/magie-der-travestie-2026-12-04.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Sondaschule – Wir Bleiben Wach Tour 2026', loc:'Nürnberg – Löwensaal', start:'2026-12-08', end:'2026-12-08', free:false, desc:'Ska-Punk aus Mülheim, präsentiert von Kingstar.', genre:'Ska-Punk', ticket:'https://www.loewensaal.com/konzert-details/sondaschule-2026-12-08.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'sonstige', name:'Jan van Weyde', loc:'Nürnberg – Löwensaal', start:'2026-12-10', end:'2026-12-10', free:false, desc:'Neues Stand-up-Programm des Comedians Jan van Weyde.', genre:'Comedy', ticket:'https://www.loewensaal.com/konzert-details/jan-van-weyde-3.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Mighty Oaks', loc:'Nürnberg – Löwensaal', start:'2026-12-12', end:'2026-12-12', free:false, desc:'Folk-Indie-Trio Mighty Oaks auf Tour 2026, presented by Goodlive Artists.', genre:'Folk / Indie', ticket:'https://www.loewensaal.com/konzert-details/mighty-oaks-2026-12-12.html', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'One Violin Orchestra', loc:'Nürnberg – Löwensaal', start:'2026-12-19', end:'2026-12-19', free:false, desc:'Ein Geiger, viele Klangwelten – Crossover-Show zwischen Klassik und Elektronik.', genre:'Klassik-Crossover', ticket:'https://www.loewensaal.com/konzert-details/one-violin-orchestra-2026-12-19.html', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'LaFee – 20 Jahre Virus', loc:'Nürnberg – Löwensaal', start:'2026-12-28', end:'2026-12-28', free:false, desc:'Jubiläumstour zum 20-jährigen Bestehen des Albums „Virus". Veranstaltung ist ausverkauft.', genre:'Pop / Rock', ticket:'https://www.loewensaal.com/konzert-details/lafee-2026-12-28.html', outdoor:false, ageMin:0, price:'Ausverkauft', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'sonstige', name:'Sebastian Reich & Amanda – Purer Zufall', loc:'Nürnberg – Löwensaal', start:'2027-01-08', end:'2027-01-08', free:false, desc:'Bauchredner Sebastian Reich mit Nilpferddame Amanda und dem Programm „Purer Zufall".', genre:'Puppen-Comedy', ticket:'https://www.loewensaal.com/konzert-details/sebastian-reich-amanda-2027-01-08.html', outdoor:false, ageMin:8, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Haaland936 – SAN Tour 2026/2027', loc:'Nürnberg – Löwensaal', start:'2027-01-10', end:'2027-01-10', free:false, desc:'Newcomer-Rapper Haaland936 auf SAN-Tour im Löwensaal.', genre:'Deutschrap', ticket:'https://www.eventim.de/event/haaland936-san-tour-loewensaal-21722198/', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Queenz of Piano – Piano Cosmos Tour 2027', loc:'Nürnberg – Löwensaal', start:'2027-01-14', end:'2027-01-14', free:false, desc:'Zwei Pianistinnen zwischen Klassik, Pop und Comedy auf „Piano Cosmos"-Tour.', genre:'Klavier-Show', ticket:'https://www.loewensaal.com/konzert-details/queenz-of-piano-2027-01-14.html', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Gestört aber GeiL – Musik vom und fürs Herz Tour 2027', loc:'Nürnberg – Löwensaal', start:'2027-01-22', end:'2027-01-22', free:false, desc:'Das Dance-Duo Gestört aber GeiL live im Löwensaal.', genre:'Dance / Electro', ticket:'https://www.loewensaal.com/konzert-details/gestoert-aber-geil-2027-01-22.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'sonstige', name:'Maxi Gstettenbauer – Komplett absurd', loc:'Nürnberg – Löwensaal', start:'2027-02-04', end:'2027-02-04', free:false, desc:'Stand-up-Comedy mit Maxi Gstettenbauer und seinem Programm „Komplett absurd".', genre:'Comedy', ticket:'https://www.loewensaal.com/konzert-details/maxi-gstettenbauer-2027-02-04.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'sonstige', name:'Dr. Pop', loc:'Nürnberg – Löwensaal', start:'2027-02-11', end:'2027-02-11', free:false, desc:'Musikwissenschaftler und Comedian Dr. Pop erklärt Hits zum Mitlachen.', genre:'Musik-Comedy', ticket:'https://www.loewensaal.com/konzert-details/dr-pop-2027-02-11.html', outdoor:false, ageMin:12, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'sonstige', name:'Ines Procter – I don’t kehr!', loc:'Nürnberg – Löwensaal', start:'2027-02-19', end:'2027-02-19', free:false, desc:'Fränkisches Kabarett mit Ines Procter und dem Programm „I don’t kehr!".', genre:'Kabarett', ticket:'https://www.loewensaal.com/konzert-details/ines-procter-2027-02-19.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Forced to Mode – Ultra: The Missing Piece Tour 2027', loc:'Nürnberg – Löwensaal', start:'2027-03-04', end:'2027-03-04', free:false, desc:'Depeche-Mode-Tribute-Band Forced to Mode, Special Guest: KY.', genre:'Synthpop / Tribute', ticket:'https://www.loewensaal.com/konzert-details/forced-to-mode-2027-03-04.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'The Halo Effect + Lacuna Coil', loc:'Nürnberg – Löwensaal', start:'2027-03-07', end:'2027-03-07', free:false, desc:'Co-Headliner-Tour 2027 mit Omnium Gatherum als Support, 19 Uhr.', genre:'Melodic Death Metal', ticket:'https://www.loewensaal.com/konzert-details/the-halo-effect-lacuna-coil-2027-03-07.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Josh. – Vertikal Tour 2027', loc:'Nürnberg – Löwensaal', start:'2027-04-18', end:'2027-04-18', free:false, desc:'Der österreichische Singer-Songwriter Josh. auf „Vertikal"-Tour.', genre:'Austropop', ticket:'https://www.loewensaal.com/konzert-details/josh-2027-04-18.html', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'sonstige', name:'Willy Astor – Reimart und Lachkunde', loc:'Nürnberg – Löwensaal', start:'2027-04-24', end:'2027-04-24', free:false, desc:'Wortakrobat Willy Astor mit „Reimart und Lachkunde" im Löwensaal.', genre:'Kabarett / Wortspiel', ticket:'https://www.loewensaal.com/konzert-details/willy-astor-2027-04-24.html', outdoor:false, ageMin:12, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Rage & Sonata Arctica', loc:'Nürnberg – Löwensaal', start:'2027-04-29', end:'2027-04-29', free:false, desc:'Co-Headliner-Tour zweier Metal-Institutionen, Einlass ab 18:45 Uhr.', genre:'Metal', ticket:'https://www.loewensaal.com/konzert-details/rage-sonata-arctica-2027-04-29.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'1986zig – Ich komme nach Hause Tour', loc:'Nürnberg – Löwensaal', start:'2027-04-30', end:'2027-04-30', free:false, desc:'Neuer Termin der verschobenen Tour (ursprünglich 29.09.2026).', genre:'Deutschpop', ticket:'https://www.loewensaal.com/konzert-details/1986zig-2027-04-30.html', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'festival', name:'Frontm3n – One For All Tour 2027', loc:'Nürnberg – Löwensaal', start:'2027-05-09', end:'2027-05-09', free:false, desc:'Drei Stimmen, drei Gitarren – Hits von 10cc, Sweet und The Hollies.', genre:'Rock / Pop', ticket:'https://www.loewensaal.com/konzert-details/frontm3n-2027-05-09.html', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'sonstige', name:'Helmut A. Binser – BUMM (Zusatztermin 2027)', loc:'Nürnberg – Löwensaal', start:'2027-05-14', end:'2027-05-14', free:false, desc:'Zusatztermin des ausverkauften Programms „BUMM" von Helmut A. Binser.', genre:'Kabarett', ticket:'https://www.loewensaal.com/konzert-details/helmut-a-binser-2027-05-14.html', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'sonstige', name:'Katrin Iskam – Gärtnern ohne viel Geschiss', loc:'Nürnberg – Löwensaal', start:'2027-05-16', end:'2027-05-16', free:false, desc:'Comedy-Programm rund um Garten, Beet und Bio-Ehrgeiz.', genre:'Kabarett', ticket:'https://www.loewensaal.com/konzert-details/katrin-iskam-2027-05-16.html', outdoor:false, ageMin:12, price:'Tickets im Vorverkauf', oepnv:'Bus/Tram Wodanstraße', parking:'Parkplätze vor Ort begrenzt'},
  {cat:'afterwork', name:'Retro – Erwachsen durch die Nacht', loc:'Nürnberg – PARKS Stadtpark', start:'2026-10-03', end:'2026-10-03', free:false, desc:'Retro-Partynacht im PARKS mit den Hits von damals, 21–3 Uhr.', genre:'80er / 90er / 2000er', ticket:'https://www.parks-nuernberg.de/events/retro-erwachsen-durch-die-nacht/', outdoor:false, ageMin:18, price:'Tickets im Vorverkauf', oepnv:'Bus Berliner Platz / U2 Rathenauplatz', parking:'Parkplätze am Stadtpark'},
  {cat:'afterwork', name:'QUEER JUNGLE Halloween Ball', loc:'Nürnberg – PARKS Stadtpark', start:'2026-10-30', end:'2026-10-30', free:false, desc:'Queerer Halloween-Ball im PARKS mit Kostümen, Show und DJs, 23–4 Uhr.', genre:'Queer Party / Halloween', ticket:'https://www.parks-nuernberg.de/events/queer-jungle-halloween-ball-2026/', outdoor:false, ageMin:18, price:'Tickets im Vorverkauf', oepnv:'Bus Berliner Platz / U2 Rathenauplatz', parking:'Parkplätze am Stadtpark'},
  {cat:'afterwork', name:'NASTY pres. Jil Tanner', loc:'Nürnberg – Die Rakete', start:'2026-09-05', end:'2026-09-05', free:false, desc:'Clubnacht der NASTY-Reihe in der Rakete mit Jil Tanner (MOOD / K N KT).', genre:'Techno / House', ticket:'https://dierakete.com/programm/', outdoor:false, ageMin:18, price:'Vorverkauf / Abendkasse', oepnv:'U1 Bärenschanze / Nachtbus', parking:'Begrenzt – ÖPNV empfohlen'},
  {cat:'afterwork', name:'16 Jahre WHY SO SERIOUS', loc:'Nürnberg – Die Rakete', start:'2026-09-19', end:'2026-09-19', free:false, desc:'Jubiläumsnacht mit Dirty Doering, Avocado und Gunnar Stiller.', genre:'Techno / Electronica', ticket:'https://dierakete.com/programm/', outdoor:false, ageMin:18, price:'Vorverkauf / Abendkasse', oepnv:'U1 Bärenschanze / Nachtbus', parking:'Begrenzt – ÖPNV empfohlen'},
  {cat:'afterwork', name:'FUF Family x Praerie Festival', loc:'Nürnberg – Die Rakete', start:'2026-09-25', end:'2026-09-25', free:false, desc:'Kooperationsnacht der FUF Family mit dem Praerie Festival.', genre:'Elektro / Techno', ticket:'https://dierakete.com/programm/', outdoor:false, ageMin:18, price:'Vorverkauf / Abendkasse', oepnv:'U1 Bärenschanze / Nachtbus', parking:'Begrenzt – ÖPNV empfohlen'},
  {cat:'afterwork', name:'Schranz is back', loc:'Nürnberg – Die Rakete', start:'2026-10-30', end:'2026-10-30', free:false, desc:'Harte Beats und Schranz-Revival in der Rakete.', genre:'Schranz / Hardtechno', ticket:'https://dierakete.com/programm/', outdoor:false, ageMin:18, price:'Vorverkauf / Abendkasse', oepnv:'U1 Bärenschanze / Nachtbus', parking:'Begrenzt – ÖPNV empfohlen'},
  {cat:'afterwork', name:'T78 All Night Long & Timo Mandl', loc:'Nürnberg – Die Rakete', start:'2026-11-06', end:'2026-11-06', free:false, desc:'All-Night-Long-Set von T78, unterstützt von Timo Mandl.', genre:'Techno', ticket:'https://dierakete.com/programm/', outdoor:false, ageMin:18, price:'Vorverkauf / Abendkasse', oepnv:'U1 Bärenschanze / Nachtbus', parking:'Begrenzt – ÖPNV empfohlen'},
  {cat:'afterwork', name:'10 Jahre Bassgeflüster', loc:'Nürnberg – Die Rakete', start:'2026-12-11', end:'2026-12-11', free:false, desc:'Jubiläumsparty der Nürnberger Reihe Bassgeflüster.', genre:'Techno / Bass', ticket:'https://dierakete.com/programm/', outdoor:false, ageMin:18, price:'Vorverkauf / Abendkasse', oepnv:'U1 Bärenschanze / Nachtbus', parking:'Begrenzt – ÖPNV empfohlen'},
  {cat:'afterwork', name:'Klanglos (live) – All Night Long', loc:'Nürnberg – Die Rakete', start:'2027-04-09', end:'2027-04-09', free:false, desc:'Live-Set von Klanglos über die gesamte Nacht.', genre:'Techno / Live', ticket:'https://dierakete.com/programm/', outdoor:false, ageMin:18, price:'Vorverkauf / Abendkasse', oepnv:'U1 Bärenschanze / Nachtbus', parking:'Begrenzt – ÖPNV empfohlen'},
  {cat:'afterwork', name:'MAXIMUM ROCK NIGHT', loc:'Nürnberg – Hirsch', start:'2026-09-05', end:'2026-09-05', free:false, desc:'StarFM Rocknight im Hirsch ab 21 Uhr.', genre:'Rock / Alternative', ticket:'https://www.der-hirsch.com/partys.html', outdoor:false, ageMin:18, price:'Vorverkauf / Abendkasse', oepnv:'S-Bahn Nürnberg-Dutzendteich / Bus 55', parking:'Parkplätze am Gelände'},
  {cat:'afterwork', name:'KPOP & KHIPHOP NIGHT – Back to School', loc:'Nürnberg – Hirsch', start:'2026-09-12', end:'2026-09-12', free:false, desc:'K-Pop-Partynacht im Hirsch ab 23 Uhr.', genre:'K-Pop / K-Hip-Hop', ticket:'https://www.tickettailor.com/events/wanentertainmentsltd/2295226', outdoor:false, ageMin:16, price:'Vorverkauf / Abendkasse', oepnv:'S-Bahn Nürnberg-Dutzendteich / Bus 55', parking:'Parkplätze am Gelände'},
  {cat:'afterwork', name:'Don’t Stop The Rock – 80er/90er/2000er Party', loc:'Nürnberg – Hirsch', start:'2026-09-19', end:'2026-09-19', free:false, desc:'Retro-Party der Reihe „Dont Stop The Rock" ab 21 Uhr.', genre:'80s / 90s / 2000s', ticket:'https://www.der-hirsch.com/partys.html', outdoor:false, ageMin:18, price:'Vorverkauf / Abendkasse', oepnv:'S-Bahn Nürnberg-Dutzendteich / Bus 55', parking:'Parkplätze am Gelände'},
  {cat:'festival', name:'HGICH.T + Acid Aftershow', loc:'Nürnberg – Hirsch', start:'2026-10-24', end:'2026-10-24', free:false, desc:'Konzert von HGICH.T mit anschließender Acid-Aftershow-Party ab 21 Uhr.', genre:'Punk / Elektro', ticket:'https://www.der-hirsch.com/events.html', outdoor:false, ageMin:18, price:'Vorverkauf / Abendkasse', oepnv:'S-Bahn Nürnberg-Dutzendteich / Bus 55', parking:'Parkplätze am Gelände'},
  {cat:'afterwork', name:'INDIE CLASSICS', loc:'Nürnberg – Club Stereo', start:'2026-09-04', end:'2026-09-04', free:false, desc:'Indie-Klassiker im Club Stereo.', genre:'Indie', ticket:'https://club-stereo.net/party/', outdoor:false, ageMin:18, price:'Abendkasse', oepnv:'U1 Lorenzkirche / Innenstadt', parking:'Parkhäuser Altstadt'},
  {cat:'afterwork', name:'Indiesamstag', loc:'Nürnberg – Club Stereo', start:'2026-09-05', end:'2026-09-05', free:false, desc:'Der wöchentliche Indiesamstag im Club Stereo.', genre:'Indie', ticket:'https://club-stereo.net/party/', outdoor:false, ageMin:18, price:'Abendkasse', oepnv:'U1 Lorenzkirche / Innenstadt', parking:'Parkhäuser Altstadt'},
  {cat:'afterwork', name:'21 Jahre Club Stereo', loc:'Nürnberg – Club Stereo', start:'2026-09-10', end:'2026-09-13', free:false, desc:'Vier Tage Jubiläumsprogramm mit Partys und Live-Acts im Club Stereo und Vorraum.', genre:'Club / Live', ticket:'https://club-stereo.net/party/', outdoor:false, ageMin:18, price:'Abendkasse', oepnv:'U1 Lorenzkirche / Innenstadt', parking:'Parkhäuser Altstadt'},
  {cat:'afterwork', name:'DISCO MACHINE', loc:'Nürnberg – Club Stereo', start:'2026-09-17', end:'2026-09-17', free:false, desc:'Discoabend im Club Stereo.', genre:'Disco', ticket:'https://club-stereo.net/party/', outdoor:false, ageMin:18, price:'Abendkasse', oepnv:'U1 Lorenzkirche / Innenstadt', parking:'Parkhäuser Altstadt'},
  {cat:'afterwork', name:'Go80s! Go!', loc:'Nürnberg – Club Stereo', start:'2026-09-19', end:'2026-09-19', free:false, desc:'Achtziger-Party im Club Stereo.', genre:'80s', ticket:'https://club-stereo.net/party/', outdoor:false, ageMin:18, price:'Abendkasse', oepnv:'U1 Lorenzkirche / Innenstadt', parking:'Parkhäuser Altstadt'},
  {cat:'afterwork', name:'Matching Night Nürnberg', loc:'Nürnberg – Nachtkind', start:'2026-09-25', end:'2026-09-25', free:false, desc:'Single-Event mit Persönlichkeits-Matching nach dem „Lock & Key"-Prinzip, ab 20 Uhr.', genre:'Single-Party / Disco', ticket:'https://www.eventim.de/noapp/event/22018476/', outdoor:false, ageMin:18, price:'Tickets im Vorverkauf', oepnv:'Innenstadt ÖPNV', parking:'Parkhäuser Innenstadt'},
  {cat:'festival', name:'Godzilla in the Kitchen + Mudfinger', loc:'Nürnberg – Zentralcafé im K4', start:'2026-11-11', end:'2026-11-11', free:false, desc:'Konzertabend im Zentralcafé mit Mudfinger als Hauptband, 19:30 Uhr.', genre:'Metal / Rock', ticket:'https://www.zentralcafe.com/veranstaltungen/109-godzilla-in-the-kitchen-als-hauptband-mudfinger', outdoor:false, ageMin:16, price:'12 €', oepnv:'U1 Lorenzkirche', parking:'Parkhäuser Altstadt'},
  {cat:'sonstige', name:'Fastnacht in Franken 2027', loc:'Veitshöchheim – Mainfrankensäle', start:'2027-01-28', end:'2027-01-28', free:false, desc:'40. Ausgabe der Prunksitzung des Fastnacht-Verbands Franken, live im BR ab 19 Uhr.', genre:'Fastnacht / Kabarett', ticket:'https://www.tourismus-veitshoechheim.de/erleben/fastnacht/fastnacht-in-franken', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bahn nach Veitshöchheim', parking:'Parkplätze vor Ort'},
  {cat:'volksfest', name:'Würzburger Frühjahrsvolksfest 2027', loc:'Würzburg – Talavera', start:'2027-03-06', end:'2027-03-21', free:true, desc:'Erstes großes Volksfest Bayerns im Jahr mit Festzelten, Fahrgeschäften und Feuerwerk.', genre:'Volksfest', ticket:'https://www.wuerzburg.de/events-termine/fruehjahrsvolksfest', outdoor:true, ageMin:0, price:'Eintritt frei, Fahrgeschäfte kostenpflichtig', oepnv:'Straßenbahn Linie 4 bis Talavera', parking:'Parkplatz Talavera'},
  {cat:'volksfest', name:'Nürnberger Frühlingsfest 2027', loc:'Nürnberg – Volksfestplatz am Dutzendteich', start:'2027-03-27', end:'2027-04-11', free:true, desc:'Großes Frühjahrsvolksfest mit Bierzelten, Fahrgeschäften und Feuerwerken – Eintritt frei.', genre:'Volksfest', ticket:'https://www.volksfest-nuernberg.de/', outdoor:true, ageMin:0, price:'Eintritt frei, Fahrgeschäfte kostenpflichtig', oepnv:'U1 bis Messe / S-Bahn Dutzendteich', parking:'Vorhanden'},
  {cat:'volksfest', name:'Bergkirchweih Erlangen 2027', loc:'Erlangen – Burgberg', start:'2027-05-13', end:'2027-05-24', free:true, desc:'Der „Berg" – zwölf Tage Bierkeller unter alten Kastanien, eines der bekanntesten Volksfeste Frankens.', genre:'Volksfest / Kirchweih', ticket:'https://erlangen.de/bergkirchweih', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bus zum Burgberg / Bahn Erlangen', parking:'Sehr begrenzt – ÖPNV empfohlen'},
  {cat:'volksfest', name:'Nürnberger Herbstvolksfest 2027', loc:'Nürnberg – Volksfestplatz', start:'2027-08-27', end:'2027-09-11', free:true, desc:'Das große Herbstvolksfest am Dutzendteich mit Riesenrad, Bierzelten und Familienangeboten.', genre:'Volksfest', ticket:'https://www.volksfest-nuernberg.de/', outdoor:true, ageMin:0, price:'Eintritt frei, Fahrgeschäfte kostenpflichtig', oepnv:'Tram/Bus zum Volksfestplatz', parking:'Vorhanden'},
  {cat:'russian', name:'Показ фильма «Капитан Волконогов бежал»', loc:'München – Leopold Kino', start:'2026-09-17', end:'2026-09-17', free:false, desc:'Russischer Spielfilm im Original im Münchner Leopold Kino.', genre:'Kino', ticket:'https://www.kontramarka.de/tour/kapitan-volkonogov-bezhal/plan/2222/13164/', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'Михаил Лабковский – «Любовь без страданий»', loc:'München – Kulturzentrum Trudering', start:'2026-09-28', end:'2026-09-28', free:false, desc:'Vortrag des Psychologen Michail Labkowski über Beziehungen ohne Leiden.', genre:'Vortrag / Psychologie', ticket:'https://biletkartina.tv/ru/hall?event_id=1284179540', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'Animal ДжаZ – Konzert mit Cello', loc:'München – Hoftheater', start:'2026-09-30', end:'2026-09-30', free:false, desc:'Die russische Kultband Animal ДжаZ akustisch mit Cello-Begleitung.', genre:'Rock / Akustik', ticket:'https://www.kontramarka.de/tour/animal-jazz/plan/2098/13274/', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'Юлий Ким – «Давайте негромко, давайте вполголоса»', loc:'München – Kulturzentrum GOROD', start:'2026-10-01', end:'2026-10-01', free:false, desc:'Liederabend der russischen Barden-Legende Juli Kim.', genre:'Bardenlieder / Poesie', ticket:'https://www.pryamaya.eu/ulij_kim_davajte_negromko_davajte_vpolgolosa_munich_01_10_2026', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'Илья Колмановский – «Про плохое» (Wissenschaftsshow 6+)', loc:'München', start:'2026-10-04', end:'2026-10-04', free:false, desc:'Wissenschaftsshow für Familien über die Abenteuer unseres Gehirns im Supermarkt, 15 Uhr.', genre:'Wissenschafts-Show', ticket:'https://afishamira.com/event/biolog-ilya-kolmanovskij-v-myunhene-pro-plohoe-nauchnoe-shou-o-priklyucheniyah-nashego-mozga-v-supermarkete-6/', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'Илья Колмановский – «Мозг + искусственный интеллект»', loc:'München', start:'2026-10-04', end:'2026-10-04', free:false, desc:'Vortrag des Biologen Ilja Kolmanowski über Gehirn und künstliche Intelligenz, 18 Uhr.', genre:'Vortrag / Wissenschaft', ticket:'https://afishamira.com/event/biolog-ilya-kolmanovskij-v-myunhene-mozg-iskusstvennyj-intellekt-instruktsiya-po-sovmestnoj-zhizni/', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'Александр Незлобин – «I’m файн» (EN)', loc:'München', start:'2026-10-07', end:'2026-10-07', free:false, desc:'Stand-up-Programm von Alexander Neslobin in englischsprachiger Fassung.', genre:'Stand-up', ticket:'https://afishamira.com/event/komik-aleksandr-nezlobin-v-myunhene-i-m-fajn-en/', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'Виктория Толстоганова и Максим Виторган – «Громкие»', loc:'Ingolstadt – Stadttheater', start:'2026-10-25', end:'2026-10-25', free:false, desc:'Romantische Komödie über eine 25 Jahre währende Ehe.', genre:'Theater', ticket:'https://biletkartina.tv/ru/hall?event_id=1284470661', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bahn nach Ingolstadt Hbf', parking:'Parkplätze am Stadttheater'},
  {cat:'russian', name:'Симфонический трибьют Rammstein: Herzfeuer', loc:'Ingolstadt – Stadttheater', start:'2026-11-05', end:'2026-11-05', free:false, desc:'Rammstein-Hits in symphonischer Fassung mit Orchester.', genre:'Symphonic / Tribute', ticket:'https://www.kontramarka.de/tour/herzfeuer-rammstein/plan/2192/12633/', outdoor:false, ageMin:12, price:'Tickets im Vorverkauf', oepnv:'Bahn nach Ingolstadt Hbf', parking:'Parkplätze am Stadttheater'},
  {cat:'russian', name:'Балет «Лебединое озеро» (Regensburg)', loc:'Regensburg – marinaforum', start:'2026-11-06', end:'2026-11-06', free:false, desc:'Schwanensee-Gastspiel des Classique Ballet Solenne im marinaforum.', genre:'Ballett', ticket:'https://www.kontramarka.de/tour/classique-ballet-solenne-schwanensee/', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bahn nach Regensburg Hbf', parking:'Parkhäuser Altstadt Regensburg'},
  {cat:'russian', name:'Тамара Эйдельман – «Как возникают и исчезают нации»', loc:'München – Kulturzentrum GOROD', start:'2026-11-13', end:'2026-11-13', free:false, desc:'Die Historikerin Tamara Eidelman über Entstehen und Vergehen von Nationen.', genre:'Vortrag / Geschichte', ticket:'https://fienta.com/ru/how-nations-emerge-and-disappear-13112026', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'Анна Виленская – «Кто придумал дирижёров»', loc:'München – Kulturzentrum Trudering', start:'2026-11-20', end:'2026-11-20', free:false, desc:'Musikwissenschaftlicher Vortrag über die Geschichte des Dirigierens.', genre:'Vortrag / Musik', ticket:'https://buytickets.at/spotlightproduction/2269794/r/am', outdoor:false, ageMin:12, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'Дмитрий Спирин – «Тараканы! 35 лет»', loc:'München – Kulturzentrum GOROD', start:'2026-11-21', end:'2026-11-21', free:false, desc:'Jubiläumskonzert zum 35-jährigen Bestehen der russischen Punkband Tarakany!.', genre:'Punkrock', ticket:'https://www.kontramarka.de/tour/dmitry-spirin/category/2359/13447/', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'Анна Виленская – «Симфонический день»', loc:'München', start:'2026-11-22', end:'2026-11-22', free:false, desc:'Ganztägiges Musikformat mit Vortrag und Masterclass.', genre:'Musik / Workshop', ticket:'https://afishamira.com/event/anna-vilenskaya-v-myunhene-simfonicheskij-den/', outdoor:false, ageMin:12, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'ooes – When The World Ends Tour', loc:'München – Backstage', start:'2026-11-26', end:'2026-11-26', free:false, desc:'Konzert des russischsprachigen Indie-Projekts ooes im Backstage München.', genre:'Indie / Elektronik', ticket:'https://biletkartina.tv/ru/hall?event_id=1285633760', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'Комик Никита Шевчук', loc:'München – WERK7 theater', start:'2026-12-16', end:'2026-12-16', free:false, desc:'Stand-up-Abend mit Nikita Schewtschuk im WERK7 theater.', genre:'Stand-up', ticket:'https://www.kontramarka.de/tour/nikita-shevchuk/plan/2317/13267/', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'Балет «Щелкунчик» (Regensburg)', loc:'Regensburg – Kolpinghaus St. Erhard', start:'2026-12-21', end:'2026-12-21', free:false, desc:'Nussknacker-Ballett im Kolpinghaus St. Erhard.', genre:'Ballett', ticket:'https://biletkartina.tv/ru/hall?event_id=1284777877', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bahn nach Regensburg Hbf', parking:'Parkhäuser Altstadt Regensburg'},
  {cat:'russian', name:'Балетные истории при свечах – «Зимнее волшебство» (Ingolstadt)', loc:'Ingolstadt – Stadttheater', start:'2026-12-23', end:'2026-12-23', free:false, desc:'Ballettszenen bei Kerzenschein mit Live-Kammerorchester.', genre:'Ballett', ticket:'https://biletkartina.tv/ru/hall?event_id=1285038994', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bahn nach Ingolstadt Hbf', parking:'Parkplätze am Stadttheater'},
  {cat:'russian', name:'Балет «Лебединое озеро» (Erding)', loc:'Erding – Stadthalle Erding', start:'2027-01-05', end:'2027-01-05', free:false, desc:'Schwanensee-Gastspiel in der Stadthalle Erding.', genre:'Ballett', ticket:'https://biletkartina.tv/ru/hall?event_id=1284682657', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'S-Bahn S2 bis Erding', parking:'Parkplätze an der Stadthalle'},
  {cat:'russian', name:'Балет «Щелкунчик» (Straubing)', loc:'Straubing – Theater am Hagen', start:'2027-01-08', end:'2027-01-08', free:false, desc:'Nussknacker-Gastspiel im Theater am Hagen.', genre:'Ballett', ticket:'https://biletkartina.tv/ru/hall?event_id=1284824786', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bahn nach Straubing', parking:'Parkplätze in der Altstadt'},
  {cat:'russian', name:'Новогодние приключения Деда Мороза и Снегурочки (Altneujahr München)', loc:'München – Anton-Fingerle-Zentrum', start:'2027-01-10', end:'2027-01-10', free:false, desc:'Väterchen-Frost-Show zum Altneujahr im Anton-Fingerle-Zentrum.', genre:'Kindershow / Theater', ticket:'https://biletkartina.tv/ru/hall?event_id=1284835787', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'Балет «Щелкунчик» (Ingolstadt)', loc:'Ingolstadt – Stadttheater', start:'2027-01-21', end:'2027-01-21', free:false, desc:'Nussknacker-Ballett im Ingolstädter Stadttheater.', genre:'Ballett', ticket:'https://biletkartina.tv/ru/hall?event_id=1284879703', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'Bahn nach Ingolstadt Hbf', parking:'Parkplätze am Stadttheater'},
  {cat:'russian', name:'Валерий Меладзе – München', loc:'München – Kleine Olympiahalle', start:'2027-02-14', end:'2027-02-14', free:false, desc:'Zusatztermin der Europatour von Valeri Meladse in München.', genre:'Pop', ticket:'https://biletkartina.tv/ru/hall?event_id=1284350865', outdoor:false, ageMin:0, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'Группа Би-2 – «Путешествие вокруг Солнца»', loc:'München – Kleine Olympiahalle', start:'2027-02-28', end:'2027-02-28', free:false, desc:'Bi-2 auf Tour zum Album „Reise um die Sonne".', genre:'Rock', ticket:'https://afishamira.com/event/gruppa-bi-2-v-myunhene-puteshestvie-vokrug-solntsa/', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'Спектакль «Анна Каренина»', loc:'Regenstauf – Jahnhalle', start:'2027-03-01', end:'2027-03-01', free:false, desc:'Tolstois „Anna Karenina" als russischsprachige Inszenierung.', genre:'Theater', ticket:'https://biletkartina.tv/ru/hall?event_id=1285006732', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'Bahn nach Regenstauf', parking:'Parkplätze an der Jahnhalle'},
  {cat:'russian', name:'Спектакль «Вий или Страшная тайна Гоголя»', loc:'Fürth – Stadthalle', start:'2027-04-14', end:'2027-04-14', free:false, desc:'Mystisches russischsprachiges Bühnenstück nach Nikolai Gogol.', genre:'Theater', ticket:'https://www.kontramarka.de/tour/spektakl-viy/plan/2278/13087/', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'U1 Stadthalle Fürth', parking:'Parkhaus Stadthalle'},
  {cat:'russian', name:'Спектакль «Вий или Страшная тайна Гоголя» (Taufkirchen)', loc:'Taufkirchen b. München', start:'2027-04-15', end:'2027-04-15', free:false, desc:'Gogol-Inszenierung im Münchner Süden, Folgetermin nach Fürth.', genre:'Theater', ticket:'https://www.kontramarka.de/tour/spektakl-viy/plan/2278/13088/', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
  {cat:'russian', name:'Комик Ольга Малащенко', loc:'München – WERK7 theater', start:'2027-04-16', end:'2027-04-16', free:false, desc:'Neues Stand-up-Programm von Olga Malaschtschenko.', genre:'Stand-up', ticket:'https://biletkartina.tv/ru/event/Ol_ga_Malasenko_v_Germanii_Stendap_tur', outdoor:false, ageMin:16, price:'Tickets im Vorverkauf', oepnv:'München ÖPNV', parking:'Parkhäuser Innenstadt München'},
];

const sonsigeEvents = []; // Leer – Messen sind jetzt unter Family


function getCoords(loc) {
  for (const [city,c] of Object.entries(COORDS)) { if (loc.includes(city)) return c; }
  return null;
}

// ── FIREBASE ──────────────────────────────────────────────────────────────────
let db = null;
let publicCounts = {};

const FB_PROJECT = 'viana-events';
const FB_API_KEY = 'AIzaSyDx-s-6yYdvRxP4Gy9GaWdOKBEfo8GpTXQ';
const FB_BASE = `https://firestore.googleapis.com/v1/projects/${FB_PROJECT}/databases/(default)/documents`;


function eventKey(e) {
  return e.name.replace(/[^a-zA-Z0-9äöüÄÖÜß]/g,'_').slice(0,50)+'_'+e.start;
}

async function loadPublicCounts() {
  try {
    const res = await fetch(`${FB_BASE}/event_going?key=${FB_API_KEY}&pageSize=200`);
    if(!res.ok) return;
    const data = await res.json();
    (data.documents||[]).forEach(doc => {
      const key = doc.name.split('/').pop();
      publicCounts[key] = parseInt(doc.fields?.count?.integerValue || 0);
    });
  } catch(err) { console.warn('Firebase load:', err); }
}

async function savePublicCount(e, delta) {
  const key = eventKey(e);
  const current = Math.max(0, (publicCounts[key] || 0) + delta);
  publicCounts[key] = current;
  try {
    await fetch(`${FB_BASE}/event_going/${key}?key=${FB_API_KEY}&updateMask.fieldPaths=count`, {
      method: 'PATCH',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({fields:{count:{integerValue: current}}})
    });
  } catch(err) { console.warn('Firebase save:', err); }
  return current;
}

function getPublicCount(e) { return publicCounts[eventKey(e)] || 0; }


let activeTags=new Set(), tagLogic='and', searchTerm='', viewMode='list', quickFilter='alle', sortMode='date', leafletMap=null, showPast=false, showSeasonal=false;
// Saison-Event = bereits gestartet UND läuft noch UND Dauer > 14 Tage
function isSeasonal(e) {
  const today=new Date(); today.setHours(0,0,0,0);
  const s=new Date(e.start), en=new Date(e.end);
  const days=Math.round((en-s)/86400000);
  return s<today && en>=today && days>=14;
}
function toggleSeasonal(){ showSeasonal=!showSeasonal; render(); }
window.toggleSeasonal=toggleSeasonal;

// Kategorien die zu Family verschoben wurden – in Party ausblenden
const FAMILY_ONLY_CATS = new Set(['volksfest', 'weinfest', 'stadtfest', 'flohmarkt']);

function getActiveEvents() {
  const hasParty = activeTags.has('party');
  const hasFamily = activeTags.has('family');
  if (hasParty && !hasFamily) {
    return events.filter(e => !FAMILY_ONLY_CATS.has(e.cat));
  }
  if (hasFamily && !hasParty) {
    const extras = events.filter(e => FAMILY_ONLY_CATS.has(e.cat));
    return [...familyEvents, ...extras];
  }
  // Beide oder keine: alle Events dedupliziert
  const partyPool = events.filter(e => !FAMILY_ONLY_CATS.has(e.cat));
  const sharedPool = events.filter(e => FAMILY_ONLY_CATS.has(e.cat));
  const all = [...partyPool, ...familyEvents, ...sharedPool];
  const seen = new Set();
  return all.filter(e => { const k=e.name+e.start; if(seen.has(k))return false; seen.add(k); return true; });
}

// Auto-generiert Tags aus cat, outdoor, free, genre – kein manuelles Taggen nötig
const _partyKeys = new Set(events.map(e=>e.name+e.start));
const _familyKeys = new Set(familyEvents.map(e=>e.name+e.start));

function getEventTags(e) {
  const tags = new Set();
  const key = e.name + e.start;
  // Tab-Tags
  if (_partyKeys.has(key) && !FAMILY_ONLY_CATS.has(e.cat)) tags.add('party');
  if (_familyKeys.has(key)) tags.add('family');
  if (FAMILY_ONLY_CATS.has(e.cat)) { tags.add('party'); tags.add('family'); }
  // Kategorie → Tags
  const catMap = {
    festival:['festival'], afterwork:['club','afterwork'], russian:['russian','club'],
    strand:['strand','outdoor'], beachparty:['beachparty','outdoor'],
    volksfest:['volksfest','bier'], weinfest:['weinfest'], zoo:['zoo','kinder'],
    freizeit:['freizeit'], kinder:['kinder'], stadtfest:['stadtfest','kultur'],
    sport:['sport'], messe:['messe'], flohmarkt:['flohmarkt'], privat:['privat'],
  };
  (catMap[e.cat]||[]).forEach(t=>tags.add(t));
  // Feld-basiert
  if (e.outdoor===true) tags.add('outdoor');
  if (e.free) tags.add('kostenlos');
  // Genre-basiert
  if (e.genre) {
    const g = e.genre.toLowerCase();
    if (g.match(/techno/)) tags.add('techno');
    if (g.match(/electronic|edm/)) tags.add('electronic');
    if (g.match(/house/)) tags.add('house');
    if (g.match(/rock|metal|punk/)) tags.add('rock');
    if (g.match(/indie/)) tags.add('indie');
    if (g.match(/salsa|bachata|latin|reggaeton|cumbia/)) tags.add('latino');
    if (g.match(/hip.?hop|r\.n\.b|hiphop|rap/)) tags.add('hiphop');
    if (g.match(/camping/)) tags.add('camping');
    if (g.match(/jazz/)) tags.add('jazz');
  }
  return tags;
}
// Gespeicherte Listen laden und sofort gegen vorhandene Events bereinigen.
// Einträge von Events die nicht mehr existieren werden automatisch entfernt –
// für alle Nutzer gleichzeitig beim nächsten Seitenaufruf.
function _loadAndClean(storageKey, allEventSets) {
  const raw = new Set(JSON.parse(localStorage.getItem(storageKey)||'[]'));
  const valid = new Set([...raw].filter(key => allEventSets.has(key)));
  if (valid.size !== raw.size) {
    // Veraltete Einträge gefunden → bereinigten Stand sofort speichern
    localStorage.setItem(storageKey, JSON.stringify([...valid]));
  }
  return valid;
}

// Alle gültigen Event-Keys vorberechnen (Name+Datum)
const _allEventKeys = new Set([...events, ...familyEvents].map(e => e.name + e.start));

let wishlist  = _loadAndClean('viana_wl',    _allEventKeys);
let goingList = _loadAndClean('viana_going', _allEventKeys);

function saveWishlist(){ localStorage.setItem('viana_wl', JSON.stringify([...wishlist])); }
function saveGoingList(){ localStorage.setItem('viana_going', JSON.stringify([...goingList])); }

function dateStr(s,e) {
  const sd=new Date(s), ed=new Date(e);
  if(s===e) return `${sd.getDate()}. ${MONTHS_S[sd.getMonth()]} 2026`;
  if(sd.getMonth()===ed.getMonth()) return `${sd.getDate()}.–${ed.getDate()}. ${MONTHS_S[sd.getMonth()]} 2026`;
  return `${sd.getDate()}. ${MONTHS_S[sd.getMonth()]} – ${ed.getDate()}. ${MONTHS_S[ed.getMonth()]} 2026`;
}
function getDaysUntil(ds){ const today=new Date(); today.setHours(0,0,0,0); return Math.round((new Date(ds)-today)/86400000); }
function isThisWeek(ds){ const today=new Date();today.setHours(0,0,0,0);const d=new Date(ds),day=today.getDay(),mon=new Date(today);mon.setDate(today.getDate()-(day===0?6:day-1));const sun=new Date(mon);sun.setDate(mon.getDate()+6);return d>=mon&&d<=sun; }
function isThisMonth(ds){ const today=new Date(),d=new Date(ds);return d.getMonth()===today.getMonth()&&d.getFullYear()===today.getFullYear(); }
function isToday(ds){ const today=new Date();today.setHours(0,0,0,0);const d=new Date(ds);d.setHours(0,0,0,0);return d.getTime()===today.getTime(); }

function getFiltered() {
  const sourceEvents = getActiveEvents();
  const q=searchTerm.toLowerCase(), today=new Date();today.setHours(0,0,0,0);
  const contentTags=[...activeTags].filter(t=>t!=='party'&&t!=='family');
  const allFiltered_pre = sourceEvents.filter(e => {
    if(new Date(e.end) < today && !showPast) return false;
    if(isSeasonal(e) && !showSeasonal) return false;
    return true;
  });
  let filtered=allFiltered_pre.filter(e=>{
    let matchTags=true;
    if(contentTags.length>0){
      const eTags=getEventTags(e);
      matchTags=tagLogic==='and'?contentTags.every(t=>eTags.has(t)):contentTags.some(t=>eTags.has(t));
    }
    const matchMonth=activeMonthFilter===null||parseInt(e.start.split('-')[1])===activeMonthFilter;
    const matchSearch=!q||e.name.toLowerCase().includes(q)||e.loc.toLowerCase().includes(q)||(e.genre||'').toLowerCase().includes(q)||(e.desc||'').toLowerCase().includes(q);
    let matchQuick=true;
    if(quickFilter==='today') matchQuick=isToday(e.start);
    else if(quickFilter==='week') matchQuick=isThisWeek(e.start);
    else if(quickFilter==='month') matchQuick=isThisMonth(e.start);
    else if(quickFilter==='next'){const d=new Date(e.start);d.setHours(0,0,0,0);matchQuick=d>=today;}
    return matchTags&&matchMonth&&matchSearch&&matchQuick;
  });
  if(sortMode==='name') filtered.sort((a,b)=>a.name.localeCompare(b.name,'de'));
  else if(sortMode==='cat') filtered.sort((a,b)=>a.cat.localeCompare(b.cat)||a.start.localeCompare(b.start));
  else if(sortMode==='dist' && userLat!==null) filtered.sort((a,b)=>(getEventDist(a)||999)-(getEventDist(b)||999));
  else filtered.sort((a,b)=>a.start.localeCompare(b.start));

  // Distance radius filter
  if(maxDist > 0 && userLat !== null) {
    filtered = filtered.filter(e => {
      const d = getEventDist(e);
      return d !== null && d <= maxDist;
    });
  }
  if(quickFilter==='next'){const d0=filtered.length?filtered[0].start:null;if(d0)filtered=filtered.filter(e=>e.start===d0);}
  return filtered;
}

function countdownLabel(diff) {
  if(diff===0) return '<span class="today-badge">HEUTE</span>';
  if(diff===1) return '<span class="row-countdown">⏳ Morgen</span>';
  if(diff>0&&diff<=14) return `<span class="row-countdown">⏳ in ${diff} Tagen</span>`;
  return '';
}

function eventRowHTML(e) {
  const idx=getActiveEvents().indexOf(e);
  const isSaved=wishlist.has(e.name+e.start), isGoing=goingList.has(e.name+e.start), diff=getDaysUntil(e.start), isToday_=diff===0;
  const pubCount=getPublicCount(e);
  const vianaClass = e.viana ? ' viana-event' : '';
  const vianaStyle = e.viana ? ';box-shadow:inset 0 0 0 2px rgba(201,162,39,0.6),0 0 20px rgba(201,162,39,0.18)' : '';
  const sd=new Date(e.start), ed=new Date(e.end);
  const dayStr=`${DAYS[sd.getDay()]} ${sd.getDate()}. ${MONTHS_S[sd.getMonth()]}.`;
  const endStr=e.start!==e.end?` – ${ed.getDate()}. ${MONTHS_S[ed.getMonth()]}.`:'';
  const price=e.free?'Kostenlos':(e.price&&e.price!=='TBC'?e.price.split('(')[0].trim():'');
  const eTags=[...getEventTags(e)].filter(t=>t!=='party'&&t!=='family').slice(0,6);
  const todayHighlight=isToday_?';border-color:rgba(232,150,58,.5);background:linear-gradient(135deg,rgba(232,150,58,.06) 0%,var(--surface) 100%)':(e.viana?';background:linear-gradient(105deg,rgba(201,162,39,0.18) 0%,var(--surface) 100%)':'');
  const musicBtn=e.music?`<button class="music-play-btn music-play-btn-inline" data-music="${e.music}" onclick="event.stopPropagation();toggleMusic(this,'${e.music}')" title="Musik">▶</button>`:e.musicYt?`<button class="music-play-btn music-play-btn-inline" onclick="event.stopPropagation();toggleYtPlayer('${e.musicYt}','${(e.musicTitle||e.name).replace(/'/g,"\\'")}',this)" title="Musik">▶</button>`:'';
  return `<div class="event-row${vianaClass}" data-idx="${idx}" style="position:relative${todayHighlight}${vianaStyle}">
    <div class="erow-top">
      <span class="event-name">${e.name}${e.viana?' <span class="viana-badge">⭐</span>':''}${e.new?' <span class="badge badge-new">NEU</span>':''}</span>
      <div class="erow-actions">
        ${pubCount>0?`<span class="row-dabei-badge">✅ ${pubCount}</span>`:''}
        <button class="row-heart-btn${isSaved?' saved':''}" onclick="event.stopPropagation();toggleWishlist(${idx})" title="Merken">${isSaved?'❤️':'🤍'}</button>
        <button class="row-going-btn${isGoing?' going':''}" onclick="event.stopPropagation();toggleGoing(${idx})" title="Ich bin dabei">👍</button>
      </div>
    </div>
    <div class="erow-meta">
      📅 ${dayStr}${endStr} · 📍 ${e.loc}${price?' · '+price:''}${userLat!==null&&getEventDist(e)!==null?' · 📍 '+distLabel(getEventDist(e)):''}${musicBtn}
    </div>
    ${isToday_?'<div style="margin-bottom:6px"><span class="today-badge">HEUTE</span></div>':diff>0&&diff<=7?`<div style="margin-bottom:6px"><span class="row-countdown">⏳ in ${diff} Tagen</span></div>`:''}
    <div class="event-tags-row">${eTags.map(t=>`<span class="event-htag${activeTags.has(t)?' event-htag-active':''}" onclick="event.stopPropagation();toggleTag('${t}')">#${t}</span>`).join('')}${e.ticket?`<a class="event-htag event-htag-link" href="${e.ticket}" target="_blank" rel="noopener" onclick="event.stopPropagation()">🌐 Tickets</a>`:''}</div>
  </div>`;
}

function eventCardHTML(e) {
  const col=CAT_COLORS[e.cat]||'#888', idx=getActiveEvents().indexOf(e);
  const diff=getDaysUntil(e.start), isToday_=diff===0;
  const isSaved=wishlist.has(e.name+e.start), isGoing=goingList.has(e.name+e.start);
  const cdLabel=diff===0?'🔴 HEUTE':diff===1?'⏳ Morgen':diff>0&&diff<=14?`⏳ in ${diff} Tagen`:'';
  return `<div class="event-card${isToday_?' today-event':''}${e.viana?' viana-event':''}" data-idx="${idx}" style="--cat-color:${col}">
    <div class="card-action-btns">
      <button class="card-heart-btn${isSaved?' saved':''}" onclick="event.stopPropagation();toggleWishlist(${idx})" title="Merken">${isSaved?'❤️':'🤍'}</button>
      <button class="card-going-btn${isGoing?' going':''}" onclick="event.stopPropagation();toggleGoing(${idx})" title="Ich bin dabei">${isGoing?'👍':'👍'}</button>
    </div>
    ${cdLabel?`<div class="card-countdown">${cdLabel}</div>`:''}
    ${userLat!==null?`<div style="font-size:11px;color:#5b8ff9;margin-bottom:4px;font-weight:600">📍 ${distLabel(getEventDist(e))}</div>`:''}
    <div class="card-date">${dateStr(e.start,e.end)} · ${DAYS[new Date(e.start).getDay()]}.</div>
    <div class="card-name">${e.name}</div>
    <div class="card-loc">📍 ${e.loc}</div>
    ${e.desc?`<div class="card-desc">${e.desc.slice(0,100)}${e.desc.length>100?'…':''}</div>`:''}
    <div class="card-footer">
      <span class="cat-badge" style="background:${col}">${CAT_LABELS[e.cat]}</span>
      ${e.free?'<span class="badge badge-free">★ Kostenlos</span>':''}
      ${e.new?'<span class="badge badge-new">NEU</span>':''}
      ${e.viana?'<span class="viana-badge">⭐ Viana Event</span>':''}
      ${isGoing?'<span class="going-badge">✅ Dabei</span>':''}
      ${e.music?`<button class="music-play-btn music-play-btn-card" data-music="${e.music}" onclick="event.stopPropagation();toggleMusic(this,'${e.music}')" title="Musik abspielen">▶</button>`:e.musicYt?`<button class="music-play-btn music-play-btn-card" onclick="event.stopPropagation();toggleYtPlayer('${e.musicYt}','${(e.musicTitle||e.name).replace(/'/g,"\\'")}',this)" title="Musik abspielen">▶</button>`:''}
    </div>
  </div>`;
}


function togglePast() {
  showPast = !showPast;
  render();
}
window.togglePast = togglePast;

/* ── IN-FEED WERBEBANNER ─────────────────────────────────────────────────────
   Erscheint alle 10 Events in der Liste (nur auf Mobile < 1024px sichtbar).
   Zum Anpassen: href, Emoji/img, Titel, Beschreibung und CTA-Text ändern.
   ─────────────────────────────────────────────────────────────────────────── */
// ── WERBEKUNDEN-POOL ──────────────────────────────────────────────────────────
// Für neuen Kunden: Eintrag hinzufügen, fertig.
const AD_CLIENTS = [
  {
    href:  'https://mobil-reifen-wechseln.de/',
    img:   'assets/ads/mrw-infeed-600x80.svg',
    alt:   'Mobiler Reifenwechsel – Direkt bei Ihnen vor Ort',
    barImg:'assets/ads/mrw-bottom-bar-640x80.svg',
    barAlt:'Mobiler Reifenwechsel – Termin buchen',
  },
  {
    href:  'https://foerdertechnik-wartung-und-service.de/',
    img:   'assets/ads/ft-infeed-600x80.svg',
    alt:   'Fördertechnik Wartung & Service – Nürnberg',
    barImg:'assets/ads/ft-bottom-bar-640x80.svg',
    barAlt:'Fördertechnik Wartung & Service – Termin buchen',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// ⚠️ WERBESYSTEM – NICHT ENTFERNEN/ÜBERSCHREIBEN (verwaltet über admin.html)
// Dieser Block + die Boot-Zeile `loadAdConfig().then(applyAdConfig)` am Dateiende
// gehören zusammen. Bei Event-Updates NUR die Arrays oben anhängen, NICHT die
// ganze events.js neu generieren – sonst sind alle Banner weg.
// ── WERBE-CONFIG aus Firebase (verwaltet über admin.html) ───────────────────
// Wird beim Laden geholt; fehlt sie, greifen die obigen AD_CLIENTS als Fallback.
// ═══════════════════════════════════════════════════════════════════════════
let adConfig = null;
function svgDataUri(svg){
  try { return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg))); }
  catch(e){ return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); }
}
function adSlotsFrom(arr){ return (arr || []).filter(s => s && s.svg); }
function getInFeedPool(){ const s = adConfig ? adSlotsFrom(adConfig.infeed) : []; return s.length ? s : null; }
function getBottomPool(){ const s = adConfig ? adSlotsFrom(adConfig.bottomBar) : []; return s.length ? s : null; }

async function loadAdConfig(){
  try{
    const res = await fetch(`${FB_BASE}/config/ads?key=${FB_API_KEY}`);
    if(!res.ok) return;
    const data = await res.json();
    const raw = data.fields?.json?.stringValue;
    if(raw) adConfig = JSON.parse(raw);
  }catch(err){ console.warn('Ad-Config laden:', err); }
}

let adConfigLoaded = false;

// Skyscraper-Fallback (falls für einen Slot nichts in der Config gesetzt ist)
const SKY_FALLBACK = {
  'ad-left-link':  { href:'https://mobil-reifen-wechseln.de/', img:'assets/ads/mrw-skyscraper-160x600.svg', alt:'Mobiler Reifenwechsel – Direkt bei Ihnen vor Ort' },
  'ad-right-link': { href:'https://foerdertechnik-wartung-und-service.de/', img:'assets/ads/ft-skyscraper-160x600.svg', alt:'Fördertechnik Wartung & Service – Nürnberg' }
};

function applySky(linkId, slot){
  const a = document.getElementById(linkId); if(!a) return;
  const img = a.querySelector('img');
  const fb = SKY_FALLBACK[linkId] || {};
  if(slot && slot.svg){
    a.href = slot.href || fb.href || a.href;
    if(img){ img.src = svgDataUri(slot.svg); img.alt = slot.alt || fb.alt || ''; }
  } else {
    if(fb.href) a.href = fb.href;
    if(img){ img.src = fb.img; img.alt = fb.alt || ''; }
  }
  if(img) img.style.visibility = 'visible';
}

function applyBottom(){
  const bar = document.getElementById('ad-bottom-bar'); if(!bar) return;
  // Im Admin abgeschaltet? Dann gar keine Bottom-Bar zeigen.
  if(adConfig && adConfig.bottomBarEnabled === false){
    bar.style.display = 'none';
    document.body.classList.remove('has-bottom-ad');
    return;
  }
  const link = bar.querySelector('a'), img = bar.querySelector('img'); if(!img) return;
  const pool = getBottomPool();
  if(pool){
    const s = pool[Math.floor(Math.random() * pool.length)];
    if(link && s.href) link.href = s.href;
    img.src = svgDataUri(s.svg); img.alt = s.alt || '';
  } else {
    const client = AD_CLIENTS[Math.floor(Math.random() * AD_CLIENTS.length)];
    if(link) link.href = client.href;
    img.src = client.barImg; img.alt = client.barAlt;
  }
  img.style.visibility = 'visible';
}

// Setzt alle Werbeplätze (Config oder Fallback) – wird NACH dem Config-Laden aufgerufen,
// damit kein altes Banner aufblitzt.
function applyAdConfig(){
  adConfigLoaded = true;
  applySky('ad-left-link',  adConfig && adConfig.skyLeft);
  applySky('ad-right-link', adConfig && adConfig.skyRight);
  applyBottom();
  _inFeedAdIdx = 0;
  render();
}

// In-Feed: abwechselnd Slot 1 → 2 → 3 → … (aus Config; sonst AD_CLIENTS-Fallback)
let _inFeedAdIdx = 0;
function inFeedAdHTML() {
  if(!adConfigLoaded) return '';  // erst Banner zeigen, wenn Config geladen ist (kein Aufblitzen)
  const pool = getInFeedPool();
  let href, src, alt;
  if(pool){
    const s = pool[_inFeedAdIdx % pool.length];
    href = s.href || '#'; src = svgDataUri(s.svg); alt = s.alt || '';
  } else {
    const client = AD_CLIENTS[_inFeedAdIdx % AD_CLIENTS.length];
    href = client.href; src = client.img; alt = client.alt;
  }
  _inFeedAdIdx++;
  return `<div class="ad-infeed" aria-label="Werbung">
    <a href="${href}" target="_blank" rel="noopener sponsored" style="display:block;text-decoration:none">
      <img src="${src}" alt="${alt}"
           style="width:100%;height:auto;display:block;border-radius:10px">
    </a>
  </div>`;
}

/* ── BOTTOM BAR: nur Close-Button (Bild wird via applyBottom() gesetzt) ────── */
(function initBottomBar() {
  const bar = document.getElementById('ad-bottom-bar');
  const closeBtn = document.getElementById('ad-bottom-bar-close');
  if (!bar || !closeBtn) return;
  document.body.classList.add('has-bottom-ad');
  closeBtn.addEventListener('click', () => {
    bar.style.display = 'none';
    document.body.classList.remove('has-bottom-ad');
  });
})();

function render() {
  const filtered=getFiltered();
  // Badging API – Anzahl heutiger Events als App-Icon-Badge
  if ('setAppBadge' in navigator) {
    const _today = new Date(); _today.setHours(0,0,0,0);
    const todayCount = getActiveEvents().filter(e => {
      const s = new Date(e.start); s.setHours(0,0,0,0);
      const en = new Date(e.end); en.setHours(0,0,0,0);
      return s <= _today && en >= _today;
    }).length;
    if (todayCount > 0) navigator.setAppBadge(todayCount).catch(() => {});
    else navigator.clearAppBadge().catch(() => {});
  }
  const sourceEvents = getActiveEvents();
  var _tc=document.getElementById('total-count'); if(_tc) _tc.textContent=sourceEvents.length;
  const _ec=document.getElementById('events-count'); if(_ec) _ec.textContent=filtered.length;
  if(viewMode==='map'){
    document.getElementById('cal').style.display='none';
    document.getElementById('map-wrap').style.display='block';
    renderMap(filtered); return;
  }
  document.getElementById('cal').style.display='';
  document.getElementById('map-wrap').style.display='none';
  const _src = getActiveEvents();
  const _today = new Date(); _today.setHours(0,0,0,0);
  const pastCount = _src.filter(e => new Date(e.end) < _today).length;
  const byMonth={};
  filtered.forEach(e=>{const m=parseInt(e.start.split('-')[1])-1;if(!byMonth[m])byMonth[m]=[];byMonth[m].push(e);});
  const cal=document.getElementById('cal');
  if(!filtered.length){
    cal.innerHTML='<div class="empty"><h3>Keine Events gefunden</h3><p>Versuch einen anderen Suchbegriff oder Filter.</p>'+(pastCount>0&&!showPast?`<br><button onclick="togglePast()" style="margin-top:1rem;padding:8px 16px;border-radius:8px;border:1px solid rgba(255,255,255,.2);background:transparent;color:var(--muted);cursor:pointer;font-family:DM Sans,sans-serif;font-size:13px">🕐 ${pastCount} vergangene Events anzeigen</button>`:'')+'</div>';
    return;
  }
  const _today2=new Date();_today2.setHours(0,0,0,0);
  const seasonalCount=_src.filter(e=>isSeasonal(e)).length;
  const seasonalBanner = seasonalCount>0 ? `<div style="text-align:center;padding:.5rem 0 .25rem"><button onclick="toggleSeasonal()" style="padding:7px 16px;border-radius:8px;border:1px solid rgba(232,150,58,.3);background:rgba(232,150,58,.08);color:var(--accent);cursor:pointer;font-family:DM Sans,sans-serif;font-size:12px;transition:all .15s">🗓 ${showSeasonal?'✕ Saison-Events ausblenden':`${seasonalCount} laufende Saison-Events einblenden`}</button></div>` : '';
  const pastBanner = (!showPast && pastCount>0) ? `<div style="text-align:center;padding:.75rem;margin-bottom:1rem"><button onclick="togglePast()" style="padding:7px 16px;border-radius:8px;border:1px solid rgba(255,255,255,.15);background:transparent;color:var(--muted);cursor:pointer;font-family:DM Sans,sans-serif;font-size:12px;transition:all .15s" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--muted)'">🕐 ${pastCount} vergangene Events einblenden</button></div>` : (showPast ? `<div style="text-align:center;padding:.75rem;margin-bottom:1rem"><button onclick="togglePast()" style="padding:7px 16px;border-radius:8px;border:1px solid rgba(255,255,255,.15);background:transparent;color:var(--muted);cursor:pointer;font-family:DM Sans,sans-serif;font-size:12px" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--muted)'">✕ Vergangene Events ausblenden</button></div>` : '');
  cal.innerHTML=seasonalBanner+pastBanner+Object.keys(byMonth).sort((a,b)=>+a-+b).map(m=>{
    const evs=byMonth[m];
    let rows;
    if(viewMode==='list'){
      const items=evs.map(eventRowHTML);
      // In-Feed Ad alle 10 Events einfügen
      const withAds=[];
      items.forEach((html,i)=>{ withAds.push(html); if((i+1)%10===0) withAds.push(inFeedAdHTML()); });
      rows=`<div class="events-list">${withAds.join('')}</div>`;
    } else {
      const items=evs.map(eventCardHTML);
      const withAds=[];
      items.forEach((html,i)=>{ withAds.push(html); if((i+1)%10===0) withAds.push(inFeedAdHTML()); });
      rows=`<div class="events-grid">${withAds.join('')}</div>`;
    }
    return `<div class="month-block" id="month-${m}"><div class="month-header"><span class="month-name">${MONTHS[m]}</span><span class="month-count">${evs.length} Event${evs.length!==1?'s':''}</span></div>${rows}</div>`;
  }).join('');
  cal.querySelectorAll('[data-idx]').forEach(el=>el.addEventListener('click',()=>openModal(parseInt(el.dataset.idx))));
  updateScrollObserver();
  initVianaSparkles();
}

/* ── VIANA SPARKLES ── */
function injectSparkles(container) {
  container.querySelectorAll('.viana-sparkle').forEach(s=>s.remove());
  const SHAPES = ['dot','dot','dot','dot','star','star','star','cross','cross','diamond'];
  const count = 26;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    const shape = SHAPES[Math.floor(Math.random()*SHAPES.length)];
    s.className = 'viana-sparkle viana-sparkle-' + shape;
    const top = 2 + Math.random() * 94;
    const left = 1 + Math.random() * 97;
    const dur = (1.2 + Math.random() * 2.8).toFixed(2);
    const delay = (Math.random() * 5).toFixed(2);
    const size = (1.8 + Math.random() * 3.2).toFixed(1);
    s.style.cssText = `top:${top}%;left:${left}%;--dur:${dur}s;--delay:${delay}s;--sz:${size}px`;
    container.appendChild(s);
  }
}
function initVianaSparkles() {
  document.querySelectorAll('.viana-event').forEach(el => injectSparkles(el));
}

/* ── YOUTUBE MINI PLAYER ── */
let _ytActiveBtn = null;
function toggleYtPlayer(videoId, title, btn) {
  const player = document.getElementById('yt-mini-player');
  const iframe = document.getElementById('yt-iframe');
  const titleEl = document.getElementById('yt-mini-title');
  const isModal = btn && btn.id === 'modal-music-btn';
  // If same video already open → close
  if (player.classList.contains('open') && player.dataset.vid === videoId) {
    closeYtPlayer();
    return;
  }
  // Reset previous button
  if (_ytActiveBtn) {
    const wasModal = _ytActiveBtn.id === 'modal-music-btn';
    _ytActiveBtn.innerHTML = wasModal ? `▶ ${_ytActiveBtn.dataset.title||'Abspielen'}` : '▶';
    _ytActiveBtn.classList.remove('playing');
  }
  // Open player
  titleEl.textContent = '🎵 ' + title;
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  player.dataset.vid = videoId;
  player.classList.add('open');
  // Update button
  if (btn) {
    _ytActiveBtn = btn;
    if (btn.dataset) btn.dataset.title = title;
    btn.innerHTML = isModal ? '⏸ Pause' : '⏸';
    btn.classList.add('playing');
  }
}
function closeYtPlayer() {
  const player = document.getElementById('yt-mini-player');
  const iframe = document.getElementById('yt-iframe');
  player.classList.remove('open');
  iframe.src = '';
  player.dataset.vid = '';
  if (_ytActiveBtn) {
    const wasModal = _ytActiveBtn.id === 'modal-music-btn';
    _ytActiveBtn.innerHTML = wasModal ? `▶ ${_ytActiveBtn.dataset.title||'Abspielen'}` : '▶';
    _ytActiveBtn.classList.remove('playing');
    _ytActiveBtn = null;
  }
}

/* ── MUSIC PLAYER ── */
let _audio = null, _activeBtn = null;
function toggleMusic(btn, src) {
  const isModal = btn.id === 'modal-music-btn';
  if (_audio && !_audio.paused && _activeBtn === btn) {
    _audio.pause();
    btn.innerHTML = isModal ? '▶ Abspielen' : '▶';
    btn.classList.remove('playing');
    return;
  }
  if (_audio) {
    _audio.pause();
    if (_activeBtn) {
      const wasModal = _activeBtn.id === 'modal-music-btn';
      _activeBtn.innerHTML = wasModal ? '▶ Abspielen' : '▶';
      _activeBtn.classList.remove('playing');
    }
  }
  _audio = new Audio(src);
  _audio.volume = 0.75;
  _activeBtn = btn;
  btn.innerHTML = isModal ? '⏸ Pause' : '⏸';
  btn.classList.add('playing');
  _audio.play().catch(()=>{});
  _audio.addEventListener('ended', () => {
    btn.innerHTML = isModal ? '▶ Abspielen' : '▶';
    btn.classList.remove('playing');
    _activeBtn = null;
  });
}

function renderMap(filtered) {
  const wrap=document.getElementById('map-wrap');
  if(!filtered.length){wrap.innerHTML='<div class="map-no-results">Keine Events für diese Auswahl.</div>';return;}
  wrap.innerHTML='<div id="map"></div>';
  if(leafletMap){leafletMap.remove();leafletMap=null;}
  leafletMap=L.map('map',{zoomControl:true}).setView([49.45,11.07],10);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{attribution:'© OpenStreetMap, © CARTO',subdomains:'abcd',maxZoom:19}).addTo(leafletMap);
  filtered.forEach(e=>{
    const col=CAT_COLORS[e.cat]||'#888', coords=getCoords(e.loc);
    const marker=L.circleMarker(coords,{radius:9,fillColor:col,color:'#0e0f13',weight:2,opacity:1,fillOpacity:.9}).addTo(leafletMap);
    marker.bindPopup(`<div class="popup-name">${e.name}</div><div class="popup-loc">📍 ${e.loc}</div><div class="popup-date">📅 ${dateStr(e.start,e.end)}</div>`);
    marker.on('click',()=>openModal(events.indexOf(e)));
  });
}

function buildMonthTimeline() {
  const tl=document.getElementById('month-timeline');
  const months=new Set(getActiveEvents().map(e=>parseInt(e.start.split('-')[1])-1));
  let html='';
  for(let m=0;m<12;m++){if(!months.has(m))continue;html+=`<button class="month-jump has-events" data-month="${m}">${MONTHS_S[m]}.</button>`;}
  tl.innerHTML=html;
  tl.querySelectorAll('.month-jump').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const m=parseInt(btn.dataset.month), el=document.getElementById(`month-${m}`);
      if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
      tl.querySelectorAll('.month-jump').forEach(b=>b.classList.remove('active-month'));
      btn.classList.add('active-month');
    });
  });
}

function updateScrollObserver() {
  const blocks=document.querySelectorAll('.month-block');
  if(!blocks.length)return;
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const m=entry.target.id.replace('month-','');
        document.querySelectorAll('.month-jump').forEach(b=>b.classList.toggle('active-month',b.dataset.month===m));
      }
    });
  },{threshold:0.2});
  blocks.forEach(b=>obs.observe(b));
}

function updateCountdown() {
  const today=new Date();today.setHours(0,0,0,0);
  const future=getActiveEvents().filter(e=>new Date(e.start)>=today).sort((a,b)=>a.start.localeCompare(b.start));
  if(!future.length)return;
  const next=future[0], diff=Math.round((new Date(next.start)-today)/86400000);
  const _cdDays=document.getElementById('cd-days'); if(_cdDays) _cdDays.innerHTML=diff===0?'Heute!':diff===1?'Morgen!':`${diff}<span> Tage</span>`;
  const _cdName=document.getElementById('cd-name'); if(_cdName) _cdName.textContent=next.name;
  const _cdDate=document.getElementById('cd-date'); if(_cdDate) _cdDate.textContent=`📅 ${dateStr(next.start,next.end)} · 📍 ${next.loc}`;
  document.getElementById('countdown-card').onclick=()=>openModal(getActiveEvents().indexOf(next));
}

function showToast(msg) {
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),2500);
}

function toggleWishlist(idx) {
  const sourceEvents = getActiveEvents();
  const e=sourceEvents[idx], key=e.name+e.start;
  if(wishlist.has(key)){wishlist.delete(key);showToast(`Entfernt: ${e.name}`);}
  else{wishlist.add(key);showToast(`Gemerkt: ${e.name} ❤️`);}
  saveWishlist();updateWishlistUI();render();
}

function toggleGoing(idx) {
  const sourceEvents = getActiveEvents();
  const e=sourceEvents[idx], key=e.name+e.start, wasGoing=goingList.has(key);
  if(wasGoing){ goingList.delete(key); showToast('Entfernt aus "Ich gehe hin"'); }
  else{ goingList.add(key); showToast(`✅ Ich gehe hin: ${e.name}!`); }
  saveGoingList();
  savePublicCount(e, wasGoing?-1:1).then(()=>render());
  render(); updateWishlistUI();
}

function updateWishlistUI() {
  const total=wishlist.size+goingList.size, btn=document.getElementById('wl-open-btn');
  const _wlc=document.getElementById('wl-count'); if(_wlc) _wlc.textContent=total;
  btn.style.display=total>0?'flex':'none';
  renderWishlistPanel();
}

function renderWishlistPanel() {
  const body=document.getElementById('wl-body'), footer=document.getElementById('wl-footer');
  const allEvts=[...events,...familyEvents];
  const saved=allEvts.filter(e=>wishlist.has(e.name+e.start)).sort((a,b)=>a.start.localeCompare(b.start));
  const going=allEvts.filter(e=>goingList.has(e.name+e.start)).sort((a,b)=>a.start.localeCompare(b.start));
  if(!saved.length&&!going.length){
    body.innerHTML='<div class="wishlist-empty">Noch nichts gespeichert.<br>Klick auf 🤍 oder 📅 bei einem Event!</div>';
    footer.style.display='none';return;
  }
  footer.style.display='flex';
  const savedHTML=saved.length?`
    <div class="wl-section-title">❤️ Gemerkte Events</div>
    ${saved.map(e=>{const idx=allEvts.indexOf(e),col=CAT_COLORS[e.cat]||'#888',key=e.name+e.start;
      return `<div class="wl-item" onclick="openModal(${idx})"><div class="wl-item-name" style="color:${col}">❤️ ${e.name}</div><div class="wl-item-date">📅 ${dateStr(e.start,e.end)} · 📍 ${e.loc}</div><button class="wl-remove" onclick="event.stopPropagation();removeFromWishlist('${key}')">✕</button></div>`;
    }).join('')}`:'';
  const goingHTML=going.length?`
    <div class="wl-section-title" style="margin-top:${saved.length?'1rem':'0'}">✅ Ich bin dabei</div>
    ${going.map(e=>{const idx=allEvts.indexOf(e),col=CAT_COLORS[e.cat]||'#888',key=e.name+e.start;
      return `<div class="wl-item" onclick="openModal(${idx})"><div class="wl-item-name" style="color:${col}">✅ ${e.name}</div><div class="wl-item-date">📅 ${dateStr(e.start,e.end)} · 📍 ${e.loc}</div><button class="wl-remove" onclick="event.stopPropagation();removeFromGoing('${key}')">✕</button></div>`;
    }).join('')}`:'';
  body.innerHTML=savedHTML+goingHTML;
}

function removeFromWishlist(key) {wishlist.delete(key);saveWishlist();updateWishlistUI();render();}
function removeFromGoing(key) {
  goingList.delete(key);
  saveGoingList();
  // Öffentlichen Zähler um -1 reduzieren
  const e=[...events,...familyEvents].find(ev=>ev.name+ev.start===key);
  if(e) savePublicCount(e,-1);
  updateWishlistUI();render();
}

function openModal(idx) {
  const sourceEvents = getActiveEvents();
  const e=sourceEvents[idx], col=CAT_COLORS[e.cat]||'#34d399';
  document.getElementById('m-cat').textContent=CAT_LABELS[e.cat];
  document.getElementById('m-cat').style.color=col;
  document.getElementById('m-title').textContent=e.name;
  // Logo via Google Favicon
  const logoEl = document.getElementById('m-logo');
  if (logoEl) {
    const logoDomain = getTicketDomain(e.ticket);
    if (e.viana) {
      logoEl.innerHTML = `<img src="assets/icon-96x96.png" alt="Viana" loading="lazy" style="width:48px;height:48px;object-fit:contain;filter:drop-shadow(0 0 6px rgba(201,162,39,0.5))">`;
      logoEl.style.display = 'flex';
    } else if (logoDomain) {
      logoEl.innerHTML = `<img src="https://www.google.com/s2/favicons?domain=${logoDomain}&sz=64" alt="" loading="lazy" onerror="this.parentElement.style.display='none'">`;
      logoEl.style.display = 'flex';
    } else {
      logoEl.innerHTML = '';
      logoEl.style.display = 'none';
    }
  }
  document.getElementById('m-date').textContent='📅 '+dateStr(e.start,e.end);
  const dist = getEventDist(e);
  document.getElementById('m-loc').textContent='📍 '+e.loc+(dist!==null?' · 📍 '+distLabel(dist):'');
  document.getElementById('m-desc').textContent=e.desc||'—';

  const badges=[];
  if(e.free)badges.push('<span class="badge badge-free">★ Kostenlos / Eintritt frei</span>');
  if(e.new)badges.push('<span class="badge badge-new">NEU 2026</span>');
  if(e.dresscode)badges.push(`<span class="badge badge-dc">Dresscode: ${e.dresscode}</span>`);
  if(e.genre)badges.push(`<span class="badge badge-date">${e.genre}</span>`);

  const ageLabel=e.ageMin===0?'Alle Altersgruppen':e.ageMin===8?'Ab 8 Jahren':e.ageMin===16?'Ab 16 Jahren':'Ab 18 Jahren';
  const practicalItems=[
    {label:'Ort',value:e.outdoor===true?'☀️ Outdoor':e.outdoor===false?'🏠 Indoor':'—',cls:''},
    {label:'Altersfreigabe',value:ageLabel,cls:e.ageMin>=16?'orange':'green'},
    {label:'Eintrittspreise',value:e.price||'—',cls:e.free?'green':''},
    {label:'ÖPNV-Anfahrt',value:e.oepnv||'—',cls:'blue'},
    {label:'Parken',value:e.parking||'—',cls:''},
  ];
  const grid=practicalItems.map(item=>`<div class="practical-item"><span class="practical-label">${item.label}</span><span class="practical-value ${item.cls}">${item.value}</span></div>`).join('');
  document.getElementById('m-badges').innerHTML=badges.join('')+`<div class="practical-grid" style="width:100%;margin-top:.8rem">${grid}</div>`;

  const locEncoded=encodeURIComponent(e.loc+', Deutschland');
  const deepLink=`${location.origin}${location.pathname}#${encodeURIComponent(e.name)}`;
  const shareText=encodeURIComponent(`🎉 ${e.name}\n📅 ${dateStr(e.start,e.end)}\n📍 ${e.loc}\n${deepLink}`);
  const waUrl=`https://wa.me/?text=${encodeURIComponent('Wer kommt mit? 🙌\n\n'+decodeURIComponent(shareText))}`;
  const fbUrl=`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(deepLink)}`;
  const hasCoords=e.lat&&e.lng, coordStr=hasCoords?`${e.lat},${e.lng}`:null;
  const gmapsUrl=hasCoords?`https://www.google.com/maps/search/?api=1&query=${coordStr}`:`https://www.google.com/maps/search/?api=1&query=${locEncoded}`;
  const appleMapsUrl=hasCoords?`https://maps.apple.com/?ll=${coordStr}&q=${encodeURIComponent(e.name)}`:`https://maps.apple.com/?q=${locEncoded}`;
  const transitUrl=hasCoords?`https://www.google.com/maps/dir/?api=1&destination=${coordStr}&travelmode=transit`:`https://www.google.com/maps/dir/?api=1&destination=${locEncoded}&travelmode=transit`;
  const isSaved=wishlist.has(e.name+e.start), isGoing=goingList.has(e.name+e.start);
  const PIN_SVG=`<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;
  const WA_SVG=`<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

  document.getElementById('m-actions').innerHTML = `
    ${e.music ? `
    <div class="modal-action-section">
      <div class="mas-label">🎵 Event-Musik</div>
      <div class="mas-row">
        <button class="mas-btn mas-music-btn" id="modal-music-btn" onclick="toggleMusic(this,'${e.music}')">▶ Abspielen</button>
      </div>
    </div>` : e.musicYt ? `
    <div class="modal-action-section">
      <div class="mas-label">🎵 Event-Musik</div>
      <div class="mas-row">
        <button class="mas-btn mas-music-btn" id="modal-music-btn" onclick="toggleYtPlayer('${e.musicYt}','${(e.musicTitle||e.name).replace(/'/g,"\\'")}',this)">▶ ${e.musicTitle||'Abspielen'}</button>
      </div>
    </div>` : ''}
    ${e.ticket ? `
    <div class="modal-action-section">
      <div class="mas-label">🌐 Website & Tickets</div>
      <div class="mas-row">
        <a class="mas-btn mas-web" href="${e.ticket}" target="_blank" rel="noopener">🌐 ${getTicketDomain(e.ticket)}</a>
      </div>
    </div>` : ''}
    <div class="modal-action-section">
      <div class="mas-label">📍 Navigation</div>
      <div class="mas-row">
        <a class="mas-btn mas-gmaps" href="${gmapsUrl}" target="_blank">${PIN_SVG} Google Maps</a>
        <a class="mas-btn mas-apple" href="${appleMapsUrl}" target="_blank">${PIN_SVG} Apple Maps</a>
        <a class="mas-btn mas-transit" href="${transitUrl}" target="_blank" rel="noopener">🚌 Mit ÖPNV hin</a>
      </div>
      ${e.oepnv?`<div class="mas-oepnv-hint"><span style="flex-shrink:0">🚊</span><span><strong style="color:rgba(251,191,36,.8);font-size:10px;display:block;margin-bottom:1px">ÖPNV-Tipp</strong>${e.oepnv}</span></div>`:''}
    </div>
    <div class="modal-action-section">
      <div class="mas-label">📤 Teilen</div>
      <div class="mas-row mas-row-wrap">
        ${'share' in navigator ? `<button class="mas-btn mas-wa" onclick="event.stopPropagation();navigator.share({title:'${e.name.replace(/'/g,"\'")}',text:'${e.name.replace(/'/g,"\'")} – ${dateStr(e.start,e.end).replace(/'/g,"\'")} – ${e.loc.replace(/'/g,"\'")}',url:'${deepLink}'}).catch(()=>{})">📤 Teilen</button>` : `<a class="mas-btn mas-wa" href="${waUrl}" target="_blank">${WA_SVG} Wer kommt mit?</a>`}
        <a class="mas-btn mas-wa" href="${waUrl}" target="_blank">${WA_SVG} WhatsApp</a>
        <button class="mas-btn mas-link" onclick="copyDeepLink('${deepLink}')">🔗 Link kopieren</button>
      </div>
    </div>
    <div class="modal-action-section">
      <div class="mas-label">🗂 Merkliste & Kalender</div>
      <div class="mas-row mas-row-wrap">
        <button class="mas-btn ${isSaved?'mas-heart-active':'mas-heart-idle'}" id="modal-heart-btn" onclick="toggleWishlistModal(${idx})">${isSaved?'❤️ Gemerkt (entfernen)':'🤍 Merken'}</button>
        <button class="mas-btn ${isGoing?'mas-going-active':'mas-going-idle'}" id="modal-going-btn" onclick="toggleGoingModal(${idx})">${isGoing?'👍 Ich bin dabei!':'👍 Ich bin dabei?'}</button>
        <button class="mas-btn mas-ics" onclick="downloadICS(${idx})">📥 .ics speichern</button>
      </div>
    </div>`;

  document.getElementById('modal-bg').classList.add('open');
  history.replaceState(null,'',`#${encodeURIComponent(e.name)}`);
  renderSimilarEvents(idx);
}

function toggleWishlistModal(idx) {
  const sourceEvents = getActiveEvents();
  const e=sourceEvents[idx], key=e.name+e.start, btn=document.getElementById('modal-heart-btn');
  if(wishlist.has(key)){wishlist.delete(key);if(btn){btn.textContent='🤍 Merken';btn.className='mas-btn mas-heart-idle';}showToast(`Entfernt: ${e.name}`);}
  else{wishlist.add(key);if(btn){btn.textContent='❤️ Gemerkt (entfernen)';btn.className='mas-btn mas-heart-active';}showToast(`Gemerkt: ${e.name} ❤️`);}
  saveWishlist();updateWishlistUI();render();
}

function toggleGoingModal(idx) {
  const sourceEvents = getActiveEvents();
  const e=sourceEvents[idx], key=e.name+e.start, btn=document.getElementById('modal-going-btn'), wasGoing=goingList.has(key);
  if(wasGoing){ goingList.delete(key); if(btn){btn.textContent='📅 Ich gehe hin!';btn.className='mas-btn mas-going-idle';} showToast('Entfernt aus "Ich gehe hin"'); }
  else{ goingList.add(key); if(btn){btn.textContent='✅ Dabei! (entfernen)';btn.className='mas-btn mas-going-active';} showToast(`✅ ${e.name} – du bist dabei!`); }
  saveGoingList();
  savePublicCount(e, wasGoing?-1:1).then(n=>{
    const el=document.getElementById('modal-going-count'); if(el) el.textContent=n;
  });
  render(); updateWishlistUI();
}

// ── LOCATION & DISTANCE ───────────────────────────────────────────────────────
let userLat = null, userLon = null, maxDist = 0;

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371, dLat = (lat2-lat1)*Math.PI/180, dLon = (lon2-lon1)*Math.PI/180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function getEventDist(e) {
  if(userLat===null) return null;
  const coords = getCoords(e.loc);
  if(!coords) return null;
  return haversine(userLat, userLon, coords[0], coords[1]);
}

function distLabel(km) {
  if(km===null) return '';
  return km < 1 ? '< 1 km' : `${Math.round(km)} km`;
}

function setUserLocation(lat, lon, label) {
  userLat=lat; userLon=lon;
  localStorage.setItem('viana_loc', JSON.stringify({lat,lon,label}));
  const status=document.getElementById('loc-status');
  status.className='loc-status active';
  status.innerHTML=`📍 ${label}`;
  document.getElementById('loc-clear-btn').style.display='';
  // auto-switch sort to distance
  const sel=document.getElementById('sort-select');
  if(sel.value==='date'){sel.value='dist'; sortMode='dist';}
  render();
}

function clearUserLocation() {
  userLat=null; userLon=null;
  localStorage.removeItem('viana_loc');
  document.getElementById('loc-status').className='loc-status';
  document.getElementById('loc-status').innerHTML='';
  document.getElementById('loc-clear-btn').style.display='none';
  const sel=document.getElementById('sort-select');
  if(sel.value==='dist'){sel.value='date'; sortMode='date';}
  render();
}

async function geocodePLZ(plz) {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${plz}&country=DE&format=json&limit=1`, {
      headers: {'Accept-Language':'de', 'User-Agent':'VianaEventsKalender/1.0'}
    });
    const data = await res.json();
    if(!data.length) { showToast('PLZ nicht gefunden'); return; }
    const {lat, lon, display_name} = data[0];
    const parts = display_name.split(',').map(p => p.trim());
    const city = parts.find(p => !/^\d{5}$/.test(p)) || parts[0];
    setUserLocation(parseFloat(lat), parseFloat(lon), `${plz} ${city}`);
  } catch(err) { showToast('Geocoding fehlgeschlagen'); }
}

function initLocation() {
  // restore saved location
  const saved = localStorage.getItem('viana_loc');
  if(saved) {
    const {lat,lon,label} = JSON.parse(saved);
    userLat=lat; userLon=lon;
    const status=document.getElementById('loc-status');
    status.className='loc-status active';
    status.innerHTML=`📍 ${label}`;
    document.getElementById('loc-clear-btn').style.display='';
  }

  // Geolocation — touchend als Fallback für mobile (click kann auf fixed-Elementen buggen)
  const _geoHandler = () => {
    if(!navigator.geolocation) { showToast('Geolocation nicht verfügbar'); return; }
    const status=document.getElementById('loc-status');
    status.className='loc-status'; status.innerHTML='⏳ Ermittle Standort…';
    navigator.geolocation.getCurrentPosition(
      pos => setUserLocation(pos.coords.latitude, pos.coords.longitude, 'Aktueller Standort'),
      err => {
        status.innerHTML='';
        if(err.code===1) showToast('Standort-Zugriff verweigert – bitte PLZ eingeben');
        else if(err.code===2) showToast('Standort nicht verfügbar – bitte PLZ eingeben');
        else showToast('Standort-Timeout – bitte PLZ eingeben');
      },
      { timeout: 12000, enableHighAccuracy: false, maximumAge: 60000 }
    );
  };
  const geoBtn = document.getElementById('loc-geo-btn');
  if(geoBtn) {
    geoBtn.addEventListener('click', _geoHandler);
    geoBtn.addEventListener('touchend', e => { e.preventDefault(); _geoHandler(); });
  }

  const clearBtn = document.getElementById('loc-clear-btn');
  if(clearBtn) clearBtn.addEventListener('click', clearUserLocation);

  // PLZ — input + change für Desktop, keydown Enter als Fallback
  // Kein blur — auf Mobile feuert blur zu früh (Tastatur noch offen)
  let _plzTimer = null;
  const _tryPLZ = e => {
    if(e.type==='keydown' && e.key!=='Enter') return;
    clearTimeout(_plzTimer);
    _plzTimer = setTimeout(() => {
      const plz = (document.getElementById('plz-input').value || '').trim();
      if(/^\d{5}$/.test(plz)) geocodePLZ(plz);
      else if(e.type==='keydown') showToast('Bitte eine gültige 5-stellige PLZ eingeben');
    }, 100);
  };
  const plzEl = document.getElementById('plz-input');
  if(plzEl) {
    plzEl.addEventListener('input',   _tryPLZ);
    plzEl.addEventListener('change',  _tryPLZ);
    plzEl.addEventListener('keydown', _tryPLZ);
  }

  document.getElementById('dist-select').addEventListener('change', e => {
    maxDist = parseInt(e.target.value);
    render();
  });
}

function copyDeepLink(url) {
  navigator.clipboard.writeText(url).then(()=>showToast('🔗 Link kopiert!')).catch(()=>{
    const ta=document.createElement('textarea');ta.value=url;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);showToast('🔗 Link kopiert!');
  });
}

function downloadICS(idx) {
  const sourceEvents = getActiveEvents();
  const e=sourceEvents[idx];
  const dtstart=e.start.replace(/-/g,'');
  const endDate=new Date(e.end);endDate.setDate(endDate.getDate()+1);
  const dtend=endDate.toISOString().slice(0,10).replace(/-/g,'');
  const desc=(e.desc||'').replace(/,/g,'\,').replace(/\n/g,'\\n');
  const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Viana NBG Events//DE','BEGIN:VEVENT',`UID:${e.name.replace(/[^a-z0-9]/gi,'-')}-${e.start}@viana`,`DTSTART;VALUE=DATE:${dtstart}`,`DTEND;VALUE=DATE:${dtend}`,`SUMMARY:${e.name}`,`LOCATION:${e.loc}`,`DESCRIPTION:${desc}\nEintritt: ${e.price||'—'}\nÖPNV: ${e.oepnv||'—'}`,'END:VEVENT','END:VCALENDAR'].join('\r\n');
  const blob=new Blob([ics],{type:'text/calendar'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`${e.name.replace(/[^a-zA-Z0-9]/g,'-')}.ics`;document.body.appendChild(a);a.click();document.body.removeChild(a);
  showToast(`📅 ${e.name} als ICS gespeichert`);
}

function renderSimilarEvents(currentIdx) {
  const sourceEvents = getActiveEvents();
  const current=sourceEvents[currentIdx];
  const similar=sourceEvents.filter((e,i)=>i!==currentIdx&&e.cat===current.cat).sort((a,b)=>Math.abs(new Date(a.start)-new Date(current.start))-Math.abs(new Date(b.start)-new Date(current.start))).slice(0,3);
  if(!similar.length)return;
  document.getElementById('m-similar').innerHTML=`<div class="similar-section"><div class="similar-title">Ähnliche Events</div><div class="similar-items">${similar.map(e=>{const idx=sourceEvents.indexOf(e),c=CAT_COLORS[e.cat]||'#34d399';return `<button class="similar-item" onclick="openModal(${idx})"><span class="similar-dot" style="background:${c}"></span><span class="similar-info"><span class="similar-name">${e.name}</span><span class="similar-date">📅 ${dateStr(e.start,e.end)} · 📍 ${e.loc}</span></span></button>`;}).join('')}</div></div>`;
}

function showSuggestions(q) {
  const el=document.getElementById('search-suggestions');
  if(!q||q.length<2){el.style.display='none';return;}
  const src=getActiveEvents();
  const matches=src.filter(e=>e.name.toLowerCase().includes(q)||e.loc.toLowerCase().includes(q)||(e.genre||'').toLowerCase().includes(q)).slice(0,7);
  if(!matches.length){el.style.display='none';return;}
  el.innerHTML=matches.map(e=>{
    const col=CAT_COLORS[e.cat]||'#888', idx=src.indexOf(e), diff=getDaysUntil(e.start);
    const cd=diff===0?'🔴 Heute!':diff>0&&diff<=14?`in ${diff}d`:'';
    return `<div class="suggestion-item" onclick="selectSuggestion(${idx})"><span class="suggestion-cat" style="background:${col}">${CAT_LABELS[e.cat]}</span><span class="suggestion-name">${e.name}</span><span class="suggestion-date">${cd||dateStr(e.start,e.end)}</span></div>`;
  }).join('');
  el.style.display='block';
}
function selectSuggestion(idx) {
  document.getElementById('search-suggestions').style.display='none';
  document.getElementById('search').value='';
  searchTerm='';render();
  setTimeout(()=>openModal(idx),50);
}


// ── STICKY HEADER HÖHE dynamisch ─────────────────────────────────────────────
function updateHeaderHeight() {
  const h = document.getElementById('app-header');
  if(!h) return;
  const height = h.offsetHeight;
  if(height < 40) return; // noch nicht gerendert
  document.documentElement.style.setProperty('--header-h', height+'px');
  // Direkt auf Element setzen – zuverlässiger als CSS-Variable auf mobile
  const banner = document.querySelector('.countdown-banner');
  if(banner) banner.style.marginTop = height+'px';
}
window.addEventListener('resize', updateHeaderHeight);
window.addEventListener('load', updateHeaderHeight);
// Mehrfach – mobile Browser rendern Fonts/Layout verzögert
updateHeaderHeight();
setTimeout(updateHeaderHeight, 50);
setTimeout(updateHeaderHeight, 250);
setTimeout(updateHeaderHeight, 700);

// ── HASHTAG FILTER ────────────────────────────────────────────────────────────
const SHEET_TAG_GROUPS = [
  { label:'🎉 Party & Family', tags:[{tag:'party',emoji:'🎉'},{tag:'family',emoji:'👨‍👩‍👧'}] },
  { label:'🎵 Musik & Stil', tags:[
    {tag:'festival',emoji:'🎪'},{tag:'club',emoji:'🪩'},{tag:'techno',emoji:'🔊'},
    {tag:'electronic',emoji:'⚡'},{tag:'house',emoji:'🏠'},{tag:'rock',emoji:'🎸'},
    {tag:'indie',emoji:'🎵'},{tag:'latino',emoji:'💃'},{tag:'hiphop',emoji:'🎤'},
  ]},
  { label:'🌍 Thema & Community', tags:[
    {tag:'russian',emoji:'<b style="background:#CC0000;color:#fff;font-size:9px;font-weight:800;padding:1px 4px;border-radius:3px;line-height:1.4;font-family:monospace">RU</b>'},{tag:'volksfest',emoji:'🍺'},{tag:'weinfest',emoji:'🍷'},
    {tag:'stadtfest',emoji:'🎪'},{tag:'zoo',emoji:'🦁'},{tag:'kinder',emoji:'🧒'},
    {tag:'freizeit',emoji:'🎡'},{tag:'sport',emoji:'🏃'},{tag:'messe',emoji:'🏛️'},
    {tag:'flohmarkt',emoji:'🛍️'},{tag:'strand',emoji:'🏖️'},{tag:'beachparty',emoji:'🏝️'},
  ]},
  { label:'📍 Rahmenbedingungen', tags:[
    {tag:'outdoor',emoji:'🌿'},{tag:'kostenlos',emoji:'🆓'},{tag:'camping',emoji:'⛺'},
  ]},
];

function toggleTag(tag) {
  if(activeTags.has(tag)) activeTags.delete(tag); else activeTags.add(tag);
  updateTagUI(); buildMonthTimeline(); updateCountdown(); render();
}
window.toggleTag = toggleTag;

function clearAllTags() {
  activeTags=new Set(); updateTagUI(); buildMonthTimeline(); updateCountdown(); render();
}
window.clearAllTags = clearAllTags;

function setTagLogic(l) {
  tagLogic=l;
  const andEl=document.getElementById('logic-and'), orEl=document.getElementById('logic-or');
  if(andEl) andEl.classList.toggle('active',l==='and');
  if(orEl) orEl.classList.toggle('active',l==='or');
  const hintEl=document.getElementById('logic-hint');
  if(hintEl) hintEl.textContent=l==='and'?'Events müssen alle Tags haben':'Events brauchen mind. einen Tag';
  render();
}
window.setTagLogic = setTagLogic;

function openFilterSheet() {
  buildFilterSheet();
  document.getElementById('filter-sheet').classList.add('open');
  document.getElementById('filter-overlay').classList.add('open');
  document.body.style.overflow='hidden';
}
window.openFilterSheet = openFilterSheet;

function closeFilterSheet() {
  document.getElementById('filter-sheet').classList.remove('open');
  document.getElementById('filter-overlay').classList.remove('open');
  document.body.style.overflow='';
}
window.closeFilterSheet = closeFilterSheet;

// Aktiver Monatsfilter (null = alle)
let activeMonthFilter = null;
window.setMonthFilter = function(m) {
  activeMonthFilter = (activeMonthFilter === m) ? null : m;
  buildFilterSheet(); render();
};
window.setQuickFromSheet = function(k) {
  quickFilter = k;
  document.querySelectorAll('.qpill').forEach(p=>p.classList.toggle('active',p.dataset.quick===k));
  buildFilterSheet(); render();
};
window.setSortFromSheet = function(k) {
  sortMode = k;
  const sel=document.getElementById('sort-select'); if(sel) sel.value=k;
  buildFilterSheet(); render();
};

function buildFilterSheet() {
  const body=document.getElementById('filter-sheet-body');
  if(!body) return;

  // Monate
  const availableMonths=[...new Set(getActiveEvents().map(e=>parseInt(e.start.split('-')[1])))].sort((a,b)=>a-b);
  const monthNames=['Jan','Feb','Mrz','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];
  const monthSection=`<div class="sheet-group">
    <div class="sheet-group-label">🗓 Monat</div>
    <div class="sheet-group-pills">
      ${availableMonths.map(m=>`<div class="sheet-htag sheet-month${activeMonthFilter===m?' active':''}" onclick="setMonthFilter(${m})">${monthNames[m-1]}</div>`).join('')}
    </div>
  </div>`;

  // Zeitfilter
  const quickOpts=[{k:'alle',l:'Alle Zeiten'},{k:'today',l:'Heute'},{k:'week',l:'Diese Woche'},{k:'month',l:'Dieser Monat'},{k:'next',l:'Nächstes Event'}];
  const quickSection=`<div class="sheet-group">
    <div class="sheet-group-label">⏱ Zeitraum</div>
    <div class="sheet-group-pills">
      ${quickOpts.map(o=>`<div class="sheet-htag${quickFilter===o.k?' active':''}" onclick="setQuickFromSheet('${o.k}')">${o.l}</div>`).join('')}
    </div>
  </div>`;

  // Sortierung
  const sortOpts=[{k:'date',l:'📅 Nach Datum'},{k:'name',l:'A–Z Name'},{k:'dist',l:'📍 Entfernung'}];
  const sortSection=`<div class="sheet-group">
    <div class="sheet-group-label">↕ Sortierung</div>
    <div class="sheet-group-pills">
      ${sortOpts.map(o=>`<div class="sheet-htag${sortMode===o.k?' active':''}" onclick="setSortFromSheet('${o.k}')">${o.l}</div>`).join('')}
    </div>
  </div>`;

  body.innerHTML = monthSection + quickSection + sortSection + SHEET_TAG_GROUPS.map(g=>`
    <div class="sheet-group">
      <div class="sheet-group-label">${g.label}</div>
      <div class="sheet-group-pills">
        ${g.tags.map(({tag,emoji})=>`<div class="sheet-htag${activeTags.has(tag)?' active':''}" onclick="toggleTag('${tag}')"><span>${emoji}</span>#${tag}</div>`).join('')}
      </div>
    </div>`).join('');

  const applyBtn=document.getElementById('filter-apply-btn');
  if(applyBtn){const n=getFiltered().length;applyBtn.textContent=(activeTags.size>0||activeMonthFilter)?`${n} Events anzeigen`:'Schließen';}
}

function updateTagUI() {
  // Hashtag-Pills in der Hauptzeile
  document.querySelectorAll('.htag[data-tag]').forEach(el=>{
    el.classList.toggle('active',activeTags.has(el.dataset.tag));
  });
  // Filter-Button Badge
  const badge=document.getElementById('filter-badge'), btn=document.getElementById('filter-open-btn');
  if(badge){badge.style.display=activeTags.size?'inline':'none';badge.textContent=activeTags.size;}
  if(btn) btn.classList.toggle('has-filters',activeTags.size>0);
  // Aktive Tags Zeile
  const row=document.getElementById('active-tags-row');
  if(row){
    row.innerHTML=activeTags.size>0
      ?[...activeTags].map(t=>`<span class="active-tag-chip" onclick="toggleTag('${t}')">#${t} ✕</span>`).join('')
       +`<span class="active-tag-clear" onclick="clearAllTags()">Alle löschen</span>`
      :'';
  }
  // #alle pill: aktiv wenn keine Tags gesetzt
  const alleEl=document.getElementById('htag-alle');
  if(alleEl) alleEl.classList.toggle('active', activeTags.size===0);
  // Sheet neu bauen wenn offen
  if(document.getElementById('filter-sheet')?.classList.contains('open')) buildFilterSheet();
}


function checkDeepLink() {
  const hash=decodeURIComponent(location.hash.slice(1));
  if(!hash)return;
  const srcEvents=getActiveEvents();
  const idx=srcEvents.findIndex(e=>e.name.toLowerCase().replace(/\s/g,'')==hash.toLowerCase().replace(/\s/g,''));
  if(idx>=0)setTimeout(()=>openModal(idx),300);
}

// ── WIRE UP ───────────────────────────────────────────────────────────────────
// Hashtag-Pills in der Hauptzeile (via Event-Delegation)
document.addEventListener('click', e => {
  const htag = e.target.closest('.htag[data-tag]');
  if(htag) toggleTag(htag.dataset.tag);
});

document.getElementById('search').addEventListener('input',e=>{
  searchTerm=e.target.value;
  showSuggestions(e.target.value.toLowerCase());render();
});
document.getElementById('search').addEventListener('focus',e=>{if(e.target.value.length>=2)showSuggestions(e.target.value.toLowerCase());});
document.addEventListener('click',e=>{if(!e.target.closest('.search-wrap'))document.getElementById('search-suggestions').style.display='none';});

document.getElementById('btn-list').addEventListener('click',()=>{viewMode='list';document.querySelectorAll('.view-btn').forEach(b=>b.classList.remove('active'));document.getElementById('btn-list').classList.add('active');render();});
document.getElementById('btn-grid').addEventListener('click',()=>{viewMode='grid';document.querySelectorAll('.view-btn').forEach(b=>b.classList.remove('active'));document.getElementById('btn-grid').classList.add('active');render();});
document.getElementById('btn-map').addEventListener('click',()=>{viewMode='map';document.querySelectorAll('.view-btn').forEach(b=>b.classList.remove('active'));document.getElementById('btn-map').classList.add('active');render();});

document.querySelectorAll('.qpill').forEach(p=>p.addEventListener('click',()=>{
  document.querySelectorAll('.qpill').forEach(x=>x.classList.remove('active'));
  p.classList.add('active');quickFilter=p.dataset.quick;render();
}));
document.getElementById('sort-select').addEventListener('change',e=>{sortMode=e.target.value;render();});

document.getElementById('wl-open-btn').addEventListener('click',()=>{renderWishlistPanel();document.getElementById('wishlist-panel').classList.add('open');});
document.getElementById('wl-close').addEventListener('click',()=>document.getElementById('wishlist-panel').classList.remove('open'));
document.getElementById('wl-share-wa').addEventListener('click',()=>{
  const saved=[...events,...familyEvents].filter(e=>wishlist.has(e.name+e.start)).sort((a,b)=>a.start.localeCompare(b.start));
  if(!saved.length)return;
  const list=saved.map(e=>`• ${e.name} – ${dateStr(e.start,e.end)}`).join('\n');
  window.open(`https://wa.me/?text=${encodeURIComponent('Hey! \ud83d\udc4b Meine N\u00fcrnberg Events 2026:\n\n'+list)}`,'_blank');
});

document.getElementById('wl-copy-link').addEventListener('click',()=>{
  const saved=[...events,...familyEvents].filter(e=>wishlist.has(e.name+e.start)).sort((a,b)=>a.start.localeCompare(b.start));
  if(!saved.length)return;
  navigator.clipboard.writeText('Meine N\u00fcrnberg Events: '+saved.map(e=>e.name+' - '+dateStr(e.start,e.end)).join(', ')).catch(()=>{});
  showToast('Liste kopiert!');
});

function closeModal() {
  document.getElementById('modal-bg').classList.remove('open');
  history.replaceState(null,'',location.pathname);
  const burger=document.getElementById('burger-btn');
  if(burger) burger.style.display='';
}
window.closeModal = closeModal;

// X-Button (bleibt im DOM für Accessibility, aber per CSS ausgeblendet)
document.getElementById('modal-close').addEventListener('click', closeModal);

// Klick auf modal-bg (Overlay außerhalb des Modals) → schließen
document.getElementById('modal-bg').addEventListener('click', e => {
  if(e.target === document.getElementById('modal-bg')) closeModal();
});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    document.getElementById('modal-bg').classList.remove('open');
    history.replaceState(null,'',location.pathname);
    closeFilterSheet();
    const burger=document.getElementById('burger-btn');
    if(burger) burger.style.display='';
  }
});

// Burger bei Modal-Öffnen/Schließen explizit steuern (Fallback für :has()-Support)
const _origOpenModal = openModal;
window.openModal = function(idx) {
  _origOpenModal(idx);
  const burger=document.getElementById('burger-btn');
  if(burger) burger.style.display='none';
};

initLocation();
checkDeepLink();
render();
buildMonthTimeline();
updateCountdown();
loadPublicCounts();
updateHeaderHeight();

loadAdConfig().then(applyAdConfig);
