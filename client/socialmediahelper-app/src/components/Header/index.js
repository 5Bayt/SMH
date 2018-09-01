import React, {Component} from "react";
import {AppBar, IconButton, Typography, Toolbar, Drawer, List, ListItem, Divider} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import Login from '../Login'

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer = (open) => () => {
    this.setState({
      openDrawer: open,
    });
  };

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer(!this.state.openDrawer)}>
              <MenuIcon/>
            </IconButton>
            <Typography variant="title" color="inherit">
              Social Media Helper
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.openDrawer} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            <div>
              <List>
                <ListItem><Login /></ListItem>
                <ListItem>Test</ListItem>
              </List>
              <Divider/>
              <List>

              </List>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
};
