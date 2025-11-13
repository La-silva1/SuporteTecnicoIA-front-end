# ConnectWay

O ConnectWay é um aplicativo móvel de gerenciamento de chamados, permitindo que os usuários criem, visualizem e avaliem seus chamados de suporte.

## Funcionalidades

*   **Autenticação:** Sistema de login e registro de usuários.
*   **Criação de Chamados:** Formulário para abrir um novo chamado de suporte.
*   **Listagem de Chamados:** Tela para visualizar o histórico de chamados abertos.
*   **Avaliação de Chamados:** Permite que o usuário avalie o atendimento recebido.

## Telas

O aplicativo é composto pelas seguintes telas:

*   `LoginScreen`: Tela de login para acesso ao sistema.
*   `RegisterScreen`: Tela de cadastro de novos usuários.
*   `NovoChamadoScreen`: Formulário para a criação de um novo chamado.
*   `MeusChamadosScreen`: Lista todos os chamados abertos pelo usuário.
*   `AvaliarChamadoScreen`: Permite ao usuário avaliar um chamado específico.
*   `SucessoScreen`: Tela de confirmação de sucesso após a criação de um chamado.
*   `AgradecimentoAvaliacaoScreen`: Tela de agradecimento após a avaliação de um chamado.

## Tecnologias Utilizadas

*   [React Native](https://reactnative.dev/)
*   [Expo](https://expo.dev/)
*   [React Navigation](https://reactnavigation.org/)

## Backend

Para o funcionamento completo da aplicação, é necessário que o backend esteja em execução. O backend é responsável por toda a lógica de negócios, autenticação e gerenciamento de dados.

Você pode encontrar o repositório do backend no seguinte link:

[La-silva1/SuporteTecnicoIA](https://github.com/La-silva1/SuporteTecnicoIA)

Siga as instruções no `README.md` do repositório do backend para configurá-lo e executá-lo.

## Como Começar

Siga as instruções abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento.

### Pré-requisitos

*   [Node.js](https://nodejs.org/) (versão LTS recomendada)
*   [Expo CLI](https://docs.expo.dev/get-started/installation/)
*   Um dispositivo físico ou emulador para executar o aplicativo.

### Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/frontend-connectway.git
    ```
2.  Navegue até o diretório do projeto:
    ```bash
    cd frontend-connectway
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```

### Executando o Projeto

Após a instalação, você pode usar os seguintes scripts para iniciar o aplicativo:

*   Para iniciar o Metro Bundler e executar em um emulador ou dispositivo físico:
    ```bash
    npm start
    ```
*   Para executar no Android:
    ```bash
    npm run android
    ```
*   Para executar no iOS:
    ```bash
    npm run ios
    ```
*   Para executar a versão web:
    ```bash
    npm run web
    ```

## Executando com Docker

Você também pode executar o ambiente de desenvolvimento usando Docker.

### Pré-requisitos

*   [Docker](https://www.docker.com/get-started)

### Build da Imagem

Primeiro, construa a imagem Docker a partir do `Dockerfile` na raiz do projeto:

```bash
docker build -t connectway-frontend .
```

### Executando o Container

Após o build da imagem, inicie o container. Isso irá iniciar o servidor de desenvolvimento do Expo para a web na porta 8081.

```bash
docker run -p 8081:8081 connectway-frontend
```

Acesse a aplicação em seu navegador no endereço `http://localhost:8081`.

**Observação:** Esta configuração é destinada apenas para o ambiente de desenvolvimento. O arquivo `nginx.conf` no projeto sugere uma configuração para produção, que exigiria um `Dockerfile` de múltiplos estágios para construir os arquivos estáticos e servi-los com Nginx.

## Estrutura do Projeto

```
frontend-connectway/
├─── assets/              # Imagens, fontes e outros assets
├─── components/          # Componentes reutilizáveis da UI
├─── constants/           # Constantes do aplicativo (cores, temas)
├─── hooks/               # Hooks customizados do React
├─── src/
│   ├─── api/             # Lógica de comunicação com a API
│   ├─── navigation/      # Configuração da navegação do app
│   ├─── screens/         # Telas principais do aplicativo
│   └─── theme/           # Arquivos de tema
├─── App.js               # Ponto de entrada principal do app
├─── package.json         # Dependências e scripts do projeto
└─── README.md            # Este arquivo
```