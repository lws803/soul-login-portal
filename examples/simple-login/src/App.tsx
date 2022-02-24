import React from 'react';
// import axios from 'axios';

import './App.css';

function App() {
  const platformId = 2;
  const callback = 'https://www.example.com';
  // TODO: Create one platform with localhost:3000 setup as callback url

  return (
    <div className="App">
      <button
        style={{ marginTop: '200px' }}
        onClick={() => {
          if (window?.open !== undefined) {
            window.open(
              `https://login.soul-network.com/?platformId=${platformId}&callback=${callback}`,
              '_self',
            );
          }
        }}
      >
        Login with Soul
      </button>
    </div>
  );
}

export default App;
