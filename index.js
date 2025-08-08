require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const Person = require("./models/person"); // importa o modelo Mongoose corretamente

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, "build")));

morgan.token("body", (req) =>
  req.method === "POST" ? JSON.stringify(req.body) : ""
);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// Rotas da API

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({ error: "name or number missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// app.get("/info", (request, response) => {
//   const date = new Date();
//   Person.countDocuments({}).then((count) => {
//     const info = `<p>Phonebook has info for ${count} people</p>
//                   <p>${date}</p>`;
//     response.send(info);
//   });
// });

// app.get("/api/persons/:id", (request, response) => {
//   Person.findById(request.params.id)
//     .then((person) => {
//       if (person) {
//         response.json(person);
//       } else {
//         response.status(404).end();
//       }
//     })
//     .catch(() => {
//       response.status(400).send({ error: "malformatted id" });
//     });
// });

// app.post("/api/persons", (request, response) => {
//   const body = request.body;

//   if (!body.name || !body.number) {
//     return response.status(400).json({ error: "name or number missing" });
//   }

//   Person.findOne({ name: body.name }).then((existingPerson) => {
//     if (existingPerson) {
//       return response.status(400).json({ error: "name must be unique" });
//     }

//     const person = new Person({
//       name: body.name,
//       number: body.number,
//     });

//     person.save().then((savedPerson) => {
//       response.json(savedPerson);
//     });
//   });
// });

// app.delete("/api/persons/:id", (request, response) => {
//   Person.findByIdAndDelete(request.params.id)
//     .then(() => {
//       response.status(204).end();
//     })
//     .catch(() => {
//       response.status(400).send({ error: "malformatted id" });
//     });
// });

// Rota catch-all para SPA (deve ser a última)
// app.get("/*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "build", "index.html"));
// });

// Iniciar servidor (caso você queira testar localmente com nodemon)
