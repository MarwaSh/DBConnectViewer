import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddConnectionDialog from './AddConnectionDialog';
import { addConnectionToServer } from './../services/api';
import Connection from '../models/connection';
import './DatabaseConnectionList.css';

interface ConnectionDetailsProps {
    gotConnections: Connection[];
}

const DatabaseConnectionList: React.FC<ConnectionDetailsProps>= ({ gotConnections }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [connections, setConnections] = useState<Connection[]>(gotConnections);

    // Effect for initializing or updating connections when gotConnections changes
    useEffect(() => {
        // This ensures we only reset the state if gotConnections actually changes
        // and is different from the current state to prevent unnecessary overwrites
        if (gotConnections !== connections) {
            setConnections(gotConnections);
        }
    }, [gotConnections]);

 
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddConnection = async (newConnection: Connection) => {
        try {
            const addedConnection = await addConnectionToServer(newConnection);
            // If the server returns the successfully added connection, update the state
            setConnections(prevConnections => [...prevConnections, newConnection]);
            handleClose();
        } catch (error) {
            console.error('Error adding new connection:', error);
        }
    };

    const handleRowClick = (connectionId: string) => {
        const connection = connections.find(conn => conn.id === connectionId);
        navigate(`/connection/${connectionId}`, { state: { connection } });
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
