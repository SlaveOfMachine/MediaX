import { BaseButton } from '../../components/common/BaseLayoutFeatures';
import { connect } from 'react-redux';
import { resendVerificationMail } from '../../store/index';

function VerificationPending({user, resendMail}) {
    return (
        <div className='verification-container'>
            <div className="verification-content">
                <div className="verificaton-text">
                    We have sent an verification email to&nbsp;
                    <span className='highlighted-text'>{user.email || 'your email'}</span>.
                </div>
                <div className="verificaton-text">
                    Please confirm to gain access to your account.
                </div>
                <div className="verification-control">
                    <BaseButton
                        title='Resend'
                        type='primary'
                        clicked={resendMail}
                    />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user,
})

const mapDispatchToProps = dispatch => ({
    resendMail: () => {
        dispatch(resendVerificationMail());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(VerificationPending);