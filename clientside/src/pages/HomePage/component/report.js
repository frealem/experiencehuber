import React, { useEffect, useRef, useState } from "react";
import {
Accordion,
AccordionSummary,
AccordionDetails,
Typography,
Modal,
IconButton,
Box,
useTheme,
styled,
Button,
Checkbox,
FormControlLabel,
TextField
} from "@mui/material";
import {useNavigate } from "react-router-dom";
import { Close, ExpandCircleDown } from "@mui/icons-material";
import { getCommunityGuidLineApi } from "../../../components/States/adminIntegration/guidlineApi";
import { createReportApi } from "../../../components/States/adminIntegration/systemApi";
import { toast } from 'react-toastify';

const ReportComponent = ({ open, onClose, post }) => {
const [selectedReports, setSelectedReports] = useState('');
const [content, setContent ] = useState('')
const navigate=useNavigate();
const [guidelines, setGuidelines] = useState([]);
const inputRef = useRef(null)
//const reports = [
// {
// id: 1,
// title: "Harassment or Personal Attacks",
// detailReport:
// "This behavior goes against the community guidelines of the platform and creates a hostile environment",
// },
// {
// id: 2,
// title: "Hate Speech or Discrimination",
// detailReport:
// "because it contains hate speech and promotes discrimination. The content includes offensive language, slurs, and derogatory remarks targeting a specific race, religion, or ethnicity.",
// },
// {
// id: 3,
// title: "Spam or Scam",
// detailReport:
// "because it contains hate speech and promotes discrimination. The content includes offensive language, slurs, and derogatory remarks targeting a specific race, religion, or ethnicity.",
// },
// {
// id: 4,
// title: "Violent or Graphic Content",
// detailReport:
// " The post includes explicit images, depictions of self-harm, or promotes violence",
// },
// {
// id: 5,
// title: "Fake News or Misinformation",
// detailReport:
// " The content includes misleading or false information about a current event or topic.",
// },
// {
// id: 6,
// title: "Intellectual Property Infringement",
// detailReport:
// " The content includes unauthorized use of copyrighted material, such as images, videos, or written content. It is crucial to respect intellectual property rights and take action against such violations.",
// },
// ];

useEffect(()=>{
  const getGuidelines = async() => {
    const data = await getCommunityGuidLineApi();
    setGuidelines(data)
  }
  getGuidelines()
},[])

const theme = useTheme();
const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

const handleCloseModal = () => {
setIsSearchModalOpen(false);
};

const handleReportCheckboxChange = (reportId) => {
if (selectedReports === reportId ) {
setSelectedReports('');
} else {
setSelectedReports(reportId);
}
};

const handleSubmit = async() => {
// Pass the selectedReports to the backend
console.log("Selected reports:", selectedReports);
const report = {
  postId:post._id,
  reportCase: selectedReports,
}
const reportCreated = await createReportApi(report) 
if(reportCreated){
  toast.error('report has been submitted')
}
navigate('/')
};

const ModalContent = styled(Box)({
borderRadius: "8px",
padding: "16px",
maxWidth: "500px",
width: "90%",
});

const handleChange = (e) => {
  setContent(e.target.value);
};

return (
<>
<Modal
open={open}
onClose={onClose}
sx={{
display: "flex",
justifyContent: "center",
}}
>
<ModalContent
sx={{
backgroundColor: theme.palette.background.default,
color: theme.palette.secondary[100],
}}
>
<Box display="flex" justifyContent="space-between">
<Box>
<Typography fontWeight={600} color="red">
Report On This Post
</Typography>
</Box>
<Box display="flex" justifyContent="flex-end">
<IconButton aria-label="close" onClick={onClose}>
<Close />
</IconButton>
</Box>
</Box>
{guidelines?.map((report) => (
<Accordion key={report.id}>
<AccordionSummary expandIcon={<ExpandCircleDown />}>
<FormControlLabel
control={
<Checkbox
color="secondary"
checked={selectedReports === report._id}
onChange={() => handleReportCheckboxChange(report._id)}
/>
}
label={report.reportCase}
/>
</AccordionSummary>
<AccordionDetails>
<Typography>{report.description}</Typography>
</AccordionDetails>
</Accordion>
))}
<Box mt={2} display="flex" justifyContent="flex-end">
<Button
onClick={handleSubmit}
variant="contained"
color="primary"
sx={{
backgroundColor: theme.palette.background.alt,
color: theme.palette.secondary[100],
height: "50px",
}}
>
Report
</Button>
</Box>
</ModalContent>
</Modal>
</>
);
};

export default ReportComponent;