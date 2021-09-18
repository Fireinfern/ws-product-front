import React from "react";

import { AppBar, Toolbar, Typography, IconButton, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import HomeIcon from "@material-ui/icons/Home";
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { NavLink } from "react-router-dom";

export default class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerIsOpen: false
        }
    }

    toggleDrawer() {
        this.setState(prevState => ({drawerIsOpen: !prevState.drawerIsOpen}))
    }

    render() {
        return (
            <>
                <AppBar position="fixed" color="primary">
                    <Toolbar>
                        <IconButton aria-label="open drawer"
                            color="inherit"
                            onClick={this.toggleDrawer.bind(this)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6">
                            Basic Graphs
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="persistent"
                    anchor="left"
                    open={ this.state.drawerIsOpen }
                >
                    <Toolbar color="primary">
                        <Typography variant="h6">
                            Menu
                        </Typography>
                        <IconButton
                            aria-label="close drawer"
                            onClick={this.toggleDrawer.bind(this)}>
                            <ArrowForwardIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider></Divider>
                    <List>
                        <ListItem button 
                            component={NavLink} 
                            to="/home" 
                            onClick={this.toggleDrawer.bind(this)}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button 
                            component={NavLink} 
                            to="/basic-charts" 
                            onClick={this.toggleDrawer.bind(this)}>
                            <ListItemIcon>
                                <EqualizerIcon />
                            </ListItemIcon>
                            <ListItemText primary="Charts" />
                        </ListItem>
                        <ListItem button 
                            component={NavLink} 
                            to="/basic-tables" 
                            onClick={this.toggleDrawer.bind(this)}>
                            <ListItemIcon>
                                <EqualizerIcon />
                            </ListItemIcon>
                            <ListItemText primary="Tables" />
                        </ListItem>
                    </List>
                </Drawer>
            </>
        );
    }
}