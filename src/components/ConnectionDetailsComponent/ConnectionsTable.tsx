import React from 'react';
import Connection from '../../models/connection';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import './ConnectionDetails.css';


interface ConnectionsTableProps {
  connections: Connection[];
}

const ConnectionsTable: React.FC<ConnectionsTableProps> = ({ connections }) => {
    if (connections.length === 0) {
        return (
          <Paper className="table-container" style={{ padding: '20px' }}>
            <Typography variant="subtitle1" color="textSecondary">
              No connections available.
            </Typography>
          </Paper>
        );
      }

  return (
    <TableContainer component={Paper} className="table-container">
    <Table aria-label="simple table">
        <TableHead>
            <TableRow className="table-header">
                <TableCell>ID</TableCell>
                <TableCell>databaseName</TableCell>
                <TableCell>username</TableCell>
                <TableCell>databaseType</TableCell>
                <TableCell>url</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {connections.map((connection) => (
                <TableRow key={connection.id}>
                    <TableCell component="th" scope="row">
                        {connection.id}
                    </TableCell>
                    <TableCell>{connection.databaseName}</TableCell>
                    <TableCell>{connection.username}</TableCell>
                    <TableCell>{connection.databaseType}</TableCell>
                    <TableCell>{connection.url}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</TableContainer>
);
};

export default ConnectionsTable;
