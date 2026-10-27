import { describe, expect, it } from "vitest";
import { STORES, whatsappLink } from "@/lib/stores";

describe("WhatsApp por loja", () => {
  it("Forquilhinhas abre o número (48) 99105-9956 com mensagem da loja", () => {
    const url = whatsappLink(STORES[0]!);
    expect(url.startsWith("https://wa.me/5548991059956?text=")).toBe(true);
    expect(decodeURIComponent(url.split("text=")[1]!)).toContain("Nunes Forquilhinhas");
  });
  it("Sertão do Maruim abre o número (48) 99130-1529", () => {
    expect(whatsappLink(STORES[1]!, "freios")).toContain("wa.me/5548991301529");
  });
});
