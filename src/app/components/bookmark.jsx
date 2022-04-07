import React from 'react';

const Bookmark = (props) => {    
    const userId = props.id;
    const boolean = props.state;
    let bookmarkClass = '';
    if (boolean) {
        bookmarkClass = 'bi bi-bookmark-fill';
    } else {
        bookmarkClass = 'bi bi-bookmark';
    }
    return (
        <i className={bookmarkClass} onClick={() => props.onBookmark(userId)}></i>
    );
}

export default Bookmark;