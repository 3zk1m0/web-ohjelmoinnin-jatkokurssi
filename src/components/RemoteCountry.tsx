import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';




const styles = {
  card: {
    minWidth: 275,
  },
  title: {
    marginBottom: 7,
    fontSize: 14,
  },
  pos: {
    marginBottom: 1,
  },
};

function CountryCard(props) {
  const { classes } = props;
    //console.log(props.maa.numericCode)
  return (
    <Card className={classes.card} onClick={() => props.onClick(props.maa.numericCode) }>

      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          {props.maa.numericCode}
        </Typography>
        <Typography variant="headline" component="h2">
          {props.maa.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Population: {props.maa.population}{"  "}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Area: {props.maa.area}
        </Typography>
      </CardContent>
    </Card>
  );
}



export default withStyles(styles)(CountryCard);
