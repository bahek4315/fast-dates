import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({ label, name, value, onChange, error }) => {
    const getInputClasses = () => {
        return 'form-control' + (error ? ' is-invalid' : '');
    };
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <textarea
                    name={name}
                    id={name}
                    value={value}
                    onChange={handleChange}
                    autoComplete="off"
                    className={getInputClasses()}
                />

                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextField.defaultProps = {
    type: 'text'
};

TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextField;
