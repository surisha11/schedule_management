// import React, { useState } from 'react'
// import db from './firebase';
// import { Modal } from '@material-ui/core';

// function ToDO(props) {

//   const [input, setInput] = useState('');
//   const [open, setOpen] = useState(false); //to open and close Modal component

//   const editToDo = () => {
//     //remove the data from the database and append the new value in it's place
//     db.collection('Schedules').doc(props.toDo.id).set({
//       Task : input
//     }, { merge : true });
//     setOpen(false);
//   }

//   return (
//     <>
//     <Modal
//       open={open}
//       onClose={ev => setOpen(false)}
//     >
//       <div>
//           <input placeholder={props.toDo.todo} onChange={ev => setInput(ev.target.value)} />
//           <button onClick={editToDo} >Update ToDo</button> 
//         </div>
//     </Modal>
//     <div>
//       <li key={props.toDo.id} >{props.toDo.todo}</li>
//       <button onClick={ev => db.collection('Schedules').doc(props.toDo.id).delete() } >Delete</button>
//       <button onClick={() => {setOpen(true); console.log(props.toDo.doc)}} >Edit</button>
//     </div>
//     </>
//   )
// }

// export default ToDO;