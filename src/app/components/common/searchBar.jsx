import React from 'react';
import PropTypes from 'prop-types';
const SearchBar = ({ onChange, value }) => {
    return (
        <input
            type="text"
            className="w-100"
            placeholder="Search..."
            onChange={onChange}
            value={value}
        />
    );
};

SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};

export default SearchBar;
