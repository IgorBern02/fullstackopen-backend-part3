# Full Stack Open — Backend Part 3

Este projeto é a implementação da parte 3 do curso *Full Stack Open*, focada no backend com Node.js, Express e MongoDB.

## 🧩 Visão geral

Na Parte 3 do curso, você vai:

- Criar uma API com **Express** que oferece operações CRUD para “notes” (ou equivalente, conforme o exercício).
- Utilizar **MongoDB / Mongoose** para persistência de dados.
- Validar dados de entrada (por exemplo, exigindo que o conteúdo da nota não seja vazio).
- Lidar com erros, requisições inválidas, endpoints desconhecidos, middlewares de logging etc.
- Usar variáveis de ambiente para configurações (porta, URI do banco etc.).

Neste repositório, você encontrará:

- `index.js` — ponto de entrada do servidor.
- Configuração do servidor Express e middlewares.
- Conexão com banco de dados via Mongoose.
- Definições de rotas, controladores e tratamento de erros.
- `package.json` & `package-lock.json` com dependências.

## 🛠️ Instalação e uso local

1. Clone este repositório:

   ```bash
   git clone https://github.com/IgorBern02/fullstackopen-backend-part3.git
   cd fullstackopen-backend-part3
   ```
2. Instale as dependências:

    ```bash
    npm install
   ```

3. Crie um arquivo .env na raiz (que não deve entrar no controle de versão) com pelo menos estas variáveis:

   ```bash
    PORT=3001
   MONGODB_URI=<sua_uri_mongodb>
   ```

4. Inicie o servidor:

     ```bash
    npm start
   ```

 ou, para reiniciar automaticamente durante o desenvolvimento (caso use nodemon):

 ```bash
   npm run dev
   ```

5. O servidor estará ativo em http://localhost:<PORT> (por exemplo, http://localhost:3001).

🚀 Endpoints

A seguir, exemplos de rotas típicas para uma API de notas (ajuste conforme sua implementação real):

Método	Rota	Descrição
- GET	/api/notes	Retorna todas as notas
- GET	/api/notes/:id	Retorna uma nota pelo ID
- POST	/api/notes	Cria uma nova nota
- PUT	/api/notes/:id	Atualiza uma nota existente
- DELETE	/api/notes/:id	Apaga uma nota pelo ID
- 
Exemplos de requisição

Criar nota (POST /api/notes):
   ```bash
   {
  "content": "Estudar Node.js",
  "important": true
   }
   ```
Resposta esperada:
  ```bash
{
  "id": "62f9cb6a1a2b3c4d5e6f7g8h",
  "content": "Estudar Node.js",
  "important": true,
  "date": "2025-10-01T12:34:56.789Z"
}
   ```

🧪 Testes

Se você adicionar testes (por exemplo com Jest / Supertest), pode incluir comandos:
  ```bash
npm test
   ```
e configurar scripts adequados no package.json.

📦 Dependências principais

Algumas dependências esperadas (ver package.json para versão exata):

- express
- mongoose
- cors (se habilitar CORS)
- dotenv
- morgan (logging)
- nodemon (dev)

🧩 Tratamento de erros e middlewares

Este projeto deve incluir:

- Middleware para lidar com endpoints desconhecidos (404).
- Middleware global de manejo de erros (captura erros do Mongoose, cast de IDs inválidos, etc.).
- Logging de requisições (via morgan ou similar).
- Middleware para servir static (caso necessário) ou parse JSON.

🎯 Ponto de partida sugerido

- Comece configurando o servidor Express básico e conexão com MongoDB.
- Defina o schema/modelo Mongoose para nota.
- Implemente rotas GET / POST / DELETE / PUT.
- Adicione validações e erros.
- Configure middlewares de logging, erro e endpoints desconhecidos.
- Teste manualmente e, se desejar, escreva testes automatizados.

🙋 Melhorias futuras

- Autenticação / autorização (JWT, usuários, login).
- Deploy em serviço de nuvem (Heroku, Vercel, AWS, etc.).
- Versionamento da API (v1, v2…).
- Rate limiting, sanitização de dados (prevenir injeções).
- Documentação da API (Swagger / OpenAPI).****
