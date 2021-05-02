import React from 'react';
import BaseHelper from '../components/common/BaseHelper';
import axios from 'axios';

class Dashboard extends BaseHelper {

    state = {
        authPage: true,
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                { localStorage.getItem('accessToken') }
            </div>
        )
    }

}

export default Dashboard;