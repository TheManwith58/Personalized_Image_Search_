import React, { useState, useEffect } from 'react';
import axios from 'axios';

// We'll create these components in a moment
import SearchPage from './components/SearchPage';
import LoginPage from './components/LoginPage';

function App() {
  const [auth, setAuth] = useState(null);

  // This effect runs once when the app loads
  useEffect(() => {
    // Make a request to our /api/current_user endpoint
    axios.get('/api/current_user')
      .then(res => {
        // If we get a user, set auth state to the user object
        // If not, res.data will be empty, and we'll set auth to false
        setAuth(res.data || false);
      });
  }, []);

  // Show a loading message until we know auth status
  if (auth === null) {
    return <div>Loading...</div>;
  }

  // Based on auth status, render the Login page or the Search page
  return (
    <div className="container" style={{ padding: '20px' }}>
      {auth ? <SearchPage /> : <LoginPage />}
    </div>
  );
}

export default App;