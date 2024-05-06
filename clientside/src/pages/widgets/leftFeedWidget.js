import React from 'react'
import AdvertWidget from './advertWidget'
import HighRateWidget from './highRateWidget'
import { adverts, highRate } from '../../fakeData'
import { Box, Divider } from '@mui/material'

const LeftFeedWidget = () => {
  return (
    <><Box mb={3} >
    <AdvertWidget/>
    </Box>
    <Box mt={3}>
    <HighRateWidget/>
    </Box>
        </>
  )
}

export default LeftFeedWidget