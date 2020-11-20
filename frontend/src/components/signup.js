import React, { Component} from 'react';

class SignUp extends Component {

  state = {
    credentials: {username: '', password: ''}
  }

  register = event => {
    fetch('http://127.0.0.1:8000/api/users/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.credentials)
    })
    .then( data => data.json())
    .then(
      data => {
        console.log(data.token);
      }
    )
    .catch( error => console.error(error))
  }
  inputChanged = event => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({credentials: cred});
  }

  render() {
    return (
      <div className = "text-center border border-light p-5 login">
       <p className="h4 mb-4">Sign Up</p>

        <label>
          <input type="text" name="username" className="form-control mb-4"
           value={this.state.credentials.username}
           placeholder="Username"
           onChange={this.inputChanged}/>
        </label>
        <br/>
        <label>
          <input type="password" name="password" className="form-control mb-4" 
           value={this.state.credentials.password}
           placeholder="Password"
           onChange={this.inputChanged} />
        </label>
        <br/>
        <button className="btn btn-info btn-block my-4" onClick={this.register}>Register</button>
        <p>Already a member?
        <a className="pl-2" href="/signin">Sign In</a>
        </p>

      </div>
    );
  }
}

export default SignUp;