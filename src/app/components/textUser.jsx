import React from 'react';
import { useParams } from 'react-router-dom';

const Test = (p) => {
    console.log(p);
    const params = useParams();
    console.log(params);
    const { userId } = params;

    return <h3>{userId}</h3>;
};

export default Test;
