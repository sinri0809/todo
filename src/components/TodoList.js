/*
  1. todolist를 json파일에서 가져온다.
  http://localhost:4000/todo
  2. todo를 렌더링한다. 
  3. todo 삭제시 toggle 창을 띄운다.
*/
import { ListGroup, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './todo.scss';

import axios from 'axios';

// function TodoList(props){
// 이렇게 쓰면 안헷갈리고 좋음 😉
const TodoList = ({url, todos, loading}) => {
  // loading 화면 
  if(loading) {
    return <h3>Loading</h3>
  }
  return<ListGroup>
    {todos.map((item, index) => (
        <li className="d-flex justify-content-between align-items-center"
          key={index}
        >
          <InputGroup.Checkbox 
            className="checkbox"
            aria-label="Checkbox for following text input"
          />

          <Link to="/detail"
            className="btn btn-outline"
          >
          { item.todo }
          </Link>

          <button 
            className="btn btn-light delete"
            onClick={() => {
              deleteJSON(url, item.id)
            }}
          >
            delete</button>
        </li>
      ))
    }
  </ListGroup>
}

function deleteJSON(url, id){
  let delete_url = url + '/' + id;
  axios.delete(delete_url)
  .then((response) => {
    console.log("succeed to delete");
  })
  .catch((error) => {
    console.error("succeed to delete");
  })
}

export default TodoList;
