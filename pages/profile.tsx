
import React from 'react';

import Appbar from "../src/components/Appbar"

import ProfileEdit from '../src/components/EditProfile';


const placeolder = () => {

  return(
  <div>
    <ProfileEdit/>
  </div>)
  }

export default () =>
  <div>
    <Appbar content={placeolder}/>

  </div>