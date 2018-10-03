
import React from 'react';

import AppLogic from '../src/AppLogic'
import Grid from '@material-ui/core/Grid';
import Appbar from "../src/components/Appbar"
import RemoteCountry from '../src/components/RemoteCountries'
import Country from '../src/components/Countries'


export default () =>
  <div>
    <Appbar page="Countries" />
        <Grid container spacing={24}>
            <Grid item xs={6}>
                <Country/>
            </Grid>
            <Grid item xs={6}>
                <RemoteCountry/>
            </Grid>
        </Grid>

  </div>