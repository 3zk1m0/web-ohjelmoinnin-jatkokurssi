import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircleOutline';
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

  const roles = [
    {
      value: 'admin',
      label: 'Admin',
    },
    {
      value: 'user',
      label: 'User',
    },
  ];
  

class EditDialog extends React.Component {
  state = {
    open: false,
    name: '',
    email: '',
    role: 'user',
    password: '',
  };



  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleConfirm = () => {
    this.setState({ open: false });
    const data = {
      name: this.state.name,
      email: this.state.email,
      role: this.state.role,
      password: this.state.password,
    }
    

    fetch('http://api.websyksy2018-30.course.tamk.cloud:9000/api/v1/loansystem/users', { 
        method: 'POST', 
        headers: new Headers({
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`, 
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
      }).then(result => result.json()
      ).then(data => this.props.addUser(data))
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
        <Tooltip title="Add User">
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"
                            aria-haspopup="true"
                            onClick={this.handleClickOpen}>
                              <AddIcon/>
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">ADD</DialogTitle>
          <DialogContent>
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
              id="password"
              label="Password"
              value={this.state.password}
              onChange={this.handleChange('password')}
              fullWidth
            />

            <TextField
              id="filled-select-currency-native"
              select
              label="Role"
              className={classes.textField}
              value={this.state.role}
              onChange={this.handleChange('role')}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Please select role"
              margin="normal"
              variant="filled"
              InputLabelProps={{
                shrink: true,
              }}
            >
              {roles.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleConfirm} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(EditDialog);