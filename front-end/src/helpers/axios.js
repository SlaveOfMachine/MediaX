import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

function toggleLoader(hide = false) {
    const loader = document.querySelector('.axios-loader-container');
    if (loader) {
        if (hide) {
            loader.style.display = 'none';
        } else {
            loader.style.display = 'block';
        }
    }
}

function toggleMessage(error = null) {
    const errorData = error.response ? error.response.data : null;
    const message = errorData && errorData.message ? errorData.message : error;
    if (message) {
        window.$alertMessage(message);
    }
}

axios.interceptors.request.use((config) => {
    if (!config.headers.noLoading) toggleLoader();
    const token = localStorage.getItem('accessToken');
    config.headers.common['authorization'] = `Bearer ${token}`;
    config.url = `${baseUrl}/api/${config.url}`;
    return config;
}, (error) => {
    toggleLoader(true);
    toggleMessage(error);
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    toggleLoader(true);
    if (response.data.message && response.data.showMessage) {
        toggleMessage(response.data.message);
    }
    return response;
}, (error) => {
    toggleLoader(true);
    toggleMessage(error);
    const authError = error.response.status === 401;
    if (authError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
    }
    return Promise.reject(error);
});

export default axios;