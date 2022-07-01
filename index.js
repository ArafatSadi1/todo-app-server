const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.locwg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const todoCollection = client.db("todos").collection("todo");

    app.post("/todo", async (req, res) => {
      const todo = req.body;
      const result = await todoCollection.insertOne(todo);
      res.send(result);
    });

    app.get("/todos", async (req, res) => {
      const result = (await todoCollection.find({}).toArray()).reverse();
      res.send(result);
    });

    app.patch("/updateTodo/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const { updatedTodo } = req.body;
      const updatedDoc = {
        $set: {
          todo: updatedTodo,
        },
      };
      const result = await todoCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    app.put("/completeTodo/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const { complete } = req.body;
      const updatedDoc = {
        $set: {
          complete: complete,
        },
      };
      const result = await todoCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    app.delete("/delete/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await todoCollection.deleteOne(filter);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from todoist app");
});

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});
