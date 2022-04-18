import React from 'react';
import PropTypes from 'prop-types';

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    if (items.length === 0) return <ul className="list-group"></ul>;
    if (!Array.isArray(items)) {
        return (
            <ul className="list-group">
                {Object.keys(items).map((item) => (
                    <li
                        className={
                            'list-group-item' +
                            (items[item] === selectedItem ? ' active' : '')
                        }
                        key={items[item][valueProperty]}
                        onClick={() => onItemSelect(items[item])}
                        role="button"
                    >
                        {items[item][contentProperty]}
                    </li>
                ))}
            </ul>
        );
    } else {
        return (
            <ul className="list-group">
                {items.map((item) => (
                    <li
                        className={
                            'list-group-item' +
                            (item._id === selectedItem?._id ? ' active' : '')
                        }
                        key={item._id}
                        onClick={() => onItemSelect(item)}
                        role="button"
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        );
    }
};
GroupList.defaultProps = {
    valueProperty: '_id',
    contentProperty: 'name'
};
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};

export default GroupList;
