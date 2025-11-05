import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageList from './ImageList'; 
import TopSearches from './TopSearches'; 
import './SearchPage.css'; // <-- Import the new responsive CSS

const SearchPage = () => {
    // --- State Variables ---
    const [term, setTerm] = useState(''); 
    const [results, setResults] = useState([]); 
    const [history, setHistory] = useState([]); 
    const [message, setMessage] = useState(''); // Clear initial message
    const [selectedImages, setSelectedImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // <-- ADDED loading state

    // --- Data Fetching ---
    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        const res = await axios.get('/api/history');
        setHistory(res.data);
    };

    // --- Event Handlers ---
    const onSearchSubmit = async (event, passedTerm) => {
        event.preventDefault(); 
        const searchTerm = passedTerm || term; // Use passedTerm if it exists
        if (!searchTerm) return;

        setIsLoading(true); // Set loading true
        setMessage(''); // Clear old message
        setResults([]); // Clear old results
        setSelectedImages([]); // Clear old selection
        
        try {
            const res = await axios.post('/api/search', { term: searchTerm });
            
            setIsLoading(false); // Set loading false
            setResults(res.data);
            
            // Set a message ONLY if there are no results
            if (res.data.length === 0) {
                setMessage(`No results found for '${searchTerm}'`);
            }
            
            fetchHistory();
            setTerm(searchTerm); // Set term in bar in case it was clicked
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            setMessage('Search failed. Please try again.');
        }
    };

    // This function allows TopSearches to trigger a search
    const searchFromTerm = (termFromBanner) => {
        setTerm(termFromBanner); // Set the search bar text
        // Create a synthetic event to pass to onSearchSubmit
        onSearchSubmit({ preventDefault: () => {} }, termFromBanner);
    };

    const toggleSelectImage = (image) => {
        const imageId = image.id;
        
        if (selectedImages.includes(imageId)) {
            setSelectedImages(currentSelected => 
                currentSelected.filter(id => id !== imageId)
            );
        } else {
            setSelectedImages(currentSelected => 
                [...currentSelected, imageId]
            );
        }
    };

    // --- Render ---
    return (
        <div>
            <TopSearches onTermClick={searchFromTerm} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Image Search</h1>
                <a href="/api/logout">Logout</a>
            </div>

            <form onSubmit={onSearchSubmit}>
                <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Search for images..."
                    style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
            </form>

            {/* Use the new responsive CSS classes */}
            <div className="search-page-layout">
                <div className="search-main-content">
                    <h3>Selected: {selectedImages.length} images</h3>
                    
                    {/* --- Improved Loading/Empty State --- */}
                    {isLoading && <p>Loading images...</p>}
                    {!isLoading && message && <p>{message}</p>}
                    
                    {!isLoading && results.length > 0 && (
                        <ImageList 
                            results={results}
                            selectedImages={selectedImages}
                            onImageSelect={toggleSelectImage}
                        />
                    )}
                </div>

                <div className="search-sidebar">
                    <h3>Search History</h3>
                    <ul style={{listStyle: 'none', paddingLeft: 0}}>
                        {history.map(item => (
                            <li key={item._id} style={{marginBottom: '10px'}}>
                                <div><strong>{item.term}</strong></div>
                                <div style={{fontSize: '0.8em', color: '#777'}}>
                                    {new Date(item.timestamp).toLocaleString()}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;