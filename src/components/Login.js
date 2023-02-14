import React from 'react';

function LoginPage({ login }) {
  function formLogin(e) {
    e.preventDefault();
    login(e.target.username.value, e.target.password.value);
  }

  return (
    <section className="vh-100" style={{ backgroundColor: '#508bfc' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                {/* <h3 className="mb-5">Sign in</h3> */}
                <form onSubmit={formLogin}>
                  <div className="form-outline mb-4">
                    <input type="text" className="form-control form-control-lg" name="username" placeholder="Enter Username" />
                    <label className="form-label" >
                      Username
                    </label>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      //   id="typePasswordX-2"
                      className="form-control form-control-lg"
                      name="password"
                      placeholder="Enter Password"
                    />
                    <label className="form-label" >
                      Password
                    </label>
                  </div>
                  <div className="form-check d-flex justify-content-start mb-4">
                    <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                    <label className="form-check-label" htmlFor="form1Example3">
                      Remember password
                    </label>
                  </div>
                  <button className="btn btn-primary btn-lg btn-block" type="submit">
                    Login

                  </button>
                  <hr className="my-4" />
                  {/* <button
                    className="btn btn-lg btn-block btn-primary"
                    style={{ backgroundColor: '#dd4b39' }}
                    type="submit"
                  >
                    <i className="fab fa-google me-2"></i> Sign in with Google
                  </button>
                  <button
                    className="btn btn-lg btn-block btn-primary mb-2"
                    style={{ backgroundColor: '#3b5998' }}
                    type="submit"
                  >
                    <i className="fab fa-facebook-f me-2"></i> Sign in with Facebook
                  </button> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}

export default LoginPage;
