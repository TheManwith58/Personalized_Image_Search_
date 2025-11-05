import React from 'react';
import './ImageCard.css'; // Import our new CSS

const ImageCard = ({ image, onSelect, isSelected }) => {
    // This function calls the onSelect prop, passing the entire image object up
    const handleClick = () => {
        onSelect(image);
    };

    // Add or remove the 'selected' class based on the isSelected prop
    const checkboxClassName = `image-card-checkbox ${isSelected ? 'selected' : ''}`;

    return (
        <div className="image-card" onClick={handleClick}>
            <img 
                src={image.urls.small} 
                alt={image.alt_description} 
            />
            <div className={checkboxClassName}></div>
        </div>
    );
};

export default ImageCard;