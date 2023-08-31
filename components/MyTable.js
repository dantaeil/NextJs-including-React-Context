import React from "react";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  tableCellClasses,
} from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import { grey } from "@mui/material/colors";
import { Delete } from "@mui/icons-material";
import { useTable, useTableDispatch } from "../providers/indexContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: grey[200],
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
let id = 3;

const MyTable = () => {
  const rows = useTable();
  const dispatch = useTableDispatch();

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [handle, setHandle] = useState("");

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>First</StyledTableCell>
            <StyledTableCell>Last</StyledTableCell>
            <StyledTableCell>Handle</StyledTableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Button
                variant="contained"
                onClick={() => {
                  const action = {
                    type: "added",
                    payload: {
                      id: id++,
                      first: first,
                      last: last,
                      handle: handle,
                    },
                  };
                  dispatch(action);
                }}
              >
                Add
              </Button>
            </TableCell>
            <TableCell>
              <TextField
                label="First"
                variant="outlined"
                value={first}
                onChange={(e) => {
                  setFirst(e.target.value);
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                label="Last"
                variant="outlined"
                value={last}
                onChange={(e) => {
                  setLast(e.target.value);
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                label="Handle"
                variant="outlined"
                value={handle}
                onChange={(e) => {
                  setHandle(e.target.value);
                }}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell>
                <IconButton
                  onClick={() => {
                    const action = {
                      type: "deleted",
                      payload: row.id,
                    };
                    dispatch(action);
                  }}
                >
                  <Delete />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell>{row.first}</StyledTableCell>
              <StyledTableCell>{row.last}</StyledTableCell>
              <StyledTableCell>{row.handle}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
