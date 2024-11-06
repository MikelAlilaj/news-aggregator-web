import React from 'react';
import Select from 'react-select';

const FilterForm = ({
    keyword,
    date,
    category,
    source,
    categories,
    sources,
    setKeyword,
    setDate,
    setCategory,
    setSource,
    handleSearchSubmit
}) => {
    return (
        <form onSubmit={handleSearchSubmit} className="row g-3 mb-4 align-items-end">
            <div className="col-lg-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>
            <div className="col-lg-2">
                <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div className="col-lg-3">
                <Select
                    options={categories}
                    value={category}
                    onChange={setCategory}
                    placeholder="Category"
                    isClearable
                    isSearchable
                />
            </div>
            <div className="col-lg-3">
                <Select
                    options={sources}
                    value={source}
                    onChange={setSource}
                    placeholder="Source"
                    isClearable
                    isSearchable
                />
            </div>
            <div className="col-lg-1 p-0">
                <button type="submit" className="btn btn-primary w-100">Search</button>
            </div>
        </form>
    );
};

export default FilterForm;
