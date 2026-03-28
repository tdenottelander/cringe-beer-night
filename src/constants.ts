import { Beer } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const a = (path: string) => `${(import.meta as any).env?.BASE_URL ?? '/'}${path.replace(/^\//, '')}`;

export const BEERS: Beer[] = [
  {
    id: 13,
    name: "Experimead # 12",
    brewery: "De Mederie",
    style: "Bourbon BA Sweet Mead",
    revealed: false,
    mystery: true,
    imageUrl: "https://images.untp.beer/crop?width=640&height=640&stripmeta=true&url=https://untappd.s3.amazonaws.com/photos/2024_04_04/d674594b20d6cbd66630654ca7e1f677_c_1369197837_raw.jpg",
    description: "A honey-based sweet mead aged in bourbon barrels by the Dutch meadery De Mederie. Think velvet darkness: rich oak, caramel sweetness and a whiskey warmth that hits different. This isn't a beer — it's a whole vibe.",
  },
  { 
    id: 1, 
    name: "Hopzz_ Integrity", 
    brewery: "PINTA", 
    style: "IPA", 
    revealed: false, 
    imageUrl: a("/beers/ostecx_pinta_hopzz_integrity_packshot_internet-400x813.webp"),
    description: "This IPA has more integrity than your favorite TikTok influencer's apology video. It's giving main character energy with every single hop drop."
  },
    { 
    id: 4, 
    name: "Mango X Pineapple X Banana", 
    brewery: "Ārpus Brewing Co.", 
    style: "Smoothie Sour", 
    revealed: false, 
    imageUrl: a("/beers/arpus-mango-x-pineapple-x-banana-extra.webp"),
    description: "This smoothie sour is so sweet it's literally slaying the fruit game right now. It's like a tropical skibidi toilet party in your mouth, no cap."
  },
    { 
    id: 11, 
    name: "MERYL STRIPTEASE", 
    brewery: "Clandestin Beer", 
    style: "IPA", 
    revealed: false, 
    imageUrl: a("/beers/meryl striptease.jpeg"),
    description: "This IPA is so bold it's basically a public dance challenge that nobody asked for. It's giving major main character energy with every single sip."
  },
    { 
    id: 8, 
    name: "Helios IPA", 
    brewery: "Apex Brewing Company", 
    style: "IPA", 
    revealed: false, 
    imageUrl: a("/beers/helios.webp"),
    description: "This IPA is so bright it's basically a flashbang from a sweaty CoD lobby. It's the ultimate sun-kissed rizz for your afternoon session."
  },
    { 
    id: 9, 
    name: "Hop Sundae", 
    brewery: "Vocation Brewery", 
    style: "IPA", 
    revealed: false, 
    imageUrl: a("/beers/hop-sundae-75-pastry-dipa-440ml-5989707.webp"),
    description: "This pastry IPA is so sweet it's basically a thirst trap for your taste buds. It's giving major dessert vibes while you're out here just trying to be a good boy."
  },
    { 
    id: 7, 
    name: "Fat Rat", 
    brewery: "Ossett Brewery", 
    style: "Stout", 
    revealed: false, 
    imageUrl: a("/beers/oss.fat.rat.png"),
    description: "This stout is a total unit and it's not even sorry about it. It's got that big rat energy that only a true sigma could appreciate."
  },
    { 
    id: 5, 
    name: "Back In the City", 
    brewery: "Folkingebrew", 
    style: "IPA", 
    revealed: false, 
    imageUrl: a("/beers/folkingebrew-folkingebrew-back-in-the-city-investo.webp"),
    description: "We're back in the city and the vibes are absolutely immaculate with this hazy IPA. It's giving major main character energy while we're out here just vibing."
  },
    { 
    id: 10, 
    name: "Triple Vision", 
    brewery: "Vocation Brewery", 
    style: "TIPA", 
    revealed: false, 
    imageUrl: a("/beers/triple-vision-100-triple-ipa-440ml-1322832.webp"),
    description: "After one of these TIPAs you'll be seeing triple like you're in a glitchy Roblox server. It's the ultimate high-aura move for the true beer rizzlers."
  },
    { 
    id: 6, 
    name: "Caramel Fudge Stout", 
    brewery: "Brouwerij Kees", 
    style: "Stout", 
    revealed: false, 
    imageUrl: a("/beers/kees-kees-caramel-fudge-stout-glen-turner.webp"),
    description: "This stout is so sweet it's basically a fanfic about your favorite K-pop idol coming to life. It's the ultimate treat for when you're feeling extra and want to slay."
  },
    { 
    id: 3, 
    name: "8 Year Anniversary", 
    brewery: "Ārpus Brewing Co.", 
    style: "Stout x Barleywine", 
    revealed: false, 
    imageUrl: a("/beers/arpus 8 year anniversary.png"),
    description: "Eight years of brewing is a total sigma move that even the Rizzler would respect. This blend is so thick it's basically a gyatt in a glass."
  },
  { 
    id: 2, 
    name: "Mardus Bourbon BA", 
    brewery: "Pühaste Brewery", 
    style: "Imperial Stout", 
    revealed: false, 
    imageUrl: a("/beers/MardusBourbonBA_SilverSeries.webp"),
    description: "This stout is so deep and dark it's basically my soul after a 10-hour mewing session. The bourbon barrel aging is the ultimate rizz for your taste buds."
  },
  { 
    id: 12, 
    name: "Macabre", 
    brewery: "Amager Bryghus", 
    style: "Stout", 
    revealed: false, 
    imageUrl: a("/beers/macabre.webp"),
    description: "This stout is so dark it's basically a compilation of the cringiest things you did in middle school. It's the ultimate emo rizz for your late-night sessions."
  },
];

