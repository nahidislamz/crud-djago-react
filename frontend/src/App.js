import React, { useState } from "react";
import "./style.css";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./containers/Navbar";
import HomePage from "./components/Home";
import UserInfoAdd from "./components/UserInfoAdd";
import UserInfoUpdate from "./components/UserInfoUpdate";
import Footer from "./containers/Footer";

function App() {
  const [token, setToken] = useState("");

  const userLogin = (tok) => {
    setToken(tok);
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Route path="/" exact component={HomePage} />
        <Route path="/signin" component={SignIn}>
          <SignIn userLogin={userLogin} />
        </Route>
        <Route path="/signup" component={SignUp} />
        <Route path="/addnew" component={UserInfoAdd} />
        <Route path="/updateinfo" component={UserInfoUpdate} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
