import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, loadUsers } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 900,
    marginTop: 100,
  },
});

const Home = () => {
  const classes = useStyles();

  let dispatch = useDispatch();
  let { users } = useSelector((state) => state.users);

  let navigate = useNavigate();

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure to delete the user")) {
      dispatch(deleteUser(id));
    }
  };

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const handleAddNavigate = () => {
    navigate("/adduser");
  };

  const handleEditNavigate = (id) => {
    console.log("hello");
    navigate(`/edituser/${id}`);
  };

  return (
    <div>
      <div>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleAddNavigate()}
        >
          Add User
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Contact</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell align="center">{user.name}</StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                <StyledTableCell align="center">{user.contact}</StyledTableCell>
                <StyledTableCell align="center">{user.address}</StyledTableCell>
                <StyledTableCell align="center">
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled elevation buttons"
                  >
                    <Button
                      style={{ marginRight: "5px" }}
                      color="primary"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => handleEditNavigate(user.id)}
                    >
                      Edit
                    </Button>
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
