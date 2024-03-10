import {
  Modal,
  Container,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { updateMarkdown } from "../services/markdown.service";

export const UpdateMarkdownPanel = (props: any) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [id, setId] = useState<string>("");

  useEffect(() => {
    setTitle(props.markdown.title || "");
    setContent(props.markdown.content || "");
    setId(props.markdown.id || "");
  }, [props]);

  const handleSubmit = async () => {
    if (title === "") {
      return;
    }
    try {
      await updateMarkdown({ id, title, content });
    } catch (err) {
      throw err;
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
          maxHeight: 530,
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
            flexDirection: "column",
          }}
        >
          <Typography>Title</Typography>
          <TextField
            sx={{ height: "30px", marginBottom: 3 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Typography>Content</Typography>
          <TextField
            sx={{ height: "30px", marginBottom: 3 }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></TextField>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={handleSubmit}
              color="success"
              variant="contained"
              sx={{ width: 10, marginTop: 2 }}
            >
              Edit
            </Button>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
};
