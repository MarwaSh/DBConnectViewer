import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

import { fetchConnections } from '../services/api';
import Connection from './../models/connection'; 

const ConnectionsList: React.FC = () => {
    const [connections, setConnections] = useState<Connection[]>([]); 
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchConnections();
            setConnections(data);
        };
        loadData();
    }, []);

    return (
        <div>
            <h1>Hello World!</h1>
            <Button onClick={() => navigate('/add')}>Add +</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Database Name</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {connections.map((conn) => (
                        <TableRow key={conn.id} onClick={() => navigate(`/${conn.id}`)}>
                            <TableCell>{conn.databaseName}</TableCell>
                            <TableCell>{conn.username}</TableCell>
                            <TableCell>{conn.databaseType}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ConnectionsList;
