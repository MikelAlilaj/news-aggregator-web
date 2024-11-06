import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import dataService from '../services/DataService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';


const UserPreferences = () => {
    const { setLoading } = useLoading();
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSources, setSelectedSources] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);

        const [authorsData, categoriesData, sourcesData, userPreferencesData] = await Promise.all([
            dataService.getAuthors(),
            dataService.getCategories(),
            dataService.getSources(),
            dataService.getUserPreferences(),
        ]);

        setLoading(false);

        setAuthors(authorsData);
        setCategories(categoriesData);
        setSources(sourcesData);

        setSelectedAuthors(userPreferencesData.authors);
        setSelectedCategories(userPreferencesData.categories);
        setSelectedSources(userPreferencesData.sources);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSave = async () => {
        const preferences = {
            sources: selectedSources.map(option => option.value),
            categories: selectedCategories.map(option => option.value),
            authors: selectedAuthors.map(option => option.value),
        };

        await dataService.updateUserPreferences(preferences);
        dataService.getUserPreferences(true),
        toast.success("Preferences saved successfully!", {
            position: "top-center", 
        });
        navigate('/');
    };

    return (
        <div className="d-flex justify-content-center align-items-start min-vh-100 bg-light pt-5">
            <div className="card shadow-lg" style={styles.card}>
                <div className="card-body p-4 p-md-5">
                    <h2 className="card-title text-center mb-4">Select Your Preferences</h2>

                    {[
                        { label: "Authors", options: authors, value: selectedAuthors, onChange: setSelectedAuthors },
                        { label: "Categories", options: categories, value: selectedCategories, onChange: setSelectedCategories },
                        { label: "Sources", options: sources, value: selectedSources, onChange: setSelectedSources },
                    ].map(({ label, options, value, onChange }) => (
                        <div className="select-group mb-4" key={label}>
                            <h5 className="card-title">Select Your Preferred {label}</h5>
                            <Select
                                isMulti
                                options={options}
                                value={value}
                                onChange={onChange}
                                placeholder={`Select ${label.toLowerCase()}...`}
                                isSearchable
                                classNamePrefix="Select"
                            />
                        </div>
                    ))}

                    <button type="button" className="btn btn-primary w-100" onClick={handleSave}>
                        Save Preferences
                    </button>
                </div>
            </div>
        </div>
    );
};


const styles = {
    card: {
        maxWidth: '600px',
        width: '100%',
        borderRadius: '15px',
    },
};


export default UserPreferences;
