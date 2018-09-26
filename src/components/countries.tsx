import React from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CountryCard from './Country'

const maat = [
  {"ID":"1067","name":"China","population":"1359821466","percentage":"19,66%","position":"1"},
  {"ID":"1068","name":"India","population":"1205624727","percentage":"17,43%","position":"2"},
  {"ID":"1069","name":"United States of America","population":"312237216","percentage":"4,51%","position":"3"},
  {"ID":"1070","name":"Indonesia","population":"240676485","percentage":"3,48%","position":"4"},
  {"ID":"1071","name":"Brazil","population":"195210154","percentage":"2,82%","position":"5"},
  {"ID":"1072","name":"Pakistan","population":"173113821","percentage":"2,50%","position":"6"},
  {"ID":"1073","name":"Nigeria","population":"159685249","percentage":"2,31%","position":"7"},
  {"ID":"1074","name":"Bangladesh","population":"151125475","percentage":"2,19%","position":"8"},
  {"ID":"1075","name":"Russian Federation","population":"143615916","percentage":"2,08%","position":"9"},
  {"ID":"1076","name":"Japan","population":"127352833","percentage":"1,84%","position":"10"},
  {"ID":"1077","name":"Mexico","population":"117886404","percentage":"1,70%","position":"11"},
  {"ID":"1078","name":"Philippines","population":"93444322","percentage":"1,35%","position":"12"},
  {"ID":"1079","name":"Viet Nam","population":"89047402","percentage":"1,29%","position":"13"},
  {"ID":"1080","name":"Ethiopia","population":"87095281","percentage":"1,26%","position":"14"},
  {"ID":"1081","name":"Germany","population":"83017404","percentage":"1,20%","position":"15"},
  {"ID":"1082","name":"Egypt","population":"78075705","percentage":"1,13%","position":"16"},
  {"ID":"1083","name":"Iran (Islamic Republic of)","population":"74462314","percentage":"1,08%","position":"17"},
  {"ID":"1084","name":"Turkey","population":"72137546","percentage":"1,04%","position":"18"},
  {"ID":"1085","name":"Thailand","population":"66400698","percentage":"0,96%","position":"19"},
  {"ID":"1086","name":"France","population":"63230866","percentage":"0,91%","position":"20"},
  {"ID":"1087","name":"Democratic Republic of the Congo","population":"62191161","percentage":"0,90%","position":"21"},
  {"ID":"1088","name":"United Kingdom","population":"62066350","percentage":"0,90%","position":"22"},
  {"ID":"1089","name":"Italy","population":"60508978","percentage":"0,87%","position":"23"},
  {"ID":"1090","name":"Myanmar","population":"51931231","percentage":"0,75%","position":"24"},
  {"ID":"1091","name":"South Africa","population":"51452352","percentage":"0,74%","position":"25"},
  {"ID":"1092","name":"Republic of Korea","population":"48453931","percentage":"0,70%","position":"26"},
  {"ID":"1093","name":"Colombia","population":"46444798","percentage":"0,67%","position":"27"},
  {"ID":"1094","name":"Spain","population":"46182038","percentage":"0,67%","position":"28"},
  {"ID":"1095","name":"Ukraine","population":"46044304","percentage":"0,67%","position":"29"},
  {"ID":"1096","name":"United Republic of Tanzania","population":"44973330","percentage":"0,65%","position":"30"}
]


class Countries extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {list:[]};

    this.clickHandler = this.clickHandler.bind(this);
    this.clickHandlerDelete = this.clickHandlerDelete.bind(this);

    

  }

  clickHandler(position){

    let index = this.state.list.findIndex( x => x.position == position)
    if(index == -1){
      var tmp = this.state.list;
      tmp.push(maat[position-1]);
      this.setState(tmp)
    }
  }

  clickHandlerDelete(position){

    var tmp = this.state.list;
    let index = this.state.list.findIndex( x => x.position == position)
    tmp.splice(index,1)
    this.setState(tmp)

  }

  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={4}>
        <Paper>
        {maat.map(function(maa) {
                      return  <CountryCard key={maa.position}  maa={maa} onClick={this.clickHandler}/>;
                    },this)}
        </Paper>
        </Grid>
        <Grid item xs={4}>
        <Paper>
          {this.state.list.map(function(maa) {
                          return  <CountryCard key={maa.position}  maa={maa} onClick={this.clickHandlerDelete}/>;
                        },this)}
        </Paper>
        </Grid>
        </Grid>
  );
  }
}

export default Countries;