import React from 'react'
import { Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import ChaletIcon from '@mui/icons-material/Chalet';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { Fab, Tooltip } from '@mui/material';

function Home() {

  const user = useSelector((state) => state.user.usersName);
  const menu = [
    { item: ["View ToDo"], navigate: '/ToDoList' },
    { item: ["Log out"], navigate: '/'}
  ]
  const navigateTo = useNavigate(); 

  return (
    <div>
      <Header symbol={<ChaletIcon/>} disable={true} title={'        To-Do Manager'} menuItem={menu} to='/home' />
      <div style={{position: 'absolute', top: 100}}>
        <Typography variant= 'h3' style={{ color: 'darkblue', position: 'relative', marginLeft: 250  }} >Welcome to To-Do Management System</Typography>
        <Typography variant='h2' style={{ lineHeight: 2}}>Hi {user},</Typography>
        <Typography variant='h4' style={{position: 'relative', marginLeft: 80, marginRight: 80}} >In this system you can add the task you wants to do in, "add To-Do" and view them in, "view To-Do".
        You can also filter and view them based on completed and uncompleted tasks.</Typography>
        {/* <Typography variant='h3' style={{ }} >Click the '+' button below for more options</Typography> */}
      </div>
      <Tooltip title='Add To-Do' >
        <Fab aria-label='Add' color='primary' sx={{ position: 'absolute', bottom: 16, right: 16 }}
        onClick={() => navigateTo('/addToDo')} size='large' >
          <AddIcon fontSize='large' />
        </Fab> 
      </Tooltip>
    </div>
  )
}

export default Home