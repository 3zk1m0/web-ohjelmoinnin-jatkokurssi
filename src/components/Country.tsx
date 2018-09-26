import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import TouchRipple from 'material-ui/internal/TouchRipple';

const styles = {
  card: {
    minWidth: 275,
  },
  title: {
    marginBottom: 7,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function CountryCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card} onClick={() => props.onClick(props.maa.position) }>

      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          {props.maa.ID}
        </Typography>
        <Typography variant="headline" component="h2">
          {props.maa.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Population: {props.maa.population}{"  "}
          Percentage: {props.maa.percentage}
        </Typography>
      </CardContent>
    </Card>
  );
}



export default withStyles(styles)(CountryCard);
