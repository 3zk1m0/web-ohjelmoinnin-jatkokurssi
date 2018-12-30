import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import { equipments, users, loans } from '../data';
import { tmpdir } from 'os';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open: false,
            email: '',
            password: '',
            incorrect: false
        };
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
}
  handleClickOpen = () => {
    this.setState({ open: true });
    console.log(localStorage.getItem('loggedUserId'))
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.onClick();
  };

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleChangePassword(event) {
   
    this.setState({password: event.target.value});
  }

  handleLogin = () => {
    console.log(this.state)
    
    for (let userObject of users) {
      if(userObject.email == this.state.email && userObject.password == this.state.password){
        console.log("Logged in")
        window.localStorage.setItem('loggedUserId', userObject.id);
        this.setState({ open: false });
      } else{
          console.log("Incorrect");
          this.setState({incorrect: true})
      }
          
      }

    
    
  }

  render() {

    let incorrect;

    if(this.state.incorrect){
      incorrect = <div>Incorect email or password</div>
    }




    return (
      <div>
        <Button onClick={this.handleClickOpen}>Login</Button>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Login"}
          </DialogTitle>
          <DialogContent>
            {incorrect}
            <div>
                Email
                <input type="text" value={this.state.email} onChange={this.handleChangeEmail} />
            </div>
            <div>
                Password
                <input type="password" value={this.state.password} onChange={this.handleChangePassword} />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleLogin} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogSlide;