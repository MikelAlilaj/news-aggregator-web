import React, { useEffect, useState } from 'react';
import dataService from '../services/DataService';
import { useLoading } from '../context/LoadingContext';
import NewsList from '../components/News/NewsList';

const PersonalizedNews = () => {
    const { setLoading } = useLoading();
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPersonalizedNews = async (selectedPage = 1) => {
        
        setLoading(true);
        const newsResponse = await dataService.getPersonalizedNews(selectedPage);

        setNews(newsResponse.data);
        setPage(newsResponse.current_page);
        setTotalPages(newsResponse.total_pages);
        
        setLoading(false);
    };

    useEffect(() => {
        fetchPersonalizedNews(page);
    }, [page]);

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-5">Personalized News</h2>
            <NewsList news={news} totalPages={totalPages} onPageChange={handlePageClick} />
        </div>
    );
};

export default PersonalizedNews;
