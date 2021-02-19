export enum Packs {
  Puppetz = 'puppetz',
  GuitarHero = 'guitarhero',
  Henry = 'henry',
  Diegazos = 'lmbecil',
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
  [Packs.Diegazos]: {
    'Carpeta de Drive':
      'https://drive.google.com/drive/folders/1VRCzHRKPSG32k4d-Ohp-5gHS6K8DzZZf?usp=sharing',
  },
};

export const PackDescriptions: Record<Packs, string> = {
  [Packs.GuitarHero]:
    'Packs de los juegos originales de Guitar Hero incluyendo Band Hero y DJ Hero. Compatibles con Clone Hero.',
  [Packs.Puppetz]:
    'Puppetz es uno de los charters legendarios en la era Frets On Fire. Compatibles con Clone Hero.',
  [Packs.Henry]:
    'Charter mexicano, enfocado a los temas en español. Compatibles en Clone Hero y Rock Band 3.',
  [Packs.Diegazos]:
    'Charter y streamer mexicano con más de 600 canciones charteadas en diferentes géneros musicales. Compatibles con Clone Hero.',
};
