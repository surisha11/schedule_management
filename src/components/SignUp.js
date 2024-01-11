import { Button, TextField, Paper, Stack, Typography, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react';
import db from '../firebase';
import { useNavigate } from 'react-router-dom';
import ReplyTwoToneIcon from '@mui/icons-material/ReplyTwoTone';
import { useDispatch } from 'react-redux';
import { check } from '../slice';


function SignUp() {

    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [rePassWord, setRePassword] = useState('');
    const [email, setEmail] = useState('');
    const [checkDatabase, setCheckDatabase] = useState([]);
    const [disabled, setDisabled] = useState('');
    const [eHelp, seteHelp] = useState('');
    const [uNameHelp, setUNameHelp] = useState('');
    const [pHelp, setPHelp] = useState('');
    const [rePHelp, setRePHelp] = useState('');
    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        db.collection('UsersName').onSnapshot((snapshot) => {
        setCheckDatabase(snapshot.docs.map(doc => ({Username: doc.data().UserName, Email: doc.data().Email})));
        })
    }, [])

    const signUp = (newEvent) => {

        newEvent.preventDefault(); //will stop form refresh

        if(userName !== '' && passWord !== '' && rePassWord !== '' && email !== '' ){
            if(eHelp === '' && uNameHelp === '' && pHelp === '' && rePHelp === ''){
                db.collection('UsersName').add({
                    UserName : userName,
                    PassWord : passWord,
                    Email : email
                }) //add new user to the already existing user list
                setUserName("");
                setPassWord(''); //clear the TextField field after clicking SignUp
                setRePassword('');
                setEmail('');
                setDisabled('');
                dispatch(check(userName));
                navigateTo('/home');
            }
        }
        else {
            setDisabled("Fill the form correctly");
        }
    }

    const checkUName = (ch) => {
        const uName = ch.target.value;

        if(uName === '')
            setUNameHelp("User name is required");
        else if(uName.length <= 3)
            setUNameHelp("User name must atlest contain 4 characters")
        else{
            checkDatabase.map(name => {
                if(uName === name.Username){
                    setUNameHelp('User name already exist')
                    return false;
                }
                else{
                    setUNameHelp('')
                    return true;
                }
            } ) ;
        }
        setUserName(uName);
    }

    const checkEmail = (val) => {
        const value = val.target.value;
        const index = val.target.value.indexOf('@gmail.com');
        if(val.target.value === '')
            seteHelp("Email is required");
        else if(index === -1 && value.slice(index, value.length) !== '@gmail.com' )
            seteHelp("Email must be in the format of ``example@gmail.com``")
        else{
            checkDatabase.map(email => {
                if(value === email.Email){
                    seteHelp('This Email is already registered. Please try another email or Login')
                    return false;
                }
                else{
                    seteHelp('');
                    return true;
                }
            })
        }
        setEmail(val.target.value);
    }

    const checkPassWord = (val) => {
        if(val.target.value === '')
            setPHelp("Password is required");
        else if(val.target.value.length <= 3){
            setPHelp("Password must atlest contain 4 characters");
            setRePHelp("Password must match the above password");
        }
        else
            setPHelp('');
        setPassWord(val.target.value);
    }

    const checkRePassWord = (val) => {
        if(val.target.value !== passWord )
            setRePHelp("Password must match the above password")
        else 
            setRePHelp("");
        setRePassword(val.target.value);
    }

  return (
    <div style={{backgroundColor: 'black' , height: '100vh'  }} >
        <IconButton onClick={() => navigateTo('/')} sx={{color: 'white'}} >
            <ReplyTwoToneIcon/>
        </IconButton> 
        <Typography variant='h3' style={{textAlign: 'center', color: 'white'}} >SignUp to access Schedule Manager</Typography>
        <form style={{textAlign: 'center'}}>
            <Stack direction="column" justifyContent="center" alignItems="center" >
                <Paper  elevation={10} style={{width: 500, padding: 50, margin: 20, }}  >
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}> 
                        <TextField required label="Enter your Email" id="email" type='email' color={eHelp === '' ? 'primary' : 'error'} value={email} onChange={checkEmail}
                        sx={{width: 300}} helperText={eHelp} autoFocus={true} />
                        <TextField required label="Enter your user name" id="userName" color={uNameHelp === '' ? 'primary' : 'error' } value={userName} onChange={checkUName }
                        sx={{width: 300}} helperText={uNameHelp} />
                        <TextField required label="Enter your password" id="passWord" type= 'password' sx={{width: 300}} color={pHelp === '' ? 'primary' : 'error'} value={passWord}
                        onChange={checkPassWord} helperText={pHelp}  />
                        <TextField required label="Re-enter your password" id="re-passWord" type= 'password' sx={{width: 300}} color={rePHelp === '' ? 'primary' : 'error'} value={rePassWord}
                        onChange={checkRePassWord} helperText={rePHelp}  />
                        <span style={{color: 'red'}} >{disabled}</span>
                        <Button variant="contained"  onClick={signUp}  size='large'>SignUp</Button>     
                    </Stack>
                </Paper>
            </Stack>
        </form>
    </div>
  )
}

export default SignUp;