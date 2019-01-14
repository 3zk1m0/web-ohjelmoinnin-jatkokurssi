import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import InputAdornment from '@material-ui/core/InputAdornment';
import classNames from 'classnames';


const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
    },
    table: {
      minWidth: 1020,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    margin: {
      margin: theme.spacing.unit,
    },
    textField: {
      flexBasis: 200,
    },
  });
  

class EditDialog extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

componentDidMount = () => {
  fetch('http://api.websyksy2018-30.course.tamk.cloud:9000/api/v1/loansystem/ownuser', { 
    method: 'GET', 
    headers: new Headers({
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`, 
      'Content-Type': 'application/json'
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    this.setState({name: data.name, email: data.email })
  })
}


  handleConfirm = () => {
    this.setState({ open: false });
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    }

    fetch('http://api.websyksy2018-30.course.tamk.cloud:9000/api/v1/loansystem/ownuser', { 
        method: 'PATCH', 
        headers: new Headers({
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`, 
          'Content-Type': 'application/json'
        }),
        body: `[
          {"op": "replace", "path": "/name", "value": "${data.name}"},
          {"op": "replace", "path": "/email", "value": "${data.email}"}
        ]`
      })
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        
            <TextField
              margin="dense"
              id="name"
              label="Name"
              value={this.state.name}
              onChange={this.handleChange('name')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="email"
              label="Email"
              value={this.state.email}
              onChange={this.handleChange('email')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="passowrd"
              label="New Password"
              type='password'
              value={this.state.password}
              onChange={this.handleChange('password')}
              fullWidth
            />
            
            <Button onClick={this.handleConfirm} color="primary">
              Save
            </Button>
      </div>
    );
  }
}

export default withStyles(styles)(EditDialog);