import React from 'react';
import BaseHelper from '../components/common/BaseHelper';
import { BaseCard } from '../components/common/BaseLayoutFeatures';
import { connect } from 'react-redux';
import { getMediaCounts } from '../store/actions/mediaActions';

class Dashboard extends BaseHelper {
    componentDidMount() {
        this.getAnalytics();
    }

    getAnalytics() {
        this.props.mediaCount();
        console.log(localStorage.getItem('accessToken').length);
    }

    render() {
        const { videos, audios, slides, collections } = this.props.counts;
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

const mapStateToProps = (state) => ({
    counts: state.media.counts,
})

const mapDispatchToProps = (dispatch) => ({
    mediaCount: () => {
        dispatch(getMediaCounts())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);