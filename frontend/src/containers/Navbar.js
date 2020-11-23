function Navbar() {
  return (
    <div>
      <nav className="mb-0 navbar navbar-expand-lg navbar-dark purple-gradient">
        <a className="navbar-brand" href="/">
          CRUD
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent-555"
          aria-controls="navbarSupportedContent-555"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent-555"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link waves-effect waves-light" href="/playlist">
                <i className="fas fa-video"> Playlist</i>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto nav-flex-icons">
            <li className="nav-item">
              <a className="nav-link waves-effect waves-light" href="/signin">
                <i className="fas fa-user"> Signin</i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
