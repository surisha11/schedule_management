import React from 'react'
import Content from './Content'
import { Grid } from '@mui/material'

function Body() {

  return (
    <Grid container  gap={10} style={{position: 'absolute', top: 100}}  >
      <Grid item xs={5.5} style={{padding: 30}} >
        <Content  button='Show' heading='Schedules' navigateTo='/ToDoList'
        content='To view the todo that you added to the todo list click show' />
      </Grid>
      <Grid item xs={5.5} style={{padding: 30}} >
        <Content button='Show' heading='Calender'  
        content='To view your schedules in a calender format' />
      </Grid>
    </Grid>
  )
}

export default Body