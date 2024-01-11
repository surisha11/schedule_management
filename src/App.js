import './App.css';
import React from 'react'
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

function App() { 

  return ( 
    <div className="App" spacing={2} columns={2} style={{height: '100vh' }}  >
      <Grid container height= 'inherit'  >
        <Grid item xs={6} sx={{backgroundColor: 'black' }} >
          <nav>
            <span style={{ lineHeight: '100vh', fontSize: '30px', fontWeight: 'bolder', color: 'white'}} >Already have an Account, Click <Link style={{color: 'white'}}  to={'./login'} >Login</Link>
            </span>
          </nav>
        </Grid>
        <Grid item xs={6} sx={{backgroundColor: 'white' }} >
            <nav>
              <span style={{ lineHeight: '100vh', fontSize: '29px', fontWeight: 'bolder', color: 'black'}} >If you'r new to Schedule Manager, Click <Link style={{color: 'black' }} to={'./signUp'} >SignUp</Link>
              </span>
          </nav>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
  