# Córtex - Portal do Time de Crédito

Este é um projeto frontend para o sistema Córtex, desenvolvido com React.js e Ant Design.

## Como Executar o Projeto

### Pré-requisitos

- Docker
- Docker Compose

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-seu-repositorio>
    cd <nome-do-repositorio>
    ```

2.  **Suba os contêineres com Docker Compose:**
    ```bash
    docker-compose up -d
    ```

3.  **Acesse a aplicação:**
    Abra seu navegador e acesse `http://localhost:3000`.

A aplicação estará rodando em modo de desenvolvimento. Quaisquer alterações salvas nos arquivos da pasta `src` serão refletidas automaticamente no navegador.

### Parar a Aplicação

Para parar os contêineres, execute:

```bash
docker-compose down
```

## Estrutura do Projeto

-   `docker-compose.yml`: Define o serviço web para a aplicação.
-   `Dockerfile`: Configura o ambiente Node.js e as dependências para rodar a aplicação React.
-   `package.json`: Lista as dependências do projeto e os scripts.
-   `src/`: Contém o código-fonte da aplicação.
    -   `App.js`: Componente principal que gerencia o layout e as rotas.
    -   `components/`: Componentes reutilizáveis.
        -   `Header.js`: Cabeçalho da aplicação.
        -   `mockData.js`: Dados mockados para as telas.
    -   `pages/`: Componentes que representam as páginas da aplicação.
        -   `HomePage.js`: Tela inicial.
        -   `ExecutionHistoryPage.js`: Tela de histórico de execuções.
        -   `CustomerSearchPage.js`: Tela de consulta de clientes.
    -   `index.js`: Ponto de entrada da aplicação.
    -   `App.css`: Estilos globais.