export interface ScoreRow {
  label: string;
  aura: number | string;
  highlight?: boolean; // gold/top place styling
  negative?: boolean;  // red styling for penalties
}

export interface ScoreSection {
  heading?: string; // e.g. "Bij 4 spelers"
  rows: ScoreRow[];
}

export interface ChallengeGroup {
  heading: string;
  items: string[];
}

export interface Game {
  id: number;
  title: string;
  emoji: string;
  image?: string; // optional image URL, shown instead of emoji
  description: string;
  teamNote?: string;
  challengeGroups?: ChallengeGroup[];
  scoreSections: ScoreSection[];
  isFinal?: boolean;
}

export const GAMES: Game[] = [
  {
    id: 1,
    title: 'Internetgekkies',
    emoji: '📱',
    image: 'https://i.ytimg.com/vi/-9SXtQqVp9Q/maxresdefault.jpg',
    description:
      'Kies een gekkie, en doe je beste voice-over van het filmpje. ' +
      'Iedere speler geeft je een score van 1-7 op drie categorieën: accuraatheid, grappigheid en cringe. ' +
      'Schrijf je scores op een papiertje en geef dat aan ons. ' +
      'De totale score per persoon is accuraatheid + grappigheid + cringe. ' +
      'Team verdeling is als volgt: spelers 1, 3, 6 & 8 vormen Team Skibidi, en spelers 2, 4, 5 & 7 vormen Team Sigma. ' +
      'Verdiende aura = teamscore × 2.',
    scoreSections: [
      {
        heading: 'Puntenverdeling',
        rows: [
          { label: 'Accuraatheid', aura: '1 – 7' },
          { label: 'Grappigheid', aura: '1 – 7' },
          { label: 'Cringe', aura: '1 – 7' },
          { label: 'Aura per team', aura: 'Totaal × 2', highlight: true },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Just Dance',
    emoji: '🕺',
    image: 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/store/software/switch/70070000028929/93dc6060a9dd96800995c66d7cc2bcb01949065ee12e7b49092544eda967f938',
    description:
      'Iedereen komt twee keer aan de beurt. Puntenverdeling hangt af van het aantal spelers dat tegelijk danst.',
    scoreSections: [
      {
        heading: 'Bij 4 spelers',
        rows: [
          { label: '🥇 1e plaats', aura: 50, highlight: true },
          { label: '🥈 2e plaats', aura: 30 },
          { label: '🥉 3e plaats', aura: -10, negative: true },
          { label: '4e plaats', aura: 10 },
        ],
      },
      {
        heading: 'Bij 2 spelers',
        rows: [
          { label: '🥇 1e plaats', aura: 40, highlight: true },
          { label: '🥈 2e plaats', aura: 20 },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Drawful',
    emoji: '🎨',
    image: 'https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_download_software_1/H2x1_NSwitchDS_Drawful2_image1600w.jpg',
    description:
      'Teken zo goed (of slecht) als je kan en probeer de anderen te foppen. ' +
      'Eindscore bepaalt hoeveel aura je team krijgt.',
    scoreSections: [
      {
        rows: [
          { label: '🥇 1e plaats', aura: 70, highlight: true },
          { label: '🥈 2e plaats', aura: 50 },
          { label: '🥉 3e plaats', aura: 40 },
          { label: '4e plaats', aura: 35 },
          { label: '5e plaats', aura: 30 },
          { label: '6e plaats', aura: 25 },
          { label: '7e plaats', aura: 10 },
          { label: '8e plaats', aura: 30 },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Koekkwakken',
    emoji: '🍪',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Roze_koek.jpg/330px-Roze_koek.jpg',
    description: '1 koekje. Je kent de regels. Succes en eet smakelijk voor de gelukkige.',
    scoreSections: [
      {
        rows: [
          { label: 'Laatste plaats', aura: -500, negative: true },
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Boomerang Fu',
    emoji: '🪃',
    image: 'https://store-images.s-microsoft.com/image/apps.27964.14217927423059510.eac0d219-b30c-4063-879f-17d087c77c3c.df0037f3-78b4-4bfe-a535-5d39d5574d5b',
    description:
      'Gooi boemerangs, ontwijk aanvallen en versla je tegenstanders.',
    scoreSections: [
      {
        rows: [
          { label: '🥇 1e plaats', aura: 50, highlight: true },
          { label: '🥈 2e plaats', aura: 25 },
          { label: '🥉 3e plaats', aura: -10, negative: true },
          { label: '4e plaats', aura: 0 },
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'ScreenCheat',
    emoji: '👀',
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/301970/capsule_616x353.jpg?t=1747870310',
    description:
      'Iedereen is onzichtbaar — de enige manier om je tegenstanders te vinden is door op hun scherm te gluren. ' +
      'Screen-kijken is niet vals spelen, het ís het spelletje.',
    scoreSections: [
      {
        rows: [
          { label: '🥇 1e plaats', aura: 50, highlight: true },
          { label: '🥈 2e plaats', aura: 25 },
          { label: '🥉 3e plaats', aura: -10, negative: true },
          { label: '4e plaats', aura: 0 },
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'Stickfight: The Game',
    emoji: '🥊',
    image: 'https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_download_software_1/H2x1_NSwitchDS_StickFightTheGame_image1600w.jpg',
    description:
      'Vecht met stokpoppen en gebruik de omgeving in jouw voordeel. ',
    scoreSections: [
      {
        rows: [
          { label: '🥇 1e plaats', aura: 50, highlight: true },
          { label: '🥈 2e plaats', aura: 25 },
          { label: '🥉 3e plaats', aura: -10, negative: true },
          { label: '4e plaats', aura: 0 },
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'Omegle Challenge',
    emoji: '🎥',
    image: 'https://gamequitters.com/wp-content/uploads/omegle-app-review-1024x576.jpg',
    description:
      'Per team zijn er 4 één-minuut-challenges en 2 zoveel-mogelijk-challenges. ' +
      'Teams kiezen zelf welke challenges ze doen, en in welke volgorde. ' +
      'Je hebt 5 minuten per challenge.',
    challengeGroups: [
      {
        heading: '1-minuut opdrachten',
        items: [
          'Houd iemand 1 minuut aan de lijn door: wacht altijd 3 seconden voordat je reageert op ALLES',
          'Doe alsof je LIVE bent — begroet de trouwe nieuwe kijker',
          'Overtuig iemand ervan dat duiven eigenlijk drones van de overheid zijn',
          'Voer een toneelstukje op: 1 persoon is een paard, 1 persoon is een cowboy',
          'Spiegel alles wat je beller doet — bewegingen, gezichtsuitdrukkingen en postuur',
          'Antwoord alles met precies 1 woord (mag telkens een ander woord zijn)',
          'Doe je voor als customer service voor het leven — luister naar het probleem en geef advies',
        ],
      },
      {
        heading: 'Zoveel-mogelijk challenges (team vs team)',
        items: [
          'Freeze challenge: creëer een scene, blijf doodstil — team met de langste beller wint',
          'Krijg zoveel mogelijk van een object in beeld: lepels, schoenen of lego figuurtjes',
          'Krijg zoveel mogelijk mensen aan het dansen.',
          'Bedenk je eigen opdracht!?',
        ],
      },
    ],
    scoreSections: [
      {
        heading: 'Puntenverdeling',
        rows: [
          { label: 'Per succesvolle 1-minuut opdracht', aura: 100, highlight: true },
          { label: 'Winnen zoveel-mogelijk challenge', aura: 100, highlight: true },
        ],
      },
      {
        heading: 'Per team',
        rows: [
          { label: '1-minuut challenges', aura: '3 opdrachten' },
          { label: 'Zoveel-mogelijk challenges', aura: '2 opdrachten' },
        ],
      },
    ],
    isFinal: true,
  },
];
