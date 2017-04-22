import { loginUser } from '../actions';
import { Component } from 'react';
import { compose } from 'ramda';
import { connect } from 'vitaminjs/react-redux';

export class LoginView extends Component {

    constructor(props) {
        super(props);
        const redirectRoute = this.props.location.query.next || '/login';
        this.state = {
            email: 'aa',
            password: '',
            redirectTo: redirectRoute
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.loginUser(this.state.email, this.state.password, this.state.redirectTo);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />
                    <input type="text" name="password" value={this.state.password} onChange={this.handleInputChange} />
                </label>
                <input type="submit" value="Submit" disabled={this.props.isAuthenticating} />
            </form>
        );
    }

}


const mapStateToProps = (state) => ({
    isAuthenticating   : state.auth.isAuthenticating,
    statusText         : state.auth.statusText
});



export default compose(
    connect(mapStateToProps, {
        loginUser
    }),
)(LoginView);