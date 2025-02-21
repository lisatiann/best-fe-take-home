import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import PropTypes from 'prop-types';

const ConfirmDeleteFieldDialog = ({ open, onClose, onDeleteField, selectedField }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="confirm-delete-dialog-title">
      <DialogTitle id="confirm-delete-dialog-title">Confirm Delete</DialogTitle>
      <DialogContent>
        Are you sure you want to delete the field "{selectedField.toUpperCase()}"?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onDeleteField}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDeleteFieldDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDeleteField: PropTypes.func.isRequired,
  selectedField: PropTypes.string.isRequired,
};

export default ConfirmDeleteFieldDialog;
