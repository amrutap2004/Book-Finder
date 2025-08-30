import React, { useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';

const BookCard = ({ book }) => {
  const [isHovered, setIsHovered] = useState(false);
  const coverId = book.cover_i;
  const coverUrl = coverId 
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` 
    : '/book-placeholder.png';
  
  const authors = book.author_name?.join(', ') || 'Unknown Author';
  const firstPublishYear = book.first_publish_year || 'N/A';
  const ratingsCount = book.ratings_average?.toFixed(1) || 'N/A';
  
  const description = book.first_sentence?.[0] || 
                    book.description?.[0]?.value || 
                    book.description || 
                    'No description available.';

  return (
    <div 
      className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform ${
        isHovered ? 'shadow-xl -translate-y-1' : 'hover:shadow-md'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent opacity-0 ${
        isHovered ? 'opacity-100' : ''
      } transition-opacity duration-300 pointer-events-none`}></div>
      
      <div className="md:flex h-full">
        <div className="md:flex-shrink-0 relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-4">
            <span className="text-white text-sm font-medium flex items-center">
              View Details <FiExternalLink className="ml-1 w-3 h-3" />
            </span>
          </div>
          <img 
            className={`h-56 w-full object-cover md:w-40 transition-transform duration-300 ${
              isHovered ? 'scale-105' : ''
            }`} 
            src={coverUrl} 
            alt={`${book.title} cover`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/book-placeholder.png';
            }}
          />
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2" title={book.title}>
              {book.title}
            </h3>
            <p className="mt-1 text-sm text-gray-600">By {authors}</p>
            
            <p className="mt-3 text-sm text-gray-600 line-clamp-3">
              {description}
            </p>
            
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <span>{firstPublishYear}</span>
              <span className="mx-2">•</span>
              <span>{ratingsCount} ★</span>
              {book.language && (
                <>
                  <span className="mx-2">•</span>
                  <span>{book.language[0]?.toUpperCase()}</span>
                </>
              )}
            </div>
            
            {book.subject && book.subject.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {book.subject.slice(0, 3).map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {tag.length > 15 ? `${tag.substring(0, 15)}...` : tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`https://openlibrary.org${book.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              View on Open Library
              <FiExternalLink className="ml-1.5 h-4 w-4" />
            </a>
            
            {book.isbn?.[0] && (
              <a
                href={`https://www.amazon.com/s?k=${book.isbn[0]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors duration-200"
              >
                Find on Amazon
                <svg className="ml-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19V6.413L11.207 14.207L9.793 12.793L17.585 5H13V3H21Z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
