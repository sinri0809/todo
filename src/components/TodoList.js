/*
  1. todolist를 json파일에서 가져온다.
  http://localhost:4000/todo
  2. todo를 렌더링한다. 
  3. todo 삭제시 toggle 창을 띄운다.
*/
import { ListGroup, InputGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './todo.scss';
import axios from 'axios';

// Link말고 onclick해서 hook으로 처리함
// function TodoList(props){
// 이렇게 쓰면 안헷갈리고 좋음 😉
const TodoList = ({url, currentTodos, loading, indexOfStacked, setPopup, setPopupMessage}) => {
  /* 
    index+indexOfStacked해야 하는 이유: 
    currentTodos가 매번 slice된 배열로 접근하기 때문에
    진짜 index로 접근할 수 없고 매번  0, 1, 2로 접근하기 때문에 
    진짜 index로 접근하기위해서 indexOfStacked를 더해주었다. 
  */  
  let history = useHistory();
  if(loading) {
    // loading 화면 
    return <h3>Loading</h3>
  }
  
  return<ListGroup>
    {currentTodos.map((item, index) => (
      
      <li className="todolist d-flex justify-content-between align-items-center"
        key={index+indexOfStacked}
      >
        <InputGroup.Checkbox 
          className="checkbox"
          aria-label="Checkbox for following text input"
          // rendering할 때, 이미 ture인 것들은 체크 된 상태로 남아있게하기
          defaultChecked={item.completed}
          onClick={(e) => {
            let temp = item;
            temp.completed = toggleCompleted(item.completed);
            patchJSON(url, index+indexOfStacked, temp.completed);
            setPopup(true);
            temp.completed
            ? setPopupMessage('checked!')
            : setPopupMessage('unchecked!')
          }}
        />
        
        <button 
          onClick={() => moveToDetail(history, index+indexOfStacked)}
          // completed 가 true일 때, class name 하나 더 추가
          className={"list-inline-item btn btn-outline "+ (item.completed?"completed":null)}
        >
          { item.todo }
        </button>
        <button 
          className="btn btn-light delete"
          onClick={() => {
            deleteJSON(url, index+indexOfStacked);
            setPopupMessage('deleted');
          }}
        >
          delete</button>
      </li>
      ))
    }
  </ListGroup>
}

// checkbox를 누르면, completed를 바꾸는 익명 함수
const patchJSON = (url, index, completed) => {
  const url_index = `${url}/${index}`;
  axios.patch(url_index, {completed : completed})
  .then((res) => {
    return true;
  })
  return 1;
}

function deleteJSON(url, index){
  const delete_url = url + '/' + index;
  axios.delete(delete_url)
  .then((response) => {
    console.log("succeed to delete");
    console.error(response);
  })
  .catch((error) => {
    console.error("succeed to delete");
  })
}

const toggleCompleted = (state) => !state;
 // 각 todo 상세페이지로 이동하기
const moveToDetail = (history, index) => history.push(`/detail/${index}`);

export default TodoList;