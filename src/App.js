import React, { useState, useRef } from 'react';
import { HexColorPicker } from 'react-colorful';
import { toPng, toSvg } from 'html-to-image';
import './App.css';
import 'react-colorful';

function App() {
  const [selectedPathId, setSelectedPathId] = useState(null);
  const [color, setColor] = useState('#ffffff');
  const [pathColors, setPathColors] = useState({
    rect: "#000000",
    path1: "#F89D21",
    path2: "white",
    path3: "white",
    path4: "#F89D21"
  });
  const svgRef = useRef();

  const handlePathClick = (pathId) => {
    setSelectedPathId(pathId);
    setColor(pathColors[pathId]);
  };

  const handleColorChange = (color) => {
    setColor(color);
    setPathColors({ ...pathColors, [selectedPathId]: color });
  };

  const applyColor = () => {
    setSelectedPathId(null); 
  };

  const downloadAsSvg = () => {
    if (svgRef.current) {
      toSvg(svgRef.current, { cacheBust: true })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'ethMumbaiLogo.svg';
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error('Could not download SVG', err);
        });
    }
  };

  const downloadAsPng = () => {
    if (svgRef.current) {
      toPng(svgRef.current, { cacheBust: true })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'ethMumbaiLogo.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error('Could not download PNG', err);
        });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>EthMumbai Studio</h1>
        <p>Rakshit Singh</p>
        <p>
  <a href="https://twitter.com/Ra1kshit" 
     target="_blank" 
     rel="noopener noreferrer" 
     className="twitter-link">@Ra1kshit</a>
</p>
      </header>
      <main>
        <div className="main-content">
          {selectedPathId && (
            <div className="instructions">
              <p>Select the component on the logo to change its color.</p>
              <HexColorPicker color={color} onChange={handleColorChange} />
              <button className="button" onClick={applyColor}>Apply Color</button>
            </div>
          )}
          <div className="svg-container" ref={svgRef}>
          <svg
            width="2400"
            height="2400"
            viewBox="0 0 2400 2400"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect id="rect" width="2400" height="2400" fill={pathColors.rect} onClick={() => handlePathClick('rect')} />
            <path id="path1" d="M1185.6 294.398L1758 1216L1196.4 1548.4L642 1210L1185.6 294.398Z" fill={pathColors.path1} onClick={() => handlePathClick('path1')} />
            <path id="path2" d="M1196.41 2105.2L1755.61 1319.2L1198.81 1649.2L645.609 1327.6L1196.41 2105.2Z" fill={pathColors.path2} onClick={() => handlePathClick('path2')} />
            <path id="path3" d="M1186.79 456.398L1607.99 1166.8L1191.59 1428.4L788.391 1166.8L1186.79 456.398Z" fill={pathColors.path3} onClick={() => handlePathClick('path3')} />
            <path id="path4" d="M1198.8 1992.4L1486.8 1572.4L1205.75 1750L928.805 1603.6L1198.8 1992.4Z" fill={pathColors.path4} onClick={() => handlePathClick('path4')} />
          </svg>
          </div>
        </div>
        <div className="download-buttons">
          <button className="button" onClick={downloadAsSvg}>Download as SVG</button>
          <button className="button" onClick={downloadAsPng}>Download as PNG</button>
        </div>
      </main>
      <footer className="footer">
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default App;
