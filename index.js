const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(cors());

const path = require("path");

// Servir arquivos estáticos do build do React
app.use(express.static(path.resolve(__dirname, "build")));

// Rota catch-all para retornar o index.html em rotas desconhecidas (React Router)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});
morgan.token("body", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const date = new Date();
  const info = `<p>Phonebook has info for ${persons.length} people</p>
                <p>${date}</p>`;
  response.send(info);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  if (persons.find((p) => p.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: Math.floor(Math.random() * 10000),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const express = require("express");
// const app = express();

// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true,
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false,
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
//   },
// ];

// app.use(express.json());

// app.get("/", (request, response) => {
//   response.send("<h1>Hello World!</h1>");
// });

// app.get("/api/notes", (request, response) => {
//   response.json(notes);
// });

// app.get("/api/notes/:id", (request, response) => {
//   const id = request.params.id;
//   const note = notes.find((note) => note.id === id);

//   if (note) {
//     response.json(note);
//   } else {
//     response.status(404).end();
//   }
// });

// const generateId = () => {
//   const maxId =
//     notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
//   return String(maxId + 1);
// };

// app.post("/api/notes", (request, response) => {
//   const body = request.body;

//   if (!body.content) {
//     return response.status(400).json({
//       error: "content missing",
//     });
//   }

//   const note = {
//     content: body.content,
//     important: body.important || false,
//     id: generateId(),
//   };

//   notes = notes.concat(note);

//   response.json(note);
// });

// app.delete("/api/notes/:id", (request, response) => {
//   const id = request.params.id;
//   notes = notes.filter((note) => note.id !== id);

//   response.status(204).end();
// });

// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
