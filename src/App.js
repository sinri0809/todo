/* eslint-disable */
import './App.css';
import { Form, FormControl, Button, NavItem } from 'react-bootstrap';
import { useState, useEffect, createContext } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Pagination from './components/Pagination';
import './style.scss';
import axios from 'axios';

const url = "http://localhost:4000/todo";
function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(5);
  // todos data 가져오기
  console.log(todos)

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
  
  const indexOfLastTodos = curPage * todosPerPage; // 1 * 3 = 3
  const indexOfFirstTodos = indexOfLastTodos - todosPerPage; // 3 - 3 = 0
  const currentTodos = todos.slice(indexOfFirstTodos, indexOfLastTodos); 
  const paginate = (pageNumber) => setCurPage(pageNumber);

  return (
    <div className="App">
      <header>
        <h1>Todo List😊</h1>
        <p>made by sinri</p>
      </header>
      <Form className="d-flex search">
        <FormControl
          placeholder="Search"
          className="me-2"
        />
      </Form>

      <Switch>
        <Route exact path="/">
          <AddTodo 
            url={url} 
            todos={todos} 
            setTodos={setTodos}
          />
          <TodoList url={url} todos={currentTodos} loading={loading}></TodoList>
          <Pagination 
            perPage={todosPerPage} 
            totalPage={todos.length} 
            paginate={paginate}
          />
        </Route>

        <Route path='/detail'>
          <h5>todo 수정</h5>
        </Route>

      </Switch>

    </div>
  );
}

export default App;
