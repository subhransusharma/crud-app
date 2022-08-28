import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/actions";

const AddUser = () => {
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  const { name, email, contact, address } = state;

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !address || !contact) {
      setError("please fill all the input field");
    } else {
      dispatch(addUser(state));
      navigate("/");
      setError("");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div>
      <Button
        style={{ width: "100px", marginTop: "20px" }}
        type="submit"
        variant="contained"
        color="secondary"
        onClick={() => handleBack()}
      >
        Go Back
      </Button>
      <h2>Add User</h2>
      {error && <h3>{error}</h3>}
      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="Name"
          variant="standard"
          value={name}
          name="name"
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          value={email}
          name="email"
          type="email"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Contact"
          variant="standard"
          value={contact}
          name="contact"
          type="phonenumber"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Address"
          variant="standard"
          value={address}
          name="address"
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <Button
          type="submit"
          style={{ width: "100px", marginTop: "20px" }}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddUser;
