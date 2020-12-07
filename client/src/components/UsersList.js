import React, { Component } from "react";
import axios from "axios";
import UserForm from "./UserForm";
import Page from "./Page";
import { Link } from "react-router-dom";
import "../App.css";

import { InputGroup, FormControl, Button } from "react-bootstrap";

class UsersList extends Component {
  state = {
    users: [],
    persons: [],
    direction: {
      firstName: "asc",
      lastName: "asc",
      age: "asc",
      gender: "asc",
    },
    search: "",

    current: 1,
    perPage: 5,
  };

  filterUsers() {
    axios
      .get("/api/users")
      .then((res) => {
        this.setState({ persons: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
    this.filterUsers();
  }
  deleteUser = (id) => {
    axios.delete("/api/users/" + id).then((res) => console.log(res.data));

    this.setState({
      users: this.state.users.filter((el) => el._id !== id),
    });
  };

  sortUser = (name) => {
    const users = this.state.users;
    this.setState({
      users: users.sort((a, b) =>
        this.state.direction[name] === "asc"
          ? a[name].toString().localeCompare(b[name].toString())
          : b[name].toString().localeCompare(a[name].toString())
      ),
      direction: {
        [name]: this.state.direction[name] === "asc" ? "desc" : "asc",
      },
    });
  };
  ageUser = (name) => {
    const users = this.state.users;
    this.setState({
      users: users.sort((a, b) =>
        this.state.direction[name] === "asc"
          ? parseFloat(a[name]) - parseFloat(b[name])
          : parseFloat(b[name]) - parseFloat(a[name])
      ),
      direction: {
        [name]: this.state.direction[name] === "asc" ? "desc" : "asc",
      },
    });
  };
  searchC = (e) => {
    this.setState({
      search: e.target.value,
    });
  };
  // onPaginationChange = (start, end) => {
  //   const { pagination } = this.state;
  //   this.setState({
  //     start: start,
  //     end: end,
  //   });
  // };
  prevPage = () => {
    if (this.state.current > 1) {
      this.setState({
        current: this.state.current - 1,
      });
    }
  };

  render() {
    const items = this.state.users.filter((user) => {
      return user.firstName
        .toLowerCase()
        .includes(this.state.search.toLowerCase());
    });

    const { current, perPage } = this.state;
    const indexOfLastTodo = current * perPage;
    const indexOfFirstTodo = indexOfLastTodo - perPage;
    const currentUsers = items.slice(indexOfFirstTodo, indexOfLastTodo);
    const totalPages = items.length / perPage;

    const nextPage = () => {
      if (this.state.current < Math.ceil(totalPages)) {
        this.setState({
          current: this.state.current + 1,
        });
      }
    };

    return (
      <div>
        <UserForm />

        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default">
              Persons List
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="search"
            onChange={this.searchC}
            value={this.state.search}
            placeholder="search persons.."
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
        <br />
        <table className="table table-striped container">
          <thead className="tableHover">
            <tr>
              <th>Sr no.</th>
              <th onClick={() => this.sortUser("firstName")}>Firstname</th>
              <th onClick={() => this.sortUser("lastName")}>Lastname</th>
              <th onClick={() => this.ageUser("age")}>Age</th>
              <th onClick={() => this.sortUser("gender")}>Gender</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((currentUser, index) => {
              return (
                <tr key={currentUser._id}>
                  <td>{index + 1}</td>

                  <td>{currentUser.firstName}</td>
                  <td>{currentUser.lastName}</td>
                  <td>{currentUser.age}</td>
                  <td>{currentUser.gender}</td>
                  <td>
                    <Link
                      //to={"/edit/" + currentUser._id}
                      to={"/" + currentUser._id}
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
        <div className="d-flex justify-content-between container">
          <Button
            variant="outline-primary"
            disabled={current === 1 ? true : false}
            onClick={this.prevPage}
          >
            Prev
          </Button>
          <Button
            variant="outline-success"
            disabled={current === totalPages ? true : false}
            onClick={nextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }
}

export default UsersList;
