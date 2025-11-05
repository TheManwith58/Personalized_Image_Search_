import React from 'react';
import './ImageList.css'; // Import grid CSS
import ImageCard from './ImageCard'; // Import card component

const ImageList = ({ results, onImageSelect, selectedImages }) => {
    return (
        <div className="image-list">
            {results.map(image => {
                // Check if this image's ID is in the selectedImages array
                const isSelected = selectedImages.includes(image.id);
                
                return (
                    <ImageCard 
                        key={image.id}
                        image={image}
                        onSelect={onImageSelect} // Pass the select function down
                        isSelected={isSelected} // Pass the selection status down
                    />
                );
            })}
        </div>
    );
};

export default ImageList;