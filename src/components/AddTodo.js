import { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import axios from "axios";

const AddTodo = ({url, todos, setTodos}) => {

  const nextIndex = todos.length;
  const [inputNow, setInputNow] = useState('');
  return<Form className="d-flex">
    <FormControl className="me-2 input-area"
      onChange={(e) => setInputNow(e.target.value)}
      onClick={(e) => e.target.value = ''}
      onKeyPress={(event) => {
        if(event.key === "Enter"){
          event.preventDefault();
          const newTodo = makeTodo(nextIndex, inputNow);
          postJSON(url, newTodo)
          setTodos(todos.concat(newTodo))
        }
      }}
    />

    <Button
      onClick={(e) => {
        e.preventDefault();
        const newTodo = makeTodo(nextIndex, inputNow);
        postJSON(url, newTodo)
        setTodos(todos.concat(newTodo))
      }}
    >
      +
    </Button>
  </Form>
}

const makeTodo = (next_index=0, todo='무제') => {
  const today = new Date();
  const input = {
    id : next_index,
    todo : todo,
    todoContents : '',
    completed : false,
    date : ''
  };
  input.date = `${today.getFullYear()}-${today.getMonth()}-${today.getDay()}`;
  console.log(input.date);
  return input;
}
function postJSON(url, newTodo){
  axios.post(url, newTodo)
  .then((res) => {
    return 1;
  })
  .catch((err) => {
  })

}

export default AddTodo;