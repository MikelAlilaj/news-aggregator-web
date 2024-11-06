import React from 'react';

const NewsCard = ({ article }) => {
    return (
        <div className="col-lg-4 col-md-6">
            <div className="card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-dark">{article.title}</h5>
                    <p className="card-subtitle text-muted small mb-2">
                        {article.category.name} | {new Date(article.published_at).toLocaleDateString()}
                    </p>
                    <p className="card-text mb-3">
                        <strong>Source:</strong> {article.source.name} <br />
                        <strong>Author:</strong> { article.authors.length > 0
                            ? article.authors.map(author => author.name).join(', ')
                            : "Unknown"}
                    </p>
                    <p className="card-text text-secondary mb-4">
                        {article.content.substring(0, 100)}...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
