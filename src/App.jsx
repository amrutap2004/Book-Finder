import { useState } from 'react';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import { BookOpen, Search, AlertCircle, Meh } from 'react-feather';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const searchBooks = async (query, searchType = 'title') => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setSearchPerformed(true);
    
    try {
      // Map search types to Open Library's query parameters
      const searchParams = new URLSearchParams();
      if (searchType === 'title') {
        searchParams.append('title', query);
      } else if (searchType === 'author') {
        searchParams.append('author', query);
      } else if (searchType === 'subject') {
        searchParams.append('subject', query);
      }
      
      // Add fields we want to retrieve
      searchParams.append('fields', 'key,title,author_name,first_publish_year,cover_i,language,ratings_average,subject');
      searchParams.append('limit', '12');
      
      const response = await fetch(
        `https://openlibrary.org/search.json?${searchParams.toString()}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch books. Please try again later.');
      }
      
      const data = await response.json();
      setSearchResults(data.docs || []);
    } catch (err) {
      console.error('Error searching books:', err);
      setError(err.message || 'An error occurred while searching for books.');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-white/80 border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-primary-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              BookFinder
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Results count badge */}
          {searchPerformed && searchResults.length > 0 && (
            <div className="absolute -top-3 right-0 z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700 border border-primary-200 shadow-sm">
                <Search className="mr-1.5 h-4 w-4" />
                {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
              </div>
            </div>
          )}
          
          <div className="mb-10">
            <SearchBar onSearch={searchBooks} isLoading={isLoading} />
          </div>

          <div className="mt-8">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-primary-100 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-20 h-20 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Search className="w-8 h-8 text-primary-500 animate-pulse" />
                  </div>
                </div>
                <p className="text-lg font-medium text-gray-600">Searching for books...</p>
                <p className="text-sm text-gray-500">This may take a moment</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mb-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-6 w-6 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-base font-medium text-red-800">Error loading books</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : searchPerformed && searchResults.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-50 mb-6 border-2 border-dashed border-primary-200">
                  <Meh className="w-12 h-12 text-primary-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No books found</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  We couldn't find any books matching your search. Try different keywords or check your spelling.
                </p>
                <div className="space-x-3">
                  <button 
                    onClick={() => window.location.reload()}
                    className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    Start New Search
                  </button>
                  <button 
                    onClick={() => searchBooks('best sellers', 'title')}
                    className="px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-300 transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                  >
                    Show Bestsellers
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((book, index) => (
                  <BookCard 
                    key={`${book.key}-${index}`}
                    book={book} 
                    className="transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-16 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <BookOpen className="h-6 w-6 text-primary-500" />
              <span className="text-lg font-semibold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                BookFinder
              </span>
            </div>
            <div className="flex space-x-6">
              <a 
                href="https://openlibrary.org/developers/api" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Open Library API
              </a>
              <a 
                href="https://github.com/yourusername/book-finder" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 text-center md:flex md:items-center md:justify-between">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} BookFinder. Not affiliated with Open Library.
            </p>
            <div className="mt-4 md:mt-0 flex justify-center space-x-6">
              <p className="text-xs text-gray-500">
                Built with React, Vite & Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
