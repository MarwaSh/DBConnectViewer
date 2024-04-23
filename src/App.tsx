import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConnectionsList from './components/ConnectionDetailsComponent/ConnectionDetails';
import ConnectionDetails from './components/ConnectionDetailsComponent/ConnectionDetails';
import DatabaseConnectionList from './components/DatabaseConnectionList';
import { fetchConnections } from './services/api';
const App: React.FC = () => {

  const [connections, setConnections] = useState([]);

  useEffect(() => {
      const loadConnections = async () => {
          try {
              const fetchedConnections = await fetchConnections();
              setConnections(fetchedConnections);
          } catch (error) {
              console.error('Failed to fetch connections:', error);
          }
      };

      loadConnections();
  }, []);

  return (
    <Router>
    <Routes>
        <Route path="/" element={<DatabaseConnectionList gotConnections={connections} />} />
        <Route path="/connection/:id" element={<ConnectionDetails connections={connections} />} />
    </Routes>
</Router>
  );
};

export default App;
