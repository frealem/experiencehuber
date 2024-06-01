import React, { useEffect, useState } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Modal,
  IconButton,
  Box,
  useTheme,
  styled,
} from "@mui/material";
import { Close, ExpandCircleDown } from "@mui/icons-material";

const SearchComponent = ({ open,onClose }) => {
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
    const searchResults = performSearch(debouncedSearchWord);
    setSearchResults(searchResults);
  }, [debouncedSearchWord]);

  const performSearch = (searchWord) => {
    // Perform the actual search operation here
    // For this example, let's assume we have a list of items and we filter them based on the search word
    const items = [
      "Apple",
      "Banana",
      "Orange",
      "Mango",
      "Watermelon",
      "Pineapple",
    ];

    const filteredResults = items.filter((item) =>
      item.toLowerCase().includes(searchWord.toLowerCase())
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
              <Typography fontWeight={600}>Search Result</Typography>
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <IconButton aria-label="close" onClick={handleCloseModal}>
                <Close />
              </IconButton>
            </Box>
          </Box>
          <TextField
            placeholder="searching ..."
            value={searchWord}
            fullWidth
            onChange={handleSearchChange}
            sx={{
              borderWidth: 0,
              borderColor: "white",
              mb: "10px",
              mt: "10px",
            }}
          />

          {searchResults.map((result, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandCircleDown />}>
                <Typography>{result}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem>
                    <ListItemText primary="Result Details 1" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Result Details 2" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Result Details 3" />
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchComponent;
