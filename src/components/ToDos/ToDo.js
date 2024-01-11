import React, { useEffect, useState } from 'react'
import db from '../../firebase';
import ToDoList from './ToDoList'
import { Container } from '@mui/material';
import Header from '../Header';
import ChaletIcon from '@mui/icons-material/Chalet';
import { useSelector } from 'react-redux';

function ToDo() {

    const [toDo, setToDo] = useState([]);
    const menu = [
      { item: ["Add ToDo"], navigate: '/addToDo' },
      { item: ["Completed Task"], navigate: '/completed'},
      { item: ["Uncompleted Task"], navigate: '/uncompleted'}
    ];
    const user = useSelector((state) => state.user.usersName)

  useEffect(() => {
    // triggres when Task is initialized or whenever Task get refreshed
    db.collection(user).orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    setToDo(snapshot.docs.map(doc => ({id : doc.id , todo : doc.data().Task, describe : doc.data().Description,
      endDate : doc.data().EndDate, Check: doc.data().check
    })));
  })}, 
  []);

  return (
    <Container>
      <Header disable={false} symbol={<ChaletIcon  fontSize='20' />} title={'View Task'} menuItem={menu} to='/home' />
      < div style={{marginTop: 80}}>
        <ul> 
            {toDo.map((task, index) => (
              <li key={index}>
                <ToDoList  toDo={task} />
              </li>
            ))}
        </ul>
      </div>
    </Container>
  )
}

export default ToDo;