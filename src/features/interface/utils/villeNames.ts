const villes: string[] = [
  "Skavenblight",
  "Marienburg",
  "Skeggi",
  "Zharr-Naggrund",
  "Tylos",
  "Zanbaijin",
  "Sartosa",
  "Remas",
  "Athel Maraya",
  "Kislev",
  "Nagashizzar",
  "Luccini",
  "Bel-Aliad",
  "Molto Morgheim",
  "Tobaro",
  "Vorshgar",
  "Weijin",
  "Whitefire Tor",
  "Trantio",
  "Tol Eldroth",
  "Tor Kathyr",
  "Verezzo",
  "Udolpho",
  "Pavona",
  "Miragliano",
  "Middenheim",
  "Deadgate",
  "Siggurdheim",
  "Scorcio",
  "Soqotra",
  "Scarosio",
  "Scozzese",
  "Parmis",
  "Lumbrusco",
  "Zeluco",
  "Varenna",
  "Vedenza",
  "Ravola",
  "Palace of the Wizard Caliph",
  "Tinea",
  "Athel Toralien",
  "Inevitable City",
  "New Bechafen",
  "Swamp Town",
  "Floating Village",
  "Port Reaver",
  "Pigbarter",
  "Dumio",
  "Savoie",
  "Remas",
  "Altdorf",
  "Nuln",
  "Karaz-a-Karak",
  "Lothern",
  "Naggarond",
  "Hexoatl",
  "Quetza",
  "Itza",
  "Xlanhuapec",
  "Tlaxtlan",
  "Oyxl",
  "Chupayotl",
  "Ghrond",
  "Clar Karond",
  "Hag Graef",
  "Har Ganeth",
  "Karond Kar",
  "Tor Anroc",
  "Tor Yvresse",
  "Caledor",
  "Saphery",
  "Avelorn",
  "Ulthuan",
  "Chrace",
  "Eataine",
  "Ellyrion",
  "Tiranoc",
  "Cothique",
  "Nagarythe",
  "Karak Eight Peaks",
  "Karak Azul",
  "Karak Hirn",
  "Karak Norn",
  "Karak Kadrin",
  "Karak Ziflin",
  "Karak Izor",
  "Zhufbar",
  "Barak Varr",
  "Grom Peak",
  "Couronne",
  "Bordeleaux",
  "Parravon",
  "Mousillon",
  "Quenelles",
  "Lyonesse",
  "Artois",
  "Montfort",
  "Gisoreux",
  "Bastonne",
  "Brionne",
  "Carcassonne",
  "Anguille",
  "Khemri",
  "Lahmia",
  "Zandri",
  "Numas",
  "Rasetra",
  "Lybaras",
  "Mahrak",
  "Quatar",
  "Bhagar",
  "Copher",
  "Martek",
  "Lashiek",
  "Sudenburg",
  "Praag",
  "Erengrad",
  "Kislev",
];

export const selectRandomVille = (usedNames: string[]) => {
  const availableNames = villes.filter((name) => !usedNames.includes(name));
  const randomIndex = Math.floor(Math.random() * availableNames.length);
  return availableNames[randomIndex];
};
