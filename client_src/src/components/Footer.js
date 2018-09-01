import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="blue darken page-footer">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">İletişim</h5>
              <a className="grey-text text-lighten-4" href="https://www.twitter.com/polliceversoo">@polliceversoo</a>
            </div>
            <div className="col l4 offset-l2 s12">
              <ul>
                <li><a className="grey-text text-lighten-4" href="https://www.twitter.com">Twitter</a></li>
                <li><a className="grey-text text-lighten-4" href="https://www.facebook.com">Facebook</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            © 2018 Copyright
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;
