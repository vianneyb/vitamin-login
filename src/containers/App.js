import { PropTypes } from 'react';
import { withStyles } from 'vitaminjs';
import Helmet from 'vitaminjs/react-helmet';
import s from '../style.css'
import { connect } from 'vitaminjs/react-redux';
import { compose} from 'ramda';


import {Navbar, NavBrand, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'vitaminjs/react-router';
import {logoutAndRedirect} from '../actions';

const App = ({isAuthenticated, logoutAndRedirect, children}) => (
    <div className={s.app}>
        <Helmet
            title="VitaminJS"
            meta={[
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            ]}
        />
        <nav className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/">React Redux JWT Auth Example</Link>
                </div>
                <div id="navbar">
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/protected">Protected Content</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        {isAuthenticated
                            ? <li><a href='#' onClick={logoutAndRedirect}>Logout</a> </li>
                            : ''
                        }
                    </ul>
                </div>
            </div>
        </nav>
        <div className='container'>
            <div className='row'>
                <div className='col-xs-12'>
                    {children}
                </div>
            </div>
        </div>
    </div>
);


App.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logoutAndRedirect: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

const mapStateToProps = (state) => {
    console.log(state,'auth');
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
};




const mapDispatchToProps = (dispatch) => ({
    logoutAndRedirect: (dispatch, state) => logoutAndRedirect(),

});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(s),
)(App);

