export enum Packs {
  Henry = 'henry',
  Diegazos = 'lmbecil',
  Juanito = 'juanito',
  PHC = 'phc',
}

export const PackLinks: Record<Packs, Object> = {
  [Packs.Henry]: {
    'Carpeta de Drive':
      'https://drive.google.com/drive/mobile/folders/1EEtYT4Qc__fZ4CZNhAVBBzU-WVSDzZWr',
  },
  [Packs.Diegazos]: {
    'Carpeta de Drive':
      'https://drive.google.com/drive/folders/1VRCzHRKPSG32k4d-Ohp-5gHS6K8DzZZf?usp=sharing',
  },
  [Packs.Juanito]: {
    'Carpeta de Drive':
      'https://drive.google.com/drive/u/0/folders/1SHb7hvc0xvqR2h80382-GpfIAffhsg2t',
  },
  [Packs.PHC]: {
    'Packs mensuales':
      'https://drive.google.com/drive/folders/1ucnvZyQnI1ouEX6UC2LWX03s4g9oLE4X?usp=sharing',
  },
};

export const PackDescriptions: Record<Packs, string> = {
  [Packs.Henry]:
    'Charter mexicano, enfocado a los temas en español. Compatibles en Clone Hero y Rock Band 3.',
  [Packs.Diegazos]:
    'Charter y streamer mexicano con más de 600 canciones charteadas en diferentes géneros musicales. Compatibles con Clone Hero.',
  [Packs.Juanito]:
    'Charter mexicano, enfocado a Molotov. Sus gustos son ZZZ y los mios son GOD. Compatibles con Clone Hero',
  [Packs.PHC]:
    'Packs mensuales de la comunidad de Plastic Hero Commuty. Compatibles con Clone Hero',
};
