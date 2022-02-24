import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import './Button.css';

function App() {
  const platformId = 2;
  const callback = 'http://localhost:3000';

  const [username, setUsername] = useState<string | undefined>();
  useEffect(() => {
    const params = getSearchParams<{ code: string }>();
    if (params.code) {
      axios
        .post(
          `http://api.soul-network.com/v1/auth/verify?callback=${callback}&code=${params.code}`,
        )
        .then(({ data: { accessToken } }) => {
          axios
            .get('https://api.soul-network.com/v1/users/me', {
              headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then(({ data: { username } }) => {
              setUsername(username);
            });
        });
    }
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
                  `https://login.soul-network.com/?platformId=${platformId}&callback=${callback}`,
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
