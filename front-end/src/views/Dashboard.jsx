import React from 'react';
import BaseHelper from '../components/common/BaseHelper';
import axios from 'axios';
import { BaseCard } from '../components/common/BaseLayoutFeatures';

class Dashboard extends BaseHelper {
    state = {
        collections: 0,
        videos: 0,
        audios: 0,
        slides: 0,
    }
    componentDidMount() {
        this.getAnalytics();
    }

    getAnalytics() {
        axios.get('analytics?count_only=true')
            .then(response => {
                this.setState(response.data.collectionData);
            }).catch(error => console.log(error))
    }

    render() {
        const { videos, audios, slides, collections } = this.state;
        return (
            <div className='dashboard-container'>
                <div className="upper-section">
                    <div className="dashboard-cards">
                        <BaseCard title='Collections' count={collections} />
                        <BaseCard title='Videos' count={videos} />
                        <BaseCard title='Slides' count={audios} />
                        <BaseCard title='Audios' count={slides} />
                    </div>
                </div>
            </div>
        )
    }

}

export default Dashboard;