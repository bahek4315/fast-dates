import React from 'react';

const Bookmark = (props) => {    
    const userId = props.id;
    const boolean = props.state;
    if (boolean) {
        return (
            <i className="bi bi-bookmark-fill" onClick={() => props.onBookmark(userId)}></i>
        );
    } else {
        return (
            <i className="bi bi-bookmark" onClick={() => props.onBookmark(userId)}></i>
        );
    }
}

export default Bookmark;