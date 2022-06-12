import React from 'react';
import { useQualities } from '../../hooks/useQualities';
import PropTypes from 'prop-types';
import Qualities from './qualities';

const QualitiesListServer = ({ qualities }) => {
    const { isLoading, getQuality } = useQualities();
    if (!isLoading) {
        const qualitiesObj = qualities.map((id) => getQuality(id));
        return <Qualities qualities={qualitiesObj} />;
    }
    return 'loading...';
};

QualitiesListServer.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesListServer;
