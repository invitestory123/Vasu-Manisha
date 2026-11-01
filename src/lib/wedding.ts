export const couple = {
  groom: "Joshua Vishal D",
  bride: "Virgin Mary S",
  groomShort: "Joshua",
  brideShort: "Virgin Mary",
  tagline: "Together in Faith, Bound by Love",
  dateLabel: "Friday, 20th November 2026",
  weddingDate: "20 November 2026",
  weddingISO: "2026-11-20T14:30:00+05:30",
  receptionISO: "2026-11-20T18:30:00+05:30",
};

export const brideDetails = {
  name: "Virgin Mary S",
  role: "The Bride",
  tagline: "Grace, Faith & Radiance",
  parents: "Daughter of the S Family",
  grandparents:
    "With heartfelt gratitude to our elders and cherished ancestors whose prayers and blessings guide our path.",
};

export const groomDetails = {
  name: "Joshua Vishal D",
  role: "The Groom",
  tagline: "Devotion, Strength & Joy",
  parents: "Son of the D Family",
  grandparents:
    "With heartfelt gratitude to our elders and cherished ancestors whose love and values illuminate our journey.",
};

export const coupleFusion = {
  title: "United in Faith & Love",
  quote:
    "Therefore what God has joined together, let no one separate. With faith, hope, and love in our hearts, our forever begins.",
  wittyTagline:
    "Two souls united before God, surrounded by family, celebrated by friends, and stepping into eternity together.",
  badge: "United in Holy Matrimony",
};

export type WeddingEvent = {
  name: string;
  subtitle?: string;
  glyph: string;
  date: string;
  time: string;
  venue: string;
  address?: string;
  mapsUrl?: string;
  dressCode?: string;
  note?: string;
  themeColor?: string;
};

export const events: WeddingEvent[] = [
  {
    name: "Holy Matrimony",
    subtitle: "The Sacred Nuptials",
    glyph: "✝",
    date: "20 Nov 2026",
    time: "2:30 PM",
    venue: "Holy Ghost Church",
    address: "Clarke Road, Richards Town, Bengaluru, Karnataka 560084",
    mapsUrl: "https://maps.app.goo.gl/dnWydAZJLPWChWyt9?g_st=ic",
    dressCode: "Formal / Festive Elegance",
    note: "Join us at the altar as we exchange sacred vows, wedding rings, and receive the holy sacrament of marriage.",
    themeColor: "from-amber-500/15 to-yellow-500/5",
  },
  {
    name: "Wedding Reception",
    subtitle: "Celebration & Banquet",
    glyph: "✧",
    date: "20 Nov 2026",
    time: "6:30 PM Onwards",
    venue: "CMA ROYAL CONVENTION HALL",
    address: "72/1, Thanisandra Main Road, near Elements Mall, Bengaluru, Karnataka 560077",
    mapsUrl: "https://maps.app.goo.gl/m5hpSKKpY2UnxJZp7?g_st=ic",
    dressCode: "Evening Glamour & Celebratory Attire",
    note: "Join us for an evening of joyous celebrations, banquet dinner, music, toasts, and fellowship.",
    themeColor: "from-rose-500/15 to-purple-500/5",
  },
];

export const preWeddingEvents: WeddingEvent[] = [];
export const weddingCeremony: WeddingEvent = events[0];
export const receptionCeremony: WeddingEvent = events[1];

export const venue = {
  name: "Holy Ghost Church & CMA Royal Convention Hall",
  address: "Richards Town & Thanisandra Main Road, Bengaluru, Karnataka",
  locationShort: "Bengaluru, Karnataka",
  mapsUrl: "https://maps.app.goo.gl/dnWydAZJLPWChWyt9?g_st=ic",
};

export const venues = [
  {
    title: "Wedding Ceremony",
    name: "Holy Ghost Church",
    time: "2:30 PM",
    address: "Clarke Road, Richards Town, Bengaluru, Karnataka 560084",
    mapsUrl: "https://maps.app.goo.gl/dnWydAZJLPWChWyt9?g_st=ic",
  },
  {
    title: "Wedding Reception",
    name: "CMA ROYAL CONVENTION HALL",
    time: "6:30 PM",
    address: "72/1, Thanisandra Main Road, near Elements Mall, Bengaluru, Karnataka 560077",
    mapsUrl: "https://maps.app.goo.gl/m5hpSKKpY2UnxJZp7?g_st=ic",
  },
];

export const musicConfig = {
  title: "Wedding Melody",
  status: "Pending confirmation",
  src: "/audio/wedding-music.mp3",
};

function icsStamp(d: Date) {
  return `${d.toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`;
}

export function buildICS() {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Joshua Vishal & Virgin Mary//Wedding//EN",
  ];

  const schedule = [
    {
      name: "Holy Matrimony (Wedding Service)",
      start: new Date("2026-11-20T14:30:00+05:30"),
      end: new Date("2026-11-20T16:30:00+05:30"),
      venue: "Holy Ghost Church",
      address: "Clarke Road, Richards Town, Bengaluru, Karnataka 560084",
      desc: "Sacred Wedding Ceremony of Joshua Vishal D and Virgin Mary S at Holy Ghost Church.",
    },
    {
      name: "Wedding Reception",
      start: new Date("2026-11-20T18:30:00+05:30"),
      end: new Date("2026-11-20T22:30:00+05:30"),
      venue: "CMA ROYAL CONVENTION HALL",
      address: "72/1, Thanisandra Main Road, near Elements Mall, Bengaluru, Karnataka 560077",
      desc: "Wedding Reception & Dinner Banquet celebrating Joshua Vishal D & Virgin Mary S.",
    },
  ];

  for (const item of schedule) {
    const summary = `${item.name} | Joshua & Virgin Mary`;
    lines.push(
      "BEGIN:VEVENT",
      `UID:${item.name.toLowerCase().replace(/[^a-z0-9]/g, "")}-joshua-mary@wedding`,
      `DTSTAMP:${icsStamp(new Date())}`,
      `DTSTART:${icsStamp(item.start)}`,
      `DTEND:${icsStamp(item.end)}`,
      `SUMMARY:${summary}`,
      `LOCATION:${item.venue}, ${item.address}`,
      `DESCRIPTION:${item.desc}`,
      "END:VEVENT",
    );
  }

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function downloadICS() {
  const blob = new Blob([buildICS()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "joshua-virgin-mary-wedding.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
