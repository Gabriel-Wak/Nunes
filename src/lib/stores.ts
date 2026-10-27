export type Store = {
  id: "forquilhinhas" | "sertao";
  name: string;
  phone: string;
  whatsapp: string;
  address: string;
  mapQuery: string;
};

export const STORES: Store[] = [
  {
    id: "forquilhinhas",
    name: "Forquilhinhas",
    phone: "(48) 99105-9956",
    whatsapp: "5548991059956",
    address: "R. Ver. Arthur Manoel Mariano, 625 — Forquilhinhas, São José - SC",
    mapQuery: "Nunes Autocenter R. Ver. Arthur Manoel Mariano, 625 - Forquilhinhas, São José - SC",
  },
  {
    id: "sertao",
    name: "Sertão do Maruim",
    phone: "(48) 99130-1529",
    whatsapp: "5548991301529",
    address: "R. Jorge José Zimermann, 40 — Sertão do Maruim, São José - SC",
    mapQuery: "NUNES AUTOCENTER SERTÃO ELÉTRICA E MECÂNICA",
  },
];

export function whatsappLink(store: Store, topic?: string) {
  const text = topic
    ? `Olá, Nunes ${store.name}! Vim pelo site e quero saber sobre ${topic}.`
    : `Olá, Nunes ${store.name}! Vim pelo site e quero agendar o check-up grátis de +30 itens.`;
  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function mapEmbed(store: Store) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(store.mapQuery)}&t=m&z=16&output=embed`;
}
