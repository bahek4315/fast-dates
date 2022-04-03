import React from 'react';

const Quality = (props) => {
    const quality = props.quality;
    return <span className={`badge bg-${quality.color} mx-1`}>{quality.name}</span>
};

export default Quality;