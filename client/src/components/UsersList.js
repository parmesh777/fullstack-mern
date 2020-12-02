import React, { Component } from "react";
import axios from "axios";
import UserForm from "./UserForm";
import { Link } from "react-router-dom";
import "../App.css";

class UsersList extends Component {
  state = {
    users: [],
  };

  getUsers() {
    axios
      .get("/api/users")
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getUsers();
  }
  deleteUser = (id) => {
    axios.delete("/api/users/" + id).then((res) => console.log(res.data));

    this.setState({
      users: this.state.users.filter((el) => el._id !== id),
    });
  };

  render() {
    return (
      <div>
        <UserForm />
        <table className="table table-striped container">
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
            {this.state.users.map((currentUser, index) => {
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

export default UsersList;
