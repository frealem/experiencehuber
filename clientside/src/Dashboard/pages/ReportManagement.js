import { Box, Menu, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import TitleTwoLine from '../../components/titleTwoLine';

const report = [
  {
    id: 1,
    reportTitle: "fromadmin.com",
    detail:
      "This message is from experienceHub.com report issue. This message is from experienceHub.com report issue. This message is from experienceHub.com report issue. This message is from experienceHub.com report issue.",
    date: "12:47 am Dec 30, 2024",
  },
  {
    id: 2,
    reportTitle: "example.com",
    detail:
      "This message is from example.com report issue. This message is from example.com report issue. This message is from example.com report issue. This message is from example.com report issue.",
    date: "1:30 pm Jan 5, 2025",
  },
  {
    id: 3,
    reportTitle: "testsite.com",
    detail:
      "This message is from testsite.com report issue. This message is from testsite.com report issue. This message is from testsite.com report issue. This message is from testsite.com report issue.",
    date: "10:15 am Feb 15, 2025",
  },
  // Add more data objects here
  {
    id: 10,
    reportTitle: "example2.com",
    detail:
      "This message is from example2.com report issue. This message is from example2.com report issue. This message is from example2.com report issue. This message is from example2.com report issue.",
    date: "6:20 pm Mar 22, 2025",
  },
];

const ReportManagement = () => {
  const theme=useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <Box mt={10}
    marginLeft={!isMobile ? "300px" : "10px"}
    marginRight={isMobile ? "10px" : null} >
     <Typography  color={theme.palette.secondary.main} fontSize={18} mb={2}>Report Management</Typography>
    <Box>
      <Box>
      <TableContainer component="div" style={{width:isMobile?"100%":"900px"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight={600}>Reported Posts</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Report Type</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Status</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Time</Typography></TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
          {report.map((reported)=>(
            <TableRow key={reported.id}>
            <TableCell>postid1234567890</TableCell>
            <TableCell>{reported.reportTitle}</TableCell>
            <TableCell><Select value={selectedOption} onChange={handleOptionChange}  displayEmpty
      renderValue={(value) => (value === '' ? 'Unread' : value)}>
            <MenuItem value="" disabled>
          Select a status
        </MenuItem>
      <MenuItem value="option1">Fixed</MenuItem>
      <MenuItem value="option2">Onprocess</MenuItem>
      <MenuItem value="option3">Unread</MenuItem>
    </Select></TableCell>
            <TableCell>{reported.date}</TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
        </TableContainer>
      </Box>
    </Box></Box>
  )
}

export default ReportManagement