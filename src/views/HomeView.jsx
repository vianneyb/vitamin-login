import React from 'react';
import {Link} from 'vitaminjs/react-router';
import { compose } from 'ramda';
import { withStyles } from 'vitaminjs';
import s from '../style.css';

const HomeView = () => (
    <div>
        <h1>Vitamin login</h1>
        <p>Access to <Link to='/protected'>protected content.</Link></p>
    </div>
);

HomeView.propTypes = {};



export default compose(
    withStyles(s),
)(HomeView);


