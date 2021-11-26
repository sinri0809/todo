/* eslint-disable */
import './App.css';
import { Form, FormControl, Button, NavItem } from 'react-bootstrap';
import { useState, useEffect, createContext } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Pagination from './components/Pagination';
import Detail from './components/Detail';
import Popup from './components/Popup';
import './style.scss';
import './dark.scss';
import axios from 'axios';

const url = "http://localhost:4000/todo";
function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [curPage, setCurPage] = useState(1);
  // const [todosPerPage, setTodosPerPage] = useState(4);
  const todosPerPage = 4;
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  useEffect(() => {
    try{
      const fetchTodos = async () => {
        setLoading(true);
        await axios.get(url)
        .then((response) => {
          setTodos(response.data);
          // javascript array[-1] 안되나??
        })
        setLoading(false);
      }
      fetchTodos();
      // 현재 pagination 만들기 이거는 복습 많이 해야뎀
    }
    catch{
      throw new Error("something's wrong");
    }
    return ;
  }, []);

  // day night 모드 설정하고 클래스? 추가?? 
  const [mode, setMode] = useState('🌙night');
  const [modeSwitch, setModeSwitch] = useState(false);

  // (curPage-1)*todosPerPage + index  => 진짜 index가져옴.
  const indexOfStacked = (curPage - 1) * todosPerPage; // (1-1) * 4 = 0
  const indexOfLastTodos = curPage * todosPerPage; // 1 * 4 = 4
  const indexOfFirstTodos = indexOfLastTodos - todosPerPage; // 4 - 4 = 0
  let currentTodos = todos.slice(indexOfFirstTodos, indexOfLastTodos); 
  const searchedTodos = 1;
  const paginate = (pageNumber) => setCurPage(pageNumber);

  const searchTodo = (keyword) => {
    // splitTodos : todos 배열의 todo 값을 분해해서 넣어둔 배열
    let splitTodos = [];
    todos.map((item) => {
      splitTodos.push(item.todo.replace(/(\s*)/g, "").split(''))
    })
    // searchKey
    const searchKey = keyword.split('');

    let freqIndex = new Array(todos.length).fill(0);
    splitTodos.map((todo_arr, index) => {
      // Array.filter() : 조건에 맞는 배열을 반환해준다.
      todo_arr.filter((word) => {
        searchKey.map((key_word) => {
          word == key_word
          ? freqIndex[index] ++
          : null
        })
      })
    })
    // console.log(freqIndex.indexOf(Math.max(...freqIndex)))
    return freqIndex.indexOf(Math.max(...freqIndex))
  }

  // 찾는 값이 렌더링 되도록 하려면?
  return (
    <div className="App"
      mode = {modeSwitch ? 'night' : 'day'}
    >

      <header>
        <h1>Todo List😊</h1>
        <p>made by sinri</p>
        <button 
          className="mode-button"
          onClick={(event) => {
            if(modeSwitch){
              setMode('🌙night');
              setModeSwitch(false);
            }else{
              setMode('🌈day')
              setModeSwitch(true);
            }
          }}
          mode = {modeSwitch ? 'day' : 'night'}
        >{mode}</button>
        <Popup 
          popup={popup}
          setPopup={setPopup}
          message={popupMessage}
        />
      </header>
      <Form className="d-flex search">
        <FormControl
          placeholder="Search"
          className="me-2"
          onChange={(event) => {
            let index = searchTodo(event.target.value);
            currentTodos = todos.slice(index, index+3)
          }}
          onKeyPress={(event) => event.preventDefault()}
        />
      </Form>

      <Switch>
        <Route exact path="/">
          <AddTodo 
            url={url} 
            todos={todos} 
            setTodos={setTodos}
          />
          <TodoList 
            url={url} 
            currentTodos={currentTodos} 
            loading={loading} 
            indexOfStacked={indexOfStacked}
            setPopup={setPopup}
            setPopupMessage={setPopupMessage}
            ></TodoList>
          <Pagination 
            perPage={todosPerPage} 
            totalPage={todos.length} 
            paginate={paginate}
          />
        </Route>

        <Route path='/detail/'>
          <Detail 
            todos={todos} 
            // indexOfStacked={indexOfStacked} 
            url={url}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
