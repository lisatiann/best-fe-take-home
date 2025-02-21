import { useState } from "react";
import { Button, Menu, MenuItem, TableCell, TableRow, TableSortLabel } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PropTypes from 'prop-types';
import AddFieldDialog from './AddFieldDialog';
import ConfirmDeleteFieldDialog from './ConfirmDeleteFieldDialog';

const ToolBar = ({ toolBarTitles, order, orderBy, onRequestSort, onAddField, onDeleteField, setToolBarTitles }) => {
  const [addCustomOpen, setAddCustomOpen] = useState(false);
  const [fieldMenuAnchorEl, setFieldMenuAnchorEl] = useState(null);
  const [selectedField, setSelectedField] = useState('');
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
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

  const handleCloseConfirmDelete = () => {
    setConfirmDeleteOpen(false);
    handleMenuClose();
  };

  return (
    <TableRow sx={{ height: '40px' }}>
      {toolBarTitles.map((title, index) => (
        <TableCell key={index} sx={{ padding: '8px', paddingLeft: '8px', borderLeft: index !== 0 ? '1px solid rgba(224, 224, 224, 1)' : 'none' }}>
          <Button>
            <TableSortLabel
              active={orderBy === title.toLowerCase()}
              direction={orderBy === title.toLowerCase() ? order : 'asc'}
              onClick={createSortHandler(title.toLowerCase())}
            >
              {title}
            </TableSortLabel>
            {title !== 'Title' && (
              <ArrowDropDownIcon onClick={(event) => handleMenuOpen(event, title)} />
            )}
          </Button>
          <Menu
            anchorEl={fieldMenuAnchorEl}
            open={Boolean(fieldMenuAnchorEl)}
            onClose={handleMenuClose}
            aria-labelledby="field-menu"
          >
            <MenuItem onClick={()=> setConfirmDeleteOpen(true)}>Delete</MenuItem>
          </Menu>
        </TableCell>
      ))}
      <TableCell sx={{ padding: '8px', paddingLeft: '8px', borderLeft: '1px solid rgba(224, 224, 224, 1)' }}>
        <Button>
          <AddIcon onClick={() => setAddCustomOpen(true)} />
        </Button>
      </TableCell>
      <AddFieldDialog
        open={addCustomOpen}
        onClose={() => setAddCustomOpen(false)}
        onAddField={onAddField}
        toolBarTitles={toolBarTitles}
      />
      <ConfirmDeleteFieldDialog
        open={confirmDeleteOpen}
        onClose={handleCloseConfirmDelete}
        onDeleteField={handleDeleteField}
        selectedField={selectedField}
      />
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