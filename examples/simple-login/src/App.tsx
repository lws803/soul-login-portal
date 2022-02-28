import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import './App.css';
import './Button.css';

const PLATFORM_ID = 2;
const CALLBACK = 'http://localhost:3000';

function App() {
  const [username, setUsername] = useState<string | undefined>();
  const [cookies, setCookie, removeCookies] = useCookies(['soul-token']);

  useEffect(() => {
    const login = async (code: string) => {
      const {
        data: { accessToken },
      } = await axios.post(
        `http://api.soul-network.com/v1/auth/verify?callback=${CALLBACK}&code=${code}`,
      );
      setCookie('soul-token', accessToken, { path: '/' });
      if (window?.open !== undefined && window?.location !== undefined) {
        const url = window.location.origin + window.location.pathname;
        window.open(url, '_self');
      }
    };

    const params = getSearchParams<{ code: string }>();
    if (params.code) login(params.code);
  }, [setCookie]);

  useEffect(() => {
    const loginAndSetUsername = async () => {
      try {
        const {
          data: { username },
        } = await axios.get('https://api.soul-network.com/v1/users/me', {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${cookies['soul-token']}`,
          },
        });
        setUsername(username);
      } catch (_error) {
        removeCookies('soul-token');
      }
    };
    if (cookies['soul-token']) {
      loginAndSetUsername();
    } else {
      setUsername(undefined);
    }
  }, [cookies, removeCookies]);

  return (
    <div className="App">
      <div style={{ paddingTop: '200px' }}>
        {username ? (
          <>
            <h1 style={{ color: 'white' }}>Welcome, {username}</h1>
            <button onClick={() => removeCookies('soul-token')}>Logout</button>
          </>
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
