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

import auth from '../../../const';

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
    name: this.props.data.deviceName,
    email: this.props.data.deviceInfo,
    role: this.props.data.loantime,
  };



  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleConfirm = () => {
    this.setState({ open: false });
    const data = {
      id: this.props.data.id,
      name: this.state.deviceName,
      email: this.state.deviceInfo,
      role: this.state.loantime,
    }
    this.props.handleEdit(data);

    fetch('http://localhost:9000/api/v1/loansystem/devices/' + data.id, { 
        method: 'PATCH', 
        headers: new Headers({
          'Authorization': auth, 
          'Content-Type': 'application/json'
        }),
        body: `[
          {"op": "replace", "path": "/deviceName", "value": "${data.deviceName}"},
          {"op": "replace", "path": "/deviceInfo", "value": "${data.deviceInfo}"},
          {"op": "replace", "path": "/loantime", "value": "${data.loantime}"}
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
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"
                          aria-haspopup="true"
                          onClick={this.handleClickOpen}>
                            <EditIcon/>
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">EDIT</DialogTitle>
          <DialogContent>
            <DialogContentText>
              id: {this.props.data.id}
            </DialogContentText>
            <TextField
              margin="dense"
              id="deviceName"
              label="Name"
              value={this.state.deviceName}
              onChange={this.handleChange('deviceName')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="deviceInfo"
              label="Info"
              value={this.state.deviceInfo}
              onChange={this.handleChange('deviceInfo')}
              fullWidth
            />
            <TextField
              id="filled-number"
              label="Number"
              value={this.state.loantime}
              onChange={this.handleChange('loantime')}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              variant="filled"
            />
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