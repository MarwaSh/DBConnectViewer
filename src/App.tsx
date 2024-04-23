import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConnectionsList from './components/ConnectionDetailsComponent/ConnectionDetails';
import ConnectionDetails from './components/ConnectionDetailsComponent/ConnectionDetails';
import DatabaseConnectionList from './components/DatabaseConnectionList';

const App: React.FC = () => {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<DatabaseConnectionList />} />
        <Route path="/:id" element={<ConnectionDetails />} />
    </Routes>
</Router>
  );
};

export default App;
