import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, updateUser } from "../redux/actions";

const EditUser = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  let navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  let { id } = useParams();
  const { user } = useSelector((state) => state.users);
  const { name, email, contact, address } = state;

  useEffect(() => {
    dispatch(getSingleUser(id));
  }, []);

  useEffect(() => {
    if (user) {
      setState({ ...user });
    }
  }, [user]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !address || !contact) {
      setError("please fill all the input field");
    } else {
      dispatch(updateUser(state, id));
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
      <h2>Edit User</h2>
      {error && <h3>{error}</h3>}
      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="Name"
          variant="standard"
          value={name || ""}
          name="name"
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          value={email || ""}
          name="email"
          type="email"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Contact"
          variant="standard"
          value={contact || ""}
          name="contact"
          type="phonenumber"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Address"
          variant="standard"
          value={address || ""}
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
          Update
        </Button>
      </form>
    </div>
  );
};

export default EditUser;
