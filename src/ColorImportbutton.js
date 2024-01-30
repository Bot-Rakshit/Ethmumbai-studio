import React, { useState } from 'react';
import ColorThief from 'colorthief';

const ColorImportButton = ({ onColorExtracted }) => {
  const [imageSrc, setImageSrc] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImageSrc(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const getColorFromImage = () => {
    const colorThief = new ColorThief();
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageSrc;

    img.onload = () => {
      try {
        const result = colorThief.getColor(img);
        const color = `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
        onColorExtracted(color);
      } catch (error) {
        console.error('Error extracting color', error);
      }
    };
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        id="fileInput"
        style={{ display: 'none' }}
      />
      <label htmlFor="fileInput" className="button">
        Import Colors from an Image
      </label>
      {imageSrc && <button onClick={getColorFromImage} className="button">Extract Color</button>}
    </div>
  );
};

export default ColorImportButton;
