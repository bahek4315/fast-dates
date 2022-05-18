import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionsArray = [];
    if (!Array.isArray(options) && typeof options === 'object') {
        Object.keys(options).forEach((opt) => {
            optionsArray.push({
                label: options[opt].name,
                value: options[opt]._id
            });
        });
    } else {
        options.forEach((item) => optionsArray.push(item));
    }
    const handleChange = (value) => {
        onChange({ name: name, value });
    };
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                closeMenuOnSelect={false}
                isMulti
                defaultValue={defaultValue}
                name={name}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array
};

export default MultiSelectField;