export const CRINGE_MEMES: string[] = [
  a('/memes/200.gif'),
  a('/memes/68c564558a596f31bd69fe9d_mewing does it work.jpeg'),
  a('/memes/7bf23b0b8649c86989fcb8303c5115c9.jpg'),
  a('/memes/Cringe-meme-7.jpg'),
  a('/memes/F82189A3-3D63-42A9-A156-730BCE4C156A_0bf27f31-a463-4db4-908b-13e4b7fb5dd1_grande.webp'),
  a('/memes/Scooby-Cringe-meme-1.jpg'),
  a('/memes/TJwtN9E0neHxkNxTUJaBANM-N3juhzi3hbkExxiujmCYNyXDiWg8X8cMnRQ4v6I_vfZ0eaSE-e_WJAe4YhC34A.webp'),
  a('/memes/cringe.gif'),
  a('/memes/donald-trump-dancing.gif'),
  a('/memes/dsiazK.gif'),
  a('/memes/fortnite-fortnite-dance.gif'),
  a('/memes/gettyimages-488226322.webp'),
  a('/memes/hobby-horse-braun-weiss-springhuerde.jpg'),
  a('/memes/hq720.jpg'),
  a('/memes/i-think-the-shrek-5-trailer-is-just-a-joke-from-dreamworks-v0-255a5xa3egpe1.webp'),
  a('/memes/im-cooking-gentlemen-is-there-any-meme-of-lanius-doing-a-v0-3yj8ma1jt82f1.webp'),
  a('/memes/images (1).jpeg'),
  a('/memes/images (2).jpeg'),
  a('/memes/images (3).jpeg'),
  a('/memes/images (4).jpeg'),
  a('/memes/images.jpeg'),
  a('/memes/mark-rutte-gym-dance.gif'),
  a('/memes/mid-spongebob.gif'),
  a('/memes/mqdefault.jpg'),
  a('/memes/oREA30YQ_400x400.jpg'),
  a('/memes/sigma.gif'),
  a('/memes/slay-pin-pink-bg-sq-2048-optimised_2048x.webp'),
  a('/memes/source.gif'),
  a('/memes/static-assets-upload17193061326076844527.webp'),
  a('/memes/the-rizzler-tik-tok.png'),
  a('/memes/unnamed.webp'),
  a('/memes/untitled-skibidi-toilet-project_jz4j.jpg'),
  a('/memes/whip-naenae.gif')
];

export const AURA_SOUNDS: string[] = [
  a('/sounds/67-king.mp3'),
  a('/sounds/67-sound.mp3'),
  a('/sounds/67_SQlv2Xv.mp3'),
  a('/sounds/anime-ahh.mp3'),
  a('/sounds/blah-blah-blah_xvi5IRa.mp3'),
  a('/sounds/buurman-en-buurman-zijn-autisten.mp3'),
  a('/sounds/buurman-heb-je-autisme.mp3'),
  a('/sounds/deg-deg_4M6Cojn.mp3'),
  a('/sounds/duck-toy-sound.mp3'),
  a('/sounds/freesound_community-monkey-scream-6407.mp3'),
  a('/sounds/goo-goo-gagaaa.mp3'),
  a('/sounds/kids_cheering.mp3'),
  a('/sounds/mlg-airhorn.mp3'),
  a('/sounds/perfect-fart.mp3'),
  a('/sounds/rizz-sound-effect.mp3'),
  a('/sounds/te-veel-baby-olie.mp3'),
  a('/sounds/u_zpj3vbdres-monkey-128368.mp3'),
  a('/sounds/what-a-good-boy.mp3'),
  a('/sounds/whatsapp-audio-2016-09-16-at-23.mp3'),
];
