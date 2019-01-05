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
    open: false,
    scroll: 'paper',
    data: {},
    users: [],
    admins: [],
    devices: [],
  };



  handleClickOpen = () => {

    fetch('http://localhost:9000/api/v1/loansystem/loans/' + this.props.data.id, { 
        method: 'GET', 
        headers: new Headers({
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`, 
          'Content-Type': 'application/json'
        })
      })
      .then(response => response.json())
      .then(response => {
        let data = response;
        data.dueDate = data.dueDate.split('T')[0]
        data.loaningTime = data.loaningTime.slice(0,-1)
        data.returnTime = data.returnTime.slice(0,-1)
        this.setState({data})
      })
      fetch('http://localhost:9000/api/v1/loansystem/devices', { 
        method: 'GET', 
        headers: new Headers({
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`, 
          'Content-Type': 'application/json'
        })
      })
      .then(response => response.json())
      .then(deviceList => {

        let devices = deviceList.map(x => {return {value: x.id, label: x.deviceName}})
        this.setState({devices});
      })
    
    fetch('http://localhost:9000/api/v1/loansystem/users', { 
      method: 'GET', 
      headers: new Headers({
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`, 
        'Content-Type': 'application/json'
      })
    })
    .then(response => response.json())
    .then(usersList => {
      let users = usersList.filter(user => user.role === 'user');
      let admins = usersList.filter(user => user.role === 'admin');

      users = users.map(x => {return {value: x.id, label: x.name}})
      admins = admins.map(x => {return {value: x.id, label: x.name}})
      this.setState({users, admins});
    })

    this.setState({ open: true});
  };

  handleConfirm = () => {
    this.setState({ open: false });

    

    let body = `[
      {"op": "replace", "path": "/device_id", "value": "${this.state.data.device_id}"},
      {"op": "replace", "path": "/customer_id", "value": "${this.state.data.customer_id}"},
      {"op": "replace", "path": "/loanGiver_id", "value": "${this.state.data.loanGiver_id}"},
      {"op": "replace", "path": "/loaningTime", "value": "${this.state.data.loaningTime}"},
      {"op": "replace", "path": "/loansState", "value": "${this.state.data.loansState}"},
      {"op": "replace", "path": "/dueDate", "value": "${this.state.data.dueDate}"}
      `

    if ( this.state.data.loanReceiver_id !== null 
    && this.state.data.returnState !== null
    && this.state.data.returnTime !== null){
      body += `
        ,{"op": "replace", "path": "/loanReceiver_id", "value": "${this.state.data.loanReceiver_id}"},
        {"op": "replace", "path": "/returnState", "value": "${this.state.data.returnState}"},
        {"op": "replace", "path": "/returnTime", "value": "${this.state.data.returnTime}"}
        `
    }
    body += `]`
    
    fetch('http://localhost:9000/api/v1/loansystem/loans/' + this.state.data.id, { 
        method: 'PATCH', 
        headers: new Headers({
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`, 
          'Content-Type': 'application/json'
        }),
        body: body
      }).then( (result) => result.json())
      .then( (result) => {
        let data = result;
        const users = this.state.users.concat(this.state.admins)

        data.device = this.state.devices[this.state.devices.findIndex(x => x.value === result.device_id)].label
        data.customer = users[users.findIndex(x => x.value === result.customer_id)].label
        data.loanGiver = users[users.findIndex(x => x.value === result.loanGiver_id)].label
        if (typeof data.loanReceiver_id !== 'undefined'){
        data.loanReceiver = users[users.findIndex(x => x.value === result.loanReceiver_id)].label
        }
        this.props.handleEdit(data);
      })
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = prop => event => {
    let data = this.state.data
    data[prop] = event.target.value;
    this.setState({ data });
  };

  handleChangeId = prop => event => {
    let data = this.state.data;
    data[prop + '_id'] = event.target.value;
    this.setState({ data });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"
                          aria-haspopup="true"
                          onClick={this.handleClickOpen}>
                            <EditIcon/>
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          scroll={this.state.scroll}
        >
          <DialogTitle id="form-dialog-title">EDIT</DialogTitle>
          <DialogContent>
            <DialogContentText>
              id: {this.state.data.id}
            </DialogContentText>
            <TextField
              id="filled-select-device"
              select
              label=""
              className={classes.textField}
              value={this.state.data.device_id}
              onChange={this.handleChangeId('device')}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Select Device"
              margin="normal"
              variant="filled"
              fullWidth
            >
            
              {this.state.devices.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <TextField
              id="filled-select-customer"
              select
              label=""
              className={classes.textField}
              value={this.state.data.customer_id}
              onChange={this.handleChangeId('customer')}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Select Customer"
              margin="normal"
              variant="filled"
              fullWidth
            >
            
              {this.state.users.concat(this.state.admins).map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>

            <TextField
              id="dueDate"
              label="DueDate"
              type="date"
              value={this.state.data.dueDate}
              onChange={this.handleChange('dueDate')}
              className={classes.textField}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              id="loaningTime"
              label="Loaning Time"
              type="datetime-local"
              value={this.state.data.loaningTime}
              onChange={this.handleChange('loaningTime')}
              className={classes.textField}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              id="returnTime"
              label="Return Time"
              type="datetime-local"
              value={this.state.data.returnTime}
              onChange={this.handleChange('returnTime')}
              className={classes.textField}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              margin="dense"
              id="loansState"
              label="Loaning State"
              value={this.state.data.loansState}
              onChange={this.handleChange('loansState')}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              margin="dense"
              id="returnState"
              label="Return State"
              value={this.state.data.returnState}
              onChange={this.handleChange('returnState')}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              id="filled-select-loanGiver"
              select
              label=""
              className={classes.textField}
              value={this.state.data.loanGiver_id}
              onChange={this.handleChangeId('loanGiver')}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Select Loan Giver"
              margin="normal"
              variant="filled"
              fullWidth
            >
            
              {this.state.admins.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <TextField
              id="filled-select-loanReceiver"
              select
              label=""
              className={classes.textField}
              value={this.state.data.loanReceiver_id}
              onChange={this.handleChangeId('loanReceiver')}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Select Loans Receiver"
              margin="normal"
              variant="filled"
              fullWidth
            >
            
              {this.state.admins.map(option => (
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