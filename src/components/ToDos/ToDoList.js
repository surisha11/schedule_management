import React, { useState } from 'react' 
import db from '../../firebase';
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, Modal, Paper, Stack, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import ButtonGroup from '@mui/material/ButtonGroup';

function ToDoList(props) {

  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');
  const date = null;
  const [editDate, setEditDate] = useState('');
  const [open, setOpen] = useState(false); //to open and close Modal component
  const user = useSelector((state) => state.user.usersName)

  const Edit = () => {
    setOpen(true);
    setInput(props.toDo.todo);
    setDescription(props.toDo.describe);
    setEditDate(props.toDo.endDate);
  }

  const editToDo = () => {
    //remove the data from the database and append the new value in it's place
    db.collection(user).doc(props.toDo.id).set({
      Task : input,
      Description : description,
      EndDate : editDate,
      check : false
    }, { merge : true });
    setOpen(false);
  }

  return (
    <div>
      <Checkbox checked={props.toDo.Check}  onChange={(val) => {
        val.target.checked === true ? 
          db.collection(user).doc(props.toDo.id).set({ Task : props.toDo.todo, Description : props.toDo.describe,
          EndDate : props.toDo.endDate, check : true }, { merge : true })
          : db.collection(user).doc(props.toDo.id).set({ Task : props.toDo.todo, Description : props.toDo.describe,
          EndDate : props.toDo.endDate, check : false }, { merge : true })
          }}  />
        {props.toDo.Check === true ? 'Done' : 'Not Done'}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="list" id="header" >
          <Typography>
            {props.toDo.todo}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {props.toDo.describe}
          </Typography>
          <Typography variant='body2' >
            Last date : {props.toDo.endDate}
          </Typography>
          <ButtonGroup variant="contained" aria-label="Edit and Delete" >
            <Button onClick={() => {db.collection(user).doc(props.toDo.id).delete()} } color='error' >Delete</Button>
            <Paper sx={{width: 2}} />
            <Button onClick={Edit}  >Edit</Button>
          </ButtonGroup>
        </AccordionDetails>
      </Accordion>
      <Modal open={open} onClose={ev => setOpen(false)} >
        <div>
          <form style={{textAlign: 'center'}}>
            <Stack direction="column" justifyContent="center" alignItems="center" >
              <Paper  elevation={10} style={{width: 500, padding: 50, margin: 20}}  >
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}> 
                  <TextField required label='To-Do' id="todo" value={input} onChange={val => setInput(val.target.value)}
                  sx={{width: 300}} autoFocus={true} />
                  <TextField label="Description" id="description" multiline rows={4} sx={{width: 300}} value={description}
                  onChange={val => setDescription(val.target.value)} />
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker label="Dead line *" value={date} 
                    onChange={(newValue) => setEditDate(newValue.$d.toString().slice(0, newValue.$d.toString().indexOf('00:00:00')))} />
                  </LocalizationProvider>
                  <ButtonGroup  >
                    <Button variant="contained"  onClick={editToDo } color='success' disabled={!input} size='large'>Update ToDo</Button> 
                    <hr style={{color: 'white', width: 10, visibility: 'hidden'}} ></hr>
                    <Button variant='contained' onClick={() => setOpen(false)} color='error' size='large'>Cancle</Button>  
                  </ButtonGroup>               
                </Stack>
              </Paper>
            </Stack>
          </form> 
        </div>
      </Modal>
    </div>
  )
}

export default ToDoList;


