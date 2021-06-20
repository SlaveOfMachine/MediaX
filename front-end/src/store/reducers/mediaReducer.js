import {
    STORE_MEDIA_COUNT
} from '../actionTypes';

const INITIAL_STATE = {
    collections: [],
    videos: [],
    audios: [],
    slides: [],
    counts: {},
}

const MediaReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case STORE_MEDIA_COUNT:
            return {
                ...state,
                counts: action.payload,
            }
        default:
            return { ...state }
    }
}

export default MediaReducer;