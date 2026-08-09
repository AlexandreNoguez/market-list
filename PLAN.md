# Contexto do Projeto

Quero desenvolver uma aplicação web moderna, simples e premium para gerenciamento de listas de compras de supermercado.

A aplicação deve ser construída utilizando:

* React
* TypeScript
* Vite
* Material UI (MUI)
* Zustand para gerenciamento de estado
* LocalStorage para persistência local
* Clean Architecture adaptada ao frontend
* Conceitos de DDD onde fizerem sentido

Não haverá backend nesta primeira versão.

A aplicação deve funcionar especialmente bem em dispositivos móveis, pois será utilizada principalmente durante compras dentro de supermercados.

---

# Objetivo principal

Criar uma aplicação de lista de compras que permita ao usuário:

1. Adicionar produtos rapidamente.
2. Encontrar produtos comuns com apenas um clique.
3. Criar produtos personalizados.
4. Organizar produtos por categoria/ala do supermercado.
5. Percorrer a lista seguindo uma ordem lógica das categorias, simulando uma rota pelo supermercado.
6. Persistir a lista no próprio dispositivo.
7. Exportar, importar e compartilhar listas.
8. Utilizar uma interface moderna, premium, responsiva e agradável.

O foco deve ser:

* simplicidade;
* rapidez de uso;
* excelente experiência mobile;
* arquitetura organizada;
* componentes reutilizáveis;
* boa experiência visual;
* manutenção futura simples.

Evite overengineering.

---

# Nome da aplicação

Utilize inicialmente:

**Market List**

Centralize o nome da aplicação em alguma configuração ou constante para que seja fácil alterá-lo futuramente.

---

# Experiência visual

Quero uma experiência visual premium, moderna e minimalista.

Utilize Material UI como base dos componentes e do Design System.

A interface deve transmitir sensação de aplicativo mobile moderno.

Características desejadas:

* layout mobile-first;
* excelente experiência em desktop também;
* bordas arredondadas;
* sombras suaves;
* espaçamento confortável;
* boa hierarquia visual;
* animações e transições sutis;
* feedback visual para ações;
* ícones do Material Icons;
* cards elegantes;
* boa legibilidade;
* áreas clicáveis confortáveis para celular.

Não exagere em efeitos visuais.

---

# Tema

Implementar:

* Light Mode
* Dark Mode

Criar o tema utilizando o sistema de themes do Material UI.

Não espalhar cores, fontes e tamanhos diretamente pelos componentes.

Centralizar:

* palette;
* typography;
* spacing;
* border radius;
* shadows;
* breakpoints;
* estilos compartilhados.

Criar uma estrutura de tema que facilite alteração global futura.

Persistir a preferência do usuário.

Se nenhuma preferência estiver salva, considerar inicialmente a preferência do sistema operacional através de `prefers-color-scheme`.

Adicionar no header um botão simples para alternar entre Light e Dark Mode.

---

# Header responsivo e dinâmico

Criar um header moderno no topo da aplicação.

Quando o usuário estiver no início da página, o header pode ser maior e apresentar:

* nome "Market List";
* uma pequena mensagem contextual, como quantidade de itens;
* ações principais;
* botão para Light/Dark Mode.

Quando o usuário fizer scroll para baixo, o header deve diminuir suavemente de tamanho para ocupar menos espaço da tela.

O header reduzido deve continuar contendo apenas as informações essenciais.

A transição deve ser elegante e não atrapalhar o scroll.

Considere utilizar:

* AppBar;
* Toolbar;
* CSS transitions;
* `useScrollTrigger` do Material UI;

ou outra solução simples e adequada.

---

# Estrutura principal da tela

A página principal deve possuir aproximadamente esta organização:

1. Header
2. Área de adição rápida
3. Campo para adicionar produto manualmente
4. Lista de compras
5. Ações da lista

No mobile, priorize ações que possam ser realizadas facilmente com uma mão.

---

# Produtos comuns / Quick Add

Criar uma área chamada algo como:

