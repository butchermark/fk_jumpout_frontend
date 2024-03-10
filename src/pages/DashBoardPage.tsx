import React, { useEffect, useState } from "react";
import { DefaultTable } from "../components/DefaultTable";
import {
  Button,
  Container,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { deleteMarkdown, getMarkdowns } from "../services/markdown.service";
import { CreateMarkdownPanel } from "../components/CreateMarkdownPanel";
import { IMarkdown } from "../interfaces/IMarkdown.interface";
import { UpdateMarkdownPanel } from "../components/UpdateMarkdownPanel";

export const DashBoardPage = () => {
  const [tableData, setTableData] = useState<IMarkdown[]>([]);
  const [updatableMarkdown, setUpdatableMarkdown] = useState<Object>({});
  const [creatingMarkdown, setCreatingMarkdown] = useState(false);
  const [updatingMarkdown, setUpdatingMarkdown] = useState(false);
  const [deletingMarkdown, setDeletingMarkdown] = useState(false);

  const fetchData = async () => {
    const markdowns = await getMarkdowns();
    setTableData(markdowns);
  };

  useEffect(() => {
    fetchData();
  }, [creatingMarkdown, updatingMarkdown, deletingMarkdown]);

  const handleDelete = async (event: any) => {
    await deleteMarkdown(event.target.id);
    setDeletingMarkdown(!deletingMarkdown);
  };

  return (
    <React.Fragment>
      <CreateMarkdownPanel
        open={creatingMarkdown}
        onClose={() => setCreatingMarkdown(false)}
      />
      <UpdateMarkdownPanel
        open={updatingMarkdown}
        markdown={updatableMarkdown}
        onClose={() => setUpdatingMarkdown(false)}
      />
      <Container sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
        <Typography color="primary" variant="h4">
          Dashboard
        </Typography>
      </Container>
      <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setCreatingMarkdown(true)}
        >
          Create
        </Button>
      </Container>
      <DefaultTable
        headers={["Title", "", ""]}
        data={tableData.map((markdown: any) => (
          <TableRow key={markdown.id}>
            <TableCell>{markdown.title}</TableCell>
            <TableCell>
              <Tooltip title="Update">
                <Button
                  variant="contained"
                  id={markdown.id}
                  onClick={() => {
                    setUpdatingMarkdown(true);
                    setUpdatableMarkdown({
                      id: markdown.id,
                      title: markdown.title,
                      content: markdown.content,
                    });
                  }}
                >
                  Update
                </Button>
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Delete">
                <Button
                  variant="contained"
                  id={markdown.id}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      ></DefaultTable>
    </React.Fragment>
  );
};
