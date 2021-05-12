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
    render() {
        const {
            title,
            description,
            confirmButtonText,
            cancelButtonText,
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
                            { description || 'Modal Description' }
                        </div>
                    </div>
                    <div className="base-modal-foot">
                        <BaseButton
                            type='primary'
                            title={ confirmButtonText || 'Confirm' }
                        />
                        <BaseButton
                            type='warning'
                            clicked={this.handleClose}
                            title={ cancelButtonText || 'Cancel' }
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default BaseConfirmModal;