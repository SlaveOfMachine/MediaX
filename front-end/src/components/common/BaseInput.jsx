import React from 'react';
import Icon from '@mdi/react';

class BaseInput extends React.Component {
    state =  {
        showPassword: null,
    }

    handleChange = (event) => {
        if (this.props.onInputChange) {
            this.props.onInputChange(event);
        }
    }

    checkEnterPressed = (event) => {
        const key = event.code;
        if (key === 'Enter') {
            if (this.props.onEnterPressed) {
                this.props.onEnterPressed();
            }
        }
    }

    iconEvent = (e) => {
        if (this.props.eventTriggered) {
            this.props.eventTriggered(e);
        }
    }

    render() {
        const {
            className,
            placeholder,
            name,
            type,
            value,
            error,
            toggleIcon,
            label,
            id,
            disabled,
        } = this.props;

        const { showPassword } = this.state;

        return (
            <div style={{position: 'relative'}}>
                <label htmlFor={id}>{ label }</label>
                <div className="base-input-container" style={{position: 'relative'}}>
                    <input
                        className={`${className || 'base-input'} ${ error ? 'fail-border' : '' }`}
                        placeholder={placeholder}
                        name={name}
                        id={id}
                        type={showPassword ? 'text' : type}
                        value={value}
                        onChange={this.handleChange}
                        onKeyPress={this.checkEnterPressed}
                        disabled={disabled}
                    />
                    <ShowToggle
                        event={this.iconEvent}
                        toggleIcon={toggleIcon}
                    />
                </div>
                <div className="error-message">
                    { error }
                </div>
            </div>
        )
    }
}

function ShowToggle(props) {
    const iconContainer = require('@mdi/js/mdi');
    const icon = iconContainer[props.toggleIcon] || iconContainer.mdiAlertCircle;
    if (props.toggleIcon) {
        return <div onClick={props.event} className='base-input-toggle'>
            <Icon path={icon} size={1} />
        </div>
    }
    return null;
}

export default BaseInput;