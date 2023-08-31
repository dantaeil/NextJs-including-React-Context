import React, { useContext } from "react";
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
import { TableContext } from "../providers/indexContext";

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

const initialTable = [
  { id: 0, first: "Tom", last: "Jackson", handle: "@twitter" },
  { id: 1, first: "Dan", last: "Jins", handle: "@facebook" },
  { id: 2, first: "Yuri", last: "Kan", handle: "@yahoo" },
];

const MyTable = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [handle, setHandle] = useState("");

  const [rows, setRows] = useState(initialTable);

  return (
    <TableContext.Provider value={{ rows, setRows }}>
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
                    setRows([
                      ...rows,
                      {
                        id: id++,
                        first: first,
                        last: last,
                        handle: handle,
                      },
                    ]);
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
          <MyTableBody />
        </Table>
      </TableContainer>
    </TableContext.Provider>
  );
};

function MyTableBody() {
  const { rows, setRows } = useContext(TableContext);

  console.log(rows);

  return (
    <TableBody>
      {rows.map((row) => (
        <StyledTableRow key={row.id}>
          <StyledTableCell>
            <IconButton
              onClick={() => {
                setRows(rows.filter((i) => i.id != row.id));
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
  );
}

export default MyTable;
