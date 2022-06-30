const express = require('express');
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT | 5000;

// middleware
app.use(cors());
app.use(express.json());

// const userDB = todo-data
// const pass = om9AneO3LTWllaA7

const uri = "mongodb+srv://todo-data:<om9AneO3LTWllaA7>@cluster0.locwg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
      await client.connect();
      const todoCollection = client.db("todos").collection("todo");

      app.post('/todo', async(req, res)=>{
        const todo = req.body;
        const result = await todoCollection.insertOne(todo);
        res.send(result)
      })

    } finally {
    }
  }
  run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello from todoist app')
})

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`)
})