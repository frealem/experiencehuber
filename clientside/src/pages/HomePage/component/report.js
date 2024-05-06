import React, { useEffect, useState } from "react";
import {
  TextField,
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
} from "@mui/material";
import { Close, ExpandCircleDown } from "@mui/icons-material";

const ReportComponent = ({ open,onClose }) => {
  const [searchWord, setSearchWord] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [debouncedSearchWord, setDebouncedSearchWord] = useState("");

  const handleSearchChange = (event) => {
    const newSearchWord = event.target.value;
    setSearchWord(newSearchWord);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearchWord(searchWord);
    }, 300);

    return () => {
      clearTimeout(delay);
    };
  }, [searchWord]);

  useEffect(() => {
    // Perform the search operation here and update the search results
    const results = performSearch(debouncedSearchWord);
    setSearchResults(results);
  }, [debouncedSearchWord]);

  const performSearch = (searchWord) => {
    // Perform the actual search operation here
    // For this example, let's assume we have a list of reports and we filter them based on the search word

    const reports = [
      {
        id: 1,
        title: "Harassment or Personal Attacks",
        detailReport:
          "This behavior goes against the community guidelines of the platform and creates a hostile environment",
      },
      {
        id: 2,
        title: "Hate Speech or Discrimination",
        detailReport:
          "because it contains hate speech and promotes discrimination. The content includes offensive language, slurs, and derogatory remarks targeting a specific race, religion, or ethnicity.",
      },
      {
        id: 3,
        title: "Spam or Scam",
        detailReport:
          "because it contains hate speech and promotes discrimination. The content includes offensive language, slurs, and derogatory remarks targeting a specific race, religion, or ethnicity.",
      },
      {
        id: 4,
        title: "Violent or Graphic Content",
        detailReport:
          " The post includes explicit images, depictions of self-harm, or promotes violence",
      },
      {
        id: 5,
        title: "Fake News or Misinformation",
        detailReport:
          " The content includes misleading or false information about a current event or topic.",
      },
      {
        id: 6,
        title: "Intellectual Property Infringement",
        detailReport:
          " The content includes unauthorized use of copyrighted material, such as images, videos, or written content. It is crucial to respect intellectual property rights and take action against such violations.",
      },
    ];

    const filteredResults = reports.filter((item) =>
      item.title.toLowerCase().includes(searchWord.toLowerCase())
    );

    return filteredResults;
  };

  const theme = useTheme();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleSearchIconClick = () => {
    setIsSearchModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsSearchModalOpen(false);
  };
  const ModalContent = styled(Box)({
    borderRadius: "8px",
    padding: "16px",
    maxWidth: "500px",
    width: "90%",
  });
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
              <IconButton aria-label="close" onClick={handleCloseModal}>
                <Close />
              </IconButton>
            </Box>
          </Box>
          <Box display="flex" gap={5} mt={5}>
            <TextField
              placeholder="searching ..."
              value={searchWord}
              fullWidth
              onChange={handleSearchChange}
              sx={{
                borderWidth: 0,
                borderColor: "white",
                mb: "10px",
                justifyContent: "flex-start",
              }}
            />
            <Button
              justifyContent="flex-end"
              sx={{
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                height: "50px",
              }}
            >
              Report
            </Button>
          </Box>
          {searchResults.map((report) => (
            <Accordion key={report.id}>
              <AccordionSummary expandIcon={<ExpandCircleDown />}>
                <Typography>{report.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{report.detailReport}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReportComponent;
