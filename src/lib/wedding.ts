export const couple = {
  groom: "Vasu",
  bride: "Manisha",
  tagline: "So, our forever begins",
  dateLabel: "21st – 22nd November 2026",
  weddingISO: "2026-11-22T11:00:00+05:30",
};

export type WeddingEvent = {
  name: string;
  subtitle?: string;
  glyph: string;
  date: string;
  time: string;
  venue: string;
  dressCode?: string;
  note?: string;
};

export const events: WeddingEvent[] = [
  {
    name: "Haldi",
    subtitle: "Shades of Sunshine",
    glyph: "❋",
    date: "21 Nov 2026",
    time: "10:00 AM",
    venue: "RPN Resort and cafe, Uttarakhand",
    dressCode:
      "Bring out your brightest and happy hues and playful ethnic or indo western looks. The more colourful, the merrier!",
    note: "Shades of Sunshine",
  },
  {
    name: "Mehendi",
    subtitle: "Mehendi in Bloom",
    glyph: "❁",
    date: "21 Nov 2026",
    time: "2:00 PM",
    venue: "RPN Resort and cafe, Uttarakhand",
    dressCode: "Pastels or brights, florals or prints — just bring your happiest colours!",
    note: "Mehendi in Bloom",
  },
  {
    name: "Sangeet",
    subtitle: "Glitter & Glam",
    glyph: "✧",
    date: "21 Nov 2026",
    time: "7:00 PM",
    venue: "RPN Resort and cafe, Uttarakhand",
    dressCode: "Think sequins, shimmer, metallics and a touch of sparkle. Dress to dazzle!",
    note: "Glitter & Glam",
  },
  {
    name: "Wedding",
    subtitle: "So, Our Forever Begins",
    glyph: "☀",
    date: "22 Nov 2026",
    time: "11:00 AM",
    venue: "RPN Resort and cafe, Uttarakhand",
    dressCode: "Think soft hues, delicate shades and dreamy pastels",
    note: "So, Our Forever Begins",
  },
];

export const venue = {
  name: "RPN Resort and cafe",
  address: "Village, near Phulsani, Ankowala, Aamwala, Uttarakhand 248003",
  locationShort: "Uttarakhand",
  mapsUrl: "https://maps.app.goo.gl/54QoUSVVCeVAAgCb8?g_st=ic",
};

function icsStamp(d: Date) {
  return `${d.toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`;
}

export function buildICS() {
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Vasu & Manisha//Wedding//EN"];
  const starts: Record<string, string> = {
    Haldi: "2026-11-21T10:00:00+05:30",
    Mehendi: "2026-11-21T14:00:00+05:30",
    Sangeet: "2026-11-21T19:00:00+05:30",
    Wedding: "2026-11-22T11:00:00+05:30",
  };
  for (const ev of events) {
    const start = new Date(starts[ev.name] ?? couple.weddingISO);
    const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
    const summary = ev.subtitle
      ? `${ev.name} — ${ev.subtitle} | ${couple.groom} & ${couple.bride}`
      : `${ev.name} | ${couple.groom} & ${couple.bride}`;
    const desc = ev.dressCode ? `Dress Code: ${ev.dressCode}` : (ev.note ?? "");
    lines.push(
      "BEGIN:VEVENT",
      `UID:${ev.name.toLowerCase()}-vasu-manisha@wedding`,
      `DTSTAMP:${icsStamp(new Date())}`,
      `DTSTART:${icsStamp(start)}`,
      `DTEND:${icsStamp(end)}`,
      `SUMMARY:${summary}`,
      `LOCATION:${ev.venue}, ${venue.address}`,
      `DESCRIPTION:${desc}`,
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
  a.download = "vasu-manisha-wedding.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
