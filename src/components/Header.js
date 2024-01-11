import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Header(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigateTo = useNavigate();

  return (
    <div sx={{ flexGrow: 1 }} > 
      <AppBar >
        <Toolbar>
          <IconButton onClick={() => navigateTo(props.to)} disabled={props.disable} size="large" edge="start"
          color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            {props.symbol}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.title}
          </Typography>
          <div>
            <Button id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}
            onClick={handleClick} color="inherit" >
              More
            </Button>
            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}
            MenuListProps={{ 'aria-labelledby': 'basic-button', }} >
              {props.menuItem.map((item, index) => (
                <MenuItem key={index} onClick={() => {
                  setAnchorEl(null);
                  navigateTo(item.navigate)
                }}>
                  {item.item}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}