const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb+srv://ucalsamet:samet1998@cluster0.migsq.mongodb.net/todolist?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const TodoModel = mongoose.model("todo", { text: String });

app.get("/get-all", (req, res) => {
  TodoModel.find({}, (err, docs) => {
    res.status(200).json({
      docs: docs
    });
  });
});

app.post("/save", (req, res) => {
  const newTodoItem = new TodoModel({
    text: req.body.todoText
  });
  newTodoItem.save().then(response => {
    res.status(200).json({
      data: response
    });
  });
});

app.delete("/delete", (req, res) => {
  let todo = req.body.todo;
  TodoModel.findOneAndRemove({ _id: todo._id }, () => {
    res.status(204).json({
      message: "deleted"
    });
  });
});

app.put("/update", (req, res) => {
  let updatedTodo = req.body.todo;
  TodoModel.findOneAndUpdate(
    { _id: updatedTodo._id },
    { text: updatedTodo.text },
    () => {
      res.status(200).json({
        message: "updated"
      });
    }
  );
});

module.exports = {
  path: "/api",
  handler: app
};
