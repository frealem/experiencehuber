
import React from 'react'
import sponsorImage from '../../assets/images/chatapp.jpeg'
import { adverts } from '../../fakeData'
import { Box, Divider, Typography } from '@mui/material'

const AdvertWidget = () => {
  return (
    <Box >
     <Box display="flex" alignItems="center" mb={5}>
        <Divider style={{ flexGrow: 1 }} />
        <Typography variant="body2" style={{ margin: '0 10px' }} fontWeight={600}>
          Sponsored Posts
        </Typography>
        <Divider style={{ flexGrow: 1 }} />
      </Box>
    {adverts.slice(0,4).map(({ id, title, link }) => (
        <div key={id} style={{ display: 'flex', gap: '10px', marginBottom: '10px' ,width:"90%" ,height:"100px" }}>
            <img alt="sponsor board" src={sponsorImage} style={{ width: '120px', height: '90px' ,borderRadius:8}}/>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography fontWeight={600}>{title}</Typography>
            <a href={link}>{link}</a>
            </div>
        </div>
    ))}
</Box>
  )
}

export default AdvertWidget