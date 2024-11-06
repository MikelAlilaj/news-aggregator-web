import React, { useEffect, useState } from 'react';
import dataService from '../services/DataService';
import { toast } from 'react-toastify';
import { useLoading } from '../context/LoadingContext';
import NewsList from '../components/News/NewsList';
import FilterForm from '../components/News/FilterForm';

const News = () => {
    const { setLoading } = useLoading();
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [keyword, setKeyword] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState(null);
    const [source, setSource] = useState(null);

    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);

    useEffect(() => {
        const fetchFilterOptions = async () => {
            const categories = await dataService.getCategories();  
            const sources = await dataService.getSources();
    
            setCategories(categories);
            setSources(sources);
        };

        fetchFilterOptions();
        fetchNews(1);
    }, []);

    const fetchNews = async (selectedPage = 1) => {
        
        setLoading(true);
        const params = {
            page: selectedPage,
            keyword,
            date,
            category: category?.value || '',
            source: source?.value || '',
        };
        const newsResponse = await dataService.getNews(params);

        setNews(newsResponse.data);
        setPage(newsResponse.current_page);
        setTotalPages(newsResponse.total_pages);
    
        setLoading(false);
         
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchNews(1);
    };

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        setPage(selectedPage);
        fetchNews(selectedPage);
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-5">News</h2>
            <FilterForm
                keyword={keyword}
                date={date}
                category={category}
                source={source}
                categories={categories}
                sources={sources}
                setKeyword={setKeyword}
                setDate={setDate}
                setCategory={setCategory}
                setSource={setSource}
                handleSearchSubmit={handleSearchSubmit}
            />
            <NewsList news={news} totalPages={totalPages} onPageChange={handlePageClick} />
        </div>
    );
};

export default News;
