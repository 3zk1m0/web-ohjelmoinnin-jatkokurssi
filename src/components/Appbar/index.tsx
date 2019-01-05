import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemText from '@material-ui/core/ListItemText';

import Link from 'next/link'
import jwt from 'jwt-decode';

import GroupIcon from '@material-ui/icons/Group';
import DevicesIcon from '@material-ui/icons/DevicesOther';
import HomeIcon from '@material-ui/icons/Home';

import LoginPaper from '../LoginPaper'
import fetch from 'node-fetch';

const drawerWidth = 200;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});


class AppMenu extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        anchorEl: null,
        loggedRole: '',
        token: '',
        name: '',
      };
      this.handleClose = this.handleClose.bind(this)
  }
  
  componentDidMount(){

    this.setState({token: localStorage.getItem('token') || '', loggedRole: localStorage.getItem('loggedRole') || '', name: localStorage.getItem('name') || ''})
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    localStorage.setItem('token', '');
    localStorage.setItem('loggedRole', '');
    localStorage.setItem('name', '');

    this.setState({ anchorEl: null, loggedRole: '', token: '', name: ''});
  };

  changeRole = (loggedRole, token) => {
    console.log(loggedRole);
    localStorage.setItem('token', token);
    localStorage.setItem('loggedRole', loggedRole);
    this.setState({loggedRole});
  } 

  render(){
    const { classes } = this.props;
    const { anchorEl } = this.state;

    let menuList;
    
    if (this.state.loggedRole != ''){
      menuList = <div>
        <Link href='/profile'>
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
        </Link>
        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
      </div>
    } else {
      menuList = <div>
        <LoginPaper onClick={this.handleClose} changeRole={this.changeRole}/>
      </div>
    }

    let Lista;
    console.log(this.state.loggedRole);
    if (this.state.loggedRole === 'admin') {
      Lista = <div>
                <Link href='/'>
                  <ListItem button key={'home'}>
                      <HomeIcon/>
                      <ListItemText primary={'Home'} />
                    </ListItem>
                </Link>
                <Link href='/equipments'>
                  <ListItem button key={'Equipment'}>
                      <DevicesIcon/>
                      <ListItemText primary={'Equipment'} />
                    </ListItem>
                </Link>
                <Link href='/users'>
                  <ListItem button key={'Users'} >
                    <GroupIcon/>
                    <ListItemText primary={'Users'} />
                  </ListItem>
                </Link>
                <Link href='/loans'>
                  <ListItem button key={'Loans'}>
                    <GroupIcon/>
                    <ListItemText primary={'Loans'} />
                  </ListItem>
                </Link>
            </div>
    } else if (this.state.loggedRole === 'user') {
      Lista = <div>
              <Link href='/'>
                <ListItem button key={'home'}>
                    <HomeIcon/>
                    <ListItemText primary={'Home'} />
                  </ListItem>
              </Link>
              <Link href='/equipments'>
                <ListItem button key={'Equipment'}>
                    <DevicesIcon/>
                    <ListItemText primary={'Equipment'} />
                  </ListItem>
              </Link>
            </div>
    } else {
      Lista = <div>
                <Link href='/'>
                  <ListItem button key={'home'}>
                      <HomeIcon/>
                      <ListItemText primary={'Home'} />
                    </ListItem>
                </Link>
            </div>
    }

    

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography color="inherit" noWrap>
              Varaus järjestelmä
            </Typography>
            <div className={classes.grow} />
            {this.state.name}
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}>
              <AccountCircleIcon/>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              {menuList}
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>
            {Lista}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.content()}
      </main>

        
      </div>
    );
  }
}
AppMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(AppMenu);