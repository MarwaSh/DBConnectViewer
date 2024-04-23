import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddConnectionDialog from './AddConnectionDialog';
import { fetchConnections } from '../services/api';
import Connection from '../models/connection';
import './DatabaseConnectionList.css';

const DatabaseConnectionList: React.FC = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [connections, setConnections] = useState<Connection[]>([]);

    useEffect(() => {
        const loadConnections = async () => {
            try {
                const fetchedConnections = await fetchConnections();
                setConnections(fetchedConnections);
            } catch (error) {
                console.error('Failed to load connections:', error);
            }
        };

        loadConnections();
    }, []);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddConnection = (newConnection: Connection) => {
        setConnections(prevConnections => [...prevConnections, newConnection]);
    
        addConnectionToServer(newConnection);
        handleClose();
    };
    
    // Function to send new connection to the server
    const addConnectionToServer = async (connection: Connection) => {
        try {
            const response = await fetch('http://localhost:4000/connections', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(connection)
            });
            if (!response.ok) {
                throw new Error('Failed to save the connection');
            }
            console.log('Connection added successfully');
        } catch (error) {
            console.error('Error adding connection:', error);
        }
    };

    const handleRowClick = (id: string) => {
        // Navigate to the detail page for the clicked connection
        navigate(`/${id}`);
    };

    return (
        <>
            <h1>Database Connections List</h1>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClickOpen}>
                Add
            </Button>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Database Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Database Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {connections.map((connection) => (
                            <TableRow 
                            key={connection.id}
                            hover
                            onClick={() => handleRowClick(connection.id)}>
                                <TableCell>{connection.databaseName}</TableCell>
                                <TableCell>{connection.username}</TableCell>
                                <TableCell>{connection.databaseType}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddConnectionDialog open={open} onClose={handleClose} onAddConnection={handleAddConnection} />
        </>
    );
};

export default DatabaseConnectionList;
