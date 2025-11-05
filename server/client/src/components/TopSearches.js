import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopSearches = ({ onTermClick }) => {
    const [topSearches, setTopSearches] = useState([]);

    useEffect(() => {
        const fetchTop = async () => {
            try {
                const res = await axios.get('/api/top-searches');
                setTopSearches(res.data);
            } catch (err) {
                console.error("Could not fetch top searches", err);
            }
        };

        fetchTop();
    }, []); 

    if (topSearches.length === 0) {
        return null; 
    }

    return (
        <div style={styles.banner}>
            <strong style={{color: '#ff00ff', textShadow: '0 0 3px #ff00ff'}}>Top Searches: </strong>
            {topSearches.map((search, index) => (
                // --- THIS IS THE FIX ---
                // We changed <a> to <button> for accessibility
                <button 
                    key={search.term} 
                    style={styles.term}
                    onClick={() => onTermClick(search.term)}
                >
                    {search.term}
                    {index < topSearches.length - 1 ? ',' : ''}
                </button>
                // --- END FIX ---
            ))}
        </div>
    );
};

const styles = {
    banner: {
        width: '100%',
        padding: '10px 15px',
        backgroundColor: 'rgba(10, 20, 30, 0.9)',
        border: '1px solid #00ffff', // Cyan border
        borderRadius: 0,
        textAlign: 'center',
        marginBottom: '20px',
    },
    // --- THIS IS THE UPDATED STYLE ---
    term: {
        // Reset button styles
        background: 'transparent',
        border: 'none',
        padding: 0,

        // Add back cyberpunk link styles
        fontFamily: "'Turret Road', sans-serif", // Match font
        color: '#00ffff', // Cyan color
        textDecoration: 'none',
        transition: 'all 0.2s ease',

        // Original styles
        marginLeft: '5px',
        cursor: 'pointer',
        fontWeight: '700',
    }
};

export default TopSearches;