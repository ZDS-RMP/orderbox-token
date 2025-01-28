import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import './App.css';

function App() {
  const [token, setToken] = useState('');
  const [fetchedToken, setFetchedToken] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleFetchToken = async () => {
    try {
      const response = await fetch('https://api.staging.zonedeliveryservices.com/ondemand/v2/store/orderboxToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: 'a462522c5d6a01abd4ec57dda581d4f0',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch token');
      }

      const result = await response.json();

      if (result.response.success && result.data) {
        setToken(result.data);
        setFetchedToken(result.data);
      } else {
        throw new Error('Token not found in response');
      }
    } catch (error) {
      console.error('Error fetching token:', error);
      setFetchedToken('Error fetching token. Please try again.');
    }
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(fetchedToken).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Order Box Token Fetcher</h1>
        <button className="fetch-button" onClick={handleFetchToken}>
          Fetch Token
        </button>
        {fetchedToken && (
          <div className="token-display">
            <h2>Fetched Token:</h2>
            <div className="token-box">
              <p>{fetchedToken}</p>
              <button className="copy-button" onClick={handleCopyToken}>
                <FaCopy /> {/* Copy icon */}
              </button>
            </div>
            {isCopied && <span className="copy-message">Copied to clipboard!</span>}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;