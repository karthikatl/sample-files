import React from 'react';

import FileExplorer from './components/FileExplorer';
import './App.css';  // Assuming you have some global styles you want to apply
const App: React.FC = () => {
  return (
  
      <div className="App">
        <header className="App-header">
          <h1 data-testid="file-explorer">File Explorer</h1>
        </header>
        <FileExplorer />
      </div>

  );
}

export default App;
