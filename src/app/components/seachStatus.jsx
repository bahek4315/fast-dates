import React from 'react';

const SeachStatus = (props) => {
    const number = props.quantity;

    let phrase = '';
    if (Number(`${number}`.slice(-2)) >= 11 && Number(`${number}`.slice(-2)) <= 19) {
        phrase = `${number} человек`
    } else if (Number(`${number}`.slice(-1)) >= 2 && Number(`${number}`.slice(-1)) <= 4) {
        phrase = `${number} человека`
    } else if (`${number}`.slice(-1) === '1') {
        phrase = `${number} человек`
    } else if (number === 0) {
        return (
            <h2>
                <span className="badge bg-danger">Никто с тобой не тусанет</span>
            </h2>
        );
    } else {
        phrase = `${number} человек`
    }

    return (
        <h2>
            <span className="badge bg-primary">{phrase} тусанет с тобой сегодня</span>
        </h2>);
}

export default SeachStatus;