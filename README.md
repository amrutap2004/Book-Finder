# 📚 BookFinder

A modern, responsive web application for discovering books using the Open Library API. Built with React, Vite, and Tailwind CSS, BookFinder provides an intuitive interface for searching books by title, author, or subject.

## ✨ Features

- **🔍 Advanced Search**: Search books by title, author, or subject
- **📱 Responsive Design**: Beautiful, mobile-first interface that works on all devices
- **🎨 Modern UI**: Clean, intuitive design with smooth animations and hover effects
- **📊 Rich Book Information**: Display book covers, authors, publication years, ratings, and subjects
- **🔗 External Links**: Direct links to Open Library and Amazon for more information
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and build times
- **🎯 Real-time Results**: Instant search results with loading states and error handling

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/book-finder.git
   cd book-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality
- `npm start` - Start the application (alias for dev)

## 🏗️ Project Structure

```
book-finder/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── BookCard.jsx    # Book display component
│   │   └── SearchBar.jsx   # Search interface
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite build configuration
└── README.md              # This file
```

## 🎨 Technologies Used

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: React Feather
- **API**: Open Library Search API
- **Development Tools**: ESLint, PostCSS, Autoprefixer

## 🔌 API Integration

BookFinder integrates with the [Open Library Search API](https://openlibrary.org/developers/api) to provide comprehensive book information. The application fetches:

- Book titles and authors
- Publication years
- Book covers
- Ratings and reviews
- Subject tags
- Language information

## 📱 Responsive Design

The application is built with a mobile-first approach and includes:

- Responsive grid layouts
- Touch-friendly interface elements
- Optimized mobile keyboard handling
- Adaptive search bar positioning

## 🎯 Search Functionality

### Search Types
- **Title Search**: Find books by their title
- **Author Search**: Discover books by specific authors
- **Subject Search**: Explore books by topic or genre

### Search Features
- Real-time search suggestions
- Loading states and progress indicators
- Error handling with user-friendly messages
- Search result count display
- Clear search functionality

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deployment Options
- **Netlify**: Drag and drop the `dist/` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use the `dist/` folder as the source
- **AWS S3**: Upload the `dist/` folder contents

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Open Library](https://openlibrary.org/) for providing the comprehensive book database API
- [React](https://reactjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the fast build tool

## 📧 Support

If you have any questions or need help with the application, please:

1. Check the [Issues](https://github.com/amrutap2004/book-finder/issues) page
2. Create a new issue with a detailed description
3. Include your operating system and browser information

---

**Happy Book Hunting! 📚✨**

