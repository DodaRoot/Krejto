export interface MockCategory {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface MockService {
  id: number;
  title: string;
  category: string;
  description: string;
  price: string;
  image: string;
}

export interface MockReview {
  name: string;
  comment: string;
  stars: number;
}

export interface MockMessage {
  id: number;
  content: string;
  sender: "me" | "other";
  timestamp: string;
}

export interface MockConversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  messages: MockMessage[];
}

const categories: MockCategory[] = [
  {
    id: 1,
    name: "Elektricist",
    description: "Instalime, riparime dhe mirëmbajtje elektrike për shtëpi.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Hidraulik",
    description: "Zgjidhje të shpejta për tuba, rubineta dhe ngrohje.",
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Pastrimi",
    description: "Pastrime profesionale për shtëpi dhe hapësira pune.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Riparim kompjuterësh",
    description:
      "Diagnostikim, përmirësim dhe riparim i pajisjeve kompjuterike.",
    image:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Pikturim",
    description: "Lyerje e brendshme dhe e jashtme me përfundim cilësor.",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Kopshtari",
    description: "Kujdes për oborre, lëndina dhe hapësira të gjelbra.",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
  },
];

export const CATEGORIES_LIST = categories.map((category) => category.name);

export const CITIES_LIST = [
  "Prishtinë",
  "Prizren",
  "Pejë",
  "Gjakovë",
  "Gjilan",
  "Ferizaj",
  "Mitrovicë",
];

export const getMockServices: MockService[] = [
  {
    id: 1,
    title: "Instalim elektrik dhe ndriçim",
    category: "Elektricist",
    description:
      "Instalim i prizave, ndriçimit dhe pajisjeve elektrike, me kontroll sigurie.",
    price: "Nga 25 €",
    image: categories[0].image,
  },
  {
    id: 2,
    title: "Riparime hidraulike",
    category: "Hidraulik",
    description:
      "Riparim i rrjedhjeve, ndërrim rubinetash dhe mirëmbajtje e instalimeve.",
    price: "Nga 20 €",
    image: categories[1].image,
  },
  {
    id: 3,
    title: "Pastrim i përgjithshëm i banesës",
    category: "Pastrimi",
    description:
      "Pastrim i detajuar i kuzhinës, banjës dhe hapësirave të banimit.",
    price: "Nga 35 €",
    image: categories[2].image,
  },
  {
    id: 4,
    title: "Servis dhe përmirësim kompjuteri",
    category: "Riparim kompjuterësh",
    description:
      "Diagnostikim, instalim sistemi operativ dhe ndërrim të komponentëve.",
    price: "Nga 15 €",
    image: categories[3].image,
  },
  {
    id: 5,
    title: "Lyerje e dhomave të brendshme",
    category: "Pikturim",
    description:
      "Përgatitje e mureve dhe lyerje e pastër me ngjyrat që zgjidhni.",
    price: "Nga 4 € / m²",
    image: categories[4].image,
  },
  {
    id: 6,
    title: "Mirëmbajtje e kopshtit",
    category: "Kopshtari",
    description: "Kositje, krasitje dhe rregullim sezonal i oborrit tuaj.",
    price: "Nga 20 €",
    image: categories[5].image,
  },
];

const reviews: MockReview[] = [
  {
    name: "Arta Krasniqi",
    comment:
      "Elektricisti erdhi në kohë, e gjeti problemin shpejt dhe la gjithçka të rregullt.",
    stars: 5,
  },
  {
    name: "Blerim Gashi",
    comment:
      "Rezervimi ishte i thjeshtë dhe shërbimi hidraulik u krye po atë ditë.",
    stars: 5,
  },
  {
    name: "Drita Berisha",
    comment:
      "Komunikim i mirë dhe punë shumë e pastër. Do ta përdor sërish këtë shërbim.",
    stars: 4,
  },
  {
    name: "Luan Hoxha",
    comment: "Gjeta një profesionist të besueshëm pranë meje pa humbur kohë.",
    stars: 5,
  },
];

const conversations: MockConversation[] = [
  {
    id: 1,
    name: "Arta Krasniqi",
    avatar:
      "https://images.unsplash.com/photo-1534528660303-7a2a5f3f6f2a?auto=format&fit=crop&w=128&h=128&q=80",
    lastMessage: "Faleminderit, shihemi nesër!",
    timestamp: "10:42",
    unread: true,
    messages: [
      {
        id: 1,
        content: "Përshëndetje, a jeni e lirë për një instalim nesër?",
        sender: "me",
        timestamp: "10:30",
      },
      {
        id: 2,
        content: "Po, mund të vij rreth orës 10:00.",
        sender: "other",
        timestamp: "10:36",
      },
      {
        id: 3,
        content: "Faleminderit, shihemi nesër!",
        sender: "other",
        timestamp: "10:42",
      },
    ],
  },
  {
    id: 2,
    name: "Blerim Gashi",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=128&h=128&q=80",
    lastMessage: "Mund t'ju dërgoj ofertën pasdite.",
    timestamp: "Dje",
    unread: false,
    messages: [
      {
        id: 1,
        content: "Sa kushton kontrolli i instalimit?",
        sender: "me",
        timestamp: "14:08",
      },
      {
        id: 2,
        content: "Mund t'ju dërgoj ofertën pasdite.",
        sender: "other",
        timestamp: "14:15",
      },
    ],
  },
  {
    id: 3,
    name: "Drita Berisha",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=128&h=128&q=80",
    lastMessage: "Shërbimi u përfundua me sukses.",
    timestamp: "Hën",
    unread: false,
    messages: [
      {
        id: 1,
        content: "A mund të vini të premten për pastrim?",
        sender: "me",
        timestamp: "09:12",
      },
      {
        id: 2,
        content: "Po, ora 09:00 më përshtatet.",
        sender: "other",
        timestamp: "09:20",
      },
      {
        id: 3,
        content: "Shërbimi u përfundua me sukses.",
        sender: "other",
        timestamp: "12:05",
      },
    ],
  },
];

export function getCategories(): MockCategory[] {
  return categories;
}

export function getReviews(): MockReview[] {
  return reviews;
}

export function getConversations(): MockConversation[] {
  return conversations;
}

export function getConversationById(id: number): MockConversation | undefined {
  return conversations.find((conversation) => conversation.id === id);
}
