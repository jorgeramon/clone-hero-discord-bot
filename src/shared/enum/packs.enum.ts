export enum Packs {
  Henry = 'henry',
  Diegazos = 'lmbecil',
  Juanito = 'juanito',
  PHC = 'phc',
  Eternal = 'eternal',
  Rockr = 'rockr',
  Raider = 'raider',
  Chava = 'chava',
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
};

export const PackDescriptions: Record<Packs, string> = {
  [Packs.Henry]:
    'Charter mexicano, enfocado a los temas en español. *Compatibles en Clone Hero y Rock Band 3.*',
  [Packs.Diegazos]:
    'Charter y streamer mexicano con más de 600 canciones charteadas en diferentes géneros musicales. *Compatibles con Clone Hero.*',
  [Packs.Juanito]:
    'Charter mexicano, enfocado a Molotov. Sus gustos son ZZZ y los mios son GOD. *Compatibles con Clone Hero.*',
  [Packs.Eternal]:
    'Charter mexicano enfocado en OST de videojuegos, canciones de monas chinas y cosas weeb. *Compatibles con Clone Hero.*',
  [Packs.Rockr]:
    'Pseudo charter mexicano, tiene bien pocas canciones pero hace lo que puede. *Compatibles con Clone Hero.*',
  [Packs.PHC]:
    'Packs mensuales de la comunidad de Plastic Hero Commuty. *Compatibles con Clone Hero.*',
  [Packs.Chava]:
    'Charter mexicano novato con tendencias sexuales hacia Eric Clapton, Buckethead y memes. *Compatibles con Clone Hero y Rocksmith*',
  [Packs.Raider]: 'nose:(',
};
