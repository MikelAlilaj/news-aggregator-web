import apiClient from './ApiClient';

const dataCache = {
    authors: null,
    categories: null,
    sources: null,
    userPreferences: null,
};

const formatData = (data) =>
    data.map(({ id, name }) => ({
        value: id,
        label: name,
    }));

const formatNestedData = (data, nestedKey) =>
    data.map(item => ({
        value: item[nestedKey].id,
        label: item[nestedKey].name,
    }));

const dataService = {
    getAuthors: async (update = false) => {
        if (!update && dataCache.authors) return dataCache.authors;
        const response = await apiClient.get('/authors');
        dataCache.authors = formatData(response.data); 
        return dataCache.authors;
    },

    getCategories: async (update = false) => {
        if (!update && dataCache.categories) return dataCache.categories;
        const response = await apiClient.get('/categories');
        dataCache.categories = formatData(response.data);
        return dataCache.categories;
    },

    getSources: async (update = false) => {
        if (!update && dataCache.sources) return dataCache.sources;
        const response = await apiClient.get('/sources');
        dataCache.sources = formatData(response.data);
        return dataCache.sources;
    },

    getUserPreferences: async (update = false) => {
        if (!update && dataCache.userPreferences) return dataCache.userPreferences;
        const response = await apiClient.get('/user-preference');
        const { authors, categories, sources } = response.data.data;
        dataCache.userPreferences = {
            authors: formatNestedData(authors, 'author'),
            categories: formatNestedData(categories, 'category'),
            sources: formatNestedData(sources, 'source'),
        };
        return dataCache.userPreferences;
    },

    updateUserPreferences: async (preferences) => {
        const response = await apiClient.patch('/user-preference', preferences);
        return response.data;
    },

    getPersonalizedNews: async (page) => {
        const response = await apiClient.get(`personalized-news?page=${page}`);
        return response.data; 
    },

    getNews: async (params) => {
        const queryParams = new URLSearchParams(params).toString();
        const response = await apiClient.get(`news?${queryParams}`);
        return response.data;
    },
};

export default dataService;
