import { routerStateReducer } from 'redux-react-router';
import { dataReducer } from './data';
import { authReducer } from './auth';

export default {
    router: routerStateReducer,
    data: dataReducer,
    auth: authReducer

};

