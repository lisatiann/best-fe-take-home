import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, Menu, MenuItem, TableCell, TableRow, TableSortLabel, TextField } from "@mui/material";
import { customFieldTypes } from "../constant";
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PropTypes from 'prop-types';

const ToolBar = ({ toolBarTitles, order, orderBy, onRequestSort, onAddField, onDeleteField, setToolBarTitles }) => {
  const [addCustomOpen, setAddCustomOpen] = useState(false);
  const [fieldMenuAnchorEl, setFieldMenuAnchorEl] = useState(null);
  const [fieldTitle, setFieldTitle] = useState('');
  const [fieldType, setFieldType] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const onClose = () => {
    setAddCustomOpen(false);
  };

  const validateFieldTitle = (title) => {
    const regex = /^[a-zA-Z0-9_]+$/;
    return regex.test(title);
  };

  const handleCreateCustomField = () => {
    if (toolBarTitles.includes(fieldTitle)) {
      return alert('Field title already exists');
    }
    if (!validateFieldTitle(fieldTitle)) {
      return alert('Field title contains unsupported characters. Only alphanumeric characters and underscores are allowed.');
    }
    onAddField({ title: fieldTitle, type: fieldType });
    setFieldTitle('');
    setFieldType('');
    onClose();
  };

  const handleMenuOpen = (event, title) => {
    setFieldMenuAnchorEl(event.currentTarget);
    setSelectedField(title);
  };

  const handleMenuClose = () => {
    setFieldMenuAnchorEl(null);
    setSelectedField('');
  };

  const handleDeleteField = () => {
    const newToolBarTitles = toolBarTitles.filter(toolBarTitle => toolBarTitle !== selectedField);
    onDeleteField(selectedField.toLowerCase());
    setToolBarTitles(newToolBarTitles);
    handleMenuClose();
    setConfirmDeleteOpen(false);
  };

  return (
    <TableRow>
      {toolBarTitles.map((title, index) => (
        <TableCell key={index}>
          <TableSortLabel
            active={orderBy === title.toLowerCase()}
            direction={orderBy === title.toLowerCase() ? order : 'asc'}
            onClick={createSortHandler(title.toLowerCase())}
          >
            {title}
          </TableSortLabel>
          {title !== 'Title' && <ArrowDropDownIcon onClick={(event) => handleMenuOpen(event, title)} />}
          <Menu
            anchorEl={fieldMenuAnchorEl}
            open={Boolean(fieldMenuAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={()=> setConfirmDeleteOpen(true)}>Delete</MenuItem>
          </Menu>
        </TableCell>
      ))}
      <TableCell>
        <AddIcon onClick={() => setAddCustomOpen(true)} />
      </TableCell>
      <Dialog open={addCustomOpen} onClose={onClose}>
        <DialogTitle>Add Field</DialogTitle>
        <DialogContent>
          <TextField label="Field Title" value={fieldTitle} onChange={(e) => setFieldTitle(e.target.value)} fullWidth />
          <FormControl fullWidth>
            <InputLabel id="field-type-label">Field Type</InputLabel>
            <Select
              labelId="field-type-label"
              value={fieldType}
              onChange={(e) => setFieldType(e.target.value)}
            >
              {customFieldTypes.map((type, index) => (
                <MenuItem key={index} value={type}>{type[0].toUpperCase() + type.slice(1)}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleCreateCustomField}>Create</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmDeleteOpen} onClose={()=> setConfirmDeleteOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the field "{selectedField}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> setConfirmDeleteOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteField}>Delete</Button>
        </DialogActions>
      </Dialog>
    </TableRow>
  );
};

ToolBar.propTypes = {
  toolBarTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onAddField: PropTypes.func.isRequired,
  onDeleteField: PropTypes.func.isRequired,
  setToolBarTitles: PropTypes.func.isRequired,
};

export default ToolBar;