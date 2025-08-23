import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password2: '',
      errors: {},
      error_touched: {
        email: false,
        password: false,
        password2: false,
        username: false,
      },
      error_exists: {
        email: false,
        password: false,
        password2: false,
        username: false,
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push('/login');
    }

    this.setState({errors: nextProps.errors})
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value, 
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.resetErrorDisplay();
    this.props.signup(user, this.props.history)
  }

  resetErrorDisplay() {
    this.setState({
      error_touched: {
        email: false,
        password: false,
        password2: false,
        username: false,
      },
    })
  }

  handleOnFocus(field) {
    const touchField = this.state.error_touched;
    touchField[field] = true;
    return () => this.setState({
      touchField
    })
  }

  renderError(field) {
    if (!this.state.error_touched[field]) {
      return (
        <div id={`${field}-error`} className='signup error-div'>
          {this.state.errors[field]}
        </div>
      )
    }
  }
  
  renderInputField(field) {
    let placeholder = field.charAt(0).toUpperCase() + field.substring(1);
    if(field.includes('2')) {
      placeholder = placeholder.substring(0, placeholder.length - 1) + ' Confirm'
    }
    let type;
    if ((field.includes('email') || field === 'username')) {
      type = 'text'
    } else if (field.includes('password')) {
      type = 'password'
    } else {
      type = 'Date'
    }
    if (!this.state.error_touched[field] && this.state.errors[field]) {
      return (
          <input id={field} 
            type={type}
            className="signup-border has-error"
            value={this.state[field]}
            onChange={this.update(field)}
            placeholder={placeholder}
            onFocus={() => this.handleOnFocus(field)}/>
      )
    } else {
      return (
          <input id={field}
            type={type}
            className="signup-border"
            value={this.state[field]}
            onChange={this.update(field)}
            placeholder={placeholder}
            onFocus={() => this.handleOnFocus(field)}/>
      )
    }
  }
  render() {
    return (
      <div className="signup-form-container">
        <div className="heading">
          <img src="images/logo2_black.png" alt="sleepify-logo" height="30"/>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="signup-form">
            <br/>
              <div className="signup-input email">
                {this.renderInputField('email')}
                {this.renderError('email')}
              </div>
            <br/>
              <div className="signup-input password">
                {this.renderInputField('password')}
                {this.renderError('password')}
              </div>
            <br/>
              <div className="signup-input password2">
                {this.renderInputField('password2')}
                {this.renderError('password2')}
              </div>
            <br/>
              <div className="signup-input username">
                {this.renderInputField('username')}
                {this.renderError('username')}
              </div>
            <br/>
            <div className="signup-disclaimer">
              <p>By signing up, you agree to Sleepify's Terms and Conditions of Use</p>
            </div>
            <div className="signup-button">
              <input type="submit" value="SIGN UP" />
            </div>
            <div className="login-instead">
              <label>
                Already have an account? 
                <Link to='/login'> Log in </Link>
              </label>
            </div>

          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);