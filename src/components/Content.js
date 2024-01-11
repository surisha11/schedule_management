import { Button, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Content(props) {

    const navigator = useNavigate();

    return (
        <Paper elevation={10} style={{ textAlign: 'center', color: 'light', lineHeight: '60px' }} >
            <Typography variant="h5" component="div" style={{padding: 10 }}  >
                {props.heading}
            </Typography>
            <Typography variant="body2" >
                {props.content}
            </Typography>
            <Button onClick={() => navigator(props.navigateTo) } >
                {props.button}
            </Button>
        </Paper>
    );
}