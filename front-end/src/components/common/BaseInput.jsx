import React from 'react';

class BaseInput extends React.Component {
    state =  {}

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

    render() {
        const {
            className,
            placeholder,
            name,
            type,
            value,
            error,

        } = this.props;
        return (
            <div>
                <input
                    className={`${className} ${ error ? 'fail-border' : '' }`}
                    placeholder={placeholder}
                    name={name}
                    type={type}
                    value={value}
                    onChange={this.handleChange}
                    onKeyPress={this.checkEnterPressed}
                />
                <div className="error-message">
                    { error }
                </div>
            </div>
        )
    }
}

export default BaseInput;