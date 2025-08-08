require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, "build")));

morgan.token("body", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// Conexão com o banco de dados
const password = process.env.MONGODB_PASSWORD;
const url = `mongodb+srv://igorbern:${password}@cluster0.noebaoi.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model("Person", personSchema);

// Rotas da API

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
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
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
