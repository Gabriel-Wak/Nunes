# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Rodando no seu computador

Pré-requisitos: [Bun](https://bun.sh) (ou Node.js 20+).

```sh
bun install     # ou: npm install
bun run dev     # abre o site em http://localhost:8080
bun run build   # gera a versão de produção
bun run test    # roda os testes
```

### Conteúdo

- `src/routes/index.tsx` — todas as seções da página (abertura animada, serviços,
  avaliações, lojas, contato).
- `src/routes/__root.tsx` — cabeçalho, rodapé e metadados de busca (SEO).
- `src/lib/stores.ts` — telefones, WhatsApp e endereços das duas lojas.
  É aqui que se troca um número: cada botão de WhatsApp usa `whatsappLink()`.
- `src/assets/` — logo, foto da família e a imagem de fundo da abertura.
- `src/styles.css` — paleta de cores e fontes do site.

### Próximos passos previstos

- Trocar a imagem de fundo da abertura pelo vídeo feito no Google Flow.
- Inserir mais fotos reais da equipe e das lojas.
