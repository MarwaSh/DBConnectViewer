import React, { useEffect, useState } from 'react';
import Connection from '../../models/connection'; 
import { useParams } from 'react-router-dom';
import { getConnectionDetails } from '../../services/api';
import ConnectionsTable from './ConnectionsTable';
import { CircularProgress, Container, Typography, Box } from '@mui/material';
import './ConnectionDetails.css';

const ConnectionDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [connection, setConnection] = useState<Connection | null>(null);
    

    useEffect(() => {
        if (id) {
            loadData();
        }
    }, [id]);
  
    async function loadData() {
        try {
            const data = await getConnectionDetails(id as string);
            setConnection(data);
        } catch (error) {
            console.error('Failed to fetch details:', error);
        }
    }

    if (!connection) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
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
