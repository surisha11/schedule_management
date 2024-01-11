import { useState } from 'react';
import db from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Container, TextField, Button, Typography, Stack, Paper, Alert, AlertTitle } from '@mui/material';
import Header from './Header';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ChaletIcon from '@mui/icons-material/Chalet';
import { useSelector } from 'react-redux';


function AddToDo() {

  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(null);
  const [notify, setNotify] = useState('');
  const menu = [{
    item: ["Show All Task"],
    navigate: '/ToDoList'
  }];
  const user = useSelector((state) => state.user.usersName)

  const addToDo = (newEvent) => {
    //Triggers when Add Todo button is clicked
    newEvent.preventDefault(); //will stop form refresh
    db.collection(user).add({
      Task : input,
      Description : description,
      EndDate : date.slice(0, date.indexOf('00:00:00')),
      check : false,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()
    }) //add new todo to the already existing todo list
    setDate(null);
    setDescription('');
    setInput(''); //clear the input field after clicking Add Todo
    setNotify('Success')
  }

  return (
    <Container fixed >
      <Header disable={false} symbol={<ChaletIcon/>} title={'Add Next Task'} menuItem={menu} to='/home' />
      <div style={{marginTop: 60}} >
        { notify !== '' &&
          <div>
            <Alert severity="success" onClose={() => {setNotify('')}} >
              <AlertTitle>Success</AlertTitle>
              To-Do was added successfully!!!
              </Alert>
          </div>
        }
        <Typography variant='h2' style={{textAlign: 'center'}} >Add ToDo to do next!!!</Typography>
        <form style={{textAlign: 'center'}}>
          <Stack direction="column" justifyContent="center" alignItems="center" >
            <Paper  elevation={10} style={{width: 500, padding: 50, margin: 20}}  >
              <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}> 
                <TextField required label="Enter the task" id="todo" value={input} onChange={val => setInput(val.target.value)}
                sx={{width: 300}} autoFocus={true} />
                <TextField label="Description" id="description" multiline rows={4} sx={{width: 300}} value={description}
                onChange={val => setDescription(val.target.value)} />
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker label="Dead line *" value={date}  onChange={(newValue) =>{ setDate(newValue.$d.toString());}} />
                </LocalizationProvider>
                <Button variant="contained" onClick={addToDo} disabled={!input} size='large'>Add Todo</Button>      
              </Stack>
            </Paper>
          </Stack>
        </form>
      </div>
    </Container>
  );
}

export default AddToDo;
