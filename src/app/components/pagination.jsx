import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({
    itemsCount,
    pageSize,
    onPageChange,
    currentPage,
    onPageDecrement,
    onPageIncrement
}) => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);
    return (
        <>
            <nav>
                <ul className="pagination">
                    <li
                        className={
                            'page-item' + (currentPage === 1 ? ' disabled' : '')
                        }
                        onClick={onPageDecrement}
                    >
                        <a href="#s" className="page-link">
                            Предыдущая
                        </a>
                    </li>
                    {pages.map((page) => (
                        <li
                            className={
                                'page-item' +
                                (page === currentPage ? ' active' : '')
                            }
                            key={'page_' + page}
                        >
                            <a
                                href="#s"
                                className="page-link"
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </a>
                        </li>
                    ))}
                    <li
                        className={
                            'page-item' +
                            (currentPage === pageCount ? ' disabled' : '')
                        }
                        onClick={onPageIncrement}
                    >
                        <a href="#s" className="page-link">
                            Следующая
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageDecrement: PropTypes.func.isRequired,
    onPageIncrement: PropTypes.func.isRequired
};

export default Pagination;
