import React from 'react';
import Connection from '../../models/connection'; 
import { useLocation, useParams } from 'react-router-dom';
import ConnectionsTable from './ConnectionsTable';
import { CircularProgress, Container, Typography, Box } from '@mui/material';
import './ConnectionDetails.css';

interface ConnectionDetailsProps {
    connections: Connection[];
}


const ConnectionDetails: React.FC<ConnectionDetailsProps> = ({ connections }) => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const connection = location.state?.connection || connections.find(conn => conn.id === id);


    if (!connection) {
        return <div>No connection found</div>;
    }

    return (
        <Container className="connection-container">
        <Typography variant="h4" gutterBottom component="div">
            Database Connection Details
        </Typography>
        {!connection ? (
            <Box className="loading-container">
                <CircularProgress />
            </Box>
        ) : (
            <ConnectionsTable connections={[connection]} />
        )}
    </Container>
    );
  
};

export default ConnectionDetails;
