import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useScrollTrigger,
  Zoom,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Wrapper } from './MenuBar.styles';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from 'react-router-dom';

type Props = {
  window?: () => Window
  children: React.ReactElement
}

const MenuBar = (props: Props) => {
  const [ anchorEl, setAnchorEl ] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate()

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function ScrollTop(props: Props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
                                       target: window ? window() : undefined,
                                       disableHysteresis: true,
                                       threshold: 100,
                                     });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const anchor = (
        (event.target as HTMLDivElement).ownerDocument || document
      ).querySelector('#back-to-top-anchor');

      if (anchor) {
        anchor.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center',
                              });
      }
    };

    return (
      <Zoom in={trigger}>
        <Box
          onClick={handleClick} role='presentation' sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          {children}
        </Box>
      </Zoom>
    );
  }

  return (
    <Wrapper sx={{ flexGrow: 1 }}>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }} onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id='menu-appbar' anchorEl={anchorEl} anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }} keepMounted transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }} open={Boolean(anchorEl)} onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
          <Button onClick={()=> navigate('/home')}>
            <Typography color='primary' variant='h6' component='div' sx={{ flexGrow: 1 }}>
              AOC-Tracker
            </Typography>
          </Button>
          {/*<Button color="inherit">Login</Button>*/}
        </Toolbar>
      </AppBar>
      <Toolbar id='back-to-top-anchor' />
      {props.children}
      <ScrollTop {...props}>
        <Fab color='primary' size='small' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Wrapper>

  );
};
export default MenuBar;