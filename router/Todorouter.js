let express = require("express")
const Todo = require("../db/Todos")
let  Todorouter = express.Router()
Todorouter.post("/addtodo", async(req,res)=>{
    let addtododefine = new Todo({
        text : req.body.text,
    })
    let todosava =  await addtododefine.save()
    res.send(todosava) 
})
Todorouter.get("/getalltodo", async(req,res)=>{
    try {
        const todos = await Todo.find();
        const sanitizedTodos = todos.map(todo => todo.toJSON());
        res.json(sanitizedTodos);
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
      }
    });
  Todorouter.delete('/deletetodo/:id', async (req, res) => {
        const { id } = req.params;
        try {
          await Todo.findByIdAndDelete(id);
          res.status(204).end();
        } catch (error) {
          console.error(error);
          res.status(500).send('Error deleting todo');
        }
      });
      Todorouter.put('/api/todos/:id', (req, res) => {
        const id = req.params.id;
        const updatedTodo = req.body;
      
        Todo.findById(id, (err, todo) => {
          if (err) {
            res.status(500).send(err);
            return;
          }
      
          todo.title = updatedTodo.title;
          todo.completed = updatedTodo.completed;
      
          todo.save((err) => {
            if (err) {
              res.status(500).send(err);
              return;
            }

            res.send(todo);
          });
        });
      });
      Todorouter.put('/markisread/:id', async (req, res) => {
        try {
          const { id } = req.params;
          const todo = await Todo.findByIdAndUpdate(id, { read: true });
          res.json(todo);
        } catch (error) {
          console.error(error);
          res.status(500).send('Server Error');
        }
      });
module.exports = Todorouter;