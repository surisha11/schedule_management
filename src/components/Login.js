import { Button, TextField, Paper, Stack, Typography, IconButton, Alert } from '@mui/material'
import React, { useEffect, useState } from 'react';
import db from '../firebase';
import { useNavigate } from 'react-router-dom';
import ReplyTwoToneIcon from '@mui/icons-material/ReplyTwoTone';
import { useDispatch } from 'react-redux';
import { check } from '../slice';

function Login() {

    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [checkDatabase, setCheckDatabase] = useState([]);
    const [uNameHelp, setUNameHelp] = useState('');
    const [pHelp, setPHelp] = useState('');
    const [pass, setPass] = useState('');
    const [id, setId] = useState('');
    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      db.collection('UsersName').onSnapshot((snapshot) => {
          setCheckDatabase(snapshot.docs.map(doc => ({
            Username: doc.data().UserName, 
            Email: doc.data().Email,
            Password: doc.data().PassWord
          })));
      })
  }, [])

    const Check = (ev) => {
      ev.preventDefault(); //will stop form refresh

      checkDatabase.map(data => {
        if(userName === data.UserName) {
        setId(data.Password)
        return false;
        }
        else if(passWord !== id) {
        setPass("User name or Password is incorrect")
        return false;
        }
        else {
          setUserName("");
          setPassWord(''); //clear the TextField field after clicking SignUp
          dispatch(check(userName));
          navigateTo('/home');
          return true;
        }
      })
    }

    const checkUName = (ch) => {
      const uName = ch.target.value;
      checkDatabase.map(data => {
        if(uName === data.Username) {
        setId(data.Password) 
        }
        return true;
      })
      if(uName === ''){
          setUNameHelp("User name is required");
          return false;
      }
      else
      setUNameHelp('')
      setUserName(uName);
    }

    const checkPassWord = (val) => {
      if(val.target.value === '')
          setPHelp("Password is required");
          else
          setPHelp('');
      
      setPassWord(val.target.value);
    }

  return (
    <div>
    {/* <div style={{backgroundColor: 'black' , height: '100vh'  }} > */}
              {/* <IconButton onClick={() => navigateTo('/')} sx={{color: 'white'}} >
            <ReplyTwoToneIcon/>
        </IconButton>  */}
        <Typography variant='h2' style={{textAlign: 'center', color: 'white'}} >Login to </Typography>
        <form style={{textAlign: 'center'}}>
          {/* <Stack direction="column" justifyContent="center" alignItems="center" > */}
            {/* <Paper  elevation={10} style={{width: 500, padding: 50, margin: 20, }}  > */}
              <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}> 
                <TextField required label="Enter user name or email" id="userName" value={userName} autoFocus={true}
                color={uNameHelp === '' ? 'primary' : 'error'} onChange={checkUName} sx={{width: 300}} helperText={uNameHelp}  />
                <TextField required label="Enter your password" id="passWord" type= 'password' sx={{width: 300}} value={passWord}
                onChange={checkPassWord} color={pHelp === '' ? 'primary' : 'error'} helperText={pHelp}  />
                {pass !== '' &&
                  <Alert severity="error">{pass}</Alert>
                  }
                <Button variant="contained"  onClick={Check}  size='large'>Login</Button>      
              </Stack>
            {/* </Paper> */}
          {/* </Stack> */}
        </form>
    </div>
  )
}

export default Login