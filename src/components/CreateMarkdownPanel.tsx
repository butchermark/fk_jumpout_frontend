import {
  Container,
  Typography,
  TextField,
  Modal,
  Box,
  Button,
} from "@mui/material";
import AddCircleOutLineIcon from "@mui/icons-material/AddCircle";
import { useEffect, useState } from "react";
import { createMarkdown } from "../services/markdown.service";

export const CreateMarkdownPanel = (props: any) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    try {
      await createMarkdown({ title, content });
    } catch (err) {
      window.alert("Failed to create markdown, file may already exist");
    }
    props.onClose();
  };

  return (
    <Modal
      sx={{ display: "flex", alignItems: "center" }}
      open={props.open}
      onClose={() => {
        props.onClose();
        setTitle("");
        setContent("");
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 400,
          maxHeight: 500,
          backgroundColor: "white",
          padding: 3,
          width: "100%",
          position: "relative",
        }}
        maxWidth={false}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: 2,
          }}
        >
          <Typography variant="h5">{}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography>Title</Typography>
          <TextField onChange={(e) => setTitle(e.target.value)} />
          <Typography>Content</Typography>
          <TextField
            multiline
            rows={7}
            onChange={(e) => setContent(e.target.value)}
            sx={{
              width: "100%",
              "& textarea": {
                height: "100%",
              },
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              color="success"
              variant="contained"
              sx={{ width: 10, marginTop: 2 }}
              onClick={handleSubmit}
              disabled={title === ""}
            >
              <AddCircleOutLineIcon />
            </Button>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
};
