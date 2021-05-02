import React from 'react';
import BaseHelper from '../components/common/BaseHelper';
import axios from 'axios';
import { BaseCard } from '../components/common/BaseLayoutFeatures';

class Dashboard extends BaseHelper {
    state = {
        collections: 0,
        uploadedVideos: 0,
        uploadedAudios: 0,
        slides: 0,
        recordedVideos: 0,
        recordedAudios: 0,
    }
    componentDidMount() {
        // axios.get('analytics')
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(error => console.log(error))
    }
    render() {
        return (
            <div className='dashboard-container'>
                <div className="upper-section">
                    <div className="dashboard-cards">
                        <BaseCard title='Collections' count='0' />
                        <BaseCard title='Uploaded Videos' count='0' />
                        <BaseCard title='Uploaded Audios' count='0' />
                        <BaseCard title='Slides' count='0' />
                        <BaseCard title='Recorded Videos' count='0' />
                        <BaseCard title='Recoded Audios' count='0' />
                    </div>
                </div>
            </div>
        )
    }

}

export default Dashboard;