**Adicionar rápido**

Mostrar produtos comuns de supermercado que possam ser adicionados com apenas um clique.

Exemplos:

* Arroz
* Feijão
* Leite
* Pão
* Café
* Açúcar
* Sal
* Ovos
* Queijo
* Presunto
* Carne
* Frango
* Banana
* Maçã
* Tomate
* Cebola
* Batata
* Sabonete
* Papel higiênico
* Detergente

Não precisa obrigatoriamente mostrar todos ao mesmo tempo.

Pode utilizar:

* chips;
* cards pequenos;
* botões compactos;
* horizontal scroll no mobile.

O produto deve possuir uma categoria padrão.

Exemplo:

Arroz → Mercearia
Leite → Laticínios
Banana → Hortifruti
Carne → Açougue

Ao clicar em um item rápido:

* adicioná-lo imediatamente à lista;
* mostrar feedback visual;
* evitar duplicação desnecessária.

Se o produto já existir, considere aumentar sua quantidade em vez de criar outro item.

---

# Cadastro manual

Criar uma área para cadastrar produtos personalizados.

Campos:

## Nome do produto

Input de texto.

Exemplo:

`Molho de tomate`

Adicionar suporte a autocomplete ou sugestões utilizando os produtos conhecidos sempre que for simples implementar.

## Categoria

Permitir selecionar a categoria através de:

* Select;
* Autocomplete;
* Combobox;

Preferencialmente utilizando Material UI Autocomplete.

Categorias iniciais:

* Hortifruti
* Padaria
* Açougue
* Frios
* Laticínios
* Mercearia
* Bebidas
* Congelados
* Higiene
* Limpeza
* Outros

Centralizar essas categorias no domínio/configuração, não dentro dos componentes React.

---

# Ordem das categorias / rota no supermercado

Essa é uma das funcionalidades mais importantes.

A lista NÃO deve ser simplesmente ordenada alfabeticamente.

Ela deve ser agrupada por categorias seguindo uma ordem que represente uma possível rota pelo supermercado.

Utilize inicialmente:

1. Hortifruti
2. Padaria
3. Açougue
4. Frios
5. Laticínios
6. Mercearia
7. Bebidas
8. Congelados
9. Higiene
10. Limpeza
11. Outros

Essa ordem deve ser centralizada em configuração para facilitar alteração futura.

Não espalhar números mágicos pelo código.

Por exemplo:

```ts
interface ShoppingCategory {
  id: string;
  name: string;
  order: number;
}
```

Prepare a arquitetura para que futuramente seja possível permitir ao usuário alterar a ordem das categorias de acordo com o supermercado que frequenta.

Nesta primeira versão não é obrigatório criar a tela de configuração dessa rota.

---

# Lista de compras

Organizar visualmente a lista por categoria.

Cada categoria deve possuir seu próprio card ou seção.

Exemplo:

Hortifruti

* Banana
* Tomate
* Cebola

Padaria

* Pão francês

Laticínios

* Leite
* Queijo

Mercearia

* Arroz
* Feijão

Utilizar cards com aparência moderna.

Cada card deve possuir:

* nome da categoria;
* quantidade de itens;
* produtos daquela categoria.

Os cards devem aparecer seguindo a ordem da rota definida.

---

# Item da lista

Cada item deve possuir pelo menos:

```ts
interface ShoppingItem {
  id: string;
  name: string;
  categoryId: string;
  quantity: number;
  completed: boolean;
  createdAt: string;
}
```

Pode adaptar esse modelo caso exista uma justificativa arquitetural.

Cada item deve permitir:

* marcar como comprado;
* desmarcar;
* aumentar quantidade;
* diminuir quantidade;
* remover item.

Quando marcado como comprado:

* manter o item visível;
* reduzir sua ênfase visual;
* utilizar texto riscado ou tratamento semelhante;
* permitir desfazer facilmente.

Evite mover o item de maneira brusca enquanto o usuário está usando a lista no supermercado.

---

# Contadores

