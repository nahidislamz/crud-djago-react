import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import InfoService from "./InfoService";
import { Link } from "react-router-dom";
const infoService = new InfoService();

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoList: [],
      errors: {},
    };
  }
  handleForm = (e) => {
    e.preventDefault();
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
      thisComponent.setState({ infoList: response.data });
    });
  }
  handleDelete(id) {
    let selfComponent = this;
    infoService.deleteInfo(id).then(function (response) {
      NotificationManager.warning("Info Deteted Successfully");
      selfComponent.setState({ infoList: response.data });
    });
  }
  render() {
    return (
      <div className="container pt-5 pb-5">
        <form onSubmit={this.handleForm}>
          <div className="card mt-4">
            <div className="row p-4">
              <div className="col-md-9 pl-2">
                <h1 className="text-grey pl-3">USER INFORMATIONS</h1>
              </div>

              <div className="col-md-3 p-2">
                <Link className="btn btn-md btn-purple" to="/addnew">
                  Add New Informations
                </Link>
              </div>
            </div>

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
                {this.state.infoList.map((data) => (
                  <tr key={data.id}>
                    <td>{data.first_name}</td>
                    <td>{data.last_name}</td>
                    <td>{data.email}</td>
                    <td>{data.phone}</td>
                    <td>
                      <Link
                        className="btn btn-sm btn-secondary p-2"
                        to={"/updateinfo/" + data.id}
                      >
                        <i className="fas fa-edit"></i>
                      </Link>{" "}
                      <button
                        className="btn btn-sm btn-danger p-2"
                        onClick={(e) => this.handleDelete(data.id)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    );
  }
}

export default UserInfo;
