import React, { Component } from "react";
import axios from "axios";
import "../App.css";
//import UserList from "./UsersList";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
// import { Modal, ModalHeader, ModalBody, ModalFooter } from "bootstrap";

class EditUser extends Component {
  state = {
    firstName: "",
    lastName: "",
    age: 0,
    gender: "",
    fName: "",
    lName: "",
    aError: "",
    gError: "",
    fnError: "",
    show: true,

    users: [],
    persons: [],
  };
  // getUsers() {
  //   axios
  //     .get("/api/users")
  //     .then((res) => {
  //       this.setState({ users: res.data });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // componentDidMount() {
  //   this.getUsers();
  // }
  validate = () => {
    let fName = "";
    let lName = "";
    let aError = "";
    let gError = "";

    if (!this.state.firstName) {
      fName = "can't be blank";
    }
    if (!this.state.lastName) {
      lName = "can't be blank";
    }
    if (!this.state.age) {
      aError = "can't be blank";
    }
    if (!this.state.gender) {
      gError = "can't be blank";
    }
    if (fName || lName || aError || gError) {
      this.setState({ fName, lName, aError, gError });
      return false;
    }
    return true;
  };
  componentDidMount() {
    axios
      .get("/api/users")
      .then((res) => {
        this.setState({ persons: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      //.get("/api/users/edit/" + this.props.match.params.id)
      .get("/api/users/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          age: res.data.age,
          gender: res.data.gender,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
    axios.get("/api/users").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map((user) => user.firstName),
        });
      }
    });
  }
  onChange = (e) => {
    if (e.target.name === "firstName") {
      if (!this.state.firstName.length > 0) {
        this.setState({ fName: "" });
      }
    }
    if (e.target.name === "lastName") {
      if (!this.state.lastName.length > 0) {
        this.setState({ lName: "" });
      }
    }
    if (e.target.name === "age") {
      if (!this.state.age.length > 0) {
        this.setState({ aError: "" });
      }
    }
    if (e.target.name === "gender") {
      if (!this.state.gender.length > 0) {
        this.setState({ gError: "" });
      }
    }

    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const userData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      gender: this.state.gender,
    };
    const isValid = this.validate();
    if (isValid) {
      axios
        //.put("/api/users/edit/" + this.props.match.params.id, userData, config)
        .put("/api/users/" + this.props.match.params.id, userData, config)
        .then((res) => console.log(res.data));
      window.location = "/";
      console.log(this.state);
      this.setState({
        firstName: "",
        lastName: "",
        age: 0,
        gender: "",
      });
    }
  };
  deleteUser = (id) => {
    axios.delete("/api/users/" + id).then((res) => console.log(res.data));

    this.setState({
      persons: this.state.persons.filter((el) => el._id !== id),
    });
    window.location = "/";
  };
  handleModal = () => {
    this.setState({ show: !this.state.show });
    window.location = "/";
  };
  render() {
    const modalSub = this.handleSubmit;
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <h2>Edit User Details</h2>
          <button className="btn btn-primary">Add Details</button>
        </div>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.show}
          onHide={this.handleModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Form Page</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <h2>Fill The Below Details</h2>
              <br />

              <form onSubmit={this.handleSubmit} className="contain">
                <div className="form-group">
                  <label>Firstname: </label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter firstname"
                    name="firstName"
                    className="form-group"
                    value={this.state.firstName}
                    onChange={this.onChange}
                  />
                  <div style={{ fontSize: 14, color: "red" }}>
                    {this.state.fName}
                  </div>
                </div>

                <div className="form-group">
                  <label>Lastname: </label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter lastname"
                    name="lastName"
                    className="form-group"
                    value={this.state.lastName}
                    onChange={this.onChange}
                  />
                  <div style={{ fontSize: 14, color: "red" }}>
                    {this.state.lName}
                  </div>
                </div>

                <div className="form-group">
                  <label>Age: </label>
                  <br />
                  <input
                    type="number"
                    name="age"
                    className="form-group"
                    value={this.state.age}
                    onChange={this.onChange}
                  />
                  <div style={{ fontSize: 14, color: "red" }}>
                    {this.state.fName}
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    Gender:
                    <br />
                    <input
                      type="radio"
                      value="male"
                      name="gender"
                      checked={this.state.gender === "male"}
                      onChange={this.onChange}
                    />
                    Male
                    <br />
                    <input
                      type="radio"
                      value="female"
                      name="gender"
                      checked={this.state.gender === "female"}
                      onChange={this.onChange}
                    />
                    Female
                  </label>
                  <div style={{ fontSize: 14, color: "red" }}>
                    {this.state.fName}
                  </div>
                </div>

                {/* <div className="form-group">
                  <input
                    type="submit"
                    value="EditUser"
                    className="btn btn-primary"
                  />
                </div> */}
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={modalSub}
            >
              Submit
            </button>

            <Button variant="danger" onClick={this.handleModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <table className="table table-striped">
          <thead className="tableHover">
            <tr>
              <th>Sr no.</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {this.state.persons.map((currentUser, index) => {
              return (
                <tr key={currentUser._id}>
                  <td>{index + 1}</td>
                  <td>{currentUser.firstName}</td>
                  <td>{currentUser.lastName}</td>
                  <td>{currentUser.age}</td>
                  <td>{currentUser.gender}</td>
                  <td>
                    <Link
                      to={"/edit/" + currentUser._id}
                      className="btn btn-info"
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => this.deleteUser(currentUser._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default EditUser;
