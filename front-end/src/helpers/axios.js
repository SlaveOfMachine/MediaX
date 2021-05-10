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
    const messageContainer = document.querySelector('.axios-message-container');
    if (messageContainer) {
        const errorData = error.response ? error.response.data : null;
        const message = errorData && errorData.message ? errorData.message : error;
        if (message) {
            const messageElement = document.querySelector('.axios-message');
            if (messageElement) {
                messageElement.innerHTML = message;
            }
        }
        if (messageContainer.style.display !== 'block') {
            messageContainer.style.display = 'block';
            setTimeout(() => {
                messageContainer.style.display = 'none';
            }, 3000);
        }
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