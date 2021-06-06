import React from 'react';
import { BaseButton } from './BaseLayoutFeatures';

class BaseConfirmModal extends React.Component {
    handleClose = () => {
        const content = document.querySelector('.base-modal-content');
        if (content) {
            content.classList.add('slide-down');
            return setTimeout(() => {
                this.props.close();
            }, 300);
        }
        return this.props.close();
    }

    handleConfirm = () => {
        this.props.confirm();
    }

    render() {
        const {
            title,
            description,
            confirmButtonText,
            cancelButtonText,
            loading,
        } = this.props;
        return (
            <div className='base-modal-container'>
                <div className="base-modal-content smooth-shadow slide-up">
                    <div className="base-modal-head">
                        <div className="base-modal-title">
                            { title || 'Modal Title' }
                        </div>
                        <div className="base-modal-close-btn cursor-pointer" onClick={this.handleClose} >
                            X
                        </div>
                    </div>
                    <div className="base-modal-body">
                        <div className="base-modal-body-content">
                            <div className="base-modal-text">
                                { description || 'Modal Description' }
                            </div>
                        </div>
                    </div>
                    <div className="base-modal-foot">
                        <BaseButton
                            type='primary'
                            clicked={this.handleConfirm}
                            title={ confirmButtonText || 'Confirm' }
                            loading={ loading }
                        />
                        <BaseButton
                            type='warning'
                            clicked={this.handleClose}
                            title={ cancelButtonText || 'Cancel' }
                            loading={ loading }
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default BaseConfirmModal;