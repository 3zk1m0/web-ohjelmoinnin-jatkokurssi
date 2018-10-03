import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CountryCard from './RemoteCountry'



class Countries extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {list:[], lista:[]};

    this.clickHandler = this.clickHandler.bind(this);
    this.clickHandlerDelete = this.clickHandlerDelete.bind(this);

    

  }

  componentDidMount(){
    this.UpdateList()
  }

  UpdateList(){
    fetch("https://restcountries.eu/rest/v2/all").then((response) => {
            //console.log(response)
            if (!response.ok) {
                throw Error(response.statusText);
              }
              // Read the response as json.
              return response.json();
            
        }).then((resp) => {

            this.setState({lista: resp})
            //console.log(this.state.lista)
        });
  }


  
  clickHandler(numericCode){
    //console.log(numericCode)
    let index = this.state.list.findIndex( x => x.numericCode == numericCode)
    if(index == -1){
      var tmp = this.state.list;
      let index2 = this.state.lista.findIndex( x => x.numericCode == numericCode)
      //console.log(index2)
      tmp.push(this.state.lista[index2]);
      this.setState(tmp)
    }
  }

  clickHandlerDelete(numericCode){

    var tmp = this.state.list;
    let index = this.state.list.findIndex( x => x.numericCode == numericCode)
    tmp.splice(index,1)
    this.setState(tmp)

  }

  render() {
    return (
      <Grid container spacing={8}>
        <Grid item xs={6}>
        <Paper>
          {this.state.list.map(function(maa) {
                          return  <CountryCard key={1}  maa={maa} onClick={this.clickHandlerDelete}/>;
                        },this)}
        </Paper>
        </Grid>
        <Grid item xs={6}>
        <Paper>
        {this.state.lista.map(function(maa) {
                      return  <CountryCard key={maa.numericCode}  maa={maa} onClick={this.clickHandler}/>;
                    },this)}
        </Paper>
        </Grid>
        
        </Grid>
  );
  }
}

export default Countries;
