# Catálogo de Livros

# Pré-requisitos

```bash
Node.js instalado
```

## Como Rodar
```bash
npm install
npm run dev
```

# Decisões:

* React + Vite: Escolhidos pela agilidade no desenvolvimento e performance de build.
* Componentização: A interface foi dividida em componentes menores (`SearchBar`, `BookList`, `NewBookForm`) para garantir a reutilização e a clareza do código.
* Context API: Utilizada para o Gerenciamento de Tema (Claro/Escuro). Isso evita o "prop drilling" (passar propriedades por muitos níveis), permitindo que o tema seja acessado globalmente.
**Hooks Essenciais:
    * `useState`: Gerenciamento de inputs e listas.
    * `useEffect`: Simulação de requisição API (carregar `books.json`) e efeitos colaterais.
    * `useRef`: Implementação de **foco automático** no campo de busca para melhor UX.
* Custom Hook (`useLocalStorage`): Criamos um hook personalizado para abstrair a lógica de persistência de dados no navegador, mantendo os componentes limpos e a lógica reutilizável.

# integrantes do grupo:
Assuero Eduardo Cândido Guimarães - 01698585

Giovanni Saverio Svedese Rocha - 01725339

Guilherme Soares de Araújo Rocha – 01718731

Maria Clara Peixoto de Sousa – 01714429

Matheus rodrigues de Souza – 01702755

Thaysa Maria Cordeiro Santiago - 01701779
