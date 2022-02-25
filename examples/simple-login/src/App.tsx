import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import './Button.css';

const PLATFORM_ID = 2;
const CALLBACK = 'http://localhost:3000';

function App() {
  const [username, setUsername] = useState<string | undefined>();

  const loginAndGetUsername = async (code: string) => {
    const {
      data: { accessToken },
    } = await axios.post(
      `http://api.soul-network.com/v1/auth/verify?callback=${CALLBACK}&code=${code}`,
    );
    const {
      data: { username },
    } = await axios.get('https://api.soul-network.com/v1/users/me', {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setUsername(username);
  };

  useEffect(() => {
    const params = getSearchParams<{ code: string }>();
    if (params.code) loginAndGetUsername(params.code);
  }, []);

  return (
    <div className="App">
      <div style={{ paddingTop: '200px' }}>
        {username ? (
          <h1 style={{ color: 'white' }}>Welcome, {username}</h1>
        ) : (
          <button
            className="glow-on-hover"
            type="button"
            onClick={() => {
              if (window?.open !== undefined) {
                window.open(
                  `https://login.soul-network.com/?platformId=${PLATFORM_ID}&callback=${CALLBACK}`,
                  '_self',
                );
              }
            }}
          >
            LOGIN WITH SOUL
          </button>
        )}
      </div>
    </div>
  );
}

export default App;

const getSearchParams = <T extends object>(): Partial<T> => {
  // server side rendering
  if (typeof window === 'undefined') {
    return {};
  }

  const params = new URLSearchParams(window.location.search);

  return new Proxy(params, {
    get(target, prop, receiver) {
      return target.get(prop as string) || undefined;
    },
  }) as T;
};
