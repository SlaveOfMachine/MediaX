import React from 'react';
import BaseHelper from '../components/common/BaseHelper';
import axios from 'axios';

class Dashboard extends BaseHelper {

    state = {
        authPage: true,
    }

    componentDidMount() {
        // localStorage.removeItem('accessToken');
    }

    render() {
        return (
            <div className='dasboard-container'>
                <div className="base-card smooth-shadow">
                    You are logged in!
                </div>
            </div>
        )
    }

}

export default Dashboard;