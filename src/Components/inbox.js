import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { inboxActions } from "../store/inbox-slice";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Container, Typography } from "@mui/material";
import useFetchdata from "../store/Fetchdata";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#9ec2e6",
    color: theme.palette.common.black,
    fontSize: 16,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function Inbox() {
  //   const inboxMails = useSelector((state) => state.inbox.inboxMails);
  const [inboxEmails, SetinboxEmails] = React.useState();
  const email = localStorage.getItem("userEmail");
  const editedEmail = email.replace("@", "").replace(".", "");
  const [newdata] = useFetchdata(
    `https://mail-box-65f0e-default-rtdb.firebaseio.com/${editedEmail}/inbox.json`
  );

  const auth = useSelector((state) => state.auth);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (newdata) {
      const totalMails = Object.keys(newdata).length;
      localStorage.setItem("totalmails", totalMails.toString());
    }
  }, [newdata]);

  useEffect(() => {
    SetinboxEmails(newdata);
  }, [newdata]);

  newdata &&
    localStorage.setItem(
      "unseenCount",
      Object.values(newdata).filter((item) => item.seen === "unseen").length
    );

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <Typography variant="h6" style={{ color: "#1976D2" }}>
        Inbox
      </Typography>
      <Container sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                {["Status", "Subject", "Sender", "Date"].map((head) => (
                  <StyledTableCell key={head}>{head}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {inboxEmails &&
                Object.keys(inboxEmails)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .reverse()
                  .map((data, index) => {
                    return (
                      <StyledTableRow
                        onClick={() => {}}
                        key={index}
                        style={{ cursor: "pointer" }}
                      >
                        <StyledTableCell>
                          {inboxEmails[data].seen}
                        </StyledTableCell>
                        <StyledTableCell>
                          {inboxEmails[data].emailSubject}
                        </StyledTableCell>
                        <StyledTableCell>
                          {inboxEmails[data].senderEmail}
                        </StyledTableCell>
                        <StyledTableCell>
                          {inboxEmails[data].date}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={inboxEmails ? Object.keys(inboxEmails).length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </Container>
  );
}
