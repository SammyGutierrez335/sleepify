import React from "react";
import logo from "../../assets/images/white-logo-blue-music.png";
class Header extends React.Component {
  render() {
    return (
      <div id="footer-container">
        <nav id="footer-nav">
          <div>
            <img className="white-logo" src={logo} alt="logo" />
          </div>
          <div id="footer-nav-links">
            <ul>
              <h4>Sammy<br></br>Gutierrez</h4>
              <li>
                <a href="https://sammygutierrez335.github.io/Portfolio/"><i className="social-icon fas fa-portrait">Portfolio</i></a>
              </li>
              <li>
                <a href="https://github.com/SammyGutierrez335"><i className="social-icon fab fa-github">GitHub</i></a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/sammy-gutierrez/" ><i className="social-icon fab fa-linkedin">LinkedIn</i></a>
              </li>
              <li>
                <a href="mailto:sammygutierrez335@gmail.com"><i className="social-icon fas fa-envelope-square">Email</i></a>
              </li>
            </ul>
          </div>
          <div id="bottom-links">
            <span>Sleepify, is a personal academic portfolio project created for learning and demonstration purposes only. It is not affiliated with, endorsed by, or intended to replace Spotify or any of its services. 
              <br/>All trademarks, logos, and brand names belong to their respective owners.
              <br />2020 Sleepify
            </span>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