Mostrar informações como:

* quantidade total de itens;
* quantidade comprada;
* quantidade restante.

Exemplo:

**8 de 15 itens encontrados**

Pode utilizar uma pequena barra de progresso.

---

# Persistência

Utilizar LocalStorage.

Criar uma abstração para persistência.

NÃO acessar `localStorage` diretamente espalhado pelos componentes React.

Exemplo conceitual:

```text
domain
application
infrastructure
presentation
```

A implementação concreta pode existir em:

```text
infrastructure/storage/LocalStorageShoppingListRepository.ts
```

Os componentes não devem saber como a persistência funciona.

Persistir automaticamente alterações relevantes da lista.

---

# Zustand

Utilizar Zustand para gerenciamento do estado.

Evitar um store gigante.

O store deve representar as operações necessárias da aplicação, por exemplo:

* addItem
* removeItem
* toggleItem
* incrementQuantity
* decrementQuantity
* clearList
* importList
* hydrateList

Se fizer sentido arquiteturalmente, separar UI state do domínio.

Por exemplo:

```text
shoppingListStore
preferencesStore
```

Não colocar regras de negócio complexas dentro dos componentes React.

---

# Clean Architecture

Quero Clean Architecture adaptada ao tamanho do projeto.

Não criar abstrações sem necessidade.

Uma estrutura possível seria:

```text
src/
├── app/
│   ├── App.tsx
│   ├── providers/
│   ├── routes/
│   └── theme/
│
├── domain/
│   └── shopping/
│       ├── entities/
│       ├── value-objects/
│       ├── repositories/
│       └── constants/
│
├── application/
│   └── shopping/
│       ├── use-cases/
│       └── services/
│
├── infrastructure/
│   └── shopping/
│       ├── repositories/
│       ├── storage/
│       └── serialization/
│
├── presentation/
│   ├── components/
│   │   ├── common/
│   │   └── shopping/
│   ├── pages/
│   ├── hooks/
│   └── stores/
│
├── shared/
│   ├── constants/
│   ├── types/
│   └── utils/
│
└── main.tsx
```

Não precisa obrigatoriamente seguir exatamente essa estrutura.

Avalie e ajuste caso exista uma organização mais coerente.

O mais importante é manter separação clara entre:

**Domain**

Regras e modelos principais.

**Application**

Casos de uso da aplicação.

**Infrastructure**

LocalStorage, importação/exportação e implementações técnicas.

**Presentation**

React, Material UI, Zustand, componentes, páginas e hooks.

---

# DDD

Utilizar DDD de forma pragmática.

O principal domínio inicial será:

```text
Shopping
```

Possíveis conceitos:

* ShoppingList
* ShoppingItem
* ShoppingCategory

Não tente transformar cada propriedade em Value Object se isso deixar o projeto artificialmente complexo.

Utilize DDD principalmente para:

* separar conceitos;
* proteger regras de negócio;
* evitar lógica espalhada pela UI;
* melhorar linguagem do código.

---

# Exportar lista

Criar funcionalidade:

**Exportar lista**

Exportar a lista para JSON.

O arquivo poderia possuir formato semelhante:

```json
{
  "version": 1,
  "name": "Minha lista",
  "createdAt": "2026-08-09T18:00:00.000Z",
  "items": []
}
```

Adicionar versionamento ao formato para facilitar futuras migrações.

Nome sugerido do arquivo:

```text
market-list-2026-08-09.json
```

---

# Importar lista

Criar funcionalidade:

**Importar lista**

Permitir selecionar um arquivo `.json`.

Validar os dados antes de inserir no estado.

Nunca assumir que o JSON possui o formato correto.

Validar:

* estrutura;
* version;
* items;
* propriedades obrigatórias;
* categorias.

Caso o arquivo seja inválido, mostrar uma mensagem amigável utilizando Snackbar ou Alert do Material UI.

Antes de substituir uma lista existente, mostrar confirmação caso existam produtos na lista atual.

---

# Compartilhar lista

