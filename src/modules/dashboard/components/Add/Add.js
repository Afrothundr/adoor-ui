import React from 'react';
import './Add.scss';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddLocation from './Add-Location/Add-Location';
import AddDetails from './Add-Details/Add-Details';
import AddDescription from './Add-Description/Add-Description';
import { connect } from 'react-redux';
import { createListing } from '../../redux/actions/dashboard.actions';


const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: '#fafafa',
        boxShadow: 'none'
    },
});

class Add extends React.Component {
    constructor() {
        super();
        this.state = {
            tabIndex: 0,
            location: {},
            details: {},
            description: {},
            isFormValid: false
        }
    }

    addLocationRef = React.createRef();
    addDetailsRef = React.createRef();
    addDescriptionRef = React.createRef();


    handleChange = (event, tabIndex) => {
        let currentIndex = this.state.tabIndex;
        switch (currentIndex) {
            case 0 : {
                this.addLocationRef.current.parentSubmit();
                break;
            }
            case 2 : {
                currentIndex = 1;
                 break; 
            }
            default: {
                console.log('out of index');
            }
        }
        this.setState({ tabIndex: currentIndex + 1 });
    };

    handleLocationSubmit = location => {
        let currentIndex = this.state.tabIndex;
        console.log(location);
        this.setState({
            location,
            tabIndex: currentIndex + 1
        });
    }


    handleDetailsSubmit = details => {
        let currentIndex = this.state.tabIndex;
        this.setState({
            details,
            tabIndex: currentIndex + 1
        });
    }

    handleDescriptionSubmit = description => {
        this.setState({
            description
        });
        console.log({
            ...this.state.location,
            ...this.state.details,
            ...this.state.description
        })

        this.props.createListing({
            ...this.state.location,
            ...this.state.details,
            ...this.state.description
        });
    }

    handleValidCheck = result => {
        this.setState({
            isFormValid: result
        })
    }


    render() {
        const { tabIndex } = this.state;

        return (
            <div className="add-container">
                <AppBar position="static" color="default">
                    <Tabs
                        value={tabIndex}
                        onChange={this.handleChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                        className="wrapper"
                    >
                        <Tab label="where's it at?" icon={<i className="fas fa-map-marker-alt fa-2x"></i>} className={tabIndex === 0 ? 'active-tab' : ''} disabled={true} />
                        <Tab label="what's inside?" icon={<i className="fas fa-home fa-2x"></i>} className={tabIndex === 1 ? 'active-tab' : ''} disabled={true} />
                        <Tab label="what's it look like?" icon={<i className="fas fa-images fa-2x"></i>} className={tabIndex === 2 ? 'active-tab' : ''} disabled={true} />
                        <Tab label={`next: ${tabIndex}`} id="add-container-action" className={!this.state.isFormValid ? 'tab-disabled' : ''} disabled={!this.state.isFormValid} />
                    </Tabs>
                </AppBar>
                <article>
                    {tabIndex === 0 && <AddLocation
                                            handleSubmit={this.handleLocationSubmit} 
                                            isFormValid={this.handleValidCheck}
                                            ref={this.addLocationRef}
                                             />}
                    {tabIndex === 1 && <AddDetails
                                            handleSubmit={this.handleDetailsSubmit} 
                                            isFormValid={this.handleValidCheck}
                                            ref={this.addDetailsRef}
                                             />}
                    {tabIndex === 2 && <AddDescription
                                            handleSubmit={this.handleDescriptionSubmit} 
                                            isFormValid={this.handleValidCheck}
                                            ref={this.addDescriptionRef}
                                            profileId={this.props.profileId}
                                             />}
                </article>
            </div>
        )
    }
}

Add.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        profilePending: state.dashboardReducer.profilePending,
        profileLoadFailed: state.dashboardReducer.profileLoadFailed,
        profile: state.dashboardReducer.profile
    }
}
const mapDispatchToProps = dispatch => {
    return {
        createListing: listing => dispatch(createListing(listing)),
        // logOut: () => dispatch(logOut()),
        // clearProfile: () => dispatch(clearProfile())
    }
}

export default withStyles(styles, { withTheme: true })(connect(
    mapStateToProps,
    mapDispatchToProps)(Add));
