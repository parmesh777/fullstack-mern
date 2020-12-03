import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap/dist/css/bootstrap.min.js";
import EditUser from "./components/EditUser";
import UsersList from "./components/UsersList";

function App() {
  return (
    <Router>
      <Route path="/" exact component={UsersList} />
      {/* <Route path="/edit/:id" component={EditUser} /> */}
      <Route path="/:id" component={EditUser} />
    </Router>
  );
}

export default App;
