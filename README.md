# Market List

Aplicação mobile-first para criar e acompanhar listas de compras seguindo uma rota lógica pelo supermercado. A primeira versão funciona inteiramente no navegador e persiste os dados no dispositivo.

O botão de instalação no cabeçalho permite adicionar o Market List como aplicativo no Android e em navegadores desktop compatíveis. No iPhone/iPad, ele apresenta o caminho do Safari para **Adicionar à Tela de Início**.

## Executar localmente

Requisitos: Node.js 22+ e npm.

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`.

## Verificações

```bash
npm run lint
npm run test
npm run build
```

Os ícones PNG instaláveis podem ser recriados a partir de `public/app-icon.svg` com `npm run generate:icons`.

Para testar a versão compilada:

```bash
npm run preview
```

A versão compilada também registra o manifesto e o service worker da PWA. Em produção, a aplicação mantém o shell essencial em cache para reabertura offline.

## Arquitetura

- `src/domain/shopping`: entidades, catálogo de categorias/produtos e regras puras da lista.
- `src/infrastructure`: LocalStorage, preferências, serialização, importação/exportação e compartilhamento.
- `src/presentation/stores`: stores Zustand com operações da aplicação.
- `src/presentation/components`: componentes React/MUI reutilizáveis.
- `src/presentation/pages`: composição dos fluxos da página principal.
- `src/app`: providers e design system global.

O formato exportado é versionado (`version: 1`), arquivos importados são validados e nenhuma informação da lista é enviada a um servidor.
