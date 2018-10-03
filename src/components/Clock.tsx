import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CountryCard from './RemoteCountry'



class Kello extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        tunnit: new Date().getHours(),
        minuutit: new Date().getMinutes(),
        sekunnit: new Date().getSeconds()
      };
    }
  
    componentDidMount() {
      //this.timer = setInterval(self.tick.bind(this), 1000);
  
      this.timer = setInterval(() => {
  
        this.setState({
          tunnit: new Date().getHours(),
          minuutit: new Date().getMinutes(),
          sekunnit: new Date().getSeconds()
        })
        
      }, 1000);
  
    } 
  
    componentWillUnmount() {
      clearInterval(this.timer);
    }
  
  
    render() {
      return <h1>{this.state.tunnit}:{this.state.minuutit}:{this.state.sekunnit}</h1>;
    }
  }
  

  export default () => <Kello/>