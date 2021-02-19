export enum Packs {
  Puppetz = 'puppetz',
  GuitarHero = 'guitarhero',
  Henry = 'henry',
}

export const PackLinks: Record<Packs, Object> = {
  [Packs.GuitarHero]: {
    'Guitar Hero': 'https://gofile.io/d/i8UPVi',
    //'Guitar Hero 2': '',
    //'Guitar Hero 2 DLC': '',
    //'Guitar Hero 3 Legends of Rock': '',
    //'Guitar Hero 3 Legends of Rock DLC': '',
    //'Guitar Hero World Tour': '',
    //'Guitar Hero World Tour DLC': '',
    //'Guitar Hero 5': '',
    //'Guitar Hero 5 DLC': '',
    //'Guitar Hero Warriors of Rock': '',
    //'Guitar Hero Warriors of Rock DLC': '',
    'Guitar Hero Metallica': 'https://gofile.io/d/i8UPVi',
    //'Guitar Hero Smash Hits': '',
    'Band Hero': 'https://gofile.io/d/fsmjKL',
    'DJ Hero': 'https://gofile.io/d/1rZDbE',
  },
  [Packs.Puppetz]: {
    'Puppetz Hero Zero': 'https://gofile.io/d/1wNLJr',
    'Puppetz Hero': 'https://gofile.io/d/VY75ip',
    'Puppetz Hero 2': 'https://gofile.io/d/1wNLJr',
    'Puppetz Hero 3': 'https://gofile.io/d/iGjrNJ',
    'Puppetz Hero 4': 'https://gofile.io/d/QhMqEL',
    'Puppetz Hero 5': 'https://gofile.io/d/XmKw8E',
    'Puppetz Hero Dragonforce': 'https://gofile.io/d/s2BCH0',
    'Puppetz Hero Megadeth': 'https://gofile.io/d/jeG2CS',
    'Puppetz Hero Iron Maiden': 'https://gofile.io/d/SUa2PS',
    'Puppetz Hero T': 'https://gofile.io/d/f59YWc',
    'Cowbows From Hell (Full Album)': 'https://gofile.io/d/qmMf3O',
    'Rock Band X': 'https://gofile.io/d/FGOyJc',
  },
  [Packs.Henry]: {
    'Carpeta de Drive':
      'https://drive.google.com/drive/mobile/folders/1EEtYT4Qc__fZ4CZNhAVBBzU-WVSDzZWr',
  },
};

export const PackDescriptions: Record<Packs, string> = {
  [Packs.GuitarHero]:
    'Packs de los juegos originales de Guitar Hero incluyendo Guitar Hero Live, Band Hero y DJ Hero.',
  [Packs.Puppetz]:
    'Puppetz es uno de los charters legendarios en la era Frets On Fire, sus packs son difíciles de conseguir. Podrás encontrar los packs de Puppetz Hero Zero, 1, 2, 3 y 4 (algunos incompletos) además de packs dedicados a Megadeth, Iron Maiden, Metallica entre otros.',
  [Packs.Henry]:
    'Charter mexicano, enfocado a los temas en español para RB3 y CH.',
};
