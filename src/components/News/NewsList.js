import React from 'react';
import NewsCard from './NewsCard';
import Pagination from '../Pagination';

const NewsList = ({ news, totalPages, onPageChange }) => {
    return (
        <>
            <div className="row g-4">
                {news.map((article) => (
                    <NewsCard key={article.id} article={article} />
                ))}
            </div>
            {news.length > 0 && (
                <Pagination pageCount={totalPages} onPageChange={onPageChange} />
            )}
        </>
    );
};

export default NewsList;
