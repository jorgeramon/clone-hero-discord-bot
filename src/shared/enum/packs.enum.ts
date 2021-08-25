export enum Packs {
  Henry = 'henry',
  Diegazos = 'lmbecil',
  Juanito = 'juanito',
  PHC = 'phc',
  Eternal = 'eternal',
  Rockr = 'rockr',
  Raider = 'raider',
  Chava = 'chava',
  Row = 'row',
}

export const PackLinks: Record<Packs, Object> = {
  [Packs.Henry]: {
    'Carpeta de Drive':
      'https://drive.google.com/drive/mobile/folders/1EEtYT4Qc__fZ4CZNhAVBBzU-WVSDzZWr',
  },
  [Packs.Diegazos]: {
    'Carpeta de Drive':
      'https://drive.google.com/drive/folders/1VRCzHRKPSG32k4d-Ohp-5gHS6K8DzZZf',
  },
  [Packs.Juanito]: {
    'Carpeta de Drive':
      'https://drive.google.com/drive/folders/1y8XORv17Xmvic0XqhF-dULvd4H0KKgOa',
  },
  [Packs.Eternal]: {
    'Carpeta Drive':
      'https://drive.google.com/folderview?id=1YJQVBeX0K3054NwjA6jsmUcMrabuOlHp',
  },
  [Packs.Rockr]: {
    'Carpeta Drive':
      'https://drive.google.com/drive/folders/1qhczcfrcKSdVH-D5V0ubpxhAltX7-2-A',
  },
  [Packs.Raider]: {
    'Carpeta Drive':
      'https://drive.google.com/drive/folders/1FF4haRjGGNxlj6qXy9uKQ9AzWfDYpPr5',
  },
  [Packs.Chava]: {
    'Carpeta Drive': 'https://bit.ly/3wZ02fk',
  },
  [Packs.PHC]: {
    'Packs mensuales':
      'https://drive.google.com/drive/folders/1ucnvZyQnI1ouEX6UC2LWX03s4g9oLE4X',
  },
  [Packs.Row]: {
    'Carpeta Drive':
      'https://drive.google.com/drive/folders/1yd-uq3nFmEndjJdKeACZrRNJFVmSlOhu?usp=sharing',
  },
};

export const PackDescriptions: Record<Packs, string> = {
  [Packs.Henry]:
    'Charter mexicano, enfocado a los temas en español. *Compatibles en Clone Hero y Rock Band 3.*',
  [Packs.Diegazos]:
    'Charter y streamer mexicano con más de 600 canciones charteadas en diferentes géneros musicales. *Compatibles con Clone Hero.*',
  [Packs.Juanito]:
    'Montaña rusa en forma de charter mexicano, tiene charts muy buenos y otros muy xd, enfocado principalmente en Español. *Compatibles con Clone Hero y algunos pocos con Rock Band 3.*',
  [Packs.Eternal]:
    'Charter mexicano enfocado en OST de videojuegos, canciones de monas chinas y cosas weeb. *Compatibles con Clone Hero.*',
  [Packs.Rockr]:
    'Pseudo charter mexicano, tiene bien pocas canciones pero hace lo que puede. *Compatibles con Clone Hero.*',
  [Packs.PHC]:
    'Packs mensuales de la comunidad de Plastic Hero Commuty. *Compatibles con Clone Hero.*',
  [Packs.Chava]:
    'Charter mexicano novato con tendencias sexuales hacia Eric Clapton, Buckethead y memes. *Compatibles con Clone Hero y Rocksmith.*',
  [Packs.Raider]:
    'Charter mexicano con canciones en distintos géneros y autor de "Que Hueva", "SinAlma" entre otros. *Compatibles con Clone Hero y Rock Band 3.*',
  [Packs.Row]:
    'Charter mexicano, jugador profesional y CEO de Abarrotes Rubín. *Compatibles con Clone Hero.*',
};
