/*
  1. todolist를 json파일에서 가져온다.
  http://localhost:4000/todo
  2. todo를 렌더링한다. 
  3. todo 삭제시 toggle 창을 띄운다.
*/
// import { useState } from "react";
import { ListGroup, InputGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './todo.scss';
import axios from 'axios';

// Link말고 onclick해서 hook으로 처리함
// function TodoList(props){
// 이렇게 쓰면 안헷갈리고 좋음 😉
const TodoList = ({url, currentTodos, loading, todos}) => {
  let history = useHistory();
  if(loading) {
    // loading 화면 
    return <h3>Loading</h3>
  }

  return<ListGroup>
    {currentTodos.map((item, index) => (
        <li className="todolist d-flex justify-content-between align-items-center"
          key={index}
        >
          <InputGroup.Checkbox 
            className="checkbox"
            aria-label="Checkbox for following text input"
            onClick={(e) => {
              let temp = item;
              temp.completed = toggleCompleted(item.completed);
              patchJSON(url, item.id);

            }}
          />
          
          {/* <Link to="/detail"
            className={"btn btn-outline "+ (item.completed?"completed":null)}
          >
          { item.todo }
          </Link> */}
          <button 
            onClick={() => moveToDetail(history, index)}
            // completed 가 true일 때, class name 하나 더 추가
            className={"list-inline-item btn btn-outline "+ (item.completed?"completed":null)}
          >
          { item.todo }
          </button>

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

const patchJSON = (url, id) => {
  // let data = {
  //   id : id
  // }
  axios.patch(url, '/1')
  .then((res) => {
    console.log(res);
  })

  return 1;
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

const toggleCompleted = (state) => {
  return !state;
}

const moveToDetail = (history, index) => {
  // 각 todo 상세페이지로 이동하기
  history.push(`/detail/${index}`);
}

export default TodoList;
