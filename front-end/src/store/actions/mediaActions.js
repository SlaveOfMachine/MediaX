import axios from '../../helpers/axios';
import {
    STORE_MEDIA_COUNT
} from '../actionTypes';

export const getMediaCounts = () => {
    return function (dispatch) {
        axios.get('analytics?count_only=true')
            .then(response => {
                dispatch({
                    type: STORE_MEDIA_COUNT,
                    payload: response.data.collectionData,
                })
            }).catch(error => console.error(error));
    }
}