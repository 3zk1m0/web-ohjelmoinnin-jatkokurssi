
import React from 'react';

import Grid from '@material-ui/core/Grid';
import Appbar from "../src/components/Appbar"
import RemoteCountry from './components/RemoteCountries'
import Country from './components/Countries'
import Clock from '../src/components/Clock'

export default () =>
  <div>
    <Appbar page="Hima" />
    <Clock/>

  </div>