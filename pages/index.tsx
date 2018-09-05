


import React from 'react';

class Kello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tunnit: new Date().getHours() + this.props.aikavyohyke - 2,
      minuutit: new Date().getMinutes(),
      sekunnit: new Date().getSeconds()
    };
  }

  componentDidMount() {
    //this.timer = setInterval(self.tick.bind(this), 1000);

    this.timer = setInterval(() => {

      this.setState({
        tunnit: new Date().getHours() + this.props.aikavyohyke - 2,
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


export default () =>
  <div>
    <Kello aikavyohyke={-3} />
    <Kello aikavyohyke={-2} />
    <Kello aikavyohyke={-1} />
    <Kello aikavyohyke={0} />
    <Kello aikavyohyke={1} />
    <Kello aikavyohyke={2} />
    <Kello aikavyohyke={3} />
    <Kello aikavyohyke={4} />
  </div>
