import { GekkieGameItem } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const a = (path: string) => `${(import.meta as any).env?.BASE_URL ?? '/'}${path.replace(/^\//, '')}`;

export const GEKKIE_GAME_DATA: GekkieGameItem[] = [
  {
    id: 1,
    screenshotUrl: a("/gekkies/1_blikje_in_de_water.png"),
    videoUrl: a("/gekkies/1_blikje_in_de_water.mp4"),
    title: "Blikje in de water"
  },
  {
    id: 2,
    screenshotUrl: a("/gekkies/2_dikke_BMW.png"),
    videoUrl: a("/gekkies/2_dikke_BMW.mp4"),
    title: "Dikke BMW"
  },
  {
    id: 3,
    screenshotUrl: a("/gekkies/3_jij_komen_hier.png"),
    videoUrl: a("/gekkies/3_jij_komen_hier.mp4"),
    title: "Jij komen hier"
  },
  {
    id: 4,
    screenshotUrl: a("/gekkies/4_o_nee.png"),
    videoUrl: a("/gekkies/4_o_nee.mp4"),
    title: "O nee"
  },
  {
    id: 5,
    screenshotUrl: a("/gekkies/5_helemaal_niks.png"),
    videoUrl: a("/gekkies/5_helemaal_niks.mp4"),
    title: "Helemaal niks"
  },
  {
    id: 6,
    screenshotUrl: a("/gekkies/6_water.png"),
    videoUrl: a("/gekkies/6_water.mp4"),
    title: "Water"
  },
  {
    id: 7,
    screenshotUrl: a("/gekkies/7_balkenende.png"),
    videoUrl: a("/sounds/7_balkenende.mp4"),
    title: "Balkenende"
  },
  {
    id: 8,
    screenshotUrl: a("/gekkies/8_verkeerde_kant.png"),
    videoUrl: a("/gekkies/8_verkeerde_kant.mp4"),
    title: "Verkeerde kant"
  },
  {
    id: 9,
    screenshotUrl: a("/gekkies/9_henk_ingrid.png"),
    videoUrl: a("/gekkies/9_henk_ingrid.mp4"),
    title: "Henk & Ingrid"
  },
  {
    id: 10,
    screenshotUrl: a("/gekkies/10_boodschap.png"),
    videoUrl: a("/gekkies/10_boodschap.mp4"),
    title: "Boodschap"
  },
  {
    id: 11,
    screenshotUrl: a("/gekkies/11_haanmevrouw.png"),
    videoUrl: a("/gekkies/11_haanmevrouw.mp4"),
    title: "Haanmevrouw"
  },
  {
    id: 12,
    screenshotUrl: a("/gekkies/12_raadslid.png"),
    videoUrl: a("/gekkies/12_raadslid.mp4"),
    title: "Raadslid"
  },
  {
    id: 13,
    screenshotUrl: a("/gekkies/13_steek_aan_dat_ding.png"),
    videoUrl: a("/gekkies/13_steek_aan_dat_ding.mp4"),
    title: "Steek aan dat ding"
  },
  {
    id: 14,
    screenshotUrl: a("/gekkies/14_wat_heb_je.png"),
    videoUrl: a("/gekkies/14_wat_heb_je.mp4"),
    title: "Wat heb je"
  },
  {
    id: 15,
    screenshotUrl: a("/gekkies/15_sinterklaas.png"),
    videoUrl: a("/gekkies/15_sinterklaas.mp4"),
    title: "Sinterklaas"
  },
  {
    id: 16,
    screenshotUrl: a("/gekkies/16_financieel adviseur.png"),
    videoUrl: a("/gekkies/16_financieel adviseur.mp4"),
    title: "Financieel adviseur"
  },
  {
    id: 17,
    screenshotUrl: a("/gekkies/17_kastanjes.png"),
    videoUrl: a("/gekkies/17_kanstanjes.mp4"),
    title: "Kastanjes"
  },
  {
    id: 18,
    screenshotUrl: a("/gekkies/18_mc kroket.png"),
    videoUrl: a("/gekkies/18_mc kroket.mp4"),
    title: "Mc Kroket"
  },
  {
    id: 19,
    screenshotUrl: a("/gekkies/19_waar is mama.png"),
    videoUrl: a("/gekkies/19_waar is mama.mp4"),
    title: "Waar is mama"
  },
  {
    id: 20,
    screenshotUrl: a("/gekkies/20_yordi.png"),
    videoUrl: a("/gekkies/20_Yordi.mp4"),
    title: "Yordi"
  },
];
