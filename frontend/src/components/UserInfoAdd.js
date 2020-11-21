import React, { Component } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import InfoService from "./InfoService";
const infoService = new InfoService();

class UserInfoAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      errors: {},
    };
  }
  handleForm = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("first_name", this.state.first_name);
    data.append("last_name", this.state.last_name);
    data.append("email", this.state.email);
    data.append("phone", this.state.phone);

    infoService
      .createInfo(data)
      .then((result) => {
        console.log(result);
        NotificationManager.success("Info Added Sussceefully", "New User");
      })
      .catch((err) => {
        if (err.response && err.response.status === 400)
          NotificationManager.error(err.response.data.msg);
        else NotificationManager.error("Something Went Wrong");
        this.setState({ errors: err.response });
      });
  };

  handleInput = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="container pt-5 pb-5">
        <form onSubmit={this.handleForm}>
          <div className="mt-4 p-4 card">
            <p className="h4 mt-4 mb-4 p-3 text-center">Add Informatoin</p>

            <div className="form-row mb-4">
              <div className="col">
                <input
                  type="text"
                  name="first_name"
                  onChange={this.handleInput}
                  id="defaultRegisterFormFirstName"
                  className="form-control"
                  placeholder="First name"
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  name="last_name"
                  onChange={this.handleInput}
                  id="defaultRegisterFormLastName"
                  className="form-control"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            <input
              type="email"
              name="email"
              onChange={this.handleInput}
              id="defaultRegisterFormEmail"
              className="form-control mb-4"
              placeholder="E-mail"
              required
            />
            <input
              type="text"
              name="phone"
              onChange={this.handleInput}
              id="defaultRegisterPhonePassword"
              className="form-control"
              placeholder="Phone number"
              aria-describedby="defaultRegisterFormPhoneHelpBlock"
              required
            ></input>
            <button className="btn btn-success mt-4" type="submit">
              Add Info
            </button>
            <NotificationContainer />
          </div>
        </form>
      </div>
    );
  }
}

export default UserInfoAdd;
