import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  componentDidUpdate() {
    this.changeBorder();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/');
    }

    this.setState({errors: nextProps.errors})
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.resetClasses();

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user); 
  }

  renderSignUp() {
    return (
      <div className='render-signup'>
        <span>
          Don't have an account?
        </span>
        <div>
          <Link to='/signup' >SIGN UP FOR SLEEPIFY</Link>
        </div>
      </div>
    )
  }

  resetClasses() {
    let element = document.getElementById('email');
    let error = document.getElementById('email-error')
    if(element) {
      element.classList.remove("has-error")
      error.classList.remove("hidden")
    }
    element = document.getElementById('password');
    error = document.getElementById('password-error')
    if (element) {
      element.classList.remove("has-error")
      error.classList.remove("hidden")
    }
  }


  changeBorder(values = "all") {
    if(values === "all") {
      //change border of both input values
      let element = document.getElementById('email');
      let error = document.getElementById('email-error')
      if(element) {
        if (!error.classList.contains("hidden") && (!this.state.errors.login)){
          element.classList.add("has-error")
        }
      }
      //change border of password input box
      element = document.getElementById('password');
      error = document.getElementById('password-error')
      if (element) {
        if (!error.classList.contains("hidden") && (!this.state.errors.login)){
          element.classList.add("has-error")
        }
      }
    } else {
      //change border of email input box
      let element = document.getElementById(values);
      const errorId = values + "-error"
      let error = document.getElementById(errorId)
      if(element && error) {
        element.classList.remove("has-error")
        error.classList.add("hidden")
      }
    }
  }

  //change border if something is in the input box
  changeBorderonBlur(value) {
    let element = document.getElementById(value);
    if(element && !this.state[value]) {
      const errorId = value + "-error"
      let error = document.getElementById(errorId)
      error.classList.remove("hidden")
      element.classList.add("has-error")
    } else if (element && this.state[value]){
      const errorId = value + "-error"
      let error = document.getElementById(errorId)
      error.classList.add("hidden")
      element.classList.remove("has-error")
    }
  }
  
  renderMismatchError() {
    if(this.state.errors.login) {
      return (
        <div className='login-form-error'>
          {this.state.errors.login}
        </div>
      )
    } else {
      return (null)
    }
  }

  demoLogin(e) {
    e.preventDefault();
    return this.typeWriter('demouser@demouser.com', 'DemoSleepify');
  }       

  typeWriter(email, password) {
      let i = 0;
      let j = 0;
      let speed = 50; 
      let emailInput = document.getElementById("email")
      let pwInput = document.getElementById("password");
      emailInput.value = "";
      pwInput.value = "";
      const login = () => {
          if (i < email.length) {
              emailInput.value += email.charAt(i);
              i++;
              setTimeout(login, speed);
          } else if (j < password.length) {
              pwInput.value += password.charAt(j);
              j++;
              setTimeout(login, speed)
          } else {
              this.setState({email: email, password: password});
              this.resetClasses();
              this.props.login(this.state);
          }

      }
      return login()
  }

  render() {
    this.changeBorder();
    return (
      <div className='login-form-container'>
        <div className='heading'>
          <img src="images/logo2_black.png" alt="sleepify-logo" height="30"/>
        </div>
        <div className='login-form-error-container'>
          {this.renderMismatchError()}
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className='login-form'>
            <br/>
              <div className='email-input'>
                <input id="email"
                  className="form-email login"
                  type="text"
                  value={this.state.email}
                  onChange={this.update('email')}
                  placeholder="Email address"
                  onFocus={() => this.changeBorder('email')}
                  onBlur={()=>this.changeBorderonBlur('email')}
                />
                <div id="email-error" className='login error-div'>
                  {this.state.errors.email}
                </div>
              </div>
            <br/>
              <div className='password-input'>
                <input id="password" 
                  className="form-password login"
                  type="password"
                  value={this.state.password}
                  onChange={this.update('password')}
                  placeholder="Password"
                  onFocus={() => this.changeBorder('password')}
                  onBlur={()=>this.changeBorderonBlur('password')}
                />
                <div id="password-error" className='login error-div'>
                  {this.state.errors.password}
                </div>
              </div>
            <br/>
            <div className='submit-button'>
              <input type="submit" value="LOG IN" />
              <button className='demo-login' onClick={this.demoLogin}>DEMO</button>
            </div>
          </div>
        </form>
        {this.renderSignUp()}
        <div className='disclaimer'>
          <p>By Signing in, you agree to Sleepify's Terms &amp; Conditions and Privacy Policy</p>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);