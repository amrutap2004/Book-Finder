import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'react-feather';

const SearchBar = ({ onSearch, isLoading }) => {
  const inputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('title');

  // Focus search input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm, searchType);
      // Blur input on search to hide mobile keyboard
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <Search className="h-5 w-5" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search by ${searchType}...`}
              className={`block w-full pl-10 pr-10 py-4 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
              disabled={isLoading}
              aria-label="Search for books"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label="Clear search"
              >
                <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              </button>
            )}
          </div>
          
          <div className="relative">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="appearance-none block w-full sm:w-40 px-4 py-4 text-base bg-white border border-gray-300 text-gray-900 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-all duration-200 cursor-pointer pr-10"
              disabled={isLoading}
              aria-label="Search type"
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="subject">Subject</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!searchTerm.trim() || isLoading}
            className={`px-6 py-4 border border-transparent text-base font-semibold rounded-xl shadow-sm text-white ${
              !searchTerm.trim() || isLoading
                ? 'bg-primary-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transform hover:-translate-y-0.5'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 flex-shrink-0`}
            aria-label="Search"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            ) : (
              <span className="flex items-center">
                <Search className="mr-2 h-5 w-5" />
                Search
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
