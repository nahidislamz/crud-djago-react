import React, { Component } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Link } from "react-router-dom";
import InfoService from "./InfoService";

const infoService = new InfoService();

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      InfoList: [],
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

    console.log(data);

    infoService
      .createInfo(data)
      .then((result) => {
        console.log(result);
        NotificationManager.success("Product Added Sussceefully");
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
  componentDidMount() {
    let thisComponent = this;
    infoService.getInfos().then(function (response) {
      thisComponent.setState({ InfoList: response.data });
    });
  }
  handleDelete(id) {
    let selfComponent = this;
    infoService.deleteInfo(id).then(function (response) {
      NotificationManager.warning("Info Deteted Successfully");
      selfComponent.setState({ InfoList: response.data });
    });
  }
  render() {
    return (
      <div className="container pt-5 pb-5">
        <NotificationContainer />
        <form onSubmit={this.handleForm}>
          <div className="row">
            <div className="col-md-4 card">
              <p className="h4 mb-4 p-3 text-center">Add Informatoin</p>

              <div className="form-row mb-4">
                <div className="col">
                  <input
                    type="text"
                    name="first_name"
                    onChange={this.handleInput}
                    id="defaultRegisterFormFirstName"
                    className="form-control"
                    placeholder="First name"
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
              />
              <input
                type="text"
                name="phone"
                onChange={this.handleInput}
                id="defaultRegisterPhonePassword"
                className="form-control"
                placeholder="Phone number"
                aria-describedby="defaultRegisterFormPhoneHelpBlock"
              ></input>
              <button className="btn btn-success mt-4" type="submit">
                Add Info
              </button>
            </div>
            <div className="col-md-8 card">
              <table className="table p-2 m-2">
                <thead>
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.InfoList.map((data) => (
                    <tr key={data.id}>
                      <td>{data.first_name}</td>
                      <td>{data.last_name}</td>
                      <td>{data.email}</td>
                      <td>{data.phone}</td>
                      <td>
                        <Link
                          className="btn btn-sm btn-secondary p-2"
                          to={"/info-edit/" + data.id}
                        >
                          <i className="fas fa-edit"></i>
                        </Link>{" "}
                        <button
                          className="btn btn-sm btn-danger p-2"
                          onClick={(e) => this.handleDelete(data.id)}
                        >
                          {" "}
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default UserInfo;
