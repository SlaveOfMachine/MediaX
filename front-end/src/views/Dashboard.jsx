import React from 'react';
import BaseHelper from '../components/common/BaseHelper';
import axios from 'axios';

class Dashboard extends BaseHelper {

    state = {
        authPage: true,
    }

    componentDidMount() {
        localStorage.removeItem('accessToken');
    }

    render() {
        return (
            <div>
                Dashboard
            </div>
        )
    }

}

export default Dashboard;