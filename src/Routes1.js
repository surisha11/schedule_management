import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AddToDo from './components/AddToDo';
import App from './App';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Completed from './components/ToDos/Completed';
import Uncompleted from './components/ToDos/Uncompleted';
import ToDo from './components/ToDos/ToDo';

function Routes1() {
 
  return ( 
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signUp' element={<SignUp/>} />
          <Route path='/home' element={<Home/>}/>
          <Route path='/addToDo' element={<AddToDo/>} />
          <Route path='/home/ToDoList' element={<ToDo/>} />
          <Route path='/ToDoList' element={<ToDo/>} />
          <Route path='/completed' element={<Completed/>} />
          <Route path='/uncompleted' element={<Uncompleted/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Routes1;