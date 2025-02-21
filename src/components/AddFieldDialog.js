import { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, TextField, Snackbar, Alert, FormHelperText, Box } from "@mui/material";
import { customFieldTypes } from "../constant";
import PropTypes from 'prop-types';

const AddFieldDialog = ({ open, onClose, onAddField, toolBarTitles }) => {
  const [fieldTitle, setFieldTitle] = useState('');
  const [fieldType, setFieldType] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setFieldTitle('');
      setFieldType('');
      setError('');
    }
  }, [open]);

  const validateFieldTitle = (title) => {
    const regex = /^[a-zA-Z0-9_]+$/;
    return regex.test(title);
  };

  const handleCreateCustomField = () => {
    if (toolBarTitles.includes(fieldTitle)) {
      setError('Field title already exists');
      setSnackbarOpen(true);
      return;
    }
    if (!validateFieldTitle(fieldTitle)) {
      setError('Field title contains unsupported characters. Only alphanumeric characters and underscores are allowed.');
      setSnackbarOpen(true);
      return;
    }
    if (!fieldType) {
      setError('Field type is required');
      setSnackbarOpen(true);
      return;
    }
    onAddField({ title: fieldTitle.toLowerCase(), type: fieldType });
    setFieldTitle('');
    setFieldType('');
    onClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="add-field-dialog-title">
      <DialogTitle id="add-field-dialog-title">Add Field</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: '8px' }}>
          <FormControl fullWidth error={!!error}>
            <TextField
              label="Field Title"
              value={fieldTitle}
              onChange={(e) => setFieldTitle(e.target.value)}
              fullWidth
              aria-describedby="field-title-error-text"
            />
            {error && <FormHelperText id="field-title-error-text">{error}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="field-type-label">Field Type</InputLabel>
            <Select
              labelId="field-type-label"
              value={fieldType}
              onChange={(e) => setFieldType(e.target.value)}
              label="Field Type"
            >
              {customFieldTypes.map((type, index) => (
                <MenuItem key={index} value={type}>{type[0].toUpperCase() + type.slice(1)}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreateCustomField}>Create</Button>
      </DialogActions>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

AddFieldDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddField: PropTypes.func.isRequired,
  toolBarTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddFieldDialog;
