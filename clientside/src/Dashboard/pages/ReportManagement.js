import { Box, Button, Collapse, IconButton, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TitleTwoLine from '../../components/titleTwoLine';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getReportApi } from '../../components/States/adminIntegration/systemApi';
import {format} from 'date-fns'
import { getPostApi } from '../../components/States/postIntegration/postApi';
import { getOneCommunityGuidLineApi } from '../../components/States/adminIntegration/guidlineApi';
import ExpandableRow from '../component/expandReport';
import axiosInstance from '../../components/States/interceptor';
import {toast} from 'react-toastify';

const report = [
  {
    id: 1,
    reportTitle: "fromadmin.com",
    detail:
      "This message is from experienceHub.com report issue. This message is from experienceHub.com report issue. This message is from experienceHub.com report issue. This message is from experienceHub.com report issue.",
    date: "12:47 am Dec 30, 2024",
    violatedGuidelines: "Hate speech, Harassment"
  },
  {
    id: 2,
    reportTitle: "example.com",
    detail:
      "This message is from example.com report issue. This message is from example.com report issue. This message is from example.com report issue. This message is from example.com report issue.",
    date: "1:30 pm Jan 5, 2025",
    violatedGuidelines: "Spam, Impersonation"
  },
  {
    id: 3,
    reportTitle: "testsite.com",
    detail:
      "This message is from testsite.com report issue. This message is from testsite.com report issue. This message is from testsite.com report issue. This message is from testsite.com report issue.",
    date: "10:15 am Feb 15, 2025",
    violatedGuidelines: "Copyright infringement, Misinformation"
  },
  {
    id: 10,
    reportTitle: "example2.com",
    detail:
      "This message is from example2.com report issue. This message is from example2.com report issue. This message is from example2.com report issue. This message is from example2.com report issue.",
    date: "6:20 pm Mar 22, 2025",
    violatedGuidelines: "Nudity, Violence"
  },
];

const ReportManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedOption, setSelectedOption] = useState('');
  const [expandedRow, setExpandedRow] = useState(null);
  const [reports, setReports] = useState([])
  const [post, setPost] = useState(null);
  const [guideline, setGuideline] = useState(null)
  const [expanded, setExpanded] = useState(false)

const handleDelete= async(id)=>{
  try {
    const {status, data} = await axiosInstance.delete(`/admin/deletepost/${id}`);
    // if(status !== 200){
    //   throw new Error()
    // }
    setExpanded(false)
  } catch (error) {
    toast.error('error while deleting post')
  }
}
const handleBlock=()=>{}
  useEffect(()=>{
    const getReport = async () =>{
      const a = await getReportApi();
      setReports(a)
    };
    getReport();
  },[])

  useEffect(() => {
    const getPostAndGuideline = async () => {
      console.log(expandedRow)
      const postData = await getPostApi(expandedRow.postId);
      setPost(postData);

      const guidelineData = await getOneCommunityGuidLineApi(expandedRow.reportCase);
      setGuideline(guidelineData);
    };

    if (expanded) {
      getPostAndGuideline();
    }
  }, [expanded]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleRowExpand = (report) => {
    setExpandedRow((prevExpandedRow) => {
      if(prevExpandedRow?._id === report._id){
        setExpanded(false)
        return null
      }
      setExpanded(true)
      return report
    });
  };
return (
    <Box mt={10} marginLeft={!isMobile ? "300px" : "10px"} marginRight={isMobile ? "10px" : null}>
      <Typography color={theme.palette.secondary.main} fontSize={18} mb={2}>Report Management</Typography>
      <Box>
        <Box>
          <TableContainer component="div" style={{ width: isMobile ? "100%" : "900px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography fontWeight={600}>Reported Posts</Typography></TableCell>
                  <TableCell><Typography fontWeight={600}>Report Type</Typography></TableCell>
                  <TableCell><Typography fontWeight={600}>Report detail</Typography></TableCell>
                  <TableCell><Typography fontWeight={600}>Status</Typography></TableCell>
                  <TableCell><Typography fontWeight={600}>Time</Typography></TableCell>
                  <TableCell><Typography fontWeight={600}>Action</Typography></TableCell>
                
                </TableRow>
              </TableHead>
              <TableBody>
                {
                reports.map((reported) => (
                   <React.Fragment key={reported._id}>
                    <TableRow>
                      <TableCell>postid{reported?.postId}</TableCell>
                      <TableCell>{reported?.reportCase}</TableCell>
                      <TableCell>{reported?.reportDetail}</TableCell>
                      <TableCell>
                        <Select value={selectedOption} onChange={handleOptionChange} displayEmpty
                          renderValue={(value) => (value === '' ? 'Unread' : value) } defaultValue={reported.status}>
                          <MenuItem value="" disabled>
                            Select a status
                          </MenuItem>
                          <MenuItem value="2">Fixed</MenuItem>
                          <MenuItem value="1">Onprocess</MenuItem>
                          <MenuItem value="0">Unread</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell>{format(reported.createdAt, 'MMM d yyy')}</TableCell>
                      <TableCell>
        <IconButton onClick={() => handleRowExpand(reported)}>
          <ExpandMoreIcon />
        </IconButton>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell colSpan={5}>
        <ExpandableRow
          post={post}
          guidline={guideline}
          expanded={expandedRow?._id === reported._id}
          onDelete={() => handleDelete(reported._id)}
          onBlock={() => handleBlock(reported._id)}
        />
      </TableCell>
                    </TableRow>
                  </React.Fragment>
))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default ReportManagement;
