import React, { useEffect, useState } from 'react'
import Header from '../Header'
import ReplyTwoToneIcon from '@mui/icons-material/ReplyTwoTone';
import { Container } from '@mui/material';
import db from '../../firebase';
import ToDoList from './ToDoList';
import { useSelector } from 'react-redux';

function Completed() {

  const [toDo, setToDo] = useState([]);
  const menu = [];
  const user = useSelector((state) => state.user.usersName)

  useEffect(() => {
    // triggres when Task is initialized or whenever Task get refreshed
    db.collection(user).orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    setToDo(snapshot.docs.map(doc => ({id : doc.id , todo : doc.data().Task, describe : doc.data().Description,
      endDate : doc.data().EndDate, Check: doc.data().check })));
  });
}, 
  []);
 
  return (
    <Container>
      <Header disable={false} symbol={<ReplyTwoToneIcon/>} title={'Completed Task'} menuItem={menu} to='/ToDoList' />
      < div style={{marginTop: 80}}>
        <ul> 
            {toDo.map((task, index) => (
              task.Check &&
              <li key={index}>
                <ToDoList  toDo={task}  />
              </li>
            ))}
        </ul>
      </div>
    </Container>
  )
}

export default Completed