Criar funcionalidade:

**Compartilhar**

Priorizar a Web Share API quando disponível:

```ts
navigator.share()
```

Em dispositivos compatíveis, permitir compartilhar a lista.

Pode compartilhar:

* arquivo exportado;
* ou representação textual da lista.

Escolha a solução com melhor compatibilidade e UX.

Criar fallback para navegadores que não suportam Web Share API.

Possíveis fallbacks:

* copiar lista formatada para clipboard;
* baixar JSON.

Exemplo textual:

```text
🛒 Minha lista

Hortifruti
☐ Banana
☐ Tomate

Padaria
☐ Pão

Laticínios
☐ Leite
```

---

# Limpar lista

Criar ação:

**Limpar lista**

Por ser destrutiva, exigir confirmação.

Utilizar Material UI Dialog.

Exemplo:

"Tem certeza que deseja remover todos os itens da sua lista?"

Botões:

Cancelar
Limpar lista

Dar destaque visual adequado para a ação destrutiva.

---

# Snackbar / Feedback

Criar um sistema consistente de feedback.

Exemplos:

* Produto adicionado
* Produto removido
* Lista exportada
* Lista importada
* Lista copiada
* Lista limpa
* Arquivo inválido

Utilizar Material UI Snackbar.

Evitar excesso de notificações para ações muito frequentes.

Por exemplo, marcar cada produto como comprado não precisa necessariamente abrir Snackbar.

---

# Componentes reutilizáveis

Evitar componentes gigantes.

Considere componentes semelhantes a:

```text
AppHeader
ThemeToggle
ShoppingSummary
QuickAddSection
QuickAddItem
AddShoppingItemForm
CategorySection
ShoppingItemCard
ShoppingItemRow
QuantityControl
EmptyShoppingList
ShoppingProgress
ListActions
ConfirmationDialog
```

Os nomes podem ser alterados caso encontre opções melhores.

Componentes não devem conter regras de negócio importantes.

---

# Estado vazio

Quando não houver produtos, criar um estado vazio visualmente agradável.

Algo semelhante:

```text
Sua lista está vazia 🛒

Adicione alguns produtos para começar sua próxima compra.
```

Mostrar os produtos de adição rápida logo abaixo.

---

# Responsividade

Priorizar smartphones.

Testar pelo menos conceitualmente:

* 320px
* 375px
* 390px
* 430px
* tablet
* desktop

Evitar:

* overflow horizontal;
* botões pequenos;
* inputs difíceis de selecionar;
* menus que ocupem espaço excessivo.

No desktop, limitar a largura principal da aplicação.

Exemplo:

```text
max-width: 800px
```

ou outro valor visualmente adequado.

---

# Performance

A aplicação é pequena, portanto não faça otimizações prematuras.

Porém:

* evitar rerenders desnecessários;
* usar seletores do Zustand;
* não colocar todo o estado em um único componente;
* evitar cálculos repetitivos;
* utilizar memoização somente quando existir benefício claro.

---

# Acessibilidade

Utilizar boas práticas básicas:

* labels;
* aria-label quando necessário;
* contraste adequado;
* navegação por teclado;
* focus states;
* botões com nomes acessíveis;
* áreas de toque confortáveis.

---

# Qualidade do código

Quero código profissional.

Regras:

* TypeScript strict;
* evitar `any`;
* componentes pequenos;
* funções pequenas;
* nomes claros;
* evitar duplicação;
* evitar comentários explicando código óbvio;
* separar responsabilidades;
* evitar abstrações prematuras;
* preferir composição;
* manter regras de negócio fora dos componentes;
* seguir SOLID onde fizer sentido.

---

# ESLint e formatação

Configurar:

* ESLint atual;
* configuração compatível com TypeScript e React;
* Prettier somente caso seja realmente necessário;
* scripts claros no package.json.

Exemplo:

```json
{
  "scripts": {
    "dev": "...",
    "build": "...",
    "lint": "...",
    "test": "...",
    "preview": "..."
  }
}
```

