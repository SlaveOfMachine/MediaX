import axios from 'axios';
import BaseHelper from '../../components/common/BaseHelper';

function VerificationProcess(props) {
    VerifyEmail(props);
    return (
        <div className='verification-container'>
            <div className="verification-content">
                <div className="verificaton-text">
                    Verifying your email, please wait...
                </div>
            </div>
        </div>
    )
}

function VerifyEmail(props) {
    const hash = props.match.params.hash;
    if (hash) {
        const user = JSON.parse(localStorage.getItem('user'));
        axios.get(`auth/verify-email/${user.id}/${hash}`, { headers: { noLoading: true } })
            .then(response => {
                if (!response.data.success) {
                    const messageContainer = document.querySelector('.verificaton-text');
                    if (messageContainer) {
                        messageContainer.innerHTML = response.data.message;
                    }
                    return false;
                }
                const helper = new BaseHelper();
                return helper.handleAuthResponse(response);
            }).catch(error => {
                console.log(error);
            });
    }
}

export default VerificationProcess;