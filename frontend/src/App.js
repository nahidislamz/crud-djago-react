import React, { useState } from "react";
import "./style.css";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./containers/Navbar";
import HomePage from "./components/Home";
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