Utilizar versões estáveis e atuais compatíveis entre si.

---

# Testes

Configurar:

* Vitest
* React Testing Library

Não precisa criar uma quantidade exagerada de testes.

Priorizar testes das regras importantes.

Exemplos:

### Domain / Application

* adicionar item;
* impedir duplicação ou incrementar quantidade;
* remover item;
* ordenação das categorias;
* marcar como comprado;
* limpar lista;
* serializar lista;
* validar importação.

### UI

Alguns testes dos fluxos principais:

* adicionar produto;
* marcar produto;
* limpar lista;
* importar arquivo inválido.

---

# Seed dos produtos comuns

Criar uma configuração inicial de produtos comuns.

Exemplo:

```ts
const commonProducts = [
  {
    id: "rice",
    name: "Arroz",
    categoryId: "grocery"
  },
  {
    id: "beans",
    name: "Feijão",
    categoryId: "grocery"
  },
  {
    id: "milk",
    name: "Leite",
    categoryId: "dairy"
  }
];
```

Não utilizar strings soltas repetidas pelo projeto.

---

# Organização da lista

A apresentação deve seguir:

```text
Lista

Hortifruti
┌─────────────────────────┐
│ ☐ Banana            1 + │
│ ☐ Tomate            2 + │
│ ☐ Cebola            1 + │
└─────────────────────────┘

Padaria
┌─────────────────────────┐
│ ☐ Pão francês       6 + │
└─────────────────────────┘

Laticínios
┌─────────────────────────┐
│ ☐ Leite             2 + │
│ ☐ Queijo            1 + │
└─────────────────────────┘
```

Não precisa reproduzir exatamente esse desenho.

Utilize Material UI para criar uma versão visualmente superior.

---

# UX durante a compra

Considere que o usuário estará caminhando pelo supermercado segurando o celular.

Portanto:

* informações importantes precisam estar visíveis rapidamente;
* checkboxes precisam ser grandes;
* ações frequentes devem exigir poucos cliques;
* não exigir navegação entre várias telas;
* não mostrar modais para ações simples;
* preservar a posição de scroll;
* evitar reorganizações bruscas após marcar um produto.

A aplicação inicialmente deve preferencialmente funcionar em uma única página.

---

# Possível Floating Action Button

Avalie adicionar um FAB no mobile para adicionar rapidamente um produto.

Por exemplo:

`+`

Ao clicar:

* focar no campo de novo produto;
* ou abrir um pequeno Bottom Sheet / Dialog.

Somente implemente se melhorar a experiência.

Não utilize FAB se ele competir com outras ações ou ocupar espaço desnecessário.

---

# Menu de ações

Ações menos utilizadas podem ficar em um menu `...` no header:

* Importar lista
* Exportar lista
* Compartilhar lista
* Limpar lista

Isso ajuda a manter a interface principal limpa.

---

# Requisitos de segurança

Como existe importação de arquivos:

* nunca executar conteúdo importado;
* validar JSON;
* limitar tamanho razoavelmente;
* tratar parsing com segurança;
* não utilizar HTML vindo do arquivo;
* não utilizar dangerouslySetInnerHTML.

---

# LocalStorage

Criar uma chave versionada.

Exemplo:

```text
market-list:v1
```

Separar, caso necessário:

```text
market-list:v1:shopping-list
market-list:v1:preferences
```

Tratar cenários em que:

* localStorage esteja vazio;
* JSON salvo esteja corrompido;
* versão antiga seja encontrada;
* storage não esteja disponível.

A aplicação não deve quebrar nesses casos.

---

# Critérios de aceite

Considerarei a primeira versão pronta quando eu conseguir:

