
import React from 'react';

import Appbar from "../src/components/Appbar"
import Table from '../src/components/Table/equipment/AllEquipmentTable'


const placeolder = () => {
  return(
  <div>
    <Table/>
  </div>)
  }

export default () =>
  <div>
    <Appbar content={placeolder}/>

  </div>