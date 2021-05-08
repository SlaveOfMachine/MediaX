import React from 'react';

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
            toggleText,
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
                        toggleText={toggleText}
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
    if (props.toggleText) {
        return <div onClick={props.event} className='base-input-toggle'>
            { props.toggleText }
        </div>
    }
    return null;
}

export default BaseInput;