1. Abrir a aplicação.
2. Ver uma UI responsiva e moderna.
3. Alternar entre dark e light mode.
4. Adicionar Arroz com um clique.
5. Adicionar manualmente "Molho de tomate".
6. Escolher sua categoria.
7. Ver os produtos agrupados por categoria.
8. Ver as categorias seguindo a ordem do supermercado.
9. Alterar quantidade.
10. Marcar produtos como comprados.
11. Remover produtos.
12. Atualizar a página sem perder a lista.
13. Fechar o navegador e posteriormente recuperar a lista.
14. Exportar a lista.
15. Importar uma lista.
16. Compartilhar a lista em dispositivo compatível.
17. Limpar toda a lista mediante confirmação.
18. Usar confortavelmente pelo celular.
19. Fazer scroll e perceber o header diminuindo suavemente.
20. Executar lint, testes e build sem erros.

---

# Estratégia de implementação

Não tente implementar tudo em um único arquivo ou em uma única alteração gigante.

Trabalhe incrementalmente.

Sugestão:

## Etapa 1

Criar projeto e configurar:

* Vite;
* React;
* TypeScript;
* MUI;
* Zustand;
* Vitest;
* ESLint.

## Etapa 2

Criar arquitetura inicial.

## Etapa 3

Criar domínio:

* ShoppingItem;
* ShoppingCategory;
* regras da lista.

## Etapa 4

Criar LocalStorage repository.

## Etapa 5

Criar Zustand stores.

## Etapa 6

Criar Theme e Design System.

## Etapa 7

Criar tela principal e header.

## Etapa 8

Criar Quick Add.

## Etapa 9

Criar formulário manual.

## Etapa 10

Criar cards agrupados por categoria.

## Etapa 11

Implementar progresso e produtos comprados.

## Etapa 12

Implementar:

* export;
* import;
* share;
* clear.

## Etapa 13

Adicionar animações, empty states e refinamentos de UX.

## Etapa 14

Criar testes.

## Etapa 15

Executar:

```bash
npm run lint
npm run test
npm run build
```

Corrigir todos os problemas encontrados.

---

# Antes de começar

Primeiro inspecione o projeto/repositório atual.

Se ele estiver vazio, configure a aplicação.

Se já existir uma aplicação Vite, não recrie desnecessariamente o projeto.

Analise:

* package.json;
* tsconfig;
* estrutura src;
* configurações existentes;
* dependências.

Preserve configurações válidas existentes.

---

# Durante a implementação

Quando precisar tomar uma decisão técnica simples, tome a decisão e continue sem me perguntar.

Somente me pergunte algo quando existir uma decisão realmente importante que mude substancialmente o produto.

Priorize sempre:

1. experiência do usuário;
2. simplicidade;
3. legibilidade;
4. separação de responsabilidades;
5. manutenção;
6. testabilidade.

---

# Regra arquitetural importante

Quero Clean Architecture e conceitos de DDD, mas não quero arquitetura cerimonial.

Este ainda é um aplicativo relativamente simples.

Por isso:

**não crie interfaces, factories, services, DTOs, mappers ou use cases sem que exista uma responsabilidade real para eles.**

A arquitetura deve ajudar o projeto, e não aumentar artificialmente sua complexidade.

Se precisar escolher entre:

```text
arquitetura extremamente purista
```

e

```text
arquitetura limpa, pragmática e fácil de manter
```

escolha a segunda opção.

---

# Resultado esperado

Ao final quero uma aplicação que pareça um pequeno produto real e não apenas um exercício/tutorial de React.

O design deve parecer suficientemente polido para ser publicado.

A experiência principal deve ser extremamente rápida:

```text
abrir app
↓
adicionar produtos
↓
entrar no supermercado
↓
seguir categorias
↓
marcar produtos encontrados
↓
finalizar compra
```

Comece analisando o projeto atual e apresente brevemente a arquitetura que pretende utilizar.

Em seguida, implemente a primeira versão funcional seguindo as etapas descritas acima.

Ao final:

* execute os testes;
* execute o lint;
* execute o build;
* corrija os erros;
* apresente um resumo da arquitetura criada;
* informe os principais arquivos;
* explique como executar o projeto localmente;
* liste melhorias que podem ficar para uma futura versão, sem implementá-las desnecessariamente agora.
