import { Component } from 'react';
import { connect } from 'vitaminjs/react-redux';
import { compose } from 'ramda';

import { fetchProtectedData } from '../actions';

export class ProtectedView extends Component {

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        let token = this.props.token;
        this.props.fetchProtectedData(token);
    }

    render() {
        return (
            <div>
                {this.props.isFetching === true
                    ? <h1>Loading data...</h1>
                    : <div>
                        <h1>Welcome back,
                            {this.props.userName}!</h1>
                        <h3>{this.props.data}</h3>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    data: state.data.data,
    isFetching: state.data.isFetching
});


export default compose(
    connect(mapStateToProps, { fetchProtectedData })
)(ProtectedView);