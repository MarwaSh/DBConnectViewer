import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    MenuItem
} from '@mui/material';
import Connection from '../models/connection';

interface Props {
    open: boolean;
    onClose: () => void;
    onAddConnection: (connection: Connection) => void;
}

const AddConnectionDialog: React.FC<Props> = ({ open, onClose, onAddConnection }) => {
    const initialFormData = {
        databaseName: '',
        url: '',
        username: '',
        password: '',
        type: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [formValid, setFormValid] = useState<boolean>(false);

    useEffect(() => {
        const isValid = Boolean(formData.databaseName) && Boolean(formData.url) && Boolean(formData.username) && Boolean(formData.password) && Boolean(formData.type);
        setFormValid(isValid);
    }, [formData]);

    useEffect(() => {
        // Reset form when dialog is closed
        if (!open) {
            setFormData(initialFormData);
            setFormValid(false); //Reset form validity state
        }
    }, [open]);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!formValid) return;

        const newConnection: Connection = {
            id: generateUniqueId(), // Assume ID is generated by the backend or is not needed for the creation
            databaseName: formData.databaseName,
            username: formData.username,
            databaseType: formData.type,
            url: `jdc:${formData.type.toLowerCase()}://default`
        };
        onAddConnection(newConnection);
        onClose();
    };

    const generateUniqueId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    const handleClose = () => {
        setFormData(initialFormData); // Reset form data when closing the dialog
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Database Connection</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="databaseName"
                    label="Database Name"
                    type="text"
                    fullWidth
                    name="databaseName"
                    value={formData.databaseName}
                    onChange={handleChange}
                    required
                    error={!formData.databaseName}
                    helperText={!formData.databaseName ? "Database name is required" : ""}
                />
                <TextField
                    margin="dense"
                    id="url"
                    label="URL"
                    type="url"
                    fullWidth
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    required
                    error={!formData.url}
                    helperText={!formData.url ? "URL is required" : ""}
                />
                <TextField
                    margin="dense"
                    id="username"
                    label="Username"
                    type="text"
                    fullWidth
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    error={!formData.username}
                    helperText={!formData.username ? "Username is required" : ""}
                />
                <TextField
                    margin="dense"
                    id="password"
                    label="User Password"
                    type="password"
                    fullWidth
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    error={!formData.password}
                    helperText={!formData.password ? "Password is required" : ""}
                />
                <TextField
                    select
                    label="Type"
                    value={formData.type}
                    onChange={handleChange}
                    fullWidth
                    name="type"
                    margin="dense"
                    variant="standard"
                    required
                    error={!formData.type}
                    helperText={!formData.type ? "Type is required" : ""}
                >
                    <MenuItem value="Snowflake">Snowflake</MenuItem>
                    <MenuItem value="Trino">Trino</MenuItem>
                    <MenuItem value="MySQL">MySQL</MenuItem>
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} disabled={!formValid} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddConnectionDialog;
