import { connect } from 'react-redux';
import { verifyEmail } from '../../store';

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
        props.verifyEmail({
            user_id: props.user.id,
            hash,
        })
    }
}

const mapStateToProps = state => ({
    user: state.user,
})

const mapDispatchToProps = dispatch => ({
    verifyEmail: (payload) => {
        dispatch(verifyEmail(payload))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(VerificationProcess);