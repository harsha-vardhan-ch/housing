import React from 'react'
import {useList } from '@pankod/refine-core'

import { PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
  TopAgent
} from '../components/components_index'

import { Typography, Box, Stack } from '@pankod/refine-mui'

const home = () => {
  return (
    <Box>
      

      <Typography fontSize={25} fontWeight={700} color="#11142D">

      </Typography>
      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart title="Properties for sale" value={684} series={[75,25]} colors={['#475be8','#e4e8ef']}/>
        <PieChart title="Properties for Rent" value={498} series={[60,40]} colors={['#475be8','#e4e8ef']}/>
        <PieChart title="Total Customers" value={5684} series={[54,46]} colors={['#475be8','#e4e8ef']}/>
        <PieChart title="Properties for Cities" value={555} series={[79,21]} colors={['#475be8','#e4e8ef']}/>

       
      </Box>
      </Box>
  )
}

export default home