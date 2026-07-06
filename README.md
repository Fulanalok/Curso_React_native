# Aplicação de Links

Aplicativo mobile criado com Expo e React Native para salvar, categorizar, abrir e remover links úteis.

## Funcionalidades

- Listagem de links por categoria.
- Cadastro de novos links.
- Persistência local com AsyncStorage.
- Abertura de links externos.
- Remoção de links salvos.

## Tecnologias

- Expo 53
- React Native 0.79
- React 19
- Expo Router
- TypeScript
- AsyncStorage

## Como Rodar

Instale as dependências:

```bash
npm install
```

Inicie o projeto:

```bash
npm start
```

Também é possível iniciar diretamente em uma plataforma:

```bash
npm run android
npm run ios
npm run web
```

## Validação

Execute a checagem de tipos:

```bash
npm run typecheck
```

Execute os testes:

```bash
npm test
```

## Estrutura Principal

```text
src/
  app/          Rotas do Expo Router
  assets/       Imagens do aplicativo
  components/   Componentes reutilizáveis
  storage/      Persistência local
  styles/       Cores e estilos compartilhados
  utils/        Dados auxiliares
```
