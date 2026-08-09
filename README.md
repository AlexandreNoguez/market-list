# Market List

Aplicação mobile-first para criar e acompanhar listas de compras seguindo uma rota lógica pelo supermercado. A primeira versão funciona inteiramente no navegador e persiste os dados no dispositivo.

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

Para testar a versão compilada:

```bash
npm run preview
```

## Arquitetura

- `src/domain/shopping`: entidades, catálogo de categorias/produtos e regras puras da lista.
- `src/infrastructure`: LocalStorage, preferências, serialização, importação/exportação e compartilhamento.
- `src/presentation/stores`: stores Zustand com operações da aplicação.
- `src/presentation/components`: componentes React/MUI reutilizáveis.
- `src/presentation/pages`: composição dos fluxos da página principal.
- `src/app`: providers e design system global.

O formato exportado é versionado (`version: 1`), arquivos importados são validados e nenhuma informação da lista é enviada a um servidor.
