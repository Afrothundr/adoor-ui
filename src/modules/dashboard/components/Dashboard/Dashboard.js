import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import logo from '../../../../images/logo.png';
import { connect } from 'react-redux';
import { logOut } from '../../../auth/redux/actions/auth.actions';
import './Dashboard.scss';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9 + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        backgroundColor: '#FFFFF',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
        };

    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleLogOut = () => {
        this.props.logOut()
    }

    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar id='header-container'
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar className="header" disableGutters={!this.state.open}>
                        <IconButton
                            color="default"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, {
                                [classes.hide]: this.state.open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <div className='header-profile-container'>
                            <img className="header-logo" alt="" src={logo}></img>
                            <div className='profile-container'>
                                <img src="https://feedback.seekingalpha.com/s/cache/7a/4b/7a4bcc11fadeac0bb827e141cb770f56.png"></img>
                                <h4>Whitney</h4>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer className="sidebar"
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open,
                    })}
                    classes={{
                        paper: classNames({
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        }),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List id="sidebar">
                        <ListItem button>
                            <ListItemIcon> <i class="fas fa-user-circle fa-2x"></i></ListItemIcon>
                            <ListItemText primary='profile' />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon> <i class="fas fa-plus fa-2x"></i></ListItemIcon>
                            <ListItemText primary='add listing' />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon> <i class="fas fa-poll fa-2x"></i></ListItemIcon>
                            <ListItemText primary='analytics' />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon> <i class="fas fa-briefcase fa-2x"></i></ListItemIcon>
                            <ListItemText primary='manage listings' />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon> <i class="fas fa-comments fa-2x"></i></ListItemIcon>
                            <ListItemText primary='messages' />
                        </ListItem>
                        <ListItem button onClick={this.handleLogOut}>
                            <ListItemIcon> <i class="fas fa-sign-out-alt fa-2x"></i></ListItemIcon>
                            <ListItemText primary='log out' />
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />

                </main>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(logOut())
    }
}


Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard));